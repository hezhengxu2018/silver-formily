<script setup lang="tsx">
import { createForm } from '@silver-formily/core'
import { FormDialog, FormItem, PickerSelect, SelectTable, Submit } from '@silver-formily/element-plus'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm()

const userRows = [
  { id: 'u1', name: 'Ada Lovelace', team: 'Math' },
  { id: 'u2', name: 'Grace Hopper', team: 'Compiler' },
  { id: 'u3', name: 'Linus Torvalds', team: 'Kernel' },
]

const userOptions = userRows.map(item => ({
  label: `${item.name} / ${item.team}`,
  value: item.id,
  raw: item,
}))

function openUserPicker({ field }) {
  const selectedIds = Array.isArray(field?.value)
    ? field.value.map(item => typeof item === 'object' ? item.id : item)
    : []

  return FormDialog('Select members', () => (
    <Field
      name="users"
      component={[
        SelectTable,
        {
          rowKey: 'id',
          optionAsValue: true,
          columns: [
            { prop: 'name', label: 'Name' },
            { prop: 'team', label: 'Team' },
          ],
        },
      ]}
      dataSource={userRows}
    />
  ))
    .forOpen((dialogForm, next) => {
      dialogForm.setValues({
        users: userRows.filter(item => selectedIds.includes(item.id)),
      })
      next()
    })
    .open()
    .then(values => values.users.map(item => ({
      label: `${item.name} / ${item.team}`,
      value: item.id,
      raw: item,
    })))
}

function log(value: any) {
  console.log('Submitted full user records:', value)
}
</script>

<template>
  <FormProvider :form="form">
    <Field
      name="users"
      title="Members"
      :decorator="[FormItem]"
      :component="[
        PickerSelect,
        {
          multiple: true,
          optionAsValue: true,
          valueKey: 'id',
          clearable: true,
          collapseTags: true,
          openPicker: openUserPicker,
          placeholder: 'Select members and submit full records',
        },
      ]"
      :initial-value="userRows.slice(0, 2)"
      :data-source="userOptions"
    />
    <Submit style="margin-top: 16px" @submit="log">
      Submit full records
    </Submit>
  </FormProvider>
</template>
