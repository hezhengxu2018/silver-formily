<script setup lang="tsx">
import { createForm } from '@formily/core'
import { observer } from '@silver-formily/reactive-vue'
import {
  FormProvider,
  ObjectField,
  useParentForm,
  VoidField,
} from '@silver-formily/vue'
import { ElText } from 'element-plus'
import { defineComponent } from 'vue'

const Custom = observer(
  defineComponent({
    name: 'Custom',
    setup() {
      const formRef = useParentForm()
      return () => (
        <p>
          <ElText>{formRef.value?.displayName}</ElText>
        </p>
      )
    },
  }),
)

const form = createForm()
</script>

<template>
  <FormProvider :form="form">
    <ObjectField name="object">
      <Custom />
    </ObjectField>
    <Custom />
    <VoidField name="void">
      <Custom />
    </VoidField>
  </FormProvider>
</template>
