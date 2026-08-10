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
async function openPicker({ field }) {
  const values_1 = await FormDialog('选择负责人', () => <FieldDialog />)
    .forOpen((dialogForm, next) => {
      dialogForm.setValues({ person: field?.value })
      next()
    })
    .open()
  const item = people.find(item_1 => item_1.id === values_1.person)
  return item ? { label: item.name, value: item.id, raw: item } : undefined
}
function FieldDialog() {
  return (
    <Field
      name="person"
      component={[SelectTable, { mode: 'single', rowKey: 'id', showAlertToolbar: false, columns: [{ prop: 'name', label: '姓名' }, { prop: 'team', label: '团队' }] }]}
      dataSource={people}
    />
  )
}
const schema = { type: 'object', properties: { person: {
  'type': 'string',
  'title': '负责人',
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
      提交
    </Submit>
  </FormProvider>
</template>
