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
  return FormDialog('选择成员', () => <Field name="people" component={[SelectTable, { mode: 'multiple', rowKey: 'id', optionAsValue: true, columns: [{ prop: 'name', label: '姓名' }, { prop: 'team', label: '团队' }] }]} dataSource={people} />)
    .forOpen((dialogForm, next) => {
      dialogForm.setValues({ people: people.filter(item => selectedIds.includes(item.id)) })
      next()
    })
    .open()
    .then(values => values.people.map(item => ({ label: item.name, value: item.id, raw: item })))
}
const form = createForm()
const { SchemaField, SchemaArrayField } = createSchemaField({ components: { FormItem, PickerSelect, SelectTable } })
function log(value: any) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField><SchemaArrayField name="people" title="成员" x-decorator="FormItem" x-component="PickerSelect" :x-component-props="{ multiple: true, openPicker, collapseTags: true }" :enum="options" :default="['u1', 'u2']" /></SchemaField>
    <Submit @submit="log">
      提交
    </Submit>
  </FormProvider>
</template>
