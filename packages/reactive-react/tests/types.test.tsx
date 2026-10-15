import type { FC, Ref } from 'react'
import { createRef } from 'react'
import { expect, it } from 'vitest'
import { observer, Observer } from '../src'

const Modern = observer((props: { ref?: Ref<HTMLDivElement> }) => <div ref={props.ref} />)
export const modern = <Modern ref={createRef<HTMLDivElement>()} />
export const renderNull = <Observer>{() => null}</Observer>
export const renderText = <Observer>{() => 'text'}</Observer>

const Base = Object.assign((props: { value: string }) => <div>{props.value}</div>, { title: 'title' })
export const title = observer(Base).title

function Generic<T>(props: { value: T, onChange: (value: T) => void }) {
  return <div onClick={() => props.onChange(props.value)} />
}
const WrappedGeneric = observer(Generic)
export const generic = <WrappedGeneric value="text" onChange={value => value.toUpperCase()} />

const Explicit = observer<{ value: string }>(props => <div>{props.value}</div>, { forwardRef: true })
export const explicit = <Explicit value="text" ref={createRef<HTMLDivElement>()} />

// @ts-expect-error required component props remain required
export const missing = <WrappedGeneric onChange={(_value: string) => {}} />
// @ts-expect-error generic value and callback must agree
export const mismatch = <WrappedGeneric value={123} onChange={(value: string) => value.toUpperCase()} />
// @ts-expect-error ref element types remain precise
export const wrongRef = <Modern ref={createRef<HTMLButtonElement>()} />

it('retains custom statics in the public type and runtime value', () => {
  expect(title).toBe('title')
})

export const forwardedTitle = observer(Base, { forwardRef: true }).title


const TypedFunction: FC<{ value: string }> = props => <div>{props.value}</div>
const WrappedFunction = observer(TypedFunction)
export const typedFunction = <WrappedFunction value="text" />
