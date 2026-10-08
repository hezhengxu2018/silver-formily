import type { Form, GeneralField } from '@silver-formily/core'
import type { FC, ReactNode } from 'react'
import type { RenderPropsChildren } from '../types'
import { isVoidField } from '@silver-formily/core'
import { Path as FormPath } from '@silver-formily/path'
import { toJS } from '@silver-formily/reactive'
import { observer } from '@silver-formily/reactive-react'
import { isFn } from '@silver-formily/shared'
import { createElement, Fragment, useContext } from 'react'
import { SchemaComponentsContext } from '../shared'

interface IReactiveFieldProps {
  field: GeneralField
  children?: RenderPropsChildren<GeneralField>
}

function mergeChildren(children: RenderPropsChildren<GeneralField>, content: ReactNode) {
  if (!children && !content)
    return
  if (isFn(children))
    return
  return (
    <Fragment>
      {children}
      {content}
    </Fragment>
  )
}

function isValidComponent(target: any) {
  return target && (typeof target === 'object' || typeof target === 'function')
}

function renderChildren(children: RenderPropsChildren<GeneralField>, field?: GeneralField, form?: Form) {
  return isFn(children) ? children(field as GeneralField, form as Form) : children
}

const ReactiveInternal: FC<IReactiveFieldProps> = (props) => {
  const components = useContext(SchemaComponentsContext)
  if (!props.field) {
    return <Fragment>{renderChildren(props.children)}</Fragment>
  }
  const field = props.field
  const content = mergeChildren(
    renderChildren(props.children, field, field.form as Form),
    field.content ?? field.componentProps.children,
  )
  if (field.display !== 'visible')
    return null

  const getComponent = (target: any) => {
    return isValidComponent(target)
      ? target
      : FormPath.getIn(components, target) ?? target
  }

  const renderDecorator = (children: ReactNode) => {
    if (!field.decoratorType) {
      return <Fragment>{children}</Fragment>
    }

    return createElement(
      getComponent(field.decoratorType),
      toJS(field.decoratorProps),
      children,
    )
  }

  const renderComponent = () => {
    if (!field.componentType)
      return content
    const value = !isVoidField(field) ? field.value : undefined
    const onChange = !isVoidField(field)
      ? (...args: any[]) => {
          field.onInput(...args)
          field.componentProps?.onChange?.(...args)
        }
      : field.componentProps?.onChange
    const onFocus = !isVoidField(field)
      ? (...args: any[]) => {
          field.onFocus(...args)
          field.componentProps?.onFocus?.(...args)
        }
      : field.componentProps?.onFocus
    const onBlur = !isVoidField(field)
      ? (...args: any[]) => {
          field.onBlur(...args)
          field.componentProps?.onBlur?.(...args)
        }
      : field.componentProps?.onBlur
    const disabled = !isVoidField(field)
      ? field.pattern === 'disabled' || field.pattern === 'readPretty'
      : undefined
    const readOnly = !isVoidField(field)
      ? field.pattern === 'readOnly'
      : undefined
    return createElement(
      getComponent(field.componentType),
      {
        disabled,
        readOnly,
        ...toJS(field.componentProps),
        value,
        onChange,
        onFocus,
        onBlur,
      },
      content,
    )
  }

  return renderDecorator(renderComponent())
}

ReactiveInternal.displayName = 'ReactiveField'

export const ReactiveField = observer(ReactiveInternal, {
  forwardRef: true,
})
