<script>
import { createForm, isVoidField, setValidateLanguage } from '@formily/core'
import {
  connect,
  Field,
  FormConsumer,
  FormProvider,
  mapProps,
} from '@silver-formily/vue'
import { ElFormItem, ElInput } from 'element-plus'

setValidateLanguage('en')

const FormItem = connect(
  ElFormItem,
  mapProps(
    { validateStatus: true, title: 'label', required: true },
    (props, field) => {
      return {
        help: !isVoidField(field)
          ? field.selfErrors.length
            ? field.selfErrors
            : undefined
          : undefined,
        extra: field.description,
      }
    },
  ),
)

export default {
  components: {
    FormProvider,
    FormConsumer,
    Field,
  },
  data() {
    const form = createForm({ validateFirst: true })
    const createPasswordEqualValidate = equalName => (field) => {
      if (
        form.values.confirm_password
        && field.value
        && form.values[equalName] !== field.value
      ) {
        field.selfErrors = ['Password does not match Confirm Password.']
      }
      else {
        field.selfErrors = []
      }
    }
    return {
      FormItem,
      ElInput,
      form,
      createPasswordEqualValidate,
    }
  },
}
</script>

<template>
  <FormProvider :form="form">
    <Field
      name="name"
      title="Name"
      required
      :decorator="[FormItem]"
      :component="[ElInput, { placeholder: 'Please ElInput' }]"
    />
    <Field
      name="password"
      title="Password"
      required
      :decorator="[FormItem]"
      :component="[ElInput, { type: 'password', placeholder: 'Please ElInput' }]"
      :reactions="createPasswordEqualValidate('confirm_password')"
    />
    <Field
      name="confirm_password"
      title="Confirm Password"
      required
      :decorator="[FormItem]"
      :component="[ElInput, { type: 'password', placeholder: 'Please ElInput' }]"
      :reactions="createPasswordEqualValidate('password')"
    />
    <FormConsumer>
      <template #default="{ form: _form }">
        <div style="white-space: pre">
          {{ JSON.stringify(_form.values, null, 2) }}
        </div>
      </template>
    </FormConsumer>
  </FormProvider>
</template>
