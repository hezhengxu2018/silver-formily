# FormDialog

> 弹窗表单，主要用在简单的事件打开表单场景

::: warning 注意
该组件经过重构，完全摒弃了通过id传递上下文的方式，使用时请注意函数入参的改动。现在通过Vue中[JSX的插槽写法](https://cn.vuejs.org/guide/extras/render-function.html#passing-slots)实现类似的功能。
:::

::: tip 提示
使用函数式组件时可以通过解构的方式快速拿到`form`,具体请参考template案例。
:::

## Markup Schema 案例

:::demo

form-dialog/markup-schema

:::

## JSON Schema 案例

:::demo

form-dialog/json-schema

:::

## Template 案例

:::demo

form-dialog/template

:::

## Template 插槽案例

:::demo

form-dialog/template-slot

:::

## 回车提交配置

FormDialog 默认会在输入框激活时响应键盘回车并触发 `resolve`。若需要关闭该行为，可通过 `enterSubmit: false` 禁用监听。

:::demo

form-dialog/enter-submit

:::

### 弹出层嵌套示例

可以在一个 FormDialog 中继续调用 `FormDialog` 打开新的弹窗，组件会自动只让最顶层实例响应快捷键和提交。

:::demo

form-dialog/nested

:::

## API

### FormDialog 函数入参

| 参数                       | 说明                                                 | 类型                                                  |
| -------------------------- | ---------------------------------------------------- | ----------------------------------------------------- |
| `title`或`formDialogProps` | 标题或Dialog组件的props                              | `string` `FormDialogProps`                            |
| `formDialogSlots`          | 表单弹窗组件的内容，支持组件，VNode和插槽的写法      | `Component` `VNode[]` `()=>VNode[]` `FormDialogSlots` |
| `dynamicMiddlewareNames`   | 动态中间件名称列表，使用时会转成Camel Case命名风格。 | `string[]`除了`cancel` `confirm` `open`               |

::: warning 注意
`formDialogProps`是有保留值的。传入`modelValue`、`onUpdate:modelValue`不会生效，已被FormDialog组件内部使用。
:::

完整函数类型声明（参数的具体类型参见类型声明）：

```ts
interface FormDialog {
  (
    title: IFormDialogProps | string,
    content?: Component | FormDialogSlotContent,
    dynamicMiddlewareNames?: string[]
  ): IFormDialog
}
```

#### title

函数的第一个参数，传入字符串时会作为标题显示。可以传入`IFormDialogProps`来进行自定义。请优先使用`forOpen`、`forConfirm`、`forCancel`等中间件来控制弹框的生命周期。

| 参数                | 说明                                     | 类型          | 默认值    |
| ------------------- | ---------------------------------------- | ------------- | --------- |
| `cancelText`        | 取消按钮文字                             | `string`      | `取消`    |
| `cancelButtonProps` | 取消按钮的props                          | `ButtonProps` | -         |
| `okText`            | 确定按钮文字                             | `string`      | `确定`    |
| `okButtonProps`     | 确定按钮的props                          | `ButtonProps` | -         |
| `loadingText`       | 加载中文字                               | `string`      | `loading` |
| `enterSubmit`       | 是否允许在输入框回车时立即触发 `resolve` | `boolean`     | `true`    |

其余参数请参考参考 [https://cn.element-plus.org/zh-CN/component/dialog.html](https://cn.element-plus.org/zh-CN/component/dialog.html#attributes)

#### content

函数的第二个参数，除了可以传入组件和VNode之外还可以接受Vue中[JSX的插槽写法](https://cn.vuejs.org/guide/extras/render-function.html#passing-slots)自定义`header`与`footer`。

| 插槽名    | 说明                                                                                                         | 类型                  |
| --------- | ------------------------------------------------------------------------------------------------------------ | --------------------- |
| `default` | 表单弹窗组件的内容，支持组件，VNode和插槽的写法                                                              | -                     |
| `header`  | 头部插槽，可以通过作用域插槽调用resolve或reject来关闭，resovle可以接受`dynamicMiddlewareNames`中传入的字符串 | `FormDialogSlotProps` |
| `footer`  | 底部插槽，可以通过作用域插槽调用resolve或reject来关闭，resovle可以接受`dynamicMiddlewareNames`中传入的字符串 | `FormDialogSlotProps` |

#### dynamicMiddlewareNames

函数的第三个参数，是一个字符串数组，用于触发自定义footer或header中的按钮事件。

比如需要在弹框中额外添加保存草稿的功能，那么就可以在`dynamicMiddlewareNames`中传入`'saveDraft'`，然后在`footer`中的按钮上绑定事件`resolve('saveDraft')`。
最后在可以像`forConfirm`一样添加`forSaveDraft`的相关逻辑。具体使用可以参考Demo中的例子。

::: tip 提示
传入`dynamicMiddlewareNames`中的字符串会被转成Camel Case命名风格，比如`'save-draft'`会被转成`'saveDraft'`。
:::

### IFormDialog 函数返回

函数的返回值，是一个是一个Promise对象，因此可以进行await操作来优化逻辑书写，需要调用`open`方法来打开弹框。可以进行链式调用来处理不同逻辑下的事件处理。现在支持通过`dynamicMiddlewareNames`来传入自定义的事件来处理业务逻辑。

| 方法名          | 说明         | 类型                                       |
| --------------- | ------------ | ------------------------------------------ |
| `open`          | 打开弹框     | `(IFormProps)=>Promise<IFormProps.values>` |
| `forOpen`       | 打开弹框事件 | `(IMiddleware<IFormProps>)=>IFormDialog`   |
| `forConfirm`    | 确认事件     | `(IMiddleware<Form>)=>IFormDialog`         |
| `forCancel`     | 取消事件     | `(IMiddleware<Form>)=>IFormDialog`         |
| `for${Dynamic}` | 自定义事件   | `(IMiddleware<Form>)=>IFormDialog`         |

::: tip 提示
自定义事件中的`Dynamic`的值为`dynamicMiddlewareNames`中传入的字符串，通过作用域插槽中的resolve方法来触发对应的事件。 传入`dynamicMiddlewareNames`中的字符串在调用方法时会被转成Pascal Case命名风格，比如传入`['save-draft']`应该调用`'forSaveDraft'`。
:::

::: tip 提示
现在所有通过非`resolve`调用关闭的弹框都会作为错误抛出，因此在async/await写法中如果await了FormDialog则此之后的逻辑都只在表单成功提交后才会执行。
:::

### 类型声明

##### IFormDialogProps

<<< @/../../packages/element-plus/src/form-dialog/types.ts#props

##### FormDialogSlots

<<< @/../../packages/element-plus/src/form-dialog/types.ts#slots

##### IFormDialog

<<< @/../../packages/element-plus/src/form-dialog/types.ts#iformdialog
