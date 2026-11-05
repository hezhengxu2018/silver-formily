# @silver-formily/grid

[![npm version](https://img.shields.io/npm/v/@silver-formily/grid)](https://www.npmjs.com/package/@silver-formily/grid)
[![npm downloads](https://img.shields.io/npm/dm/@silver-formily/grid)](https://www.npmjs.com/package/@silver-formily/grid)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[简体中文](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/grid/README.md) | [English](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/grid/README.en.md)

`@silver-formily/grid` is the responsive grid-layout runtime of Silver Formily. It computes columns and layout output from container metrics, breakpoints, and child span metadata, and is intended as the runtime substrate for form layout systems rather than as a thin static CSS grid wrapper.

## Installation

```bash
pnpm add @silver-formily/grid @silver-formily/reactive
```

The command includes required peer dependencies. Existing projects can keep dependencies that satisfy the declared ranges.

## Features

- `createGrid`
- the `Grid` instance and layout state
- breakpoint, column, gap, span, and wrapping calculations

## Positioning

This package is typically consumed as a layout subsystem:

- it provides the grid computation model used by UI packages such as `@silver-formily/element-plus`
- it depends on `@silver-formily/reactive` for layout-state derivation
- it targets container-driven form layout rather than page-level responsive styling

## Use Cases

- responsive form layout
- automatic column distribution in schema-driven forms
- container-metric-driven field arrangement

## Documentation

- [Guide](https://grid.silver-formily.org/en/)
- [Project home](https://silver-formily.org/en/)
- [Source](https://github.com/hezhengxu2018/silver-formily/tree/main/packages/grid)
- [Issues](https://github.com/hezhengxu2018/silver-formily/issues)

## License

[MIT](https://opensource.org/licenses/MIT)
