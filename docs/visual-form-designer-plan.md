# 可视化表单编辑器规划

调研日期：2026-06-12

## 背景

Formily 官方的可视化表单编辑器主要依托于 `alibaba/designable`。Designable 的定位并不只是表单编辑器，而是一个面向 builder 场景的设计器框架，Formily 只是它的重要落地场景之一。

Silver Formily 目前已经从原始 Formily 生态中拆出独立演进的 Vue 3 表单基础设施，包含响应式核心、表单运行时、JSON Schema、Vue 绑定，以及 Element Plus / Vant 组件适配。后续如果要补齐可视化表单编辑器，需要同时考虑两个目标：

1. 第一阶段能自然服务当前 Vue 3 与 Element Plus / Vant 生态。
2. 长期不要把编辑器能力锁死在 Vue、React 或某个第三方编辑器的数据模型里。

## 当前判断

不建议把某个现成可视化编辑器直接作为 Silver Formily 的核心底座来迁移。

更稳的方向是：把 Silver Formily Schema / Formily JSON Schema 作为长期资产，把编辑器当成 Schema 的可视化创作界面。这样即使编辑器 UI、拖拽库、组件库、渲染框架未来变化，核心表单描述仍然可以保持稳定。

Designable 可以作为架构参考和兼容输入源，但不宜作为长期强依赖。

## Designable 的启发

Designable 对 Formily 的支持并不是因为它天然完全跨框架，而是因为它把几个层次拆开了：

| 层次         | 职责                                                          |
| ------------ | ------------------------------------------------------------- |
| 设计器内核   | 维护设计树、选中态、拖拽、历史记录、操作命令等编辑器状态。    |
| 渲染外壳     | 用 React 等前端框架实现画布、工具栏、属性面板、节点渲染。     |
| 物料协议     | 描述可拖拽组件、默认 schema、属性配置、图标、分组、预览能力。 |
| Formily 适配 | 提供 Formily 组件物料、setter、schema transformer。           |

官方 `alibaba/designable` 更偏 React-first。Vue 方向通常需要额外适配，例如社区中的 `designable-vue` 是基于 Designable beta 版本改造出来的 Element Plus adaptor。

这说明跨框架编辑器的关键不在于直接选择哪个编辑器，而在于是否能把编辑器核心数据、物料协议、渲染外壳和 Schema 转换层拆开。

## 维护风险

Designable 的维护风险需要正视：

- `alibaba/designable` 的官方 release 停留在 2021 年。
- npm 上 `@designable/react`、`@designable/formily-transformer` 等包长期没有新版本。
- 官方实现依赖的工程栈偏旧，例如 React 17、Webpack 4、TypeScript 4.1 等。
- 如果直接 fork 并大规模迁移，短期能复用成熟交互，但长期可能需要承担框架升级、拖拽兼容、构建迁移和类型维护成本。

因此，Designable 更适合作为参考对象，而不是直接变成 Silver Formily 的基础设施核心。

## 推荐架构

建议将编辑器拆成以下包或模块边界：

| 包或模块                                          | 职责                                                                                     |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `@silver-formily/designer-core`                   | 框架无关的设计器核心，负责设计树、选择、移动、复制、删除、撤销重做、导入导出、物料注册。 |
| `@silver-formily/designer-schema`                 | 定义编辑器内部 schema、Silver Formily Schema、Formily JSON Schema 之间的转换规则。       |
| `@silver-formily/designer-vue`                    | Vue 3 版编辑器 UI，包含画布、面板、工具栏、节点渲染、快捷操作。                          |
| `@silver-formily/designer-materials-element-plus` | Element Plus 物料包，声明组件、默认 schema、属性面板 schema、预览组件映射。              |
| `@silver-formily/designer-materials-vant`         | Vant 物料包，服务移动端表单编辑场景。                                                    |
| `@silver-formily/designer-react`                  | 未来可选的 React 编辑器外壳，复用 core、schema 和物料元数据。                            |
| `@silver-formily/designer-designable-compat`      | 可选兼容层，用于导入或转换 Designable 生态的 schema。                                    |

第一版可以只实现 Vue + Element Plus，但 `designer-core` 和 `designer-schema` 从一开始就应该保持框架无关。

## 核心原则

### Schema 优先

编辑器产物必须优先是稳定、可运行、可版本化的 Schema，而不是某个编辑器组件树的私有状态。

运行时只关心 Formily / Silver Formily Schema。编辑器内部可以有额外元信息，但这些信息应该放在明确的扩展字段中，不能污染核心运行时语义。

