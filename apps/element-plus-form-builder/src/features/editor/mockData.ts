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
