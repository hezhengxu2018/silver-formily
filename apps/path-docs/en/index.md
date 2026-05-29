# Introduction

`@silver-formily/path` is the standalone path system used by Formily. It solves three related problems in one place:

1. Normalize strings, arrays, regular expressions, and matcher functions into one path abstraction.
2. Read and write nested data safely with `getIn`, `setIn`, and `deleteIn`.
3. Express field matching rules with a richer pattern language.

## Installation

::: code-group

```bash [pnpm]
pnpm add @silver-formily/path
```

```bash [npm]
npm install @silver-formily/path
```

:::

## Example

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
