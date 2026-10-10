import { createForm } from '@silver-formily/core'
import {
  createSchemaField,
  ExpressionScope,
  FormProvider,
} from '@silver-formily/react'
import '../../demoStyles.css'

const form = createForm()

// schema 表达式可以读取作用域中的变量，注意表达式需要占满整个属性值
function Text(props: { prefix?: string, text?: string }) {
  return (
    <div className="demoPreview">
      {props.prefix}
      {props.text}
    </div>
  )
}

// scope 的键名需要与表达式中的变量名完全一致
const SchemaField = createSchemaField({
  components: { Text },
})

// 顶层 schema 需要是 object 容器，实际渲染的节点写在 properties 中
const schema = {
  type: 'object',
  properties: {
    text: {
      'type': 'void',
      'x-component': 'Text',
      'x-component-props': { prefix: '读取：', text: '{{ $prefix }}' },
    },
  },
}

export default function Demo() {
  return (
    <FormProvider form={form}>
      {/* 两处 SchemaField 用不同的 name 隔离字段命名空间 */}
      <SchemaField schema={schema} name="global" scope={{ $prefix: '全局作用域' }} />
      {/* ExpressionScope 注入的局部作用域会与外层 scope 合并，同名变量取局部值 */}
      <ExpressionScope value={{ $prefix: '局部作用域' }}>
        <SchemaField schema={schema} name="local" />
      </ExpressionScope>
    </FormProvider>
  )
}
