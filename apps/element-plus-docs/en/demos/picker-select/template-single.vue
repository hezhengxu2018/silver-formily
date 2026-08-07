<script setup lang="tsx">
import { createForm } from '@silver-formily/core'
import { FormDialog, FormItem, PickerSelect, SelectTable, Submit } from '@silver-formily/element-plus'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm()
const people = [
  { id: 101, name: 'Ada Lovelace', team: 'Math' },
  { id: 102, name: 'Grace Hopper', team: 'Compiler' },
  { id: 103, name: 'Linus Torvalds', team: 'Kernel' },
]
const options = people.map(item => ({ label: item.name, value: item.id, raw: item }))

function openPicker({ field }) {
  return FormDialog('Select owner', () => (
    <Field
      name="person"
      component={[SelectTable, { mode: 'single', rowKey: 'id', showAlertToolbar: false, columns: [
        { prop: 'name', label: 'Name' },
        { prop: 'team', label: 'Team' },
      ] }]}
      dataSource={people}
    />
  ))
    .forOpen((dialogForm, next) => {
      dialogForm.setValues({ person: people.find(item => item.id === field?.value) })
      next()
    })
    .open()
    .then((values) => {
      const item = values.person
      return item ? { label: item.name, value: item.id, raw: item } : undefined
    })
}

function log(value: any) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <Field
      name="person"
      title="Owner"
      :decorator="[FormItem]"
      :component="[PickerSelect, { openPicker, clearable: true, placeholder: 'Select owner' }]"
      :initial-value="102"
      :data-source="options"
    />
    <Submit style="margin-top: 16px" @submit="log">
      Submit
    </Submit>
  </FormProvider>
</template>
