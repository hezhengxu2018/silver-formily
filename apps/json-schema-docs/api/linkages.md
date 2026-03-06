---
outline: [2, 4]
---

# 联动示例

本章聚焦 `SchemaReactions` 的常见联动写法。为阅读方便，本章节会重复列出联动的关键类型签名，完整的类型签名请查看 [SchemaReactions](/api/types#schemareactions)。

```ts
type SchemaReaction<Field = any>
  = | {
    dependencies?: // 依赖的字段路径列表，支持FormPathPattern数据路径语法, 只能以点路径描述依赖，支持相对路径
      | Array<
        | string // 如果数组里是string，那么读的时候也是数组格式
        | {
          // 如果数组里是对象, 那么读的时候通过name从$deps获取
          name?: string // 从$deps读取时的别名
          type?: string // 字段类型
          source?: string // 字段路径
          property?: string // 依赖属性, 默认为value
        }
      >
      | Record<string, string> // 如果是对象格式，读的时候也是对象格式，只是对象的key相当于别名
    when?: string | boolean // 联动条件
    target?: string // 要操作的字段路径，支持FormPathPattern匹配路径语法，注意：不支持相对路径！！
    effects?: SchemaReactionEffect[] // 主动模式下的独立生命周期钩子
    fulfill?: {
      // 满足条件
      state?: IGeneralFieldState // 更新状态
      schema?: ISchema // 更新Schema
      run?: string // 执行语句
    }
    otherwise?: {
      // 不满足条件
      state?: IGeneralFieldState // 更新状态
      schema?: ISchema // 更新Schema
      run?: string // 执行语句
    }
  }
  | ((field: Field) => void) // 支持函数, 可以复杂联动
```

## 内置表达式作用域

内置表达式作用域主要用于在表达式中实现各种联动关系。

| 作用域变量      | 含义                                                                      | 常见使用位置                  |
| --------------- | ------------------------------------------------------------------------- | ----------------------------- |
| `$self`         | 当前字段实例                                                              | 普通属性表达式、`x-reactions` |
| `$values`       | 顶层表单数据                                                              | 普通属性表达式、`x-reactions` |
| `$form`         | 当前 Form 实例                                                            | 普通属性表达式、`x-reactions` |
| `$observable`   | 创建响应式对象，语义与 `observable` 一致                                  | 复杂联动函数、作用域工具函数  |
| `$memo`         | 创建持久引用数据，语义与 `autorun.memo` 一致                              | 复杂联动函数、作用域工具函数  |
| `$effect`       | 响应 `autorun` 首次执行后的微任务与 dispose，语义与 `autorun.effect` 一致 | 复杂联动函数、作用域工具函数  |
| `$dependencies` | `x-reactions` 的依赖值集合（与 `dependencies` 对应）                      | 被动联动表达式                |
| `$deps`         | `x-reactions` 的依赖值集合（与 `dependencies` 对应）                      | 被动联动表达式                |
| `$target`       | 主动联动模式中的目标字段实例                                              | 主动联动表达式                |

## 用例

### 主动联动

#### 标准主动联动

::: demo
api/linkages/active-standard
:::

#### 局部表达式分发联动

::: demo
api/linkages/active-state-expression
:::

#### 基于 Schema 协议联动

::: demo
api/linkages/active-schema
:::

#### 基于 run 语句联动

::: demo
api/linkages/active-run
:::

#### 基于生命周期钩子联动

::: demo
api/linkages/active-effects
:::

#### 表达式作用域：`$self` + `$values` + `$form`

在主动联动里，从 `source` 字段更新 `hint` 字段内容，展示 3 个内置作用域值。

::: demo
api/expression-scope/self-values-form
:::

#### 表达式作用域：`$target` 回退值

在主动联动里，`source` 更新 `target`；当 `source` 为空时回退到 `$target.value`，保留目标字段当前值。

::: demo
api/expression-scope/target-active
:::

### 被动联动

::: demo
api/linkages/passive-dependencies
:::

#### 相邻元素联动（数组项内）

数组项里的同级字段推荐用被动依赖实现，例如当前行 `target` 依赖当前行 `.source`。

::: demo
api/linkages/active-neighbor
:::

#### 表达式作用域：`$deps` + `$dependencies`

在被动联动里，`summary` 依赖 `price/count`，通过表达式同时读取 `$deps` 和 `$dependencies`。

::: demo
api/expression-scope/deps-dependencies
:::

### 复杂联动

::: demo
api/linkages/complex-function
:::

### 组件属性联动

#### 操作状态

::: demo
api/linkages/component-style-state
:::

#### 操作 Schema 协议

::: demo
api/linkages/component-style-schema
:::
