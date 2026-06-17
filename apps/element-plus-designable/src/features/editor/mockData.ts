import { CalendarDays, CheckSquare, Layers3, ListChecks, TextCursorInput, Type } from '@lucide/vue'

export const materialGroups = [
  {
    name: 'Basic fields',
    items: [
      { name: 'Input', icon: Type, description: 'Single line text field' },
      { name: 'Select', icon: ListChecks, description: 'Dropdown options' },
      { name: 'Checkbox', icon: CheckSquare, description: 'Boolean choice' },
      { name: 'DatePicker', icon: CalendarDays, description: 'Date selection' },
    ],
  },
  {
    name: 'Layout',
    items: [
      { name: 'Section', icon: Layers3, description: 'Grouped field block' },
      { name: 'Text', icon: TextCursorInput, description: 'Static content' },
    ],
  },
]

export const canvasFields = [
  { label: 'Full name', type: 'Input', placeholder: 'Please enter full name' },
  { label: 'Status', type: 'Select', placeholder: 'Lead, Qualified, Customer' },
  { label: 'Follow-up date', type: 'DatePicker', placeholder: 'Pick a date' },
]

export const structureNodes = [
  { name: 'Customer Profile', type: 'Form' },
  { name: 'Full name', type: 'Input' },
  { name: 'Status', type: 'Select' },
  { name: 'Follow-up date', type: 'DatePicker' },
]

export const schemaPreview = `{
  "componentName": "Form",
  "title": "Customer Profile",
  "children": [
    {
      "componentName": "Input",
      "title": "Full name",
      "props": {
        "placeholder": "Please enter full name"
      }
    },
    {
      "componentName": "Select",
      "title": "Status"
    }
  ]
}`
