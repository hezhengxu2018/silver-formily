import type { ComputedRef, InjectionKey, Ref } from 'vue'
import type { IFormLayoutProps } from './types'
import { isArr, isValid } from '@formily/shared'
import { useResizeObserver } from '@vueuse/core'
import { computed, inject, ref } from 'vue'

export function calcBreakpointIndex(breakpoints: number[], width: number): number {
  for (const [i, breakpoint] of breakpoints.entries()) {
    if (width <= breakpoint) {
      return i
    }
  }
  return -1
}

export function calcFactor<T>(value: T | readonly T[], breakpointIndex: number): T {
  if (!Array.isArray(value) || value.length === 0) {
    return value as T
  }
  const safeIndex = Math.max(-1, Math.min(breakpointIndex, value.length - 1))
  return value.at(safeIndex)
}

export function factor<T>(value: T | T[], breakpointIndex: number): T {
  return isValid(value) ? calcFactor<T>(value, breakpointIndex) : value as T
}

export function calculateProps(target: Element, props: IFormLayoutProps): IFormLayoutProps {
  const { clientWidth } = target
  const {
    breakpoints,
    layout,
    labelAlign,
    wrapperAlign,
    labelCol,
    wrapperCol,
    ...otherProps
  } = props
  const breakpointIndex = calcBreakpointIndex(
    breakpoints as number[],
    clientWidth,
  )

  return {
    layout: factor(layout, breakpointIndex),
    labelAlign: factor(labelAlign, breakpointIndex),
    wrapperAlign: factor(wrapperAlign, breakpointIndex),
    labelCol: factor(labelCol, breakpointIndex),
    wrapperCol: factor(wrapperCol, breakpointIndex),
    ...otherProps,
  }
}

export function useResponsiveFormLayout(props: IFormLayoutProps, root: Ref<HTMLElement | null>) {
  const { breakpoints } = props
  if (!isArr(breakpoints)) {
    return {
      props: ref(props),
    }
  }

  const layoutProps = ref<IFormLayoutProps>({})

  useResizeObserver(root, () => {
    layoutProps.value = calculateProps(root.value, props)
  })

  return {
    props: layoutProps,
  }
}

export const formLayoutDeepContext: InjectionKey<Ref<IFormLayoutProps>> = Symbol(
  'formLayoutDeepContext',
)

export const formLayoutShallowContext: InjectionKey<Ref<IFormLayoutProps>>
  = Symbol('formLayoutShallowContext')

export const formLayoutIdContext: InjectionKey<ComputedRef<string>>
  = Symbol('formLayoutIdContext')

export function useFormDeepLayout(): Ref<IFormLayoutProps> {
  return inject(formLayoutDeepContext, ref({}))
}

export function useFormLayout(): Ref<IFormLayoutProps> {
  const shallowLayout = inject(formLayoutShallowContext, ref({}))
  const deepLayout = inject(formLayoutDeepContext, ref({}))

  const formLayout = computed(() => {
    return {
      ...deepLayout.value,
      ...shallowLayout.value,
    }
  })

  return formLayout
}

export function useFormLayoutId(): ComputedRef<string> {
  return inject(formLayoutIdContext)
}

export const FORM_LAYOUT_PROPS_KEYS: ReadonlyArray<keyof IFormLayoutProps> = [
  'colon',
  'labelAlign',
  'wrapperAlign',
  'labelWrap',
  'labelWidth',
  'wrapperWidth',
  'labelCol',
  'wrapperCol',
  'fullness',
  'size',
  'layout',
  'feedbackLayout',
  'tooltipLayout',
  'breakpoints',
  'hideRequiredAsterisk',
  'statusIcon',
  'requireAsteriskPosition',
] as const

export function filterValidFormLayoutProps(props: IFormLayoutProps): IFormLayoutProps {
  return Object.fromEntries(
    Object.entries(props)
      .filter(([_, value]) => isValid(value)),
  )
}
