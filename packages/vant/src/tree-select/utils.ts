import type { TreeSelectChild, TreeSelectItem, TreeSelectValue } from './types'

export function resolveTreeSelectSelectedOptions(
  value: TreeSelectValue | undefined,
  items: TreeSelectItem[] = [],
) {
  const values = Array.isArray(value)
    ? value
    : value === undefined || value === null
      ? []
      : [value]
  const selectedChildren: TreeSelectChild[] = []

  for (const item of items) {
    for (const child of item.children ?? []) {
      if (values.includes(child.id)) {
        selectedChildren.push(child)
      }
    }
  }

  return selectedChildren
}

export function formatTreeSelectValue(
  value: TreeSelectValue | undefined,
  items: TreeSelectItem[] = [],
) {
  return resolveTreeSelectSelectedOptions(value, items).map(item => item.text).join('、')
}
