import type { GeneralField } from '@silver-formily/core'
import type { Schema, SchemaKey } from '@silver-formily/json-schema'
import { model } from '@silver-formily/reactive'
import { toArr } from '@silver-formily/shared'

export type AccordionKey = string | number

export type AccordionKeys = AccordionKey | AccordionKey[]

export type AccordionType = 'single' | 'multiple'

export type AccordionPanel = {
  name: SchemaKey
  props: Record<string, any>
  schema: Schema
}

export interface IAccordion {
  activeKeys?: AccordionKeys
  panelKeys: AccordionKey[]
  setPanelKeys: (keys: AccordionKey[]) => void
  setExpandedChangeHandler: (handler?: (expanded: boolean) => void) => void
  isAllExpanded: () => boolean
  hasActiveKey: (key: AccordionKey) => boolean
  setActiveKeys: (keys?: AccordionKeys) => void
  addActiveKey: (key: AccordionKey) => void
  removeActiveKey: (key: AccordionKey) => void
  toggleActiveKey: (key: AccordionKey) => void
  expandAll: () => void
  collapseAll: () => void
  toggleAll: () => void
}

export interface IAccordionProps {
  accordion?: IAccordion
  activeKey?: AccordionKeys
  type?: AccordionType
  collapsible?: boolean
}

export function stringifyAccordionKey(key: AccordionKey) {
  return String(key)
}

export function normalizeAccordionValue(
  keys: AccordionKeys | undefined,
  type: AccordionType,
) {
  if (type === 'single')
    return keys === undefined ? undefined : stringifyAccordionKey(toArr(keys)[0])

  return toArr(keys).map(stringifyAccordionKey)
}

export function usePanels(accordionField: GeneralField, schema?: Schema) {
  if (!schema)
    return []

  const schemaList = schema.mapProperties((schema, name) => ({
    name,
    props: {
      ...schema?.['x-component-props'],
      key: schema?.['x-component-props']?.key || name,
    },
    schema,
  }))

  return schemaList.filter((item): item is AccordionPanel => {
    const field = accordionField.query(accordionField.address.concat(item.name)).take()
    const isHidden = field?.display === 'none' || field?.display === 'hidden'
    if (isHidden)
      return false
    return item?.schema?.['x-component']?.includes('Accordion.Item') ?? false
  })
}

export function createAccordion(defaultActiveKeys?: AccordionKeys): IAccordion {
  let onExpandedChange: ((expanded: boolean) => void) | undefined
  const accordion = model({
    activeKeys: defaultActiveKeys,
    panelKeys: [] as AccordionKey[],
  }) as IAccordion

  function notifyExpandedChange() {
    onExpandedChange?.(accordion.isAllExpanded())
  }

  accordion.setPanelKeys = (keys: AccordionKey[]) => {
    accordion.panelKeys = keys
    notifyExpandedChange()
  }
  accordion.setExpandedChangeHandler = (handler?: (expanded: boolean) => void) => {
    onExpandedChange = handler
    notifyExpandedChange()
  }
  accordion.isAllExpanded = () => {
    if (accordion.panelKeys.length === 0)
      return accordion.activeKeys === undefined
    if (accordion.activeKeys === undefined)
      return true
    return accordion.panelKeys.every(key => accordion.hasActiveKey(key))
  }
  accordion.setActiveKeys = (keys?: AccordionKeys) => {
    if (keys === accordion.activeKeys)
      return
    accordion.activeKeys = keys
    notifyExpandedChange()
  }
  accordion.hasActiveKey = (key: AccordionKey) => {
    if (Array.isArray(accordion.activeKeys))
      return accordion.activeKeys.includes(key)
    return accordion.activeKeys === key
  }
  accordion.addActiveKey = (key: AccordionKey) => {
    if (accordion.hasActiveKey(key))
      return
    accordion.activeKeys = toArr(accordion.activeKeys).concat(key)
  }
  accordion.removeActiveKey = (key: AccordionKey) => {
    accordion.activeKeys = Array.isArray(accordion.activeKeys)
      ? accordion.activeKeys.filter((item: AccordionKey) => item !== key)
      : undefined
  }
  accordion.toggleActiveKey = (key: AccordionKey) => {
    if (accordion.hasActiveKey(key)) {
      accordion.removeActiveKey(key)
      return
    }
    accordion.addActiveKey(key)
  }
  accordion.expandAll = () => {
    accordion.setActiveKeys(accordion.panelKeys)
  }
  accordion.collapseAll = () => {
    accordion.setActiveKeys([])
  }
  accordion.toggleAll = () => {
    if (accordion.isAllExpanded()) {
      accordion.collapseAll()
      return
    }
    accordion.expandAll()
  }

  return accordion
}
