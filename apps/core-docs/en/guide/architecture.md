# Architecture

## Prerequisites

### What Is MVVM?

MVVM (Model-View-ViewModel) is an OOP architectural pattern. Unlike React's `UI = fn(State)` philosophy, Vue adopts the MVVM design approach, which is also a very important design pattern in front-end development. `@silver-formily/core` follows this pattern, cleanly separating form **data**, **state**, and **side-effect logic** into distinct layers.

Here's a diagram to illustrate:

<ThemeImage
  light="/architecture/mvvm.png"
  dark="/architecture/mvvm.dark.png"
  alt="MVVM"
/>

- **View ↔ ViewModel** are bidirectionally connected through DataBinding. View passes user actions to ViewModel, and ViewModel notifies View of state changes.
- **ViewModel → Model** is a one-way request. ViewModel reads and modifies Model data, but Model does not directly perceive ViewModel.
- The labels at the top show each layer's responsibility: View and ViewModel together handle presentation and presentation logic, while Model handles business logic and data.

Formily provides the View and ViewModel layers:

- The View layer includes framework bindings like `@silver-formily/vue` and component library bindings like `@silver-formily/element-plus`.
- The ViewModel layer includes `@silver-formily/core` and its supporting libraries.

Formily's goal is to reduce the cost of designing the ViewModel, letting developers focus more on business logic. The Model layer (i.e., the actual business code layer) is **not part of Formily's scope**. In most cases, the front-end form model differs from the back-end API data — business requirements vary widely, and developers need to maintain this layer of transformation on their own.

### What Is a Domain Model?

Before diving into the architecture, it helps to understand one core concept: **Domain Model**.

Put simply, a domain model is an abstraction of the core concepts, rules, and relationships in a business domain. It does not care about technical implementation details, such as whether React or Vue renders the UI. Instead, it answers: what is the essence of this domain, who participates in it, and how do they collaborate?

For the form domain, if we put UI frameworks and component libraries aside, what is a form really about?

- It has **values**: what the user filled in
- It has **rules**: which fields are required and how they should be validated
- It has **state**: whether it is editable, disabled, read-only, or read-pretty
- It has **structure**: whether fields are flat, nested, or array-based
- It has **feedback**: whether validation passed and where errors occurred

Extracting these concepts into reusable models is what the Formily kernel does. This keeps the underlying logic consistent whether the upper layer uses Vue, React, or plain DOM. That is the value of a domain model.

## Domain Model

The Formily kernel architecture answers this question: "How can the form domain be abstracted into a stable set of models and collaboration relationships?" It is not about how a specific component renders.

So it is easier to understand it in two steps:

1. First, look at **how the core objects are layered**
2. Then, look at **how these objects collaborate when state changes**

### 1. Core Object Relationships

First, answer one question: what core objects exist in the Formily kernel, and what is each object responsible for?

<ThemeImage
  light="/architecture/domain-model.en.svg"
  dark="/architecture/domain-model.en.dark.svg"
  alt="Formily domain model architecture overview"
/>

The most important part of this diagram is the three-layer relationship:

- **Form** is the root model and aggregates the capabilities of the whole form
- **Field Tree** is the field organization structure and connects all nodes into a tree
- **Field** / **VoidField** are the two core node types in the tree: Field carries data, while VoidField focuses more on structure and layout

In TypeScript type declarations, both Field and VoidField are `GeneralField` (see the related [TypeChecker](/en/api/entry/FormChecker.html#isgeneralfield)). Their model fields differ in many ways, so TypeChecker is often needed to get complete type inference during usage. ArrayField and ObjectField are not brand-new models; they are extensions of Field for specific data structures, with additional methods.

### 2. Runtime Collaboration

Now look at the second question: when the user inputs a value, a field changes, or validation is triggered, how does the system flow internally?

<ThemeImage
  light="/architecture/coordination.en.svg"
  dark="/architecture/coordination.en.dark.svg"
  alt="Formily collaboration relationship"
/>

This diagram describes one main runtime line:

- User input or setter calls first change Form or Field state
- After state changes, Heart publishes lifecycle events
- Some changes trigger validation, and validation results are written into feedbacks
- Other changes are tracked by the Reactive system, which then notifies Observer and UI updates

In other words, **Form / Field Tree / Field / VoidField** are more like "domain objects", while **Heart / Reactive / Observer** are more like "mechanisms that make those objects run". Keeping these two kinds of concepts separate makes the architecture much easier to understand.

For the complete data flow, see the [Data Flow](#data-flow) section.

## Core Concepts

This section is an index of all core concepts. For complete behavior, APIs, and usage, please follow the links to the corresponding guide pages.

- **Form**: The root model that aggregates fields, values, validation, submission, lifecycle, and linkage entry points. Continue reading: [Form Model](/en/guide/form) / [Form API](/en/api/models/Form)
- **Field Tree / Graph**: The organization structure of fields, maintaining parent-child relationships, node registration, and field graph snapshots. Continue reading: [Form Model — Field Graph](/en/guide/form.html#field-graph)
- **Field / VoidField**: The core nodes on the field tree. Field carries data, while VoidField is more about layout and structure. ArrayField and ObjectField are field extensions for array and object structures. Continue reading: [Field Model](/en/guide/field)
- **Values / State**: Form values, initial values, display states, interaction patterns, feedback states, and other runtime state. Continue reading: [Values & State](/en/guide/values)
- **Path / Query**: Path semantics connecting the field tree and form data, and the foundation for field lookup, batch operations, and linkage targeting. Continue reading: [Path System](/en/guide/path) / [FormPath API](/en/api/entry/FormPath) / [Query API](/en/api/models/Query)
- **Validation / Feedback**: Fields declare validation rules; Form provides aggregate validation and submission entry points; validation results are collected as feedbacks. Continue reading: [Validation System](/en/guide/validation) / [FormValidatorRegistry API](/en/api/entry/FormValidatorRegistry)
- **Heart / LifeCycle**: The lifecycle event center inside Form. `effects` and all effect hooks are built on top of it. Continue reading: [Linkage System](/en/guide/linkage) / [FormEffectHooks API](/en/api/entry/FormEffectHooks) / [FieldEffectHooks API](/en/api/entry/FieldEffectHooks)

## Data Flow

<ThemeImage
  light="/architecture/data-flow.en.png"
  dark="/architecture/data-flow.en.dark.png"
  alt="Formily data flow"
/>
