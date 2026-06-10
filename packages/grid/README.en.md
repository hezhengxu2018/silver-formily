# @silver-formily/grid

[简体中文](./README.md)

`@silver-formily/grid` is the responsive grid runtime used by Silver Formily. It is not just a static CSS grid helper. Instead, it calculates columns and layout state dynamically from container width, breakpoints, and child spans, which makes it especially useful for form layouts.

## What Problem It Solves

Complex forms rarely have fixed layouts. Field count, field span, container width, and breakpoint changes all affect the final arrangement. This package provides:

- automatic column and breakpoint calculation
- container-width-aware layout adaptation
- child-span, wrap, and gap management
- a stable runtime grid model for higher-level form layout components

## Typical Use Cases

- responsive form layouts
- automatic column distribution for schema-driven forms
- layouts that must react to container size rather than viewport size alone
- the grid foundation used by packages such as `@silver-formily/element-plus`

## Installation

```bash
pnpm add @silver-formily/grid @silver-formily/reactive
```

## Mental Model

Create a grid instance with `createGrid`, connect it to a container element, and let the runtime keep track of size changes and child layout metadata. Higher-level components can then consume computed columns, gaps, breakpoints, and wrapping behavior.

## Documentation

- Docs site: <https://grid.silver-formily.org>
- Repository: <https://github.com/hezhengxu2018/silver-formily>

## License

MIT
