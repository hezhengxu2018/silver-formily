# mapReadPretty

## 描述

因为大多数第三方组件都不支持阅读态，如果想要快速支持阅读态的话，即可使用 mapReadPretty 函数来映射一个阅读态组件

## 签名

```ts
interface mapReadPretty<T extends JSXComponent, C extends JSXComponent> {
  (component: C, readPrettyProps?: React.ComponentProps<C>): IComponentMapper<T>
}
```

第二个参数可以为阅读态组件声明额外 props，阅读态渲染时会与原组件收到的 props 合并（阅读态组件的 props 优先级更高）。

## 用例

:::demo
api/shared/map-read-pretty.tsx
:::
