<script setup lang="ts">
import type { VoidField } from '@formily/core'
import type { IFormStepProps } from './types'
import { isObj } from '@formily/shared'
import { useObserver } from '@silver-formily/reactive-vue'
import { RecursionField, useField, useFieldSchema } from '@silver-formily/vue'
import { ElStep, ElSteps } from 'element-plus'
import { computed } from 'vue'
import { stylePrefix } from '../__builtins__'
import { createFormStep, parseSteps } from './utils'

defineOptions({
  name: 'FFormStep',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<IFormStepProps>(), {
  formStep: () => createFormStep(),
})

useObserver()

const field = useField<VoidField>().value
const prefixCls = `${stylePrefix}-form-step`
const fieldSchemaRef = useFieldSchema()

const steps = parseSteps(fieldSchemaRef.value)

props.formStep.connect?.(steps, field)

const current = computed(() => props.active ?? props.formStep?.current ?? 0)
</script>

<template>
  <div :class="prefixCls">
    <ElSteps
      v-bind="$attrs"
      :active="current"
      :style="[{ marginBottom: '10px' }]"
    >
      <ElStep
        v-for="({ props: stepProps, slots: stepSlots }, key) of steps"
        :key="key"
        v-bind="stepProps"
      >
        <template v-if="stepSlots?.title" #title>
          <template v-if="isObj(stepSlots.title)">
            <component :is="stepSlots.title" />
          </template>
          <template v-else>
            {{ stepSlots.title }}
          </template>
        </template>
        <template v-if="stepSlots?.icon" #icon>
          <template v-if="isObj(stepSlots.icon)">
            <component :is="stepSlots.icon" />
          </template>
          <template v-else>
            {{ stepSlots.icon }}
          </template>
        </template>
        <template v-if="stepSlots?.description" #description>
          <template v-if="isObj(stepSlots.description)">
            <component :is="stepSlots.description" />
          </template>
          <template v-else>
            {{ stepSlots.description }}
          </template>
        </template>
      </ElStep>
    </ElSteps>

    <template v-for="({ name, schema }, key) of steps" :key="name">
      <RecursionField
        v-if="key === current"
        :name="name"
        :schema="schema"
      />
    </template>
  </div>
</template>
