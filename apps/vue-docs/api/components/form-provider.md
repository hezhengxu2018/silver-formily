---
order: 6
---

# FormProvider

## 描述

入口组件，用于下发表单上下文给字段组件，负责整个表单状态的通讯，它相当于是一个通讯枢纽。

## 用例

::: demo
api/components/form-provider
:::

## API

| 属性 | 说明                                 | 类型                                               | 默认值 |
| ---- | ------------------------------------ | -------------------------------------------------- | ------ |
| form | Form 实例, `createForm` 函数的返回值 | [Form](https://core.formilyjs.org/api/models/form) | -      |
