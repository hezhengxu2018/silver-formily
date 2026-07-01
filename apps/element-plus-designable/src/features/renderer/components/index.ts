import type { DesignableComponent } from '../types'
import * as ElementPlus from '@silver-formily/element-plus'
import { ElCard } from 'element-plus'
import { defineElementPlusComponent } from './defineElementPlusComponent'
import { Field } from './Field'
import { Form } from './Form'

export { Field, Form }

export const Input = defineElementPlusComponent({
  component: ElementPlus.Input,
  componentName: 'Input',
  defaultProps: { clearable: true, placeholder: 'Please enter' },
  description: 'Single line text input',
  icon: 'Input',
  title: 'Input',
})

export const TextArea = defineElementPlusComponent({
  component: ElementPlus.Input.TextArea,
  componentName: 'Input.TextArea',
  defaultProps: { placeholder: 'Please enter', rows: 3 },
  description: 'Multi-line text input',
  icon: 'TextArea',
  title: 'TextArea',
})

export const Password = defineElementPlusComponent({
  component: ElementPlus.Password,
  componentName: 'Password',
  defaultProps: { clearable: true, placeholder: 'Please enter password' },
  description: 'Password input',
  icon: 'Password',
  title: 'Password',
})

export const InputNumber = defineElementPlusComponent({
  component: ElementPlus.InputNumber,
  componentName: 'InputNumber',
  defaultProps: { controlsPosition: 'right', min: 0 },
  description: 'Numeric input',
  icon: 'Number',
  title: 'Input Number',
  type: 'number',
})

export const Select = defineElementPlusComponent({
  component: ElementPlus.Select,
  componentName: 'Select',
  defaultProps: {
    clearable: true,
    options: [
      { label: 'Option 1', value: 'option-1' },
      { label: 'Option 2', value: 'option-2' },
    ],
    placeholder: 'Please select',
  },
  description: 'Dropdown selector',
  icon: 'Select',
  title: 'Select',
})

export const TreeSelect = defineElementPlusComponent({
  component: ElementPlus.TreeSelect,
  componentName: 'TreeSelect',
  defaultProps: {
    data: [
      { label: 'Node 1', value: 'node-1' },
      { label: 'Node 2', value: 'node-2' },
    ],
    placeholder: 'Please select',
  },
  description: 'Tree selector',
  icon: 'TreeSelect',
  title: 'Tree Select',
})

export const Cascader = defineElementPlusComponent({
  component: ElementPlus.Cascader,
  componentName: 'Cascader',
  defaultProps: { clearable: true, placeholder: 'Please select' },
  description: 'Cascading selector',
  icon: 'Cascader',
  title: 'Cascader',
})

export const Checkbox = defineElementPlusComponent({
  component: ElementPlus.Checkbox,
  componentName: 'Checkbox',
  defaultProps: { label: 'Checkbox' },
  description: 'Single checkbox',
  icon: 'Checkbox',
  title: 'Checkbox',
})

export const CheckboxGroup = defineElementPlusComponent({
  component: ElementPlus.Checkbox.Group,
  componentName: 'Checkbox.Group',
  defaultProps: {
    options: [
      { label: 'Option 1', value: 'option-1' },
      { label: 'Option 2', value: 'option-2' },
    ],
  },
  description: 'Checkbox group',
  icon: 'CheckboxGroup',
  title: 'Checkbox Group',
})

export const Radio = defineElementPlusComponent({
  component: ElementPlus.Radio,
  componentName: 'Radio',
  defaultProps: { label: 'Radio' },
  description: 'Single radio',
  icon: 'Radio',
  title: 'Radio',
})

export const RadioGroup = defineElementPlusComponent({
  component: ElementPlus.Radio.Group,
  componentName: 'Radio.Group',
  defaultProps: {
    options: [
      { label: 'Option 1', value: 'option-1' },
      { label: 'Option 2', value: 'option-2' },
    ],
  },
  description: 'Radio group',
  icon: 'RadioGroup',
  title: 'Radio Group',
})

