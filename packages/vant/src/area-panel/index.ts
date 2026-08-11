import type { AreaPanelProps } from './types'
import { connect, mapProps, mapReadPretty } from '@silver-formily/vue'
import { PreviewText } from '../preview-text'
import FAreaPanel from './area-panel.vue'

export const AreaPanel = connect<typeof FAreaPanel, Partial<AreaPanelProps>>(
  FAreaPanel,
  mapProps({
    dataSource: 'areaList',
    disabled: true,
    loading: true,
  }),
  mapReadPretty(PreviewText.Area),
)

export default AreaPanel

export type {
  AreaList,
  AreaPanelModelValue,
  AreaPanelProps,
  AreaPanelResolvedValue,
  AreaPanelSlots,
  AreaPanelThemeVars,
  VanAreaPanelInstance,
  VanAreaPanelProps,
} from './types'

export type AreaPanelComponent = typeof AreaPanel
