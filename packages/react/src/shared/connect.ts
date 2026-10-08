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

export function connect<T extends JSXComponent>(
  target: T,
  ...args: IComponentMapper<T>[]
) {
  const Target = args.reduce((target, mapper) => {
    return mapper(target as T) as T
  }, target)

  const Destination = forwardRef<unknown, Partial<React.ComponentProps<T>>>(
    (props, ref) => {
      return createElement(Target as any, { ...props, ref })
    },
  )

  if (target)
    hoistNonReactStatics(Destination, target as any)

  return Destination
}

export { observer, Observer }
