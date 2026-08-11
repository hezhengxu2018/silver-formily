import { connect, mapProps } from '@silver-formily/vue'
import FUpload from './upload.vue'
import './style.scss'

export const Upload = connect<typeof FUpload>(
  FUpload,
  mapProps({ readOnly: 'readonly', dataSource: 'fileList' }),
)

export default Upload
