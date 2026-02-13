# Silver Formily Vue

[文档网站](https://vue.silver-formily.org/) · [本地文档首页](../../apps/vue-docs/index.md) · [English README](./README.en.md)

@silver-formily/vue 是一个专注于 Vue 3 生态的 [Formily](https://formilyjs.org/) 运行时封装。它保留了 `@formily/vue` 的编排能力，同时去除了 Vue 2 兼容层、冗余 DOM 包裹以及不一致的事件契约。源码位于 `src/`，文档位于 `docs/`，构建产物存放在 `esm/`。

## ✨ 特性

- **纯粹的 Vue 3 代码路径**：完全抛弃 `vue-demi`、`vue-frag` 等兼容依赖，渲染树贴近原生组件库。
- **原生 DOM 与事件语义**：统一使用 `modelValue` / `onUpdate:modelValue`，Element Plus 等组件可直接对接。
- **完善的 TypeScript 类型**：在运行时附近维护显式泛型与公共接口，确保生成的 `.d.ts` 与实现同步。
- **Formily 生态对齐**：与 `@formily/core`、`@formily/json-schema` 等官方包保持兼容，迁移成本低。
- **Decorator 插槽支持**：通过 `:decorator-content` 与 `x-decorator-content` 将 `FormItem` 等装饰器的 `default`、`label`、`extra` 插槽与 schema 数据解耦，详见[常见问题](../../apps/vue-docs/questions/index.md#如何向装饰器传递插槽)。
- **配套文档与示例**：内置 VitePress 文档，包含 API、迁移提示以及 Element Plus 示例，执行 `pnpm docs:dev` 即可查看。

## 🔄 与 `@formily/vue` 的差异

| 项目        | `@silver-formily/vue` 2.x                                   | 官方 `@formily/vue`              |
| ----------- | ----------------------------------------------------------- | -------------------------------- |
| 事件契约    | `modelValue` / `onUpdate:modelValue`                        | `value` / `onChange`             |
| DOM 结构    | 无额外 `template` / `display: contents` 包裹                | 含 Vue 2 兼容容器                |
| 依赖        | 仅依赖 Vue 3 生态                                           | 借助 `vue-demi` 同时支持 Vue 2/3 |
| Schema 导出 | 不再 re-export `Schema`（请从 `@formily/json-schema` 引入） | 仍导出                           |
| 兼容策略    | 需要与官方保持完全一致时可使用 `@silver-formily/vue@1.x`    | 官方包                           |

## 📦 Peer Dependencies

在宿主应用中需要同时安装：

```
@formily/core ^2
@formily/json-schema ^2
@formily/reactive ^2
@silver-formily/reactive-vue ^1
@formily/shared ^2
vue ^3.3.0+
```

## 🚀 安装

推荐使用 pnpm：

```bash
pnpm add @silver-formily/vue @formily/core @formily/json-schema @formily/reactive @silver-formily/reactive-vue @formily/shared
```

## ⚡️ 快速开始

以下示例演示如何结合 Element Plus 构建最小表单：

```vue
<script setup lang="ts">
import { createForm } from "@formily/core";
import { connect, Field, FormProvider, mapProps } from "@silver-formily/vue";
import { ElFormItem, ElInput } from "element-plus";

const form = createForm({ validateFirst: true });

const FormItem = connect(
  ElFormItem,
  mapProps({ title: "label", required: true }, (_, field) => ({
    error: field.selfErrors[0] || undefined,
  })),
);
</script>

<template>
  <FormProvider :form="form">
    <Field
      name="email"
      title="Email"
      required
      :decorator="[FormItem]"
      :component="[ElInput, { placeholder: 'hello@formily.dev' }]"
    />
  </FormProvider>
</template>
```

更多组件（`SchemaField`、`RecursionField`、`ArrayField` 等）与组合式 API 请参阅 [`docs/api`](../../apps/vue-docs/api)。

## 🧱 API 速览

- **组件**：`FormProvider`、`FormConsumer`、`Field`、`ArrayField`、`ObjectField`、`VoidField`、`SchemaField`、`RecursionField`、`ReactiveField`、`ExpressionScope`。
- **组合式函数**：`useForm`、`useField`、`useFieldSchema`、`useFormEffects`、`useParentForm`、`useAttach`、`useInjectionCleaner`。
- **共享工具**：`connect`、`mapProps` 以及位于 `src/shared`、`src/utils` 的渲染辅助。

所有公共符号均通过 `src/index.ts` 输出，构建后的 JS 与 `.d.ts` 保存在 `esm/`。

## 🛠️ 本地开发

```bash
pnpm install       # 安装依赖
pnpm lint          # 运行 Antfu ESLint 规则
pnpm build         # 基于 Vite 生成库与类型
pnpm docs:dev      # 启动 VitePress 文档站点
pnpm docs:build    # 生成静态文档 (docs/.vitepress/dist)
pnpm commit        # 使用 czg 编写 Conventional Commit
pnpm release       # release-it 发布，需要干净工作区
```

- 构建输出位于 `esm/`，请勿手动修改。
- 目前没有自动化测试，请在 PR 中记录手动验证（Vue/Formily 版本、使用的 schema、浏览器等）。
- 代码风格遵循 `@antfu/eslint-config`：2 空格、单引号、允许尾随逗号、无分号。

## 📚 文档与示例

- 在线站点：<https://vue.silver-formily.org/>
- `docs/demos` 提供 Element Plus 示例，可作为封装自定义组件的起点。

## 📄 License

MIT © hezhengxu
