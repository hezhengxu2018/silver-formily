<script setup lang="ts">
import { createForm } from '@formily/core'
import { Field, FormConsumer, FormProvider, VoidField } from '@silver-formily/vue'
import { ElButton, ElInput, ElSpace } from 'element-plus'

const form = createForm()
</script>

<template>
  <FormProvider :form="form">
    <ElSpace>
      <VoidField name="layout">
        <Field name="input" :component="[ElInput]" />
      </VoidField>
      <FormConsumer>
        <template #default="{ form: _form }">
          <ElSpace>
            <ElButton
              @click="
                () => {
                  _form
                    .query('layout')
                    .take()
                    .setState((state) => {
                      state.visible = !state.visible
                    })
                }
              "
            >
              {{ form.query('layout').get('visible') ? 'Hide' : 'Show' }}
            </ElButton>
            <div>{{ JSON.stringify(form.values, null, 2) }}</div>
          </ElSpace>
        </template>
      </FormConsumer>
    </ElSpace>
  </FormProvider>
</template>
