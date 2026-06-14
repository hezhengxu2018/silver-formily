<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import { FormItem, Mention, Submit } from '@silver-formily/element-plus'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm()

const mentionOptions = [
  { value: 'UI Guide', label: 'UI Guide Update', owner: 'Jasmine' },
  { value: 'Performance Research', label: 'Performance Research', owner: 'Kingsley', disabled: true },
  { value: 'Release Checklist', label: 'Release Checklist', owner: 'Mia' },
]

async function log(value: any) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <Field
      name="post"
      title="Update Content"
      :decorator="[FormItem]"
      :component="[Mention, { rows: 3, placeholder: 'Type @ mentions here and customize the dropdown content', options: mentionOptions }]"
      initial-value="@UI Guide now includes the visual specifications. @Release Checklist, please complete the QA entry."
    >
      <template #prefix>
        <span class="mention-prefix">Update</span>
      </template>
      <template #suffix>
        <span class="mention-suffix">⌘ + Enter to Publish</span>
      </template>
      <template #header="{ field }">
        <div class="mention-panel-header">
          Current field: {{ field?.title }}
        </div>
      </template>
      <template #label="{ item, index, field }">
        <div class="mention-option">
          <span class="mention-option__index">{{ index + 1 }}</span>
          <div class="mention-option__body">
            <strong>{{ item.label }}</strong>
            <small>Owner: {{ item.owner }}</small>
            <small v-if="field?.value">Source field value: {{ field?.value.length }}</small>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="mention-panel-footer">
          You can access the field through slots and render rich text content.
        </div>
      </template>
    </Field>
    <Submit style="margin-top: 12px" @submit="log">
      Save
    </Submit>
  </FormProvider>
</template>

<style scoped>
.mention-prefix {
  display: inline-flex;
  align-items: center;
  padding: 0 8px;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.mention-suffix {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.mention-panel-header,
.mention-panel-footer {
  font-size: 12px;
  padding: 4px 8px;
  color: var(--vp-c-text-2);
}

.mention-option {
  display: flex;
  gap: 8px;
  align-items: center;
}

.mention-option__index {
  width: 20px;
  height: 20px;
  border-radius: 999px;
  background-color: var(--vp-c-bg-soft);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.mention-option__body {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.mention-option__body strong {
  color: var(--vp-c-text-1);
}

.mention-option__body small {
  font-size: 11px;
}
</style>



