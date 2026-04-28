import { connect, mapProps, mapReadPretty } from '@silver-formily/vue'
import { PreviewText } from '../preview-text'
import FArea from './area.vue'

export const Area = connect<typeof FArea>(
  FArea,
  mapProps({
    dataSource: 'areaList',
    disabled: true,
    readOnly: 'readonly',
  }),
  mapReadPretty(PreviewText.Area),
)

export default Area

export type {
  AreaCancelEventParams,
  AreaChangeEventParams,
  AreaCode,
  AreaConfirmEventParams,
  AreaDisplayFormatter,
  AreaList,
  AreaModelValue,
  AreaPopupProps,
  AreaProps,
  AreaResolvedValue,
  AreaSlots,
  AreaThemeVars,
  PopupPosition,
  VanAreaInstance,
  VanAreaProps,
  VanPopupProps,
} from './types'
