import type { DesignerMaterialDefinition, DesignerSchemaNode } from '@silver-formily/designer-core'

type PropTypeName = 'array' | 'boolean' | 'number' | 'object' | 'string'

interface PropOption {
  name: string
  title: string
  type: PropTypeName
  setter?: string
}

interface MaterialOptions {
  name: string
  title?: string
  group: string
  runtimeComponent?: string
  description: string
  iconName: string
  props?: Record<string, any>
  propOptions?: PropOption[]
  children?: DesignerSchemaNode[]
  designer?: Record<string, any>
}

const defaultOptions = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
]

const defaultTreeData = [
  {
    label: 'Node 1',
    value: 'node-1',
    children: [
      { label: 'Node 1-1', value: 'node-1-1' },
    ],
  },
  { label: 'Node 2', value: 'node-2' },
]

const textProps: PropOption[] = [
  { name: 'placeholder', title: 'Placeholder', type: 'string', setter: 'StringSetter' },
  { name: 'clearable', title: 'Clearable', type: 'boolean', setter: 'BooleanSetter' },
  { name: 'disabled', title: 'Disabled', type: 'boolean', setter: 'BooleanSetter' },
  { name: 'readonly', title: 'Readonly', type: 'boolean', setter: 'BooleanSetter' },
]

const optionProps: PropOption[] = [
  { name: 'placeholder', title: 'Placeholder', type: 'string', setter: 'StringSetter' },
  { name: 'clearable', title: 'Clearable', type: 'boolean', setter: 'BooleanSetter' },
  { name: 'disabled', title: 'Disabled', type: 'boolean', setter: 'BooleanSetter' },
  { name: 'options', title: 'Options', type: 'array', setter: 'ArraySetter' },
]

const dataProps: PropOption[] = [
  { name: 'data', title: 'Data', type: 'array', setter: 'ArraySetter' },
  { name: 'disabled', title: 'Disabled', type: 'boolean', setter: 'BooleanSetter' },
]

function makePropsSchema(props: PropOption[] = []) {
  return Object.fromEntries(
    props.map(prop => [
      prop.name,
      {
        type: prop.type,
        title: prop.title,
      },
    ]),
  )
}

function makeSetters(props: PropOption[] = []) {
  return props
    .filter(prop => prop.setter)
    .map(prop => ({
      name: prop.name,
      component: prop.setter,
    }))
}

function defineMaterial(options: MaterialOptions): DesignerMaterialDefinition {
  const {
    name,
    title = name,
    group,
    runtimeComponent = name,
    description,
    iconName,
    props = {},
    propOptions = [],
    children,
    designer,
  } = options

  return {
    name,
    title,
    group,
    runtimeComponent,
    previewComponent: name,
    defaultNode: {
      componentName: runtimeComponent,
      title,
      props,
      children,
      metadata: {
        designer,
      },
    },
    propsSchema: makePropsSchema(propOptions),
    setters: makeSetters(propOptions),
    metadata: {
      description,
      iconName,
    },
  }
}

function containerMaterial(options: Omit<MaterialOptions, 'designer' | 'group'> & { group?: string }) {
  return defineMaterial({
    ...options,
    group: options.group ?? 'Layouts',
    children: [],
    designer: {
      container: true,
      defaultContainer: 'default',
      containers: [{ name: 'default', title: 'Default' }],
    },
  })
}

