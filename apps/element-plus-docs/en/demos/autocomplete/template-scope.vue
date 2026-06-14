<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import { Autocomplete, FormItem, Submit } from '@silver-formily/element-plus'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm()

const libraryOptions = [
  { value: 'Vue.js', description: 'A lightweight MVVM framework that is easy to get started with' },
  { value: 'React', description: 'A declarative UI library created by Meta' },
  { value: 'Svelte', description: 'A compile-time framework with a small runtime footprint' },
  { value: 'SolidJS', description: 'A fine-grained reactive system' },
  { value: 'Angular', description: 'A comprehensive all-in-one framework' },
]

async function log(value: any) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <Field
      name="library"
      title="Framework Selection"
      :decorator="[FormItem]"
      :component="[
        Autocomplete,
        {
          triggerOnFocus: true,
          placeholder: 'Choose your favorite framework',
          style: { width: '320px' },
        },
      ]"
      :data-source="libraryOptions"
    >
      <template #default="{ item, field }">
        <div class="demo-autocomplete-item">
          <div class="demo-autocomplete-item__meta">
            <strong>{{ item.value }}</strong>
            <span>{{ item.description }}</span>
          </div>
          <span class="demo-autocomplete-item__hint">
            Current value: {{ field?.value?.value ?? 'Not selected' }}
          </span>
        </div>
      </template>
    </Field>
    <Submit style="margin-top: 12px" @submit="log">
      Submit
    </Submit>
  </FormProvider>
</template>

<style scoped>
.demo-autocomplete-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 8px;
}

.demo-autocomplete-item__meta {
  display: flex;
  flex-direction: column;
}

.demo-autocomplete-item__meta strong {
  font-weight: 600;
}

.demo-autocomplete-item__meta span {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.demo-autocomplete-item__hint {
  font-size: 12px;
  color: var(--vp-c-text-3);
}
</style>



