import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import Select from '../../select'
import 'element-plus/theme-chalk/index.css'

describe('previewText.Select', () => {
  // 选择器的选项数据
  const options = [
    { label: '选项1', value: 1 },
    { label: '选项2', value: 2 },
    { label: '选项3', value: 3 },
  ]

  it('应该在单选模式下正确显示选中值', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="select"
            initialValue={2}
            readPretty={true}
            component={[Select]}
            dataSource={options}
          />
        </FormProvider>
      ),
    )
    expect(container.textContent).toContain('选项2')
  })

  it('应该在单选模式下显示原始值（当找不到对应选项时）', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="select"
            initialValue={4}
            readPretty={true}
            component={[Select]}
            dataSource={options}
          />
        </FormProvider>
      ),
    )
    expect(container.textContent).toContain('4')
  })

  it('应该在多选模式下正确显示多个选中值', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="select"
            initialValue={[1, 3]}
            readPretty={true}
            component={[Select, { multiple: true }]}
            dataSource={options}
          />
        </FormProvider>
      ),
    )

    const tags = container.querySelectorAll('.el-tag')
    expect(tags.length).toBe(2)
    expect(tags[0].textContent).toContain('选项1')
    expect(tags[1].textContent).toContain('选项3')
  })

  it('应该在多选模式下显示原始值（当找不到对应选项时）', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="select"
            initialValue={[1, 5]}
            readPretty={true}
            component={[Select, { multiple: true }]}
            dataSource={options}
          />
        </FormProvider>
      ),
    )

    const tags = container.querySelectorAll('.el-tag')
    expect(tags.length).toBe(2)
    expect(tags[0].textContent).toContain('选项1')
    expect(tags[1].textContent).toContain('5')
  })

  it('应该空值显示占位符', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="select"
            initialValue={null}
            readPretty={true}
            component={[Select]}
            dataSource={options}
          />
        </FormProvider>
      ),
    )
    expect(container.textContent).toContain('N/A')
  })

  it('应该处理空数组值', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="select"
            initialValue={[]}
            readPretty={true}
            component={[Select, { multiple: true }]}
            dataSource={options}
          />
        </FormProvider>
      ),
    )

    // 空数组不应该显示任何标签
    const tags = container.querySelectorAll('.el-tag')
    expect(tags.length).toBe(0)
  })
})
