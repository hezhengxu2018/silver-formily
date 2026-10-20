import { defineComponent, h, onBeforeUnmount, onMounted } from 'vue'

/** Bridge the actual document theme, including iframe postMessage updates. */
export function withThemeSync(Layout, syncTheme) {
  return defineComponent({
    name: 'DocsThemeSyncLayout',
    setup(_, { attrs, slots }) {
      let observer

      onMounted(() => {
        const root = document.documentElement
        const sync = () => syncTheme(root.classList.contains('dark'), root)
        // The mobile preview changes html.dark directly, not useData().isDark.
        observer = new MutationObserver(sync)
        observer.observe(root, { attributes: true, attributeFilter: ['class'] })
        sync()
      })

      onBeforeUnmount(() => observer?.disconnect())

      return () => h(Layout, attrs, slots)
    },
  })
}
