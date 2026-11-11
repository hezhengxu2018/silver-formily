# 来源与示例适配

本次文档按官方章节重建：介绍文字、章节顺序和示例主体来自 Alibaba Formily 的中文文档；API 表按本仓库当前 TypeScript 接口和运行时代码整理。

## 官方来源

- 仓库：[alibaba/formily](https://github.com/alibaba/formily)
- 文档目录：[packages/antd/docs/components](https://github.com/alibaba/formily/tree/d9a46442a575aa5f0fc1bd945e34d9a85d191d0e/packages/antd/docs/components)
- 源码与文档基线：`@formily/antd@2.3.7`，提交 `d9a46442a575aa5f0fc1bd945e34d9a85d191d0e`。
- 许可：[Alibaba MIT License](/licenses/formily-MIT.txt)，保留原作者版权声明。

| 章节            | 官方示例数量 |
| --------------- | ------------ |
| Form            | 1            |
| FormItem        | 7            |
| FormLayout      | 3            |
| FormGrid        | 4            |
| FormButtonGroup | 3            |
| Input           | 3            |
| Select          | 7            |
| NumberPicker    | 3            |
| PreviewText     | 2            |
| Submit          | 2            |
| Reset           | 4            |
| 合计            | 39           |

每个组件页末尾都链接到对应官方原文。原文 API 未直接复制，以避免将尚未迁移的组件或 Ant Design 4 配置描述为当前能力。

## 示例适配规则

1. 把 `@formily/*` 导入替换为对应 `@silver-formily/*`，补齐 type-only import 与字段类型标注。
2. 从官方 TSX 代码块提取独立 demo，由 VitePress 主题在 React demo 渲染外层统一包裹 `DemoConfig`，同步主题和中文 locale，示例源码只保留业务代码。保留官方 Markup Schema、JSON Schema、纯 JSX 及联动写法；官方 Dumi Alert 转为 VitePress 提示容器，保留原文。
3. Form 原例使用本包 FormGrid 排版；FormItem 的尺寸示例已恢复日期、树选择、级联、Switch 控件。
4. FormItem 尺寸切换使用 Radio.Group，保留尺寸联动逻辑。
5. PreviewText 原例已恢复日期、树选择、级联分支；日期初始值改为 Dayjs。
6. Select 异步搜索原例依赖淘宝 JSONP / mfetch，改为本地候选服务，保留防抖、搜索触发、loading 和数据源更新。联动原例仍保留官方的模拟延迟。
7. Sticky 原例使用 FormLayout 作为默认边界，并增加最小高度便于观察吸底；本项目另有通过 Form 根节点上下文绑定边界的补充例子。
8. 提交结果仍按官方写法输出到控制台；为普通提交与重置校验示例补上预期失败的接收回调，页面通过字段反馈展示校验信息。
9. FormGrid 封装参考本仓库 Element Plus 实现，四个示例沿用官方章节；查询表单已恢复 DatePicker 与 RangePicker，保留跨列及折叠逻辑。

## 特别说明的含义

::: warning 行为兼容边界
组件页顶部的“特别说明：与官方实现的差异”列出当前实现的行为变化、未迁移能力和已知限制。示例旁的“示例适配说明”仅解释示例代码相对原例的改动，不代表增加了组件能力。

当前基于 Ant Design 6 和 React 18/19，不能将此站视为上游 Ant Design 4 封装的完全兼容文档。嵌套布局继承、原生静态成员转发等已知限制也直接写在对应章节中。
:::

已移除 FormItem 的 inset 配置，原文内嵌模式示例不再收录。

原 FormItem 无边框案例替换为四种原生 variant 外观对比，此对比为本项目补充示例，不计入上表官方原例数量。

FormItem 反馈案例改用 `hasFeedback` 展示 Ant Design 6 原生状态图标，并补充自定义图标及显式关闭的对比；布局仍沿用本包 FormItem。

## Ant Design 6 基础控件补充

新增 Password、Checkbox、Radio、Switch、Cascader、TreeSelect、Transfer、DatePicker、TimePicker、Upload、Slider、Rate 的 12 个基础示例。新增示例按当前原生 API 编写，不计入上表 39 个官方原例；Slider、Rate 是本项目扩展。日期不保留旧字符串协议，Password 不迁移 checkStrength，Upload 不迁移业务响应推断及旧内容属性。每页链接对应官方来源和原生 API。
