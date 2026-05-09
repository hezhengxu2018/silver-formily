# Tiptap Playground Guide (extends root `AGENTS.md`)

本文件仅补充 `apps/tiptap-playground` 的差异约束；其余规则遵循仓库根目录 `AGENTS.md`。

## 目录约定

- 这是一个普通的 Vite + Vue 预览项目，不是 VitePress 文档站。
- 源码位于 `src/`，用于验证 `@silver-formily/tiptap` 在非文档环境中的运行状态。

## 常用命令

- `pnpm --filter tiptap-playground dev`：启动本地预览。
- `pnpm --filter tiptap-playground build`：构建 playground。
- `pnpm --filter tiptap-playground check-types`：执行类型检查。
