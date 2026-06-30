import type { Component } from 'vue'
import MockButton from './runtime/MockButton.vue'
import MockField from './runtime/MockField.vue'
import MockForm from './runtime/MockForm.vue'
import MockSection from './runtime/MockSection.vue'

export const componentRegistry: Record<string, Component> = {
  MockButton,
  MockField,
  MockForm,
  MockSection,
}
