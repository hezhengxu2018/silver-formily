# @silver-formily/docs-toolkit

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[简体中文](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/docs-toolkit/README.md) | [English](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/docs-toolkit/README.en.md)

Silver Formily 文档站共用的 VitePress 主题、配置辅助函数与 CLI。

> 本包为仓库内部工作区（`private: true`），不发布到 npm。

## 安装

```bash
pnpm --filter '<workspace-name>' add '@silver-formily/docs-toolkit@workspace:*'
```

将 `<workspace-name>` 替换为消费该包的工作区名称。

## 用法

1. 在文档应用中声明工作区依赖：

```json
{
  "dependencies": {
    "@silver-formily/docs-toolkit": "workspace:*"
  }
}
```

2. 使用辅助函数创建 VitePress 配置：

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

3. 重新导出共享主题：

```ts
export { default } from '@silver-formily/docs-toolkit/theme'
```

工具包同时提供 `vitepress` 命令，安装依赖后可继续使用 `vitepress dev .` 等脚本。

## 文档

- [项目首页](https://silver-formily.org/)
- [源码](https://github.com/hezhengxu2018/silver-formily/tree/main/packages/docs-toolkit)
- [问题反馈](https://github.com/hezhengxu2018/silver-formily/issues)

## 许可证

[MIT](https://opensource.org/licenses/MIT)
