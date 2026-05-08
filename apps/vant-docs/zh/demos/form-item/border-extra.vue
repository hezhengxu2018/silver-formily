<script setup lang="ts">
import { FormItem, Input } from '@silver-formily/vant'
import { reactive } from 'vue'

const values = reactive({
  name: 'silver-formily',
  phone: '13800138000',
  city: 'Hangzhou',
  remark: '说明区会跟着边框一起形成完整的一项',
})
</script>

<template>
  <div class="demo-panel">
    <FormItem
      label="名称"
      border
      extra="这是第一条，观察说明区和下一项之间的边框关系"
    >
      <Input
        v-model="values.name"
        placeholder="请输入名称"
      />
    </FormItem>

    <FormItem
      label="手机"
      border
    >
      <Input
        v-model="values.phone"
        placeholder="请输入手机号"
      />
    </FormItem>

    <FormItem
      label="城市"
      border
    >
      <Input
        v-model="values.city"
        placeholder="请输入城市"
      />
    </FormItem>

    <FormItem
      label="备注"
      extra="这是最后一条，观察底部说明区本身的边框收尾效果"
      border
    >
      <Input
        v-model="values.remark"
        placeholder="请输入备注"
      />
    </FormItem>
  </div>
</template>
