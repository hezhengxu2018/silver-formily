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
import { createNamespace } from '@/lib/utils'

const props = defineProps<{
  node: TreeNode
}>()

const { b, prefixCls } = createNamespace('designer-node-preview')

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

  return source
    .map((item, index) => {
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
    })
    .slice(0, 4)
})

const checkboxValue = computed(() => optionItems.value.slice(0, 1).map(item => item.value))
const radioValue = computed(() => optionItems.value[0]?.value)
const sliderValue = computed(() => {
  const min = typeof props.node.props?.min === 'number' ? props.node.props.min : 0
  const max = typeof props.node.props?.max === 'number' ? props.node.props.max : 100
  return min + ((max - min) / 3)
})
const rateValue = computed(() => {
  const max = typeof props.node.props?.max === 'number' ? props.node.props.max : 5
  return Math.min(max, 3)
})
const singleLabel = computed(() => String(props.node.props?.label ?? componentName.value))
const genericTitle = computed(() => String(props.node.props?.children ?? componentName.value))
</script>

<template>
  <div :class="prefixCls">
    <ElInput
      v-if="componentName === 'Input'"
      :class="b('control')"
      model-value=""
      :placeholder="placeholder"
      disabled
    />

    <ElInput
      v-else-if="componentName === 'Input.TextArea'"
      :class="b('control')"
      type="textarea"
      :rows="Number(node.props?.rows ?? 3)"
      model-value=""
      :placeholder="placeholder"
      disabled
    />

    <ElInput
      v-else-if="componentName === 'Password'"
      :class="b('control')"
      type="password"
      model-value=""
      :placeholder="placeholder"
      disabled
      show-password
    />

    <ElInputNumber
      v-else-if="componentName === 'InputNumber'"
      :class="b('control')"
      :model-value="Number(node.props?.min ?? 0)"
      disabled
    />

    <ElSelect
      v-else-if="['Select', 'PickerSelect', 'SelectTable'].includes(componentName)"
      :class="b('control')"
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

    <ElCheckbox
      v-else-if="componentName === 'Checkbox'"
      :model-value="true"
      disabled
    >
      {{ singleLabel }}
    </ElCheckbox>

    <ElCheckboxGroup
      v-else-if="componentName === 'Checkbox.Group'"
      :model-value="checkboxValue"
      :class="b('options')"
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

    <ElRadio
      v-else-if="componentName === 'Radio'"
      :value="singleLabel"
      :model-value="singleLabel"
      disabled
    >
      {{ singleLabel }}
    </ElRadio>

    <ElRadioGroup
      v-else-if="componentName === 'Radio.Group'"
      :model-value="radioValue"
      :class="b('options')"
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

    <ElSwitch
      v-else-if="componentName === 'Switch'"
      :model-value="true"
      disabled
    />

    <ElDatePicker
      v-else-if="['DatePicker', 'DatePickerPanel'].includes(componentName)"
      :class="b('control')"
      model-value=""
      :placeholder="placeholder"
      disabled
    />

    <ElTimePicker
      v-else-if="['TimePicker', 'TimeSelect'].includes(componentName)"
      :class="b('control')"
      model-value=""
      :placeholder="placeholder"
      disabled
    />

    <ElCascader
      v-else-if="['Cascader', 'TreeSelect'].includes(componentName)"
      :class="b('control')"
      :model-value="undefined"
      :options="optionItems"
      :placeholder="placeholder"
      disabled
    />

    <ElRate
      v-else-if="componentName === 'Rate'"
      :model-value="rateValue"
      disabled
    />

    <ElSlider
      v-else-if="componentName === 'Slider'"
      :model-value="sliderValue"
      disabled
    />

    <div
      v-else-if="componentName === 'Transfer'"
      :class="b('transfer')"
    >
      <div :class="b('transfer-pane')">
        <span :class="b('transfer-title')">Source</span>
        <span :class="b('transfer-item')">Option 1</span>
        <span :class="b('transfer-item')">Option 2</span>
      </div>
      <div :class="b('transfer-actions')">
        <span>&gt;</span>
        <span>&lt;</span>
      </div>
      <div :class="b('transfer-pane')">
        <span :class="b('transfer-title')">Target</span>
        <span :class="b('transfer-item')">Option 3</span>
      </div>
    </div>

    <div
      v-else-if="componentName === 'Upload'"
      :class="b('upload')"
    >
      <ElButton disabled>
        Upload file
      </ElButton>
      <span :class="b('caption')">
        Drag files here or click to upload
      </span>
    </div>

    <div
      v-else-if="componentName === 'Segmented'"
      :class="b('segments')"
    >
      <span
        v-for="(item, index) in optionItems.length ? optionItems : [{ label: 'Option 1' }, { label: 'Option 2' }, { label: 'Option 3' }]"
        :key="item.label"
        :class="b('segment', { active: index === 0 })"
      >
        {{ item.label }}
      </span>
    </div>

    <div
      v-else-if="componentName === 'Autocomplete'"
      :class="b('autocomplete')"
    >
      <ElInput
        :class="b('control')"
        model-value=""
        :placeholder="placeholder"
        disabled
      />
      <div :class="b('autocomplete-menu')">
        <span
          v-for="item in optionItems.length ? optionItems : [{ label: 'Suggestion 1' }, { label: 'Suggestion 2' }]"
          :key="item.label"
          :class="b('autocomplete-item')"
        >
          {{ item.label }}
        </span>
      </div>
    </div>

    <div
      v-else-if="['Submit', 'Reset', 'FormButtonGroup'].includes(componentName)"
      :class="b('actions')"
    >
      <ElButton
        type="primary"
        disabled
      >
        {{ genericTitle }}
      </ElButton>
      <ElButton
        v-if="componentName === 'FormButtonGroup'"
        disabled
      >
        Reset
      </ElButton>
    </div>

    <div
      v-else
      :class="b('fallback')"
    >
      <strong :class="b('fallback-title')">
        {{ componentName }}
      </strong>
      <span :class="b('caption')">
        Preview is not customized yet
      </span>
    </div>
  </div>
