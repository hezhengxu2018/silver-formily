# DesignerCore 状态管理说明

`@silver-formily/designer-core` 是可视化设计器的框架无关内核。它当前采用 class 组织状态，不依赖 Vue、Pinia、DOM 或拖拽库。Vue 侧组件应该把它当作一个领域模型实例来使用，而不是把核心状态拆散到应用 store 中。

## 核心定位

`DesignerCore` 本身是协调器，真正的状态被拆在几个子模型里：

| 模型                          | 职责                                                               |
| ----------------------------- | ------------------------------------------------------------------ |
| `DesignerTree`                | 维护设计树、节点索引、节点插入/移动/复制/删除/替换/更新。          |
| `DesignerSelection`           | 维护当前选中节点和 hover 节点。                                    |
| `DesignerMaterialRegistry`    | 注册物料，按物料生成默认节点 schema。                              |
| `DesignerHistory`             | 保存快照栈，支持 undo/redo。                                       |
| `DesignerCommands`            | 注册和执行命令，把外部命令统一转发回 `DesignerCore.runCommand()`。 |
| `Subscribable<DesignerEvent>` | 向外通知 tree、selection、materials、history、command 的变化。     |

这意味着 core 的状态不是“一个大 reactive object”，而是一组可测试的领域对象。UI 层通过 `subscribe()` 监听事件，再把事件转成框架自己的响应式状态。

## 状态来源

设计器当前有三类主要状态：

1. **结构状态**：`DesignerTree.root` 和节点间的 parent/container 关系。
2. **交互状态**：`DesignerSelection.selectedId`、`DesignerSelection.hoveredId`。
3. **编辑状态**：`DesignerHistory.past/future`、已注册物料、命令表。

对外最重要的读模型是 `DesignerSnapshot`：

```ts
interface DesignerSnapshot {
  schema: DesignerSchemaNode
  selectedId?: string
  hoveredId?: string
}
```

`DesignerCore.snapshot` 每次读取都会从 `tree.exportSchema()` 和 selection 当前值组装出一个新快照。它是历史记录、事件通知、导入导出和 UI 同步的共同边界。

## 更新入口

绝大多数会改变状态的方法都会经过 `withMutation()`：

```text
protected withMutation<T>(runner: () => T, options: DesignerOperationOptions = {}): T
```

`withMutation()` 的流程是：

1. 记录变更前 `snapshot`。
2. 执行实际变更，例如插入、移动、删除、更新节点。
3. 调用 `ensureSelectionIntegrity()` 清理失效选中/hover。
4. 记录变更后 `snapshot`。
5. 如果 schema 或 selection 有变化，则按需写入 history，并发出事件。

因此新增核心 mutation 时，默认应该通过 `withMutation()` 包裹。不要直接在外部操作 `tree`、`selection`、`history` 后自己拼事件，否则很容易漏掉历史记录或选择态校验。

## 事件模型

`DesignerCore.subscribe(listener)` 订阅 `DesignerEvent`，返回取消订阅函数。

当前事件包括：

| 事件                | 触发时机                                                    |
| ------------------- | ----------------------------------------------------------- |
| `tree:changed`      | schema 树发生变化，或 restore/import/undo/redo 后树被替换。 |
| `selection:changed` | selected/hover 变化。                                       |
| `materials:changed` | 物料注册表变化。                                            |
| `history:changed`   | undo/redo 可用性或历史栈数量变化。                          |
| `command:executed`  | 命令被执行后通知。                                          |

事件是通知机制，不是主状态源。消费者应该在收到事件后读取 `designer.snapshot`、`designer.history.state` 或具体模型，而不是长期缓存事件 payload 当作唯一状态。

## 历史记录

`DesignerHistory` 只保存 `DesignerSnapshot`，不保存操作命令。

变更发生时，`withMutation()` 会把“变更前快照”推入 `past`。执行 `undo(current)` 时：

1. 从 `past` 弹出一个快照。
2. 把当前快照推入 `future`。
3. 返回弹出的快照。

`DesignerCore.undo()` 拿到快照后调用 `restore(snapshot, { reason: 'undo' })`。`redo()` 同理，从 `future` 取快照并 restore。

这种实现简单、稳定，适合早期编辑器。代价是历史记录粒度是完整快照，不是 command patch。后续如果 schema 体积变大，再考虑增量 patch 或 command replay。

## 命令系统

