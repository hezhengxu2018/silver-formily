import type { DesignableComponent } from '../types'
import * as ElementPlus from '@silver-formily/element-plus'
import { ElCard } from 'element-plus'
import { ArrayCards } from './array-cards'
import { ArrayTable } from './array-table'
import { Card } from './card'
import { Cascader } from './cascader'
import { Checkbox } from './checkbox'
import { CheckboxGroup } from './checkbox-group'
import { DatePicker } from './date-picker'
import { Field } from './field'
import { Form, RuntimeForm } from './form'
import { Input } from './input'
import { InputNumber } from './input-number'
import { Password } from './password'
import { Radio } from './radio'
import { RadioGroup } from './radio-group'
import { Rate } from './rate'
import { Select } from './select'
import { Slider } from './slider'
import { Space } from './space'
import { Switch } from './switch'
import { Text } from './text'
import { TextArea } from './text-area'
import { TimePicker } from './time-picker'
import { Transfer } from './transfer'
import { TreeSelect } from './tree-select'
import { Upload } from './upload'

export {
  ArrayCards,
  ArrayTable,
  Card,
  Cascader,
  Checkbox,
  CheckboxGroup,
  DatePicker,
  Field,
  Form,
  Input,
  InputNumber,
  Password,
  Radio,
  RadioGroup,
  Rate,
  RuntimeForm,
  Select,
  Slider,
  Space,
  Switch,
  Text,
  TextArea,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
}

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

export const RuntimeComponents: Record<string, any> = {
  ...ElementPlus,
  'Card': ElCard,
  'Form': RuntimeForm,
  'FormItem': ElementPlus.FormItem,
  'Input.TextArea': ElementPlus.Input.TextArea,
  'Text': ElementPlus.PreviewText.Input,
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
