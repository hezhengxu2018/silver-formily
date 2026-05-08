# raw

## 描述

从 observable 对象中获取源数据，通常情况下并不推荐使用该 API

:::warning
注意：只能获取当前对象的源数据，不包括深层对象属性
:::

## 签名

```ts
interface raw<T extends object> {
  (target: T): T
}
```

## 用例

::: demo
api/raw/basic
:::

### 示例代码

```ts
import { observable, raw } from '@formily/reactive'

const obs = observable({})

obs.aa = { bb: 123 }

console.log(raw(obs))
console.log(raw(obs.aa))
```
