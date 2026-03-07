# Quick Start

## Installation

```bash
npm install --save @formily/reactive
```

## Example

```ts
import { autorun, observable } from '@formily/reactive'

const obs = observable({
  value: 'Hello world',
})

const dispose = autorun(() => {
  console.log(obs.value)
})

obs.value = 'Hello Formily'

dispose()
```
