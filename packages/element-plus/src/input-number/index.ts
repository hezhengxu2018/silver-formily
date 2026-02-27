import { connect, mapProps } from '@silver-formily/vue'
import { ElInputNumber } from 'element-plus'
import { mapReadPretty } from '../__builtins__'
import { PreviewText } from '../preview-text'

export type InputNumberProps = typeof ElInputNumber

export const InputNumber = connect<typeof ElInputNumber>(
  ElInputNumber,
  mapProps(
    {
      readOnly: 'readonly',
    },
    (props) => {
      return {
        controlsPosition: props.controlsPosition ?? 'right',
      }
    },
  ),
  mapReadPretty(PreviewText.Input),
)

export default InputNumber
