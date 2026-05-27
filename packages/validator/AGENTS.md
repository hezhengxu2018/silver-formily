# Validator Package Guide (extends root `AGENTS.md`)

This package is the locally maintained fork of `@formily/validator`. Keep locale, template, and rule semantics close to upstream so runtime behavior stays predictable for `@silver-formily/core`.

## Verification

- Run `pnpm --filter @silver-formily/validator build` after changing parser, registry, or template behavior.
- Rebuild `@silver-formily/core` after validator changes because its public types depend on this package.
