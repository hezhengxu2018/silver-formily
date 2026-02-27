# 介绍

表单开发是一直以来都是前端领域的一大痛点，由于和业务高度绑定，其交互的复杂度也会随着需求的变化，在一些复杂的表单场景下，表单的开发和维护成本会非常高。

在接触到 Formily 之后，我发现这套表单解决方案除了有较高的学习成本之外带来的便利是明显的，他提供了一套基于Schema的DSL，结合了领域模型与元数据编程的思想，使得表单的开发和维护成本大大降低，同时也提高了表单的可维护性和可扩展性。

## 项目定位与适用场景

- 希望延续或复用 Element Plus 视觉体系，但又想享受到 Formily 强大的 Schema 表达力与编排能力的团队。
- 需要在大型业务系统中维护一套稳定、可测试的表单组件集合，并且期望通过 DSL 对表单行为做“配置化”编排的项目。
- 已经使用 `@formily/element-plus`，但在交互体验、版本依赖或扩展性上遇到瓶颈，需要更贴合实际场景实现的用户。

## 快速上手流程

以下步骤可以帮助首次接触本项目的用户迅速完成从安装到渲染的闭环，详情可结合「组件 → 快速开始」文档阅读。

### 1. 安装依赖

```bash
pnpm config set auto-install-peers true
pnpm add @formily/core @formily/json-schema @silver-formily/vue @silver-formily/element-plus element-plus
```

> 如果团队需要锁定 Element Plus 或 Formily 的特定版本，请在 package.json 中明确指定，以避免 peerDependencies 带来的漂移。

### 2. 注册组件与 SchemaField

```ts
import { FormItem, Input, Select, Submit } from '@silver-formily/element-plus'
import { createSchemaField } from '@silver-formily/vue'

export const { SchemaField } = createSchemaField({
  components: { FormItem, Input, Select, Submit },
})
```

> SchemaField 是承载 Schema DSL 的枢纽，建议集中维护组件映射，方便统一替换或扩展。

### 3. 创建表单实例

```ts
import { createForm } from '@formily/core'

const form = createForm({
  effects(form) {
    onFieldValueChange('region', (field) => {
      if (field.value === 'remote') {
        form.setFieldState('address', state => (state.display = 'none'))
      }
      else {
        form.setFieldState('address', state => (state.display = 'visible'))
      }
    })
  },
})
```

### 4. 完整示例

```vue
<script setup lang="ts">
import { createForm, onFieldValueChange } from '@formily/core'
import { FormItem, Input, Select, Submit } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const { SchemaField } = createSchemaField({
  components: { FormItem, Input, Select, Submit },
})

const form = createForm({
  effects(form) {
    onFieldValueChange('region', (field) => {
      if (field.value === 'remote') {
        form.setFieldState('address', state => (state.display = 'none'))
      }
      else {
        form.setFieldState('address', state => (state.display = 'visible'))
      }
    })
  },
})

const schema = {
  type: 'object',
  properties: {
    name: {
      'type': 'string',
      'title': '姓名',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'required': true,
    },
    address: {
      'type': 'string',
      'title': '地址',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'required': true,
    },
    region: {
      'type': 'string',
      'title': '区域',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'enum': [
        { label: '本地', value: 'local' },
        { label: '远程', value: 'remote' },
      ],
    },
  },
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" />
    <Submit>提交</Submit>
  </FormProvider>
</template>
```

::: tip 提示
Formily提供了三种不同的描述表单的方式，可以根据实际需要选择。template的写法可能更好上手，但无法获得完整的能力。可以先从template开始熟悉模型的字段，再慢慢接触Schema的写法。
:::

## 重构动机

formily的生态还是较为完善的，但也存在一些问题。这套框架的主要开发成员来自于阿里，而阿里的技术栈更偏向于React，对于自家的Antd组件库有着更成熟的支持，而其在element-plus组件库的封装在真正投入到生产环境中时会产生各种各样的交互问题。也因此有了这个项目。
