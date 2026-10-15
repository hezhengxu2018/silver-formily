import {
  FormButtonGroup,
  FormItem,
  FormLayout,
  Input,
  Submit,
} from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { Dialog } from 'antd-mobile'

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const form = createForm({
  initialValues: {
    username: '张三',
  },
})

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
            onSubmit={async (values) => {
              await sleep(1500)
              Dialog.alert({
                title: '提交结果',
                content: (
                  <pre className="demo-result">
                    {JSON.stringify(values, null, 2)}
                  </pre>
                ),
              })
            }}
          >
            异步提交
          </Submit>
        </FormButtonGroup>
      </FormLayout>
    </FormProvider>
  )
}
