import { createForm } from '@silver-formily/core'
import { ArrayField, Field, FormProvider } from '@silver-formily/react'
import { Button, Input, Space } from 'antd'

const form = createForm()

export default function Demo() {
  return (
    <FormProvider form={form}>
      <ArrayField name="array">
        {field => (
          <div>
            {(field.value || []).map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                style={{ marginBottom: 10 }}
              >
                <Space>
                  <Field name={`${index}.value`} component={[Input]} />
                  <Button onClick={() => field.remove(index)}>
                    Remove
                  </Button>
                  <Button onClick={() => field.moveUp(index)}>
                    Move Up
                  </Button>
                  <Button onClick={() => field.moveDown(index)}>
                    Move Down
                  </Button>
                </Space>
              </div>
            ))}
            <Button onClick={() => field.push({ id: Date.now(), value: '' })}>
              Add
            </Button>
          </div>
        )}
      </ArrayField>
    </FormProvider>
  )
}
