# @silver-formily/json-schema

## 1.2.0

### Minor Changes

- 05fe93d: 新增 `mountedReactions` 与 `x-mounted-reactions`，支持在表单首批同步字段全部挂载后启动响应式联动。表单挂载后新增的动态字段会在自身挂载时启动，字段卸载时自动停止、重新挂载时恢复。

### Patch Changes

- Updated dependencies [05fe93d]
  - @silver-formily/core@1.2.0

## 1.1.0

### Minor Changes

- 37ef944: 为字段新增 `decoratorContent` 状态和 `setDecoratorContent` API，并在 JSON Schema 中支持 `x-decorator-content`。Vue 渲染层现在统一从字段状态读取装饰器内容，使 `setFieldState`、reactions 和运行时 setter 能够更新装饰器插槽内容。

### Patch Changes

- Updated dependencies [37ef944]
- Updated dependencies [c06804b]
- Updated dependencies [5f2120f]
- Updated dependencies [ea1518a]
- Updated dependencies [12fca1a]
- Updated dependencies [751231e]
- Updated dependencies [0ceea40]
- Updated dependencies [0d9bcd8]
  - @silver-formily/core@1.1.0
  - @silver-formily/reactive@1.0.1

## 1.0.1

### Patch Changes

- @silver-formily/core@1.0.1

## 1.0.0

### Major Changes

- eba5161: 底层依赖完全迁移至silver-formily

### Patch Changes

- Updated dependencies [eba5161]
  - @silver-formily/core@1.0.0
  - @silver-formily/path@1.0.0
  - @silver-formily/reactive@1.0.0
  - @silver-formily/shared@1.0.0

## 0.0.0

- Initial migration from `@formily/json-schema`.
- Fix inherited upstream issues in `additionalProperties` `$ref` resolution, v1 `x-props` polyfill cleanup, and polyfill re-registration.
- Add Vitest regression coverage migrated from the upstream json-schema package.
