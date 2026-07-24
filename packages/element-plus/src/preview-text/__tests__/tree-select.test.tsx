import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import TreeSelect from '../../tree-select'
import 'element-plus/theme-chalk/index.css'

const dataSource = [
  {
    value: 'parent',
    label: '父节点',
    children: [{ value: 'child', label: '子节点' }],
  },
]

function renderTreeSelect(initialValue: any, props: Record<string, any> = {}) {
  const form = createForm()
  const result = render(
    () => (
      <FormProvider form={form}>
        <Field
          name="treeSelect"
          initialValue={initialValue}
          readPretty
          component={[TreeSelect, props]}
          dataSource={dataSource}
        />
      </FormProvider>
    ),
  )
  return result.container
}

describe('previewText.TreeSelect', () => {
  it('应该递归查找树节点并显示子节点文本', () => {
    const container = renderTreeSelect('child')

    expect(container.textContent).toContain('子节点')
  })

  it('应该支持多选树节点', () => {
    const container = renderTreeSelect(['parent', 'child'], { multiple: true })
    const tags = container.querySelectorAll('.el-tag')

    expect(tags).toHaveLength(2)
    expect(tags[0].textContent).toContain('父节点')
    expect(tags[1].textContent).toContain('子节点')
  })

  it('应该支持自定义树节点字段', () => {
    const form = createForm()
    const container = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="treeSelect"
            initialValue="child"
            readPretty
            component={[TreeSelect, { props: { value: 'id', label: 'text', children: 'nodes' } }]}
            dataSource={[{ id: 'parent', text: '父节点', nodes: [{ id: 'child', text: '自定义子节点' }] }]}
          />
        </FormProvider>
      ),
    )

    expect(container.container.textContent).toContain('自定义子节点')
  })
})
