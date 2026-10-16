# mapProps

## 描述

将[Field](https://core.silver-formily.org/api/models/Field)属性与组件属性映射的适配器函数，主要与 connect 函数搭配使用

## 签名

```ts
import type { IStateMapper, JSXComponent } from '@silver-formily/react'
import type React from 'react'

declare function mapProps<T extends JSXComponent>(
  ...mappers: IStateMapper<React.ComponentProps<T>>[]
): (target: T) => React.ComponentType<any>
```

- 参数可以传对象(key 是 field 的属性，value 是组件的属性，如果 value 为 true，代表映射的属性名相同)
- 参数可以传函数，函数可以直接对属性做更复杂的映射

## 用例

:::demo
api/shared/map-props.tsx
:::

映射器从左到右处理传入 props 的浅拷贝，函数返回的属性合并到该拷贝中。对象映射使用字段值覆盖目标属性；字段值为空而目标已有非空值时保留原值。布尔值均使用源属性名，`false` **不表示关闭映射**。将 `value` 映射到其他名称时会删除原 `value` 属性。该适配器应在字段上下文中使用。
