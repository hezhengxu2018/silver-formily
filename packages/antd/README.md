# @silver-formily/antd

[![npm version](https://img.shields.io/npm/v/@silver-formily/antd)](https://www.npmjs.com/package/@silver-formily/antd)
[![npm downloads](https://img.shields.io/npm/dm/@silver-formily/antd)](https://www.npmjs.com/package/@silver-formily/antd)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[简体中文](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/antd/README.md) | [English](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/antd/README.en.md)

`@silver-formily/antd` 为 React 18/19 提供基于 Ant Design 6 的表单组件。

## 安装

```bash
pnpm add \
  @silver-formily/antd \
  '@ant-design/icons@^6' \
  @silver-formily/core \
  @silver-formily/react \
  @silver-formily/shared \
  'antd@^6.6.5' \
  'react@^18 || ^19' \
  'react-dom@^18 || ^19'
```

安装命令包含必需的 peer 依赖；已有项目请保留满足版本范围的现有依赖。

## 功能

提供 Form、FormItem、FormLayout、FormGrid、FormButtonGroup、Input（含 TextArea）、Select、NumberPicker、PreviewText、Submit 和 Reset。

本包按所需范围迁移自 [Alibaba Formily antd 包](https://github.com/alibaba/formily/tree/d9a46442a575aa5f0fc1bd945e34d9a85d191d0e/packages/antd)（`@formily/antd@2.3.7`）。 尚未包含数组、日期时间、上传、树控件及场景组件。

## 快速上手

```tsx
import { Form, FormItem, Input, Submit } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { Field } from '@silver-formily/react'
import { useState } from 'react'

export default function Example() {
  const [form] = useState(() => createForm())
  return (
    <Form form={form} onAutoSubmit={values => console.log(values)}>
      <Field name="name" title="Name" required decorator={[FormItem]} component={[Input]} />
      <Submit>Submit</Submit>
    </Form>
  )
}
```

样式随组件自动加载，不支持 Ant Design 4 Less 文件及 `@formily/*` 导入。

## 迁移说明

- 上游基线： `d9a46442a575aa5f0fc1bd945e34d9a85d191d0e`，位于 `formily_next` 分支。
- 状态与 React 绑定统一使用本仓库的 `@silver-formily/*` 包。
- tsdown 将 ESM 产物和类型声明输出到 `esm/`。
- 局部 CSS 使用 `ConfigProvider` 主题 token，不依赖旧版 Ant Design Less。
- FormItem 保留布局与字段映射；输入组件通过上下文获取状态和尺寸，外观继承原生 ConfigProvider variant。
- PreviewText 仅包含三类已迁移输入组件对应的阅读态及共享占位 API。
- FormLayout 保留响应式、浅层与深层配置语义，包括显式 false 值。
- FormGrid 与 Element Plus 适配层共用 Grid 运行时，支持容器响应式列数、FormItem/GridColumn 跨列及外部控制的折叠查询表单。`gridSpan={-1}` 填满当前行剩余列。
- Sticky 默认在所属 Form 底部固定；`position="top"` 或 `bottom={false}` 用于吸顶，显式 `container` 可覆盖表单边界。
- 将旧 FormItem/FormLayout 的 `bordered={false}` 改为 `variant="borderless"`。Form、FormLayout、FormItem 支持 outlined、filled、borderless、underlined；控件显式 variant 优先。
- Ant Design 控件属性遵循 v6，包括 `variant`、`open`、`orientation`。
- Submit 防止重复点击及原生与程序化重复提交；Reset 在核心重置 Promise 完成后反馈校验结果。

## 开发

```sh
pnpm exec turbo run build --filter=@silver-formily/antd...
pnpm --filter @silver-formily/antd test:browser
pnpm --filter @silver-formily/antd check-types
pnpm dev -- antd-docs
pnpm exec turbo run docs:build --filter=antd-docs
```

## 文档

- [组件文档源码](https://github.com/hezhengxu2018/silver-formily/tree/main/apps/antd-docs)
- [项目首页](https://silver-formily.org/)
- [源码](https://github.com/hezhengxu2018/silver-formily/tree/main/packages/antd)
- [问题反馈](https://github.com/hezhengxu2018/silver-formily/issues)

## 许可证

[MIT](https://opensource.org/licenses/MIT)

原始 Alibaba MIT 许可证保留在包内 LICENSE 文件中。