export const elementPlusFieldMaterials: DesignerMaterialDefinition[] = [
  defineMaterial({
    name: 'Input',
    group: 'Fields',
    description: 'Single line text input',
    iconName: 'Type',
    props: { placeholder: 'Please enter', clearable: false },
    propOptions: textProps,
  }),
  defineMaterial({
    name: 'TextArea',
    title: 'Textarea',
    group: 'Fields',
    runtimeComponent: 'Input.TextArea',
    description: 'Multi-line text input',
    iconName: 'TextCursorInput',
    props: { placeholder: 'Please enter', rows: 3 },
    propOptions: [
      { name: 'placeholder', title: 'Placeholder', type: 'string', setter: 'StringSetter' },
      { name: 'rows', title: 'Rows', type: 'number', setter: 'NumberSetter' },
      { name: 'disabled', title: 'Disabled', type: 'boolean', setter: 'BooleanSetter' },
      { name: 'readonly', title: 'Readonly', type: 'boolean', setter: 'BooleanSetter' },
    ],
  }),
  defineMaterial({
    name: 'Password',
    group: 'Fields',
    description: 'Password input',
    iconName: 'KeyRound',
    props: { placeholder: 'Please enter password', clearable: false },
    propOptions: textProps,
  }),
  defineMaterial({
    name: 'InputNumber',
    title: 'Input Number',
    group: 'Fields',
    description: 'Numeric input with controls',
    iconName: 'Hash',
    props: { min: 0, controlsPosition: 'right' },
    propOptions: [
      { name: 'min', title: 'Min', type: 'number', setter: 'NumberSetter' },
      { name: 'max', title: 'Max', type: 'number', setter: 'NumberSetter' },
      { name: 'step', title: 'Step', type: 'number', setter: 'NumberSetter' },
      { name: 'disabled', title: 'Disabled', type: 'boolean', setter: 'BooleanSetter' },
      { name: 'readonly', title: 'Readonly', type: 'boolean', setter: 'BooleanSetter' },
    ],
  }),
  defineMaterial({
    name: 'Select',
    group: 'Fields',
    description: 'Dropdown option selector',
    iconName: 'ListChecks',
    props: { placeholder: 'Please select', clearable: true, options: defaultOptions },
    propOptions: optionProps,
  }),
  defineMaterial({
    name: 'PickerSelect',
    title: 'Picker Select',
    group: 'Fields',
    description: 'Selector opened by a picker action',
    iconName: 'PanelTopOpen',
    props: { placeholder: 'Please select', options: defaultOptions },
    propOptions: optionProps,
  }),
  defineMaterial({
    name: 'SelectTable',
    title: 'Select Table',
    group: 'Fields',
    description: 'Table backed selector',
    iconName: 'Table2',
    props: { placeholder: 'Please select', dataSource: defaultOptions },
    propOptions: [
      { name: 'placeholder', title: 'Placeholder', type: 'string', setter: 'StringSetter' },
      { name: 'dataSource', title: 'Data Source', type: 'array', setter: 'ArraySetter' },
      { name: 'loading', title: 'Loading', type: 'boolean', setter: 'BooleanSetter' },
    ],
  }),
  defineMaterial({
    name: 'Checkbox',
    group: 'Fields',
    description: 'Single checkbox',
    iconName: 'CheckSquare',
    props: { label: 'Checkbox' },
    propOptions: [
      { name: 'label', title: 'Label', type: 'string', setter: 'StringSetter' },
      { name: 'disabled', title: 'Disabled', type: 'boolean', setter: 'BooleanSetter' },
    ],
  }),
  defineMaterial({
    name: 'CheckboxGroup',
    title: 'Checkbox Group',
    group: 'Fields',
    runtimeComponent: 'Checkbox.Group',
    description: 'Multiple checkbox options',
    iconName: 'ListTodo',
    props: { options: defaultOptions },
    propOptions: optionProps,
  }),
  defineMaterial({
    name: 'Radio',
    group: 'Fields',
    description: 'Single radio option',
    iconName: 'CircleDot',
    props: { label: 'Radio' },
    propOptions: [
      { name: 'label', title: 'Label', type: 'string', setter: 'StringSetter' },
      { name: 'disabled', title: 'Disabled', type: 'boolean', setter: 'BooleanSetter' },
    ],
  }),
  defineMaterial({
    name: 'RadioGroup',
    title: 'Radio Group',
    group: 'Fields',
    runtimeComponent: 'Radio.Group',
    description: 'Exclusive radio options',
    iconName: 'CircleDotDashed',
    props: { options: defaultOptions },
    propOptions: optionProps,
  }),
  defineMaterial({
    name: 'Switch',
    group: 'Fields',
    description: 'Boolean switch',
    iconName: 'ToggleLeft',
    props: { activeText: '', inactiveText: '' },
    propOptions: [
      { name: 'activeText', title: 'Active Text', type: 'string', setter: 'StringSetter' },
      { name: 'inactiveText', title: 'Inactive Text', type: 'string', setter: 'StringSetter' },
      { name: 'disabled', title: 'Disabled', type: 'boolean', setter: 'BooleanSetter' },
      { name: 'readonly', title: 'Readonly', type: 'boolean', setter: 'BooleanSetter' },
    ],
  }),
  defineMaterial({
    name: 'DatePicker',
    title: 'Date Picker',
    group: 'Fields',
    description: 'Date or range picker',
    iconName: 'CalendarDays',
    props: { type: 'date', placeholder: 'Pick a date', clearable: true },
    propOptions: [
      { name: 'type', title: 'Type', type: 'string', setter: 'StringSetter' },
      { name: 'placeholder', title: 'Placeholder', type: 'string', setter: 'StringSetter' },
      { name: 'clearable', title: 'Clearable', type: 'boolean', setter: 'BooleanSetter' },
      { name: 'disabled', title: 'Disabled', type: 'boolean', setter: 'BooleanSetter' },
      { name: 'readonly', title: 'Readonly', type: 'boolean', setter: 'BooleanSetter' },
    ],
  }),
  defineMaterial({
    name: 'DatePickerPanel',
    title: 'Date Picker Panel',
    group: 'Fields',
    description: 'Inline date picker panel',
    iconName: 'CalendarRange',
    props: { type: 'date' },
    propOptions: [
      { name: 'type', title: 'Type', type: 'string', setter: 'StringSetter' },
      { name: 'disabled', title: 'Disabled', type: 'boolean', setter: 'BooleanSetter' },
    ],
  }),
  defineMaterial({
    name: 'TimePicker',
    title: 'Time Picker',
    group: 'Fields',
    description: 'Time picker input',
    iconName: 'Clock',
    props: { placeholder: 'Pick a time', clearable: true },
    propOptions: textProps,
  }),
  defineMaterial({
    name: 'TimeSelect',
    title: 'Time Select',
    group: 'Fields',
    description: 'Time option selector',
    iconName: 'Timer',
    props: { placeholder: 'Pick a time', start: '09:00', step: '00:30', end: '18:00' },
    propOptions: [
      { name: 'placeholder', title: 'Placeholder', type: 'string', setter: 'StringSetter' },
      { name: 'start', title: 'Start', type: 'string', setter: 'StringSetter' },
      { name: 'step', title: 'Step', type: 'string', setter: 'StringSetter' },
      { name: 'end', title: 'End', type: 'string', setter: 'StringSetter' },
      { name: 'disabled', title: 'Disabled', type: 'boolean', setter: 'BooleanSetter' },
    ],
  }),
  defineMaterial({
    name: 'ColorPicker',
    title: 'Color Picker',
    group: 'Fields',
    description: 'Color selection input',
    iconName: 'Palette',
    props: { showAlpha: false },
    propOptions: [
      { name: 'showAlpha', title: 'Show Alpha', type: 'boolean', setter: 'BooleanSetter' },
      { name: 'disabled', title: 'Disabled', type: 'boolean', setter: 'BooleanSetter' },
      { name: 'readonly', title: 'Readonly', type: 'boolean', setter: 'BooleanSetter' },
    ],
  }),
  defineMaterial({
    name: 'ColorPickerPanel',
    title: 'Color Picker Panel',
    group: 'Fields',
    description: 'Inline color picker panel',
    iconName: 'Pipette',
    props: { showAlpha: false },
    propOptions: [
      { name: 'showAlpha', title: 'Show Alpha', type: 'boolean', setter: 'BooleanSetter' },
      { name: 'disabled', title: 'Disabled', type: 'boolean', setter: 'BooleanSetter' },
    ],
  }),
  defineMaterial({
    name: 'Cascader',
    group: 'Fields',
    description: 'Hierarchical option selector',
    iconName: 'GitBranch',
    props: { placeholder: 'Please select', clearable: true, options: defaultTreeData },
    propOptions: optionProps,
  }),
  defineMaterial({
    name: 'TreeSelect',
    title: 'Tree Select',
    group: 'Fields',
    description: 'Tree backed selector',
    iconName: 'Network',
    props: { placeholder: 'Please select', clearable: true, data: defaultTreeData },
    propOptions: [
      { name: 'placeholder', title: 'Placeholder', type: 'string', setter: 'StringSetter' },
      { name: 'clearable', title: 'Clearable', type: 'boolean', setter: 'BooleanSetter' },
      ...dataProps,
    ],
  }),
  defineMaterial({
    name: 'Tree',
    group: 'Fields',
    description: 'Tree data viewer and selector',
    iconName: 'ListTree',
    props: { data: defaultTreeData },
    propOptions: dataProps,
  }),
  defineMaterial({
    name: 'Transfer',
    group: 'Fields',
    description: 'Dual-list transfer selector',
    iconName: 'ArrowLeftRight',
    props: { data: defaultOptions },
    propOptions: dataProps,
  }),
  defineMaterial({
    name: 'Rate',
    group: 'Fields',
    description: 'Rating control',
    iconName: 'Star',
    props: { max: 5, allowHalf: false },
    propOptions: [
      { name: 'max', title: 'Max', type: 'number', setter: 'NumberSetter' },
      { name: 'allowHalf', title: 'Allow Half', type: 'boolean', setter: 'BooleanSetter' },
      { name: 'disabled', title: 'Disabled', type: 'boolean', setter: 'BooleanSetter' },
      { name: 'readonly', title: 'Readonly', type: 'boolean', setter: 'BooleanSetter' },
    ],
  }),
  defineMaterial({
    name: 'Slider',
    group: 'Fields',
    description: 'Range slider',
    iconName: 'SlidersHorizontal',
    props: { min: 0, max: 100 },
    propOptions: [
      { name: 'min', title: 'Min', type: 'number', setter: 'NumberSetter' },
      { name: 'max', title: 'Max', type: 'number', setter: 'NumberSetter' },
      { name: 'step', title: 'Step', type: 'number', setter: 'NumberSetter' },
      { name: 'disabled', title: 'Disabled', type: 'boolean', setter: 'BooleanSetter' },
      { name: 'readonly', title: 'Readonly', type: 'boolean', setter: 'BooleanSetter' },
    ],
  }),
  defineMaterial({
    name: 'Autocomplete',
    group: 'Fields',
    description: 'Text input with suggestions',
    iconName: 'Search',
    props: { placeholder: 'Please enter', clearable: true, options: defaultOptions },
    propOptions: optionProps,
  }),
  defineMaterial({
    name: 'Mention',
    group: 'Fields',
    description: 'Mention input',
    iconName: 'AtSign',
    props: { placeholder: 'Please enter', options: defaultOptions },
    propOptions: optionProps,
  }),
  defineMaterial({
    name: 'InputTag',
    title: 'Input Tag',
    group: 'Fields',
    description: 'Tag input field',
    iconName: 'Tags',
    props: { placeholder: 'Please enter' },
    propOptions: textProps,
  }),
  defineMaterial({
    name: 'Upload',
    group: 'Fields',
    description: 'File upload control',
    iconName: 'UploadCloud',
    props: { action: '#', listType: 'text' },
    propOptions: [
      { name: 'action', title: 'Action', type: 'string', setter: 'StringSetter' },
      { name: 'listType', title: 'List Type', type: 'string', setter: 'StringSetter' },
      { name: 'disabled', title: 'Disabled', type: 'boolean', setter: 'BooleanSetter' },
      { name: 'readonly', title: 'Readonly', type: 'boolean', setter: 'BooleanSetter' },
    ],
  }),
  defineMaterial({
    name: 'Segmented',
    group: 'Fields',
    description: 'Segmented selector',
    iconName: 'PanelTop',
    props: { options: defaultOptions },
    propOptions: optionProps,
  }),
]

