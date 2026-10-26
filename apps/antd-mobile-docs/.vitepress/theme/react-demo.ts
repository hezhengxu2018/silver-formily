import type { Component } from 'vue'

type ReactDemoModule = () => Promise<unknown>

/**
 * 将 `import.meta.glob` 收集到的 React demo 模块表转换为主题
 * `mobilePreviewRegistryKey` 所需的注册表：loader 返回 `{ default: Vue 外壳组件 }`。
 */
export function createReactDemoRegistry(
  glob: Record<string, ReactDemoModule>,
): Record<string, () => Promise<{ default: Component }>> {
  return Object.fromEntries(
    Object.entries(glob).map(([path, loader]) => [
      path.replace('../../', ''),
      async () => {
        // Only the preview route invokes these loaders. Keep antd-mobile and
        // its global styles out of the documentation theme's static imports.
        const { createReactIsland } = await import('./react-demo-runtime')
        const module = await loader()
        const ReactComponent
          = (module as { default?: unknown }).default ?? module
        return { default: createReactIsland(ReactComponent) }
      },
    ]),
  )
}
