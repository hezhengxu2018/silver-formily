# Antd Mobile Docs Guide (extends root `AGENTS.md`)

本文件仅补充 `apps/antd-mobile-docs` 的差异约束；其余规则遵循仓库根目录 `AGENTS.md`。

## 目录约定

- 文档页面位于 `zh/`，示例代码位于 `zh/demos/`（React `.tsx`）。
- 站点配置位于 `.vitepress/`，公共静态资源位于 `public/`。
- `.vitepress/cache` 与 `.vitepress/dist` 为构建产物，禁止手动编辑。

## React Demo 桥接

- 本站基于 VitePress（Vue），demo 为 React 组件：`.vitepress/theme/react-demo.ts` 提供 `createReactDemoRegistry`，把 `import.meta.glob` 的 `.tsx` demo 包装为「Vue 外壳 + React `createRoot`」的 island 组件，再注入主题的 `mobilePreviewRegistryKey` 供手机壳 iframe 预览使用。
- `createRoot` 仅在 Vue 组件 `onMounted` 时调用，保证 VitePress SSR 构建安全；如需调整桥接逻辑，务必保持这一约束。
- `zh/demos/` 下的公共工具模块（如 `shared.tsx`）与以 `_` 开头的目录（如 `_components/`）会被 registry 的 glob 排除，不要把可预览 demo 放进这些位置；新增工具文件时需同步在 `.vitepress/theme/index.ts` 的负模式中排除。

## 常用命令

- `pnpm --filter antd-mobile-docs dev`：本地启动文档站。
- `pnpm --filter antd-mobile-docs docs:build`：构建静态站点。
- `pnpm --filter antd-mobile-docs preview`：预览构建产物。
- `pnpm --filter antd-mobile-docs lint` / `format`：ESLint 校验 / 自动修复。

## 维护约定

- 示例优先从 `@silver-formily/antd-mobile` 导入，`FormProvider` / `Field` / `SchemaField` 来自 `@silver-formily/react`，`createForm` 来自 `@silver-formily/core`，不直接耦合 `packages/antd-mobile` 内部实现细节。
- 如果新增组件页面，请同步补一个最小 demo，优先保持“能跑通主链路”而不是一开始就追求页面齐全。
- 文档站只 alias `@silver-formily/antd-mobile` 源码；其余内部依赖由 Turbo 的 `dev`/`docs:build` 依赖关系自动预构建。
- 移动端预览 demo 里的表单结果展示统一使用 `submit` 按钮触发 `Dialog.alert(...)`（见 `zh/demos/shared.ts` 的 `showDemoResult`），不要再额外渲染 `FormConsumer` / `pre` 这类实时值预览区块，避免不同 demo 的交互风格不一致。
- 桌面端浏览时的触摸模拟依赖 `@vant/touch-emulator`（在主题入口按浏览器端动态引入）。
