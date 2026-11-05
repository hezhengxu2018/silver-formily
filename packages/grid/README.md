# @silver-formily/grid

[![npm version](https://img.shields.io/npm/v/@silver-formily/grid)](https://www.npmjs.com/package/@silver-formily/grid)
[![npm downloads](https://img.shields.io/npm/dm/@silver-formily/grid)](https://www.npmjs.com/package/@silver-formily/grid)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[简体中文](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/grid/README.md) | [English](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/grid/README.en.md)

`@silver-formily/grid` 是 Silver Formily 的响应式网格布局运行时。它基于容器尺寸、断点与子项占位信息计算列数与排布结果，适合作为表单布局系统的运行时支撑，而不是单纯的静态 CSS grid 包装。

## 安装

```bash
pnpm add @silver-formily/grid @silver-formily/reactive
```

安装命令包含必需的 peer 依赖；已有项目请保留满足版本范围的现有依赖。

## 功能

- `createGrid`
- `Grid` 实例与布局状态
- 断点、列数、间距、跨度与换行计算能力

## 定位

该包通常作为布局子系统被上层消费：

- 为 `@silver-formily/element-plus` 等 UI 包提供网格计算模型
- 依赖 `@silver-formily/reactive` 维护布局状态与派生结果
- 面向容器驱动的表单布局而非页面级响应式样式

## 适用场景

- 响应式表单布局
- schema-driven forms 的自动分栏
- 容器尺寸驱动的字段排布

## 文档

- [使用指南](https://grid.silver-formily.org/)
- [项目首页](https://silver-formily.org/)
- [源码](https://github.com/hezhengxu2018/silver-formily/tree/main/packages/grid)
- [问题反馈](https://github.com/hezhengxu2018/silver-formily/issues)

## 许可证

[MIT](https://opensource.org/licenses/MIT)
