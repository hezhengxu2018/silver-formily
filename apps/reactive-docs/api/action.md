# action

## 核心概念

action 可以看作不收集依赖的 batch。它同样会把一组写操作合并到一次事务里，但会阻止函数内部的读取参与依赖追踪，因此更适合承载命令式更新逻辑。

## 描述

定义一个批量动作。与 batch 的唯一差别就是 action 内部是无法收集依赖的

## 与 batch 的关系

如果你希望把更新逻辑封装成可复用方法，可以用 `action.bound` 做高阶包装，得到和 `batch` 类似的合并更新效果：

```ts
import { action, autorun, observable } from '@formily/reactive'

const obs = observable({})
const handler = action.bound(() => {
  obs.aa = 123
  obs.bb = 321
})

autorun(() => {
  console.log(obs.aa, obs.bb)
})

handler()
```

最终只会额外触发一次响应，即便 `handler` 内部有更多写操作，执行次数也不会继续线性增长。

## 签名

```ts
interface action {
  <T>(callback?: () => T): T // 原地action
  scope: <T>(callback?: () => T) => T // 原地局部action
  bound: <T extends (...args: any[]) => any>(callback: T, context?: any) => T // 高阶绑定
}
```

## 用例

```ts
import { action, observable } from '@formily/reactive'

const obs = observable({
  count: 0,
})

const increase = action.bound(() => {
  obs.count++
})

increase()
```
