# @silver-formily/element-plus

[English README](./README.en.md)

`@silver-formily/element-plus` 是 Silver Formily 在 Element Plus 生态中的官方适配层。它把表单字段模型、schema 描述和 Element Plus 组件连接起来，提供从基础输入组件到数组场景组件、表单布局组件、预览态组件的一整套现成能力。

## 这个包适合什么场景

如果你的项目已经使用 Vue 3 + Element Plus，并希望用 schema 或字段模型来组织复杂表单，这个包就是最直接的 UI 方案。它适合：

- 后台管理系统和中后台表单
- 配置驱动或低代码场景
- 需要复杂数组字段、分步表单、抽屉/弹窗表单的业务
- 从 `@formily/element-plus` 迁移到 `@silver-formily/element-plus`

## 你能得到什么

- 基础字段组件：`Input`、`Select`、`Checkbox`、`Radio`、`Switch`、`DatePicker`、`Upload` 等
- 数组类组件：`ArrayTable`、`ArrayCards`、`ArrayTabs`、`ArrayCollapse`、`ArrayItems` 等
- 表单结构组件：`FormItem`、`FormLayout`、`FormGrid`、`FormStep`、`FormTab`
- 场景增强组件：`FormDialog`、`FormDrawer`、`QueryForm`、`SelectTable`
- 预览态组件：`PreviewText.*`

## 依赖关系

这个包通常和以下依赖一起使用：

- `vue`
- `element-plus`
- `@silver-formily/vue`
- `@silver-formily/core`
- `@silver-formily/json-schema`
- `@silver-formily/reactive-vue`

## 安装

```bash
pnpm add @silver-formily/element-plus @silver-formily/vue @silver-formily/core @silver-formily/json-schema @silver-formily/reactive @silver-formily/reactive-vue @silver-formily/shared @silver-formily/grid element-plus vue
```

## 为什么它在 npm 页面上值得单独看

因为它不是简单把 Element Plus 包了一层，而是把 Silver Formily 的字段模型、校验状态、decorator、schema 和 Element Plus 的组件契约真正打通。你可以直接在业务里复用它的表单场景组件，而不必从零搭建整套 glue code。

## 文档

- 文档站点：<https://element-plus.silver-formily.org>
- 仓库主页：<https://github.com/hezhengxu2018/silver-formily>

## License

MIT
