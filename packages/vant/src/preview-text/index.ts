import { composeExport } from '../__builtins__'
import Area from './area.vue'
import Calendar from './calendar.vue'
import Cascader from './cascader.vue'
import DatePicker from './date-picker.vue'
import Input from './input.vue'
import PickerGroup from './picker-group.vue'
import Picker from './picker.vue'
import Preview from './preview.vue'
import Rate from './rate.vue'
import Select from './select.vue'
import Signature from './signature.vue'
import Slider from './slider.vue'
import Switch from './switch.vue'
import TimePicker from './time-picker.vue'
import TreeSelect from './tree-select.vue'
import Upload from './upload.vue'

export const PreviewText = composeExport(Preview, {
  Area,
  Calendar,
  Cascader,
  DatePicker,
  Input,
  Picker,
  PickerGroup,
  Rate,
  Select,
  Signature,
  Slider,
  Switch,
  TimePicker,
  TreeSelect,
  Upload,
})

export default PreviewText

export type {
  PreviewTextAreaProps,
  PreviewTextCalendarProps,
  PreviewTextCascaderProps,
  PreviewTextDatePickerProps,
  PreviewTextInputProps,
  PreviewTextPickerGroupProps,
  PreviewTextPickerProps,
  PreviewTextProps,
  PreviewTextRateProps,
  PreviewTextSelectProps,
  PreviewTextSignatureProps,
  PreviewTextSliderProps,
  PreviewTextSwitchProps,
  PreviewTextTimePickerProps,
  PreviewTextTreeSelectProps,
  PreviewTextUploadProps,
} from './types'
