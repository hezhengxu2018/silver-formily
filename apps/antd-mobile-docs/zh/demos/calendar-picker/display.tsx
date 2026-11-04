import type { ICalendarPickerProps } from '@silver-formily/antd-mobile'
import { CalendarPicker, FormButtonGroup, FormItem, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'

const form = createForm({
  initialValues: {
    editable: ['2026-10-15', '2026-10-18'],
    preview: ['2026-10-15', '2026-10-18'],
  },
})

const displayRender: ICalendarPickerProps['displayRender'] = (value) => {
  if (!value)
    return undefined
  const text = Array.isArray(value) ? value.map(date => String(date).replaceAll('-', '/')).join(' 至 ') : String(value ?? '').replaceAll('-', '/')
  return <span style={{ color: 'var(--adm-color-primary)' }}>{text}</span>
}

function onSubmit(values: unknown) {
  return Prompts.alert(JSON.stringify(values, null, 2))
}

export default function CalendarPickerDisplay() {
  return (
    <FormProvider form={form}>
      <Field
        name="editable"
        title="编辑态"
        decorator={[FormItem]}
        component={[CalendarPicker, { selectionMode: 'range', displayRender }]}
      />
      <Field
        name="preview"
        title="阅读态"
        pattern="readPretty"
        decorator={[FormItem]}
        component={[CalendarPicker, { selectionMode: 'range', displayRender }]}
      />
      <FormButtonGroup>
        <Submit onSubmit={onSubmit}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
