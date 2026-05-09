# `@silver-formily/tiptap`

基于 `Tiptap` 的 Silver Formily 富文本封装。

## 为什么单独拆包

- 避免把富文本编辑器的运行时依赖直接塞进某个特定 UI 包
- 方便后续单独演进扩展能力，例如图片上传、表格、协同、Markdown / DOCX 转换
- 保持 Silver Formily 字段封装的“薄包装 + Formily connect + readPretty”风格

## 当前能力范围

- `RichText` Formily 字段组件
- 默认基础工具栏
- `html` / `json` 两种输出模式
- `readOnly` / `disabled`
- `readPretty` 预览态
- 自定义 `extensions`
- 轻量占位提示
- 后置 `autofocus`
- 后置 `editorProps`
- 自定义 HTML 清洗函数 `sanitize`

## 暂未内置

- 图片上传
- 表格
- Slash menu
- 评论 / 协同编辑
- Markdown / DOCX 导入导出

## 安装

```bash
pnpm add @silver-formily/tiptap @tiptap/vue-3 @tiptap/starter-kit
```

如果你在 monorepo 内开发，直接使用 workspace 依赖即可。

## 使用示例

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
    output: 'html',
    placeholder: '请输入内容',
  }"
/>
```

## API

### `RichText`

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

### 稳定性说明

当前实现优先保证在 `Formily` 场景里的稳定挂载和可编辑性，因此有几项能力采用了更保守的处理方式：

- `placeholder` 目前是轻量视觉占位提示，不依赖额外的 Tiptap placeholder 扩展
- `autofocus` 会在 editor 创建完成后再执行 `focus()`
- `editorProps` 会在 editor 创建完成后通过 `setOptions()` 应用
- 编辑器真实 DOM 由内部宿主组件单独管理，避免 Formily 外层重渲染直接碰到 ProseMirror 节点

### `readPretty` 说明

`output="html"` 时会直接渲染 HTML。

`output="json"` 时会通过 `@tiptap/html` 结合当前扩展列表转成静态 HTML。

## 安全说明

预览态会使用 `v-html` 渲染内容。对于不可信内容，建议显式传入 `sanitize` 函数后再展示。
