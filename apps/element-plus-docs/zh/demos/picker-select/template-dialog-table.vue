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
  return FormDialog('选择成员', () => (
    <Field
      name="users"
      component={[
        SelectTable,
        {
          rowKey: 'id',
          optionAsValue: true,
          columns: [
            { prop: 'name', label: '姓名' },
            { prop: 'team', label: '团队' },
          ],
        },
      ]}
      dataSource={userRows}
    />
  ))
    .forOpen((payload, next) => {
      next({
        ...payload,
        initialValues: {
          users: userRows.filter(item => field?.value?.includes?.(item.id)),
        },
      })
    })
    .open()
    .then(values => values.users.map(item => ({
      label: `${item.name} / ${item.team}`,
      value: item.id,
      raw: item,
    })))
}

function log(value: any) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <Field
      name="users"
      title="成员"
      :decorator="[FormItem]"
      :component="[
        PickerSelect,
        {
          multiple: true,
          clearable: true,
          collapseTags: true,
          collapseTagsTooltip: true,
          openPicker: openUserPicker,
          placeholder: '点击选择成员',
        },
      ]"
      :initial-value="['u1', 'u2', 'u3']"
      :data-source="userOptions"
    />
    <Submit style="margin-top: 16px" @submit="log">
      提交
    </Submit>
  </FormProvider>
</template>
