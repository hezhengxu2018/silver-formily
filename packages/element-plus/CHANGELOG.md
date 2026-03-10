# 更新日志

## 3.0.2

### Patch Changes

- 15e30dd: 修复聚焦取消按钮时回车键无法生效的问题
- 15e30dd: 使用新的@silver-formily/reactive-vue管理响应式,减少内存泄露.

## 3.0.1

### Patch Changes

- e062a07: 修复在grid-span值为-1时的布局异常
- 64e96c8: 增强form-dialog和form-drawer的类型推断
- Updated dependencies [e062a07]
  - @silver-formily/grid@1.0.1

## 3.0.0

### Major Changes

- 20efde6: 迁移代码至monorepo

### Patch Changes

- Updated dependencies [5f18335]
  - @silver-formily/grid@1.0.0

# [2.4.0](https://github.com/hezhengxu2018/silver-formily-element-plus/compare/v2.3.0...v2.4.0) (2026-02-25)

### Features

- **query-form-item:** 添加QueryFormItem组件 ([2f323ba](https://github.com/hezhengxu2018/silver-formily-element-plus/commit/2f323bac96f47b8785c07a22dbe9c5e5cb0f515e))
- **query-form:** 添加QueryForm组件及文档 ([b1b56ea](https://github.com/hezhengxu2018/silver-formily-element-plus/commit/b1b56ea2ed995a634cbbfd5e0798e9ea7ea9975e))

# [2.3.0](https://github.com/hezhengxu2018/silver-formily-element-plus/compare/v2.2.0...v2.3.0) (2026-02-16)

### Bug Fixes

- **utils:** 修复错误的hooks引入 ([a373369](https://github.com/hezhengxu2018/silver-formily-element-plus/commit/a3733692020f7d91ccc106c9ab6b70c200407054))

### Features

- **autocomplete:** 添加autocomplete组件 ([e982d9f](https://github.com/hezhengxu2018/silver-formily-element-plus/commit/e982d9f46ced0d5704c96b2b5f342120742aa519))
- **color-picker-panel:** 新增ColorPickerPanel组件封装 ([094b563](https://github.com/hezhengxu2018/silver-formily-element-plus/commit/094b563f42865afaa46287e48a4021a12a479aa5))
- **color-picker:** 新增color-picker组件的封装 ([b20f323](https://github.com/hezhengxu2018/silver-formily-element-plus/commit/b20f323afca7f3217549db8134155d5eb913fc68))
- **date-picker-pane:** 新增date-picker-pane组件 ([477e161](https://github.com/hezhengxu2018/silver-formily-element-plus/commit/477e1612738858411e302308a4e6045591ccd487))
- **form-dialog,form-drawer:** 添加对回车键提交弹出层表单的支持 ([46ed303](https://github.com/hezhengxu2018/silver-formily-element-plus/commit/46ed303069d793ddfd91b06fcd141fed8dd61b6e))
- **input-tag:** 新增InputTag组件 ([d5146f7](https://github.com/hezhengxu2018/silver-formily-element-plus/commit/d5146f74a45a56ebd4c5a62aa15553ebf921ea85))
- **mention:** 新增mention组件 ([b7772d0](https://github.com/hezhengxu2018/silver-formily-element-plus/commit/b7772d0f28890eada247d9e5b6c3a50aead4d143))
- **mention:** mention组件onSearch函数支持传入field ([c5cf7ea](https://github.com/hezhengxu2018/silver-formily-element-plus/commit/c5cf7ea644ebddd05a01cb67a6f2b9164db0dc98))

# [2.2.0](https://github.com/hezhengxu2018/silver-formily-element-plus/compare/v2.1.0...v2.2.0) (2026-02-07)

### Bug Fixes

- **form-item:** 修复类型声明错误 ([861cb2e](https://github.com/hezhengxu2018/silver-formily-element-plus/commit/861cb2ed6af706c95343d245700b15c25f5d8e2d))

### Features

- **rate:** 新增rate组件及相应的文档 ([e2b9490](https://github.com/hezhengxu2018/silver-formily-element-plus/commit/e2b9490d93575dcdc4764ea25e6fd415c9a8cac7))
- **segmented:** 添加分段选择器组件 ([a0ffc76](https://github.com/hezhengxu2018/silver-formily-element-plus/commit/a0ffc7641e6726547e2c11dd128b51ce2666aab9))
- **silder:** 添加Silder组件及文档 ([ee8b50d](https://github.com/hezhengxu2018/silver-formily-element-plus/commit/ee8b50d208751f5ffafefccc2e6352df14a5d608))

# [2.1.0](https://github.com/hezhengxu2018/silver-formily-element-plus/compare/v2.0.1...v2.1.0) (2026-02-04)

### Bug Fixes

- **array-items:** 修复drag后item无法删除的问题 ([0c7f58d](https://github.com/hezhengxu2018/silver-formily-element-plus/commit/0c7f58d3d4af06a206e82c4397c647b55e2a440e))
- **array-table:** 迁移array-table的响应式 ([0208598](https://github.com/hezhengxu2018/silver-formily-element-plus/commit/020859887f00dbc1f24aad6bd8ec221e7710b473))
- **form-button-group-sticky:** 使用更稳定的id生成方式，方便后期接入ssr ([266cdca](https://github.com/hezhengxu2018/silver-formily-element-plus/commit/266cdca6a7108983bbd86440acb8ba29bf41ce6d))
- **form-item:** 修复fullness/colon的继承与覆盖的问题 ([5de4ffa](https://github.com/hezhengxu2018/silver-formily-element-plus/commit/5de4ffa98cf611e21bfedd69585d3805fd641379))
- **form-item:** 更新 labelWrap 默认值，默认隐藏溢出的标签文案 ([09b5401](https://github.com/hezhengxu2018/silver-formily-element-plus/commit/09b540102e3947b2cf03a5f2d363a2e9050c1f3c))
- 更新FormDialog和FormDrawer接口以支持泛型类型 ([0ade383](https://github.com/hezhengxu2018/silver-formily-element-plus/commit/0ade383a1aeeb4766ff51d71f3f62ea720da028c))

### Features

- 升级vue响应式绑定库 ([8a26adc](https://github.com/hezhengxu2018/silver-formily-element-plus/commit/8a26adc54663bd2a163939685164fd6c71cbe8c2))

### BREAKING CHANGES

- 从@formily/reactive-vue升级为@silver-formily/reactive-vue

## [2.0.1](https://github.com/hezhengxu2018/silver-formily-element-plus/compare/v2.0.0...v2.0.1) (2026-01-24)

### Bug Fixes

- 添加类型参数以增强连接组件的类型安全 ([5da1bd0](https://github.com/hezhengxu2018/silver-formily-element-plus/commit/5da1bd02aacbdd8e79ac1b3085df87400792457d))
- 修复ssr环境下渲染报错的问题 ([a991f52](https://github.com/hezhengxu2018/silver-formily-element-plus/commit/a991f520787760310ddf3bb45bbeffcaeed89841))

# [2.0.0](https://github.com/hezhengxu2018/silver-formily-element-plus/compare/v1.0.1...v2.0.0) (2026-01-22)

### Features

- 从@formily/vue升级至@silver-formily/vue;完成属性与事件的相应改动 ([7562ff6](https://github.com/hezhengxu2018/silver-formily-element-plus/commit/7562ff6be49b3feccf9599f6e96e65327ee4cf92))

### BREAKING CHANGES

- 从@formily/vue升级至@silver-formily/vue

## [1.0.1](https://github.com/hezhengxu2018/silver-formily-element-plus/compare/v1.0.0...v1.0.1) (2026-01-07)

# [1.0.0](https://github.com/hezhengxu2018/silver-formily-element-plus/compare/v0.0.1-beta.0...v1.0.0) (2026-01-07)

## [0.0.1-beta.0](https://github.com/hezhengxu2018/silver-formily-element-plus/compare/v0.0.1-alpha.1...v0.0.1-beta.0) (2026-01-07)

### Bug Fixes

- **form-grid:** 添加曾经删除的createGrid方法，添加相应的说明 ([8937d8d](https://github.com/hezhengxu2018/silver-formily-element-plus/commit/8937d8d605c45956c3f6f02bd42e4349b75b15bc))
- **form-item:** 添加form-item对齐的默认值 ([46283aa](https://github.com/hezhengxu2018/silver-formily-element-plus/commit/46283aae3ecc81d1701d253fb4a015d62a8af17c))

### Features

- **docs:** 使用自定义的vitepress主题头部 ([53284a6](https://github.com/hezhengxu2018/silver-formily-element-plus/commit/53284a6bb63f4ccf83d7f9e9904384796bf9497b))
- **select-table:** select-table添加禁用勾选功能 ([8cfc9b6](https://github.com/hezhengxu2018/silver-formily-element-plus/commit/8cfc9b68eb666ac02115989754ac2eceed9908f3))

## 0.0.1-alpha.1 (2025-10-01)

### Bug Fixes

- **array-tabs:** 修复array-tabs报错统计异常 ([bd32258](https://github.com/hezhengxu2018/silver-formily-element-plus/commit/bd32258a56c11d834919e267695a57488c32b41f))
