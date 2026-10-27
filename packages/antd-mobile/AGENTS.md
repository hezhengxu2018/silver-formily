# Antd Mobile Package Guide (extends root `AGENTS.md`)

本文件仅补充 `packages/antd-mobile` 的差异约束；其余规则遵循仓库根目录 `AGENTS.md`。

## 来源与迁移偏差

- 源码迁移自 formilyjs/antd-mobile（`@formily/antd-mobile` v1.0.0-beta.3）的 `packages/components`，所有 formily 依赖已替换为 `@silver-formily/*` fork。
- 日期库使用 **dayjs**（上游为 moment）：`src/__builtins__/dayjs.ts` 导出 `dayjsable` / `formatDayjsValue`，并统一注册 `customParseFormat`、`quarterOfYear`、`advancedFormat`、`weekOfYear`、`weekYear` 插件；组件内如需 dayjs 实例请从该模块导入，勿直接 `import dayjs from 'dayjs'`，否则季度等格式不可用。
- `ArrayBase.SortHandle` 仅为图标占位（上游的 react-sortable-hoc 拖拽在上游就未接线，且该库依赖 React 19 已移除的 `findDOMNode`，已整体移除）。
- 不保留没有调用方的历史 hooks 和 portal 工具；弹层选择器的开关、确认保护及焦点恢复统一使用内部 `usePopupPicker`。
- 函数组件一律不使用 `defaultProps`（React 19 已移除支持），默认值通过解构参数提供。

## 目录与样式约定

- `src/` 为组件封装源码，对外导出统一由 `src/index.ts` 汇总；`esm/` 为构建产物，禁止手动修改。
- 样式保留 **less**（与 element-plus/vant 的 scss 惯例不同，为有意决策）：组件如有覆盖样式，目录内提供 `style.less`，并由组件入口 `index.tsx` 直接 `import './style.less'`（与 element-plus 封装引入 `style.scss` 的做法一致）；全局 token 变量在 `src/global/global.less`。tsdown 会在构建时提取 CSS 并在产物 `index.mjs` 中自动添加引入，无需 `style.ts` 中间层。
- antd-mobile ≥ 5.38 会在组件入口自动加载自身样式（含包入口的 `global.css`），勿手动透传 `antd-mobile/es/components/<name>/<name>.css`。
- 禁止在 less 中使用 `~antd-mobile/...` 波浪号导入（webpack 专属约定，less/rolldown 不解析）。
- `src/index.ts` 入口仅汇总组件导出；样式随各组件入口的 `style.less` 引入自动进入产物。

## 常用命令

- `pnpm --filter @silver-formily/antd-mobile build`：构建到 `esm/`（tsdown unbundle，样式注入）。
- `pnpm --filter @silver-formily/antd-mobile test`：vitest 浏览器模式（Playwright chromium）。
- 与 `@silver-formily/react` 的联调优先使用 workspace 版本验证。

## 类型声明约定

- 每个公开组件均提供可从包根入口导入的 `I<Component>Props`；复合组件的子组件 Props 同样导出。Props 包含组件实际接收的 `children`。
- 普通对象 Props 优先使用 `interface extends`；类型别名、联合、映射及条件类型使用 `type`。直接透传的原生 Props 使用类型别名，避免重复维护。
- 覆盖原生属性时先 `Omit`；不改变语义的属性及回调直接继承或通过索引访问复用上游声明。
- 保留上游组件的泛型关联；仅在调用方确实需要时暴露泛型，并提供合理默认值。禁止用 `any` 擦除选项、值与回调之间的关联。
- DOM 事件和 ref 必须对应实际渲染元素。React 18/19 兼容组件继续使用 `forwardRef`。
- 日期输入、内部 Dayjs 值和格式化字符串输出分别声明类型。表单任意数据可沿用上游契约中的 `any`，不能将其扩散到展示组件或 DOM Props。
- `tests/public-types.test.tsx` 验证根入口导出、泛型推导和非法参数；这类断言必须通过 `check-types` 验证，不能只运行 Vitest。

- 本包尚未发布，类型整理直接采用目标 API，不为旧类型名称或无用泛型添加兼容别名。
