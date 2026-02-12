# @silver-formily/docs-toolkit

Shared VitePress theme + helpers for Silver Formily documentation sites.

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
