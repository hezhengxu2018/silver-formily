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
  UploadErrorAdaptor,
  UploaderThemeVars,
  UploadFileListItem,
  UploadFormatValue,
  UploadHttpRequest,
  UploadInstance,
  UploadMaxSize,
  UploadProps,
  UploadRequestData,
  UploadRequestDataValue,
  UploadRequestFactory,
  UploadRequestOptions,
  UploadResponseAdaptor,
  UploadResultType,
  UploadSlots,
  VanUploaderFileListItem,
  VanUploaderProps,
} from './types'
