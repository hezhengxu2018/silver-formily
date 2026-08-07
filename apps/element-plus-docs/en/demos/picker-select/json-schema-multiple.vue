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
  const selectedIds = Array.isArray(field?.value) ? field.value : []
  return FormDialog('Select members', () => (
    <Field
      name="people"
      component={[SelectTable, { mode: 'multiple', rowKey: 'id', optionAsValue: true, columns: [{ prop: 'name', label: 'Name' }, { prop: 'team', label: 'Team' }] }]}
      dataSource={people}
    />
  ))
    .forOpen((dialogForm, next) => {
      dialogForm.setValues({ people: people.filter(item => selectedIds.includes(item.id)) })
      next()
    })
    .open()
    .then(values => values.people.map(item => ({ label: item.name, value: item.id, raw: item })))
}
const schema = { type: 'object', properties: { people: {
  'type': 'array',
  'title': 'Members',
  'items': { type: 'string' },
  'enum': options,
  'default': ['u1', 'u2'],
  'x-decorator': 'FormItem',
  'x-component': 'PickerSelect',
  'x-component-props': { multiple: true, openPicker, collapseTags: true },
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
