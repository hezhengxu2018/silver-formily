<script setup lang="tsx">
import { FormDrawer, FormItem, FormLayout, Input } from '@silver-formily/element-plus'
import { Field } from '@silver-formily/vue'
import { ElButton } from 'element-plus'

function handleOpen() {
  FormDrawer('Drawer Form', {
    header: ({ reject }) => (
      <div>
        <ElButton onClick={() => reject()}>Close</ElButton>
        <span>This is the title</span>
      </div>

    ),
    default: () => (
      <FormLayout labelCol={6} wrapperCol={10}>
        <Field
          name="aaa"
          required
          title="Input 1"
          decorator={[FormItem]}
          component={[Input]}
        />
        <Field
          name="bbb"
          required
          title="Input 2"
          decorator={[FormItem]}
          component={[Input]}
        />
        <Field
          name="ccc"
          required
          title="Input 3"
          decorator={[FormItem]}
          component={[Input]}
        />
        <Field
          name="ddd"
          required
          title="Input 4"
          decorator={[FormItem]}
          component={[Input]}
        />
      </FormLayout>
    ),
    footer: ({ form, resolve, reject }) => {
      return [
        <ElButton
          onClick={() => reject()}
        >
          Cancel
        </ElButton>,
        <ElButton loading={form.submitting} onClick={() => resolve('extra')}>extra</ElButton>,
        <ElButton loading={form.submitting} onClick={() => resolve('saveDraft')}>Save Draft</ElButton>,
        <ElButton
          type="primary"
          loading={form.submitting}
          onClick={() => resolve()}
        >
          Confirm
        </ElButton>,
      ]
    },
  }, ['extra', 'saveDraft'])
    .forOpen((payload, next) => {
      next({
        initialValues: {
          aaa: '123',
        },
      })
    })
    .forConfirm((payload, next) => {
      setTimeout(() => {
        next(payload)
      }, 1000)
    })
    .forExtra((payload, next) => {
      setTimeout(() => {
        console.log('extra')
        next(payload)
      }, 1000)
    })
    .forSaveDraft((payload, next) => {
      setTimeout(() => {
        console.log('saveDraft')
        next(payload)
      }, 1000)
    })
    .forCancel((payload, next) => {
      setTimeout(() => {
        next(payload)
      }, 1000)
    })
    .open()
    .then(console.log)
    .catch(console.error)
}
</script>

<template>
  <ElButton @click="handleOpen">
    Open Form
  </ElButton>
</template>



