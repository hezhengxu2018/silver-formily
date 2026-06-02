# VoidField 模型

> 虚字段模型，用于布局、分组和展示，不承载数据

## 描述

`VoidField` 是一种特殊的字段模型，**不承载数据值**。它通常用于：

- 表单布局分组（如 Card、Tab 等容器）
- 纯展示内容
- 作为其他字段的容器

与 `Field` 不同，`VoidField` 没有 `value`、`validator` 等数据相关属性。

## 构造

```ts
const voidField = form.createVoidField({
  name: 'layout',
  title: '基本信息分组',
})
```

## 属性

`VoidField` 仅继承 `BaseField` 的基础属性：

| 属性             | 类型                | 说明         |
| ---------------- | ------------------- | ------------ |
| `name`           | `string`            | 字段名称     |
| `path`           | `string`            | 字段完整路径 |
| `title`          | `any`               | 标题         |
| `description`    | `any`               | 描述         |
| `display`        | `FieldDisplayTypes` | 显隐         |
| `pattern`        | `FieldPatternTypes` | 模式         |
| `mounted`        | `boolean`           | 是否挂载     |
| `hidden`         | `boolean`           | 是否隐藏     |
| `visible`        | `boolean`           | 是否可见     |
| `editable`       | `boolean`           | 是否可编辑   |
| `disabled`       | `boolean`           | 是否禁用     |
| `form`           | `Form`              | 所属表单     |
| `parent`         | `GeneralField`      | 父字段       |
| `componentType`  | `Component`         | 组件类型     |
| `componentProps` | `object`            | 组件参数     |
| `decoratorType`  | `Decorator`         | 装饰器类型   |
| `decoratorProps` | `object`            | 装饰器参数   |

注意：VoidField **没有** `value`、`inputValue`、`validator`、`errors` 等数据字段属性。

## 方法

与数据字段共享基础方法，但不包含值和校验相关方法：

| 方法                   | 说明     |
| ---------------------- | -------- |
| `setPattern(pattern)`  | 设置模式 |
| `setDisplay(display)`  | 设置显隐 |
| `setTitle(title)`      | 设置标题 |
| `setDescription(desc)` | 设置描述 |
| `getState(selector?)`  | 获取状态 |
| `setState(setter)`     | 设置状态 |

## 用例

### 布局容器

```ts
import { createForm } from '@silver-formily/core'

const form = createForm()

// 创建虚字段作为布局容器
const layout = form.createVoidField({
  name: 'basicInfo',
  title: '基本信息',
  component: [CardComponent],
})

// 在容器内创建数据字段
const username = form.createField({
  name: 'basicInfo.username',
  value: '',
})

const email = form.createField({
  name: 'basicInfo.email',
  value: '',
})
```

### 条件显隐

```ts
const voidField = form.createVoidField({
  name: 'advancedSection',
  title: '高级选项',
})

// 根据其他字段控制显隐
voidField.visible = form.values.showAdvanced
```

### 与类型检查配合

```ts
import { isField, isVoidField } from '@silver-formily/core'

form.query('*').forEach((node) => {
  if (isVoidField(node)) {
    // 跳过虚字段，不处理数据
    return
  }
  if (isField(node)) {
    console.log('处理数据字段:', node.path)
  }
})
```
