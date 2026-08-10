<script lang="tsx" setup>
import { createForm } from '@silver-formily/core'
import { FormDialog, FormItem, PickerSelect, SelectTable, Submit } from '@silver-formily/element-plus'
import { createSchemaField, Field, FormProvider } from '@silver-formily/vue'

const people = [
  { id: 'u1', name: 'Ada Lovelace', team: 'Math' },
  { id: 'u2', name: 'Grace Hopper', team: 'Compiler' },
  { id: 'u3', name: 'Linus Torvalds', team: 'Kernel' },
]
const options = people.map(item => ({ label: item.name, value: item.id, raw: item }))
function openPicker({ field }) {
  return FormDialog('Select owner', () => <FieldDialog />)
    .forOpen((dialogForm, next) => {
      dialogForm.setValues({ person: field?.value })
      next()
    })
    .open()
    .then((values) => {
      const item = people.find(item => item.id === values.person)
      return item ? { label: item.name, value: item.id, raw: item } : undefined
    })
}
function FieldDialog() {
  return (
    <Field
      name="person"
      component={[SelectTable, { mode: 'single', rowKey: 'id', showAlertToolbar: false, columns: [{ prop: 'name', label: 'Name' }, { prop: 'team', label: 'Team' }] }]}
      dataSource={people}
    />
  )
}
const schema = { type: 'object', properties: { person: {
  'type': 'string',
  'title': 'Owner',
  'enum': options,
  'default': 'u2',
  'x-decorator': 'FormItem',
  'x-component': 'PickerSelect',
  'x-component-props': { openPicker },
} } }
const form = createForm()
const { SchemaField } = createSchemaField({ components: { FormItem, PickerSelect, SelectTable } })
function log(value: any) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" /><Submit @submit="log">
      Submit
    </Submit>
  </FormProvider>
</template>
