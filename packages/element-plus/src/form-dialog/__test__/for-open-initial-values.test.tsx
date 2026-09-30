import { Field } from '@silver-formily/vue'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import { defineComponent } from 'vue'
import { FormDialog, FormItem, TreeSelect } from '../../index'
import 'element-plus/theme-chalk/index.css'

const tree = [
  {
    value: 'parent-1',
    label: 'Parent One',
    children: [
      { value: 'child-1', label: 'Child 1' },
      { value: 'child-2', label: 'Child 2' },
    ],
  },
  {
    value: 'parent-2',
    label: 'Parent Two',
    children: [
      { value: 'child-3', label: 'Child 3' },
    ],
  },
]

// DialogContent 内部会用 dialog 自己的 form 提供 FormProvider
const DialogForm = defineComponent({
  setup() {
    return () => (
      <Field
        name="treeSelect"
        title="多选树"
        decorator={[FormItem]}
        component={[TreeSelect, { multiple: true, checkStrictly: true, optionAsValue: true, defaultExpandAll: true }]}
        dataSource={tree}
      />
    )
  },
})

describe('formDialog forOpen initialValues', () => {
  it('forOpen 传入 initialValues 后，多选 TreeSelect 仍可勾选与取消单项', async () => {
    const dialog = FormDialog('测试', () => <DialogForm />)
      .forOpen((payload, next) => {
        payload.initialValues = {
          treeSelect: [{ value: 'parent-1', label: 'Parent One' }],
        }
        next(payload)
      })

    // open() 的 Promise 要等弹框确认/取消才 resolve，这里不 await，直接等渲染
    dialog.open().catch(() => undefined)
    const opener = render(() => <div />)

    // 弹框打开并回显初值
    await vi.waitFor(() => {
      expect(document.querySelector('.el-select__selection')?.textContent).toContain('Parent One')
    }, { interval: 200, timeout: 8000 })

    // 打开下拉勾选第二项（bug 场景中无法勾选）
    await userEvent.click(document.querySelector('.el-select')!)
    await vi.waitFor(() => expect(document.querySelector('.el-tree')).toBeTruthy(), { interval: 200, timeout: 8000 })
    const node = Array.from(document.querySelectorAll('.el-tree-node__content'))
      .find(el => el.textContent?.includes('Parent Two'))!
    await userEvent.click(node)
    await vi.waitFor(() => {
      expect(document.querySelectorAll('.el-tag').length).toBeGreaterThanOrEqual(2)
    }, { interval: 200, timeout: 8000 })

    // 点击 tag 关闭按钮取消单项（bug 场景中堆栈溢出）
    await userEvent.click(document.querySelector('.el-tag__close')!)
    await vi.waitFor(() => {
      expect(document.querySelectorAll('.el-tag').length).toBe(1)
    }, { interval: 200, timeout: 8000 })
    expect(document.querySelector('.el-select__selection')?.textContent).toContain('Parent Two')

    opener.unmount()
  }, 20000)
})
