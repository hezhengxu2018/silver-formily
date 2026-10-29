---
mobileDemo: form-step/index.tsx
---

# FormStep 分步表单

参考 Vant FormStep，将 Schema 拆分为多个步骤，使用 antd-mobile Steps 展示进度。仅支持 Schema 场景，步骤必须为 `FormStep` 的直接子级，并使用 `FormStep.StepPane`。

## Markup Schema

通过 `FormStep.createFormStep()` 创建控制器，按钮区使用 `FormConsumer` 响应步骤状态。点击下一步先校验表单当前可见字段，校验失败时停留在当前步骤；返回上一步会保留填写的数据。

<<< @/zh/demos/form-step/basic.tsx

## JSON Schema、内部实例与隐藏步骤条

不传 `formStep` 时自动创建控制器，步骤面板内的组件可通过 `useFormStep()` 读取。`hideSteps` 隐藏进度条，仅显示当前面板。

<<< @/zh/demos/form-step/internal-instance.tsx

## API

### FormStep

| 属性        | 类型                         | 说明                                      |
| ----------- | ---------------------------- | ----------------------------------------- |
| `formStep`  | `IFormStep`                  | 外部控制器，默认内部创建                  |
| `current`   | `number`                     | 受控步骤索引，从 0 开始，优先于控制器状态 |
| `hideSteps` | `boolean`                    | 隐藏步骤条，默认 false                    |
| `direction` | `'horizontal' \| 'vertical'` | 步骤条方向                                |
| `className` | `string`                     | 外层容器类名                              |
| `style`     | `StepsProps['style']`        | 步骤条样式与 CSS 变量                     |

其余步骤条属性参考 [antd-mobile Steps](https://mobile.ant.design/zh/components/steps)。超出范围的索引会限制在有效步骤内，非有限数值归零。受控模式需由调用方更新 `current`，通常建议使用控制器驱动步骤。

### FormStep.StepPane

面板属性 `IFormStepPaneProps` 继承 antd-mobile `StepProps`，支持 `title`、`description`、`icon`、`status` 等属性，展示内容可传 ReactNode。Schema 的 `title` 作为默认步骤标题，`x-component-props.title` 可覆盖。面板仅作为 Schema 容器，子字段由 FormStep 按当前步骤渲染。

### 控制器

`FormStep.createFormStep(defaultCurrent?: number)` 返回响应式 `IFormStep`：

| 属性 / 方法               | 说明                                                           |
| ------------------------- | -------------------------------------------------------------- |
| `current`                 | 当前步骤索引                                                   |
| `allowNext` / `allowBack` | 是否可以前进 / 后退                                            |
| `setCurrent(index)`       | 跳转到指定步骤，不触发校验                                     |
| `next()`                  | 返回 Promise；校验通过后前进，失败时停留；校验期间忽略重复调用 |
| `back()`                  | 返回上一步，不触发校验                                         |
| `submit(onSubmit?)`       | 调用当前表单的 submit，返回提交结果 Promise                    |

未激活面板使用 `hidden` 状态，保留值并跳过校验。提交沿用表单当前可见字段的校验规则，不会挂载或重新校验未访问的步骤；需要确保必填步骤都经过校验时，应使用 `next()` 顺序前进。

### useFormStep

`useFormStep(): IFormStep`，也可通过 `FormStep.useFormStep()` 调用。必须在当前步骤面板的后代组件内使用，在 FormStep 外使用会抛错。读取响应式属性的按钮组件需使用 `observer` 包装。

`IFormStepProps`、`IFormStepPaneProps`、`IFormStep` 均可从包根入口导入。
