# reaction

## 核心概念

reaction 是 observable 的订阅者。它接收一个 tracker 函数，在执行时如果读取了 observable 属性，就会与这些属性建立依赖关系；等到这些属性在别处发生写操作时，tracker 会再次执行。

和 autorun 不同，reaction 还会对 tracker 的返回值做一次脏检查，只有结果真正变化时才调用 subscriber，因此更适合精确控制副作用。

![](https://img.alicdn.com/imgextra/i4/O1CN01DQMGUL22mFICDsKfY_!!6000000007162-2-tps-1234-614.png)

每次执行都会重新收集依赖，所以和 autorun 一样，在不再需要时也要主动 dispose。

## 描述

接收一个 tracker 函数，与 callback 响应函数，如果 tracker 内部有消费 observable 数据，数据发生变化时，tracker 函数会重复执行，但是 callback 执行必须要求 tracker 函数返回值发生变化时才执行

## 签名

```ts
interface IReactionOptions<T> {
  name?: string
  equals?: (oldValue: T, newValue: T) => boolean // 脏检查
  fireImmediately?: boolean // 是否第一次默认触发，绕过脏检查
}

interface reaction<T> {
  (
    tracker: () => T,
    subscriber?: (newValue: T, oldValue: T) => void,
    options?: IReactionOptions<T>
  ): void
}
```

## 用例

::: demo
api/reaction/basic
:::

#### 示例代码

```ts
import { batch, observable, reaction } from '@formily/reactive'

const obs = observable({
  aa: 1,
  bb: 2,
})

const dispose = reaction(() => {
  return obs.aa + obs.bb
}, console.log)

batch(() => {
  // 不会触发，因为obs.aa + obs.bb值没变
  obs.aa = 2
  obs.bb = 1
})

obs.aa = 4

dispose()
```
