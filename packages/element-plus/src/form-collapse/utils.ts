import type { GeneralField } from '@formily/core'
import type { Schema, SchemaKey } from '@formily/json-schema'
import { model } from '@formily/reactive'
import { toArr } from '@formily/shared'

type ActiveKeys = string | number | Array<string | number>

type ActiveKey = string | number

type Panels = { name: SchemaKey, props: any, schema: Schema }[]

export interface IFormCollapse {
  activeKeys: ActiveKeys
  hasActiveKey: (key: ActiveKey) => boolean
  setActiveKeys: (key: ActiveKeys) => void
  addActiveKey: (key: ActiveKey) => void
  removeActiveKey: (key: ActiveKey) => void
  toggleActiveKey: (key: ActiveKey) => void
}

export interface IFormCollapseProps {
  formCollapse?: IFormCollapse
  activeKey?: ActiveKey
}

export function usePanels(collapseField: GeneralField, schema: Schema) {
  const schemaList = schema.mapProperties((schema, name) => ({
    name,
    props: {
      ...schema?.['x-component-props'],
      key: schema?.['x-component-props']?.key || name,
    },
    schema,
  }))

  const panels: Panels = schemaList.filter((item) => {
    const field = collapseField.query(collapseField.address.concat(item.name)).take()
    const isHidden = field?.display === 'none' || field?.display === 'hidden'
    if (isHidden)
      return false
    return item?.schema?.['x-component']?.includes('FormCollapse.Item') ?? false
  })

  return panels
}

export function createFormCollapse(defaultActiveKeys?: ActiveKeys) {
  const formCollapse = model({
    activeKeys: defaultActiveKeys,
    setActiveKeys(keys: ActiveKeys) {
      /* istanbul ignore if -- @preserve */
      if (keys === formCollapse.activeKeys)
        return
      formCollapse.activeKeys = keys
    },
    hasActiveKey(key: ActiveKey) {
      if (Array.isArray(formCollapse.activeKeys)) {
        if (formCollapse.activeKeys.includes(key)) {
          return true
        }
      }
      else if (formCollapse.activeKeys === key) {
        return true
      }
      return false
    },
    addActiveKey(key: ActiveKey) {
      /* istanbul ignore if -- @preserve */
      if (formCollapse.hasActiveKey(key))
        return
      formCollapse.activeKeys = toArr(formCollapse.activeKeys).concat(key)
    },
    removeActiveKey(key: ActiveKey) {
      formCollapse.activeKeys = Array.isArray(formCollapse.activeKeys)
        ? formCollapse.activeKeys.filter(
            item => item !== key,
          )
        : ''
    },
    toggleActiveKey(key: ActiveKey) {
      if (formCollapse.hasActiveKey(key)) {
        formCollapse.removeActiveKey(key)
      }
      else {
        formCollapse.addActiveKey(key)
      }
    },
  })
  return formCollapse
}
