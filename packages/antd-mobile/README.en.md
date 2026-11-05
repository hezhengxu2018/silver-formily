# @silver-formily/antd-mobile

[![npm version](https://img.shields.io/npm/v/@silver-formily/antd-mobile)](https://www.npmjs.com/package/@silver-formily/antd-mobile)
[![npm downloads](https://img.shields.io/npm/dm/@silver-formily/antd-mobile)](https://www.npmjs.com/package/@silver-formily/antd-mobile)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[简体中文](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/antd-mobile/README.md) | [English](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/antd-mobile/README.en.md)

`@silver-formily/antd-mobile` connects Silver Formily field and schema semantics to Ant Design Mobile 5 for React 18/19 mobile and H5 forms. It is migrated from `@formily/antd-mobile`, uses local `@silver-formily/*` packages, and uses dayjs for dates.

## Installation

```bash
pnpm add \
  @silver-formily/antd-mobile \
  @silver-formily/core \
  @silver-formily/json-schema \
  @silver-formily/path \
  @silver-formily/react \
  @silver-formily/reactive \
  @silver-formily/reactive-react \
  @silver-formily/shared \
  'antd-mobile@^5.43.0' \
  'antd-mobile-icons@^0.3.0' \
  'dayjs@^1' \
  'react@^18 || ^19' \
  'react-dom@^18 || ^19'
```

The command includes required peer dependencies. Existing projects can keep dependencies that satisfy the declared ranges.

## Features

- Fields: Input (including TextArea), Checkbox, CheckList, Switch, Stepper, Selector, Radio, Rate, Slider, Segmented, and PasscodeInput
- Pickers: Picker, DatePicker (including quarter precision), CalendarPicker, Cascader, CascadePicker, and CheckListPicker
- Layout: Form, FormLayout, FormItem, FormGrid, FormButtonGroup, List, and Space
- Arrays: ArrayBase and ArrayItems
- Scenarios: FormStep, FormPopup, Submit, Reset, and PreviewText

## Quick Start

```tsx
import { FormItem, FormLayout, Input, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <FormLayout>
      <Field name="username" title="Username" required component={[Input]} decorator={[FormItem]} />
      <Submit onSubmit={console.log}>Submit</Submit>
    </FormLayout>
  </FormProvider>
)
```

## Positioning

This package sits between the React rendering layer and the mobile UI library:

- `@silver-formily/react` supplies rendering and component connection utilities.
- `@silver-formily/core` and `@silver-formily/json-schema` supply field and schema semantics.
- Ant Design Mobile 5 supplies the mobile interaction components.

## Usage Notes

Styles for the wrapper and antd-mobile load automatically with component imports.

`Picker` uses the declarative antd-mobile Picker. Options may change while it is open; fields retain control of their values. Clicking the FormItem row opens the picker and updates its arrow state.

`FormPopup` shows loading when asynchronous `forOpen` middleware takes more than 100ms. Set `loadingText` to customize the message. Loading is cleaned up on completion, failure, or closure.

Function components use parameter defaults instead of `defaultProps` for React 19 compatibility. See the [package guide](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/antd-mobile/AGENTS.md) for maintenance conventions.

## createPopup

`createPopup` is a standalone popup factory that does not require a form context:

```tsx
const popup = createPopup(ThemeContent, { closeOnMaskClick: true })
const result = await popup.prompt({ defaultValue: currentTheme })
if (result !== null)
  setTheme(result)
popup.close()
```

Content components declare `onConfirm(value)` and `onCancel()` through `PopupContentCallbacks<TResult>`. Confirmation resolves with the value; cancellation or explicit closure resolves with `null`. An active session reuses the same Promise. Content and mount nodes are removed after the closing animation. The independent React root does not inherit context from the call site.

## Documentation

- [Guide (Chinese)](https://antd-mobile.silver-formily.org/)
- [Project home](https://silver-formily.org/en/)
- [Source](https://github.com/hezhengxu2018/silver-formily/tree/main/packages/antd-mobile)
- [Issues](https://github.com/hezhengxu2018/silver-formily/issues)

## License

[MIT](https://opensource.org/licenses/MIT)
