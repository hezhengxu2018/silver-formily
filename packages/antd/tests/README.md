# Antd 验证记录

本轮基础控件迁移基于 Ant Design 6.6.5，验证日期：2026-11-06。

## 自动化

- `pnpm --filter @silver-formily/antd test:browser`：字段绑定、原生事件、阅读态、数据源、ref、禁用及主题继承。
- `pnpm --filter @silver-formily/antd check-types`：原生泛型、日期值、上传响应及静态成员类型。
- `pnpm --filter @silver-formily/antd test:ssr`：在无 DOM 的 Node 环境构建并渲染全部 12 类新增控件的编辑态和阅读态。
- `pnpm --filter @silver-formily/shared test`：Dayjs 深浅克隆与已有工具回归。
- React 18.3.1 使用临时安装目录和 Vitest resolve.alias 运行 `basic-controls.test.tsx`；仓库默认 React 19 环境运行全套测试。

## 页面检查

构建并预览 antd-docs，逐个访问 Password、Checkbox、Radio、Switch、Cascader、TreeSelect、Transfer、DatePicker、TimePicker、Upload、Slider、Rate 页面：

1. 示例成功挂载，编辑态与阅读态可往返切换，无页面 JavaScript 异常。
2. 检查浅色日期弹层、深色树选择弹层和原生尺寸/variant 继承。
3. 上传示例使用本地模拟请求，文件完成后可进入阅读态展示；不调用外部上传服务。
4. 浏览器测试另外覆盖 Dragger、LIST_IGNORE、上传失败与删除，日期范围/多选及原生清空事件。

阅读态不提供原生输入控件的 ref；切换回编辑态后重新绑定原生实例。SSR 检查使用 Vite 构建，将 antd、@ant-design/_、@rc-component/_ 纳入依赖转换。
