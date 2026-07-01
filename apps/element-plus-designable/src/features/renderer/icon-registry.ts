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

const paletteIconNameByResourceIcon = {
  ArrayCards: 'card',
  ArrayTable: 'table-form',
  Card: 'card',
  Cascader: 'cascader',
  Checkbox: 'checkbox',
  CheckboxGroup: 'checkbox',
  DatePicker: 'date',
  Form: 'form',
  Input: 'input',
  Number: 'number',
  Password: 'password',
  Radio: 'radio',
  RadioGroup: 'radio',
  Rate: 'rate',
  Select: 'select',
  Slider: 'slider',
  Space: 'flex',
  Switch: 'switch',
  Text: 'title',
  TextArea: 'textarea',
  TimePicker: 'time',
  Transfer: 'transfer',
  TreeSelect: 'tree-select',
  Upload: 'upload',
} as const satisfies Record<string, string>

export function resolvePaletteIconSvg(icon: unknown) {
  if (typeof icon !== 'string')
    return
  const iconName = paletteIconNameByResourceIcon[icon as keyof typeof paletteIconNameByResourceIcon]
  return iconName ? formCreateIcons[iconName] : undefined
}
