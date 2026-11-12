import { FormItem, FormLayout, Input } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/react'
import { ConfigProvider, Radio } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { useState } from 'react'

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
  },
})

const form = createForm()

export default function OfficialExample() {
  const [requiredMark, setRequiredMark] = useState(true)
  return (
    <ConfigProvider locale={zhCN}>
      <div style={{ marginBottom: 16 }}>
        Required Mark：
        <Radio.Group
          value={requiredMark}
          onChange={e => setRequiredMark(e.target.value)}
        >
          <Radio.Button value="optional">optional</Radio.Button>
          <Radio.Button value={true}>true</Radio.Button>
          <Radio.Button value={false}>false</Radio.Button>
        </Radio.Group>
      </div>
      <FormProvider form={form}>
        <FormLayout requiredMark={requiredMark}>
          <SchemaField>
            <SchemaField.String
              title="我是必填项"
              required
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              title="我是选填项"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              default="字段不可编辑时，始终隐藏必填/选填标识"
              x-editable={false}
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              title="我是必填项"
              required
              default="不可编辑"
              x-editable={false}
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              title="我是选填项"
              default="不可编辑"
              x-editable={false}
              x-decorator="FormItem"
              x-component="Input"
            />
          </SchemaField>
        </FormLayout>
      </FormProvider>
    </ConfigProvider>
  )
}
