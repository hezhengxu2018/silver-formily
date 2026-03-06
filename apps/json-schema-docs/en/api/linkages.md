---
outline: [2, 4]
---

# Linkage Examples

This page focuses on common `SchemaReactions` patterns. For convenience, the key type signature is repeated here. For the full type definition, see [SchemaReactions](/en/api/types#schemareactions).

```ts
type SchemaReaction<Field = any>
  = | {
    dependencies?: // dependency path list, supports FormPathPattern syntax; passive dependencies support relative paths
      | Array<
        | string // string items are exposed as an array when reading from scope
        | {
          // object items can be read from $deps by alias
          name?: string // alias used when reading from $deps
          type?: string // field type
          source?: string // field path
          property?: string // dependent property, defaults to value
        }
      >
      | Record<string, string> // object form is also exposed as an object, with keys acting as aliases
    when?: string | boolean // linkage condition
    target?: string // target field path, supports FormPathPattern matching syntax; relative paths are not supported
    effects?: SchemaReactionEffect[] // lifecycle hooks available in active mode
    fulfill?: {
      // when the condition matches
      state?: IGeneralFieldState // update field state
      schema?: ISchema // update schema
      run?: string // execute statement
    }
    otherwise?: {
      // when the condition does not match
      state?: IGeneralFieldState // update field state
      schema?: ISchema // update schema
      run?: string // execute statement
    }
  }
  | ((field: Field) => void) // function form for complex linkage
```

## Built-in Expression Scope

Built-in expression scope is mainly used to build different linkage relationships inside expressions.

| Scope Variable  | Meaning                                                         | Common Usage                        |
| --------------- | --------------------------------------------------------------- | ----------------------------------- |
| `$self`         | current field instance                                          | property expressions, `x-reactions` |
| `$values`       | top-level form values                                           | property expressions, `x-reactions` |
| `$form`         | current `Form` instance                                         | property expressions, `x-reactions` |
| `$observable`   | creates reactive objects, equivalent to `observable`            | complex reaction functions, helpers |
| `$memo`         | creates persistent references, equivalent to `autorun.memo`     | complex reaction functions, helpers |
| `$effect`       | handles microtasks and dispose after `autorun` first runs       | complex reaction functions, helpers |
| `$dependencies` | dependency values in `x-reactions`, aligned with `dependencies` | passive linkage expressions         |
| `$deps`         | dependency values in `x-reactions`, aligned with `dependencies` | passive linkage expressions         |
| `$target`       | target field instance in active linkage mode                    | active linkage expressions          |

## Examples

### Active Linkage

#### Standard active linkage

::: demo
api/linkages-en/active-standard
:::

#### Partial expression dispatch linkage

::: demo
api/linkages-en/active-state-expression
:::

#### Schema-based linkage

::: demo
api/linkages-en/active-schema
:::

#### `run` statement linkage

::: demo
api/linkages-en/active-run
:::

#### Lifecycle-hook-based linkage

::: demo
api/linkages-en/active-effects
:::

#### Expression scope: `$self` + `$values` + `$form`

In active linkage mode, `source` updates the content of `hint` to demonstrate three built-in scope values.

::: demo
api/expression-scope-en/self-values-form
:::

#### Expression scope: `$target` fallback value

In active linkage mode, `source` updates `target`. When `source` is empty, it falls back to `$target.value` and keeps the current target value.

::: demo
api/expression-scope-en/target-active
:::

### Passive Linkage

::: demo
api/linkages-en/passive-dependencies
:::

#### Neighbor linkage inside array items

For sibling fields inside an array item, passive dependencies are usually clearer. In this example, the current row's `target` depends on the current row's `.source`.

::: demo
api/linkages-en/active-neighbor
:::

#### Expression scope: `$deps` + `$dependencies`

In passive linkage mode, `summary` depends on `price/count` and reads both `$deps` and `$dependencies` in the same expression.

::: demo
api/expression-scope-en/deps-dependencies
:::

### Complex Linkage

::: demo
api/linkages-en/complex-function
:::

### Component Prop Linkage

#### Updating state

::: demo
api/linkages-en/component-style-state
:::

#### Updating schema protocol

::: demo
api/linkages-en/component-style-schema
:::
