# @silver-formily/path

[English README](./README.en.md)

`@silver-formily/path` 提供 Silver Formily 内部统一使用的路径系统。它用于字段路径解析、深层对象访问、路径匹配以及通配查询，是表单字段树和 schema 寻址能力的重要基础。

## 这个包解决什么问题

在表单系统里，字段经常需要通过诸如 `user.addresses.0.city` 这样的路径被创建、读取、写入和匹配。这个包把这些能力统一成一套稳定 API，用于：

- 深层对象的 `get` / `set` / `delete`
- 字段路径字符串的解析与缓存
- 通配、匹配、相对路径等路径表达式能力
- 表单字段树、schema 树、联动规则中的寻址逻辑

## 主要能力

- `Path`：路径对象与解析入口
- 路径模式匹配与相对路径解析
- 深层访问工具：读取、写入、删除、存在性判断
- 支持数组索引、复杂片段和匹配表达式

## 适合谁使用

- 需要在业务或框架层稳定处理嵌套路径
- 正在扩展 Silver Formily 的字段树或 schema 系统
- 需要从 `@formily/path` 迁移到 `@silver-formily/path`

## 安装

```bash
pnpm add @silver-formily/path
```

## 文档

- 文档站点：<https://path.silver-formily.org>
- 仓库主页：<https://github.com/hezhengxu2018/silver-formily>

## License

MIT
