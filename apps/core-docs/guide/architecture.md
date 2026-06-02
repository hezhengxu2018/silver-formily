# 架构设计

`@silver-formily/core` 的架构基于 MVVM 模式，将表单状态、副作用和校验逻辑解耦为独立的层次。

## 领域模型

Formily 内核架构要解决一个领域级的问题，而非单点具体问题。先上架构图：

```mermaid
graph TB
    subgraph FormLayer["Form 表单层"]
        direction LR
        F1["表单值<br/>values/initialValues"]
        F2["显隐<br/>display/hidden/visible"]
        F3["交互模式<br/>pattern/editable/disabled<br/>readOnly/readPretty"]
        F4["消息反馈<br/>errors/warnings<br/>successes"]
        F5["生命周期<br/>LifeCycle"]
        F6["Setters<br/>setValues/setInitialValues..."]
        F7["节点查询器<br/>query"]
    end

    subgraph FieldTree["Field Tree 字段树"]
        direction LR
        subgraph FieldNode["Field 数据字段"]
            direction TB
            FL1["路径 / 值 / 显隐"]
            FL2["交互模式 / 消息反馈"]
            FL3["校验器 validator"]
            FL4["组件/装饰器<br/>component/decorator"]
            FL5["依赖追踪响应器<br/>reactions"]
            FL6["生命周期 LifeCycles"]
            FL7["Setters"]
            subgraph InheritedFields["继承自 Field"]
                AF["ArrayField<br/>push/insert/move..."]
                OF["ObjectField<br/>addProperty/removeProperty"]
            end
        end
        subgraph VoidFieldNode["VoidField 虚字段"]
            direction TB
            VF1["路径"]
            VF2["显隐 / 交互模式"]
            VF3["生命周期 / Setters"]
            VF4["组件/装饰器"]
            VF5["依赖追踪响应器"]
        end
    end

    subgraph Reactive["Reactive 领域模型"]
        direction TB
        O1["Observer ← 数据消费方"]
        O2["Observer ← 数据消费方"]
        O3["Observer ← 数据消费方"]
        O4["Observer ← 数据消费方"]
    end

    FormLayer -->|"FormPathPattern"| FieldTree
    FieldNode -.->|"父子继承"| VoidFieldNode
    FieldNode -.->|"隐式控制"| VoidFieldNode
    Reactive -->|"依赖追踪"| FieldNode
    Reactive -->|"依赖追踪"| VoidFieldNode
    FieldNode -->|"校验结果"| Feedback["feedbacks<br/>errors / warnings / successes"]
```

## 核心模块

### Form (表单模型)

Form 是表单的根节点，聚合了 Graph 和 Heart，提供字段创建、查询、校验、提交等全部表单能力：

- **表单值**: values、initialValues 双层管理，支持多种合并策略
- **显隐控制**: display (visible/hidden/none) 和便捷属性 visible/hidden
- **交互模式**: pattern (editable/disabled/readOnly/readPretty)
- **消息反馈**: errors、warnings、successes 三类反馈
- **生命周期**: 完整的 Form/Field 生命周期事件系统
- **Setters**: setValues、setInitialValues 等状态设置方法
- **节点查询器**: query() 支持路径模式匹配

### Graph (字段图)

Graph 维护表单中所有字段的拓扑关系：

- 字段通过路径 (path) 在图中定位
- 支持树形结构的增删改查
- 变更时触发通知机制
- 通过 Query 进行灵活的字段匹配和批量操作

### Heart (事件总线)

Heart 是核心事件系统：

- 注册和管理所有 LifeCycle 实例
- 在生命周期事件触发时发布通知
- 支持外部通过 effects 函数订阅事件
- 提供 createEffectHook API 扩展自定义事件

### 字段模型层级

Field 和 VoidField 是两种核心字段类型。Field 负责数据维护，VoidField 是阉割了数据维护能力的容器字段。ArrayField 和 ObjectField 继承自 Field：

```mermaid
graph TD
    BaseField["BaseField<br/>基础字段"]
    BaseField --> Field["Field<br/>数据字段<br/>value/inputValue/validator"]
    BaseField --> VoidField["VoidField<br/>虚字段<br/>布局容器/不承载数据"]
    Field --> ArrayField["ArrayField<br/>数组字段<br/>push/insert/move..."]
    Field --> ObjectField["ObjectField<br/>对象字段<br/>addProperty/removeProperty"]
```

Field 和 VoidField 之间存在**父子继承**关系——当父节点设置 display 后，子节点默认继承。同时也存在**隐式控制**关系——父级的状态变更会联动影响子级。

### 副作用系统 (Effects)

副作用系统通过 LifeCycleTypes 枚举定义了完整的事件类型，分为 Form 生命周期和 Field 生命周期。Reactive 领域模型中的 Observer（依赖追踪）会订阅这些状态变化：

```mermaid
graph LR
    subgraph Events["生命周期事件"]
        E1["onFormInit / onFormMount"]
        E2["onFormValuesChange"]
        E3["onFormSubmit"]
        E4["onFieldValueChange"]
        E5["onFieldValidateStart"]
    end
    subgraph Observer["Observer 依赖追踪"]
        O1["数据消费方 A"]
        O2["数据消费方 B"]
        O3["数据消费方 C"]
    end
    Events -->|"发布通知"| Observer
    Observer -->|"依赖追踪<br/>精准更新"| Events
```

每个事件类型都有对应的 Hook API：

```ts
import { onFieldValueChange, onFormSubmit } from '@silver-formily/core'

const form = createForm({
  effects() {
    onFormSubmit((form) => {
      // 表单提交时的副作用
    })
    onFieldValueChange('*', (field) => {
      // 任意字段值变化时的副作用
    })
  },
})
```

## 数据流

```mermaid
graph TD
    A["👤 用户输入"] --> B["Field.onInput / setValue"]
    B --> C["Heart.publish<br/>触发 LifeCycleTypes"]
    C --> D["Reactive 依赖收集"]
    D --> E["Observer 通知订阅者"]
    E --> F["Effects 回调执行"]
    F --> G["UI 更新"]
    C --> H["校验调度<br/>validator.validate"]
    H --> I["feedbacks 写入"]
```

## 与上游的关系

`@silver-formily/core` 是 `@formily/core` 的 fork，保持核心模型 API、副作用系统、生命周期类型定义和校验调度机制的兼容。

主要差异：底层依赖包替换为 `@silver-formily/*` 系列，针对 Vue 生态优化，修复了部分上游问题。
