# @silver-formily/core

## 1.1.0

### Minor Changes

- 37ef944: 为字段新增 `decoratorContent` 状态和 `setDecoratorContent` API，并在 JSON Schema 中支持 `x-decorator-content`。Vue 渲染层现在统一从字段状态读取装饰器内容，使 `setFieldState`、reactions 和运行时 setter 能够更新装饰器插槽内容。
- 0ceea40: 新增字段 `validated` 状态，并让普通规则校验通过后的 `validateStatus` 返回 `success`，以便组件库统一展示校验成功状态。

### Patch Changes

- c06804b: 修复 ArrayField 状态转置非预期的情况
- 5f2120f: 修复当form上有initialValues时使用添加数组会复用initialValues
- 12fca1a: 修复嵌套数组默认值残留的问题
- 751231e: 修复遗漏的 spliceArrayState
- 0d9bcd8: 修复 reset Field 时会丢失初始值的问题
- Updated dependencies [ea1518a]
- Updated dependencies [3e4e5ed]
  - @silver-formily/reactive@1.0.1
  - @silver-formily/validator@1.0.2

## 1.0.1

### Patch Changes

- Updated dependencies [67a6be2]
  - @silver-formily/validator@1.0.1

## 1.0.0

### Major Changes

- eba5161: 底层依赖完全迁移至silver-formily

### Patch Changes

- Updated dependencies [eba5161]
  - @silver-formily/path@1.0.0
  - @silver-formily/reactive@1.0.0
  - @silver-formily/shared@1.0.0
  - @silver-formily/validator@1.0.0

## 0.0.0

- 初始化迁移自 `@formily/core@2.3.7`
