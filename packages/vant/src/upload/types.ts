import type { Field } from '@formily/core'
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

export type UploadErrorAdaptor = (error?: Error) => string

export type UploadRequestDataValue
  = string
    | number
    | boolean
    | Blob
    | File
    | null
    | undefined
    | Array<string | number | boolean | Blob | File>

export type UploadRequestData = FormData | Record<string, UploadRequestDataValue>

export type UploadRequestFactory<T> = (
  file: File,
  item: UploadFileListItem,
) => T | Promise<T>

export interface UploadRequestOptions {
  action: string
  data?: UploadRequestData
  file: File
  fileList: UploadFileListItem[]
  headers?: HeadersInit
  item: UploadFileListItem
  method: string
  name: string
  withCredentials?: boolean
}

export type UploadHttpRequest = (
  options: UploadRequestOptions,
) => Promise<any> | any

export type UploadResponseAdaptor = (
  response: any,
  item: UploadFileListItem,
) => string | Partial<UploadFileListItem> | void

export interface UploadProps {
  action?: string
  data?: UploadRequestData | UploadRequestFactory<UploadRequestData | undefined>
  errorAdaptor?: UploadErrorAdaptor
  fileList?: UploadFileListItem[]
  formatValue?: UploadFormatValue
  headers?: HeadersInit | UploadRequestFactory<HeadersInit | undefined>
  httpRequest?: UploadHttpRequest
  method?: string
  responseAdaptor?: UploadResponseAdaptor
  textContent?: string
  withCredentials?: boolean
}

export interface UploadSlots {
  'default'?: () => any
  'preview-cover'?: (props: UploadFileListItem & { index: number }) => any
  'preview-delete'?: () => any
}

export interface UploadUploadContext {
  file?: File
  fileList: UploadFileListItem[]
  field?: Field
  item: UploadFileListItem
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
