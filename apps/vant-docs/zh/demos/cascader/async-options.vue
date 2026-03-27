<script setup lang="ts">
import type { DataField } from '@formily/core'
import type { CascaderChangeEvent, CascaderOption } from '@silver-formily/vant'
import { createForm, onFieldInit } from '@formily/core'
import { Cascader, FormItem } from '@silver-formily/vant'
import { Field, FormProvider } from '@silver-formily/vue'
import { closeToast, showLoadingToast } from 'vant'

const asyncChildrenMap: Record<string, CascaderOption[]> = {
  330000: [
    { text: '杭州市', value: '330100' },
    { text: '宁波市', value: '330200' },
  ],
}

function createInitialOptions(): CascaderOption[] {
  return [
    {
      text: '浙江省',
      value: '330000',
      children: [],
    },
  ]
}

function resolveAsyncChildren(value: string | number): CascaderOption[] {
  return (asyncChildrenMap[String(value)] ?? []).map(option => ({ ...option }))
}

const form = createForm({
  effects() {
    onFieldInit('asyncArea', (field: DataField) => {
      field.setDataSource(createInitialOptions())
    })
  },
})

function onChange({ value, field }: CascaderChangeEvent) {
  const currentOptions = Array.isArray(field?.dataSource)
    ? field.dataSource as CascaderOption[]
    : []
  const currentOption = currentOptions[0]

  if (!currentOption || value !== currentOption.value || currentOption.children?.length) {
    return
  }

  showLoadingToast({
    message: '加载中...',
    duration: 0,
    forbidClick: true,
  })

  window.setTimeout(() => {
    const nextOptions = currentOptions.map((option) => {
      if (option.value !== value) {
        return option
      }

      return {
        ...option,
        children: resolveAsyncChildren(value),
      }
    })

    field?.setDataSource(nextOptions)
    closeToast()
  }, 1000)
}
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
      <Field
        name="asyncArea"
        title="异步加载选项"
        :decorator="[FormItem, { isLink: true }]"
        :component="[
          Cascader,
          {
            onChange,
          },
        ]"
      />
    </div>
  </FormProvider>
</template>
