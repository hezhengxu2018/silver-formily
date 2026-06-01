# 快速开始

## 安装

```bash
npm install --save @silver-formily/reactive
```

## 示例

```ts
import { autorun, observable } from '@silver-formily/reactive'

const obs = observable({
  value: 'Hello world',
})

const dispose = autorun(() => {
  console.log(obs.value)
})

obs.value = 'Hello Formily'

dispose()
```
