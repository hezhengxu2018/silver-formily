import { AllSchemas, createSelectOptions } from '../../schemas'

type SettingsSchema = Record<string, any>

function createAccordionSchema(properties: Record<string, any>): SettingsSchema {
  return {
    'settings-accordion': {
      'type': 'void',
      'x-component': 'Accordion',
      'x-component-props': {
        collapsible: true,
        type: 'multiple',
      },
      properties,
    },
  }
}

export function createComponentSchema(
  component?: SettingsSchema,
  decorator: SettingsSchema | false = AllSchemas.FormItem,
) {
  return {
    'component-group': component && {
      'type': 'void',
      'title': '组件属性',
      'x-component': 'Accordion.Item',
      'x-reactions': {
        fulfill: {
          state: {
            visible: '{{!!$form.values["x-component"]}}',
          },
        },
      },
      'properties': {
        'x-component-props': component,
      },
    },
    'decorator-group': decorator && {
      'type': 'void',
      'title': '容器属性',
      'x-component': 'Accordion.Item',
      'x-reactions': {
        fulfill: {
          state: {
            visible: '{{!!$form.values["x-decorator"]}}',
          },
        },
      },
      'properties': {
        'x-decorator-props': decorator,
      },
    },
    'component-style-group': {
      'type': 'void',
      'title': '组件样式',
      'x-component': 'Accordion.Item',
      'x-reactions': {
        fulfill: {
          state: {
            visible: '{{!!$form.values["x-component"]}}',
          },
        },
      },
      'properties': {
        'x-component-props.style': AllSchemas.CSSStyle,
      },
    },
    'decorator-style-group': decorator && {
      'type': 'void',
      'title': '容器样式',
      'x-component': 'Accordion.Item',
      'x-reactions': {
        fulfill: {
          state: {
            visible: '{{!!$form.values["x-decorator"]}}',
          },
        },
      },
      'properties': {
        'x-decorator-props.style': AllSchemas.CSSStyle,
      },
    },
  }
}

export function createFieldSchema(
  component?: SettingsSchema,
  decorator: SettingsSchema | false = AllSchemas.FormItem,
): SettingsSchema {
  return {
    type: 'object',
    properties: createAccordionSchema({
      'field-group': {
        'type': 'void',
        'title': '字段属性',
        'x-component': 'Accordion.Item',
        'properties': {
          'name': {
            'type': 'string',
            'title': '字段标识',
            'required': true,
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
              clearable: true,
            },
            'x-validator': [
              { required: true, message: '字段标识不能为空' },
              '{{ $validateNodeName }}',
            ],
          },
          'title': {
            'type': 'string',
            'title': '标题',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
              clearable: true,
            },
          },
          'description': {
            'type': 'string',
            'title': '描述',
            'x-decorator': 'FormItem',
            'x-component': 'Input.TextArea',
            'x-component-props': {
              rows: 2,
            },
          },
          'x-display': {
            'default': 'visible',
            'type': 'string',
            'title': '展示状态',
            'enum': createSelectOptions(['visible', 'hidden', 'none', '']),
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            'x-component-props': {
              clearable: true,
            },
          },
          'x-pattern': {
            'default': 'editable',
            'type': 'string',
            'title': '交互模式',
            'enum': createSelectOptions(['editable', 'disabled', 'readOnly', 'readPretty', '']),
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            'x-component-props': {
              clearable: true,
            },
          },
          'required': {
            'type': 'boolean',
            'title': '必填',
            'x-decorator': 'FormItem',
            'x-component': 'Switch',
          },
        },
      },
      ...createComponentSchema(component, decorator),
    }),
  }
}

export function createVoidFieldSchema(
  component?: SettingsSchema,
  decorator: SettingsSchema | false = AllSchemas.FormItem,
): SettingsSchema {
  return {
    type: 'object',
    properties: createAccordionSchema({
      'field-group': {
        'type': 'void',
        'title': '节点属性',
        'x-component': 'Accordion.Item',
        'properties': {
          'name': {
            'type': 'string',
            'title': '节点标识',
            'required': true,
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
              clearable: true,
            },
            'x-validator': [
              { required: true, message: '节点标识不能为空' },
              '{{ $validateNodeName }}',
            ],
          },
          'title': {
            'type': 'string',
            'title': '标题',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
              clearable: true,
            },
          },
          'description': {
            'type': 'string',
            'title': '描述',
            'x-decorator': 'FormItem',
            'x-component': 'Input.TextArea',
            'x-component-props': {
              rows: 2,
            },
          },
          'x-display': {
            'default': 'visible',
            'type': 'string',
            'title': '展示状态',
            'enum': createSelectOptions(['visible', 'hidden', 'none', '']),
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            'x-component-props': {
              clearable: true,
            },
          },
          'x-pattern': {
            'default': 'editable',
            'type': 'string',
            'title': '交互模式',
            'enum': createSelectOptions(['editable', 'disabled', 'readOnly', 'readPretty', '']),
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            'x-component-props': {
              clearable: true,
            },
          },
        },
      },
      ...createComponentSchema(component, decorator),
    }),
  }
}
