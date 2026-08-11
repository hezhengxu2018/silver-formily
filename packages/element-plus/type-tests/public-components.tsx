import {
  Autocomplete,
  Cascader,
  Checkbox,
  DatePicker,
  FormItem,
  Input,
  InputTag,
  Mention,
  Radio,
  Select,
  TreeSelect,
} from '../src'

const input = <Input placeholder="Input" clearable />
const textArea = <Input.TextArea placeholder="Text area" rows={4} />
const select = <Select filterable options={[{ label: 'One', value: 'one' }]} />
const autocomplete = <Autocomplete options={[{ value: 'One' }]} clearable />
const cascader = <Cascader options={[{ value: 'one', label: 'One' }]} />
const mention = <Mention options={[{ label: 'One', value: 'one' }]} />
const treeSelect = <TreeSelect data={[{ value: 'one', label: 'One' }]} />
const inputTag = <InputTag max={3} />
const checkbox = <Checkbox label="One" />
const checkboxGroup = <Checkbox.Group options={[{ label: 'One', value: 'one' }]} />
const radio = <Radio label="One" />
const radioGroup = <Radio.Group options={[{ label: 'One', value: 'one' }]} />
const datePicker = <DatePicker placeholder="Date" />
const formItem = <FormItem label="Field"><Input placeholder="Nested input" /></FormItem>

void [
  input,
  textArea,
  select,
  autocomplete,
  cascader,
  mention,
  treeSelect,
  inputTag,
  checkbox,
  checkboxGroup,
  radio,
  radioGroup,
  datePicker,
  formItem,
]

// @ts-expect-error Unknown props must still be rejected by the public component type.
const invalidInput = <Input notARealInputProp />

void invalidInput