</template>

<style scoped>
@reference "../../../styles/globals.css";

.epd-designer-node-preview {
  @apply w-full;

  :deep(.el-input),
  :deep(.el-input-number),
  :deep(.el-select),
  :deep(.el-date-editor),
  :deep(.el-cascader) {
    @apply w-full;
  }

  :deep(.el-slider) {
    @apply px-1;
  }

  &__control {
    @apply w-full;
  }

  &__options {
    @apply flex flex-wrap gap-x-6 gap-y-2;
  }

  &__transfer {
    @apply grid grid-cols-[1fr_auto_1fr] items-center gap-3;
  }

  &__transfer-pane {
    @apply rounded-xl border border-slate-200 bg-slate-50 px-3 py-3;
  }

  &__transfer-title {
    @apply mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-slate-400;
  }

  &__transfer-item {
    @apply mt-2 block rounded-lg bg-white px-3 py-2 text-sm text-slate-600 shadow-sm;
  }

  &__transfer-actions {
    @apply flex flex-col gap-2 text-sm font-semibold text-slate-400;
  }

  &__upload {
    @apply flex min-h-28 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/80 px-4 py-5 text-center;
  }

  &__segments {
    @apply inline-flex rounded-xl bg-slate-100 p-1;
  }

  &__segment {
    @apply rounded-lg px-3 py-1.5 text-sm text-slate-500;
  }

  &__segment--active {
    @apply bg-white font-medium text-slate-900 shadow-sm;
  }

  &__autocomplete {
    @apply flex flex-col gap-2;
  }

  &__autocomplete-menu {
    @apply rounded-xl border border-slate-200 bg-slate-50/80 p-2;
  }

  &__autocomplete-item {
    @apply block rounded-lg px-3 py-2 text-sm text-slate-500;
  }

  &__actions {
    @apply flex flex-wrap gap-3;
  }

  &__fallback {
    @apply flex min-h-24 flex-col justify-center rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-4;
  }

  &__fallback-title {
    @apply text-sm font-semibold text-slate-800;
  }

  &__caption {
    @apply mt-2 block text-xs text-slate-400;
  }
}
</style>
