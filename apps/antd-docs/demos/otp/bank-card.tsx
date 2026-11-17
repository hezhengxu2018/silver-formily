import { Form, FormButtonGroup, FormItem, OTP, Reset, Submit } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { Field } from '@silver-formily/react'

const form = createForm()

function onSubmit(values: unknown) {
  return Prompts.alert(JSON.stringify(values, null, 2))
}

function onSubmitFailed(feedbacks: unknown) {
  return Prompts.alert(JSON.stringify(feedbacks, null, 2))
}

export default function Demo() {
  return (
    <Form form={form} layout="vertical">
      <div style={{ overflowX: 'auto' }}>
        <Field
          name="cardNumber"
          title="银行卡号（16 位）"
          required
          validator={{ pattern: '^[0-9]{16}$', message: '请输入完整的 16 位数字卡号' }}
          decorator={[FormItem]}
          component={[
            OTP,
            {
              length: 16,
              inputMode: 'numeric',
              autoComplete: 'cc-number',
              formatter: (value: string) => value.replace(/\D/g, ''),
              separator: (index: number) => (index + 1) % 4 === 0 ? <span>—</span> : null,
              styles: { input: { width: 28 }, root: { gap: 4 } },
            },
          ]}
        />
      </div>
      <FormButtonGroup>
        <Submit onSubmit={onSubmit} onSubmitFailed={onSubmitFailed}>提交</Submit>
        <Reset>重置</Reset>
      </FormButtonGroup>
    </Form>
  )
}
