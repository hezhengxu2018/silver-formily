import type React from 'react'
import type { IComponentMapper, IStateMapper, JSXComponent } from '../types'
import { isVoidField } from '@silver-formily/core'
import { Path as FormPath } from '@silver-formily/path'
import { observer, Observer } from '@silver-formily/reactive-react'
import { each, isFn, isStr, isValid } from '@silver-formily/shared'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { createElement, forwardRef } from 'react'
import { useField } from '../hooks'

export function mapProps<T extends JSXComponent>(
  ...args: IStateMapper<React.ComponentProps<T>>[]
) {
  return (target: T): React.ComponentType<any> => {
    return observer(
      (props: any) => {
        const field = useField()
        const results = args.reduce(
          (props, mapper) => {
            if (isFn(mapper)) {
              props = Object.assign(props, mapper(props, field))
            }
            else {
              each(mapper, (to, extract) => {
                const extractValue = FormPath.getIn(field, extract)
                const targetValue = isStr(to) ? to : (extract as any)
                const originalValue = FormPath.getIn(props, targetValue)
                if (extract === 'value') {
                  if (to !== extract) {
                    delete props.value
                  }
                }
                if (isValid(originalValue) && !isValid(extractValue))
                  return
                FormPath.setIn(props, targetValue, extractValue)
              })
            }
            return props
          },
          { ...props },
        )
        return createElement(target, results)
      },
      {
        forwardRef: true,
      },
    )
  }
}

export function mapReadPretty<T extends JSXComponent, C extends JSXComponent>(
  component: C,
  readPrettyProps?: React.ComponentProps<C>,
) {
  return (target: T): React.ComponentType<any> => {
    return observer(
      (props) => {
        const field = useField()
        if (!isVoidField(field) && field?.pattern === 'readPretty') {
          return createElement(component, {
            ...readPrettyProps,
            ...props,
          })
        }
        return createElement(target, props)
      },
      {
        forwardRef: true,
      },
    )
  }
}

// Keep emitted declarations independent of @types/hoist-non-react-statics.
// These are the React/function metadata keys excluded by the runtime hoister.
type ReactStatics
  = | 'childContextTypes' | 'contextType' | 'contextTypes' | 'defaultProps'
    | 'displayName' | 'getDefaultProps' | 'getDerivedStateFromError'
    | 'getDerivedStateFromProps' | 'mixins' | 'propTypes' | 'type'
type FunctionStatics
  = | 'name' | 'length' | 'prototype' | 'caller' | 'callee' | 'arguments' | 'arity'
type NonHoistedStatics<T> = T extends React.MemoExoticComponent<any>
  ? '$$typeof' | 'compare' | 'defaultProps' | 'displayName' | 'propTypes' | 'type'
  : T extends React.ForwardRefExoticComponent<any>
    ? '$$typeof' | 'render' | 'defaultProps' | 'displayName' | 'propTypes'
    : ReactStatics | FunctionStatics
type ConnectedStatics<T> = T extends string ? unknown : Pick<T, Exclude<keyof T, NonHoistedStatics<T>>>

export type ConnectedComponent<T extends JSXComponent> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<Partial<React.ComponentProps<T>>>
  & React.RefAttributes<React.ComponentRef<T>>
> & ConnectedStatics<T>

export function connect<T extends JSXComponent>(
  target: T,
  ...args: IComponentMapper<T>[]
): ConnectedComponent<T> {
  const Target = args.reduce((target, mapper) => {
    return mapper(target as T) as T
  }, target)

  const Destination = forwardRef<React.ComponentRef<T>, Partial<React.ComponentProps<T>>>(
    (props, ref) => {
      return createElement(Target as any, { ...props, ref })
    },
  )

  return hoistNonReactStatics(Destination, target) as ConnectedComponent<T>
}

export { observer, Observer }
