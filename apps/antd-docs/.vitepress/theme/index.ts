import type { ComponentType } from 'react'
import type { EnhanceAppContext } from 'vitepress'
import type { PropType } from 'vue'
import Theme from '@silver-formily/docs-toolkit/theme'
import { createElement } from 'react'
import { computed, defineComponent, h } from 'vue'
import { DemoConfig } from './demo-config'

export default {
  ...Theme,
  enhanceApp(ctx: EnhanceAppContext) {
    Theme.enhanceApp?.(ctx)
    const DemoBox = ctx.app.component('VitepressDemoBox')!

    ctx.app.component('VitepressDemoBox', defineComponent({
      name: 'AntdDemoBox',
      inheritAttrs: false,
      props: {
        reactComponent: null as unknown as PropType<ComponentType>,
      },
      setup(props, { attrs, slots }) {
        // Keep the wrapper stable across Vue renders so React preserves form state.
        const wrappedComponent = computed(() => {
          const Demo = props.reactComponent
          return Demo ? () => createElement(DemoConfig, null, createElement(Demo)) : undefined
        })
        return () => h(DemoBox, { ...attrs, reactComponent: wrappedComponent.value }, slots)
      },
    }))
  },
}
