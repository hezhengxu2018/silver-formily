# @silver-formily/grid

[简体中文](./README.md)

## Overview

`@silver-formily/grid` is the responsive grid-layout runtime of Silver Formily. It computes columns and layout output from container metrics, breakpoints, and child span metadata, and is intended as the runtime substrate for form layout systems rather than as a thin static CSS grid wrapper.

## Runtime Positioning

This package is typically consumed as a layout subsystem:

- it provides the grid computation model used by UI packages such as `@silver-formily/element-plus`
- it depends on `@silver-formily/reactive` for layout-state derivation
- it targets container-driven form layout rather than page-level responsive styling

## Public Surface

- `createGrid`
- the `Grid` instance and layout state
- breakpoint, column, gap, span, and wrapping calculations

## Use Cases

- responsive form layout
- automatic column distribution in schema-driven forms
- container-metric-driven field arrangement

## Installation

```bash
pnpm add @silver-formily/grid @silver-formily/reactive
```

## Documentation

- Docs: <https://grid.silver-formily.org>
- Repository: <https://github.com/hezhengxu2018/silver-formily>

## License

MIT