export const elementPlusLayoutMaterials: DesignerMaterialDefinition[] = [
  containerMaterial({
    name: 'Form',
    group: 'Layouts',
    description: 'Root form container',
    iconName: 'LayoutTemplate',
    props: { labelWidth: 'auto' },
  }),
  containerMaterial({
    name: 'FormItem',
    title: 'Form Item',
    group: 'Layouts',
    description: 'Form field wrapper',
    iconName: 'PanelTopDashed',
    props: { label: 'Field Label' },
    propOptions: [
      { name: 'label', title: 'Label', type: 'string', setter: 'StringSetter' },
      { name: 'required', title: 'Required', type: 'boolean', setter: 'BooleanSetter' },
    ],
  }),
  containerMaterial({
    name: 'QueryForm',
    title: 'Query Form',
    group: 'Layouts',
    description: 'Search form container',
    iconName: 'SearchCheck',
  }),
  containerMaterial({
    name: 'QueryFormItem',
    title: 'Query Form Item',
    group: 'Layouts',
    description: 'Search form field wrapper',
    iconName: 'ListFilter',
    props: { label: 'Query Label' },
    propOptions: [{ name: 'label', title: 'Label', type: 'string', setter: 'StringSetter' }],
  }),
  containerMaterial({
    name: 'FormLayout',
    title: 'Form Layout',
    group: 'Layouts',
    description: 'Form layout settings wrapper',
    iconName: 'LayoutPanelTop',
    props: { layout: 'vertical' },
    propOptions: [{ name: 'layout', title: 'Layout', type: 'string', setter: 'StringSetter' }],
  }),
  containerMaterial({
    name: 'FormGrid',
    title: 'Form Grid',
    group: 'Layouts',
    description: 'Responsive grid layout',
    iconName: 'Grid2X2',
    props: { minColumns: 1, maxColumns: 3, columnGap: 8, rowGap: 4 },
    propOptions: [
      { name: 'minColumns', title: 'Min Columns', type: 'number', setter: 'NumberSetter' },
      { name: 'maxColumns', title: 'Max Columns', type: 'number', setter: 'NumberSetter' },
      { name: 'columnGap', title: 'Column Gap', type: 'number', setter: 'NumberSetter' },
      { name: 'rowGap', title: 'Row Gap', type: 'number', setter: 'NumberSetter' },
    ],
  }),
  containerMaterial({
    name: 'FormGridColumn',
    title: 'Grid Column',
    group: 'Layouts',
    runtimeComponent: 'FormGrid.GridColumn',
    description: 'Column inside FormGrid',
    iconName: 'Columns3',
    props: { gridSpan: 1 },
    propOptions: [{ name: 'gridSpan', title: 'Grid Span', type: 'number', setter: 'NumberSetter' }],
  }),
  containerMaterial({
    name: 'Space',
    group: 'Layouts',
    description: 'Element Plus spacing container',
    iconName: 'BetweenHorizontalStart',
    props: { direction: 'horizontal', size: 8 },
    propOptions: [
      { name: 'direction', title: 'Direction', type: 'string', setter: 'StringSetter' },
      { name: 'size', title: 'Size', type: 'number', setter: 'NumberSetter' },
    ],
  }),
  containerMaterial({
    name: 'FormTab',
    title: 'Form Tab',
    group: 'Containers',
    description: 'Schema driven tab container',
    iconName: 'PanelTop',
  }),
  containerMaterial({
    name: 'FormCollapse',
    title: 'Form Collapse',
    group: 'Containers',
    description: 'Schema driven collapse panels',
    iconName: 'PanelsTopLeft',
  }),
  containerMaterial({
    name: 'FormStep',
    title: 'Form Step',
    group: 'Containers',
    description: 'Schema driven step container',
    iconName: 'Milestone',
  }),
  containerMaterial({
    name: 'Editable',
    group: 'Containers',
    description: 'Editable display container',
    iconName: 'SquarePen',
  }),
  containerMaterial({
    name: 'EditablePopover',
    title: 'Editable Popover',
    group: 'Containers',
    runtimeComponent: 'Editable.Popover',
    description: 'Editable popover container',
    iconName: 'MessageSquareMore',
  }),
]

