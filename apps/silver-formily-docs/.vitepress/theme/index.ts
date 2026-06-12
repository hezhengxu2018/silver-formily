import type { Theme } from 'vitepress'
import DefaultTheme from '@silver-formily/docs-toolkit/theme'
import Layout from './Layout.vue'

export default {
  ...DefaultTheme,
  Layout,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp?.(ctx)
  },
} satisfies Theme
