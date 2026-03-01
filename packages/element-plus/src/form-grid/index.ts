import { observer } from '@silver-formily/reactive-vue'
import { composeExport } from '../__builtins__'
import FFormGridColumn from './form-grid-column.vue'
import FFormGrid from './form-grid.vue'
import './style.scss'

const FormGridInner = observer(FFormGrid)

const FormGridColumn = observer(FFormGridColumn)

export const FormGrid = composeExport(FormGridInner, {
  GridColumn: FormGridColumn,
})

export default FormGrid
