# RichText

> 基于 Tiptap 的富文本字段组件

## 基础编辑

:::demo

rich-text/basic

:::

## 纯 Tiptap 对照

:::demo

rich-text/plain-tiptap

:::

## JSON 输出

:::demo

rich-text/json-output

:::

## 只读预览

:::demo

rich-text/read-pretty

:::

## 当前实现说明

- 当前版本优先保证在 Formily 场景里的稳定编辑体验
- `placeholder` 使用轻量视觉占位提示，不依赖额外的 placeholder 扩展
- `autofocus` 会在 editor 创建完成后再执行
- `editorProps` 会在 editor 创建完成后后置应用

## API

### Props

- `modelValue?: string | JSONContent | null`
- `output?: 'html' | 'json'`
- `toolbar?: false | RichTextToolbarItem[]`
- `extensions?: Extensions`
- `placeholder?: string`
- `readOnly?: boolean`
- `disabled?: boolean`
- `sanitize?: (html: string) => string`
- `emptyText?: string`
- `minHeight?: string | number`
- `maxHeight?: string | number`
- `autofocus?: boolean | 'start' | 'end' | 'all' | number | null`
- `editorProps?: EditorOptions['editorProps']`

### 输出建议

- 追求兼容性和简单接入时，优先使用 `html`
- 需要结构化内容、后续还要做 schema 转换或业务解析时，优先使用 `json`

### 使用建议

- 如果是表单正文、公告、说明这类常规场景，先从默认 `StarterKit + html` 开始
- 如果后续要做结构化解析、节点级转换或业务规则校验，再切到 `json`
- 自定义扩展建议逐项增加并在 playground 里回归验证，不要一次性叠很多运行时配置

### 安全说明

预览态会使用 `v-html` 渲染内容。如果内容来源不可信，建议通过 `sanitize` 做清洗后再展示。