### 物料协议独立

物料应该描述“这个组件如何被编辑”，而不是只描述“这个组件如何被渲染”。

一个物料至少需要包含：

| 字段               | 说明                           |
| ------------------ | ------------------------------ |
| `name`             | 组件在 schema 中的稳定名称。   |
| `title`            | 编辑器展示名称。               |
| `group`            | 物料面板分组。                 |
| `defaultSchema`    | 拖入画布时生成的默认 schema。  |
| `propsSchema`      | 属性面板使用的配置 schema。    |
| `runtimeComponent` | 运行时组件名称或组件映射 key。 |
| `previewComponent` | 编辑器画布预览组件，可选。     |
| `setters`          | 属性编辑器控件配置。           |

### 编辑器状态与运行时状态分离

编辑器中的选中态、hover 态、拖拽态、辅助线、画布缩放、历史记录，不应该进入表单运行时。

运行时的字段状态、校验状态、联动状态，也不应该反向污染设计器内部结构。两者通过 Schema 和 preview renderer 交互。

### 兼容层可选

Designable schema、其他表单编辑器 schema、第三方低代码平台 schema，都应该通过 compat transformer 导入，而不是成为内部主模型。

这样可以降低迁移成本，也能避免未来跨 Vue / React 时被外部编辑器模型绑定。

## 阶段路线

### 阶段一：最小可用设计器

目标是验证 Silver Formily Schema 的可视化编辑闭环。

- 实现 `designer-core` 的节点树、选择、插入、删除、移动、复制、撤销重做。
- 实现 Vue 版基础 UI：物料面板、画布、属性面板、Schema 预览。
- 首批支持 Element Plus 的常用字段：Input、Select、Radio、Checkbox、DatePicker、Switch、InputNumber。
- 支持导出可直接交给 `@silver-formily/vue` 渲染的 JSON Schema。
- 支持从已有 JSON Schema 导入并还原设计树。

### 阶段二：组件库物料化

目标是让已有 UI 绑定包自然进入编辑器生态。

- 为 `@silver-formily/element-plus` 建立完整物料包。
- 为 `@silver-formily/vant` 建立移动端物料包。
- 抽象通用 setter，例如文本输入、布尔开关、枚举选择、表达式编辑、数据源编辑、校验规则编辑。
- 支持布局类组件，例如 Grid、FormLayout、ArrayItems、ArrayTable、FormStep、FormTab。

### 阶段三：Schema 转换与兼容

目标是降低从旧生态或第三方编辑器迁移的成本。

- 建立 Silver Formily Schema 与 Formily JSON Schema 的双向转换。
- 评估并实现 Designable schema 的导入转换。
- 为不可无损转换的字段提供 warning 和 fallback 策略。
- 建立 schema version，支持未来迁移脚本。

### 阶段四：跨框架外壳

目标是验证真正的跨框架能力。

- 保持 `designer-core`、`designer-schema`、物料元数据不依赖 Vue。
- 在需要 React 生态时新增 `designer-react`。
- React 版复用同一份物料元数据，只替换画布渲染、属性面板渲染和组件预览绑定。
- 确保 Vue / React 编辑器导出的 Schema 对运行时等价。

## 不建议的方向

### 不建议直接迁移完整 Designable

直接迁移可以较快得到成熟交互，但会把大量旧技术栈、React-first 假设、历史包结构一起带进来。后续如果要服务 Vue-first 和跨框架目标，改造成本可能会超过重建核心边界。

### 不建议选择只能输出私有 schema 的编辑器

如果一个编辑器只能输出它自己的 DSL，再通过运行时解释器渲染表单，会削弱 Silver Formily Schema 的中心地位，也会增加跨框架成本。

### 不建议第一版同时做 Vue 和 React

当前仓库重点在 Vue 3、Element Plus、Vant。第一版应优先跑通 Vue 生态，但核心接口要为 React 留出空间。

## 决策结论

Silver Formily 的可视化表单编辑器应采用“自有核心 + Vue 首发 + Schema 优先 + 兼容层可选”的路线。

短期目标不是复刻 Designable 的全部能力，而是先建立一个干净的编辑器内核和物料协议。Designable 的价值在于提供架构参考、交互参考和迁移兼容对象，而不是作为不可替换的运行依赖。

只要核心 Schema 稳定，后续无论是 Vue 编辑器、React 编辑器、AI 生成表单，还是第三方平台导入，都可以围绕同一份表单描述协作。
