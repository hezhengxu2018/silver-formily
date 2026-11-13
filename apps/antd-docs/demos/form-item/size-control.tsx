import type { Field } from '@silver-formily/core'
import {
  Cascader,
  DatePicker,
  FormItem,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from '@silver-formily/antd'
import { createForm, onFieldChange } from '@silver-formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/react'

const Div = props => <div {...props} />

const SchemaField = createSchemaField({
  components: {
    Input,
    Select,
    Radio,
    DatePicker,
    TreeSelect,
    Cascader,
    Switch,
    InputNumber,
    FormItem,
    Div,
  },
})

const form = createForm({
  values: {
    size: 'default',
  },
  effects: () => {
    onFieldChange('size', ['value'], (field: Field, form) => {
      form.setFieldState('sizeWrap.*', (state) => {
        if (state.decorator[1]) {
          state.decorator[1].size = field.value
        }
      })
    })
  },
})

export default function OfficialExample() {
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.String
          name="size"
          title="尺寸选择"
          x-decorator="FormItem"
          x-component="Radio.Group"
          enum={[
            { value: 'small', label: 'Small' },
            { value: 'default', label: 'Default' },
            { value: 'large', label: 'Large' },
          ]}
        />
        <SchemaField.Void name="sizeWrap" x-component="Div">
          <SchemaField.String
            name="input"
            title="Input"
            x-decorator="FormItem"
            x-component="Input"
            required
          />
          <SchemaField.String
            name="select1"
            title="Multiple Select"
            x-decorator="FormItem"
            x-component="Select"
            enum={[
              {
                label: '选项1',
                value: 1,
              },
              {
                label: '选项2',
                value: 2,
              },
            ]}
            x-component-props={{
              mode: 'multiple',
              placeholder: '请选择',
            }}
            required
          />
          <SchemaField.String
            name="select2"
            title="Select"
            x-decorator="FormItem"
            x-component="Select"
            enum={[
              {
                label: '选项1',
                value: 1,
              },
              {
                label: '选项2',
                value: 2,
              },
            ]}
            x-component-props={{
              placeholder: '请选择',
            }}
            required
          />
          <SchemaField.String
            name="InputNumber"
            title="InputNumber"
            x-decorator="FormItem"
            x-component="InputNumber"
            required
          />
          <SchemaField.Object name="date" title="日期" x-decorator="FormItem" x-component="DatePicker" />
          <SchemaField.String name="tree" title="树选择" x-decorator="FormItem" x-component="TreeSelect" enum={[{ title: '节点', value: 'node' }]} />
          <SchemaField.Array name="path" title="级联" x-decorator="FormItem" x-component="Cascader" enum={[{ label: '地区', value: 'region', children: [{ label: '城市', value: 'city' }] }]} />
          <SchemaField.Boolean name="enabled" title="开关" x-decorator="FormItem" x-component="Switch" />
        </SchemaField.Void>
      </SchemaField>
    </FormProvider>
  )
}
