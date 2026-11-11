# Antd Docs Guide

继承根目录 AGENTS.md。

- 中文页面位于 `guide/` 与 `components/`，React 示例位于 `demos/`，每个示例默认导出 React 组件。
- 使用共享 docs-toolkit 主题和 `:::demo`，引用时保留 `.tsx` 扩展名。
- 示例文件按实际用途使用 kebab-case 命名（如 `required-mark.tsx`、`sticky-bottom.tsx`），不使用 `official-1` 等来源或序号名称。
- 仅 alias `@silver-formily/antd` 源码，其余内部依赖由 Turbo 预构建。
- 文档主题在 demo 渲染外层统一使用 `DemoConfig` 同步 Ant Design 明暗主题和中文 locale，示例源码不导入或包裹 `DemoConfig`；`DemoConfig` 可在带 SSR 环境判断的 state 初始化中只读当前主题，避免切页闪白，其余 DOM 访问与监听放在挂载后的 effect 中。
- 不使用移动端 iframe 预览，不引用未迁移组件，不增加英文空页面。
- 组件章节介绍与示例主体沿用 Alibaba Formily 中文原文，保留来源与 MIT 许可；具体基线和示例适配记录在 guide/sources.md。
- API 按当前源码整理，不直接照搬上游 API。每页顶部使用 warning 标注与官方实现不同的行为和已知限制；示例裁剪另用 tip 说明。
- `pnpm dev -- antd-docs` 启动；`pnpm exec turbo run docs:build --filter=antd-docs` 构建静态站点。