export const elementPlusArrayMaterials: DesignerMaterialDefinition[] = [
  containerMaterial({
    name: 'ArrayItems',
    title: 'Array Items',
    group: 'Arrays',
    description: 'Sortable array item list',
    iconName: 'List',
  }),
  containerMaterial({
    name: 'ArrayCards',
    title: 'Array Cards',
    group: 'Arrays',
    description: 'Array item cards',
    iconName: 'PanelsTopLeft',
  }),
  containerMaterial({
    name: 'ArrayCollapse',
    title: 'Array Collapse',
    group: 'Arrays',
    description: 'Array items in collapse panels',
    iconName: 'ListCollapse',
  }),
  containerMaterial({
    name: 'ArrayTabs',
    title: 'Array Tabs',
    group: 'Arrays',
    description: 'Array items in tabs',
    iconName: 'FolderOpen',
  }),
  containerMaterial({
    name: 'ArrayListTabs',
    title: 'Array List Tabs',
    group: 'Arrays',
    description: 'Array list tab navigation',
    iconName: 'FolderTree',
  }),
  containerMaterial({
    name: 'ArrayTable',
    title: 'Array Table',
    group: 'Arrays',
    description: 'Array items in a table',
    iconName: 'TableProperties',
    props: { pagination: true },
    propOptions: [
      { name: 'pagination', title: 'Pagination', type: 'boolean', setter: 'BooleanSetter' },
      { name: 'paginationProps', title: 'Pagination Props', type: 'object', setter: 'ObjectSetter' },
    ],
  }),
]

