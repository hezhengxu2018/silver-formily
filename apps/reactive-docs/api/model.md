# model

## 核心概念

model 是对领域模型定义的自动化封装，适合快速把普通对象转换为 observable 模型。它会自动把 getter/setter 包装为 computed，把函数包装为 action，把普通属性包装为深度 observable。

## 描述

快速定义领域模型，会对模型属性做自动声明：

- getter/setter 属性自动声明 computed
- 函数自动声明 action
- 普通属性自动声明 observable

## 签名

```ts
interface model<Target extends object> {
  (target: Target): Target
}
```

## 用例

::: demo
api/model/basic
:::

### 示例代码

```ts
import { autorun, model } from '@formily/reactive'

const obs = model({
  aa: 1,
  bb: 2,
  get cc() {
    return this.aa + this.bb
  },
  update(aa, bb) {
    this.aa = aa
    this.bb = bb
  },
})

autorun(() => {
  console.log(obs.cc)
})

obs.aa = 3

obs.update(4, 6)
```
