import { InfoFilled } from '@element-plus/icons-vue'
import { createForm } from '@formily/core'
import { createSchemaField, Field, FormProvider } from '@silver-formily/vue'
import { ElIcon } from 'element-plus'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { stylePrefix } from '../../__builtins__'
import { DatePicker, FormItem, FormLayout, Input } from '../../index'
import 'element-plus/theme-chalk/index.css'

describe('formItem', () => {
  describe('基础功能', () => {
    it('应该正常渲染', async () => {
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <FormLayout>
            <Field
              name="test"
              title="测试标签"
              decorator={[FormItem]}
              component={[Input]}
            />
          </FormLayout>
        </FormProvider>
      ))

      await expect.element(container.querySelector('.formily-element-plus-form-item')).toBeInTheDocument()
      await expect.element(container.querySelector('.el-form-item__label')).toHaveTextContent('测试标签')
    })

    it('应该支持内部隔离根类名', async () => {
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <FormItem
            label="隔离类名"
            internalFormItemClass={`${stylePrefix}-form-item--isolated`}
          >
            <Input placeholder="请输入" />
          </FormItem>
        </FormProvider>
      ))

      const formItemElement = container.querySelector(`.${stylePrefix}-form-item`)
      await expect.element(formItemElement).toHaveClass(`${stylePrefix}-form-item--isolated`)
      await expect.element(formItemElement).not.toHaveClass('el-form-item')
    })

    it('应该支持label 为空时的展示', async () => {
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <FormLayout>
            <Field
              name="test"
              decorator={[FormItem, { labelWidth: 300 }]}
              component={[Input, { placeholder: '请输入' }]}
            />
          </FormLayout>
        </FormProvider>
      ))

      const labelElement = container.querySelector('.el-form-item__label')
      expect(labelElement).toBeNull()
    })

    it('应该支持空字符串 label 的展示', async () => {
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <FormLayout>
            <Field
              name="test"
              title=" "
              decorator={[FormItem, { labelWidth: 300 }]}
              component={[Input, { placeholder: '请输入' }]}
            />
          </FormLayout>
        </FormProvider>
      ))

      const labelElement = container.querySelector('.el-form-item__label')
      expect(labelElement).toHaveStyle({ width: '300px' })
    })
  })

  describe('冒号设置', () => {
    it('应该默认显示冒号', async () => {
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <FormLayout>
            <Field
              name="test"
              title="默认"
              decorator={[FormItem]}
              component={[Input, { placeholder: '请输入' }]}
            />
          </FormLayout>
        </FormProvider>
      ))

      const labelElement = container.querySelector('.el-form-item__label')
      await vi.waitFor(() => {
        return labelElement.textContent.includes(':')
      })
    })

    it('应该不显示冒号，当设置 colon=false', async () => {
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <FormLayout>
            <Field
              name="test"
              title="无冒号"
              decorator={[FormItem, { colon: false }]}
              component={[Input, { placeholder: '请输入' }]}
            />
          </FormLayout>
        </FormProvider>
      ))

      const labelElement = container.querySelector('.el-form-item__label')
      await vi.waitFor(() => {
        expect(labelElement.textContent).toBe('无冒号')
      })
    })

    it('应该识别 template 布尔属性 colon', async () => {
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <FormLayout colon={'' as any}>
            <Field
              name="colonTemplate"
              title="模板冒号"
              decorator={[FormItem]}
              component={[Input]}
            />
          </FormLayout>
        </FormProvider>
      ))

      const labelElement = container.querySelector('.el-form-item__label')
      await vi.waitFor(() => {
        return labelElement.textContent.includes(':')
      })
    })

    it('应该继承 FormLayout 的 colon 设置', async () => {
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <FormLayout colon={false}>
            <Field
              name="layoutColon"
              title="布局冒号"
              decorator={[FormItem]}
              component={[Input]}
            />
          </FormLayout>
        </FormProvider>
      ))

      const labelElement = container.querySelector('.el-form-item__label')
      await vi.waitFor(() => {
        expect(labelElement.textContent).toBe('布局冒号')
      })
    })

    it('formItem colon 应该覆盖 FormLayout 的设置', async () => {
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <FormLayout colon={false}>
            <Field
              name="layoutColonOverride"
              title="覆盖冒号"
              decorator={[FormItem, { colon: true }]}
              component={[Input]}
            />
          </FormLayout>
        </FormProvider>
      ))

      const labelElement = container.querySelector('.el-form-item__label')
      await vi.waitFor(() => {
        expect(labelElement.textContent).toBe('覆盖冒号:')
      })
    })
  })

  describe('宽度设置', () => {
    it('应该固定标签宽度，当设置 labelWidth ', async () => {
      const { getByLabelText } = render(() => (
        <FormProvider form={createForm()}>
          <FormLayout>
            <Field
              name="test"
              title="固定标签宽度"
              decorator={[FormItem, { labelWidth: 300 }]}
              component={[Input, { placeholder: '请输入' }]}
            />
          </FormLayout>
        </FormProvider>
      ))

      const labelLocator = getByLabelText('固定标签宽度')
      const labelElement = labelLocator.element().querySelector('.el-form-item__label')
      expect(labelElement).toHaveStyle({ width: '300px' })
    })

    it('默认应该隐藏溢出的标签文案，当未设置 labelWrap', async () => {
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <FormLayout>
            <Field
              name="overflow"
              title="固定label宽度(labelWidth)溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出溢出"
              decorator={[FormItem, { labelWidth: 300 }]}
              component={[Input]}
            />
          </FormLayout>
        </FormProvider>
      ))
      expect(container.querySelector('.is-warp')).not.toBeInTheDocument()
    })

    it('应该允许标签换行，当设置 labelWrap=true', async () => {
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <FormLayout>
            <Field
              name="test"
              title="固定标签宽度换行换行换行换行换行换行换行换行换行换行换行换行换行换行换行换行换行换行换行换行换行换行换行换行换行换行换行"
              decorator={[FormItem, { labelWidth: 300, labelWrap: true }]}
              component={[Input, { placeholder: '请输入' }]}
            />
          </FormLayout>
        </FormProvider>
      ))
      expect(container.querySelector('.is-warp')).toBeInTheDocument()
    })

    it('应该固定内容区域宽度，当设置 wrapperWidth', async () => {
      const { getByLabelText } = render(() => (
        <FormProvider form={createForm()}>
          <FormLayout>
            <Field
              name="test"
              title="固定内容宽度"
              decorator={[FormItem, { labelWidth: 300, wrapperWidth: 300 }]}
              component={[Input, { placeholder: '请输入' }]}
            />
          </FormLayout>
        </FormProvider>
      ))
      const labelLocator = getByLabelText('固定内容宽度')
      const contentElement = labelLocator.element().querySelector('.el-form-item__content')
      expect(contentElement).toHaveStyle({ width: '300px' })
    })
  })

  describe('对齐方式', () => {
    it('应该标签左对齐，当设置 labelAlign=left', async () => {
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <FormLayout>
            <Field
              name="test"
              title="标签左对齐"
              decorator={[FormItem, { labelWidth: 300, labelAlign: 'left' }]}
              component={[Input, { placeholder: '请输入' }]}
            />
          </FormLayout>
        </FormProvider>
      ))

      const labelElement = container.querySelector('.el-form-item__label')
      await expect(labelElement).toHaveStyle({ justifyContent: 'flex-start' })
    })

    it('应该标签右对齐（默认），当设置 labelAlign=right', async () => {
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <FormItem
            label="标签右对齐"
            labelWidth={300}
            labelAlign="right"
          >
            <Input placeholder="请输入" />
          </FormItem>
        </FormProvider>
      ))

      const labelElement = container.querySelector('.el-form-item__label')
      expect(labelElement).toHaveStyle({ justifyContent: 'flex-end' })
    })

    it('应该内容左对齐（默认），当设置 wrapperAlign=left', async () => {
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <FormItem
            label="内容左对齐"
            labelWidth={300}
            wrapperWidth={240}
            wrapperAlign="left"
          >
            <Input placeholder="请输入" />
          </FormItem>
        </FormProvider>
      ))

      const contentElement = container.querySelector('.formily-element-plus-form-item-content__wrapper')
      expect(contentElement).toHaveStyle({ justifyContent: 'normal' })
    })

    it('应该内容右对齐，当设置 wrapperAlign=right', async () => {
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <FormItem
            label="内容右对齐"
            labelWidth={300}
            wrapperWidth={240}
            wrapperAlign="right"
          >
            <Input placeholder="请输入" />
          </FormItem>
        </FormProvider>
      ))

      const contentElement = container.querySelector('.formily-element-plus-form-item-content__wrapper')
      expect(contentElement).toHaveStyle({ justifyContent: 'flex-end' })
    })
  })

  describe('提示信息', () => {
    it('应该提示图标显示提示信息，当设置 tooltip', async () => {
      render(() => (
        <FormProvider form={createForm()}>
          <FormItem
            label="提示信息"
            tooltip="这是一个提示"
          >
            <Input placeholder="请输入" />
          </FormItem>
        </FormProvider>
      ))
    })

    it('应该显示文本提示，当设置 tooltipLayout=text', async () => {
      render(() => (
        <FormProvider form={createForm()}>
          <FormItem
            label="文本提示"
            tooltip="这是一个文本提示"
            tooltipLayout="text"
          >
            <Input placeholder="请输入" />
          </FormItem>
        </FormProvider>
      ))
    })
  })

  describe('撑满设置', () => {
    it('应该撑满容器，当 FormItem 设置 fullness=true', async () => {
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <FormLayout>
            <Field
              name="fullnessFormItem"
              title="撑满容器"
              decorator={[FormItem, { fullness: true }]}
              component={[DatePicker]}
            />
          </FormLayout>
        </FormProvider>
      ))

      const content = container.querySelector('.el-form-item__content')
      await expect.element(content).toHaveClass('is-fullness')
    })

    it('应该继承 FormLayout 的 fullness 设置', async () => {
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <FormLayout fullness={true}>
            <Field
              name="fullnessLayout"
              title="撑满容器"
              decorator={[FormItem]}
              component={[DatePicker]}
            />
          </FormLayout>
        </FormProvider>
      ))

      const content = container.querySelector('.el-form-item__content')
      await expect.element(content).toHaveClass('is-fullness')
    })

    it('应该识别 template 布尔属性 fullness', async () => {
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <FormLayout fullness={'' as any}>
            <Field
              name="fullnessTemplate"
              title="撑满容器"
              decorator={[FormItem]}
              component={[DatePicker]}
            />
          </FormLayout>
        </FormProvider>
      ))

      const content = container.querySelector('.el-form-item__content')
      await expect.element(content).toHaveClass('is-fullness')
    })

    it('默认情况下 DatePicker 不会撑满 FormLayout', async () => {
      const containerWidth = 600
      const { container } = render(() => (
        <div style={`width: ${containerWidth}px;`}>
          <FormProvider form={createForm()}>
            <FormLayout>
              <Field
                name="defaultFullness"
                title="默认宽度"
                decorator={[FormItem]}
                component={[DatePicker]}
              />
            </FormLayout>
          </FormProvider>
        </div>
      ))

      await vi.waitFor(() => {
        const picker = container.querySelector('.el-date-editor') as HTMLElement
        const width = picker?.getBoundingClientRect().width ?? 0
        expect(width).toBeGreaterThan(200)
        expect(width).toBeLessThan(containerWidth)
      })
    })

    it('formLayout fullness 能让 DatePicker 撑满容器', async () => {
      const containerWidth = 600
      const { container } = render(() => (
        <div style={`width: ${containerWidth}px;`}>
          <FormProvider form={createForm()}>
            <FormLayout fullness>
              <Field
                name="layoutFullness"
                title="撑满容器"
                decorator={[FormItem]}
                component={[DatePicker]}
              />
            </FormLayout>
          </FormProvider>
        </div>
      ))

      await vi.waitFor(() => {
        const picker = container.querySelector('.el-date-editor') as HTMLElement
        const content = container.querySelector('.el-form-item__content') as HTMLElement
        const width = picker?.getBoundingClientRect().width ?? 0
        const contentWidth = content?.getBoundingClientRect().width ?? 0
        expect(Math.abs(width - contentWidth)).toBeLessThan(1)
      })
    })

    it('schema 模式下 FormLayout fullness 同样生效', async () => {
      const containerWidth = 600
      const { SchemaField } = createSchemaField({
        components: {
          FormLayout,
          FormItem,
          DatePicker,
        },
      })
      const schema = {
        type: 'object',
        properties: {
          layout: {
            'type': 'void',
            'x-component': 'FormLayout',
            'x-component-props': {
              fullness: true,
            },
            'properties': {
              schemaDate: {
                'type': 'string',
                'title': 'Schema DatePicker',
                'x-decorator': 'FormItem',
                'x-component': 'DatePicker',
              },
            },
          },
        },
      }

      const { container } = render(() => (
        <div style={`width: ${containerWidth}px;`}>
          <FormProvider form={createForm()}>
            <SchemaField schema={schema} />
          </FormProvider>
        </div>
      ))

      await vi.waitFor(() => {
        const picker = container.querySelector('.el-date-editor') as HTMLElement
        const content = container.querySelector('.el-form-item__content') as HTMLElement
        const width = picker?.getBoundingClientRect().width ?? 0
        const contentWidth = content?.getBoundingClientRect().width ?? 0
        expect(Math.abs(width - contentWidth)).toBeLessThan(1)
      })
    })

    it('formItem fullness 应该覆盖 FormLayout 的 fullness 设置', async () => {
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <FormLayout fullness>
            <Field
              name="fullnessOverride"
              title="覆盖撑满"
              decorator={[FormItem, { fullness: false }]}
              component={[DatePicker]}
            />
          </FormLayout>
        </FormProvider>
      ))

      const content = container.querySelector('.el-form-item__content')
      await expect.element(content).not.toHaveClass('is-fullness')
    })
  })

  describe('尺寸设置', () => {
    it('应该继承 FormLayout 的 size 设置', async () => {
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <FormLayout size="small">
            <Field
              name="inheritSize"
              title="继承尺寸"
              decorator={[FormItem]}
              component={[Input]}
            />
          </FormLayout>
        </FormProvider>
      ))

      const formItem = container.querySelector('.el-form-item')
      await expect.element(formItem).toHaveClass('el-form-item--small')
    })

    it('formItem size 应该覆盖 FormLayout 的 size', async () => {
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <FormLayout size="small">
            <Field
              name="overrideSize"
              title="覆盖尺寸"
              decorator={[FormItem, { size: 'large' }]}
              component={[Input]}
            />
          </FormLayout>
        </FormProvider>
      ))

      const formItem = container.querySelector('.el-form-item')
      await expect.element(formItem).toHaveClass('el-form-item--large')
    })
  })

  describe('辅助信息', () => {
    it('应该必填项显示必填星号，当设置 asterisk=true', async () => {
      render(() => (
        <FormProvider form={createForm()}>
          <FormItem
            label="必填项"
            asterisk={true}
            labelCol={6}
            wrapperCol={10}
          >
            <Input placeholder="请输入" />
          </FormItem>
        </FormProvider>
      ))
    })

    it('应该前缀显示前缀文本，当设置 addonBefore', async () => {
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <FormItem
            label="前缀"
            addonBefore="前缀文本"
            labelCol={6}
            wrapperCol={10}
          >
            <Input placeholder="请输入" />
          </FormItem>
        </FormProvider>
      ))

      const addonElement = container.querySelector('.formily-element-plus-form-item-addon-before')
      await expect.element(addonElement).toBeInTheDocument()
      await expect(addonElement.textContent).toBe('前缀文本')
    })

    it('应该后缀显示后缀文本，当设置 addonAfter', async () => {
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <FormItem
            label="后缀"
            addonAfter="后缀文本"
            labelCol={6}
            wrapperCol={10}
          >
            <Input placeholder="请输入" />
          </FormItem>
        </FormProvider>
      ))

      const addonElement = container.querySelector('.formily-element-plus-form-item-addon-after')
      await expect.element(addonElement).toBeInTheDocument()
      await expect(addonElement.textContent).toBe('后缀文本')
    })

    it('应该反馈信息显示反馈信息，当设置 feedbackText', async () => {
      render(() => (
        <FormProvider form={createForm()}>
          <FormItem
            label="反馈信息"
            feedbackText="这是一条反馈信息"
            labelCol={6}
            wrapperCol={10}
          >
            <Input placeholder="请输入" />
          </FormItem>
        </FormProvider>
      ))
    })

    it('应该显示额外信息，当设置 extra', async () => {
      render(() => (
        <FormProvider form={createForm()}>
          <FormItem
            label="额外信息"
            extra="这是额外信息"
            labelCol={6}
            wrapperCol={10}
          >
            <Input placeholder="请输入" />
          </FormItem>
        </FormProvider>
      ))
    })
  })

  describe('表单状态', () => {
    it('应该显示错误状态，当设置 feedbackStatus=error', async () => {
      render(() => (
        <FormProvider form={createForm()}>
          <FormItem
            label="错误状态"
            feedbackStatus="error"
            feedbackText="错误信息"
          >
            <Input placeholder="请输入" />
          </FormItem>
        </FormProvider>
      ))
    })

    it('应该显示警告状态，当设置 feedbackStatus=warning', async () => {
      render(() => (
        <FormProvider form={createForm()}>
          <FormItem
            label="警告状态"
            feedbackStatus="warning"
            feedbackText="警告信息"
          >
            <Input placeholder="请输入" />
          </FormItem>
        </FormProvider>
      ))
    })

    it('应该显示成功状态，当设置 feedbackStatus=success', async () => {
      render(() => (
        <FormProvider form={createForm()}>
          <FormItem
            label="成功状态"
            feedbackStatus="success"
            feedbackText="成功信息"
          >
            <Input placeholder="请输入" />
          </FormItem>
        </FormProvider>
      ))
    })

    it('应该显示加载状态，当设置 feedbackStatus=pending', async () => {
      render(() => (
        <FormProvider form={createForm()}>
          <FormItem
            label="加载状态"
            feedbackStatus="pending"
            feedbackText="加载中..."
          >
            <Input placeholder="请输入" />
          </FormItem>
        </FormProvider>
      ))
    })
  })

  describe('反馈信息布局', () => {
    it('应该使用紧凑模式，当设置feedbackLayout=terse时', async () => {
      render(() => (
        <FormProvider form={createForm()}>
          <FormItem
            label="紧凑模式"
            feedbackStatus="error"
            feedbackText="错误信息"
            feedbackLayout="terse"
          >
            <Input placeholder="请输入" />
          </FormItem>
        </FormProvider>
      ))
    })

    it('应该使用松散模式，当设置feedbackLayout=loose时', async () => {
      render(() => (
        <FormProvider form={createForm()}>
          <FormItem
            label="松散模式"
            feedbackStatus="error"
            feedbackText="错误信息"
            feedbackLayout="loose"
          >
            <Input placeholder="请输入" />
          </FormItem>
        </FormProvider>
      ))
    })

    it('应该使用弹出模式，当设置feedbackLayout=popover时', async () => {
      render(() => (
        <FormProvider form={createForm()}>
          <FormItem
            label="弹出模式"
            feedbackStatus="error"
            feedbackText="错误信息"
            feedbackLayout="popover"
          >
            <Input placeholder="请输入" />
          </FormItem>
        </FormProvider>
      ))
    })
  })

  describe('布局方式', () => {
    it('应该将标签显示在顶部，当在设置 layout=vertical 时', async () => {
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <FormLayout layout="vertical">
            <Field
              name="test"
              title="垂直布局"
              decorator={[FormItem]}
              component={[Input, { placeholder: '请输入' }]}
            />
          </FormLayout>
        </FormProvider>
      ))

      const formItemElement = container.querySelector('.formily-element-plus-form-item')
      expect(formItemElement).toHaveClass('el-form-item--label-top')
    })

    it('应该将标签显示在顶部，当在设置 layout 包含 vertical 的数组时', async () => {
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <FormLayout layout={['vertical', 'horizontal']}>
            <Field
              name="test"
              title="垂直布局（数组）"
              decorator={[FormItem]}
              component={[Input, { placeholder: '请输入' }]}
            />
          </FormLayout>
        </FormProvider>
      ))

      const formItemElement = container.querySelector('.formily-element-plus-form-item')
      expect(formItemElement).toHaveClass('el-form-item--label-top')
    })
  })

  describe('栅格布局', () => {
    it('应该实现栅格布局，当设置 labelCol 和 wrapperCol 时', async () => {
      const { container, getByText } = render(() => (
        <FormProvider form={createForm()}>
          <FormItem
            label="栅格布局"
            labelCol={6}
            wrapperCol={18}
          >
            <Input placeholder="请输入" />
          </FormItem>
        </FormProvider>
      ))
      await expect.element(getByText('栅格布局')).toBeInTheDocument()

      const labelElement = container.querySelector(`.${stylePrefix}-form-item-col-6`)
      const wrapperElement = container.querySelector(`.${stylePrefix}-form-item-col-18`)

      await expect.element(labelElement).toBeInTheDocument()
      await expect.element(wrapperElement).toBeInTheDocument()
    })
  })
})

