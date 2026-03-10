# tracker

## 核心概念

Tracker 提供的是手动依赖追踪能力，通常用于接入 React、Vue 这类渲染层。它仍然会收集 tracker 中读取到的 observable 依赖，但依赖变化后不会自动重跑 tracker，只会触发 scheduler，由使用方决定何时再次执行 `track`。

## 描述

主要用于接入 React/Vue 的手动追踪依赖工具，在依赖发生变化时不会重复执行 tracker 函数，需要用户手动重复执行，只会触发 scheduler

## 签名

```ts
class Tracker {
  constructor(scheduler?: (reaction: this['track']) => void, name?: string)
  track: <T>(tracker?: () => T) => T
  dispose: () => void
}
```

## 用例

```ts
import { observable, Tracker } from '@formily/reactive'

const obs = observable({
  aa: 11,
})

function view() {
  console.log(obs.aa)
}

const tracker = new Tracker(() => {
  tracker.track(view)
})

tracker.track(view)

obs.aa = 22

tracker.dispose()
```
