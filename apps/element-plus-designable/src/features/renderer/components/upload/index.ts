import { Upload as ElementPlusUpload } from '@silver-formily/element-plus'
import { defineElementPlusComponent } from '../defineElementPlusComponent'

export const Upload = defineElementPlusComponent({
  component: ElementPlusUpload,
  componentName: 'Upload',
  description: 'File upload',
  icon: 'Upload',
  title: 'Upload',
})
