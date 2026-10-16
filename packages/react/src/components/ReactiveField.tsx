import type { Form, GeneralField } from '@silver-formily/core'
import type { ReactNode } from 'react'
import type { JSXComponent, RenderPropsChildren, SchemaReactComponents } from '../types'
import { isVoidField } from '@silver-formily/core'
import { Path as FormPath } from '@silver-formily/path'
import { toJS } from '@silver-formily/reactive'
import { observer } from '@silver-formily/reactive-react'
import { isFn, isPlainObj } from '@silver-formily/shared'
import { createElement, Fragment, isValidElement, useContext } from 'react'
import { SchemaComponentsContext } from '../shared'

interface IReactiveFieldProps {
  field: GeneralField
  children?: RenderPropsChildren<GeneralField>
}

function isEmptyContent(value: ReactNode) {
  return value == null || typeof value === 'boolean' || value === ''
}

function mergeChildren(children: ReactNode, content: ReactNode) {
  // Void DOM elements must receive no children when both sources are empty.
  if (isEmptyContent(children) && isEmptyContent(content))
    return
  return (
    <Fragment>
      {children}
      {content}
    </Fragment>
  )
}

function resolveComponent(target: JSXComponent, components: SchemaReactComponents) {
  return typeof target === 'string' ? FormPath.getIn(components, target) ?? target : target
}

type ComponentEvent = 'onChange' | 'onFocus' | 'onBlur'
type FieldEvent = 'onInput' | 'onFocus' | 'onBlur'

function bindFieldEvent(field: GeneralField, event: ComponentEvent, action: FieldEvent) {
  if (isVoidField(field))
    return field.componentProps?.[event]
  return (...args: any[]) => {
    field[action](...args)
    // Read the latest callback after the field action, which may update props.
    field.componentProps?.[event]?.(...args)
  }
}

// decoratorContent 的消费方式与 x-content 对齐：纯内容（字符串/数字/ReactNode）
// 收敛为约定 prop content，对象映射展开为 decorator 的多个 props（对应 Vue 版
// 具名插槽语义，渲染位置由 decorator 组件自行决定），同名时优先于 decoratorProps。
function resolveDecoratorContentProps(field: GeneralField): Record<string, any> | null {
  const content = toJS(field.decoratorContent)
  if (content == null)
    return null
  // React elements, portals and iterable nodes are content, not prop maps.
  if (isPlainObj(content)
    && !isValidElement(content)
    && !('$$typeof' in content && content.$$typeof === Symbol.for('react.portal'))
    && !(Symbol.iterator in content && typeof content[Symbol.iterator] === 'function')) {
    return content
  }
  return { content }
}

function renderChildren(children: RenderPropsChildren<GeneralField>, field?: GeneralField, form?: Form) {
  return isFn(children) ? children(field as GeneralField, form as Form) : children
}

// component 侧的响应式读取（value/componentProps/pattern）收敛在独立的
// observer 子组件中，字段值变化只重渲染当前内容，不波及外层的 decorator
const ReactiveFieldContent = observer(
  (props: IReactiveFieldProps) => {
    const components = useContext(SchemaComponentsContext)
    const field = props.field
    const content = mergeChildren(
      renderChildren(props.children, field, field.form as Form),
      field.content ?? field.componentProps.children,
    )
    if (!field.componentType)
      return <Fragment>{content}</Fragment>

    const dataField = isVoidField(field) ? undefined : field
    return createElement(
      resolveComponent(field.componentType, components),
      {
        disabled: dataField ? field.pattern === 'disabled' || field.pattern === 'readPretty' : undefined,
        readOnly: dataField ? field.pattern === 'readOnly' : undefined,
        ...toJS(field.componentProps),
        value: dataField?.value,
        onChange: bindFieldEvent(field, 'onChange', 'onInput'),
        onFocus: bindFieldEvent(field, 'onFocus', 'onFocus'),
        onBlur: bindFieldEvent(field, 'onBlur', 'onBlur'),
      },
      content,
    )
  },
  {
    displayName: 'ReactiveFieldContent',
  },
)

function ReactiveInternal(props: IReactiveFieldProps) {
  const components = useContext(SchemaComponentsContext)
  if (!props.field) {
    return <Fragment>{renderChildren(props.children)}</Fragment>
  }
  const field = props.field
  if (field.display !== 'visible')
    return null

  const renderDecorator = (children: ReactNode) => {
    if (!field.decoratorType) {
      return <Fragment>{children}</Fragment>
    }

    return createElement(
      resolveComponent(field.decoratorType, components),
      {
        ...toJS(field.decoratorProps),
        ...resolveDecoratorContentProps(field),
      },
      children,
    )
  }

  return renderDecorator(
    <ReactiveFieldContent field={field}>
      {props.children}
    </ReactiveFieldContent>,
  )
}

ReactiveInternal.displayName = 'ReactiveField'

export const ReactiveField = observer(ReactiveInternal, {
  forwardRef: true,
})
