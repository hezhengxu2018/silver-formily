const formCreateIconModules = import.meta.glob('./icons/form-create/*.svg', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as Record<string, string>

function getIconNameFromPath(filePath: string) {
  return filePath.split('/').pop()?.replace(/\.svg$/, '') ?? filePath
}

export const formCreateIcons = Object.fromEntries(
  Object.entries(formCreateIconModules).map(([filePath, svg]) => [getIconNameFromPath(filePath), svg]),
) as Record<string, string>

export const paletteIconNameByMaterial = {
  ArrayCards: 'card',
  ArrayCollapse: 'collapse',
  ArrayItems: 'subform',
  ArrayListTabs: 'folder',
  ArrayTable: 'table-form',
  ArrayTabs: 'tab',
  Autocomplete: 'search',
  Cascader: 'cascader',
  Checkbox: 'checkbox',
  CheckboxGroup: 'checkbox',
  ColorPicker: 'color',
  ColorPickerPanel: 'color',
  DatePicker: 'date',
  DatePickerPanel: 'calendar',
  Editable: 'edit',
  EditablePopover: 'dialog',
  Form: 'form',
  FormButtonGroup: 'button',
  FormCollapse: 'collapse',
  FormGrid: 'grid',
  FormGridColumn: 'column3',
  FormItem: 'form-item',
  FormLayout: 'layout',
  FormStep: 'step-form',
  FormTab: 'tab',
  Input: 'input',
  InputNumber: 'number',
  InputTag: 'input-tag',
  Mention: 'mention',
  Password: 'password',
  PickerSelect: 'data-select',
  QueryForm: 'form',
  QueryFormItem: 'search',
  Radio: 'radio',
  RadioGroup: 'radio',
  Rate: 'rate',
  Reset: 'refresh',
  Segmented: 'segmented',
  Select: 'select',
  SelectTable: 'data-table',
  Slider: 'slider',
  Space: 'flex',
  Submit: 'button',
  Switch: 'switch',
  TextArea: 'textarea',
  TimePicker: 'time',
  TimeSelect: 'time',
  Transfer: 'transfer',
  Tree: 'tree',
  TreeSelect: 'tree-select',
  Upload: 'upload',
} as const satisfies Record<string, string>

export const approximatedPaletteIcons = {
  ArrayItems: 'subform',
  ArrayListTabs: 'folder',
  Autocomplete: 'search',
  ColorPickerPanel: 'color',
  DatePickerPanel: 'calendar',
  Editable: 'edit',
  EditablePopover: 'dialog',
  FormButtonGroup: 'button',
  PickerSelect: 'data-select',
  QueryForm: 'form',
  QueryFormItem: 'search',
  SelectTable: 'data-table',
  Space: 'flex',
  Submit: 'button',
  TimeSelect: 'time',
} as const satisfies Record<string, string>

const usedPaletteIconNames = new Set<string>(Object.values(paletteIconNameByMaterial))

export const materialsWithoutSuitableFormCreateIcon = [] as string[]

export const unusedFormCreateIconNames = Object.keys(formCreateIcons)
  .filter(iconName => !usedPaletteIconNames.has(iconName))
  .sort((left, right) => left.localeCompare(right))

export function resolvePaletteIconSvg(materialName: string) {
  const iconName = paletteIconNameByMaterial[materialName as keyof typeof paletteIconNameByMaterial]
  return iconName ? formCreateIcons[iconName] ?? formCreateIcons.input : formCreateIcons.input
}