export const elementPlusActionMaterials: DesignerMaterialDefinition[] = [
  defineMaterial({
    name: 'Submit',
    group: 'Actions',
    description: 'Submit button',
    iconName: 'Send',
    props: { children: 'Submit' },
    propOptions: [{ name: 'children', title: 'Text', type: 'string', setter: 'StringSetter' }],
  }),
  defineMaterial({
    name: 'Reset',
    group: 'Actions',
    description: 'Reset button',
    iconName: 'RotateCcw',
    props: { children: 'Reset' },
    propOptions: [{ name: 'children', title: 'Text', type: 'string', setter: 'StringSetter' }],
  }),
  containerMaterial({
    name: 'FormButtonGroup',
    title: 'Form Button Group',
    group: 'Actions',
    description: 'Container for form action buttons',
    iconName: 'PanelBottom',
    children: [
      { componentName: 'Submit', title: 'Submit', props: { children: 'Submit' } },
      { componentName: 'Reset', title: 'Reset', props: { children: 'Reset' } },
    ],
  }),
]

export const elementPlusDesignerMaterials: DesignerMaterialDefinition[] = [
  ...elementPlusFieldMaterials,
  ...elementPlusLayoutMaterials,
  ...elementPlusArrayMaterials,
  ...elementPlusActionMaterials,
].filter(material => !material.runtimeComponent?.includes('.'))
