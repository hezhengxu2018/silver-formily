<script lang="tsx" setup>
import { createForm } from '@silver-formily/core'
import { FormDialog, FormItem, PickerSelect, SelectTable, Submit } from '@silver-formily/element-plus'
import { createSchemaField, Field, FormProvider } from '@silver-formily/vue'

const people = [{ id: 101, name: 'Ada Lovelace', team: 'Math' }, { id: 102, name: 'Grace Hopper', team: 'Compiler' }]
const options = people.map(item => ({ label: item.name, value: item.id, raw: item }))
function openPicker({ field }) {
  return FormDialog('Select owner', () => <Field name="person" component={[SelectTable, { mode: 'single', rowKey: 'id', showAlertToolbar: false, columns: [{ prop: 'name', label: 'Name' }, { prop: 'team', label: 'Team' }] }]} dataSource={people} />)
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
const form = createForm()
const { SchemaField, SchemaNumberField } = createSchemaField({ components: { FormItem, PickerSelect, SelectTable } })
function log(value: any) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField><SchemaNumberField name="person" title="Owner" x-decorator="FormItem" x-component="PickerSelect" :x-component-props="{ openPicker, clearable: true }" :enum="options" :default="102" /></SchemaField>
    <Submit @submit="log">
      Submit
    </Submit>
  </FormProvider>
</template>
