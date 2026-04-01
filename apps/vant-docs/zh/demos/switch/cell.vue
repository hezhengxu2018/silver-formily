<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormButtonGroup, Submit, Switch } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { Cell, CellGroup } from 'vant'
import { showDemoResult } from '../shared'

const form = createForm({
  values: {
    notifyBySms: true,
  },
})
</script>

<template>
  <Form :form="form">
    <CellGroup inset>
      <Cell
        center
        title="短信通知"
        label="打开后将在提交结果外额外发送短信提醒。"
      >
        <template #right-icon>
          <Field
            name="notifyBySms"
            :component="[Switch]"
          />
        </template>
      </Cell>
    </CellGroup>

    <FormButtonGroup>
      <Submit :on-submit="showDemoResult">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
