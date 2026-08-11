import {
  Area,
  Calendar,
  Cascader,
  Checkbox,
  DatePicker,
  Input,
  Picker,
  Radio,
  Rate,
  Signature,
  Slider,
  Stepper,
  Switch,
  TimePicker,
  TreeSelect,
  Upload,
} from '@silver-formily/vant'

export function PublicComponents() {
  return (
    <>
      <Input
        placeholder="请输入内容"
        modelValue="value"
        {...{
          'onUpdate:modelValue': (value: string) => value,
        }}
      />
      <Input.TextArea placeholder="请输入多行内容" />
      <Checkbox name="one">选项一</Checkbox>
      <Checkbox.Group options={[{ label: '选项一', value: 'one' }]} />
      <Radio name="one">选项一</Radio>
      <Radio.Group options={[{ label: '选项一', value: 'one' }]} />
      <Switch modelValue />
      <Stepper modelValue={1} />
      <Slider modelValue={20} />
      <Rate modelValue={3} />
      <Calendar />
      <Picker columns={[{ text: '选项一', value: 'one' }]} />
      <DatePicker />
      <TimePicker />
      <Area />
      <Cascader options={[{ text: '选项一', value: 'one' }]} />
      <TreeSelect items={[{ text: '选项一' } as any]} />
      <Upload />
      <Signature />
    </>
  )
}

export function InvalidProps() {
  return (
    // @ts-expect-error Vant wrappers reject unknown public props
    <Input doesNotExist />
  )
}
