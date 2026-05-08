import { observer } from '@silver-formily/reactive-vue'
import { composeExport } from '../__builtins__'
import GridColumnBase from './grid-column.vue'
import GridBase from './grid.vue'
import { useFormGrid, useGrid } from './hooks'
import './style.scss'

const GridInner = observer(GridBase)
const GridColumn = observer(GridColumnBase)

export const Grid = composeExport(GridInner, {
  GridColumn,
  Item: GridColumn,
  useGrid,
  useFormGrid,
})

export default Grid

export { useFormGrid, useGrid }

export type {
  GridColumnProps,
  GridInstance,
  GridProps,
} from './types'
