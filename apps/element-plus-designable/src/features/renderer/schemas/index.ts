type SettingsSchema = Record<string, any>

export function createSelectOptions(values: Array<string | null>) {
  return values.map(value => ({
    label: value === null || value === '' ? '默认' : value,
    value: value ?? '',
  }))
}

const CSSStyle: SettingsSchema = {
  type: 'object',
  properties: {},
}

const FormItem: SettingsSchema = {
  type: 'object',
  properties: {
    tooltip: {
      'type': 'string',
      'title': '提示',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    labelCol: {
      'type': 'number',
      'title': '标签栅格',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
    },
    wrapperCol: {
      'type': 'number',
      'title': '内容栅格',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
    },
    labelWidth: {
      'type': 'number',
      'title': '标签宽度',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
    },
    wrapperWidth: {
      'type': 'number',
      'title': '内容宽度',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
    },
    colon: {
      'type': 'boolean',
      'title': '显示冒号',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    feedbackLayout: {
      'type': 'string',
      'title': '反馈布局',
      'enum': createSelectOptions(['loose', 'terse', 'popover', null]),
      'x-decorator': 'FormItem',
      'x-component': 'Select',
    },
    size: {
      'type': 'string',
      'title': '尺寸',
      'enum': createSelectOptions(['large', 'default', 'small', null]),
      'x-decorator': 'FormItem',
      'x-component': 'Select',
    },
    layout: {
      'type': 'string',
      'title': '布局',
      'enum': createSelectOptions(['vertical', 'horizontal', 'inline', null]),
      'x-decorator': 'FormItem',
      'x-component': 'Select',
    },
    labelAlign: {
      'type': 'string',
      'title': '标签对齐',
      'enum': createSelectOptions(['left', 'right', null]),
      'x-decorator': 'FormItem',
      'x-component': 'Select',
    },
    wrapperAlign: {
      'type': 'string',
      'title': '内容对齐',
      'enum': createSelectOptions(['left', 'right', null]),
      'x-decorator': 'FormItem',
      'x-component': 'Select',
    },
    fullness: {
      'type': 'boolean',
      'title': '宽度撑满',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
  },
}

const Input: SettingsSchema & { TextArea?: SettingsSchema } = {
  type: 'object',
  properties: {
    maxlength: {
      'type': 'number',
      'title': '最大长度',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
    },
    minlength: {
      'type': 'number',
      'title': '最小长度',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
    },
    placeholder: {
      'type': 'string',
      'title': '占位提示',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        clearable: true,
      },
    },
    clearable: {
      'type': 'boolean',
      'title': '可清空',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    prefixIcon: {
      'type': 'string',
      'title': '前缀图标',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    suffixIcon: {
      'type': 'string',
      'title': '后缀图标',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    autofocus: {
      'type': 'boolean',
      'title': '自动聚焦',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    size: {
      'type': 'string',
      'title': '尺寸',
      'enum': createSelectOptions(['large', 'default', 'small', null]),
      'x-decorator': 'FormItem',
      'x-component': 'Select',
    },
  },
}

Input.TextArea = {
  type: 'object',
  properties: {
    ...Input.properties,
    rows: {
      'type': 'number',
      'title': '行数',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
    },
    autosize: {
      'type': 'boolean',
      'title': '自适应高度',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
  },
}

const InputNumber: SettingsSchema = {
  type: 'object',
  properties: {
    min: {
      'type': 'number',
      'title': '最小值',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
    },
    max: {
      'type': 'number',
      'title': '最大值',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
    },
    step: {
      'type': 'number',
      'title': '步进',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
    },
    precision: {
      'type': 'number',
      'title': '精度',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
    },
    controls: {
      'type': 'boolean',
      'title': '显示控制按钮',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    controlsPosition: {
      'type': 'string',
      'title': '控制按钮位置',
      'enum': createSelectOptions(['', 'right']),
      'x-decorator': 'FormItem',
      'x-component': 'Select',
    },
    size: {
      'type': 'string',
      'title': '尺寸',
      'enum': createSelectOptions(['large', 'default', 'small', null]),
      'x-decorator': 'FormItem',
      'x-component': 'Select',
    },
  },
}

const Select: SettingsSchema = {
  type: 'object',
  properties: {
    placeholder: {
      'type': 'string',
      'title': '占位提示',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        clearable: true,
      },
    },
    clearable: {
      'type': 'boolean',
      'title': '可清空',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    multiple: {
      'type': 'boolean',
      'title': '多选',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    filterable: {
      'type': 'boolean',
      'title': '可搜索',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    disabled: {
      'type': 'boolean',
      'title': '禁用',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    size: {
      'type': 'string',
      'title': '尺寸',
      'enum': createSelectOptions(['large', 'default', 'small', null]),
      'x-decorator': 'FormItem',
      'x-component': 'Select',
    },
  },
}

const Switch: SettingsSchema = {
  type: 'object',
  properties: {
    disabled: {
      'type': 'boolean',
      'title': '禁用',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    activeText: {
      'type': 'string',
      'title': '开启文字',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    inactiveText: {
      'type': 'string',
      'title': '关闭文字',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    activeValue: {
      'type': 'string',
      'title': '开启值',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    inactiveValue: {
      'type': 'string',
      'title': '关闭值',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    activeColor: {
      'type': 'string',
      'title': '开启颜色',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    inactiveColor: {
      'type': 'string',
      'title': '关闭颜色',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
  },
}

const Form: SettingsSchema = {
  type: 'object',
  properties: {
    'form-collapse': {
      'type': 'void',
      'x-component': 'Accordion',
      'x-component-props': {
        collapsible: true,
        type: 'multiple',
      },
      'properties': {
        'form-group': {
          'type': 'void',
          'title': '表单属性',
          'x-component': 'Accordion.Item',
          'properties': {
            layout: {
              'type': 'string',
              'title': '布局',
              'enum': createSelectOptions(['vertical', 'horizontal', 'inline']),
              'x-decorator': 'FormItem',
              'x-component': 'Select',
            },
            labelCol: {
              'type': 'number',
              'title': '标签栅格',
              'x-decorator': 'FormItem',
              'x-component': 'InputNumber',
            },
            wrapperCol: {
              'type': 'number',
              'title': '内容栅格',
              'x-decorator': 'FormItem',
              'x-component': 'InputNumber',
            },
            labelAlign: {
              'type': 'string',
              'title': '标签对齐',
              'enum': createSelectOptions(['left', 'right']),
              'x-decorator': 'FormItem',
              'x-component': 'Select',
            },
            wrapperAlign: {
              'type': 'string',
              'title': '内容对齐',
              'enum': createSelectOptions(['left', 'right']),
              'x-decorator': 'FormItem',
              'x-component': 'Select',
            },
            colon: {
              'type': 'boolean',
              'title': '显示冒号',
              'x-decorator': 'FormItem',
              'x-component': 'Switch',
            },
            feedbackLayout: {
              'type': 'string',
              'title': '反馈布局',
              'enum': createSelectOptions(['loose', 'terse', 'popover']),
              'x-decorator': 'FormItem',
              'x-component': 'Select',
            },
            tooltipLayout: {
              'type': 'string',
              'title': '提示布局',
              'enum': createSelectOptions(['icon', 'text']),
              'x-decorator': 'FormItem',
              'x-component': 'Select',
            },
            size: {
              'type': 'string',
              'title': '尺寸',
              'enum': createSelectOptions(['large', 'default', 'small']),
              'x-decorator': 'FormItem',
              'x-component': 'Select',
            },
          },
        },
      },
    },
  },
}

export const AllSchemas = {
  CSSStyle,
  Form,
  FormItem,
  Input,
  InputNumber,
  Select,
  Switch,
}
