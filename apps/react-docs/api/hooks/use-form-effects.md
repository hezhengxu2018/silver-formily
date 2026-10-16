# useFormEffects

## 描述

主要在自定义组件中往当前[Form](https://core.silver-formily.org/api/models/Form)实例注入副作用逻辑，用于实现一些较为复杂的场景化组件。组件卸载时副作用会自动清理，且 StrictMode / ConcurrentMode 下 effect 重放不会注册重复的副作用。

`FormProvider` 在一次挂载期间应持有同一个 form 实例。更换整个 form 时，应重新挂载 `FormProvider` 及其子树，例如使用 `<FormProvider key={form.id} form={form}>`。不要仅替换现有 Provider 的 `form` 属性并复用子树：`useFormEffects` 只在组件挂载时注册，不会随 form 属性变化重新绑定。旧子树卸载时清理订阅，新子树挂载时重新注册。

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
