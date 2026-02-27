# 重大改动

## 依赖改动

- formily与element-plus都是作为该组件库的对等依赖，请自行选择所需的版本进行安装。大部分情况下对不同版本的element-plus做了兼容性处理，如果element-plus有了新的重大改动可能会出现渲染问题，请降级使用。

- 从 2.x 版本起，组件库的vue绑定库从 `@formily/vue` 迁移至 `@silver-formily/vue`。安装 `peerDependencies` 时请注意。使用时 Field、SchemaField等组件也需要从 `@silver-formily/vue` 中引入。具体的使用方式请参考[官方文档](https://vue.silver-formily.org/)

::: warning 注意
`@silver-formily/vue` 对的绑定方式也做了修改，不再是`value` / `onChange`的方式。使用自定义组件时请务必注意。
:::

::: tip 提示
如果你还没有做好迁移`@formily/vue`的准备，可以继续使用 `@silver-formily/element-plus` 的 1.x 版本。
:::

## 组件重构

由于所有组件都进行了重构，所有组件都有或多或少的改动，这里不一一列举，请参考组件文档，如果是项目迁移建议人工对所有表单的渲染进行确认。特别是FormDrawer与FromDialog的函数入参有变化，会导致表单无法渲染。

## 打包方式重构

移除 `umd` 格式与 `cjs` 的打包打包产物，只保留 `esm` 格式的打包，随着前端技术的发展应该不再需要`cjs`的打包产物了，不排除之后会添加umd格式的打包产物。同时对依赖内scss进行编译，产物为css格式，不再依赖预处理器。目前项目的构建方式已完全迁移至`vite`，不再是之前简单的通过typescript编译的产物。
