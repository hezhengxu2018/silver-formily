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
  return FormDialog('Select owner', () => (
    <Field name="person" component={[SelectTable, { mode: 'single', rowKey: 'id', optionAsValue: true, showAlertToolbar: false, columns: [{ prop: 'name', label: 'Name' }, { prop: 'team', label: 'Team' }] }]} dataSource={people} />
  ))
    .forOpen((dialogForm, next) => {
      dialogForm.setValues({ person: people.find(item => item.id === field?.value?.id) })
      next()
    })
    .open()
    .then(values => values.person && { label: values.person.name, value: values.person.id, raw: values.person })
}
const schema = { type: 'object', properties: { person: {
  'type': 'object',
  'title': 'Owner',
  'enum': options,
  'default': people[1],
  'x-decorator': 'FormItem',
  'x-component': 'PickerSelect',
  'x-component-props': { optionAsValue: true, valueKey: 'id', openPicker },
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
      Submit full object
    </Submit>
  </FormProvider>
</template>
