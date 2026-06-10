# @silver-formily/grid

[English README](./README.en.md)

## Overview

`@silver-formily/grid` 是 Silver Formily 的响应式网格布局运行时。它基于容器尺寸、断点与子项占位信息计算列数与排布结果，适合作为表单布局系统的运行时支撑，而不是单纯的静态 CSS grid 包装。

## Runtime Positioning

该包通常作为布局子系统被上层消费：

- 为 `@silver-formily/element-plus` 等 UI 包提供网格计算模型
- 依赖 `@silver-formily/reactive` 维护布局状态与派生结果
- 面向容器驱动的表单布局而非页面级响应式样式

## Public Surface

- `createGrid`
- `Grid` 实例与布局状态
- 断点、列数、间距、跨度与换行计算能力

## Use Cases

- 响应式表单布局
- schema-driven forms 的自动分栏
- 容器尺寸驱动的字段排布

## Installation

```bash
pnpm add @silver-formily/grid @silver-formily/reactive
```

## Documentation

- Docs: <https://grid.silver-formily.org>
- Repository: <https://github.com/hezhengxu2018/silver-formily>

## License

MIT
