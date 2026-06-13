# Background

This project is a non-strict fork of Formily. The reason for the fork is simple: the design is excellent, but the official project seems to have stopped active maintenance. That is why Silver Formily exists as an independently maintained continuation. Forms have always been one of the hardest parts of back-office application development, and every frontend team eventually invents its own style. Without a unified framework to manage them, maintainability drops quickly.

Some people may ask: now that we are in the AI era, why do we still need to write forms ourselves? Why do we still need a framework like this? Why not just let AI generate everything? If you are fully willing to give up long-term ownership and rely on vibe coding from start to finish, that may be acceptable. But if you still care about maintainability, especially about keeping a consistent mental model for form development across an entire project, then Formily still has real value. In fact, it may be even more suitable in the AI era, because the biggest issue with Formily has always been its steep learning curve, and AI can flatten a good part of that cost.

## Introduction

In simple terms, Silver Formily is a cross-frontend-framework form framework. Its ecosystem is fairly complex, and each module has a distinct responsibility. If you do not understand what each module is for, it is hard to know where to start learning.

A good way to build the overall mental model is to look at the module layering first:

### Foundation Modules

These modules are not the core of Formily itself, but they are the foundation that makes it run.

| Module                                                                | Responsibility                                                                                                                            |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `@silver-formily/shared`                                              | Provides low-level shared utilities and type helpers for multiple runtime packages. There is currently no dedicated documentation for it. |
| [`@silver-formily/reactive`](https://reactive.silver-formily.org/en/) | Provides reactive state capabilities and serves as the foundation for observables, reactions, and dependency tracking.                    |

:::tip Tip
You do not need to study the foundation modules immediately, but you do need to understand that Formily uses a standalone reactive system that is independent of any frontend framework. If that point is unclear, you will run into many issues during actual usage.
:::

### Core Modules

These modules are responsible for Formily's runtime model, schema semantics, and form capability orchestration.

| Module                                                                      | Responsibility                                                                                                  |
| --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| [`@silver-formily/core`](https://core.silver-formily.org/en/)               | The core form runtime. It handles form state, field lifecycle, effect orchestration, and validation scheduling. |
| [`@silver-formily/json-schema`](https://json-schema.silver-formily.org/en/) | Provides the schema description layer and maps JSON Schema style structures into Formily runtime semantics.     |
| [`@silver-formily/validator`](https://validator.silver-formily.org/en/)     | Provides declarative validation, including rules, formats, localization, and async validation.                  |
| [`@silver-formily/path`](https://path.silver-formily.org/en/)               | Provides path parsing, pattern matching, and deep access utilities reused by runtime modules.                   |

Formily authoring styles can roughly be divided into two large categories: Template/JSX/TSX based authoring and Schema based authoring. Schema based authoring can be further divided into Markup Schema and JSON Schema. For beginners, starting with Schema authoring right away can make the learning curve unnecessarily steep. My personal suggestion is to avoid Schema authoring at the very beginning. The benefit is that you can skip one document set at first and lower the initial learning cost.

`@silver-formily/validator` and `@silver-formily/path` are also effectively supporting pieces around `@silver-formily/core`. They are split out mainly for better package organization, so you can look up their documentation only when you actually run into them.

:::tip Tip
The most important package to learn well is `@silver-formily/core`.
:::

### Frontend Framework Bindings

| Module                                                                        | Responsibility                                                                                                |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| [`@silver-formily/vue`](https://vue.silver-formily.org/en/)                   | The Vue 3 rendering layer. It is responsible for field components, schema rendering, and Vue-side adaptation. |
| [`@silver-formily/reactive-vue`](https://reactive-vue.silver-formily.org/en/) | Connects the reactive core to Vue 3 and handles `observer`, lifecycle coordination, and side-effect binding.  |

- `@silver-formily/vue` provides the Vue-side wrapping for the domain model exposed by `@silver-formily/core`.
- `@silver-formily/reactive-vue` provides the binding layer between `@silver-formily/reactive` and Vue.

These two packages are essentially glue layers. In day-to-day development they tend to feel more visible, because people rarely use `@silver-formily/core` or `@silver-formily/reactive` directly. In most cases, you use their capabilities through the framework binding packages instead.

### UI Bindings

These modules connect the core capabilities to specific frontend frameworks and component libraries so they become directly usable form UIs.

| Module                                                                        | Responsibility                                                                                                               |
| ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| [`@silver-formily/element-plus`](https://element-plus.silver-formily.org/en/) | Provides desktop form component bindings and scenario-focused wrappers based on Element Plus.                                |
| [`@silver-formily/vant`](https://vant.silver-formily.org/en/)                 | Provides mobile form component bindings and scenario-focused wrappers based on Vant.                                         |
| [`@silver-formily/grid`](https://grid.silver-formily.org/en/)                 | Provides responsive grid layout capabilities to organize form layouts based on container size, breakpoints, and field spans. |

In practice, these are the modules people use most often, with `@silver-formily/grid` being the exception because it is a shared grid layout abstraction used across different frontend component library bindings. You can choose the UI binding that fits your needs, although right now there may not be that many choices.
