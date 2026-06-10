# @silver-formily/vant

[English README](./README.en.md)

`@silver-formily/vant` 是 Silver Formily 面向 Vant 生态的移动端 UI 适配层。它把表单运行时、schema 描述和 Vant 组件体系连接起来，适合构建移动端表单、步骤表单、弹层表单以及一系列触控友好的录入场景。

## 这个包适合什么项目

- 移动端表单或 H5 表单
- 基于 Vant 的业务录入页面
- 需要分步、弹层、滚轮选择器等移动端交互形态
- 想把 `@formily/*` 体系迁移到 `@silver-formily/*`

## 当前提供的能力方向

- 基础字段组件：`Input`、`Checkbox`、`Radio`、`Switch`、`Stepper`、`Slider`、`Signature`
- 选择类组件：`Picker`、`PickerGroup`、`DatePicker`、`TimePicker`、`Area`、`TreeSelect`
- 表单结构组件：`FormItem`、`Form`、`FormStep`、`FormPopup`、`FormButtonGroup`
- 预览态组件：`PreviewText.*`
- 常用动作组件：`Submit`、`Reset`

## 与其它 Silver Formily 包的关系

- `@silver-formily/core` 提供字段与表单运行时
- `@silver-formily/vue` 提供 Vue 3 绑定
- `@silver-formily/json-schema` 提供 schema 描述能力
- 当前包负责把这些能力落到 Vant 组件上

## 安装

```bash
pnpm add @silver-formily/vant @silver-formily/vue @silver-formily/core @silver-formily/json-schema @silver-formily/path @silver-formily/reactive @silver-formily/reactive-vue @silver-formily/shared vant vue dayjs
```

## 文档

- 文档站点：<https://vant.silver-formily.org>
- 仓库主页：<https://github.com/hezhengxu2018/silver-formily>

## License

MIT
