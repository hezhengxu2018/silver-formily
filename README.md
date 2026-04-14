# Silver Formily

[English README](./README.en.md)

Silver Formily 是一个基于 `pnpm workspace` 和 `Turborepo` 的 Vue 3 / Formily monorepo，聚合了运行时封装、Element Plus 与 Vant 组件封装、Grid 工具库、共享文档主题与多站点文档工程。

## 文档站点

- Reactive: <https://reactive.silver-formily.org>
- Vue: <https://vue.silver-formily.org>
- Reactive Vue: <https://reactive-vue.silver-formily.org>
- Element Plus: <https://element-plus.silver-formily.org>
- Vant: `apps/vant-docs`（骨架已接入，站点待上线）
- Grid: <https://grid.silver-formily.org>
- 官方的 JSON Schema 文档重构: <https://json-schema.silver-formily.org>

## 工作区包

| 包名                                | 说明                                          |
| ----------------------------------- | --------------------------------------------- |
| `@silver-formily/reactive-vue`      | Vue 3 版 `@formily/reactive` 响应式适配层     |
| `@silver-formily/vue`               | Vue 3 版 Formily 运行时绑定                   |
| `@silver-formily/element-plus`      | Formily + Element Plus 组件封装与场景组件     |
| `@silver-formily/vant`              | Formily + Vant 移动端组件封装骨架             |
| `@silver-formily/grid`              | 与 Formily 生态配套的网格布局运行时           |
| `@silver-formily/docs-toolkit`      | 内部共享的 VitePress 主题、插件与站点配置工具 |
| `@silver-formily/typescript-config` | 内部 TypeScript 配置共享包                    |

`apps/*` 下的 7 个文档应用均为私有 workspace，当前统一使用 VitePress 站点脚本（`vitepress dev/build/preview`）并通过 `@silver-formily/docs-toolkit` 复用主题配置。

## 仓库结构

```text
.
|- apps/                   # VitePress 文档站点
|  |- reactive-docs
|  |- vue-docs
|  |- reactive-vue-docs
|  |- element-plus-docs
|  |- vant-docs
|  |- grid-docs
|  `- json-schema-docs
|- packages/               # 可发布或内部复用包
|  |- vue
|  |- reactive-vue
|  |- element-plus
|  |- vant
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

| 命令                    | 实际行为                                                  |
| ----------------------- | --------------------------------------------------------- |
| `pnpm dev`              | 打开可搜索的 workspace 选择器，默认展示文档与应用的 `dev` |
| `pnpm dev:all`          | `turbo run dev`，并行启动声明了 `dev` 的 workspace        |
| `pnpm build`            | 先筛选声明了 `build` 的 workspace，再执行 Turbo 构建      |
| `pnpm docs:build`       | 先筛选声明了 `docs:build` 的 workspace，再执行 Turbo 构建 |
| `pnpm lint`             | `turbo run lint`                                          |
| `pnpm format`           | `turbo run format`                                        |
| `pnpm check-types`      | `turbo run check-types`                                   |
| `pnpm test`             | 打开可搜索的 workspace 选择器，仅运行选中包的 `test`      |
| `pnpm test:all`         | `turbo run test`，运行全部测试任务                        |
| `pnpm build:changed`    | 读取 Changesets 状态，仅构建待发布包                      |
| `pnpm changeset`        | 创建 Changeset                                            |
| `pnpm version-packages` | 执行 `changeset version`                                  |
| `pnpm release`          | 先执行 `build:changed`，再执行 `changeset publish`        |
| `pnpm commit`           | 启动 `czg` 生成 Conventional Commit                       |

## 按包开发

```bash
# 打开交互式选择器，可直接输入关键字过滤
pnpm dev

# 直接启动某个 workspace（支持包名 / 路径 / 目录名）
pnpm dev -- vue-docs

# 直接启动某个包级 dev/watch
pnpm dev -- @silver-formily/grid

# 启动全部 dev workspace
pnpm dev:all

# 打开测试选择器，只跑目标包的 test，构建链由 turbo 自动补齐
pnpm test

# 直接运行某个包的测试
pnpm test -- @silver-formily/element-plus

# 运行全部测试
pnpm test:all

# 仅启动某个文档站
pnpm --filter vue-docs dev

# 仅构建某个文档站
pnpm --filter vue-docs docs:build

# 仅构建某个运行时包
pnpm --filter @silver-formily/vue build

# 仅运行某个包的覆盖率测试
pnpm --filter @silver-formily/element-plus test:coverage

# 仅构建待发布包
pnpm run build:changed
```

## 文档开发策略

- 所有文档站的根级入口统一走 `pnpm dev` 选择器，且默认只启动文档应用自身；依赖处理由各个 docs app 自己决定。
- 如果文档站就是某个内部包自己的文档，优先给该包配置 VitePress `alias` 指向源码，例如 `element-plus-docs`、`vue-docs`、`grid-docs`、`reactive-vue-docs`。
- 如果文档站只是 demo 顺带用到其他内部包，不要拉这些包进入 `dev/watch`，改用 `docs:deps` 先构建产物，例如 `json-schema-docs` 对 `@silver-formily/reactive-vue`、`@silver-formily/vue`。
- 文档站不再暴露普通 `build`；统一使用 `docs:build`。只要 docs app 定义了 `docs:deps`，`dev` 与 `docs:build` 都应复用它，避免直接打包时缺少产物依赖。
- `docs:deps` 不要手写 Turbo 命令，统一把需要预构建的内部包写在 `silverFormily.docs.buildDependencies` 里，再由共享脚本转换成 Turbo `build` filters。
- 如果某个依赖既不是文档主题本身，也不需要源码热更新，就不要配置 `alias`，只保留产物依赖。
- 新增 docs app 时，优先按这条规则判断：文档主题包走 `alias`，辅助依赖走 `docs:deps`，无关依赖不要加入 `dev` 链路。

## 工程约定

- 代码风格由 `@antfu/eslint-config` 驱动，统一采用 2 空格、单引号、无分号。
- 根目录 `pnpm format` 会委托给 `turbo run format`；Husky `pre-commit` 当前执行 `pnpm turbo run format`。
- `build` 任务在 Turbo 中声明了 `dist/**`、`.vitepress/dist/**`、`esm/**` 作为缓存输出。
- 目前 `packages/*` 库包统一使用 Vite 库模式构建（含类型声明生成）。
- 文档站点统一基于 VitePress `2.0.0-alpha.16`，共享 `@silver-formily/docs-toolkit` 中的主题与插件配置。
- 提交规范采用 Conventional Commits，可通过 `pnpm commit` 调用 `czg`。

## CI 与发布

- CI 在 `main` 分支 push / PR 时运行 `pnpm lint`，并执行 `reactive-vue`、`element-plus` 覆盖率测试。
- CI 还会先构建 `@silver-formily/grid`、`@silver-formily/reactive-vue`、`@silver-formily/vue`，再运行 `element-plus` 浏览器测试链路。
- 发布工作流通过手动触发执行，包含构建内部依赖包、`pnpm check-types`、`pnpm test:all`、`grid` / `reactive-vue` / `element-plus` 覆盖率测试，以及 Changesets 版本发布。
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
