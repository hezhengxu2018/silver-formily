import { createForm } from '@silver-formily/core'
import {
  createSchemaField,
  ExpressionScope,
  FormProvider,
} from '@silver-formily/react'

const form = createForm()

// 自定义容器组件：为子树注入局部表达式作用域
function Container(props: { children?: React.ReactNode }) {
  return (
    <ExpressionScope value={{ $innerScope: 'inner scope value' }}>
      {props.children}
    </ExpressionScope>
  )
}

// schema 表达式可以读取作用域中的变量，注意表达式需要占满整个属性值
function Text(props: { text?: string }) {
  return <div>{props.text}</div>
}

const SchemaField = createSchemaField({
  components: { Container, Text },
})

export default function Demo() {
  return (
    <FormProvider form={form}>
      <SchemaField scope={{ $outerScope: 'outer scope value' }}>
        <SchemaField.Void x-component="Container">
          <SchemaField.Void
            name="div"
            x-component="Text"
            x-component-props={{ text: '{{ $innerScope + \' \' + $outerScope }}' }}
          />
        </SchemaField.Void>
      </SchemaField>
    </FormProvider>
  )
}