export const Switch = defineElementPlusComponent({
  component: ElementPlus.Switch,
  componentName: 'Switch',
  description: 'Boolean switch',
  icon: 'Switch',
  title: 'Switch',
  type: 'boolean',
})

export const DatePicker = defineElementPlusComponent({
  component: ElementPlus.DatePicker,
  componentName: 'DatePicker',
  defaultProps: { placeholder: 'Pick a date' },
  description: 'Date picker',
  icon: 'DatePicker',
  title: 'Date Picker',
})

export const TimePicker = defineElementPlusComponent({
  component: ElementPlus.TimePicker,
  componentName: 'TimePicker',
  defaultProps: { placeholder: 'Pick a time' },
  description: 'Time picker',
  icon: 'TimePicker',
  title: 'Time Picker',
})

export const Slider = defineElementPlusComponent({
  component: ElementPlus.Slider,
  componentName: 'Slider',
  description: 'Slider input',
  icon: 'Slider',
  title: 'Slider',
  type: 'number',
})

export const Rate = defineElementPlusComponent({
  component: ElementPlus.Rate,
  componentName: 'Rate',
  description: 'Rating input',
  icon: 'Rate',
  title: 'Rate',
  type: 'number',
})

export const Upload = defineElementPlusComponent({
  component: ElementPlus.Upload,
  componentName: 'Upload',
  description: 'File upload',
  icon: 'Upload',
  title: 'Upload',
})

export const Transfer = defineElementPlusComponent({
  component: ElementPlus.Transfer,
  componentName: 'Transfer',
  defaultProps: { data: [] },
  description: 'Transfer selector',
  icon: 'Transfer',
  title: 'Transfer',
})

export const Text = defineElementPlusComponent({
  component: ElementPlus.PreviewText.Input,
  componentName: 'Text',
  defaultProps: { value: 'Text' },
  description: 'Static text',
  icon: 'Text',
  title: 'Text',
})

export const Card = defineElementPlusComponent({
  component: ElCard,
  componentName: 'Card',
  description: 'Card container',
  icon: 'Card',
  title: 'Card',
})

export const Space = defineElementPlusComponent({
  component: ElementPlus.Space,
  componentName: 'Space',
  description: 'Inline spacing container',
  icon: 'Space',
  title: 'Space',
})

export const ArrayCards = defineElementPlusComponent({
  component: ElementPlus.ArrayCards,
  componentName: 'ArrayCards',
  defaultProps: {},
  description: 'Card list for array fields',
  icon: 'ArrayCards',
  title: 'Array Cards',
  type: 'array',
})

export const ArrayTable = defineElementPlusComponent({
  component: ElementPlus.ArrayTable,
  componentName: 'ArrayTable',
  defaultProps: {},
  description: 'Table list for array fields',
  icon: 'ArrayTable',
  title: 'Array Table',
  type: 'array',
})

export const AllComponents: Record<string, DesignableComponent> = {
  ...ElementPlus,
  Field,
  Form,
  'FormItem': ElementPlus.FormItem,
  Input,
  'Input.TextArea': TextArea,
  Password,
  InputNumber,
  Select,
  TreeSelect,
  Cascader,
  Checkbox,
  'Checkbox.Group': CheckboxGroup,
  Radio,
  'Radio.Group': RadioGroup,
  Switch,
  DatePicker,
  TimePicker,
  Slider,
  Rate,
  Upload,
  Transfer,
  Text,
  Card,
  Space,
  ArrayCards,
  ArrayTable,
}

export const DesignableComponents = [
  Form,
  Field,
  Input,
  TextArea,
  Password,
  InputNumber,
  Select,
  TreeSelect,
  Cascader,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Switch,
  DatePicker,
  TimePicker,
  Slider,
  Rate,
  Upload,
  Transfer,
  Text,
  Card,
  Space,
  ArrayCards,
  ArrayTable,
]
