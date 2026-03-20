---
mobileDemo: input/index.vue
---

# Input

> `Input` 负责值输入、原生 `input` / `textarea` 属性透传，以及和 `FormItem` 搭配时的输入增强能力。

:::tip 使用约定
当前实现里真正承接 `VanField` UI 的是 `FormItem`。因此 `clearable`、`showWordLimit`、`leftIcon` 这类 Vant 输入增强属性，仍然建议写在 `Input` 上，再由内部自动桥接到外层 `FormItem`。
:::

## 推荐写法

- `:component="[Input, props]"` / `x-component-props`：放输入值、占位符、清空能力、字数统计、图标等输入行为属性
- `:decorator="[FormItem, props]"` / `x-decorator-props`：放标签、额外说明、反馈状态、布局对齐等装饰器属性

```vue
<Field
  name="description"
  title="详细描述"
  :decorator="[FormItem]"
  :component="[
    Input.TextArea,
    {
      rows: 4,
      maxlength: 120,
      showWordLimit: true,
      clearable: true,
      placeholder: '请输入详细描述',
    },
  ]"
/>
```

## 基础输入

<<< @/zh/demos/input/basic.vue

## 常见类型

<<< @/zh/demos/input/types.vue

## 只读与禁用

<<< @/zh/demos/input/status.vue

## 图标与清空

<<< @/zh/demos/input/icons.vue

## 字数统计

<<< @/zh/demos/input/word-limit.vue

## API

### 使用约定

- `Input` 和 `Input.TextArea` 都会透传未单独列出的原生 `input` / `textarea` 属性与 DOM 事件
- 标准写法推荐使用 `readonly`；如果沿用了 Formily 生态里更常见的 `readOnly`，当前封装也会兼容映射
- `clearable`、`showWordLimit`、`leftIcon`、`rightIcon` 等增强属性在单独使用 `Input` 时不会渲染 `VanField` UI；和 `FormItem` 搭配时会自动桥接到外层 `VanField`

### Input 基础属性

| 属性名           | 类型                                                                                         | 描述                                                                      | 默认值   |
| ---------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | -------- |
| `modelValue`     | `string` \| `number` \| `null`                                                               | 当前输入值                                                                | `-`      |
| `id`             | `string`                                                                                     | 原生输入框 `id`                                                           | `-`      |
| `name`           | `string`                                                                                     | 原生输入框 `name`                                                         | `-`      |
| `type`           | `string`                                                                                     | 输入类型；常见值包括 `text`、`tel`、`url`、`number`、`password`、`search` | `'text'` |
| `placeholder`    | `string`                                                                                     | 占位提示文案                                                              | `-`      |
| `readonly`       | `boolean`                                                                                    | 只读状态；和 `FormItem` 搭配时会同步外层只读样式                          | `false`  |
| `disabled`       | `boolean`                                                                                    | 禁用状态；和 `FormItem` 搭配时会同步外层禁用样式                          | `false`  |
| `autofocus`      | `boolean`                                                                                    | 是否自动聚焦                                                              | `false`  |
| `autocomplete`   | `string`                                                                                     | 原生自动完成属性                                                          | `-`      |
| `autocapitalize` | `string`                                                                                     | 原生自动大写策略                                                          | `-`      |
| `autocorrect`    | `string`                                                                                     | 原生自动纠错策略                                                          | `-`      |
| `enterkeyhint`   | ^[enum]`'enter' \| 'done' \| 'go' \| 'next' \| 'previous' \| 'search' \| 'send'`             | 移动端回车键提示文案                                                      | `-`      |
| `inputmode`      | ^[enum]`'none' \| 'text' \| 'decimal' \| 'numeric' \| 'tel' \| 'search' \| 'email' \| 'url'` | 原生输入模式                                                              | `-`      |
| `spellcheck`     | `boolean` \| `null`                                                                          | 是否开启浏览器拼写检查                                                    | `null`   |

### Input 数值与格式化属性

