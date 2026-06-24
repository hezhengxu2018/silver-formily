# @silver-formily/designer-core

[中文 README](./README.md)

## Overview

`@silver-formily/designer-core` is the framework-agnostic designer engine for Silver Formily. It owns the designer tree, workspaces, viewports, selection, hover state, drag semantics, history, shortcuts, and component behavior registry.

The package still uses `@silver-formily/reactive` for core state. Vue or React bindings should own rendering, lifecycle integration, and concrete drag or hotkey library adapters.

## Runtime Positioning

Think of the designer runtime as three layers:

- `@silver-formily/designer-core`: framework-agnostic models, events, and operations
- Vue/React binding: context, composables/hooks, component tree rendering, and lifecycle wiring
- driver / adapter: converts DOM, Pointer Events, or third-party drag library events into core events

The core package keeps default browser drivers for legacy DOM-driven usage. Modern Vue bindings can disable them and call `engine.drag` from their own adapters.

## Public Surface

- `createDesigner`: creates an engine with default browser drivers, effects, and shortcuts
- `Engine`: main designer entry with `workbench`, `screen`, `cursor`, `keyboard`, and `drag`
- `TreeNode`: designer node model for mutation, cloning, serialization, and behavior lookup
- `Workbench` / `Workspace`: multi-workspace and canvas context models
- `Viewport`: viewport state, DOM lookup, coordinate conversion, and node rect measurement
- `Operation` / `Dragon`: selection, drag calculation, drop position, and node mutation semantics
- `GlobalRegistry`: registers designer behaviors, icons, language, and locale packages
- `createBehavior` / `createResource` / `createLocales`: helpers for materials and locale data
- `DragStartEvent` / `DragMoveEvent` / `DragStopEvent`: internal semantic drag events

## Default Browser Usage

The minimal setup loads the default drivers, effects, and shortcuts:

```ts
import { createDesigner } from '@silver-formily/designer-core'

const engine = createDesigner()

engine.mount()
```

This mode uses the built-in DOM event drivers for mouse movement, clicks, drag and drop, viewport scroll/resize, and keyboard shortcuts.

After the viewport element is mounted, pass it to a workspace:

```ts
const workspace = engine.workbench.ensureWorkspace({
  viewportElement,
  contentWindow: window,
})

workspace.viewport.onMount(viewportElement, window)
```

## Modern Driver Usage

When a Vue binding wants to use its own drag or hotkey library, disable the default browser drivers and automatic DOM attachment:

```ts
import { createDesigner } from '@silver-formily/designer-core'

const engine = createDesigner({
  useDefaultDrivers: false,
  mountTarget: false,
  autoAttachEvents: false,
  drivers: [],
})
```

The core will not automatically listen to `window`, viewport DOM, or legacy mouse drag events. A Vue adapter can listen to its library events and call `engine.drag`:

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

`engine.drag` dispatches `DragStartEvent`, `DragMoveEvent`, and `DragStopEvent` internally, so existing `useDragDropEffect`, `Operation.dragWith`, and `Dragon` drop calculations are still reused.

## Drag Input Contract

Modern adapters should prefer explicit designer fields instead of emulating DOM `target.closest(...)`:

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

Field meanings:

- `nodeId`: canvas node being dragged
- `sourceId`: resource node dragged from a palette
- `outlineId`: node dragged from an outline tree
- `handlerId`: node dragged from a selection helper handle
- `touchNodeId`: target node hit during drag move
- `target` / `view`: optional DOM fallback; explicit id fields are preferred

`useDragDropEffect` reads explicit fields first and falls back to DOM attribute lookup only when they are absent.

## Preset Options

`createDesigner` supports these integration switches:

- `useDefaultDrivers?: boolean`: append default browser drivers, default `true`
- `useDefaultEffects?: boolean`: append default effects, default `true`
- `useDefaultShortcuts?: boolean`: append default shortcuts, default `true`
- `mountTarget?: EventContainer | false`: event target for `engine.mount()`, default `window`; `false` disables automatic mount
- `autoAttachEvents?: boolean`: whether `Viewport` attaches events in constructor and `onMount()`, default `true`

## Vue Binding Guidance

A Vue binding typically owns:

- creating and providing/injecting `Engine`
- creating or switching `Workspace` during component lifecycle
- rendering `TreeNode` as Vue component trees
- converting third-party drag, Pointer Events, and hotkey events into `engine.drag` or `engine.dispatch`
- using `@silver-formily/reactive-vue` to bind core state to Vue rendering

The Vue binding should not reimplement `Operation`, `Dragon`, node insertion, or history logic. Those belong to the core semantic layer.

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
