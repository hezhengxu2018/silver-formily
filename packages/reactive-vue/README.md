# @silver-formily/reactive-vue

[![npm version](https://img.shields.io/npm/v/@silver-formily/reactive-vue)](https://www.npmjs.com/package/@silver-formily/reactive-vue)
[![npm downloads](https://img.shields.io/npm/dm/@silver-formily/reactive-vue)](https://www.npmjs.com/package/@silver-formily/reactive-vue)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[简体中文](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/reactive-vue/README.md) | [English](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/reactive-vue/README.en.md)

`@silver-formily/reactive-vue` 实现 Silver Formily 响应式引擎与 Vue 3 生命周期之间的桥接层。它将 observer、依赖追踪与 reaction 语义绑定到组件渲染与 effect scope 中。

## 安装

```bash
pnpm add @silver-formily/reactive-vue @silver-formily/reactive 'vue@^3.3.0'
```

安装命令包含必需的 peer 依赖；已有项目请保留满足版本范围的现有依赖。

## 功能

- `observer`
- `useObserver`
- `reactiveComputed`
- `formilyComputed`（已废弃，请使用 `reactiveComputed`）
- `autorunEffect`
- `reactionWatch`

## 定位

该包位于响应式引擎与 Vue 渲染层之间：

- 以下层 `@silver-formily/reactive` 为状态和依赖模型
- 以上层 `@silver-formily/vue` 为典型消费方
- 也可直接服务于自定义 Vue 组件或 renderer

## 适用场景

- 在 Vue 3 中消费 Silver Formily observable 状态
- 将 reaction 生命周期绑定到组件作用域
- 为自定义 renderer 提供细粒度订阅能力

## 文档

- [使用指南](https://reactive-vue.silver-formily.org/)
- [项目首页](https://silver-formily.org/)
- [源码](https://github.com/hezhengxu2018/silver-formily/tree/main/packages/reactive-vue)
- [问题反馈](https://github.com/hezhengxu2018/silver-formily/issues)

## 许可证

[MIT](https://opensource.org/licenses/MIT)
