import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import Cascader from '../../cascader'
import 'element-plus/theme-chalk/index.css'

describe('previewText.Cascader', () => {
  // 级联选择器的选项数据
  const options = [
    {
      value: 'guide',
      label: 'Guide',
      children: [
        {
          value: 'disciplines',
          label: 'Disciplines',
          children: [
            {
              value: 'consistency',
              label: 'Consistency',
            },
            {
              value: 'feedback',
              label: 'Feedback',
            },
          ],
        },
      ],
    },
    {
      value: 'component',
      label: 'Component',
      children: [
        {
          value: 'form',
          label: 'Form',
          children: [
            {
              value: 'cascader',
              label: 'Cascader',
            },
          ],
        },
      ],
    },
  ]

  it('应该在单选模式下正确显示级联路径', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field name="cascader" initialValue={['guide', 'disciplines', 'consistency']} readPretty={true} component={[Cascader]} dataSource={options} />
        </FormProvider>
      ),
    )
    expect(container.textContent).toContain('Guide / Disciplines / Consistency')
  })

  it('应该在单选模式下不显示完整路径', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="cascader"
            initialValue={['guide', 'disciplines', 'consistency']}
            readPretty={true}
            component={[Cascader, { showAllLevels: false }]}
            dataSource={options}
          />
        </FormProvider>
      ),
    )
    expect(container.textContent).toContain('Consistency')
    expect(container.textContent).not.toContain('Guide / Disciplines / Consistency')
  })

  it('应该在多选模式下正确显示多个选项', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="cascader"
            initialValue={[
              ['guide', 'disciplines', 'consistency'],
              ['guide', 'disciplines', 'feedback'],
            ]}
            readPretty={true}
            component={[Cascader, { props: { multiple: true } }]}
            dataSource={options}
          />
        </FormProvider>
      ),
    )

    const tags = container.querySelectorAll('.el-tag')
    expect(tags.length).toBe(2)
    expect(tags[0].textContent).toContain('Guide / Disciplines / Consistency')
    expect(tags[1].textContent).toContain('Guide / Disciplines / Feedback')
  })

  it('应该支持在多选模式下使用非嵌套数组时的兼容性显示', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="cascader"
            initialValue={['guide', 'disciplines', 'consistency']}
            readPretty={true}
            component={[Cascader, { props: { multiple: true } }]}
            dataSource={options}
          />
        </FormProvider>
      ),
    )

    // 即使在多选模式下，非嵌套数组也应该正确显示
    expect(container.textContent).toContain('Guide / Disciplines / Consistency')
  })

  it('应该支持在多选模式下不显示完整路径', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="cascader"
            initialValue={[
              ['guide', 'disciplines', 'consistency'],
              ['guide', 'disciplines', 'feedback'],
            ]}
            readPretty={true}
            component={[Cascader, {
              props: { multiple: true },
              showAllLevels: false,
            }]}
            dataSource={options}
          />
        </FormProvider>
      ),
    )

    const tags = container.querySelectorAll('.el-tag')
    expect(tags.length).toBe(2)
    expect(tags[0].textContent).toContain('Consistency')
    expect(tags[0].textContent).not.toContain('Guide / Disciplines')
    expect(tags[1].textContent).toContain('Feedback')
  })

  it('应该支持自定义分隔符', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="cascader"
            initialValue={['guide', 'disciplines', 'consistency']}
            readPretty={true}
            component={[Cascader, { separator: '>' }]}
            dataSource={options}
          />
        </FormProvider>
      ),
    )

    expect(container.textContent).toContain('Guide > Disciplines > Consistency')
  })

  it('应该支持空值显示占位符', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="cascader"
            initialValue={null}
            readPretty={true}
            component={[Cascader]}
            dataSource={options}
          />
        </FormProvider>
      ),
    )

    expect(container.textContent).toContain('N/A')
  })

  it('应该自定义值和标签字段', async () => {
    const form = createForm()
    const customOptions = [
      {
        id: 'custom1',
        text: '自定义1',
        children: [
          {
            id: 'custom1-1',
            text: '自定义1-1',
          },
        ],
      },
    ]

    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="cascader"
            initialValue={['custom1', 'custom1-1']}
            readPretty={true}
            component={[Cascader, {
              props: {
                value: 'id',
                label: 'text',
              },
            }]}
            dataSource={customOptions}
          />
        </FormProvider>
      ),
    )

    expect(container.textContent).toContain('自定义1 / 自定义1-1')
  })
})
