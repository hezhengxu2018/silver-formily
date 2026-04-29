---
mobileDemo: form-step/index.vue
---

# FormStep

> `FormStep` 用来把一组 Schema 字段拆成移动端更常见的分步提交流程，外部既可以通过 `FormStep.createFormStep()` 控制前进、后退和最终提交，也可以在 `FormStep` 子树中通过 `useFormStep()` 读取组件内部自动创建的实例。

:::warning 注意
本组件只适用于 Schema 场景。
:::

:::tip 提示
`createFormStep()` 返回的是 `@formily/reactive` 响应式模型。示例里使用 `FormConsumer` 搭配 `FormButtonGroup` 包裹按钮区，让“上一步 / 下一步 / 提交”的禁用状态跟着步骤自动刷新，同时也能沿用统一的按钮布局配置。
:::

## Markup Schema

<<< @/zh/demos/form-step/markup-schema.vue

## JSON Schema

<<< @/zh/demos/form-step/json-schema.vue

## 内部创建实例

<<< @/zh/demos/form-step/internal-instance.vue

## 隐藏步骤条

<<< @/zh/demos/form-step/hide-steps.vue

## 插槽自定义渲染

<<< @/zh/demos/form-step/slot.vue

## API

### FormStep

| 属性名      | 类型               | 描述                                                | 默认值       |
| ----------- | ------------------ | --------------------------------------------------- | ------------ |
| `formStep`  | `IFormStep`        | 传入通过 `FormStep.createFormStep()` 创建的步骤模型 | 内部自动创建 |
| `active`    | `number \| string` | 受控地指定当前激活步骤；会覆盖内部步骤索引          | `-`          |
| `hideSteps` | `boolean`          | 是否隐藏顶部 `Steps` 步骤条，仅保留当前步骤内容区   | `false`      |

其余属性请参考[Vant Steps 官方文档](https://vant-ui.github.io/vant/#/zh-CN/steps)

### FormStep.StepPane

`StepPane` 自身只承担 Schema 容器职责，是非常薄的一层封装，只对`formily`的`title`做了到标题的映射，其余 Props 会透传到 Vant `Step` 根节点属性上。

### FormStep.createFormStep

```ts
interface createFormStep {
  (current?: number): IFormStep
}

interface IFormStep {
  current: number
  allowNext: boolean
  allowBack: boolean
  setCurrent: (key: number) => void
  submit: Formily.Core.Models.Form['submit']
  next: () => void
  back: () => void
}
```

### useFormStep

```ts
interface useFormStep {
  (): ComputedRef<IFormStep>
}
```

用于在 `FormStep` 的子孙组件中读取当前步骤实例。无论这个实例来自外部传入的 `formStep`，还是组件内部自动创建的默认实例，都可以通过这个 hook 访问到。
