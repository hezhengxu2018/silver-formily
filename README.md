# Silver Formily

[English README](./README.en.md)

Silver Formily 是一个面向 Vue 3 的表单基础设施 Monorepo。仓库中的核心响应式、路径、校验、Schema、运行时绑定以及 UI 组件适配层，都已经从原有 Formily 依赖迁移为 `@silver-formily/*` 自有实现；当前仓库不再只是“围绕 Formily 的二次封装”，而是一套可独立演进的实现与文档体系。

项目基于 `pnpm`、`Turborepo`、`Vite` 与 `VitePress` 组织，覆盖了核心运行时、Vue 绑定、Element Plus / Vant 组件方案，以及配套的文档站点与内部工具链。

## 现在包含什么

- 核心基础库：`@silver-formily/reactive`、`@silver-formily/path`、`@silver-formily/shared`、`@silver-formily/validator`
- 表单运行时：`@silver-formily/core`、`@silver-formily/json-schema`、`@silver-formily/vue`、`@silver-formily/reactive-vue`
- UI 适配层：`@silver-formily/element-plus`、`@silver-formily/vant`
- 周边能力：`@silver-formily/grid`、`@silver-formily/docs-toolkit`、`@silver-formily/typescript-config`

## 文档站点

- Reactive: <https://reactive.silver-formily.org>
- Path: <https://path.silver-formily.org>
- Validator: <https://validator.silver-formily.org>
- Core: <https://core.silver-formily.org>
- Vue: <https://vue.silver-formily.org>
- Reactive Vue: <https://reactive-vue.silver-formily.org>
- Element Plus: <https://element-plus.silver-formily.org>
- Vant: <https://vant.silver-formily.org>
- Grid: <https://grid.silver-formily.org>
- JSON Schema: <https://json-schema.silver-formily.org>

## Workspace 包

| 包名                                | 说明                               |
| ----------------------------------- | ---------------------------------- |
| `@silver-formily/reactive`          | 响应式核心实现                     |
| `@silver-formily/path`              | 路径解析与访问工具                 |
| `@silver-formily/shared`            | 跨包共享工具与类型                 |
| `@silver-formily/validator`         | 表单校验能力                       |
| `@silver-formily/core`              | 表单领域模型与运行时内核           |
| `@silver-formily/json-schema`       | JSON Schema 与表单描述互转能力     |
| `@silver-formily/reactive-vue`      | Vue 响应式桥接层                   |
| `@silver-formily/vue`               | Vue 3 运行时绑定                   |
| `@silver-formily/element-plus`      | Element Plus 组件适配与场景组件    |
| `@silver-formily/vant`              | Vant 组件适配与移动端场景能力      |
| `@silver-formily/grid`              | 响应式布局与网格能力               |
| `@silver-formily/docs-toolkit`      | VitePress 主题、插件与站点共享配置 |
| `@silver-formily/typescript-config` | 内部 TypeScript 配置共享包         |

## 仓库结构

```text
.
|- apps/                         # VitePress 文档站点
|  |- core-docs
|  |- element-plus-docs
|  |- grid-docs
|  |- json-schema-docs
|  |- path-docs
|  |- reactive-docs
|  |- reactive-vue-docs
|  |- validator-docs
|  |- vant-docs
|  `- vue-docs
|- packages/                     # 可发布包与内部工具
|  |- core
|  |- docs-toolkit
|  |- element-plus
|  |- grid
|  |- json-schema
|  |- path
|  |- reactive
|  |- reactive-vue
|  |- shared
|  |- typescript-config
|  |- validator
|  |- vant
|  `- vue
`- scripts/                      # 仓库级脚本
```

## 环境要求

- Node.js `>= 24`
- `pnpm@11`

## 安装

```bash
pnpm install
```

## 常用命令

| 命令                    | 作用                                          |
| ----------------------- | --------------------------------------------- |
| `pnpm dev`              | 打开可搜索的 workspace 选择器，默认面向文档站 |
| `pnpm dev:all`          | 并行启动所有声明了 `dev` 的 workspace         |
| `pnpm build`            | 构建所有声明了 `build` 的 workspace           |
| `pnpm docs:build`       | 构建所有声明了 `docs:build` 的文档站          |
| `pnpm lint`             | 先检查仓库级文件，再执行 `turbo run lint`     |
| `pnpm format`           | 先格式化仓库级文件，再执行 `turbo run format` |
| `pnpm check-types`      | 执行 `turbo run check-types`                  |
| `pnpm test`             | 打开测试选择器，仅运行选中的 workspace        |
| `pnpm test:all`         | 运行所有测试任务                              |
| `pnpm build:changed`    | 只构建待发布的变更包                          |
| `pnpm changeset`        | 创建 Changeset                                |
| `pnpm version-packages` | 执行 `changeset version`                      |
| `pnpm release`          | 先构建待发布包，再执行 `changeset publish`    |

## 开发示例

```bash
# 启动文档/应用选择器
pnpm dev

# 直接启动某个文档站
pnpm dev -- vue-docs

# 直接监听某个包
pnpm dev -- @silver-formily/grid

# 运行单个包测试
pnpm test -- @silver-formily/element-plus

# 构建某个运行时包
pnpm --filter @silver-formily/vue build

# 构建某个文档站
pnpm --filter element-plus-docs docs:build
```

## 文档站开发约定

- 根级 `pnpm dev` 是默认入口，优先用于启动文档站。
- 文档站统一使用 `docs:build`，不再暴露普通 `build`。
- 如果文档站直接服务于某个内部包，优先通过 VitePress `alias` 指向源码。
- 如果某些内部依赖只在示例中使用，优先通过 `docs:deps` 预构建产物，而不是把它们拉进 `dev/watch`。
- 需要预构建的内部依赖统一写在 `silverFormily.docs.buildDependencies` 中，再由共享脚本转换为 Turbo 过滤条件。

## 工程约定

- 代码风格由 `@antfu/eslint-config` 驱动，统一采用 2 空格、单引号、无分号。
- 根目录 `pnpm format` 会先处理仓库级文件，再委托给 `turbo run format`。
- Husky `pre-commit` 通过 `lint-staged` 仅格式化已暂存文件，并自动重新暂存修改。
- 可发布包统一通过 `tsdown` 构建，文档站统一基于 VitePress。
- 提交信息遵循 Conventional Commits，可通过 `pnpm commit` 调起 `czg`。

## 提交前建议检查

```bash
pnpm install
pnpm format
pnpm lint
pnpm check-types
pnpm build
```

如果这次修改涉及包行为、测试基线或文档示例，建议在 PR 中补充手动验证步骤。
