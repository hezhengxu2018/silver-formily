# 介绍与迁移范围

`@silver-formily/antd` 是基于 Ant Design 6 的 React 表单组件包，迁移自 Alibaba Formily 的 `packages/antd`，并使用本仓库的 `@silver-formily/*` 运行时。

## 本次迁移范围

本阶段提供 **Form、FormItem、FormLayout、FormGrid、FormButtonGroup、Input、Select、InputNumber、PreviewText、Submit、Reset**。

新增 Password、Checkbox、Radio、Switch、Cascader、TreeSelect、Transfer、DatePicker、TimePicker、Upload、Slider、Rate，包含 Group、RangePicker 和 Upload.Dragger。

包含 `Input.TextArea`、`FormItem.BaseItem`、响应式布局及 `FormButtonGroup.FormItem/Sticky`。FormGrid 参考 Element Plus 的封装，复用 `@silver-formily/grid`，支持容器断点、字段跨列与折叠查询表单。阅读态覆盖已迁移控件及共享占位配置。

数组、Editable、SelectTable、弹窗表单、步骤表单等尚未迁移。不要将上游完整组件清单视为当前包的导出清单。

## 与上游的区别

- 依赖改为 `@silver-formily/*`，不能与上游 `@formily/*` 状态实例混用。
- 面向 Ant Design 6 和 React 18/19，不支持 Ant Design 4/5。
- 移除旧 Less 主题依赖，使用 Ant Design 主题 token 和局部 CSS；导入组件时自动加载样式。
- 所选组件保留主要 Formily API，但不提供 Ant Design 4 的兼容层；控件参数以 Ant Design 6 为准。
- FormLayout / FormItem 的 `size="default"` 与 `"middle"` 会转换为 `"medium"`。
- Sticky 通过测量进行固定定位，默认绑定所属 Form 的根节点并保留占位；支持 `position="top"` 和 `bottom={false}` 吸顶，显式 `container` 可覆盖表单边界。
- Schema 相关类型应从 `@silver-formily/json-schema` 导入。

源码基线：Alibaba Formily `@formily/antd@2.3.7`，提交 `d9a46442a575aa5f0fc1bd945e34d9a85d191d0e`。

介绍和 39 个原例的来源、许可与适配规则见 [来源与示例适配](/guide/sources)。每个组件页顶部单独标出与官方实现的行为差异及已知限制。

日期接口直接使用 antd 6 的 Dayjs 值。Upload 保留原生事件，字段仅保存 fileList；Password 不提供旧版强度检查。Slider、Rate 为本项目扩展。
