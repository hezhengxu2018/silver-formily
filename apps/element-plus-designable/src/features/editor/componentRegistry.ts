import type { Component } from 'vue'
import * as SilverElementPlus from '@silver-formily/element-plus'

type ComponentRegistry = Record<string, Component>

function toRegistry(entries: Array<[string, Component | undefined]>): ComponentRegistry {
  return Object.fromEntries(entries.filter((entry): entry is [string, Component] => Boolean(entry[1])))
}

export const componentRegistry: ComponentRegistry = {
  ...SilverElementPlus,
  ...toRegistry([
    ['Input.TextArea', SilverElementPlus.Input?.TextArea],
    ['Checkbox.Group', SilverElementPlus.Checkbox?.Group],
    ['Radio.Group', SilverElementPlus.Radio?.Group],
    ['FormGrid.GridColumn', SilverElementPlus.FormGrid?.GridColumn],
    ['Editable.Popover', SilverElementPlus.Editable?.Popover],
  ]),
}

