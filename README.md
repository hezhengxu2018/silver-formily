# Silver Formily

[English README](./README.en.md)

Silver Formily 是一个基于 `pnpm workspace` 和 `Turborepo` 的 Vue 3 / Formily monorepo，聚合了运行时封装、Element Plus 组件封装、Grid 工具库、共享文档主题与多站点文档工程。

## 当前依赖基线

- Node.js `>= 18`
- `pnpm@9`
- Vue `^3.3.0`
- Formily `^2`
- Element Plus `^2`
- TypeScript `5.9.2`
- Turbo `^2.8.5`
- Vite `^7.3.1`
- VitePress `2.0.0-alpha.16`
- Vitest `^4.0.16`
- tsdown `^0.18.1`

## 文档站点

- Reactive: <https://reactive.silver-formily.org>
- Vue: <https://vue.silver-formily.org>
- Reactive Vue: <https://reactive-vue.silver-formily.org>
- Element Plus: <https://element-plus.silver-formily.org>
- Grid: <https://grid.silver-formily.org>
- 官方的 JSON Schema 文档重构: <https://json-schema.silver-formily.org>

## 工作区包

| 包名                                | 当前版本 | 说明                                          | 依赖基线                                                                          |
| ----------------------------------- | -------- | --------------------------------------------- | --------------------------------------------------------------------------------- |
| `@silver-formily/reactive-vue`      | `1.0.0`  | Vue 3 版 `@formily/reactive` 响应式适配层     | `vue ^3.3.0`、`@formily/reactive ^2`                                              |
| `@silver-formily/vue`               | `2.3.1`  | Vue 3 版 Formily 运行时绑定                   | `@formily/core/json-schema/reactive/shared ^2`、`@silver-formily/reactive-vue ^1` |
| `@silver-formily/element-plus`      | `3.0.1`  | Formily + Element Plus 组件封装与场景组件     | `element-plus ^2.1.8`、`vue ^3.3.0`、`@vueuse/core`                               |
| `@silver-formily/grid`              | `1.0.1`  | 与 Formily 生态配套的网格布局运行时           | `@formily/reactive ^2`                                                            |
| `@silver-formily/docs-toolkit`      | `0.0.0`  | 内部共享的 VitePress 主题、插件与站点配置工具 | `vitepress 2.0.0-alpha.16`                                                        |
| `@silver-formily/typescript-config` | `0.0.0`  | 内部 TypeScript 配置共享包                    | 供 workspace 复用                                                                 |

`apps/*` 下的 6 个文档应用均为私有 workspace，当前统一使用 VitePress 站点脚本（`vitepress dev/build/preview`）并通过 `@silver-formily/docs-toolkit` 复用主题配置。

## 仓库结构

```text
.
|- apps/                   # VitePress 文档站点
|  |- reactive-docs
|  |- vue-docs
|  |- reactive-vue-docs
|  |- element-plus-docs
|  |- grid-docs
|  `- json-schema-docs
|- packages/               # 可发布或内部复用包
|  |- vue
|  |- reactive-vue
|  |- element-plus
|  |- grid
|  |- docs-toolkit
|  `- typescript-config
`- scripts/                # 仓库级脚本（如按 changeset 增量构建）
```

## 安装

```bash
pnpm install
```

## 根目录脚本

| 命令                    | 实际行为                                           |
| ----------------------- | -------------------------------------------------- |
| `pnpm dev`              | `turbo run dev`，并行启动声明了 `dev` 的 workspace |
| `pnpm build`            | `turbo run build`，构建所有包与文档应用            |
| `pnpm docs:build`       | `turbo run docs:build`，仅构建文档站点             |
| `pnpm lint`             | `turbo run lint`                                   |
| `pnpm format`           | `turbo run format`                                 |
| `pnpm check-types`      | `turbo run check-types`                            |
| `pnpm test`             | `turbo run test`                                   |
| `pnpm build:changed`    | 读取 Changesets 状态，仅构建待发布包               |
| `pnpm changeset`        | 创建 Changeset                                     |
| `pnpm version-packages` | 执行 `changeset version`                           |
| `pnpm release`          | 先执行 `build:changed`，再执行 `changeset publish` |
| `pnpm commit`           | 启动 `czg` 生成 Conventional Commit                |

## 按包开发

```bash
# 仅启动某个文档站
pnpm --filter vue-docs dev

# 仅构建某个运行时包
pnpm --filter @silver-formily/vue build

# 仅运行某个包的覆盖率测试
pnpm --filter @silver-formily/element-plus test:coverage

# 仅构建待发布包
pnpm run build:changed
```

## 工程约定

- 代码风格由 `@antfu/eslint-config` 驱动，统一采用 2 空格、单引号、无分号。
- 根目录 `pnpm format` 会委托给 `turbo run format`；Husky `pre-commit` 当前执行 `pnpm turbo run format`。
- `build` 任务在 Turbo 中声明了 `dist/**`、`.vitepress/dist/**`、`esm/**` 作为缓存输出。
- `reactive-vue` 与 `grid` 主要使用 `tsdown` 构建；`vue` 与 `element-plus` 当前使用 Vite 库模式构建。
- 文档站点统一基于 VitePress `2.0.0-alpha.16`，共享 `@silver-formily/docs-toolkit` 中的主题与插件配置。
- 提交规范采用 Conventional Commits，可通过 `pnpm commit` 调用 `czg`。

## CI 与发布

- CI 在 `main` 分支 push / PR 时运行 `pnpm lint`，并执行 `reactive-vue`、`element-plus` 覆盖率测试。
- CI 还会先构建 `@silver-formily/grid`、`@silver-formily/reactive-vue`、`@silver-formily/vue`，再运行 `element-plus` 浏览器测试链路。
- 发布工作流通过手动触发执行，包含构建内部依赖包、`pnpm check-types`、`pnpm test`、`grid` / `reactive-vue` / `element-plus` 覆盖率测试，以及 Changesets 版本发布。
- 修改可发布包时，建议同步提交 `.changeset/*` 文件。

## 贡献前检查

```bash
pnpm install
pnpm format
pnpm lint
pnpm check-types
pnpm build
```

如果你修改了包行为、测试基线或文档示例，请在 PR 中补充手动验证步骤。
