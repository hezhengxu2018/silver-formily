import type { VueComponentProps } from '@silver-formily/vue'
import type { ElUpload, ImageViewerProps, UploadFile } from 'element-plus'
import { connect, mapProps } from '@silver-formily/vue'
import FUpload from './upload.vue'
import './style.scss'

export type UploadProps = VueComponentProps<typeof ElUpload> & {
  textContent?: string
  errorAdaptor?: (error?: Error) => string | undefined
  formatValue?: (fileList?: UploadFile[]) => any
  imageViewerProps?: ImageViewerProps
}
export type UploadComponent = typeof ElUpload

export const Upload = connect<typeof FUpload, UploadProps>(
  FUpload,
  mapProps({ readOnly: 'readonly', dataSource: 'fileList' }),
)

export default Upload
