import { createForm } from '@silver-formily/core'
import { Field, FormConsumer, FormProvider, VoidField } from '@silver-formily/react'
import { Button, Input, Space } from 'antd'

const form = createForm()

export default function Demo() {
  return (
    <FormProvider form={form}>
      <Space>
        <VoidField name="layout">
          <Field name="input" component={[Input]} />
        </VoidField>
        <FormConsumer>
          {_form => (
            <Space>
              <Button
                onClick={() => {
                  _form
                    .query('layout')
                    .take()
                    ?.setState((state) => {
                      state.visible = !state.visible
                    })
                }}
              >
                {form.query('layout').get('visible') ? 'Hide' : 'Show'}
              </Button>
              <div style={{ whiteSpace: 'pre' }}>
                {JSON.stringify(form.values, null, 2)}
              </div>
            </Space>
          )}
        </FormConsumer>
      </Space>
    </FormProvider>
  )
}
