# useFormEffects

## 描述

主要在自定义组件中往当前[Form](https://core.silver-formily.org/api/models/Form)实例注入副作用逻辑，用于实现一些较为复杂的场景化组件。组件卸载时副作用会自动清理，且 StrictMode / ConcurrentMode 下 effect 重放不会注册重复的副作用。

## 签名

```ts
interface useFormEffects {
  (effects?: (form: Form) => void): void
}
```

## 用例

:::demo
api/hooks/use-form-effects.tsx
:::
