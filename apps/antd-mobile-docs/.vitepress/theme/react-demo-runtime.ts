import type { Root } from 'react-dom/client'
import type { Component } from 'vue'
import { unstableSetRender } from 'antd-mobile'
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { defineComponent, h, onBeforeUnmount, onMounted, ref } from 'vue'
import './style.css'

// antd-mobile v5 的命令式弹层（Dialog/Toast 等）默认经 rc-util 从
// `react-dom` 主入口取 createRoot，而 React 19 已不再从主入口导出它。
// 这里按官方 React 19 兼容方案注入 `react-dom/client` 的实现。
unstableSetRender((element, container) => {
  const root = createRoot(container)
  root.render(element)
  return async () => {
    root.unmount()
  }
})

/**
 * 把一个 React 组件包装为可被 Vue `<component :is>` 渲染的外壳组件。
 * `createRoot` 仅在 onMounted 时调用，保证 VitePress SSR 构建安全。
 */
export function createReactIsland(ReactComponent: unknown): Component {
  return defineComponent({
    name: 'ReactDemoIsland',
    setup() {
      const container = ref<HTMLElement>()
      let root: Root | undefined

      onMounted(() => {
        if (container.value) {
          root = createRoot(container.value)
          root.render(createElement(ReactComponent as React.ComponentType))
        }
      })

      onBeforeUnmount(() => {
        root?.unmount()
        root = undefined
      })

      return () => h('div', { class: 'react-demo-island', ref: container })
    },
  })
}

