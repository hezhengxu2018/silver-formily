import type {
  UploaderAfterRead,
  UploaderInstance,
  UploaderThemeVars,
  UploaderFileListItem as VanUploaderFileListItem,
  UploaderProps as VanUploaderProps,
} from 'vant'

export interface UploadFileListItem extends VanUploaderFileListItem {
  name?: string
  response?: any
}

export type UploadFormatValue = (fileList?: UploadFileListItem[]) => any

export interface UploadPreviewFileContext {
  fileList: UploadFileListItem[]
  index?: number
  name?: number | string
}

export type UploadPreviewFile = (
  file: UploadFileListItem,
  context: UploadPreviewFileContext,
) => void

export interface UploadComponentProps {
  fileList?: UploadFileListItem[]
  formatValue?: UploadFormatValue
  modelValue?: any
  previewFile?: UploadPreviewFile
}

export interface UploadProps extends Partial<Omit<VanUploaderProps, 'afterRead' | 'modelValue'>> {
  afterRead?: UploadAfterRead
  fileList?: UploadFileListItem[]
  formatValue?: UploadFormatValue
  modelValue?: any
  previewFile?: UploadPreviewFile
}

export interface UploadSlots {
  'default'?: () => any
  'preview-cover'?: (props: UploadFileListItem & { index: number }) => any
  'preview-delete'?: () => any
}

export type UploadAfterRead = UploaderAfterRead

export type UploadAccept = VanUploaderProps['accept']
export type UploadInstance = UploaderInstance
export type UploadMaxSize = VanUploaderProps['maxSize']
export type UploadResultType = VanUploaderProps['resultType']

export type {
  UploaderThemeVars,
  VanUploaderFileListItem,
  VanUploaderProps,
}
