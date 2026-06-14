# Quick Start

## Introduction

`@silver-formily/element-plus` is a reworked component library built on top of `@formily/element-plus`, providing an out-of-the-box form solution. On top of the original foundation, it includes a large number of refactors and optimizations that make the components easier to use and more flexible.

::: warning Note
Starting from version 2.x, the Vue binding layer moved from `@formily/vue` to `@silver-formily/vue`. In addition to importing components such as `Field` and `SchemaField` from `@silver-formily/vue`, you also need to pay attention when building custom wrapped components: the default binding behavior has changed, so you should no longer bind custom components with the `value` / `onChange` pattern. See the [official documentation](https://vue.silver-formily.org/).
:::

::: warning Note
Starting from version 5.x, every peer dependency used by `@silver-formily/element-plus` has moved to the independently maintained Silver Formily stack, so the required dependencies are now fully independent from Formily.
:::

## Installation

For flexibility in dependency composition, every dependency of `@silver-formily/element-plus` is declared as a peer dependency. This avoids inconsistent rendering caused by version mismatches between the `element-plus` used in your project and the one used by `@formily/element-plus`.

`element-plus` currently requires version `>= 2.11.0`. This is because the root entry of the component library re-exports every component, and some wrapped components rely on newer Element Plus capabilities. If the host project installs an older `element-plus`, importing the root entry may fail immediately.

Since npm 7, peer dependencies are installed automatically by default, so no manual installation is needed. If you use pnpm, you may need to enable automatic peer dependency installation in configuration, otherwise you may run into errors.

::: code-group

```shell [pnpm]
pnpm config set auto-install-peers true
pnpm install @silver-formily/element-plus
```

```shell [npm]
npm install --save @silver-formily/element-plus
```

:::

::: warning Note

`@silver-formily/element-plus` currently only ships ESM exports and does not provide CJS or UMD builds.

:::

## Reactive Data Example

:::demo

../../en/demos/overview/index

:::
