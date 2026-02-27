<script setup lang="tsx">
import { FormDialog, FormItem, FormLayout, Input } from '@silver-formily/element-plus'
import { Field } from '@silver-formily/vue'
import { ElButton } from 'element-plus'

function handleOpen() {
  FormDialog('弹框表单', {
    header: ({ reject }) => (
      <div>
        <ElButton onClick={() => reject()}>关闭</ElButton>
        <span>这是标题</span>
      </div>

    ),
    default: () => (
      <FormLayout labelCol={6} wrapperCol={10}>
        <Field
          name="aaa"
          required
          title="输入框1"
          decorator={[FormItem]}
          component={[Input]}
        />
        <Field
          name="bbb"
          required
          title="输入框2"
          decorator={[FormItem]}
          component={[Input]}
        />
        <Field
          name="ccc"
          required
          title="输入框3"
          decorator={[FormItem]}
          component={[Input]}
        />
        <Field
          name="ddd"
          required
          title="输入框4"
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
          取消
        </ElButton>,
        <ElButton loading={form.submitting} onClick={() => resolve('extra')}>extra</ElButton>,
        <ElButton loading={form.submitting} onClick={() => resolve('saveDraft')}>保存草稿</ElButton>,
        <ElButton
          type="primary"
          loading={form.submitting}
          onClick={() => resolve()}
        >
          确定
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
    点击打开表单
  </ElButton>
</template>
