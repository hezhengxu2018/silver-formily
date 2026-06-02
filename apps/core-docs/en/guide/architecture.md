# Architecture

The architecture of `@silver-formily/core` is based on the MVVM pattern, decoupling form state, side effects, and validation logic into independent layers.

## Domain Model

The Formily kernel architecture addresses a domain-level problem, not a single point solution. Here's the architecture diagram:

```mermaid
graph TB
    subgraph FormLayer["Form Layer"]
        direction LR
        F1["Values<br/>values/initialValues"]
        F2["Display<br/>display/hidden/visible"]
        F3["Pattern<br/>pattern/editable/disabled<br/>readOnly/readPretty"]
        F4["Feedback<br/>errors/warnings<br/>successes"]
        F5["Lifecycle<br/>LifeCycle"]
        F6["Setters<br/>setValues/setInitialValues..."]
        F7["Query<br/>query"]
    end

    subgraph FieldTree["Field Tree"]
        direction LR
        subgraph FieldNode["Field (Data Field)"]
            direction TB
            FL1["Path / Value / Display"]
            FL2["Pattern / Feedback"]
            FL3["Validator"]
            FL4["Component/Decorator"]
            FL5["Reactions"]
            FL6["LifeCycles / Setters"]
            subgraph InheritedFields["Extends Field"]
                AF["ArrayField<br/>push/insert/move..."]
                OF["ObjectField<br/>addProperty/removeProperty"]
            end
        end
        subgraph VoidFieldNode["VoidField"]
            direction TB
            VF1["Path"]
            VF2["Display / Pattern"]
            VF3["Lifecycle / Setters"]
            VF4["Component/Decorator"]
            VF5["Reactions"]
        end
    end

    subgraph Reactive["Reactive Domain Model"]
        direction TB
        O1["Observer ← Consumer"]
        O2["Observer ← Consumer"]
        O3["Observer ← Consumer"]
        O4["Observer ← Consumer"]
    end

    FormLayer -->|"FormPathPattern"| FieldTree
    FieldNode -.->|"Inheritance"| VoidFieldNode
    FieldNode -.->|"Implicit Control"| VoidFieldNode
    Reactive -->|"Dependency Tracking"| FieldNode
    Reactive -->|"Dependency Tracking"| VoidFieldNode
    FieldNode -->|"Validation Results"| Feedback["feedbacks<br/>errors / warnings / successes"]
```

## Core Modules

### Form

The root node of a form, aggregating Graph and Heart:

- **Values**: Dual management of values and initialValues with multiple merge strategies
- **Display**: display (visible/hidden/none) with convenience properties
- **Pattern**: pattern (editable/disabled/readOnly/readPretty)
- **Feedback**: errors, warnings, successes
- **Lifecycle**: Complete Form/Field lifecycle event system
- **Setters**: State manipulation methods
- **Query**: Path pattern matching for field lookup

### Field Model Hierarchy

```mermaid
graph TD
    BaseField["BaseField"]
    BaseField --> Field["Field<br/>Data field<br/>value/inputValue/validator"]
    BaseField --> VoidField["VoidField<br/>Virtual field<br/>layout container"]
    Field --> ArrayField["ArrayField<br/>push/insert/move..."]
    Field --> ObjectField["ObjectField<br/>addProperty/removeProperty"]
```

### Effects System

```mermaid
graph LR
    subgraph Events["Lifecycle Events"]
        E1["onFormInit / onFormMount"]
        E2["onFormValuesChange"]
        E3["onFormSubmit"]
        E4["onFieldValueChange"]
    end
    subgraph Observer["Observer"]
        O1["Consumer A"]
        O2["Consumer B"]
    end
    Events -->|"publish"| Observer
    Observer -->|"track & notify"| Events
```

```ts
import { onFieldValueChange, onFormSubmit } from '@silver-formily/core'

const form = createForm({
  effects() {
    onFormSubmit((form) => { /* ... */ })
    onFieldValueChange('*', (field) => { /* ... */ })
  },
})
```

## Data Flow

```mermaid
graph TD
    A["👤 User Input"] --> B["Field.onInput / setValue"]
    B --> C["Heart.publish<br/>LifeCycleTypes"]
    C --> D["Reactive Dependency<br/>Collection"]
    D --> E["Observer Notify<br/>Subscribers"]
    E --> F["Effects Callback<br/>Execution"]
    F --> G["UI Update"]
    C --> H["Validation<br/>validator.validate"]
    H --> I["feedbacks written"]
```
