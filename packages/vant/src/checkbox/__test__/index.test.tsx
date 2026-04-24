import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import PreviewText from '../../preview-text'
import Checkbox from '../index'
import 'vant/lib/index.css'

function getCheckboxRoots(container: Element) {
  return Array.from(container.querySelectorAll<HTMLElement>('.van-checkbox'))
}

function getCheckedLabels(container: Element) {
  return Array.from(container.querySelectorAll<HTMLElement>('.van-checkbox__icon--checked'))
    .map((icon) => {
      return icon
        .closest('.van-checkbox')
        ?.querySelector('.van-checkbox__label')
        ?.textContent
        ?.trim()
    })
    .filter(Boolean)
}

function isChecked(root: HTMLElement) {
  return root.querySelector('.van-checkbox__icon--checked') !== null
}

describe('checkbox', () => {
  it('应该支持布尔值字段切换', async () => {
    const form = createForm()
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field name="agreement" component={[Checkbox]}>
          {{
            default: () => '已阅读并同意协议',
          }}
        </Field>
      </FormProvider>
    ))

    const [checkbox] = getCheckboxRoots(container)

    expect(container.textContent).toContain('已阅读并同意协议')
    expect(isChecked(checkbox)).toBe(false)

    await userEvent.click(checkbox)
    expect(form.values.agreement).toBe(true)
    expect(isChecked(checkbox)).toBe(true)

    await userEvent.click(checkbox)
    expect(form.values.agreement).toBe(false)
    expect(isChecked(checkbox)).toBe(false)
  })

  it('应该支持禁用态并阻止切换', async () => {
    const form = createForm({
      values: {
        agreement: true,
      },
    })
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field name="agreement" component={[Checkbox, { disabled: true }]}>
          {{
            default: () => '已阅读并同意协议',
          }}
        </Field>
      </FormProvider>
    ))

    const [checkbox] = getCheckboxRoots(container)

    expect(checkbox.className).toContain('van-checkbox--disabled')
    expect(isChecked(checkbox)).toBe(true)

    await userEvent.click(checkbox)
    expect(form.values.agreement).toBe(true)
    expect(isChecked(checkbox)).toBe(true)
  })

  it('应该支持字段级禁用态并阻止切换', async () => {
    const form = createForm({
      values: {
        agreement: true,
      },
    })
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field name="agreement" disabled component={[Checkbox]}>
          {{
            default: () => '已阅读并同意协议',
          }}
        </Field>
      </FormProvider>
    ))

    const [checkbox] = getCheckboxRoots(container)

    expect(checkbox.className).toContain('van-checkbox--disabled')

    await userEvent.click(checkbox)
    expect(form.values.agreement).toBe(true)
    expect(isChecked(checkbox)).toBe(true)
  })
})

describe('checkbox-group', () => {
  it('应该正常渲染并同步数组字段值', async () => {
    const form = createForm()
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="features"
          component={[Checkbox.Group]}
          dataSource={[
            { label: '拍照上传', value: 'photo' },
            { label: '定位签到', value: 'location' },
          ]}
        />
      </FormProvider>
    ))

    const checkboxes = getCheckboxRoots(container)

    expect(container.textContent).toContain('拍照上传')
    expect(container.textContent).toContain('定位签到')

    await userEvent.click(checkboxes[0])
    expect(form.values.features).toEqual(['photo'])

    await userEvent.click(checkboxes[1])
    expect(form.values.features).toEqual(['photo', 'location'])
  })

  it('应该正确回显并响应外部赋值', async () => {
    const form = createForm()
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="features"
          initialValue={['photo']}
          component={[Checkbox.Group]}
          dataSource={[
            { label: '拍照上传', value: 'photo' },
            { label: '定位签到', value: 'location' },
          ]}
        />
      </FormProvider>
    ))

    expect(getCheckedLabels(container)).toEqual(['拍照上传'])

    form.setValues({
      features: ['location'],
    })

    await vi.waitFor(() => {
      expect(getCheckedLabels(container)).toEqual(['定位签到'])
    })
  })

  it('应该支持 disabled 属性', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="disabledFeatures"
          component={[Checkbox.Group, { disabled: true }]}
          dataSource={[
            { label: '拍照上传', value: 'photo' },
            { label: '定位签到', value: 'location' },
          ]}
        />
      </FormProvider>
    ))

    expect(container.querySelectorAll('.van-checkbox--disabled')).toHaveLength(2)
  })

  it('应该支持通过插槽渲染选项内容', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="features"
          component={[Checkbox.Group]}
          dataSource={[
            { label: '拍照上传', value: 'photo' },
            { label: '定位签到', value: 'location' },
          ]}
        >
          {{
            option: ({ option }) => `插槽渲染的${option.label}`,
          }}
        </Field>
      </FormProvider>
    ))

    expect(container.textContent).toContain('插槽渲染的拍照上传')
    expect(container.textContent).toContain('插槽渲染的定位签到')
  })

  it('应该只透传 Vant Checkbox 选项属性', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="services"
          component={[Checkbox.Group]}
          dataSource={[
            {
              label: '上门安装',
              value: 'install',
              description: '需要预约工程师',
              tag: '常用',
              disabled: true,
            },
          ]}
        >
          {{
            option: ({ option }) => `${option.label}-${option.description}-${option.tag}`,
          }}
        </Field>
      </FormProvider>
    ))

    const [checkbox] = getCheckboxRoots(container)

    expect(container.textContent).toContain('上门安装-需要预约工程师-常用')
    expect(checkbox.className).toContain('van-checkbox--disabled')
    expect(checkbox.hasAttribute('description')).toBe(false)
    expect(checkbox.hasAttribute('tag')).toBe(false)
  })

  it('应该支持通过默认插槽自定义渲染结构', async () => {
    const form = createForm({
      values: {
        features: ['photo'],
      },
    })

    const { container } = render(() => (
      <FormProvider form={form}>
        <Field name="features" component={[Checkbox.Group]}>
          {{
            default: () => (
              <>
                <Checkbox name="photo">拍照上传</Checkbox>
                <Checkbox name="location">定位签到</Checkbox>
              </>
            ),
          }}
        </Field>
      </FormProvider>
    ))

    expect(container.textContent).toContain('拍照上传')
    expect(container.textContent).toContain('定位签到')

    await userEvent.click(getCheckboxRoots(container)[1])
    expect(form.values.features).toEqual(['photo', 'location'])
  })

  it('应该在 readPretty 模式下显示选项标签', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="features"
          initialValue={['photo', 'location']}
          readPretty={true}
          component={[Checkbox.Group]}
          dataSource={[
            { label: '拍照上传', value: 'photo' },
            { label: '定位签到', value: 'location' },
          ]}
        />
      </FormProvider>
    ))

    expect(container.textContent?.trim()).toBe('拍照上传、定位签到')
  })

  it('应该在 readPretty 空值时显示自定义占位符', async () => {
    const { container } = render(() => (
      <PreviewText placeholder="暂无选择">
        <FormProvider form={createForm()}>
          <Field
            name="features"
            initialValue={[]}
            readPretty={true}
            component={[Checkbox.Group]}
            dataSource={[
              { label: '拍照上传', value: 'photo' },
              { label: '定位签到', value: 'location' },
            ]}
          />
        </FormProvider>
      </PreviewText>
    ))

    expect(container.textContent?.trim()).toBe('暂无选择')
  })
})
