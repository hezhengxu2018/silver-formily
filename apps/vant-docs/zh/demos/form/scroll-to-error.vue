<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormItem, Input, Submit } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { Radio, RadioGroup } from 'vant'
import { ref } from 'vue'

type ScrollPosition = 'start' | 'center' | 'end' | 'nearest'

const scrollPosition = ref<ScrollPosition>('center')

const form = createForm({
  values: {
    contact: 'Silver Formily',
    mobile: '13800138000',
    company: '银色科技园',
    routeHint: '从东门进入后直行，在 2 号楼大厅前台登记。',
    landmark: '靠近湖滨公园，旁边有一辆白色咖啡车。',
  },
})

async function handleSubmit(values: typeof form.values) {
  await Prompts.alert(`提交结果\n\n${JSON.stringify(values, null, 2)}`)
}
</script>

<template>
  <p class="demo-tip">
    点击顶部提交按钮后，会自动滚动到第一个报错项。切换单选框可以观察不同的滚动定位位置。
  </p>

  <RadioGroup v-model="scrollPosition" direction="horizontal" shape="dot" class="demo-radios">
    <Radio name="start">
      start
    </Radio>
    <Radio name="center">
      center
    </Radio>
    <Radio name="end">
      end
    </Radio>
    <Radio name="nearest">
      nearest
    </Radio>
  </RadioGroup>

  <Form
    :form="form"
    label-width="5em"
    label-align="left"
    scroll-to-error
    :scroll-to-error-position="scrollPosition"
    :on-auto-submit="handleSubmit"
  >
    <div class="demo-actions">
      <Submit>提交并定位错误</Submit>
    </div>

    <Field
      name="contact"
      title="联系人"
      :validator="{ required: true, message: '请输入联系人' }"
      :decorator="[FormItem]"
      :component="[Input, { placeholder: '请输入联系人' }]"
    />
    <Field
      name="mobile"
      title="联系电话"
      :validator="{ required: true, message: '请输入联系电话' }"
      :decorator="[FormItem]"
      :component="[Input, { placeholder: '请输入联系电话' }]"
    />
    <Field
      name="company"
      title="园区名称"
      :validator="{ required: true, message: '请输入园区名称' }"
      :decorator="[FormItem]"
      :component="[Input, { placeholder: '请输入园区名称' }]"
    />
    <Field
      name="routeHint"
      title="送达提示"
      :validator="{ required: true, message: '请输入送达提示' }"
      :decorator="[
        FormItem,
        {
          labelAlign: 'top',
        },
      ]"
      :component="[Input.TextArea, { rows: 3, placeholder: '描述一下送达路线' }]"
    />
    <Field
      name="landmark"
      title="周边地标"
      :validator="{ required: true, message: '请输入周边地标' }"
      :decorator="[
        FormItem,
        {
          labelAlign: 'top',
        },
      ]"
      :component="[Input.TextArea, { rows: 3, placeholder: '补充一个容易识别的地标' }]"
    />
    <Field
      name="building"
      title="楼栋门牌"
      :validator="{ required: true, message: '请输入楼栋门牌' }"
      :decorator="[FormItem]"
      :component="[Input, { placeholder: '这里默认留空，用于演示自动滚动' }]"
    />
    <Field
      name="detail"
      title="详细地址"
      :validator="{ required: true, message: '请输入详细地址' }"
      :decorator="[
        FormItem,
        {
          labelAlign: 'top',
        },
      ]"
      :component="[Input.TextArea, { rows: 3, placeholder: '继续补充楼层、门禁或收货说明' }]"
    />
  </Form>
</template>

<style scoped>
.demo-tip {
  padding: 12px 16px 0;
  color: var(--van-text-color-2);
  font-size: 13px;
  line-height: 1.6;
}

.demo-radios {
  padding: 12px 16px;
}

.demo-actions {
  padding: 0 16px 12px;
}
</style>
