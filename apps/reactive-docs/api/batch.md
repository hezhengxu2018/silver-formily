# batch

## 核心概念

基于 Proxy 的响应式系统会把每次原子写操作都视为一次独立更新。如果在一个流程里连续修改多个 observable 属性，Reaction 会被重复触发，造成不必要的计算。

batch 用来把一组更新合并成一次派发，在批量修改数据时可以显著减少 Reaction 的执行次数。

## 描述

定义批量操作，内部可以收集依赖

## 为什么需要 batch

### 交互对比

::: demo
api/batch/compare
:::

如果不做批处理，连续写入多个属性会导致多次重复响应：

```ts
import { autorun, observable } from '@formily/reactive'

const obs = observable({})
function handler() {
  obs.aa = 123
  obs.bb = 321
}

autorun(() => {
  console.log(obs.aa, obs.bb)
})

handler()
```

上面的示例会打印 3 次：`autorun` 初始化一次，`obs.aa` 赋值一次，`obs.bb` 赋值一次。原子操作越多，重复执行次数越多。

使用 `batch` 后，整组更新只会触发一次额外响应：

```ts
import { autorun, batch, observable } from '@formily/reactive'

const obs = observable({})
function handler() {
  obs.aa = 123
  obs.bb = 321
}

autorun(() => {
  console.log(obs.aa, obs.bb)
})

batch(() => {
  handler()
})
```

## 签名

```ts
interface batch {
  <T>(callback?: () => T): T // 原地batch
  scope: <T>(callback?: () => T) => T // 原地局部batch
  bound: <T extends (...args: any[]) => any>(callback: T, context?: any) => T // 高阶绑定
  endpoint: (callback?: () => void) => void // 注册批量执行结束回调
}
```

## 用例

::: demo
api/batch/scope
:::

### 示例代码

```ts
import { autorun, batch, observable } from '@formily/reactive'

const obs = observable({})

autorun(() => {
  console.log(obs.aa, obs.bb, obs.cc, obs.dd)
})

batch(() => {
  batch.scope(() => {
    obs.aa = 123
  })
  batch.scope(() => {
    obs.cc = 'ccccc'
  })
  obs.bb = 321
  obs.dd = 'dddd'
})
```
