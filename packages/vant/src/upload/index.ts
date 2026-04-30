import { connect, mapProps, mapReadPretty } from '@silver-formily/vue'
import { PreviewText } from '../preview-text'
import FUpload from './upload.vue'

export const Upload = connect<typeof FUpload>(
  FUpload,
  mapProps({
    dataSource: 'fileList',
    readOnly: 'readonly',
    disabled: true,
  }),
  mapReadPretty(PreviewText.Upload),
)

export default Upload

export type {
  UploadAccept,
  UploadAfterRead,
  UploadComponentProps,
  UploaderThemeVars,
  UploadFileListItem,
  UploadFormatValue,
  UploadInstance,
  UploadMaxSize,
  UploadPreviewFile,
  UploadPreviewFileContext,
  UploadProps,
  UploadResultType,
  UploadSlots,
  VanUploaderFileListItem,
  VanUploaderProps,
} from './types'
