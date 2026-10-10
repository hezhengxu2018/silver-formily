import { createForm } from '@silver-formily/core'
import {
  createSchemaField,
  FormProvider,
  RecordsScope,
} from '@silver-formily/react'
import '../../demoStyles.css'

const form = createForm()

const records = [
  { id: 1, name: '张三' },
  { id: 2, name: '李四' },
  { id: 3, name: '王五' },
]

// $records 在 RecordsScope 子树内的 schema 表达式中可用
// 表达式需要占满整个属性值，静态文案拆到其他 props 中
function Text(props: { prefix?: string, text?: string, suffix?: string }) {
  return (
    <div className="demoText">
      {props.prefix}
      {props.text}
      {props.suffix}
    </div>
  )
}

const SchemaField = createSchemaField({
  components: { Text },
})

export default function Demo() {
  return (
    <FormProvider form={form}>
      <RecordsScope getRecords={() => records}>
        <SchemaField
          schema={{
            type: 'object',
            properties: {
              text: {
                'type': 'void',
                'x-component': 'Text',
                'x-component-props': { prefix: '共 ', text: '{{ $records.length }}', suffix: ' 条记录' },
              },
            },
          }}
        />
      </RecordsScope>
    </FormProvider>
  )
}
