import type { UploadProps } from 'antd'
import { isVoidField } from '@silver-formily/core'
import { mapProps } from '@silver-formily/react'
import { Upload as AntdUpload } from 'antd'
import { connectControl, mapReadPrettyControl } from '../__builtins__/connect-control'
import { PreviewText } from '../preview-text'

function mapUpload() {
  return mapProps({ value: 'fileList' }, (props, field) => {
    if (!field || isVoidField(field))
      return props
    return {
      onChange: ((info) => {
        // ReactiveField's generic event binding would store the event object.
        // Extract only the field value, then deliver the unchanged native event.
        void field.onInput(info.fileList)
        field.componentProps.onChange?.(info)
      }) satisfies UploadProps['onChange'],
    }
  })
}

export const Upload: typeof AntdUpload = Object.assign(connectControl(AntdUpload, mapUpload(), mapReadPrettyControl(PreviewText.Upload)), {
  Dragger: connectControl(AntdUpload.Dragger, mapUpload(), mapReadPrettyControl(PreviewText.Upload)),
})
export default Upload
