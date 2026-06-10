# @silver-formily/reactive

[English README](./README.en.md)

`@silver-formily/reactive` 是 Silver Formily 的响应式核心。它提供一套类似 MobX 的响应式模型，用来驱动表单状态、字段联动、派生计算和副作用追踪，也是 `@silver-formily/core` 与其它上层包的重要基础。

## 这个包的作用

如果你需要的是“可以独立使用的响应式引擎”，而不是某个特定框架里的状态库，这个包就是 Silver Formily 的底层答案。它适合：

- 表单运行时状态管理
- 联动规则和表达式求值
- 复杂对象树的可观察更新
- 独立于 Vue/React 的响应式编排

## 主要能力

- `observable`：把对象、数组等数据结构转换为可观察状态
- `action`：批量提交状态修改
- `autorun` / `reaction`：追踪依赖并在变化时执行副作用
- `batch`：控制更新批次
- `markRaw` / `raw` / `toJS`：处理原始对象、导出纯数据
- `contains` / `hasCollected`：辅助依赖分析与对象关系判断

## 适用场景

- 为自定义表单框架或 DSL 提供响应式底座
- 在不引入 Vue 响应式系统的前提下管理运行时状态
- 从 `@formily/reactive` 迁移到 `@silver-formily/reactive`

## 安装

```bash
pnpm add @silver-formily/reactive
```

## 文档

- 文档站点：<https://reactive.silver-formily.org>
- 仓库主页：<https://github.com/hezhengxu2018/silver-formily>

## License

MIT
