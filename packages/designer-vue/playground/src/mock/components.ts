import type { Component } from 'vue'
import Form from './runtime/Form.vue'
import MockButton from './runtime/MockButton.vue'
import MockField from './runtime/MockField.vue'
import MockSection from './runtime/MockSection.vue'

export const componentRegistry: Record<string, Component> = {
  Form,
  MockButton,
  MockField,
  MockSection,
}
