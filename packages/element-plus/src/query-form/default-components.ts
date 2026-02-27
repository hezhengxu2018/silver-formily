import type { Component } from 'vue'
import { Autocomplete } from '../autocomplete'
import { Cascader } from '../cascader'
import { Checkbox } from '../checkbox'
import { ColorPicker } from '../color-picker'
import { DatePicker } from '../date-picker'
import { FormItem } from '../form-item'
import { Input } from '../input'
import { InputNumber } from '../input-number'
import { Password } from '../password'
import { Radio } from '../radio'
import { Rate } from '../rate'
import { Select } from '../select'
import { Slider } from '../slider'
import { Switch } from '../switch'
import { TimePicker } from '../time-picker'
import { TimeSelect } from '../time-select'
import { TreeSelect } from '../tree-select'

export const queryFormAutoComponents: Record<string, Component> = {
  FormItem,
  Input,
  Autocomplete,
  InputNumber,
  Password,
  Checkbox,
  Radio,
  Select,
  TreeSelect,
  Cascader,
  Switch,
  Rate,
  Slider,
  ColorPicker,
  DatePicker,
  TimePicker,
  TimeSelect,
}

export function mergeQueryFormComponents(components?: Record<string, Component>) {
  return {
    ...queryFormAutoComponents,
    ...components,
  }
}
