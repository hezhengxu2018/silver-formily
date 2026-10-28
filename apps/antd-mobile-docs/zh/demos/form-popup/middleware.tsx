import type { FormPopupContentProps } from '@silver-formily/antd-mobile'
import { FormItem, FormLayout, FormPopup, Input } from '@silver-formily/antd-mobile'
import { Field, observer } from '@silver-formily/react'
import { toJS } from '@silver-formily/reactive'
import { Button } from 'antd-mobile'
import { showDemoResult } from '../shared'
import './style.css'

interface PublishValues {
  title: string
  summary: string
}

const PublishFooter = observer(({ form, reject, resolve, saveDraft }: FormPopupContentProps<PublishValues, 'save-draft'>) => (
  <div className="form-popup-demo-actions">
    <Button block disabled={form.submitting} onClick={reject}>取消</Button>
    <Button block loading={form.submitting} onClick={saveDraft}>保存草稿</Button>
    <Button block color="primary" loading={form.submitting} onClick={() => resolve()}>发布</Button>
  </div>
))

export default function MiddlewareDemo() {
  async function handleOpen() {
    try {
      const result = await FormPopup<PublishValues, ['save-draft']>({ title: '发布配置', closeOnMaskClick: false }, {
        header: () => (
          <div className="form-popup-demo-header">
            <div className="form-popup-demo-header-title">自定义头部</div>
            <div className="form-popup-demo-header-description">保留表单生命周期，按业务需求接管头部和底部按钮。</div>
          </div>
        ),
        default: () => (
          <FormLayout>
            <Field
              name="title"
              title="方案标题"
              validator={[{ required: true, message: '请输入方案标题' }]}
              decorator={[FormItem]}
              component={[Input, { placeholder: '例如：华东巡检改版' }]}
            />
            <Field
              name="summary"
              title="摘要"
              decorator={[FormItem]}
              component={[Input.TextArea, { rows: 3, maxLength: 60, showCount: true, placeholder: '简要说明这次发布要点' }]}
            />
          </FormLayout>
        ),
        footer: props => <PublishFooter {...props} />,
      }, ['save-draft'])
        .forConfirm(async (form) => {
          await new Promise(resolve => setTimeout(resolve, 400))
          return toJS(form.values)
        })
        .forSaveDraft((form) => {
          form.setValues({ summary: `${form.values.summary || ''}（草稿）` })
        })
        .open({ values: { title: '华东巡检改版', summary: '先同步到预发布环境，确认券后价和库存展示。' } })
      showDemoResult(result)
    }
    catch (error) {
      if (!(error instanceof Error && error.message === 'cancel'))
        throw error
    }
  }

  return <Button block onClick={handleOpen}>打开自定义头尾 + middleware 示例</Button>
}
