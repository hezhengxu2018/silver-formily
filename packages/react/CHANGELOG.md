# Changelog

## Unreleased

- Audit both documentation languages against the public entry and implementation, correcting signatures, prop precedence, visibility, recursion, and subscription semantics.

- Consolidate schema field wrappers and align their generic parameter order with `ISchemaMarkupFieldProps` (`Decorator`, then `Component`).
- Share component resolution and field event binding without changing reactive render boundaries.

- Align `Field` with the other fields through `useAttach`: retain mount state during synchronous StrictMode effect replay and clean up real unmounts in a microtask.

- Clarify that Schema APIs must be imported from `@silver-formily/json-schema` directly.
- Validate field component and decorator props while allowing partial props supplied by the form model.
- Preserve connected component ref types and custom statics.
- Accept all React nodes from `FormConsumer` render props.
- Preserve zero-valued content and render array/portal decorator content.
- Document that replacing the form requires remounting `FormProvider` and its subtree; `useFormEffects` keeps mount/unmount subscription semantics.
