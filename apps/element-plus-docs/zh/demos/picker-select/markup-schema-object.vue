<script lang="tsx" setup>
import { createForm } from '@silver-formily/core'
import { FormDialog, FormItem, PickerSelect, SelectTable, Submit } from '@silver-formily/element-plus'
import { createSchemaField, Field, FormProvider } from '@silver-formily/vue'

const people = [{ id: 'u1', name: 'Ada Lovelace', team: 'Math' }, { id: 'u2', name: 'Grace Hopper', team: 'Compiler' }]
const options = people.map(item => ({ label: item.name, value: item.id, raw: item }))
async function openPicker({ field }) {
  const values_1 = await FormDialog('选择负责人', () => <Field name="person" component={[SelectTable, { mode: 'single', rowKey: 'id', optionAsValue: true, showAlertToolbar: false, columns: [{ prop: 'name', label: '姓名' }, { prop: 'team', label: '团队' }] }]} dataSource={people} />)
    .forOpen((dialogForm, next) => {
      dialogForm.setValues({ person: people.find(item => item.id === field?.value?.id) })
      next()
    })
    .open()
  return values_1.person && { label: values_1.person.name, value: values_1.person.id, raw: values_1.person }
}
const form = createForm()
const { SchemaField, SchemaObjectField } = createSchemaField({ components: { FormItem, PickerSelect, SelectTable } })
function log(value: any) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField><SchemaObjectField name="person" title="负责人" x-decorator="FormItem" x-component="PickerSelect" :x-component-props="{ optionAsValue: true, valueKey: 'id', openPicker }" :enum="options" :default="people[1]" /></SchemaField>
    <Submit @submit="log">
      提交完整对象
    </Submit>
  </FormProvider>
</template>
