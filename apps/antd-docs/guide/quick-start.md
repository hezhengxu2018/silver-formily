# 快速开始

## 安装

```sh
pnpm add @silver-formily/antd @silver-formily/core @silver-formily/react @silver-formily/shared antd@^6.6.5 @ant-design/icons@^6 react@^19 react-dom@^19
```

其余 Silver Formily peer 依赖沿工作区的包关系解析。使用与应用一致的 React 18 或 19；不要重复安装多个 React 运行时。

无需手动引入 Ant Design 4 的 Less 或旧版 `antd/dist/antd.css`。本包样式随组件加载。

## JSX 字段

用 `createForm` 创建稳定的表单实例，`Form` 负责提供上下文、布局和原生提交，字段通过 `FormItem` 展示标签与反馈。

:::demo
form.tsx
:::

## JSON Schema

`createSchemaField` 来自 `@silver-formily/react`。先注册本次已迁移的组件，再通过 `x-component` 和 `x-decorator` 引用。

:::demo
schema.tsx
:::

已有 `FormProvider` 时也可省略 `Form.form`，让它继承父级表单。表单实例需要替换时，请通过 React `key` 重新挂载整棵表单。
