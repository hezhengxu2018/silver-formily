import type { GeneralField } from '@formily/core'
import type { Schema, SchemaKey } from '@formily/json-schema'

export type Tabs = { name: SchemaKey, props: any, schema: Schema }[]

export function useTabs(tabField: GeneralField, schema: Schema) {
  const schemaList = schema.mapProperties((item, name) => ({
    name,
    props: {
      name: item?.['x-component-props']?.name || name,
      ...item?.['x-component-props'],
    },
    schema: item,
  }))

  const tabs: Tabs = schemaList.filter((item) => {
    const field = tabField.query(tabField.address.concat(item.name)).take()
    const isHidden = field?.display === 'none' || field?.display === 'hidden'
    if (isHidden)
      return false
    return item?.schema?.['x-component']?.includes('TabPane') ?? false
  })

  return tabs
}
