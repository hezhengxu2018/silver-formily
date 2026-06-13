# Breaking Changes

## Dependency Changes

- Formily and Element Plus are both peer dependencies of this component library, so you should install the versions you need yourself. In most cases, compatibility handling is provided across different Element Plus versions, but if Element Plus introduces a major breaking change you may still see rendering issues, in which case you should downgrade.

- Starting from version 2.x, the Vue binding layer moved from `@formily/vue` to `@silver-formily/vue`. Pay attention when installing peer dependencies. During usage, components such as `Field` and `SchemaField` also need to be imported from `@silver-formily/vue`. See the [official documentation](https://vue.silver-formily.org/) for details.

- Starting from version 3.x, the grid wrapper moved from `@formily/grid` to `@silver-formily/grid`. For detailed usage, see the dedicated documentation, and use the built-in `createGrid` function when creating new Grid instances.

- Starting from version 5.x, every peer dependency used by `@silver-formily/element-plus` has moved to the independently maintained Silver Formily stack, so the required dependencies are now fully independent from Formily.

::: warning Note
The binding approach in `@silver-formily/vue` has also changed and no longer uses the `value` / `onChange` pattern. Be especially careful about this when using custom components.
:::

::: tip Tip
If you are not ready to migrate away from `@formily/vue` yet, you can continue using version 1.x of `@silver-formily/element-plus`.
:::

## Component Refactors

Because every component has been refactored, all of them have changed to some extent. They are not listed one by one here, so please refer to the component documentation. If you are migrating an existing project, manually verify the rendering of every form. In particular, the function arguments of FormDrawer and FormDialog have changed and can prevent forms from rendering if not updated.

## Packaging Changes

The `umd` and `cjs` build outputs have been removed, leaving only `esm` builds. As frontend tooling evolves, CJS builds should no longer be necessary, though a future UMD build is still possible. The SCSS inside dependencies is also compiled into CSS output so preprocessors are no longer required. The project build system has now fully migrated to Vite instead of the earlier TypeScript-only compilation flow.
