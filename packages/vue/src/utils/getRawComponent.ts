import type { Component } from 'vue'
import type { IFieldProps } from '../types'
import { toRaw } from 'vue'

type ComponentLikeProps = Pick<IFieldProps<Component, Component>, 'component' | 'decorator'>

export function getRawComponent(props: ComponentLikeProps) {
  const { component, decorator } = props
  let newComponent: typeof component | undefined
  let newDecorator: typeof decorator | undefined
  if (Array.isArray(component)) {
    newComponent = [toRaw(component[0]), component[1]]
  }
  if (Array.isArray(decorator)) {
    newDecorator = [toRaw(decorator[0]), decorator[1]]
  }
  return {
    component: newComponent ?? component,
    decorator: newDecorator ?? decorator,
  }
}
