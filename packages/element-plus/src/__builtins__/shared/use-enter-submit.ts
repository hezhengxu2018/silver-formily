import type { Ref } from 'vue'
import { useEventListener } from '@vueuse/core'
import { computed, onBeforeUnmount, watch } from 'vue'

export interface UseEnterSubmitOptions {
  visible: Ref<boolean>
  resolve: () => void
  submitting: Ref<boolean>
  getContainer: () => HTMLElement | null
  enabled?: Ref<boolean> | boolean
}

const runtimeWindow = globalThis.window === undefined ? undefined : globalThis
const submitOnEnterInputTypes = new Set([
  'text',
  'search',
  'email',
  'password',
  'tel',
  'url',
  'number',
])
const defaultEnterBehaviorSelector = [
  'button',
  'a[href]',
  'select',
  'summary',
  '[role=button]',
  '[role=link]',
  '[role=checkbox]',
  '[role=radio]',
  '[role=switch]',
  '[role=tab]',
  '[role=menuitem]',
  '[role=option]',
  '[role=combobox]',
  '[role=listbox]',
].join(',')

function shouldSubmitOnEnter(target: HTMLElement | null) {
  const input = target?.closest('input') as HTMLInputElement | null
  if (!input)
    return false

  const inputType = (input.getAttribute('type') ?? 'text').toLowerCase()
  return submitOnEnterInputTypes.has(inputType)
}

function shouldRespectDefaultEnterBehavior(target: HTMLElement | null) {
  if (!target || shouldSubmitOnEnter(target))
    return false

  if (target.closest(defaultEnterBehaviorSelector))
    return true

  const activeElement = target.ownerDocument?.activeElement
  if (!(activeElement instanceof HTMLElement))
    return false

  return activeElement !== target.ownerDocument.body
    && activeElement !== target.ownerDocument.documentElement
    && activeElement === target
}

export function useEnterSubmit({ visible, resolve, submitting, getContainer, enabled = true }: UseEnterSubmitOptions) {
  let stopListener: (() => void) | null = null
  const enabledRef = computed(() => {
    if (typeof enabled === 'boolean')
      return enabled

    return enabled?.value ?? true
  })

  const shouldSkipSubmit = (event: KeyboardEvent) => {
    if (
      event.isComposing
      || event.shiftKey
      || event.altKey
      || event.ctrlKey
      || event.metaKey
      || !visible.value
      || !enabledRef.value
      || submitting.value
      || event.defaultPrevented
    ) {
      return true
    }

    const container = getContainer()
    if (!container || !(event.target instanceof Node) || !container.contains(event.target))
      return true

    const target = event.target as HTMLElement | null
    if (target?.closest('textarea,[contenteditable=true]'))
      return true
    if (shouldRespectDefaultEnterBehavior(target))
      return true

    return false
  }

  const handleEnterSubmit = (event: KeyboardEvent) => {
    if (event.key !== 'Enter' || shouldSkipSubmit(event))
      return

    event.preventDefault()
    resolve()
  }

  const toggleListener = (shouldListen: boolean) => {
    if (stopListener) {
      stopListener()
      stopListener = null
    }

    if (shouldListen && runtimeWindow) {
      stopListener = useEventListener(runtimeWindow, 'keydown', handleEnterSubmit, {
        passive: false,
      })
    }
  }

  watch([visible, enabledRef], ([visibleValue, enabledValue]) => {
    toggleListener(visibleValue && enabledValue)
  }, { immediate: true })

  onBeforeUnmount(() => toggleListener(false))
}
