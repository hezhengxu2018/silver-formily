<script setup lang="ts">
import { createForm } from '@formily/core'
import { Field } from '@silver-formily/vue'
import { Form, FormButtonGroup, Submit, Switch } from '@sliver/formily-vant'
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
      <Submit @submit="showDemoResult">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
