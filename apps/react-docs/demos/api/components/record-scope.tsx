import { createForm } from '@silver-formily/core'
import {
  createSchemaField,
  FormProvider,
  RecordScope,
  RecordsScope,
} from '@silver-formily/react'
import '../../demoStyles.css'

const form = createForm()

const records = [
  { id: 1, name: '张三' },
  { id: 2, name: '李四' },
]

// schema 表达式中可以通过 $records / $record / $index 读取注入的数据
// 表达式需要占满整个属性值，静态文案拆到其他 props 中
function Text(props: { prefix?: string, text?: string }) {
  return (
    <div className="demoText">
      {props.prefix}
      {props.text}
    </div>
  )
}

const SchemaField = createSchemaField({
  components: { Text },
})

// 顶层 schema 需要是 object 容器，实际渲染的节点写在 properties 中
const itemSchema = {
  type: 'object',
  properties: {
    text: {
      'type': 'void',
      'x-component': 'Text',
      'x-component-props': { prefix: '当前记录：', text: '{{ $record.name }}' },
    },
  },
}

export default function Demo() {
  return (
    <FormProvider form={form}>
      <RecordsScope getRecords={() => records}>
        {records.map((record, index) => (
          <RecordScope key={record.id} getRecord={() => record} getIndex={() => index}>
            {/* name 按行索引隔离，避免多条记录的字段相互覆盖 */}
            <SchemaField schema={itemSchema} name={`item_${index}`} />
          </RecordScope>
        ))}
      </RecordsScope>
    </FormProvider>
  )
}
