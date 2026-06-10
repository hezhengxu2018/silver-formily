# @silver-formily/grid

[English README](./README.en.md)

`@silver-formily/grid` 是 Silver Formily 的响应式网格布局运行时。它不是一个纯 CSS 栅格组件集合，而是一套会根据容器尺寸、断点和子项占位情况动态计算列数与布局结果的运行时能力，特别适合表单布局。

## 这个包解决什么问题

在复杂表单里，布局往往不是固定的。字段数量、字段跨度、容器宽度和断点切换都会影响最终排布。这个包提供了：

- 自动计算列数与断点
- 基于容器宽度动态适配布局
- 管理子项跨度、换行和间距
- 为表单布局组件提供稳定的运行时网格模型

## 典型场景

- 响应式表单布局
- schema 驱动表单的自动分栏
- 需要根据容器尺寸动态调整字段排列的场景
- 为 `@silver-formily/element-plus` 等 UI 层提供底层网格能力

## 安装

```bash
pnpm add @silver-formily/grid @silver-formily/reactive
```

## 快速理解

你可以通过 `createGrid` 创建一个网格实例，然后把它连接到容器元素。实例会持续感知尺寸和子节点变化，并计算出当前列数、间距、断点等布局状态，供上层表单组件消费。

## 文档

- 文档站点：<https://grid.silver-formily.org>
- 仓库主页：<https://github.com/hezhengxu2018/silver-formily>

## License

MIT