| 属性名          | 类型                                   | 描述                     | 默认值       |
| --------------- | -------------------------------------- | ------------------------ | ------------ |
| `maxlength`     | `number` \| `string`                   | 最大字符数               | `-`          |
| `min`           | `number`                               | 最小值，常用于数值类输入 | `-`          |
| `max`           | `number`                               | 最大值，常用于数值类输入 | `-`          |
| `formatter`     | ^[Function]`(value: string) => string` | 输入格式化函数           | `-`          |
| `formatTrigger` | ^[enum]`'onChange' \| 'onBlur'`        | 格式化触发时机           | `'onChange'` |

### Input 桥接属性

这些属性来自官方 `Field`，在当前封装里推荐写在 `Input` 上，再由 `FormItem` 自动桥接到外层 `VanField`。

| 属性名             | 类型                                     | 描述                                                                    | 默认值                                   |
| ------------------ | ---------------------------------------- | ----------------------------------------------------------------------- | ---------------------------------------- |
| `clearable`        | `boolean`                                | 和 `FormItem` 搭配时显示清空图标                                        | `false`                                  |
| `clearIcon`        | `string`                                 | 自定义清空图标                                                          | `'clear'`                                |
| `clearTrigger`     | ^[enum]`'focus' \| 'always'`             | 清空图标展示时机；和 `FormItem` 搭配且未显式传值时会默认补成 `'always'` | `'focus'`，桥接模式下自动补成 `'always'` |
| `inputAlign`       | ^[enum]`'left' \| 'center' \| 'right'`   | 输入内容对齐方式                                                        | `-`                                      |
| `leftIcon`         | `string`                                 | 左侧图标名称或图片链接；和 `FormItem` 搭配时显示在外层 `VanField`       | `-`                                      |
| `rightIcon`        | `string`                                 | 右侧图标名称或图片链接；和 `FormItem` 搭配时显示在外层 `VanField`       | `-`                                      |
| `iconPrefix`       | `string`                                 | 图标类名前缀                                                            | `-`                                      |
| `showWordLimit`    | `boolean`                                | 和 `FormItem` 搭配时显示字数统计                                        | `false`                                  |
| `onClear`          | ^[Function]`(event: MouseEvent) => void` | 清空按钮点击回调；需和 `FormItem` 搭配                                  | `-`                                      |
| `onClickInput`     | ^[Function]`(event: MouseEvent) => void` | 输入区域点击回调；需和 `FormItem` 搭配                                  | `-`                                      |
| `onClickLeftIcon`  | ^[Function]`(event: MouseEvent) => void` | 左侧图标点击回调；需和 `FormItem` 搭配                                  | `-`                                      |
| `onClickRightIcon` | ^[Function]`(event: MouseEvent) => void` | 右侧图标点击回调；需和 `FormItem` 搭配                                  | `-`                                      |

### Input.TextArea Attributes

`Input.TextArea` 继承 `Input` 的全部属性与事件，并额外补充下列配置：

| 属性名     | 类型                                                               | 描述                 | 默认值       |
| ---------- | ------------------------------------------------------------------ | -------------------- | ------------ |
| `type`     | ^[enum]`'textarea'`                                                | 固定使用多行文本模式 | `'textarea'` |
| `rows`     | `number` \| `string`                                               | 可见行数             | `-`          |
| `autosize` | `boolean` \| ^[object]`{ minHeight?: number; maxHeight?: number }` | 是否自适应内容高度   | `-`          |

### Input Events

| 事件名              | 描述             | 回调参数                                 |
| ------------------- | ---------------- | ---------------------------------------- |
| `update:modelValue` | 输入值变化时触发 | ^[Function]`(value: string) => void`     |
| `focus`             | 获得焦点时触发   | ^[Function]`(event: FocusEvent) => void` |
| `blur`              | 失去焦点时触发   | ^[Function]`(event: FocusEvent) => void` |

### 参考

输入增强属性的命名与默认值主要参考 [Vant Field 官方文档（正式站）](https://vant-ui.github.io/vant/#/zh-CN/field)。
