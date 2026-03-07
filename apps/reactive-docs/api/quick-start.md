# 快速开始

## 安装

```bash
npm install --save @formily/reactive
```

## 示例

```ts
import { autorun, observable } from '@formily/reactive'

const obs = observable({
  value: 'Hello world',
})

const dispose = autorun(() => {
  console.log(obs.value)
})

obs.value = 'Hello Formily'

dispose()
```
