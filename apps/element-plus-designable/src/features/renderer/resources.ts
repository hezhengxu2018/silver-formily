import type { IBehavior, IResource } from '@silver-formily/designer-core'
import type { DesignableComponent, PaletteResourceGroup, PaletteResourceItem } from './types'
import { DesignableComponents } from './components'
import { resolvePaletteIconSvg } from './icon-registry'

const groupMap: Array<[string, string[]]> = [
  ['输入控件', [
    'Input',
    'Input.TextArea',
    'Password',
    'InputNumber',
    'Rate',
    'Slider',
    'Select',
    'TreeSelect',
    'Cascader',
    'Transfer',
    'Checkbox',
    'Checkbox.Group',
    'Radio',
    'Radio.Group',
    'DatePicker',
    'TimePicker',
    'Upload',
    'Switch',
  ]],
  ['布局组件', [
    'Card',
    'Space',
  ]],
  ['自增组件', [
    'ArrayCards',
    'ArrayTable',
  ]],
  ['展示组件', [
    'Text',
  ]],
]

function getComponentName(resource: IResource) {
  const node = resource.node?.children[0]
  return node?.props?.['x-component'] || node?.componentName
}

function getResourceTitle(resource: IResource) {
  const title = resource.title
  if (!title)
    return getComponentName(resource) || 'Component'
  if (typeof title === 'string')
    return title
  return title['en-US'] || title['zh-CN'] || Object.values(title)[0] || 'Component'
}

function collectResources(components: DesignableComponent[]) {
  return components.flatMap(component => component.Resource ?? [])
}

function collectBehaviors(components: DesignableComponent[]) {
  return components.flatMap(component => component.Behavior ?? [])
}

export const AllResources: IResource[] = collectResources(DesignableComponents)
export const AllBehaviors: IBehavior[] = collectBehaviors(DesignableComponents)

const resourceByComponentName = new Map(
  AllResources.map(resource => [getComponentName(resource), resource]),
)

function createPaletteItem(resource: IResource): PaletteResourceItem | null {
  const sourceId = resource.node?.id
  if (!sourceId)
    return null
  return {
    description: typeof resource.description === 'string' ? resource.description : undefined,
    icon: resource.icon,
    iconSvg: resolvePaletteIconSvg(resource.icon),
    sourceId,
    title: getResourceTitle(resource),
  }
}

export const paletteResourceGroups: PaletteResourceGroup[] = groupMap
  .map(([title, componentNames]) => ({
    items: componentNames
      .map(componentName => resourceByComponentName.get(componentName))
      .filter((resource): resource is IResource => !!resource)
      .map(createPaletteItem)
      .filter((item): item is PaletteResourceItem => !!item),
    name: title,
    title,
  }))
  .filter(group => group.items.length > 0)
