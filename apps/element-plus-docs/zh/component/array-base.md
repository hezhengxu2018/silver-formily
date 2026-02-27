# ArrayBase

> Array型控件的基础数组组件，无法独立使用。

为了方便使用已经整合在所有通过Array控制的组件中，如`ArrayCards.Addition` `ArrayCards.MoveUp`等方式调用，由于该类组件必须要通过Schema的方式结合别的组件使用，且不是所有的Array型组件支持全部的ArrayBase控件，需要结合具体组件使用，因此不提供单独的导出。

出于同样的原因，本章节不提供具体代码的demo，请结合实际组件查看使用的例子。

## SortHandle

> 拖拽手柄

参考 [https://cn.element-plus.org/zh-CN/component/button.html](https://cn.element-plus.org/zh-CN/component/button.html)

## Addition

> 添加按钮

扩展属性

| 属性名       | 类型                  | 描述     | 默认值   |
| ------------ | --------------------- | -------- | -------- |
| title        | string                | 文案     |          |
| method       | `'push' \| 'unshift'` | 添加方式 | `'push'` |
| defaultValue | any                   | 默认值   |          |

其余参考 [https://cn.element-plus.org/zh-CN/component/button.html](https://cn.element-plus.org/zh-CN/component/button.html)

::: warning 注意
Array类的控件有一个已知的bug，即设置了initialValue后删除再次新增会恢复initialValue的值，可以通过设置Addition组件的defaultValue的方式解决。目前官方没有提供修复方案，[issue](https://github.com/alibaba/formily/issues/4235)。
:::

::: tip 提示
title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的
:::

## Remove

> 删除按钮

| 属性名 | 类型   | 描述 | 默认值 |
| ------ | ------ | ---- | ------ |
| title  | string | 文案 |        |

其余参考 [https://cn.element-plus.org/zh-CN/component/button.html](https://cn.element-plus.org/zh-CN/component/button.html)

::: tip 提示
title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的
:::

## MoveDown

> 下移按钮

| 属性名 | 类型   | 描述 | 默认值 |
| ------ | ------ | ---- | ------ |
| title  | string | 文案 |        |

其余参考 [https://cn.element-plus.org/zh-CN/component/button.html](https://cn.element-plus.org/zh-CN/component/button.html)

::: tip 提示
title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的
:::

## MoveUp

> 上移按钮

| 属性名 | 类型   | 描述 | 默认值 |
| ------ | ------ | ---- | ------ |
| title  | string | 文案 |        |

其余参考 [https://cn.element-plus.org/zh-CN/component/button.html](https://cn.element-plus.org/zh-CN/component/button.html)

::: tip 提示
title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的
:::

## Index

> 索引渲染器

无属性

## useIndex

> 读取当前渲染行索引的 Hook

## useRecord

> 读取当前渲染记录的 Hook
