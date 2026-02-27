import type { IComponentMapper } from '@silver-formily/vue'
import type { Component } from 'vue'
import { isVoidField } from '@formily/core'
import { observer } from '@silver-formily/reactive-vue'
import { useField } from '@silver-formily/vue'
import { defineComponent, h } from 'vue'

// fork from https://github.com/alibaba/formily/blob/7c64c671252adf85471ac5aabfddbaf4fc537354/packages/vue/src/shared/connect.ts#L65
export function mapReadPretty(
  component: Component,
  readPrettyProps?: Record<string, any>,
): IComponentMapper {
  const mapper = (target: Component) => {
    return observer(
      defineComponent({
        name: target.name ? `Read${target.name}` : `ReadComponent`,
        setup(props, { attrs, slots, listeners }: Record<string, any>) {
          const fieldRef = useField()
          return () => {
            const field = fieldRef.value
            const isEditableReadPretty = !!field?.data?.readPretty
            return h(
              field && !isVoidField(field) && (field.pattern === 'readPretty' || isEditableReadPretty)
                ? component
                : target,
              {
                attrs: {
                  ...readPrettyProps,
                  ...attrs,
                },
                on: listeners,
              },
              slots,
            )
          }
        },
      }),
    )
  }

  return mapper as unknown as IComponentMapper
}
