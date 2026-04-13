---
mobileDemo: form-step/index.vue
---

# FormStep

> `FormStep` 用来把一组 Schema 字段拆成移动端更常见的分步提交流程，外部既可以通过 `FormStep.createFormStep()` 控制前进、后退和最终提交，也可以在 `FormStep` 子树中通过 `useFormStep()` 读取组件内部自动创建的实例。

:::warning 使用限制
当前封装和 `element-plus` 版本保持一致，只适用于 Schema 场景，推荐和 `SchemaField`、`SchemaVoidField` 一起使用。
:::

:::tip 渲染更新
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

其余未单独列出的属性会继续透传给 Vant `Steps`，例如 `direction`、`activeColor`、`inactiveColor`、`activeIcon` 等。

### FormStep.StepPane

`StepPane` 自身只承担 Schema 容器职责，常用配置约定如下：

- `x-component-props.title`：步骤标题
- `x-content.title`：自定义标题内容，可传字符串、数字或组件
- `x-content.icon`：统一自定义步骤图标，会同时作为激活、完成和未激活态图标的兜底内容
- `x-content.activeIcon` / `finishIcon` / `inactiveIcon`：分别细分三种状态的图标内容

除上述字段外，其余 `x-component-props` 会透传到 Vant `Step` 根节点属性上。

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

### 参考

- [Vant Steps 官方文档（正式站）](https://vant-ui.github.io/vant/#/zh-CN/steps)
