<script setup lang="ts">
import type { VoidField } from '@formily/core'
import type { FormStepSchemaSlots, IFormStepProps } from './types'
import { isValid } from '@formily/shared'
import { RecursionField, useField, useFieldSchema } from '@silver-formily/vue'
import { Step as VanStep, Steps as VanSteps } from 'vant'
import { computed, watch } from 'vue'
import { createNamespace, isVueOptions } from '../__builtins__'
import { createFormStep, parseSteps } from './utils'

defineOptions({
  name: 'FFormStep',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<IFormStepProps>(), {
  formStep: () => createFormStep(),
  hideSteps: false,
})

const field = useField<VoidField>().value
const fieldSchemaRef = useFieldSchema()
const { b, prefixCls } = createNamespace('form-step')
const steps = parseSteps(fieldSchemaRef.value)

props.formStep.connect?.(steps, field)

function normalizeActive(value: number | string, stepCount: number) {
  if (!stepCount)
    return 0

  const parsedValue = Number(value)

  if (!Number.isFinite(parsedValue))
    return 0

  return Math.min(Math.max(Math.trunc(parsedValue), 0), stepCount - 1)
}

watch(() => props.active, (value) => {
  if (!isValid(value)) {
    return
  }

  props.formStep.setCurrent(normalizeActive(value, steps.length))
}, { immediate: true })

const current = computed(() => {
  const nextActive = isValid(props.active)
    ? props.active
    : props.formStep.current

  return normalizeActive(nextActive, steps.length)
})

const stepsClass = b('steps')
const contentClass = b('content')
const titleClass = b('title')

type StepState = 'active' | 'finish' | 'inactive'

interface ResolvedStepContent {
  value: unknown
  isComponent: boolean
}

function isComponentContent(content: unknown) {
  return typeof content === 'function' || isVueOptions(content)
}

function resolveStepContent(slotContent: unknown, propContent: unknown): ResolvedStepContent {
  const value = isValid(slotContent) ? slotContent : propContent

  return {
    value,
    isComponent: isComponentContent(value),
  }
}

function resolveStepTitle(slots: FormStepSchemaSlots | undefined, stepProps: Record<string, any>) {
  return resolveStepContent(slots?.title, stepProps.title)
}

function resolveStepIcon(
  slots: FormStepSchemaSlots | undefined,
  stepProps: Record<string, any>,
  state: StepState,
) {
  if (state === 'active') {
    return resolveStepContent(slots?.activeIcon ?? slots?.icon, stepProps.activeIcon ?? stepProps.icon)
  }

  if (state === 'finish') {
    return resolveStepContent(slots?.finishIcon ?? slots?.icon, stepProps.finishIcon ?? stepProps.icon)
  }

  return resolveStepContent(slots?.inactiveIcon ?? slots?.icon, stepProps.inactiveIcon ?? stepProps.icon)
}

function resolveStepAttrs(stepProps: Record<string, any> = {}) {
  const {
    activeIcon: _activeIcon,
    finishIcon: _finishIcon,
    icon: _icon,
    inactiveIcon: _inactiveIcon,
    title: _title,
    ...attrs
  } = stepProps

  return attrs
}

const renderedSteps = computed(() => {
  return steps.map(({ name, props: stepProps = {}, schema, slots }, key) => {
    return {
      key: String(name) || key,
      name,
      schema,
      attrs: resolveStepAttrs(stepProps),
      title: resolveStepTitle(slots, stepProps),
      activeIcon: resolveStepIcon(slots, stepProps, 'active'),
      finishIcon: resolveStepIcon(slots, stepProps, 'finish'),
      inactiveIcon: resolveStepIcon(slots, stepProps, 'inactive'),
    }
  })
})
</script>

<template>
  <div :class="prefixCls">
    <VanSteps
      v-if="!props.hideSteps"
      v-bind="$attrs"
      :active="current"
      :class="stepsClass"
    >
      <VanStep
        v-for="step in renderedSteps"
        :key="step.key"
        v-bind="step.attrs"
      >
        <template
          v-if="isValid(step.activeIcon.value)"
          #active-icon
        >
          <component
            :is="step.activeIcon.value"
            v-if="step.activeIcon.isComponent"
          />
          <template v-else>
            {{ step.activeIcon.value }}
          </template>
        </template>

        <template
          v-if="isValid(step.finishIcon.value)"
          #finish-icon
        >
          <component
            :is="step.finishIcon.value"
            v-if="step.finishIcon.isComponent"
          />
          <template v-else>
            {{ step.finishIcon.value }}
          </template>
        </template>

        <template
          v-if="isValid(step.inactiveIcon.value)"
          #inactive-icon
        >
          <component
            :is="step.inactiveIcon.value"
            v-if="step.inactiveIcon.isComponent"
          />
          <template v-else>
            {{ step.inactiveIcon.value }}
          </template>
        </template>

        <div :class="contentClass">
          <div
            v-if="isValid(step.title.value)"
            :class="titleClass"
          >
            <component
              :is="step.title.value"
              v-if="step.title.isComponent"
            />
            <template v-else>
              {{ step.title.value }}
            </template>
          </div>
        </div>
      </VanStep>
    </VanSteps>

    <template v-for="(step, key) in renderedSteps" :key="step.key">
      <RecursionField
        v-if="key === current"
        :name="step.name"
        :schema="step.schema"
      />
    </template>
  </div>
</template>
