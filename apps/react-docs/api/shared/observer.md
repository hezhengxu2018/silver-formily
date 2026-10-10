# observer

## 描述

observer 是从 [@silver-formily/reactive-react](https://reactive-react.silver-formily.org/) 中导出的，API 完全一致，使用 observer 主要是将组件支持响应式更新能力。

在 `@silver-formily/react` 中，任何读取 Form / Field 等响应式模型的自定义组件都必须用 observer 包裹，否则组件无法随数据变化更新。

## 用例

:::demo
api/shared/observer.tsx
:::
