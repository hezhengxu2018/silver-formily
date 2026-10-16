# observer

## Description

observer is exported from [@silver-formily/reactive-react](https://reactive-react.silver-formily.org/), with a completely identical API. Using observer mainly gives components reactive update capabilities.

In `@silver-formily/react`, components that should update automatically from direct reads of reactive Form / Field state need an observer or Observer subscription; useForm/useField only read context.

## Usage

:::demo
api/shared/observer.tsx
:::

## observer and Observer

Both exports come from `@silver-formily/reactive-react`. `observer` supports function components and existing `memo` / `forwardRef` wrappers, preserving memo comparators. Class components and `lazy` wrappers are not supported inputs. Its overloads preserve component props, declared refs, and custom statics; the default function overload also retains generic call signatures.

Options are `displayName?: string`, `scheduler?: (updater: () => void) => void`, and `forwardRef?: boolean`. In React 18, ref forwarding requires a forwardRef input or `{ forwardRef: true }`. React 19 ref props are preserved without this option when the input declares them. See the reactive-react reference for the full overloads.

```tsx
import type { Form } from '@silver-formily/core'

import { Observer } from '@silver-formily/react'

export function FormValues({ form }: { form: import('@silver-formily/core').Form }) {
  return <Observer>{() => JSON.stringify(form.values)}</Observer>
}
```

`Observer` accepts optional `children?: (() => React.ReactNode) | React.ReactNode`. Put reactive reads inside the callback for tracking. `IObserverProps` and `IObserverOptions` must be imported from `@silver-formily/reactive-react`, not the React binding entry.