`DesignerCommands` 是命令注册表。命令执行时不会自己修改状态，而是：

```ts
this.context().designer.runCommand(command, payload, options)
```

`DesignerCore.runCommand()` 决定命令是否走 mutation：

- `descriptor.mutate === false`：直接执行，不写 history。
- 其他命令：通过 `withMutation()` 执行，默认写 history。

内置命令包括 `select`、`hover`、`insertNode`、`removeNode`、`moveNode`、`duplicateNode`、`updateNode`、`insertMaterialNode` 等。

新增命令时需要明确两件事：

1. 它是否会改变 core 状态。
2. 它是否应该进入 undo/redo 历史。

只读命令和工具命令应设置 `mutate: false`。

## Selection 完整性

节点删除、导入 schema、restore、移动等操作都可能让当前选中 ID 或 hover ID 失效。

`ensureSelectionIntegrity()` 会在 mutation 后检查：

- 如果 `selectedId` 对应节点不存在，则清空选中。
- 如果 `hoveredId` 对应节点不存在，则清空 hover。

`removeNode()` 还有额外逻辑：如果删除了当前选中节点或其祖先，会把选中态移动到被删节点的 parent。

UI 层不应该自己维护另一套 selected node truth。正确做法是读取 `designer.selection.selectedId` 或 `designer.snapshot.selectedId`，再通过 `tree.getNode()` 找节点。

## Tree 与 Node

`DesignerTree` 负责保持两个结构同步：

1. `root` 开始的节点树。
2. `nodeMap` 节点索引。

插入节点时会把新节点及其子树加入索引。删除节点时会从索引移除整棵子树。导入 schema 时会重建整棵树和索引。

`DesignerNode` 保存节点运行所需信息：

- `id`
- `componentName`
- `title`
- `props`
- `metadata`
- `children`
- `slots`
- `parent`
- `container`

容器能力由 `metadata.designer` 决定，包括 `container`、`defaultContainer`、`containers`、`accepts`、`maxItems`。拖拽和插入逻辑应该优先使用 `node.canAcceptChild()`，避免 UI 层重复实现容器规则。

## Material Registry

`DesignerMaterialRegistry` 保存 `DesignerMaterialDefinition`，并通过 `createNode(name, overrides)` 生成节点 schema。

生成节点时会合并：

1. 物料自身 metadata。
2. `defaultNode.metadata`。
3. overrides metadata。
4. 物料 `designer` 配置。

因此物料协议是“如何编辑组件”的来源，而不是 UI 面板里的静态列表。物料生成节点后，节点进入 tree，后续状态由 tree/history/selection 管理。

## 与 Vue / Pinia / 事件总线的关系

`designer-core` 不应该直接依赖 Pinia 或 mitt。推荐分层是：

| 层                        | 状态管理方式                                                           |
| ------------------------- | ---------------------------------------------------------------------- |
| `designer-core`           | class 领域模型 + snapshot + typed events。                             |
| `element-plus-designable` | 当前承载编辑器 UI 实验；后续围绕新的 designable core 重新组织 Vue 层。 |
| `element-plus-designable` | Pinia 可用于应用级 UI 状态，例如面板尺寸、保存状态、当前文档信息。     |
| 瞬时通知                  | 必要时可用 typed event bus，例如 toast、scroll-to-node、focus-field。  |

不要用 Pinia 替代 `DesignerCore` 的 tree/history/commands，也不要用 mitt 承载 schema 主状态。

## 开发约定

- 新增会改变 core 状态的方法时，优先走 `withMutation()`。
- 新增只读命令时，必须显式设置 `mutate: false`。
- UI 层不直接改 `tree.root.children`、`selection.selectedId` 等内部字段。
- 任何可撤销操作都应该产生 history，除非显式传入 `recordHistory: false`。
- 导入、restore、undo、redo 后必须保证 selection 不指向不存在的节点。
- 对外传递 schema、material、event payload 时保持 clone，避免外部引用反向污染 core。

## 当前实现的边界

当前历史记录是完整快照栈，命令系统还没有强类型命令映射，事件也只是同步通知。这个实现适合最小可用设计器阶段：简单、可测试、框架无关。

后续如果编辑器能力复杂起来，可以再演进：

- typed command map，减少 payload `any`。
- patch-based history，降低大 schema 的内存成本。
- plugin lifecycle，把 command/material/event 注册整理成插件协议。
- 更细粒度的 tree diff 事件，减少 UI 层重算。
