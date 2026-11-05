# @silver-formily/docs-toolkit

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[简体中文](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/docs-toolkit/README.md) | [English](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/docs-toolkit/README.en.md)

Shared VitePress theme + helpers for Silver Formily documentation sites.

> This is an internal workspace (`private: true`) and is not published to npm.

## Installation

```bash
pnpm --filter '<workspace-name>' add '@silver-formily/docs-toolkit@workspace:*'
```

Replace `<workspace-name>` with the consuming workspace name.

## Usage

1. Add the package to docs apps:

```json
{
  "dependencies": {
    "@silver-formily/docs-toolkit": "workspace:*"
  }
}
```

2. Create your VitePress config with the helper:

```ts
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createDocsConfig } from '@silver-formily/docs-toolkit'
import pkg from '../../packages/some-lib/package.json'

const dir = dirname(fileURLToPath(import.meta.url))

export default createDocsConfig({
  pkg,
  demoDir: path.resolve(dir, '../demos'),
  alias: {
    '@repo/lib': path.resolve(dir, '../../packages/lib/src'),
  },
  locales: { /* ... */ },
  sidebar: { /* ... */ },
})
```

3. Re-export the shared theme:

```ts
export { default } from '@silver-formily/docs-toolkit/theme'
```

The toolkit also ships a `vitepress` binary so existing scripts (`vitepress dev .`) continue to work once the dependency is installed.

## Documentation

- [Project home](https://silver-formily.org/en/)
- [Source](https://github.com/hezhengxu2018/silver-formily/tree/main/packages/docs-toolkit)
- [Issues](https://github.com/hezhengxu2018/silver-formily/issues)

## License

[MIT](https://opensource.org/licenses/MIT)
