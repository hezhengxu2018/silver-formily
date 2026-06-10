# useFormEffects

## 描述

主要在自定义组件中往当前[Form](https://core.silver-formily.org/api/models/Form)实例注入副作用逻辑，用于实现一些较为复杂的场景化组件

## 签名

```ts
interface useFormEffects {
  (form: Form): void
}
```

## 用例

::: demo
api/hooks/use-form-effects
:::
