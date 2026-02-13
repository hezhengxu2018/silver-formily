<script setup lang="ts">
import { createForm } from '@formily/core'
import { ArrayField, Field, FormProvider } from '@silver-formily/vue'
import { ElButton, ElInput, ElSpace } from 'element-plus'

const form = createForm()
</script>

<template>
  <FormProvider :form="form">
    <ArrayField name="array">
      <template #default="{ field }">
        <div
          v-for="(item, index) in field.value || []"
          :key="`${item.id}-${index}`"
          :style="{ marginBottom: '10px' }"
        >
          <ElSpace>
            <Field :name="`${index}.value`" :component="[ElInput]" />
            <ElButton
              @click="
                () => {
                  field.remove(index)
                }
              "
            >
              Remove
            </ElButton>
            <ElButton
              @click="
                () => {
                  field.moveUp(index)
                }
              "
            >
              Move Up
            </ElButton>
            <ElButton
              @click="
                () => {
                  field.moveDown(index)
                }
              "
            >
              Move Down
            </ElButton>
          </ElSpace>
        </div>
        <ElButton @click="() => field.push({ id: Date.now(), value: '' })">
          Add
        </ElButton>
      </template>
    </ArrayField>
  </FormProvider>
</template>
