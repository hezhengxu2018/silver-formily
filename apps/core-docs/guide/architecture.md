# 架构设计

## 准备知识

### 什么是 MVVM ？

MVVM (Model-View-ViewModel) 是一种 OOP 软件架构模式。不同于React 的 `UI = fn(State)` 设计理念，Vue 采用的就是MVVM的设计思路，也是前端非常重要一种设计模式。`@silver-formily/core` 采用的也是这一模式，将表单的**数据**、**状态**和**副作用逻辑**清晰地分层管理。

我们可以用一张图来描述：

<ThemeImage
  light="/architecture/mvvm.png"
  dark="/architecture/mvvm.dark.png"
  alt="MVVM"
/>

- **View ↔ ViewModel** 通过 DataBinding 双向连接。View 将用户操作传递给 ViewModel，ViewModel 将状态变化通知 View 更新
- **ViewModel → Model** 单向请求。ViewModel 读取和修改 Model 的数据，但 Model 不直接感知 ViewModel 的存在
- 顶部标注说明了各层的职责归属：View 和 ViewModel 共同负责展示与展示逻辑，Model 负责业务逻辑和数据

formily 它提供了 View 和 ViewModel 两层能力：

- View 层包括了 `@silver-formily/vue` 等框架绑定层和`@silver-formily/element-plus`这种组件库绑定库。
- ViewModel 层包括了 `@silver-formily/core` 及其各种附属库。

formily 的目标是减少用户设计 ViewModel 的成本，让用户更加专注于业务逻辑的实现。而 Model 层（即实际业务代码层）**不属于 formily 的管理范畴**，前端的表单模型与后端的接口数据在大部分情况下都存在一些差异，业务需求千变万化，开发需要自行维护这一层转换。

### 什么是领域模型？

在深入架构之前，我们先理解一个核心概念——**领域模型（Domain Model）**。

简单来说，领域模型是对**业务领域中核心概念、规则和关系的抽象描述**。它不关心技术实现细节（比如用 React 还是 Vue 渲染），而是专注于回答"这个业务的核心是什么？有哪些参与者？它们之间如何协作？"

以表单领域为例，当你抛开 UI 框架、抛开具体组件库，表单的本质是什么？

- 有**值**（用户填了什么）
- 有**规则**（哪些必填、哪些需要校验）
- 有**状态**（当前是编辑中还是只读）
- 有**结构**（字段之间是平级、嵌套、还是数组）
- 有**反馈**（校验通过了吗？哪里出错了？）

把这些概念提炼成可复用的模型，就是 Formily 内核在做的事。这样无论上层用 Vue、React 还是原生 DOM，底层逻辑都是一致的——这就是领域模型的价值。

## 领域模型

Formily 内核架构要解决的是“表单这个领域如何被抽象成一组稳定的模型和协作关系”，而不是某个具体组件怎么渲染。因此这里更适合分两步理解：

1. 先看**核心对象是怎么分层的**
2. 再看**状态变化时，这些对象是怎么协作的**

### 1. 核心对象关系

先只回答一个问题：Formily 内核里到底有哪些核心对象，它们各自负责什么？

<ThemeImage
  light="/architecture/domain-model.svg"
  dark="/architecture/domain-model.dark.svg"
  alt="Formily 领域模型架构总览"
/>

这张图里最关键的是三层关系：

- **Form** 是根模型，负责聚合整个表单的能力
- **Field Tree** 是字段的组织结构，负责把所有节点串成一棵树
- **Field** / **VoidField** 是树上的两类核心节点：前者承载数据，后者更偏结构和布局。

Field / VoidField 两者在Typescript的类型声明中都是 `GeneralField`（参考相应的[TypeChecker](/api/entry/FormChecker.html#isgeneralfield)）。在模型的字段上有诸多不同，使用时想获得完整的类型推断经常会需要使用TypeChecker。ArrayField 和 ObjectField 也不是新的模型，而是 Field 在特定数据结构上的扩展。有额外的方法

### 2. 运行时协作关系

再看第二个问题：当用户输入、字段变化、校验触发时，系统内部是怎么流动的？

<ThemeImage
  light="/architecture/coordination.svg"
  dark="/architecture/coordination.dark.svg"
  alt="Formily 协作关系"
/>

这里表达的是一条运行主线：

- 用户输入或调用 setter，会先改变 Form 或 Field 的状态
- 状态变化后，Heart 负责把生命周期事件发布出去
- 一部分变化会触发校验，结果写入 feedbacks
- 另一部分变化会被 Reactive 系统追踪，再通知 Observer 和 UI 更新

换句话说，**Form / Field Tree / Field / VoidField** 更像“领域对象”，而 **Heart / Reactive / Observer** 更像“让这些对象运转起来的机制”。把这两类概念分开看，整个架构会容易理解很多。

完整的数据流请参考[数据流](/guide/architecture.html#数据流)章节

## 核心概念

这一节只做概念索引。每个概念的完整行为、API 和使用方式，请进入对应章节继续阅读。

- **Form**：表单的根模型，负责聚合字段、值、校验、提交、生命周期和联动入口。继续阅读：[表单模型](/guide/form) / [Form API](/api/models/Form)
- **Field Tree / Graph**：字段的组织结构，用来维护字段之间的父子关系、节点注册和字段图快照。继续阅读：[表单模型 - 字段图](/guide/form.html#字段图)
- **Field / VoidField**：字段树上的核心节点。Field 承载数据，VoidField 更偏向布局和结构；ArrayField、ObjectField 是面向数组和对象结构的字段扩展。继续阅读：[字段模型](/guide/field)
- **Values / State**：表单值、初始值、显隐、交互模式、反馈状态等运行时状态。继续阅读：[值与状态](/guide/values)
- **Path / Query**：连接字段树和表单数据的路径语义，也是字段查找、批量操作和联动定位的基础。继续阅读：[路径系统](/guide/path) / [FormPath API](/api/entry/FormPath) / [Query API](/api/models/Query)
- **Validation / Feedback**：字段声明校验规则，Form 提供批量校验与提交入口，校验结果统一沉淀为 feedbacks。继续阅读：[校验系统](/guide/validation) / [FormValidatorRegistry API](/api/entry/FormValidatorRegistry)
- **Heart / LifeCycle**：Form 内部的生命周期事件中心，`effects` 和各类 effect hooks 都基于它工作。继续阅读：[联动系统](/guide/linkage) / [FormEffectHooks API](/api/entry/FormEffectHooks) / [FieldEffectHooks API](/api/entry/FieldEffectHooks)

## 数据流

<ThemeImage
  light="/architecture/data-flow.png"
  dark="/architecture/data-flow.dark.png"
  alt="Formily 数据流"
/>
