import type { GeneralField } from '@formily/core'
import type { Component } from 'vue'
import type { IComponentMapper, IStateMapper, VueComponentProps } from '../types'
import { isVoidField } from '@formily/core'
import { each, FormPath, isFn, isStr, isValid } from '@formily/shared'
import { observer } from '@silver-formily/reactive-vue'
import { defineComponent, h, markRaw } from 'vue'
import { useField } from '../hooks/useField'

import { createVNodeProps, extractAttrsAndEvents } from '../utils/reactiveFieldHelpers'

export function mapProps<T extends Component = Component>(
  ...args: IStateMapper<VueComponentProps<T>>[]
) {
  const transform = (input: VueComponentProps<T>, field: GeneralField) =>
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
            const baseAttrs = { ...normalizedAttrs } as VueComponentProps<T>
            const newAttrs = fieldRef.value ? transform(baseAttrs, fieldRef.value) : baseAttrs
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
              field && !isVoidField(field) && field.pattern === 'readPretty' ? component : target,
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

export function connect<T extends Component>(target: T, ...args: IComponentMapper[]): T {
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

  return markRaw(functionalComponent) as unknown as T
}
