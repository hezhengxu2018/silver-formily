<script setup lang="tsx">
import { createForm } from '@formily/core'
import { observer } from '@silver-formily/reactive-vue'
import { Field, FormProvider, useForm } from '@silver-formily/vue'
import { ElInput, ElSpace } from 'element-plus'
import { defineComponent } from 'vue'

const Custom = observer(
  defineComponent({
    name: 'Custom',
    setup() {
      const formRef = useForm()
      return () => (
        <div>
          {formRef.value?.values.input}
        </div>
      )
    },
  }),
)

const form = createForm({ validateFirst: true })
</script>

<template>
  <FormProvider :form="form">
    <ElSpace>
      <Field name="input" :component="[ElInput]" />
      <Field name="custom" :component="[Custom]" />
    </ElSpace>
  </FormProvider>
</template>