describe('vNode 渲染支持', () => {
  it('label 支持 VNode 渲染', async () => {
    const CustomLabel = () => (
      <div class="custom-label">
        <span>自定义标签</span>
      </div>
    )

    const { getByText } = render(() => (
      <FormProvider form={createForm()}>
        <FormItem
          label={<CustomLabel />}
          labelWidth={200}
        >
          <Input placeholder="请输入" />
        </FormItem>
      </FormProvider>
    ))
    await expect.element(getByText('自定义标签')).toBeInTheDocument()
  })

  it('addonBefore 支持 VNode 渲染', async () => {
    const CustomAddonBefore = () => (
      <div class="custom-addon-before">
        <span>前缀组件</span>
      </div>
    )

    const { getByText } = render(() => (
      <FormProvider form={createForm()}>
        <FormItem
          label="VNode前缀"
          addonBefore={<CustomAddonBefore />}
        >
          <Input placeholder="请输入" />
        </FormItem>
      </FormProvider>
    ))

    await expect.element(getByText('前缀组件')).toBeInTheDocument()
  })

  it('addonAfter 支持 VNode 渲染', async () => {
    const CustomAddonAfter = () => (
      <div class="custom-addon-after">
        <span>后缀组件</span>
      </div>
    )

    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <FormItem
          label="VNode后缀"
          addonAfter={<CustomAddonAfter />}
        >
          <Input placeholder="请输入" />
        </FormItem>
      </FormProvider>
    ))

    const customAddon = container.querySelector('.custom-addon-after')
    await expect.element(customAddon).toBeInTheDocument()
    await expect.element(customAddon.querySelector('span')).toHaveTextContent('后缀组件')
  })

  it('extra 支持 VNode 渲染', async () => {
    const CustomExtra = () => (
      <div class="custom-extra">
        <ElIcon><InfoFilled /></ElIcon>
        <span>这是自定义额外信息</span>
        <a href="#">查看详情</a>
      </div>
    )

    const { getByText } = render(() => (
      <FormProvider form={createForm()}>
        <FormItem
          label="VNode额外信息"
          extra={<CustomExtra />}
        >
          <Input placeholder="请输入" />
        </FormItem>
      </FormProvider>
    ))
    await expect.element(getByText('这是自定义额外信息')).toBeInTheDocument()
  })

  it('应该支持多个 VNode 属性同时使用', async () => {
    const CustomLabel = () => <span class="vnode-label">VNode标签</span>
    const CustomAddonBefore = () => <span class="vnode-before">VNode前缀</span>
    const CustomAddonAfter = () => <span class="vnode-after">VNode后缀</span>
    const CustomExtra = () => <span class="vnode-extra">VNode额外信息</span>

    const { getByText } = render(() => (
      <FormProvider form={createForm()}>
        <FormItem
          label={<CustomLabel />}
          addonBefore={<CustomAddonBefore />}
          addonAfter={<CustomAddonAfter />}
          extra={<CustomExtra />}
        >
          <Input placeholder="请输入" />
        </FormItem>
      </FormProvider>
    ))

    await expect.element(getByText('VNode标签')).toBeInTheDocument()
    await expect.element(getByText('VNode前缀')).toBeInTheDocument()
    await expect.element(getByText('VNode后缀')).toBeInTheDocument()
    await expect.element(getByText('VNode额外信息')).toBeInTheDocument()
  })

  it('应该支持 VNode 与字符串属性混合使用', async () => {
    const CustomLabel = () => <span class="mixed-label">混合标签</span>

    const { container, getByText } = render(() => (
      <FormProvider form={createForm()}>
        <FormItem
          label={<CustomLabel />}
          addonBefore="字符串前缀"
          addonAfter="字符串后缀"
          extra="字符串额外信息"
        >
          <Input placeholder="请输入" />
        </FormItem>
      </FormProvider>
    ))

    // VNode 标签
    await expect.element(getByText('混合标签')).toBeInTheDocument()

    // 字符串前缀和后缀
    const beforeAddon = container.querySelector('.formily-element-plus-form-item-addon-before')
    const afterAddon = container.querySelector('.formily-element-plus-form-item-addon-after')
    const extra = container.querySelector('.formily-element-plus-form-item-extra')

    await expect.element(beforeAddon).toHaveTextContent('字符串前缀')
    await expect.element(afterAddon).toHaveTextContent('字符串后缀')
    await expect.element(extra).toHaveTextContent('字符串额外信息')
  })

  it('应该支持 VNode 渲染复杂组件结构', async () => {
    const ComplexLabel = () => (
      <div class="complex-label">
        <div class="label-main">复杂标签</div>
        <div class="label-sub">
          <ElIcon><InfoFilled /></ElIcon>
          <span>子标题</span>
        </div>
      </div>
    )

    const { container, getByText } = render(() => (
      <FormProvider form={createForm()}>
        <FormItem
          label={<ComplexLabel />}
          labelWidth={300}
        >
          <Input placeholder="请输入" />
        </FormItem>
      </FormProvider>
    ))

    await expect.element(getByText('复杂标签')).toBeInTheDocument()
    await expect.element(container.querySelector('.complex-label')).toBeInTheDocument()
    await expect.element(container.querySelector('.label-main')).toHaveTextContent('复杂标签')
    await expect.element(container.querySelector('.label-sub span')).toHaveTextContent('子标题')
  })
})
