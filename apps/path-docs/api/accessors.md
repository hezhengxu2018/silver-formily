# 访问器

访问器 API 的目标很明确：在不手写层层判空的前提下，安全地访问深层结构。

## 交互示例

下面这个 playground 可以直接修改 JSON、pattern 和写入值，观察 `getIn`、`existIn`、`setIn`、`deleteIn`、`ensureIn` 的结果：

::: demo
api/accessors/playground
:::

## getIn

```ts
const values = {
  user: {
    profile: {
      nickname: 'silver',
    },
  },
}

Path.getIn(values, 'user.profile.nickname')
// 'silver'

Path.getIn(values, 'user.profile.missing')
// undefined
```

如果你已经持有 `Path` 实例，也可以直接走实例方法：

```ts
const profileName = Path.parse('user.profile.nickname')

profileName.getIn(values)
// 'silver'
```

## setIn

`setIn` 会按需补出中间层级：

```ts
const values = {}

Path.setIn(values, 'user.profile.nickname', 'silver')

// {
//   user: {
//     profile: {
//       nickname: 'silver'
//     }
//   }
// }
```

如果下一个 segment 是数字，会自动补数组：

```ts
const values = {}

Path.setIn(values, 'users.0.name', 'silver')

// { users: [{ name: 'silver' }] }
```

实例写法同样支持：

```ts
const profileName = Path.parse('user.profile.nickname')
const values = {}

profileName.setIn(values, 'silver')

profileName.getIn(values)
// 'silver'
```

## existIn

`existIn` 检查的是“这个 key 是否真的存在”，而不是值是否 truthy：

```ts
Path.existIn({ a: { b: { c: 0 } } }, 'a.b.c')
// true

Path.existIn({ a: { b: {} } }, 'a.b.c')
// false
```

它还支持传入起始偏移，适合已经持有 base path 的场景：

```ts
Path.existIn({ a: [{}] }, 'b.a.0', Path.parse('b'))
// true
```

如果场景里已经缓存过路径对象，实例形式会更直接：

```ts
Path.parse('a.b.c').existIn({ a: { b: { c: 0 } } })
// true

Path.parse('a.b.c').existIn({})
// false
```

## deleteIn

```ts
const values = { user: { profile: { nickname: 'silver', city: 'Shanghai' } } }

Path.deleteIn(values, 'user.profile.city')

// { user: { profile: { nickname: 'silver' } } }
```

实例方法会在原对象上删除，并返回原对象引用：

```ts
const path = Path.parse('user.profile.city')
const values = { user: { profile: { city: 'Shanghai' } } }

path.deleteIn(values)

path.getIn(values)
// undefined
```

## ensureIn

`ensureIn` 是“没有就写入默认值，有就原样返回”：

```ts
const values = {}

Path.ensureIn(values, 'user.profile.nickname', 'guest')
// 'guest'

Path.ensureIn(values, 'user.profile.nickname', 'other')
// 'guest'
```

实例方法适合和复用的 `Path` 对象配合：

```ts
const path = Path.parse('user.profile.nickname')
const values = {}

path.ensureIn(values, 'guest')
// 'guest'

path.ensureIn(values, 'other')
// 'guest'
```

## group / destructor 例子

这是 path 相对常见对象访问库更强的一部分。你可以一次读取或写入一组 key：

```ts
Path.setIn({}, 'a.b.c.{aaa,bbb}', { aaa: 123, bbb: 321 })
// { a: { b: { c: { aaa: 123, bbb: 321 } } } }

Path.getIn(
  { a: { b: { c: { aaa: 123, bbb: 321 } } } },
  'a.b.c.{aaa,bbb}',
)
// { aaa: 123, bbb: 321 }
```

数组形式也可以：

```ts
Path.setIn({}, 'a.b.c.[aaa,bbb]', [123, 321])
// { a: { b: { c: { aaa: 123, bbb: 321 } } } }
```

除了数组解构，对象解构和嵌套路径投影也能参与访问：

```ts
const values = {}

Path.setIn(values, 'user.address.{city,zip}', {
  city: 'Shanghai',
  zip: '200000',
})

Path.getIn(values, 'user.address.{city,zip}')
// { city: 'Shanghai', zip: '200000' }
```

这类语法特别适合 schema、字段映射、批量重命名和结构投影。
