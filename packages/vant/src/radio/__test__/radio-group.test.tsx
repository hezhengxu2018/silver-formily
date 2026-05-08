import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import PreviewText from '../../preview-text'
import Radio from '../index'
import 'vant/lib/index.css'

function getRadioRoots(container: Element) {
  return Array.from(container.querySelectorAll<HTMLElement>('.van-radio'))
}

function getCheckedLabel(container: Element) {
  return container
    .querySelector<HTMLElement>('.van-radio__icon--checked')
    ?.closest('.van-radio')
    ?.querySelector('.van-radio__label')
    ?.textContent
    ?.trim()
}

describe('radio-group', () => {
  it('应该正常渲染并同步字段值', async () => {
    const form = createForm()
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="radio"
          component={[Radio.Group]}
          dataSource={[
            { label: '标签1', value: '1' },
            { label: '标签2', value: '2' },
          ]}
        />
      </FormProvider>
    ))

    expect(container.textContent).toContain('标签1')
    expect(container.textContent).toContain('标签2')

    await userEvent.click(getRadioRoots(container)[0])
    expect(form.values.radio).toBe('1')

    await userEvent.click(getRadioRoots(container)[1])
    expect(form.values.radio).toBe('2')
  })

  it('应该正确回显和响应外部赋值', async () => {
    const form = createForm()
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="radio"
          initialValue="1"
          component={[Radio.Group]}
          dataSource={[
            { label: '标签1', value: '1' },
            { label: '标签2', value: '2' },
          ]}
        />
      </FormProvider>
    ))

    expect(getCheckedLabel(container)).toBe('标签1')

    form.setValues({
      radio: '2',
    })

    await vi.waitFor(() => {
      expect(getCheckedLabel(container)).toBe('标签2')
    })
  })

  it('应该支持禁用状态', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="radio"
          disabled
          component={[Radio.Group]}
          dataSource={[
            { label: '标签1', value: '1' },
            { label: '标签2', value: '2' },
          ]}
        />
      </FormProvider>
    ))

    expect(container.querySelectorAll('.van-radio--disabled')).toHaveLength(2)
  })

  it('应该在 cancelable 开启时支持再次点击取消选中', async () => {
    const form = createForm({
      values: {
        radio: '1',
      },
    })

    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="radio"
          component={[Radio.Group, { cancelable: true }]}
          dataSource={[
            { label: '标签1', value: '1' },
            { label: '标签2', value: '2' },
          ]}
        />
      </FormProvider>
    ))

    expect(getCheckedLabel(container)).toBe('标签1')

    await userEvent.click(getRadioRoots(container)[0])

    await vi.waitFor(() => {
      expect(form.values.radio).toBeUndefined()
      expect(container.querySelector('.van-radio__icon--checked')).toBeNull()
    })
  })

  it('应该在 cancelable 未开启时保持原有单选行为', async () => {
    const form = createForm({
      values: {
        radio: '1',
      },
    })

    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="radio"
          component={[Radio.Group]}
          dataSource={[
            { label: '标签1', value: '1' },
            { label: '标签2', value: '2' },
          ]}
        />
      </FormProvider>
    ))

    await userEvent.click(getRadioRoots(container)[0])

    expect(form.values.radio).toBe('1')
    expect(getCheckedLabel(container)).toBe('标签1')
  })

  it('应该支持通过插槽渲染选项内容', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="radio"
          component={[Radio.Group]}
          dataSource={[
            { label: '标签1', value: '1' },
            { label: '标签2', value: '2' },
          ]}
        >
          {{
            option: ({ option }) => `插槽渲染的${option.label}`,
          }}
        </Field>
      </FormProvider>
    ))

    expect(container.textContent).toContain('插槽渲染的标签1')
    expect(container.textContent).toContain('插槽渲染的标签2')
  })

  it('应该只透传 Vant Radio 选项属性', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="plan"
          component={[Radio.Group]}
          dataSource={[
            {
              label: '专业版',
              value: 'pro',
              description: '适合复杂流程',
              tag: '最常用',
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

    const [radio] = getRadioRoots(container)

    expect(container.textContent).toContain('专业版-适合复杂流程-最常用')
    expect(radio.className).toContain('van-radio--disabled')
    expect(radio.hasAttribute('description')).toBe(false)
    expect(radio.hasAttribute('tag')).toBe(false)
  })

  it('应该支持通过默认插槽自定义渲染结构', async () => {
    const form = createForm({
      values: {
        radio: '1',
      },
    })

    const { container } = render(() => (
      <FormProvider form={form}>
        <Field name="radio" component={[Radio.Group]}>
          {{
            default: () => (
              <>
                <Radio name="1">标签1</Radio>
                <Radio name="2">标签2</Radio>
              </>
            ),
          }}
        </Field>
      </FormProvider>
    ))

    expect(container.textContent).toContain('标签1')
    expect(container.textContent).toContain('标签2')

    await userEvent.click(getRadioRoots(container)[1])

    expect(form.values.radio).toBe('2')
  })

  it('应该在 readPretty 模式下显示选项标签', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="radio"
          initialValue="2"
          readPretty={true}
          component={[Radio.Group]}
          dataSource={[
            { label: '标签1', value: '1' },
            { label: '标签2', value: '2' },
          ]}
        />
      </FormProvider>
    ))

    expect(container.textContent?.trim()).toBe('标签2')
  })

  it('应该在 readPretty 模式下拼接数组值', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="radio"
          initialValue={['1', '2']}
          readPretty={true}
          component={[Radio.Group]}
          dataSource={[
            { label: '标签1', value: '1' },
            { label: '标签2', value: '2' },
          ]}
        />
      </FormProvider>
    ))

    expect(container.textContent?.trim()).toBe('标签1、标签2')
  })

  it('应该在 readPretty 空值时显示自定义占位符', async () => {
    const { container } = render(() => (
      <PreviewText placeholder="暂无选择">
        <FormProvider form={createForm()}>
          <Field
            name="radio"
            initialValue={null}
            readPretty={true}
            component={[Radio.Group]}
            dataSource={[
              { label: '标签1', value: '1' },
              { label: '标签2', value: '2' },
            ]}
          />
        </FormProvider>
      </PreviewText>
    ))

    expect(container.textContent?.trim()).toBe('暂无选择')
  })

  it('应该在 readPretty 下无法匹配数据源时回退显示原始值', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="radio"
          initialValue="unknown"
          readPretty={true}
          component={[Radio.Group]}
          dataSource={[
            { label: '标签1', value: '1' },
          ]}
        />
      </FormProvider>
    ))

    expect(container.textContent?.trim()).toBe('unknown')
  })
})
