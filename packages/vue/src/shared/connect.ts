import type { GeneralField } from '@silver-formily/core'
import type { Component, DefineComponent, FunctionalComponent, SlotsType } from 'vue'
import type {
  IComponentMapper,
  IStateMapper,
  VueComponentMapperProps,
  VueComponentProps,
} from '../types'
import { isVoidField } from '@silver-formily/core'
import { Path as FormPath } from '@silver-formily/path'
import { observer } from '@silver-formily/reactive-vue'
import { camelCase, each, isFn, isStr, isValid, paramCase } from '@silver-formily/shared'
import { defineComponent, h, markRaw } from 'vue'
import { useField } from '../hooks/useField'

import { createVNodeProps, extractAttrsAndEvents } from '../utils/reactiveFieldHelpers'

type ComponentWithProps = Component & {
  props?: unknown
  __vccOpts?: {
    props?: unknown
    inheritAttrs?: boolean
  }
  inheritAttrs?: boolean
}

function normalizePropKeys(propsDef: unknown): Set<string> | null {
  if (!propsDef)
    return null
  const keys = Array.isArray(propsDef)
    ? propsDef.map(key => String(key))
    : typeof propsDef === 'object'
      ? Object.keys(propsDef as Record<string, unknown>)
      : []
  if (!keys.length)
    return null
  return new Set(keys.flatMap(key => [key, camelCase(key), paramCase(key)]))
}

function extractTargetPropKeys(target: Component): Set<string> | null {
  const component = target as ComponentWithProps
  return normalizePropKeys(component.props ?? component.__vccOpts?.props)
}

function shouldPreserveMappedAttrs(target: Component) {
  const component = target as ComponentWithProps
  return component.inheritAttrs === false || component.__vccOpts?.inheritAttrs === false
}

function pickMappableProps<T extends Component>(
  target: T,
  baseAttrKeys: Set<string>,
  mappedAttrs: VueComponentMapperProps<T>,
) {
  if (shouldPreserveMappedAttrs(target))
    return mappedAttrs

  const propKeys = extractTargetPropKeys(target)
  if (!propKeys)
    return mappedAttrs

  const picked = Object.keys(mappedAttrs).reduce<Record<string, unknown>>((buf, key) => {
    if (baseAttrKeys.has(key) || propKeys.has(key) || propKeys.has(camelCase(key))) {
      buf[key] = mappedAttrs[key]
    }
    return buf
  }, {})
  return picked as VueComponentMapperProps<T>
}

export function mapProps<T extends Component = Component>(
  ...args: IStateMapper<VueComponentMapperProps<T>>[]
) {
  const transform = (input: VueComponentMapperProps<T>, field: GeneralField) =>
    args.reduce((props, mapper) => {
      if (isFn(mapper)) {
        props = Object.assign(props, mapper(props, field))
      }
      else {
        each(mapper, (to, extract) => {
          const extractValue = FormPath.getIn(field, extract)
          const targetValue = isStr(to) ? to : extract
          const originalValue = FormPath.getIn(props, targetValue)
          if (extract === 'value') {
            if (to !== extract) {
              delete props.value
            }
          }
          if (isValid(originalValue) && !isValid(extractValue))
            return
          FormPath.setIn(props, targetValue, extractValue)
        })
      }
      return props
    }, input)

  return (target: T) => {
    return observer(
      defineComponent({
        name: target.name ? `Connected${target.name}` : `ConnectedComponent`,
        setup(_, { attrs, slots }) {
          const fieldRef = useField()
          return () => {
            const { attrs: normalizedAttrs, events } = extractAttrsAndEvents(attrs)
            const baseAttrs = { ...normalizedAttrs } as VueComponentMapperProps<T>
            const baseAttrKeys = new Set(Object.keys(baseAttrs))
            const mappedAttrs = fieldRef.value ? transform(baseAttrs, fieldRef.value) : baseAttrs
            const newAttrs = pickMappableProps(target, baseAttrKeys, mappedAttrs)
            return h(target, createVNodeProps(newAttrs, events), slots)
          }
        },
      }),
    )
  }
}

export function mapReadPretty<T extends Component, C extends Component>(
  component: C,
  readPrettyProps?: Record<string, any>,
) {
  return (target: T) => {
    return observer(
      defineComponent({
        name: target.name ? `Read${target.name}` : `ReadComponent`,
        setup(_, { attrs, slots }) {
          const fieldRef = useField()
          return () => {
            const field = fieldRef.value
            const { attrs: normalizedAttrs, events } = extractAttrsAndEvents(attrs)
            return h(
              field
              && !isVoidField(field)
              && (field.pattern === 'readPretty' || !!field.data?.readPretty)
                ? component
                : target,
              createVNodeProps(
                {
                  ...readPrettyProps,
                  ...normalizedAttrs,
                },
                events,
              ),
              slots,
            )
          }
        },
      }),
    )
  }
}

type ConnectedInstance<T extends Component, Props extends object> = T extends new (...args: any[]) => infer Instance
  ? Omit<Instance, '$props'> & {
    $props: Readonly<ConnectedProps<T, Props>>
  }
  : never

type ConnectedProps<T extends Component, Props extends object> = T extends new (...args: any[]) => {
  $props: infer TargetProps
}
  ? Props & Omit<TargetProps, keyof Props>
  : Props

type ConnectedSlots<T extends Component> = T extends new (...args: any[]) => {
  $slots: infer TargetSlots
}
  ? TargetSlots extends Record<string, any>
    ? SlotsType<TargetSlots>
    : SlotsType
  : SlotsType

type ConnectedStatics<T extends Component> = Pick<T, keyof T>

export type ConnectedComponent<
  T extends Component,
  Props extends object = VueComponentProps<T>,
> = Omit<DefineComponent<ConnectedProps<T, Props>, any, any, any, any, any, any, any, string, any, any, any, ConnectedSlots<T>>, 'new'>
  & ConnectedStatics<T>
  & (T extends new (...args: any[]) => any
    ? new (...args: any[]) => ConnectedInstance<T, Props>
    : T extends FunctionalComponent<any, infer Emits, infer Slots, any>
      ? FunctionalComponent<ConnectedProps<T, Props>, Emits, Slots>
      : new (...args: any[]) => ConnectedInstance<T, Props>)

export function connect<
  T extends Component,
  Props extends object = VueComponentProps<T>,
>(target: T, ...args: IComponentMapper[]): ConnectedComponent<T, Props> {
  const Component = args.reduce((target: Component, mapper) => {
    return mapper(target)
  }, target)

  const functionalComponent = defineComponent({
    name: target.name,
    setup(_, { attrs, slots }) {
      return () => {
        const { attrs: normalizedAttrs, events } = extractAttrsAndEvents(attrs)
        return h(Component, createVNodeProps(normalizedAttrs, events), slots)
      }
    },
  })

  return markRaw(functionalComponent) as unknown as ConnectedComponent<T, Props>
}
