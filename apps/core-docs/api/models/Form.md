---
order: 0
---

# Form

调用[createForm](/api/entry/createForm)所返回的核心[表单模型](/guide/form) API。以下会列出所有模型属性。多数可写属性都可以直接赋值，`@formily/reactive` 会响应并触发 UI 更新。

:::warning 注意
像 `loading`、`validating`、`submitting` 这类流程状态，直接赋值与对应的 `setXxx` 方法并不完全等价，通常应优先使用 setter。
:::

## 属性

| 属性          | 描述                   | 类型                                  | 是否只读 | 默认值            |
| ------------- | ---------------------- | ------------------------------------- | -------- | ----------------- |
| initialized   | 表单是否初始化         | Boolean                               | 否       | `false`           |
| loading       | 表单是否正在加载       | Boolean                               | 否       | `false`           |
| validating    | 表单是否正在校验       | Boolean                               | 否       | `false`           |
| submitting    | 表单是否正在提交       | Boolean                               | 否       | `false`           |
| modified      | 表单值是否已被手动修改 | Boolean                               | 否       | `false`           |
| pattern       | 表单交互模式           | [FormPatternTypes](#formpatterntypes) | 否       | `"editable"`      |
| display       | 表单展示形态           | [FormDisplayTypes](#formdisplaytypes) | 否       | `"visible"`       |
| mounted       | 表单是否已挂载         | Boolean                               | 否       | `false`           |
| unmounted     | 表单是否已卸载         | Boolean                               | 否       | `false`           |
| values        | 表单值                 | Object                                | 否       | `{}`              |
| initialValues | 表单默认值             | Object                                | 否       | `{}`              |
| valid         | 表单是否合法           | Boolean                               | 是       | `true`            |
| invalid       | 表单是否非法           | Boolean                               | 是       | `false`           |
| errors        | 表单校验错误消息       | [IFormFeedback](#iformfeedback)       | 是       | `[]`              |
| warnings      | 表单校验警告消息       | [IFormFeedback](#iformfeedback)       | 是       | `[]`              |
| successes     | 表单校验成功消息       | [IFormFeedback](#iformfeedback)       | 是       | `[]`              |
| hidden        | 表单是否隐藏           | Boolean                               | 否       | `false`           |
| visible       | 表单是否显示           | Boolean                               | 否       | `true`            |
| editable      | 表单是否可编辑         | Boolean                               | 否       | `true`            |
| readOnly      | 表单是否只读           | Boolean                               | 否       | `false`           |
| disabled      | 表单是否禁用           | Boolean                               | 否       | `false`           |
| readPretty    | 表单是否为阅读态       | Boolean                               | 否       | `false`           |
| id            | 表单 ID                | String                                | 否       | `{RANDOM_STRING}` |
| displayName   | 模型标签               | String                                | 否       | `"Form"`          |

## 方法

### createField

#### 描述

创建一个 Field 实例的工厂函数，如果路径相同，多次调用，会复用实例对象

#### 签名

```ts
interface createField {
  (props: IFieldFactoryProps): Field | undefined
}
```

函数入参请参考[IFieldFactoryProps](#ifieldfactoryprops)

### createArrayField

#### 描述

创建一个 ArrayField 实例的工厂函数，如果路径相同，多次调用，会复用实例对象

#### 签名

```ts
interface createArrayField {
  (props: IFieldFactoryProps): ArrayField | undefined
}
```

函数入参请参考[IFieldFactoryProps](#ifieldfactoryprops)

### createObjectField

#### 描述

创建一个 ObjectField 实例的工厂函数，如果路径相同，多次调用，会复用实例对象

#### 签名

```ts
interface createObjectField {
  (props: IFieldFactoryProps): ObjectField | undefined
}
```

函数入参请参考[IFieldFactoryProps](#ifieldfactoryprops)

### createVoidField

#### 描述

创建一个 VoidField 实例的工厂函数，如果路径相同，多次调用，会复用实例对象

#### 签名

```ts
interface createVoidField {
  (props: IVoidFieldFactoryProps): VoidField | undefined
}
```

函数入参请参考[IVoidFieldFactoryProps](#ivoidfieldfactoryprops)

### setValues

#### 描述

设置表单值，可以设置合并策略 [IFormMergeStrategy](#iformmergestrategy)

#### 签名

```ts
interface setValues {
  (values: object, strategy: IFormMergeStrategy = 'merge'): void
}
```

### setInitialValues

#### 描述

设置表单默认值，可以设置合并策略

#### 签名

```ts
interface setInitialValues {
  (initialValues: object, strategy: IFormMergeStrategy = 'merge'): void
}
```

### setValuesIn

#### 描述

精确设置表单值

#### 签名

```ts
interface setValuesIn {
  (path: FormPathPattern, value: any): void
}
```

FormPathPattern API 参考 [FormPath](https://path.silver-formily.org/api/patterns)

### setInitialValuesIn

#### 描述

精确设置表单默认值

#### 签名

```ts
interface setInitialValuesIn {
  (path: FormPathPattern, initialValue: any): void
}
```

FormPathPattern API 参考 [FormPath](https://path.silver-formily.org/api/patterns)

### existValuesIn

#### 描述

根据指定路径判断值是否存在

#### 签名

```ts
interface existValuesIn {
  (path: FormPathPattern): boolean
}
```

FormPathPattern API 参考 [FormPath](https://path.silver-formily.org/api/patterns)

### existInitialValuesIn

#### 描述

根据指定路径判断默认值是否存在

#### 签名

```ts
interface existInitialValuesIn {
  (path: FormPathPattern): boolean
}
```

FormPathPattern API 参考 [FormPath](https://path.silver-formily.org/api/patterns)

### getValuesIn

#### 描述

根据指定路径获取表单值

#### 签名

```ts
interface getValuesIn {
  (path: FormPathPattern): any
}
```

FormPathPattern API 参考 [FormPath](https://path.silver-formily.org/api/patterns)

### getInitialValuesIn

#### 描述

根据指定路径获取表单默认值

#### 签名

```ts
interface getInitialValuesIn {
  (path: FormPathPattern): any
}
```

FormPathPattern API 参考 [FormPath](https://path.silver-formily.org/api/patterns)

### deleteValuesIn

#### 描述

根据指定路径删除表单值

#### 签名

```ts
interface deleteValuesIn {
  (path: FormPathPattern): void
}
```

FormPathPattern API 参考 [FormPath](https://path.silver-formily.org/api/patterns)

### deleteInitialValuesIn

#### 描述

根据指定路径删除表单默认值

#### 签名

```ts
interface deleteInitialValuesIn {
  (path: FormPathPattern): void
}
```

FormPathPattern API 参考 [FormPath](https://path.silver-formily.org/api/patterns)

### setSubmitting

#### 描述

设置表单是否正在提交状态。相比直接写 `form.submitting = true`，该方法还会处理提交中的运行时状态与生命周期通知。

#### 签名

```ts
interface setSubmitting {
  (submitting: boolean): void
}
```

### setValidating

#### 描述

设置表单是否正在校验状态。相比直接写 `form.validating = true`，该方法还会处理校验中的运行时状态与生命周期通知。

#### 签名

```ts
interface setValidating {
  (validating: boolean): void
}
```

### setLoading

#### 描述

设置表单是否正在加载状态。相比直接写 `form.loading = true`，该方法还会处理内部延迟与生命周期通知。

#### 签名

```ts
interface setLoading {
  (loading: boolean): void
}
```

### setDisplay

#### 描述

设置表单展示状态

#### 签名

```ts
interface setDisplay {
  (display: FormDisplayTypes): void
}
```

函数入参请参考[FormDisplayTypes](#formdisplaytypes)

### setPattern

#### 描述

设置表单交互模式

#### 签名

```ts
interface setPattern {
  (pattern: FormPatternTypes): void
}
```

函数入参请参考[FormPatternTypes](#formpatterntypes)

### addEffects

#### 描述

添加副作用

#### 签名

```ts
interface addEffects {
  (id: string, effects: (form: Form) => void): void
}
```

### removeEffects

#### 描述

移除副作用，id 与 addEffects 的 id 保持一致

#### 签名

```ts
interface removeEffects {
  (id: string): void
}
```

### setEffects

#### 描述

覆盖式更新副作用

#### 签名

```ts
interface setEffects {
  (effects: (form: Form) => void): void
}
```

### clearErrors

#### 描述

清空错误消息

#### 签名

```ts
interface clearErrors {
  (pattern?: FormPathPattern): void
}
```

FormPathPattern API 参考 [FormPath](https://path.silver-formily.org/api/patterns)

### clearWarnings

#### 描述

清空警告消息

#### 签名

```ts
interface clearWarnings {
  (pattern?: FormPathPattern): void
}
```

FormPathPattern API 参考 [FormPath](https://path.silver-formily.org/api/patterns)

### clearSuccesses

#### 描述

清空成功消息

#### 签名

```ts
interface clearSuccesses {
  (pattern?: FormPathPattern): void
}
```

FormPathPattern API 参考 [FormPath](https://path.silver-formily.org/api/patterns)

### query

#### 描述

查询字段节点

#### 签名

```ts
interface query {
  (pattern: FormPathPattern): Query
}
```

FormPathPattern API 参考 [FormPath](https://path.silver-formily.org/api/patterns)

Query 对象 API 参考 [Query](/api/models/Query)

### queryFeedbacks

#### 描述

查询消息反馈

#### 签名

```ts
interface queryFeedbacks {
  (search: ISearchFeedback): IFormFeedback[]
}
```

ISearchFeedback 参考 [ISearchFeedback](/api/models/Field#isearchfeedback)

IFormFeedback 参考[IFormFeedback](#iformfeedback)

### notify

#### 描述

广播消息

#### 签名

```ts
interface notify<T> {
  (type?: string, payload: T): void
}
```

### subscribe

#### 描述

订阅消息

#### 签名

```ts
interface subscribe<T> {
  (callback: (payload: T) => void): number
}
```

### unsubscribe

#### 描述

取消订阅

#### 签名

```ts
interface unsubscribe {
  (id: number): void
}
```

### onInit

#### 描述

触发表单初始化，默认不需要手动调用

#### 签名

```ts
interface onInit {
  (): void
}
```

### onMount

#### 描述

触发挂载

#### 签名

```ts
interface onMount {
  (): void
}
```

### onUnmount

#### 描述

触发卸载

#### 签名

```ts
interface onUnmount {
  (): void
}
```

### setState

#### 描述

设置表单状态

#### 签名

```ts
interface setState {
  (callback: (state: IFormState) => void): void
  (state: IFormState): void
}
```

IFormState 参考 [IFormState](#iformstate)

### getState

#### 描述

获取表单状态

#### 签名

```ts
interface getState<T> {
  (): IFormState
  (callback: (state: IFormState) => T): T
}
```

IFormState 参考 [IFormState](#iformstate)

### setFormState

与 setState API 一致

### getFormState

与 getState API 一致

### setFieldState

#### 描述

设置字段状态

#### 签名

```ts
interface setFieldState {
  (pattern: FieldMatchPattern, setter: (state: IGeneralFieldState) => void): void
  (pattern: FieldMatchPattern, setter: IGeneralFieldState): void
}
```

FieldMatchPattern 参考 [FieldMatchPattern](/api/models/Field#fieldmatchpattern)

IGeneralFieldState 参考 [IGeneralFieldState](/api/models/Field#igeneralfieldstate)

### getFieldState

#### 描述

获取字段状态

#### 签名

```ts
interface getFieldState<T> {
  (pattern: FieldMatchPattern): IGeneralFieldState | undefined
  (pattern: FieldMatchPattern, callback: (state: IGeneralFieldState) => T): T | undefined
}
```

FieldMatchPattern 参考 [FieldMatchPattern](/api/models/Field#fieldmatchpattern)

IGeneralFieldState 参考 [IGeneralFieldState](/api/models/Field#igeneralfieldstate)

### getFormGraph

#### 描述

获取表单字段集

#### 签名

```ts
interface getFormGraph {
  (): IFormGraph
}
```

IFormGraph 参考 [IFormGraph](#iformgraph)

### setFormGraph

#### 描述

设置表单字段集

#### 签名

```ts
interface setFormGraph {
  (graph: IFormGraph): void
}
```

IFormGraph 参考 [IFormGraph](#iformgraph)

### clearFormGraph

#### 描述

清空字段集

#### 签名

```ts
interface clearFormGraph {
  (pattern?: FormPathPattern, forceClear?: boolean): void
}
```

### validate

#### 描述

表单校验触发器，可以按照指定路径校验，如果校验成功是不会有任何返回，校验失败会在 promise reject 中返回[IFormFeedback](#iformfeedback)

#### 签名

```ts
interface validate {
  (pattern: FormPathPattern): Promise<void>
}
```

### submit

#### 描述

表单提交方法，如果在 onSubmit 回调函数中返回 Promise，表单会在提交开始的时候设置 submitting 状态为 true，Promise resolve 的时候再设置为 false，视图层可以消费 submitting 状态来实现防重复提交

#### 签名

```ts
interface submit<T> {
  (): Promise<Form['values']>
  (onSubmit?: (values: Form['values']) => Promise<T> | void): Promise<T>
}
```

### reset

#### 描述

表单重置方法，可以指定重置具体字段，也可以指定重置时自动校验

#### 描述

```ts
interface reset {
  (pattern: FormPathPattern, options?: IFieldResetOptions): Promise<void>
}
```

FormPathPattern API 参考 [FormPath](https://path.silver-formily.org/api/patterns)

IFieldResetOptions 参考 [IFieldResetOptions](/api/models/Field#ifieldresetoptions)

## 类型

<Alert>
注意：如果要手动消费类型，直接从包模块中导出即可
</Alert>

### FormPatternTypes

```ts
type FormPatternTypes
  = | 'editable'
    | 'readOnly'
    | 'disabled'
    | 'readPretty'
    | ({} & string)
```

### FormDisplayTypes

```ts
type FormDisplayTypes = 'none' | 'hidden' | 'visible' | ({} & string)
```

### IFormFeedback

```ts
interface IFormFeedback {
  path?: string // 校验字段数据路径
  address?: string // 校验字段绝对路径
  triggerType?: 'onInput' | 'onFocus' | 'onBlur' // 校验触发类型
  type?: 'error' | 'success' | 'warning' // 反馈类型
  code?: // 反馈编码
    | 'ValidateError'
    | 'ValidateSuccess'
    | 'ValidateWarning'
    | 'EffectError'
    | 'EffectSuccess'
    | 'EffectWarning'
    | (string & {})
  messages?: FeedbackMessage // 反馈消息
}
```

### IFormState

```ts
interface IFormState {
  editable?: boolean
  readOnly?: boolean
  disabled?: boolean
  readPretty?: boolean
  hidden?: boolean
  visible?: boolean
  initialized?: boolean
  loading?: boolean
  validating?: boolean
  submitting?: boolean
  modified?: boolean
  pattern?: FormPatternTypes
  display?: FormDisplayTypes
  values?: any
  initialValues?: any
  mounted?: boolean
  unmounted?: boolean
  readonly valid?: boolean
  readonly invalid?: boolean
  readonly errors?: IFormFeedback[]
  readonly warnings?: IFormFeedback[]
  readonly successes?: IFormFeedback[]
}
```

### IFormGraph

```ts
type IFormGraph = Record<string, IGeneralFieldState | IFormState>
```

### IFormMergeStrategy

```ts
type IFormMergeStrategy = 'overwrite' | 'merge' | 'deepMerge' | 'shallowMerge'
```

### IFieldFactoryProps

```ts
interface IFieldFactoryProps {
  name: FormPathPattern // 字段名称，当前节点的路径名称
  basePath?: FormPathPattern // 基础路径
  title?: any // 字段标题，由泛型 TextType 决定
  description?: any // 字段描述，由泛型 TextType 决定
  loading?: boolean // 字段加载状态
  value?: any // 字段值
  initialValue?: any // 字段默认值
  required?: boolean // 字段是否必填
  display?: 'none' | 'hidden' | 'visible' // 字段展示形式
  pattern?: 'editable' | 'disabled' | 'readOnly' | 'readPretty' // 字段交互模式
  hidden?: boolean // 字段是否隐藏
  visible?: boolean // 字段是否显示
  editable?: boolean // 字段是否可编辑
  disabled?: boolean // 字段是否禁用
  readOnly?: boolean // 字段是否只读
  readPretty?: boolean // 字段是否为阅读态
  dataSource?: FieldDataSource // 字段数据源
  validateFirst?: boolean // 字段校验是否只校验第一个非法规则
  validatePattern?: ('editable' | 'disabled' | 'readOnly' | 'readPretty')[] // validator 可以在哪些 pattern 下运行
  validateDisplay?: ('none' | 'hidden' | 'visible')[] // validator 可以在哪些 display 下运行
  validator?: FieldValidator // 字段校验器
  decorator?: FieldDecorator // 字段装饰器
  component?: FieldComponent // 字段组件
  reactions?: FieldReaction[] | FieldReaction // 字段响应器
  content?: any // 字段内容
  data?: any // 字段扩展属性
}
```

FormPathPattern API 参考 [FormPath](https://path.silver-formily.org/api/patterns)

FieldValidator 参考 [FieldValidator](/api/models/Field#fieldvalidator)

FieldDataSource 参考 [FieldDataSource](/api/models/Field#fielddatasource)

FieldDecorator 参考 [FieldDecorator](/api/models/Field#fielddecorator)

FieldComponent 参考 [FieldComponent](/api/models/Field#fieldcomponent)

FieldReaction 参考 [FieldReaction](/api/models/Field#fieldreaction)

### IVoidFieldFactoryProps

```ts
interface IVoidFieldFactoryProps {
  name: FormPathPattern // 字段名称，当前节点的路径名称
  basePath?: FormPathPattern // 基础路径
  title?: any // 字段标题，由泛型 TextType 决定
  description?: any // 字段描述，由泛型 TextType 决定
  display?: 'none' | 'hidden' | 'visible' // 字段展示形式
  pattern?: 'editable' | 'disabled' | 'readOnly' | 'readPretty' // 字段交互模式
  hidden?: boolean // 字段是否隐藏
  visible?: boolean // 字段是否显示
  editable?: boolean // 字段是否可编辑
  disabled?: boolean // 字段是否禁用
  readOnly?: boolean // 字段是否只读
  readPretty?: boolean // 字段是否为阅读态
  decorator?: FieldDecorator // 字段装饰器
  component?: FieldComponent // 字段组件
  reactions?: FieldReaction[] | FieldReaction // 字段响应器
  content?: any // 字段内容
  data?: any // 字段扩展属性
}
```

FormPathPattern API 参考 [FormPath](https://path.silver-formily.org/api/patterns)

FieldDecorator 参考 [FieldDecorator](/api/models/Field#fielddecorator)

FieldComponent 参考 [FieldComponent](/api/models/Field#fieldcomponent)

FieldReaction 参考 [FieldReaction](/api/models/Field#fieldreaction)

> Formily Typescript 类型约定
>
> - 简单非对象数据类型或 Union 数据类型用 type 定义类型，不能以大写`I`字符开头
> - 简单对象类型统一用 interface 定义类型，且以大写`I`字符开头，如果存在不同 interface 的组合(Intersection or Extends)使用 type 定义类型，同样以大写`I`字符开头
