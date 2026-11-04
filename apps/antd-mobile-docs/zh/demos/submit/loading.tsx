import {
  FormButtonGroup,
  FormItem,
  FormLayout,
  Input,
  Submit,
} from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const form = createForm({
  initialValues: {
    username: '张三',
  },
})

async function onSubmit(values: unknown) {
  await sleep(1500)
  return Prompts.alert(JSON.stringify(values, null, 2))
}

export default function SubmitLoading() {
  return (
    <FormProvider form={form}>
      <FormLayout>
        <Field
          name="username"
          title="用户名"
          required
          decorator={[FormItem]}
          component={[Input]}
        />
        <FormButtonGroup>
          <Submit
            onSubmit={onSubmit}
          >
            异步提交
          </Submit>
        </FormButtonGroup>
      </FormLayout>
    </FormProvider>
  )
}
