# 更新日志

## 2.0.0

### Major Changes

- 4d71af4: 统一 Vue 组件的公开 Props 类型声明，并通过 `connect` 保留上游组件的 Props 类型。
  Element Plus 和 Vant 封装组件现在导出真实的 `FooProps` 类型，不再将组件构造类型
  错误地作为 Props 类型使用；如需组件构造类型，请使用对应的 `FooComponent`。

### Patch Changes

- Updated dependencies [4d71af4]
- Updated dependencies [05fe93d]
  - @silver-formily/vue@4.0.0

## 1.0.2

### Patch Changes

- c8a1cf0: 迁移formilyComputed相关接口

## 1.0.1

### Patch Changes

- Updated dependencies [67a6be2]
  - @silver-formily/vue@3.0.1
  - @silver-formily/core@1.0.1
  - @silver-formily/json-schema@1.0.1

## 1.0.0

### Major Changes

- eba5161: 底层依赖完全迁移至silver-formily

### Patch Changes

- Updated dependencies [eba5161]
  - @silver-formily/core@1.0.0
  - @silver-formily/json-schema@1.0.0
  - @silver-formily/path@1.0.0
  - @silver-formily/reactive@1.0.0
  - @silver-formily/reactive-vue@2.0.0
  - @silver-formily/shared@1.0.0
  - @silver-formily/vue@3.0.0

## 0.0.1

### Patch Changes

- 00e5df7: 升级Vite版本至8.x
- 1df0665: 更新TS版本至6.x

## 0.0.0

### Initial Changes

- 初始化 `@silver-formily/vant` 包结构、基础组件骨架与文档接入。
