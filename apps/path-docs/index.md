# 介绍

`@silver-formily/path` 是 Formily 路径系统的独立实现。它同时解决了三类问题：

1. 把字符串、数组、正则、matcher 函数统一成同一种路径抽象。
2. 在对象和数组中安全地 `getIn` / `setIn` / `deleteIn`。
3. 用一套更强的模式语法描述字段匹配规则。

## 安装

::: code-group

```bash [pnpm]
pnpm add @silver-formily/path
```

```bash [npm]
npm install @silver-formily/path
```

:::

## 例子

```ts
import { Path } from '@silver-formily/path'

const values = {
  user: {
    profile: {
      nickname: 'silver',
    },
  },
}

Path.getIn(values, 'user.profile.nickname')
// 'silver'

Path.setIn(values, 'user.profile.city', 'Shanghai')
// values.user.profile.city === 'Shanghai'
```
