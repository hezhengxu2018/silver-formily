# @silver-formily/shared

[English README](./README.en.md)

`@silver-formily/shared` 是 Silver Formily 各个运行时包共享的一组基础工具与类型辅助。它包含数组、字符串、对象合并、订阅器、中间件、唯一 ID、判空、类型判断等低层能力，主要用于减少跨包重复实现。

## 这个包适合谁

这个包更偏底层，通常适合以下场景：

- 正在开发 Silver Formily 的配套包
- 需要复用与核心包一致的工具函数和数据处理行为
- 正在把旧的 `@formily/shared` 迁移到 `@silver-formily/shared`

如果你只是业务侧普通表单使用者，通常不会单独直接安装它，而是由 `@silver-formily/core`、`@silver-formily/reactive` 等包间接依赖。

## 包含的能力方向

- 数组与对象处理
- 默认值与深合并
- 订阅器与中间件工具
- 字符串、命名转换与判空工具
- 类型检查与运行时辅助
- `uid` 等通用基础能力

## 安装

```bash
pnpm add @silver-formily/shared
```

## 仓库

- 仓库主页：<https://github.com/hezhengxu2018/silver-formily>

## License

MIT
