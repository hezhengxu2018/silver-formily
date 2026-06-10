# @silver-formily/json-schema

[English README](./README.en.md)

`@silver-formily/json-schema` 提供 Silver Formily 的 Schema 描述层。它把 JSON Schema 风格的数据结构与表单组件、装饰器、联动规则、展示状态等运行时能力连接起来，是构建 schema 驱动表单的关键包。

## 这个包的作用

如果你的表单不是手写每一个字段，而是由一份 schema 结构描述生成，那么这个包就是中间层。它负责：

- 定义 `Schema` 类和对应类型
- 描述字段组件、装饰器和组件属性
- 挂载 `x-component`、`x-decorator`、`x-reactions` 等扩展能力
- 支持 schema 编译、patch、polyfill 和类型默认映射

## 典型场景

- 根据 JSON / DSL 动态生成表单
- 在低代码或配置驱动系统中保存表单结构
- 为 `@silver-formily/vue` 或 UI 适配包提供 schema 输入
- 从 `@formily/json-schema` 迁移到 `@silver-formily/json-schema`

## 与其它包的关系

- 配合 `@silver-formily/core`：schema 最终描述的是字段与表单运行时
- 配合 `@silver-formily/vue`：schema 可直接映射到 Vue 渲染层
- 配合 `@silver-formily/element-plus` / `@silver-formily/vant`：schema 中声明 UI 组件与装饰器

## 安装

```bash
pnpm add @silver-formily/json-schema @silver-formily/core @silver-formily/path @silver-formily/reactive @silver-formily/shared
```

## 文档

- 文档站点：<https://json-schema.silver-formily.org>
- 仓库主页：<https://github.com/hezhengxu2018/silver-formily>

## License

MIT
