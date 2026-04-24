import { connect, mapProps, mapReadPretty } from '@silver-formily/vue'
import { Checkbox as VanCheckbox } from 'vant'
import { composeExport } from '../__builtins__'
import { PreviewText } from '../preview-text'
import FCheckboxGroup from './checkbox-group.vue'

const InnerCheckbox = connect<typeof VanCheckbox>(
  VanCheckbox,
  mapProps({
    disabled: true,
  }),
)

const CheckboxGroup = connect<typeof FCheckboxGroup>(
  FCheckboxGroup,
  mapProps({
    dataSource: 'options',
    disabled: true,
  }),
  mapReadPretty(PreviewText.Select),
)

export const Checkbox = composeExport(InnerCheckbox, {
  Group: CheckboxGroup,
})

export default Checkbox

export type {
  CheckboxGroupDirection,
  CheckboxGroupProps,
  CheckboxGroupToggleAllOptions,
  CheckboxLabelPosition,
  CheckboxOption,
  CheckboxOptionLike,
  CheckboxOptionSlotProps,
  CheckboxOptionValue,
  CheckboxProps,
  CheckboxShape,
  CheckboxThemeVars,
  ResolvedCheckboxOption,
  VanCheckboxGroupProps,
  VanCheckboxProps,
} from './types'
