<script setup lang="ts">
import type { HTMLAttributes, VNodeChild } from 'vue'
import type { IAccordion, IAccordionProps } from './utils'
import { Minus, Plus } from '@lucide/vue'
import { formilyComputed } from '@silver-formily/reactive-vue'
import { RecursionField, useField, useFieldSchema } from '@silver-formily/vue'
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from 'reka-ui'
import { computed, shallowRef, watchEffect } from 'vue'
import { cn, createNamespace } from '@/lib/utils'
import {
  createAccordion,
  normalizeAccordionValue,
  stringifyAccordionKey,
  usePanels,
} from './utils'

defineOptions({
  name: 'FormilyShadcnAccordion',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<IAccordionProps & {
  class?: HTMLAttributes['class']
  disabled?: boolean
  unmountOnHide?: boolean
}>(), {
  collapsible: true,
  type: 'multiple',
})

const field = useField()
const schema = useFieldSchema()
const { b } = createNamespace('formily-shadcn-accordion')
const panels = formilyComputed(() => usePanels(field.value, schema.value))
const fallbackAccordionRef = shallowRef(createAccordion())
const accordionRef = computed<IAccordion>(() => props.accordion ?? fallbackAccordionRef.value)
const accordionActiveKeysRef = formilyComputed(() => accordionRef.value.activeKeys)
const isModelControlledRef = computed(() => props.activeKey !== undefined || accordionActiveKeysRef.value !== undefined)
const shouldSyncAccordionRef = computed(() => props.accordion !== undefined)
const defaultValueRef = computed(() => normalizeAccordionValue(takeDefaultActiveKeys(), props.type))
const modelValueRef = computed(() => {
  return isModelControlledRef.value ? normalizeAccordionValue(takeActiveKeys(), props.type) : undefined
})

watchEffect(() => {
  accordionRef.value.setPanelKeys(panels.value.map(item => item.name))
})

function takeActiveKeys() {
  if (props.activeKey !== undefined)
    return props.activeKey

  if (accordionActiveKeysRef.value !== undefined)
    return accordionActiveKeysRef.value

  const defaultKeys = panels.value.map(item => item.name)
  return props.type === 'single' ? defaultKeys[0] : defaultKeys
}

function takeDefaultActiveKeys() {
  const defaultKeys = panels.value.map(item => item.name)
  return props.type === 'single' ? defaultKeys[0] : defaultKeys
}

function handleUpdateModelValue(value: string | string[] | undefined) {
  if (!shouldSyncAccordionRef.value)
    return

  if (props.type === 'single') {
    accordionRef.value.setActiveKeys(value)
    return
  }

  accordionRef.value.setActiveKeys(Array.isArray(value) ? value : [])
}

function renderTitle(itemSchema: Record<string, any>): VNodeChild {
  const contentTitle = itemSchema['x-content']?.title
  if (typeof contentTitle === 'function')
    return contentTitle()
  if (contentTitle !== undefined)
    return contentTitle
  return itemSchema['x-component-props']?.title ?? itemSchema.title
}
</script>

<template>
  <AccordionRoot
    :class="cn(b(), props.class)"
    :collapsible="collapsible"
    :default-value="defaultValueRef"
    :disabled="disabled"
    :model-value="modelValueRef"
    :type="type"
    :unmount-on-hide="unmountOnHide"
    @update:model-value="handleUpdateModelValue"
  >
    <AccordionItem
      v-for="{ props: itemProps, schema: itemSchema, name } of panels"
      :key="itemProps.key"
      :class="b('item')"
      :disabled="itemProps.disabled"
      :unmount-on-hide="itemProps.unmountOnHide"
      :value="stringifyAccordionKey(name)"
    >
      <AccordionHeader :class="b('header')">
        <AccordionTrigger
          :class="b('trigger')"
        >
          <span :class="b('title')">
            <component :is="() => renderTitle(itemSchema)" />
          </span>
          <Plus :class="b('icon', { collapsed: true })" />
          <Minus :class="b('icon', { expanded: true })" />
        </AccordionTrigger>
      </AccordionHeader>
      <AccordionContent
        :class="b('content')"
      >
        <div :class="b('body')">
          <RecursionField :name="name" :schema="itemSchema" />
        </div>
      </AccordionContent>
    </AccordionItem>
  </AccordionRoot>
</template>

<style scoped>
@reference "../../../../styles/globals.css";

.epd-formily-shadcn-accordion {
  @apply w-full;

  &__header {
    @apply flex;
  }

  &__trigger {
    @apply flex flex-1 items-center justify-between py-2 px-5 border-b bg-slate-50 border-slate-200 text-sm font-medium transition-all;
  }

  &__title {
    @apply text-left;
  }

  &__icon {
    @apply size-4 shrink-0 text-muted-foreground transition-transform duration-200;

    &--expanded {
      @apply hidden;
    }
  }

  &__trigger[data-state='open'] &__icon {
    &--collapsed {
      @apply hidden;
    }

    &--expanded {
      @apply block;
    }
  }

  &__content {
    @apply overflow-hidden text-sm;

    &[data-state='closed'] {
      @apply animate-accordion-up;
    }

    &[data-state='open'] {
      @apply animate-accordion-down;
    }
  }

  &__body {
    @apply px-5 pt-4 pb-6;
  }
}
</style>
