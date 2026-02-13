import type { GeneralField } from '@formily/core'
import type { Component, Slot, Slots, VNode } from 'vue'
import { createTextVNode, Fragment, h } from 'vue'

interface VueLikeOptions {
  template?: string
  render?: (...args: unknown[]) => unknown
  setup?: (...args: unknown[]) => unknown
}

type SlotContent = string | Component | null | undefined
type SlotContentMap = Record<string, SlotContent>
type FieldContent = SlotContent | SlotContentMap | null | undefined

type EventHandler = (...args: unknown[]) => unknown
type EventMap = Partial<Record<string, EventHandler>>
type Attrs = Record<string, unknown>

const EMPTY_SLOT: Slot = () => []

type ComponentWithProps = Component & { props?: unknown }

function normalizePropKeys(propsDef: unknown): string[] | null {
  if (!propsDef)
    return null
  if (Array.isArray(propsDef))
    return propsDef.map(key => String(key))
  if (typeof propsDef === 'object')
    return Object.keys(propsDef as Record<string, unknown>)
  return null
}

function extractComponentPropKeys(component: SlotContent): string[] | null {
  if (!component || typeof component === 'string')
    return null
  const target = component as ComponentWithProps
  return normalizePropKeys(target.props)
}

function pickScopedProps(
  scopedProps: Record<string, unknown> | undefined,
  propKeys: string[] | null | undefined,
) {
  if (!scopedProps)
    return undefined
  if (!propKeys || !propKeys.length)
    return scopedProps
  const picked: Record<string, unknown> = {}
  propKeys.forEach((key) => {
    if (key in scopedProps)
      picked[key] = scopedProps[key]
  })
  if (!Object.keys(picked).length)
    return undefined
  return picked
}

function isVueOptions(options: unknown): options is VueLikeOptions {
  if (typeof options !== 'object' || options === null) {
    return false
  }
  const candidates = options as Record<string, unknown>
  return (
    typeof candidates.template === 'string'
    || typeof candidates.render === 'function'
    || typeof candidates.setup === 'function'
  )
}

function isSlotContentMap(content: unknown): content is SlotContentMap {
  if (typeof content !== 'object' || content === null) {
    return false
  }
  return !isVueOptions(content)
}

export function wrapFragment(childNodes?: VNode[] | VNode | null): VNode | null {
  if (!childNodes) {
    return null
  }
  if (!Array.isArray(childNodes)) {
    return childNodes
  }
  if (childNodes.length === 0) {
    return null
  }
  if (childNodes.length === 1) {
    return childNodes[0] ?? null
  }
  return h(Fragment, null, childNodes)
}

function resolveComponent(render: Slot, extra?: SlotContent): Slot {
  if (extra === undefined || extra === null) {
    return render
  }
  if (typeof extra === 'string') {
    return () => [...render(), createTextVNode(extra)]
  }

  const component = extra
  const propKeys = extractComponentPropKeys(component)
  const needsScopedProps
    = (typeof component === 'function' && component.length > 1)
      || (isVueOptions(component)
        && typeof component.render === 'function'
        && component.render.length > 1)
      || !!(propKeys && propKeys.length)

  if (needsScopedProps) {
    return (scopedProps?: Record<string, unknown>) => [
      ...render(),
      h(component, pickScopedProps(scopedProps, propKeys) ?? {}),
    ]
  }

  return () => [...render(), h(component)]
}

export function mergeSlots(field: GeneralField, slots: Slots, content: FieldContent): Slots {
  const slotNames = Object.keys(slots)
  if (!slotNames.length) {
    if (!content) {
      return {}
    }
    if (typeof content === 'string') {
      return {
        default: resolveComponent(EMPTY_SLOT, content),
      }
    }
  }
  const patchSlot
    = (slotName: string): Slot =>
      (...originArgs: Parameters<Slot>) => {
        const firstArg = originArgs[0]
        const scopedProps
          = typeof firstArg === 'object' && firstArg !== null
            ? (firstArg as Record<string, unknown>)
            : {}
        return slots[slotName]?.({ field, form: field.form, ...scopedProps }) ?? []
      }

  const patchedSlots: Record<string, Slot> = {}
  slotNames.forEach((name) => {
    patchedSlots[name] = patchSlot(name)
  })

  if (isSlotContentMap(content)) {
    Object.keys(content).forEach((key) => {
      const child = content[key]
      const slot = patchedSlots[key] ?? EMPTY_SLOT
      patchedSlots[key] = resolveComponent(slot, child)
    })
    return patchedSlots
  }
  patchedSlots.default = resolveComponent(patchedSlots.default ?? EMPTY_SLOT, content)
  return patchedSlots
}

function normalizeOnEventName(eventKey: string) {
  if (eventKey.length <= 2)
    return ''
  const rawName = eventKey.slice(2)
  return rawName.charAt(0).toLowerCase() + rawName.slice(1)
}

function toEventPropKey(eventName: string) {
  if (!eventName)
    return ''
  return `on${eventName.charAt(0).toUpperCase()}${eventName.slice(1)}`
}

export function extractAttrsAndEvents(rawAttrs: Attrs = {}): { attrs: Attrs, events: EventMap } {
  const normalizedAttrs: Attrs = { ...rawAttrs }
  const events: EventMap = {}

  Object.keys(rawAttrs).forEach((eventKey) => {
    const value = rawAttrs[eventKey]
    const onEvent = eventKey.startsWith('on')
    const atEvent = eventKey.startsWith('@')
    if (!onEvent && !atEvent)
      return
    if (atEvent) {
      const eventName = eventKey.slice(1)
      delete normalizedAttrs[eventKey]
      if (typeof value === 'function') {
        events[eventName] = value as EventHandler
      }
      return
    }
    const eventName = normalizeOnEventName(eventKey)
    if (!eventName)
      return
    if (!events[eventName] && typeof value === 'function') {
      events[eventName] = value as EventHandler
    }
    delete normalizedAttrs[eventKey]
  })

  return { attrs: normalizedAttrs, events }
}

export function createVNodeProps(attrs: Attrs, events: EventMap): Attrs {
  const { style, class: className, ...rest } = attrs
  const eventProps = Object.keys(events).reduce<Record<string, EventHandler>>((acc, eventName) => {
    const propKey = toEventPropKey(eventName)
    const handler = events[eventName]
    if (propKey && handler) {
      acc[propKey] = handler
    }
    return acc
  }, {})

  return {
    ...rest,
    style,
    class: className,
    ...eventProps,
  }
}
