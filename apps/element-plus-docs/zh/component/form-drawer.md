# FormDrawer

> 抽屉表单，主要用在简单的事件打开表单场景

::: warning 注意
该组件经过重构，完全摒弃了通过id传递上下文的方式，使用时请注意函数入参的改动。现在通过Vue中[JSX的插槽写法](https://cn.vuejs.org/guide/extras/render-function.html#passing-slots)实现类似的功能。
:::

::: tip 提示
使用函数式组件时可以通过解构的方式快速拿到`form`,具体请参考template案例。
:::

## Markup Schema 案例

:::demo

form-drawer/markup-schema

:::

## JSON Schema 案例

:::demo

form-drawer/json-schema

:::

## Template 案例

:::demo

form-drawer/template

:::

## Template 插槽案例

:::demo

form-drawer/template-slot

:::

## 泛型使用

`FormDrawer` 现在支持通过泛型声明表单值类型，以及动态中间件名称。最常见的用法有两种：

1. 只声明表单值类型，让 `form.values`、`open({ values })` 和 `forConfirm` 拿到准确类型
2. 同时声明动态中间件名称，让 `forSaveDraft` 这类方法获得类型提示，并配合 `resolve('saveDraft')` 触发对应逻辑

```tsx
type UserFormValues = {
  name: string
  age: number
}

FormDrawer<UserFormValues>('编辑用户', ({ form }) => {
  form.values.name
  form.values.age
  return <UserForm />
})

FormDrawer<UserFormValues, ['save-draft']>(
  '编辑用户',
  {
    footer: ({ resolve, reject, form }) => {
      form.values.name
      resolve('saveDraft')
      resolve()
      reject()
      return []
    },
  },
  ['save-draft'] as const,
)
  .forSaveDraft((form) => {
    return form.values
  })
```

::: tip 提示
如果你传入了 `dynamicMiddlewareNames`，建议使用 `['save-draft'] as const` 这类只读字面量写法，这样 `forSaveDraft` 这类返回值方法才能被正确推导出来。
:::

## 回车提交配置

FormDrawer 同样会默认监听输入框中的键盘回车来调用 `resolve`。当抽屉内有自定义快捷键或嵌套的弹层时，可以将 `enterSubmit` 设为 `false` 来单独关闭。

同时，FormDrawer 现在会默认在浏览器地址发生变化时自动关闭当前抽屉，包括前进、后退以及应用内触发的 `pushState` / `replaceState`。如果你的场景希望路由切换后仍然保留抽屉，可以显式传入 `closeOnUrlChange: false`。

:::demo

form-drawer/enter-submit

:::

## API

### FormDrawer 函数入参

| 参数                       | 说明                                                 | 类型                                                  |
| -------------------------- | ---------------------------------------------------- | ----------------------------------------------------- |
| `title`或`formDrawerProps` | 标题或Drawer组件的props                              | `string` `FormDrawerProps`                            |
| `formDrawerSlots`          | 表单抽屉组件的内容，支持组件，VNode和插槽的写法      | `Component` `VNode[]` `()=>VNode[]` `FormDrawerSlots` |
| `dynamicMiddlewareNames`   | 动态中间件名称列表，使用时会转成Camel Case命名风格。 | `string[]`除了`cancel` `confirm` `open`               |

::: warning 注意
`formDrawerProps`是有保留值的。传入`modelValue`、`onUpdate:modelValue`不会生效，已被FormDialog组件内部使用。
:::

完整函数类型声明（参数的具体类型参见类型声明）：

```ts
interface FormDrawer {
  <TValues extends object = any, DynamicMiddlewareNames extends readonly string[] = []>(
    title: IFormDrawerProps | string,
    content?: Component | FormDrawerSlotContent<TValues, DynamicMiddlewareNames[number]>,
    dynamicMiddlewareNames?: DynamicMiddlewareNames
  ): IFormDrawer<TValues, DynamicMiddlewareNames[number]>
}
```

#### title

函数的第一个参数，传入字符串时会作为标题显示。可以传入 IFormDrawerProps 来进行自定义。请优先使用 forOpen 、 forConfirm 、 forCancel 等中间件来控制抽屉的生命周期。

| 参数                | 说明                                     | 类型          | 默认值    |
| ------------------- | ---------------------------------------- | ------------- | --------- |
| `cancelText`        | 取消按钮文字                             | `string`      | `取消`    |
| `cancelButtonProps` | 取消按钮的props                          | `ButtonProps` | -         |
| `okText`            | 确定按钮文字                             | `string`      | `确定`    |
| `okButtonProps`     | 确定按钮的props                          | `ButtonProps` | -         |
| `loadingText`       | 加载中文字                               | `string`      | `loading` |
| `enterSubmit`       | 是否允许在输入框回车时立即触发 `resolve` | `boolean`     | `true`    |
| `closeOnUrlChange`  | 浏览器地址变化时是否自动关闭抽屉         | `boolean`     | `true`    |

其余参数请参考参考 [https://cn.element-plus.org/zh-CN/component/drawer.html](https://cn.element-plus.org/zh-CN/component/drawer.html#attributes)

#### content

函数的第二个参数，除了可以传入组件和VNode之外还可以接受Vue中[JSX的插槽写法](https://cn.vuejs.org/guide/extras/render-function.html#passing-slots)自定义 header 与 footer 。

| 插槽名    | 说明                                                                                                         | 类型                  |
| --------- | ------------------------------------------------------------------------------------------------------------ | --------------------- |
| `default` | 表单抽屉组件的内容，支持组件，VNode 和作用域插槽写法；会注入 `form`、`resolve`、`reject`                     | `FormDrawerSlotProps` |
| `header`  | 头部插槽，可以通过作用域插槽调用resolve或reject来关闭，resovle可以接受`dynamicMiddlewareNames`中传入的字符串 | `FormDrawerSlotProps` |
| `footer`  | 底部插槽，可以通过作用域插槽调用resolve或reject来关闭，resovle可以接受`dynamicMiddlewareNames`中传入的字符串 | `FormDrawerSlotProps` |

#### dynamicMiddlewareNames

函数的第三个参数，是一个字符串数组，用于触发自定义footer或header中的按钮事件。

比如需要在抽屉中额外添加保存草稿的功能，那么就可以在 dynamicMiddlewareNames 中传入 `'saveDraft'` ，然后在 footer 中的按钮上绑定事件 `resolve('saveDraft')` 。
最后在可以像 `forConfirm` 一样添加 `forSaveDraft` 的相关逻辑。具体使用可以参考Demo中的例子。

::: tip 提示
传入`dynamicMiddlewareNames`中的字符串会被转成Camel Case命名风格，比如`'save-draft'`会被转成`'saveDraft'`。
:::

::: tip 提示
如果配合泛型使用，`dynamicMiddlewareNames` 传入的字面量会影响返回值上的类型提示：

- 返回值上的 `forSaveDraft` / `forPublishNow`
  :::

### IFormDrawer 函数返回

函数的返回值，是一个是一个Promise对象，因此可以进行await操作来优化逻辑书写，需要调用`open`方法来打开抽屉。可以进行链式调用来处理不同逻辑下的事件处理。现在支持通过`dynamicMiddlewareNames`来传入自定义的事件来处理业务逻辑。

| 方法名          | 说明         | 类型                                       |
| --------------- | ------------ | ------------------------------------------ |
| `open`          | 打开抽屉     | `(IFormProps)=>Primise<IFormProps.values>` |
| `forOpen`       | 打开抽屉事件 | `(IMiddleware<IFormProps>)=>IFormDrawer`   |
| `forConfirm`    | 确认事件     | `(IMiddleware<Form>)=>IFormDrawer`         |
| `forCancel`     | 取消事件     | `(IMiddleware<Form>)=>IFormDrawer`         |
| `for${Dynamic}` | 自定义事件   | `(IMiddleware<Form>)=>IFormDrawer`         |

::: tip 提示
自定义事件中的`Dynamic`的值为`dynamicMiddlewareNames`中传入的字符串，通过作用域插槽中的resolve方法来触发对应的事件。 传入`dynamicMiddlewareNames`中的字符串在调用方法时会被转成Pascal Case命名风格，比如传入`['save-draft']`应该调用`'forSaveDraft'`。
:::

::: tip 提示
现在所有通过非`resolve`调用关闭的弹框都会作为错误抛出，因此在async/await写法中如果await了FormDrawer则此之后的逻辑都只在表单成功提交后才会执行。
:::

### 类型声明

#### IFormDrawerProps

<<< @/../../packages/element-plus/src/form-drawer/types.ts#props

#### FormDrawerSlots

<<< @/../../packages/element-plus/src/form-drawer/types.ts#slots

#### IFormDrawer

<<< @/../../packages/element-plus/src/form-drawer/types.ts#iformdrawer
