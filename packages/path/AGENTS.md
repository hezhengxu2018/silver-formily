# Path Package Guide (extends root `AGENTS.md`)

This package is the locally maintained fork of `@formily/path`. Keep its parser and matcher behavior aligned with upstream unless there is an intentional Silver Formily compatibility fix.

## Verification

- Run `pnpm --filter @silver-formily/path build` after changes to parsing or matching behavior.
- Prefer validating downstream `@silver-formily/shared` after changing exported path primitives.
