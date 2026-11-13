import { FormButtonGroup, FormItem, Submit, TreeSelect } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/react'

const SchemaField = createSchemaField({
  components: {
    TreeSelect,
    FormItem,
  },
})

const form = createForm()

export default function Demo() {
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.String
          name="select"
          title="选择框"
          x-decorator="FormItem"
          x-component="TreeSelect"
          enum={[
            {
              label: '选项1',
              value: '1',
              children: [
                {
                  title: 'Child Node1',
                  value: '0-0-0',
                  key: '0-0-0',
                },
                {
                  title: 'Child Node2',
                  value: '0-0-1',
                  key: '0-0-1',
                },
                {
                  title: 'Child Node3',
                  value: '0-0-2',
                  key: '0-0-2',
                },
              ],
            },
            {
              label: '选项2',
              value: '2',
              children: [
                {
                  title: 'Child Node3',
                  value: '0-1-0',
                  key: '0-1-0',
                },
                {
                  title: 'Child Node4',
                  value: '0-1-1',
                  key: '0-1-1',
                },
                {
                  title: 'Child Node5',
                  value: '0-1-2',
                  key: '0-1-2',
                },
              ],
            },
          ]}
          x-component-props={{
            style: {
              width: 200,
            },
          }}
        />
      </SchemaField>
      <FormButtonGroup>
        <Submit onSubmitFailed={console.log} onSubmit={console.log}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
