---
order: 7
---

# Heart

::: warning Internal Model
`Heart` is intended primarily for internal framework use and is almost never instantiated or called directly in application code. Unless you are developing a low-level extension, prefer Form's public APIs and effect hooks.
:::

`Heart` is Form's internal lifecycle event center. It connects `LifeCycle` listeners, dynamically added effects, and ordinary subscribers. Application code usually uses effect hooks or Form's `notify()` and `subscribe()` methods instead of manipulating `form.heart` directly.

## Constructor

```ts
interface IHeartProps<Context> {
  lifecycles?: LifeCycle[]
  context?: Context
}

interface HeartConstructor {
  new<Payload = any, Context = any>(props?: IHeartProps<Context>): Heart<Payload, Context>
}
```

## Main Properties

| Property        | Description                            | Type                             |
| --------------- | -------------------------------------- | -------------------------------- |
| lifecycles      | Lifecycle listeners registered by Form | `LifeCycle<Payload>[]`           |
| outerLifecycles | Dynamically registered listeners by ID | `Map<any, LifeCycle<Payload>[]>` |
| context         | Default context used when publishing   | `Context`                        |

## Lifecycle Management

```ts
heart.addLifeCycles(id, lifecycles)
heart.hasLifeCycles(id)
heart.removeLifeCycles(id)
heart.setLifeCycles(lifecycles)
heart.buildLifeCycles(lifecycles)
```

- `addLifeCycles()` registers dynamic listeners under an ID; Form avoids adding the same ID twice.
- `setLifeCycles()` replaces Form's own lifecycle listeners.
- `buildLifeCycles()` flattens nested arrays into a single `LifeCycle[]`.

## Publishing and Subscribing

```ts
heart.publish(type, payload, context)

const id = heart.subscribe(({ type, payload }) => {
  // Observe every published event
})

heart.unsubscribe(id)
heart.clear()
```

`publish()` notifies lifecycle listeners before ordinary subscribers. `clear()` removes lifecycles, dynamic effects, and every ordinary subscription.
