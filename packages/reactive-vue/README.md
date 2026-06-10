# @silver-formily/reactive-vue

[English README](./README.en.md)

`@silver-formily/reactive-vue` 是 Silver Formily 响应式系统与 Vue 3 之间的桥接层。它让 `@silver-formily/reactive` 的依赖追踪、副作用和派生计算可以自然地运行在 Vue 组件与 effect scope 生命周期里。

## 这个包有什么用

如果你已经在使用 `@silver-formily/reactive`，但希望把它无缝接进 Vue 3 的组件系统，那么这个包提供了最核心的一层胶水代码。它适合：

- 在 Vue 组件中消费 Silver Formily 响应式状态
- 用 Vue 生命周期托管 `autorun` / `reaction`
- 为表单渲染层或业务组件提供更细粒度更新

## 主要能力

- `observer`：让组件按依赖收集结果精准更新
- `useObserver`：在 `setup` 中显式启用观察渲染
- `formilyComputed`：把 Formily 响应式表达式包装成 Vue `computed`
- `autorunEffect`：在 Vue 生命周期中托管 `autorun`
- `reactionWatch`：在 Vue 生命周期中托管 `reaction`

## 典型使用方式

- 配合 `@silver-formily/vue`：作为 Vue 表单渲染层的底座依赖
- 配合业务组件：在组件里直接读取 observable 状态并自动刷新
- 配合自定义 renderer：实现更细粒度的响应式订阅控制

## 安装

```bash
pnpm add @silver-formily/reactive-vue @silver-formily/reactive vue
```

## 文档

- 文档站点：<https://reactive-vue.silver-formily.org>
- 仓库主页：<https://github.com/hezhengxu2018/silver-formily>

## License

MIT
