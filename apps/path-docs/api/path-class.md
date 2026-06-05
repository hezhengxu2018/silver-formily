---
outline: [2, 3]
---

# Path API

`Path.parse(...)` 返回的是一个真正的 `Path` 实例，而不是简单的 segments 数组。本页只保留 `Path` 类型本身的属性和方法，语法与访问器使用方式请看指南章节。

## Attributes

除了 `toString()`、`toArr()` 这类方法，`Path` 本身还带着一组可以直接读取的属性：

| 属性                  | 说明                                 |
| --------------------- | ------------------------------------ |
| `length`              | 路径片段数量，仅对非匹配型路径有意义 |
| `entire`              | 完整路径字符串或正则                 |
| `segments`            | 路径片段数组                         |
| `isMatchPattern`      | 是否为匹配路径                       |
| `isWildMatchPattern`  | 是否带通配匹配语义                   |
| `haveRelativePattern` | 是否包含相对路径语法                 |
| `haveExcludePattern`  | 是否带排除模式                       |
| `isRegExp`            | 是否由正则构造                       |
| `tree`                | 解析后的 AST                         |
| `matchScore`          | 最近一次 `match` 的得分              |

例如：

```ts
const pattern = Path.parse('*(!basic.name,versionTag)')

pattern.isMatchPattern
// true

pattern.haveExcludePattern
// true
```

## 实例方法

### toString

#### 签名

```ts
interface toString {
  (): string
}
```

用例见[快速开始 / 路径实例操作 / 转回字符串或数组](/guide/quick-start#转回字符串或数组)。

### toArr

#### 签名

```ts
interface toArr {
  (): Array<string | number>
}
```

用例见[快速开始 / 路径实例操作 / 转回字符串或数组](/guide/quick-start#转回字符串或数组)。

### concat

#### 签名

```ts
interface concat {
  (...args: Pattern[]): Path
}
```

用例见[快速开始 / 路径实例操作 / 拼接和裁剪](/guide/quick-start#拼接和裁剪)。

### slice

#### 签名

```ts
interface slice {
  (start?: number, end?: number): Path
}
```

用例见[快速开始 / 路径实例操作 / 拼接和裁剪](/guide/quick-start#拼接和裁剪)。

### parent

#### 签名

```ts
interface parent {
  (): Path
}
```

用例见[快速开始 / 路径实例操作 / 拼接和裁剪](/guide/quick-start#拼接和裁剪)。

### push

#### 签名

```ts
interface push {
  (...items: Pattern[]): Path
}
```

这些方法虽然名字看起来像数组原型，但都返回新的 `Path`。

用例见[快速开始 / 路径实例操作 / 类数组操作](/guide/quick-start#类数组操作)。

### pop

#### 签名

```ts
interface pop {
  (): Path
}
```

用例见[快速开始 / 路径实例操作 / 类数组操作](/guide/quick-start#类数组操作)。

### splice

#### 签名

```ts
interface splice {
  (
    start: number,
    deleteCount?: number,
    ...items: Array<string | number>
  ): Path
}
```

用例见[快速开始 / 路径实例操作 / 类数组操作](/guide/quick-start#类数组操作)。

### forEach

#### 签名

```ts
interface forEach {
  (callback: (key: string | number) => any): void
}
```

用例见[快速开始 / 路径实例操作 / 遍历 segments](/guide/quick-start#遍历-segments)。

### map

#### 签名

```ts
interface map {
  (callback: (key: string | number) => any): any[]
}
```

用例见[快速开始 / 路径实例操作 / 遍历 segments](/guide/quick-start#遍历-segments)。

### reduce

#### 签名

```ts
interface reduce {
  <T>(
    callback: (buffer: T, item: string | number, index: number) => T,
    initial: T
  ): T
}
```

用例见[快速开始 / 路径实例操作 / 遍历 segments](/guide/quick-start#遍历-segments)。

### transform

#### 签名

```ts
interface transform {
  <T>(regexp: string | RegExp, callback: (...args: string[]) => T): T
}
```

`transform` 会从 segments 中挑出符合正则的部分，再交给回调。

用例见[匹配能力 / transform](/guide/matching#transform)。

### includes

#### 签名

```ts
interface includes {
  (pattern: Pattern): boolean
}
```

`includes` 用于判断另一个普通路径是否是当前路径的前缀子路径。

用例见[匹配能力 / includes](/guide/matching#includes)。

### matchAliasGroup

#### 签名

```ts
interface matchAliasGroup {
  (name: Pattern, alias: Pattern): boolean
}
```

这是 `core` 里大量依赖的方法，用同一个 pattern 同时比较 name 和 alias。

用例见[匹配能力 / matchAliasGroup](/guide/matching#matchaliasgroup)。

## 静态方法

### match

#### 签名

```ts
interface match {
  (pattern: Pattern): (target: Pattern) => boolean
}
```

用例见[匹配能力 / Path.match](/guide/matching#path-match)。

### transform

#### 签名

```ts
interface transform {
  <T>(
    pattern: Pattern,
    regexp: string | RegExp,
    callback: (...args: string[]) => T
  ): T
}
```

静态版本同样存在。

用例见[匹配能力 / transform](/guide/matching#transform)。

### getIn

#### 签名

```ts
interface getIn {
  (source: any, pattern: Pattern): any
}
```

用例见[访问器 / getIn](/guide/accessors#getin)。

### setIn

#### 签名

```ts
interface setIn {
  (source: any, pattern: Pattern, value: any): any
}
```

用例见[访问器 / setIn](/guide/accessors#setin)。

### deleteIn

#### 签名

```ts
interface deleteIn {
  (source: any, pattern: Pattern): any
}
```

用例见[访问器 / deleteIn](/guide/accessors#deletein)。

### existIn

#### 签名

```ts
interface existIn {
  (source: any, pattern: Pattern, start?: number | Path): boolean
}
```

用例见[访问器 / existIn](/guide/accessors#existin)。

### ensureIn

#### 签名

```ts
interface ensureIn {
  (source: any, pattern: Pattern, defaultValue?: any): any
}
```

用例见[访问器 / ensureIn](/guide/accessors#ensurein)。

## 注意事项

如果当前实例本身是 match pattern 或正则路径，那么很多“数组式操作”都不再有确定语义，因此会抛错：

- `concat`
- `slice`
- `pop`
- `splice`
- `forEach`
- `map`
- `reduce`
- `transform`

典型例子：

```ts
const wildcard = Path.parse('*')

wildcard.concat('a')
// throw Error
```

这是一个值得在业务侧保留的心智模型：普通路径可以当作结构化对象操作，match pattern 则更像“编译后的规则”。
