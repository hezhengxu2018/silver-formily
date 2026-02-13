<script setup lang="ts">
import { createForm } from '@formily/core'
import { Field, FormProvider, ObjectField } from '@silver-formily/vue'
import { ElButton, ElInput, ElSpace } from 'element-plus'

const form = createForm()

function addPropertyToField(field: any) {
  const name = form.values.propertyName
  if (name && !form.existValuesIn(`object.${name}`)) {
    field.addProperty(name, '')
    form.deleteValuesIn('propertyName')
  }
}
</script>

<template>
  <FormProvider :form="form">
    <ObjectField name="object">
      <template #default="{ field }">
        <div
          v-for="key in Object.keys(field.value || {})"
          :key="key"
          :style="{ marginBottom: '10px' }"
        >
          <ElSpace>
            <Field :name="key" :component="[ElInput, { placeholder: key }]" />
            <ElButton @click="field.removeProperty(key)">
              Remove
            </ElButton>
          </ElSpace>
        </div>
        <ElSpace>
          <Field
            name="propertyName"
            base-path=""
            required
            :component="[ElInput, { placeholder: 'Property Name' }]"
          />
          <ElButton @click="addPropertyToField(field)">
            Add
          </ElButton>
        </ElSpace>
      </template>
    </ObjectField>
  </FormProvider>
</template>
