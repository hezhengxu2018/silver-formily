# Antd Package Guide

继承根目录 AGENTS.md。本包提供上游 antd 的基础组件及基于本仓库 Grid 运行时的 FormGrid，范围见 README.md。

- 依赖 Ant Design 6，运行时仅使用本仓库 `@silver-formily/*`；不要引入上游 Formily 或旧 Less/mixin。
- 布局样式使用局部 CSS 与 `theme.useToken()` 注入的变量；控件反馈通过原生 FormItemInputContext 传递，尺寸和外观通过 ConfigProvider 传递。Ant Design 内部 context 与 Form 样式入口集中在 `src/__builtins__/feedback.tsx`，基于 6.6.5；升级时必须运行原生反馈对照测试。ControlContext 仅负责本包控件的 ID 关联。
- `src/__builtins__` 仅保留本次组件需要的工具，不从 antd-mobile 包内部导入。
- `esm/` 是 tsdown 产物，禁止直接修改。新增样式由组件入口引入。
- 保持 React 18/19 与 SSR 安全，不使用函数组件 defaultProps 或顶层 DOM 操作。
- 测试使用 Vitest 浏览器模式，运行 `pnpm --filter @silver-formily/antd test:browser`。
- 新增能力同步更新 `apps/antd-docs` 与 changeset；未迁移组件不要添加占位导出。

- 封装样式固定使用 `silver-formily-` BEM 命名空间，由包内 `createBem`（easy-bem）生成，`cls`（clsx）负责合并基础类、修饰符和外部 className。修饰符不自动包含基础类，必须显式合并；不提供封装 prefixCls API。自有 CSS 变量统一使用 `--silver-formily-*`。仅原生 antd 反馈样式继续使用 ConfigProvider 的前缀。
