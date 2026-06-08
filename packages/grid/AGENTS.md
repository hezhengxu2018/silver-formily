# Grid Package Guide (extends root `AGENTS.md`)

本包用于维护 `@silver-formily/grid` 的响应式网格运行时。

- 默认遵循仓库根目录 `AGENTS.md`。
- 构建产物输出到 `dist/`，请勿手动修改。
- `@silver-formily/reactive` 与包本身都按外部依赖处理，不要在构建产物里打包进去。
- 对外 API 以 `src/index.ts` 为准；修改公开能力时，请同步更新 `apps/grid-docs/` 和 README。
