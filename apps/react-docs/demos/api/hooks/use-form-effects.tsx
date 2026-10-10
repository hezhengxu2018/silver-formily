import { createForm, isField, onFieldReact } from '@silver-formily/core'
import { Field, FormConsumer, FormProvider, useFormEffects } from '@silver-formily/react'
import { Form, Input } from 'antd'

function Custom() {
  // 通过 useFormEffects 往当前 Form 注入副作用逻辑，组件卸载时自动清理
  useFormEffects(() => {
    onFieldReact('custom.bb', (field) => {
      if (!isField(field))
        return
      field.value = field.query('.aa').get('value')
    })
  })

  return (
    <>
      <Field
        name="aa"
        decorator={[Form.Item]}
        component={[Input, { placeholder: 'aa' }]}
      />
      <Field
        name="bb"
        decorator={[Form.Item]}
        component={[Input, { placeholder: 'bb' }]}
      />
    </>
  )
}

const form = createForm({
  effects() {
    onFieldReact('custom.aa', (field) => {
      if (!isField(field))
        return
      field.value = field.query('input').get('value')
    })
  },
})

export default function Demo() {
  return (
    <FormProvider form={form}>
      <Field
        name="input"
        decorator={[Form.Item]}
        component={[Input, { placeholder: 'input' }]}
      />
      <Field name="custom" component={[Custom]} />
      <FormConsumer>
        {_form => JSON.stringify(_form.values)}
      </FormConsumer>
    </FormProvider>
  )
}
