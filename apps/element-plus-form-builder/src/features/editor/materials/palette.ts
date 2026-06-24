import type { PaletteMaterialGroup, PaletteMaterialItem } from './types'
import { resolvePaletteIconSvg } from './icon-registry'
import { materials } from './materials'

const groupDisplayNameMap: Record<string, string> = {
  Layout: 'Layout 布局组件',
  Input: 'Input 输入组件',
  Scenario: 'Scenario 场景组件',
}

const groupOrder = ['Layout', 'Input', 'Scenario'] as const

const materialMetaMap: Record<string, { displayTitle: string, group: keyof typeof groupDisplayNameMap, order: number }> = {
  Form: { displayTitle: '表单', group: 'Layout', order: 1 },
  FormItem: { displayTitle: '表单项', group: 'Layout', order: 2 },
  FormLayout: { displayTitle: '区块布局表单', group: 'Layout', order: 3 },
  FormGrid: { displayTitle: '网格布局表单', group: 'Layout', order: 4 },
  FormGridColumn: { displayTitle: '网格列', group: 'Layout', order: 5 },
  QueryForm: { displayTitle: '查询表单', group: 'Layout', order: 6 },
  QueryFormItem: { displayTitle: '查询表单项', group: 'Layout', order: 7 },
  Space: { displayTitle: '弹性盒子布局表单', group: 'Layout', order: 8 },
  FormButtonGroup: { displayTitle: '按钮布局', group: 'Layout', order: 9 },
  Submit: { displayTitle: '提交按钮', group: 'Layout', order: 10 },
  Reset: { displayTitle: '重置按钮', group: 'Layout', order: 11 },
  Input: { displayTitle: '输入框', group: 'Input', order: 1 },
  TextArea: { displayTitle: '多行输入框', group: 'Input', order: 2 },
  Autocomplete: { displayTitle: '自动补全输入框', group: 'Input', order: 3 },
  InputTag: { displayTitle: '标签输入框', group: 'Input', order: 4 },
  Mention: { displayTitle: '提及输入框', group: 'Input', order: 5 },
  InputNumber: { displayTitle: '数字输入框', group: 'Input', order: 6 },
  Password: { displayTitle: '密码输入框', group: 'Input', order: 7 },
  Checkbox: { displayTitle: '多选框', group: 'Input', order: 8 },
  CheckboxGroup: { displayTitle: '多选框组', group: 'Input', order: 9 },
  Radio: { displayTitle: '单选框', group: 'Input', order: 10 },
  RadioGroup: { displayTitle: '单选框组', group: 'Input', order: 11 },
  Segmented: { displayTitle: '分段选择器', group: 'Input', order: 12 },
  Select: { displayTitle: '下拉选择框', group: 'Input', order: 13 },
  PickerSelect: { displayTitle: '弹窗选择框', group: 'Input', order: 14 },
  TreeSelect: { displayTitle: '树形选择框', group: 'Input', order: 15 },
  SelectTable: { displayTitle: '选择表格', group: 'Input', order: 16 },
  Cascader: { displayTitle: '级联选择器', group: 'Input', order: 17 },
  Tree: { displayTitle: '树形选择器', group: 'Input', order: 18 },
  Transfer: { displayTitle: '穿梭框', group: 'Input', order: 19 },
  Switch: { displayTitle: '开关', group: 'Input', order: 20 },
  Rate: { displayTitle: '评分', group: 'Input', order: 21 },
  Slider: { displayTitle: '滑块', group: 'Input', order: 22 },
  ColorPicker: { displayTitle: '颜色选择器', group: 'Input', order: 23 },
  ColorPickerPanel: { displayTitle: '颜色面板', group: 'Input', order: 24 },
  DatePicker: { displayTitle: '日期选择器', group: 'Input', order: 25 },
  TimePicker: { displayTitle: '时间选择器', group: 'Input', order: 26 },
  DatePickerPanel: { displayTitle: '日期选择器面板', group: 'Input', order: 27 },
  TimeSelect: { displayTitle: '时间选择', group: 'Input', order: 28 },
  Upload: { displayTitle: '上传', group: 'Input', order: 29 },
  ArrayCards: { displayTitle: '卡片列表', group: 'Scenario', order: 1 },
  ArrayItems: { displayTitle: '自增列表', group: 'Scenario', order: 2 },
  ArrayCollapse: { displayTitle: '自增折叠面板', group: 'Scenario', order: 3 },
  ArrayTable: { displayTitle: '自增表格', group: 'Scenario', order: 4 },
  ArrayTabs: { displayTitle: '自增选项卡', group: 'Scenario', order: 5 },
  ArrayListTabs: { displayTitle: '自增选项卡列表', group: 'Scenario', order: 6 },
  Editable: { displayTitle: '局部编辑器', group: 'Scenario', order: 7 },
  EditablePopover: { displayTitle: '局部编辑弹层', group: 'Scenario', order: 8 },
  FormCollapse: { displayTitle: '折叠面板', group: 'Scenario', order: 9 },
  FormStep: { displayTitle: '分步表单', group: 'Scenario', order: 10 },
  FormTab: { displayTitle: '选项卡表单', group: 'Scenario', order: 11 },
}

function toPaletteMaterial(material: typeof materials[number]): PaletteMaterialItem {
  const metadata = material.metadata ?? {}
  const meta = materialMetaMap[material.name]

  return {
    ...material,
    description: typeof metadata.description === 'string'
      ? metadata.description
      : `${material.title} component`,
    displayTitle: meta?.displayTitle ?? material.title,
    iconName: typeof metadata.iconName === 'string'
      ? metadata.iconName
      : 'Type',
    iconSvg: resolvePaletteIconSvg(material.name),
  }
}

export const materialGroups: PaletteMaterialGroup[] = groupOrder
  .map((groupKey) => {
    const items = materials
      .filter(material => materialMetaMap[material.name]?.group === groupKey)
      .sort((left, right) => (materialMetaMap[left.name]?.order ?? 999) - (materialMetaMap[right.name]?.order ?? 999))
      .map(toPaletteMaterial)

    return {
      name: groupDisplayNameMap[groupKey],
      items,
    }
  })
  .filter(group => group.items.length > 0)
