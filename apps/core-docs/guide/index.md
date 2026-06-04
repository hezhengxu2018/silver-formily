# 介绍

`@silver-formily/core` 是整个formily框架的核心。不同于官方文档，这里不会一开始就介绍诸如领域模型、超高性能等对开发毫无帮助的概念，这里着重会介绍 `@silver-formily/core` 是什么。当你对 `formily` 的各个模块建立了正确的概念之后再来了解这些概念会轻松得多。

## 定位

有两种角度去解释 `@silver-formily/core` 的定位：

1. 对用户来说，这是整个框架的核心，它负责了主要的表单模型及字段模型
2. 对整个 `formily` 框架的其他库来说，这是整个框架的胶水,它负责把其他各种底层库融合起来。它融合了 `reactive` 的响应式，整合了 `path` 提供的路径查询系统，接入了 `validator` 提供的校验系统，使得表单可以在正确的时机校验并反馈给模型。

上面这三个库，特别是 `@silver-formily/validator` 及 `@silver-formily/path`，对用户来说是引用透明的。脱离了 `@silver-formily/core` 这两个包很难独立使用。可以认为是：

- `@silver-formily/core` 需要一个响应式系统了才有的`@silver-formily/reactive`
- `@silver-formily/core` 需要一个字段模型路径查询系统了才有的 `@silver-formily/path`
- `@silver-formily/core` 需要一个完善的表单校验系统了才有的 `@silver-formily/validator`

这些功能都是为了服务于表单模型的。因此，可以说整个 `@silver-formily/core` 最大的价值是建立了一个完善的表单模型和字段模型，`@silver-formily/reactive`、`@silver-formily/path`、`@silver-formily/validator` 都是为了服务于字段或者表单模型而衍生出的依赖。

## 阅读路径

这份 Guide 会把模型和机制拆开讲，避免把所有能力都塞进“表单模型”一页里：

| 章节                          | 重点                                                                    |
| ----------------------------- | ----------------------------------------------------------------------- |
| [表单模型](/guide/form)       | Form 的顶层聚合职责：状态容器、字段工厂、字段图、生命周期和聚合操作入口 |
| [字段模型](/guide/field)      | Field / ArrayField / ObjectField / VoidField 的字段状态和差异           |
| [值与状态](/guide/values)     | `values`、`initialValues`、表单状态、字段状态和批量更新                 |
| [路径系统](/guide/path)       | `address`、`path`、`FormPath`、`query()` 和嵌套数据读写                 |
| [校验系统](/guide/validation) | 校验器、触发时机、校验策略和 feedback 聚合                              |
| [联动系统](/guide/linkage)    | `effects` 与 `reactions` 的区别、共同底层和适用场景                     |

如果只是想知道 Form 是什么，先读 [表单模型](/guide/form) 就够了；如果要理解复杂动态表单，再继续读路径、校验和联动这几个机制页。
