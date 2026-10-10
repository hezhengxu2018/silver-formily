import type { ObjectField as ObjectFieldType } from '@silver-formily/core'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider, ObjectField } from '@silver-formily/react'
import { Button, Input, Space } from 'antd'

const form = createForm()

function addPropertyToField(field: ObjectFieldType) {
  const name = form.values.propertyName
  if (name && !form.existValuesIn(`object.${name}`)) {
    field.addProperty(name, '')
    form.deleteValuesIn('propertyName')
  }
}

export default function Demo() {
  return (
    <FormProvider form={form}>
      <ObjectField name="object">
        {field => (
          <div>
            {Object.keys(field.value || {}).map(key => (
              <div key={key} style={{ marginBottom: 10 }}>
                <Space>
                  <Field name={key} component={[Input, { placeholder: key }]} />
                  <Button onClick={() => field.removeProperty(key)}>
                    Remove
                  </Button>
                </Space>
              </div>
            ))}
            <Space>
              <Field
                name="propertyName"
                basePath=""
                required
                component={[Input, { placeholder: 'Property Name' }]}
              />
              <Button onClick={() => addPropertyToField(field)}>
                Add
              </Button>
            </Space>
          </div>
        )}
      </ObjectField>
    </FormProvider>
  )
}
