<script setup lang="ts">
import type { TreeNode } from '@silver-formily/designer-core'
import {
  ElButton,
  ElCascader,
  ElCheckbox,
  ElCheckboxGroup,
  ElDatePicker,
  ElInput,
  ElInputNumber,
  ElOption,
  ElRadio,
  ElRadioGroup,
  ElRate,
  ElSelect,
  ElSlider,
  ElSwitch,
  ElTimePicker,
} from 'element-plus'
import { computed } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  node: TreeNode
}>()

const componentName = computed(() => props.node.componentName)
const placeholder = computed(() => {
  const value = props.node.props?.placeholder
  return typeof value === 'string' ? value : 'Please enter'
})
const optionItems = computed(() => {
  const source = props.node.props?.options
    ?? props.node.props?.dataSource
    ?? props.node.props?.data

  if (!Array.isArray(source))
    return []

  return source.map((item, index) => {
    if (item && typeof item === 'object') {
      return {
        label: String(item.label ?? item.text ?? item.value ?? `Option ${index + 1}`),
        value: item.value ?? item.label ?? `option-${index + 1}`,
      }
    }
    return {
      label: String(item),
      value: item,
    }
  }).slice(0, 4)
})
const checkboxValue = computed(() => optionItems.value.slice(0, 1).map(item => item.value))
const radioValue = computed(() => optionItems.value[0]?.value)
const sliderValue = computed(() => {
  const min = typeof props.node.props?.min === 'number' ? props.node.props.min : 0
  const max = typeof props.node.props?.max === 'number' ? props.node.props.max : 100
  return min + ((max - min) / 3)
})
const rateValue = computed(() => Math.min(typeof props.node.props?.max === 'number' ? props.node.props.max : 5, 3))
const singleLabel = computed(() => String(props.node.props?.label ?? componentName.value))
const isContainer = computed(() => componentName.value === 'Form' || props.node.designerProps?.droppable)
</script>

<template>
  <div
    v-bind="$attrs"
    class="dn-runtime-node"
    :class="{
      'dn-runtime-node--container': isContainer,
      'dn-runtime-node--root': node.isRoot,
    }"
  >
    <template v-if="componentName === 'Input'">
      <ElInput
        model-value=""
        :placeholder="placeholder"
        disabled
      />
    </template>

    <template v-else-if="componentName === 'Input.TextArea'">
      <ElInput
        type="textarea"
        :rows="Number(node.props?.rows ?? 3)"
        model-value=""
        :placeholder="placeholder"
        disabled
      />
    </template>

    <template v-else-if="componentName === 'Password'">
      <ElInput
        type="password"
        model-value=""
        :placeholder="placeholder"
        disabled
        show-password
      />
    </template>

    <template v-else-if="componentName === 'InputNumber'">
      <ElInputNumber
        :model-value="Number(node.props?.min ?? 0)"
        disabled
      />
    </template>

    <template v-else-if="['Select', 'PickerSelect', 'SelectTable'].includes(componentName)">
      <ElSelect
        :model-value="undefined"
        :placeholder="placeholder"
        disabled
      >
        <ElOption
          v-for="item in optionItems"
          :key="String(item.value)"
          :label="item.label"
          :value="item.value"
        />
      </ElSelect>
    </template>

    <template v-else-if="componentName === 'Checkbox'">
      <ElCheckbox
        :model-value="true"
        disabled
      >
        {{ singleLabel }}
      </ElCheckbox>
    </template>

    <template v-else-if="componentName === 'Checkbox.Group'">
      <ElCheckboxGroup
        :model-value="checkboxValue"
        disabled
      >
        <ElCheckbox
          v-for="item in optionItems"
          :key="String(item.value)"
          :value="item.value"
          disabled
        >
          {{ item.label }}
        </ElCheckbox>
      </ElCheckboxGroup>
    </template>

    <template v-else-if="componentName === 'Radio'">
      <ElRadio
        :value="singleLabel"
        :model-value="singleLabel"
        disabled
      >
        {{ singleLabel }}
      </ElRadio>
    </template>

    <template v-else-if="componentName === 'Radio.Group'">
      <ElRadioGroup
        :model-value="radioValue"
        disabled
      >
        <ElRadio
          v-for="item in optionItems"
          :key="String(item.value)"
          :value="item.value"
          disabled
        >
          {{ item.label }}
        </ElRadio>
      </ElRadioGroup>
    </template>

    <template v-else-if="componentName === 'Switch'">
      <ElSwitch
        :model-value="true"
        disabled
      />
    </template>

    <template v-else-if="['DatePicker', 'DatePickerPanel'].includes(componentName)">
      <ElDatePicker
        model-value=""
        :placeholder="placeholder"
        disabled
      />
    </template>

    <template v-else-if="['TimePicker', 'TimeSelect'].includes(componentName)">
      <ElTimePicker
        model-value=""
        :placeholder="placeholder"
        disabled
      />
    </template>

    <template v-else-if="['Cascader', 'TreeSelect'].includes(componentName)">
      <ElCascader
        :model-value="undefined"
        :options="optionItems"
        :placeholder="placeholder"
        disabled
      />
    </template>

    <template v-else-if="componentName === 'Rate'">
      <ElRate
        :model-value="rateValue"
        disabled
      />
    </template>

    <template v-else-if="componentName === 'Slider'">
      <ElSlider
        :model-value="sliderValue"
        disabled
      />
    </template>

    <template v-else-if="componentName === 'Submit'">
      <ElButton
        type="primary"
        disabled
      >
        Submit
      </ElButton>
    </template>

    <template v-else-if="componentName === 'Reset'">
      <ElButton disabled>
        Reset
      </ElButton>
    </template>

    <template v-else-if="isContainer">
      <slot />
      <div
        v-if="node.children.length === 0"
        class="dn-runtime-node__empty"
      >
        Drop components here
      </div>
    </template>

    <template v-else>
      <div class="dn-runtime-node__fallback">
        <strong>{{ componentName }}</strong>
        <span>Preview is not customized yet</span>
      </div>
    </template>
  </div>
</template>

<style scoped>
@reference "../../styles/globals.css";

.dn-runtime-node {
  @apply relative my-2 min-h-10 rounded bg-white px-4 py-3;

  :deep(.el-input),
  :deep(.el-select),
  :deep(.el-cascader),
  :deep(.el-date-editor) {
    @apply w-full;
  }

  &--container {
    @apply min-h-32 border border-slate-200 bg-white/80;
  }

  &--root {
    @apply my-0 min-h-full rounded-none border-0 bg-transparent p-0;
  }

  &__empty {
    @apply min-h-28 border border-dashed border-slate-300 bg-white/80 px-4 py-3 text-sm text-slate-400;
  }

  &__fallback {
    @apply rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500;

    strong {
      @apply block text-slate-900;
    }
  }
}
</style>
