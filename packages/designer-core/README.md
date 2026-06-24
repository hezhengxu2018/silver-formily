# @silver-formily/designer-core

[English README](./README.en.md)

## Overview

`@silver-formily/designer-core` 是 Silver Formily 的设计器核心引擎。它负责维护设计器节点树、工作区、视口、选择、悬停、拖拽语义、历史记录、快捷键和组件行为注册，不直接绑定 Vue 或 React 渲染树。

该包仍然使用 `@silver-formily/reactive` 管理核心状态。上层 Vue/React 绑定层应负责组件渲染、生命周期接入和具体拖拽/快捷键库适配。

## Runtime Positioning

推荐把设计器拆成三层理解：

- `@silver-formily/designer-core`：框架无关的设计器模型、事件和操作语义
- Vue/React binding：提供上下文、组合式 API、组件树渲染和生命周期管理
- driver / adapter：把 DOM、Pointer Events 或第三方拖拽库事件转换成 core 事件

core 保留默认浏览器驱动，方便旧式 DOM 事件接入；现代 Vue 绑定可以关闭这些默认驱动，改用自己的 adapter 调用 `engine.drag`。

## Public Surface

- `createDesigner`：创建设计器引擎，默认加载 legacy browser drivers、effects 和 shortcuts
- `Engine`：设计器总入口，包含 `workbench`、`screen`、`cursor`、`keyboard`、`drag`
- `TreeNode`：设计器节点模型，支持插入、删除、克隆、序列化和行为解析
- `Workbench` / `Workspace`：多工作区和当前画布上下文
- `Viewport`：画布视口、节点 DOM 查询、坐标和矩形测量
- `Operation` / `Dragon`：选择、拖拽计算、投放位置和节点变更语义
- `GlobalRegistry`：注册设计器行为、图标、语言包和 locale
- `createBehavior` / `createResource` / `createLocales`：构建设计器物料和本地化数据
- `DragStartEvent` / `DragMoveEvent` / `DragStopEvent`：core 内部拖拽语义事件

## Default Browser Usage

最小用法会加载默认 drivers、effects 和 shortcuts：

```ts
import { createDesigner } from '@silver-formily/designer-core'

const engine = createDesigner()

engine.mount()
```

默认行为适合直接使用 core 内置的 DOM 事件驱动，包括鼠标移动、点击、拖拽、视口滚动、视口尺寸变化和键盘快捷键。

当工作区视口挂载到 DOM 后，将元素交给 workspace：

```ts
const workspace = engine.workbench.ensureWorkspace({
  viewportElement,
  contentWindow: window,
})

workspace.viewport.onMount(viewportElement, window)
```

## Modern Driver Usage

如果 Vue 绑定层要接入自己的拖拽库或快捷键库，推荐关闭默认 browser drivers，并关闭自动 DOM 事件绑定：

```ts
import { createDesigner } from '@silver-formily/designer-core'

const engine = createDesigner({
  useDefaultDrivers: false,
  mountTarget: false,
  autoAttachEvents: false,
  drivers: [],
})
```

这时 core 不会自动监听 `window`、viewport DOM 或旧式鼠标拖拽事件。Vue adapter 可以在自己的生命周期内监听外部库事件，然后调用 `engine.drag`：

```ts
engine.drag.start({
  clientX,
  clientY,
  nodeId,
})

engine.drag.move({
  clientX,
  clientY,
  touchNodeId,
})

engine.drag.stop({
  clientX,
  clientY,
})
```

`engine.drag` 会在内部派发 `DragStartEvent`、`DragMoveEvent` 和 `DragStopEvent`，因此现有 `useDragDropEffect`、`Operation.dragWith`、`Dragon` 投放计算仍然可以复用。

## Drag Input Contract

现代 adapter 推荐优先传设计器语义字段，而不是伪造 DOM `target.closest(...)`：

```ts
type DesignerDragInput = {
  clientX?: number
  clientY?: number
  pageX?: number
  pageY?: number
  target?: EventTarget | null
  view?: Window
  nodeId?: string
  sourceId?: string
  outlineId?: string
  handlerId?: string
  touchNodeId?: string
}
```

字段含义：

- `nodeId`：当前拖拽的画布节点
- `sourceId`：从物料面板拖入的新资源节点
- `outlineId`：从大纲树拖拽的节点
- `handlerId`：从节点辅助工具条拖拽时对应的节点
- `touchNodeId`：拖拽移动时命中的目标节点
- `target` / `view`：可选 DOM fallback；未提供时 core 使用显式 id 字段

`useDragDropEffect` 会优先读取这些显式字段，只有缺失时才回退到 DOM attribute 查询。这样 Vue 绑定层可以直接把第三方拖拽库的命中结果传给 core。

## Preset Options

`createDesigner` 支持以下接入开关：

- `useDefaultDrivers?: boolean`：是否追加默认 browser drivers，默认 `true`
- `useDefaultEffects?: boolean`：是否追加默认 effects，默认 `true`
- `useDefaultShortcuts?: boolean`：是否追加默认 shortcuts，默认 `true`
- `mountTarget?: EventContainer | false`：`engine.mount()` 的事件挂载目标，默认 `window`，传 `false` 表示不自动挂载
- `autoAttachEvents?: boolean`：`Viewport` 构造和 `onMount()` 时是否自动绑定事件，默认 `true`

## Vue Binding Guidance

Vue 绑定层通常只需要做这些事：

- 创建并 provide/inject `Engine`
- 在组件生命周期中创建或切换 `Workspace`
- 用 Vue renderer 把 `TreeNode` 渲染成组件树
- 把第三方拖拽库、Pointer Events、快捷键库转换成 `engine.drag` 或 `engine.dispatch`
- 使用 `@silver-formily/reactive-vue` 让 Vue 组件响应 core 状态

不建议 Vue 绑定层重写 `Operation`、`Dragon`、节点插入或历史记录逻辑。它们属于 core 的稳定语义层。

## Installation

```bash
pnpm add @silver-formily/designer-core @silver-formily/reactive @silver-formily/designer-shared
```

## Related Packages

- `@silver-formily/reactive`
- `@silver-formily/reactive-vue`
- `@silver-formily/vue`
- `@silver-formily/element-plus`

## License

MIT
