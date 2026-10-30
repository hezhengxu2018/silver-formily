# 快速开始

`@silver-formily/antd-mobile` 是 Silver Formily 面向 [Ant Design Mobile](https://mobile.ant.design/)（antd-mobile v5）的移动端组件绑定层，用于构建移动端、H5 与触控优先的 React 表单系统。

::: tip 提示
由于 antd-mobile 本身就内置了一套轻量的表单管理，0基础使用本封装的意义并不大。主要面向已经习惯了formily封装写法的用户。
:::

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

与其他 formily 封装类似，使用 `createForm` 创建表单实例，`FormProvider` 注入上下文，`Field` 声明字段：`decorator` 指定 `FormItem`，`component` 指定交互组件。

<<< @/zh/demos/quick-start/basic.tsx
