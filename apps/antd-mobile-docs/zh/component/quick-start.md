# 快速开始

`@silver-formily/antd-mobile` 是 Silver Formily 面向 [Ant Design Mobile](https://mobile.ant.design/)（antd-mobile v5）的移动端组件绑定层，用于构建移动端、H5 与触控优先的 React 表单系统。

## 特性

- **字段协议驱动**：基于 `@silver-formily/core` 与 `@silver-formily/react`，通过 `Field` / `FormProvider` 声明表单结构。
- **统一的封装模式**：`FormItem` 承担装饰器职责，交互组件（`Input`、`Switch`、`DatePicker` 等）承担组件职责，与 formily 官方封装库的心智模型一致。
- **阅读态支持**：字段组件默认接入 `PreviewText` 阅读态展示。
- **React 18 / 19**：函数组件不依赖 `defaultProps`，可在 React 19 下运行。

## 安装

::: code-group

```bash [pnpm]
pnpm add @silver-formily/antd-mobile antd-mobile antd-mobile-icons dayjs
```

```bash [npm]
npm install @silver-formily/antd-mobile antd-mobile antd-mobile-icons dayjs
```

```bash [yarn]
yarn add @silver-formily/antd-mobile antd-mobile antd-mobile-icons dayjs
```

:::

组件样式和 antd-mobile 自身样式会随组件自动加载，无需额外导入样式文件。

## 基础用法

使用 `createForm` 创建表单实例，`FormProvider` 注入上下文，`Field` 声明字段：`decorator` 指定 `FormItem`，`component` 指定交互组件。

::: tip 组件职责

- 表单上下文（`FormProvider` / `Field` / `SchemaField`）来自 `@silver-formily/react`；
- `FormItem` / `Input` / `Submit` 等移动端组件来自 `@silver-formily/antd-mobile`；
- `createForm` 来自 `@silver-formily/core`。

:::

<<< @/zh/demos/quick-start/basic.tsx

## TypeScript

`@silver-formily/antd-mobile` 使用 TypeScript 编写并携带完整类型声明。组件的属性类型在原有命名前加 `I` 前缀（如 `IFormItemProps`、`IFormLayoutProps`、`ISubmitProps`），扩展属性在各组件文档的 API 表格中列出。

## 兼容性

- React `^18 || ^19`
- antd-mobile `^5.43.0`
- 现代浏览器与 H5 WebView（桌面端浏览文档时已启用触摸模拟）
