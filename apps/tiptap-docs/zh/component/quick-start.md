# 快速开始

## 介绍

`@silver-formily/tiptap` 是一个基于 `Tiptap` 的 Silver Formily 富文本字段封装。

它的目标不是做“功能无限多的一体化编辑器”，而是先提供一套适合表单场景的稳定底座：

- 可直接作为 Formily 字段使用
- 支持 `html` / `json` 两种输出模式
- 支持 `readPretty` 预览态
- 支持按需扩展 `extensions`
- 优先保证 Formily 场景里的稳定编辑体验

## 安装

::: code-group

```shell [pnpm]
pnpm add @silver-formily/tiptap
```

```shell [npm]
npm install @silver-formily/tiptap
```

:::

## 基础用法

```ts
import { RichText } from '@silver-formily/tiptap'
import { createSchemaField } from '@silver-formily/vue'

const { SchemaField } = createSchemaField({
  components: {
    RichText,
  },
})
```

```vue
<SchemaField.String
  name="content"
  title="内容"
  x-component="RichText"
  :x-component-props="{
    placeholder: '请输入内容',
    output: 'html',
  }"
/>
```

## 在线预览

:::demo

rich-text/basic

:::

## 说明

- `placeholder` 当前为轻量视觉占位提示
- `autofocus` 和 `editorProps` 会在 editor 创建完成后再应用
- 如果要排查扩展兼容性，建议优先使用 `tiptap-playground` 做对照验证
