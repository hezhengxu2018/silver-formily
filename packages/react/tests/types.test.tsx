import type { Ref } from 'react'
import { createRef, forwardRef } from 'react'
import { expect, it } from 'vitest'
import { ArrayField, connect, createSchemaField, Field, FormConsumer, ObjectField, VoidField } from '../src'

const Input = (_props: { count: number, label?: string }) => null
export const injected = <Field name="x" component={[Input]} />
export const partial = <Field name="x" component={[Input, { label: 'label' }]} />
export const empty = <Field name="x" component={[]} decorator={[]} />
// @ts-expect-error component props must match the selected component
export const wrongField = <Field name="x" component={[Input, { count: 'bad' }]} />
// @ts-expect-error array fields must validate component props too
export const wrongArray = <ArrayField name="x" component={[Input, { count: 'bad' }]} />
// @ts-expect-error object fields must validate decorator props too
export const wrongObject = <ObjectField name="x" decorator={[Input, { count: 'bad' }]} />
// @ts-expect-error void fields must validate component props too
export const wrongVoid = <VoidField name="x" component={[Input, { count: 'bad' }]} />
// @ts-expect-error reject unknown props
export const unknownProp = <Field name="x" component={[Input, { missing: true }]} />
// @ts-expect-error validate intrinsic element props
export const intrinsicProps = <Field name="x" component={['input', { type: 123 }]} />
export const nullable = <FormConsumer>{() => null}</FormConsumer>
export const array = <FormConsumer>{() => [<span key="x" />]}</FormConsumer>

const Base = Object.assign((_props: { ref?: Ref<HTMLInputElement> }) => null, { Item: Input })
const Connected = connect(Base)
export const correctRef = <Connected ref={createRef<HTMLInputElement>()} />
// @ts-expect-error preserve the original ref element type
export const wrongRef = <Connected ref={createRef<HTMLDivElement>()} />
const ConnectedInput = connect('input')
export const intrinsicRef = <ConnectedInput ref={createRef<HTMLInputElement>()} />
// @ts-expect-error preserve intrinsic element ref types
export const wrongIntrinsicRef = <ConnectedInput ref={createRef<HTMLDivElement>()} />
const Forwarded = connect(forwardRef<HTMLInputElement>((_props, ref) => <input ref={ref} />))
export const forwardedRef = <Forwarded ref={createRef<HTMLInputElement>()} />
// @ts-expect-error preserve forwardRef element types
export const wrongForwardedRef = <Forwarded ref={createRef<HTMLDivElement>()} />
export const item = <Connected.Item count={1} />

it('preserves connected component statics in types and at runtime', () => {
  expect(Connected.Item).toBe(Input)
})


const Decorator = (_props: { title: string }) => null
const SchemaField = createSchemaField({ components: { Decorator, Input } })
export const inferredSchema = <SchemaField.String name="x" x-decorator="Decorator" x-component="Input" x-decorator-props={{ title: 'Title' }} x-component-props={{ count: 1 }} />
export const explicitSchema = <SchemaField.String<'Decorator', 'Input'> name="x" x-decorator="Decorator" x-component="Input" x-decorator-props={{ title: 'Title' }} x-component-props={{ count: 1 }} />
export const explicitMarkup = <SchemaField.Markup<'Decorator', 'Input'> name="x" x-decorator="Decorator" x-component="Input" x-component-props={{ count: 1 }} />
// @ts-expect-error decorator props must use the decorator's type
export const wrongSchemaDecorator = <SchemaField.String<'Decorator', 'Input'> x-decorator-props={{ title: 1 }} />
// @ts-expect-error component props must use the component's type
export const wrongSchemaComponent = <SchemaField.String<'Decorator', 'Input'> x-component-props={{ count: false }} />
// @ts-expect-error inferred component props must still be checked after wrapping
export const wrongInferredSchema = <SchemaField.Number x-component="Input" x-component-props={{ count: false }} />
