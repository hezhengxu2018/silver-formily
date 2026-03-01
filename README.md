# Silver Formily

Silver Formily 是一个基于 `pnpm workspace + Turborepo` 的 monorepo，围绕 Formily 生态提供 Vue 3 运行时封装、Element Plus 组件封装、Grid 工具库和文档站点体系。

## 文档站点

- Vue: <https://vue.silver-formily.org>
- Reactive Vue: <https://reactive-vue.silver-formily.org>
- Element Plus: <https://element-plus.silver-formily.org>
- Grid: 本地运行 `pnpm --filter grid-docs dev`

## 核心包

| 包名                                | 说明                                |
| ----------------------------------- | ----------------------------------- |
| `@silver-formily/reactive-vue`      | Vue 3 版 `@formily/reactive` 封装   |
| `@silver-formily/vue`               | Vue 3 版 Formily 运行时绑定         |
| `@silver-formily/element-plus`      | Formily + Element Plus 组件封装     |
| `@silver-formily/grid`              | 与 Formily 生态配套的网格布局运行时 |
| `@silver-formily/docs-toolkit`      | 内部文档主题与 VitePress 配置工具   |
| `@silver-formily/typescript-config` | 内部 TypeScript 配置共享包          |

## 仓库结构

```text
.
|- apps/                   # VitePress 文档站点
|  |- vue-docs
|  |- reactive-vue-docs
|  |- element-plus-docs
|  `- grid-docs
|- packages/               # 可发布或内部复用包
|  |- vue
|  |- reactive-vue
|  |- element-plus
|  |- grid
|  |- docs-toolkit
|  `- typescript-config
`- scripts/                # 仓库级脚本（如按 changeset 增量构建）
```

## 环境要求

- Node.js `>= 18`
- `pnpm@9`

```bash
pnpm install
```

## 常用命令

| 命令                 | 说明                                       |
| -------------------- | ------------------------------------------ |
| `pnpm dev`           | 启动 monorepo 内声明了 `dev` 的任务        |
| `pnpm build`         | 构建所有包与应用（经 Turbo 调度）          |
| `pnpm docs:build`    | 构建所有文档站点                           |
| `pnpm lint`          | 运行所有 workspace 的 lint                 |
| `pnpm format`        | 使用 ESLint 规则统一格式                   |
| `pnpm check-types`   | 运行类型检查任务                           |
| `pnpm test`          | 运行测试任务                               |
| `pnpm build:changed` | 仅构建 changeset 需要发布的包              |
| `pnpm release`       | `build:changed` 后执行 `changeset publish` |

## 按包开发（推荐）

```bash
# 仅启动某个文档站
pnpm --filter element-plus-docs dev

# 仅构建某个包
pnpm --filter @silver-formily/vue build

# 仅运行某个包的测试
pnpm --filter @silver-formily/reactive-vue test
```

## 工程约定

- 代码风格：`@antfu/eslint-config`（2 空格、单引号、无分号）。
- 提交规范：Conventional Commits（可使用 `pnpm commit` 调用 `czg`）。
- CI：`main` 分支和 PR 会执行 lint、测试与覆盖率上传（含 `reactive-vue`、`element-plus`）。
- 发布：使用 Changesets，建议在变更包时同步提交 changeset 文件。

## 贡献前检查

```bash
pnpm install
pnpm format
pnpm lint
pnpm check-types
pnpm build
```

如果你修改了包行为或文档示例，请在 PR 里补充手动验证步骤。
