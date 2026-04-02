<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormButtonGroup, FormItem, Signature, Submit } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { showDemoResult } from '../shared'

const form = createForm()

async function showSignatureResult(values: Record<string, string>) {
  const signature = values.signature

  await showDemoResult({
    signature: signature
      ? `${signature.slice(0, 48)}... (${signature.length} chars)`
      : '',
  })
}
</script>

<template>
  <Form :form="form">
    <Field
      name="signature"
      title="请签名"
      description="请在下方签名后点击确认"
      :decorator="[FormItem, {
        labelAlign: 'top',
      }]"
      :component="[Signature]"
    />

    <FormButtonGroup>
      <Submit :on-submit="showSignatureResult">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
