import { createForm } from '@silver-formily/core'
import { FormProvider, ObjectField, observer, useParentForm, VoidField } from '@silver-formily/react'
import { Typography } from 'antd'

// useParentForm 返回最近的 Form 或 ObjectField，方便调用 submit / validate
const Custom = observer(() => {
  const parent = useParentForm()
  return (
    <p>
      <Typography.Text>
        {parent?.displayName}
      </Typography.Text>
    </p>
  )
})

const form = createForm()

export default function Demo() {
  return (
    <FormProvider form={form}>
      <ObjectField name="object">
        <Custom />
      </ObjectField>
      <Custom />
      <VoidField name="void">
        <Custom />
      </VoidField>
    </FormProvider>
  )
}
