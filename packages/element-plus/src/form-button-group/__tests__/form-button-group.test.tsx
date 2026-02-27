import { createForm } from '@formily/core'
import { Field } from '@silver-formily/vue'
import { ElButton } from 'element-plus'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import { stylePrefix } from '../../__builtins__/configs/index'
import { Form, FormItem, Input } from '../../index'
import FormButtonGroupSticky from '../form-button-group-sticky.vue'
import FormButtonGroup from '../form-button-group.vue'
import 'element-plus/theme-chalk/index.css'

describe('formButtonGroup', () => {
  it('应该默认渲染左对齐的按钮组', async () => {
    const { container } = render(
      () => (
        <FormButtonGroup>
          <ElButton>提交</ElButton>
          <ElButton>重置</ElButton>
        </FormButtonGroup>
      ),
    )

    const buttonGroup = container.querySelector('.formily-element-plus-form-button-group')
    expect(buttonGroup).not.toBeNull()

    const style = globalThis.getComputedStyle(buttonGroup!)
    expect(style.justifyContent).toBe('flex-start')

    const buttons = container.querySelectorAll('.el-button')
    expect(buttons.length).toBe(2)
    expect(buttons[0].textContent).toContain('提交')
    expect(buttons[1].textContent).toContain('重置')
  })

  it('应该渲染右对齐的按钮组', async () => {
    const { container } = render(
      () => (
        <FormButtonGroup align="right">
          <ElButton>提交</ElButton>
          <ElButton>重置</ElButton>
        </FormButtonGroup>
      ),
    )

    const buttonGroup = container.querySelector('.formily-element-plus-form-button-group')
    expect(buttonGroup).not.toBeNull()

    const style = globalThis.getComputedStyle(buttonGroup!)
    expect(style.justifyContent).toBe('flex-end')
  })

  it('应该正确渲染居中对齐的按钮组', async () => {
    const { container } = render(
      () => (
        <FormButtonGroup align="center">
          <ElButton>提交</ElButton>
          <ElButton>重置</ElButton>
        </FormButtonGroup>
      ),
    )

    const buttonGroup = container.querySelector('.formily-element-plus-form-button-group')
    expect(buttonGroup).not.toBeNull()

    const style = globalThis.getComputedStyle(buttonGroup!)
    expect(style.justifyContent).toBe('center')
  })

  it('应该支持自定义按钮间距', async () => {
    const { container } = render(
      () => (
        <FormButtonGroup gutter={20}>
          <ElButton>提交</ElButton>
          <ElButton>重置</ElButton>
        </FormButtonGroup>
      ),
    )

    const space = container.querySelector('.el-space')
    expect(space).not.toBeNull()
    expect(space!.getAttribute('style')).toContain('gap: 0px 20px;')
  })

  it('应该作为表单项对齐，在开启alignFormItem时', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <Form
          form={form}
          labelCol={6}
          wrapperCol={10}
        >
          <Field name="test" title="测试标题长度长度长度" decorator={[FormItem]} component={[Input]}></Field>
          <FormButtonGroup alignFormItem={true}>
            <ElButton>提交</ElButton>
            <ElButton>重置</ElButton>
          </FormButtonGroup>
        </Form>
      ),
    )

    const formItem = container.querySelector(`.${stylePrefix}-form-item-col-6`)
    expect(formItem).not.toBeNull()

    const formItemStyle = globalThis.getComputedStyle(formItem!)
    expect(formItemStyle.margin).toBe('0px')
    expect(formItemStyle.paddingTop).toBe('0px')

    const space = container.querySelector('.el-space')
    expect(space).not.toBeNull()

    const buttons = container.querySelectorAll('.el-button')
    expect(buttons.length).toBe(2)
  })

  it('应该传递属性到表单项', async () => {
    const { container } = render(
      () => (
        <FormButtonGroup
          alignFormItem={true}
          class="custom-form-item-class"
        >
          <ElButton>提交</ElButton>
          <ElButton>重置</ElButton>
        </FormButtonGroup>
      ),
    )

    const formItem = container.querySelector('.custom-form-item-class')
    expect(formItem).not.toBeNull()
  })

  describe('formButtonGroupSticky', () => {
    it('应该默认渲染粘性按钮组', async () => {
      const form = createForm()
      const { container } = render(
        () => (
          <Form form={form}>
            <div id={`formily-${form.id}`} style="height: 200px;">
              <Field name="test" title="测试" decorator={[FormItem]} component={[Input]} />
            </div>
            <FormButtonGroupSticky>
              <ElButton>提交</ElButton>
              <ElButton>重置</ElButton>
            </FormButtonGroupSticky>
          </Form>
        ),
      )

      const stickyGroup = container.querySelector('.formily-element-plus-form-button-group__sticky')
      expect(stickyGroup).not.toBeNull()

      const affix = container.querySelector('.el-affix')
      expect(affix).not.toBeNull()

      const buttons = container.querySelectorAll('.el-button')
      expect(buttons.length).toBe(2)
      expect(buttons[0].textContent).toContain('提交')
      expect(buttons[1].textContent).toContain('重置')
    })

    it('应该设置默认位置为 bottom', async () => {
      const form = createForm()
      const { container } = render(
        () => (
          <Form form={form}>
            <div id={`formily-${form.id}`} style="height: 200px;">
              <Field name="test" title="测试" decorator={[FormItem]} component={[Input]} />
            </div>
            <FormButtonGroupSticky>
              <ElButton>提交</ElButton>
            </FormButtonGroupSticky>
          </Form>
        ),
      )

      const affix = container.querySelector('.el-affix')
      expect(affix).not.toBeNull()
      // ElAffix 组件会根据 position 属性设置相应的样式
    })

    it('应该自定义 position 属性', async () => {
      const form = createForm()
      const { container } = render(
        () => (
          <Form form={form}>
            <div id={`formily-${form.id}`} style="height: 200px;">
              <Field name="test" title="测试" decorator={[FormItem]} component={[Input]} />
            </div>
            <FormButtonGroupSticky position="top">
              <ElButton>提交</ElButton>
            </FormButtonGroupSticky>
          </Form>
        ),
      )

      const affix = container.querySelector('.el-affix')
      expect(affix).not.toBeNull()
    })

    it('应该自定义 target 属性', async () => {
      const form = createForm()
      const { container } = render(
        () => (
          <Form form={form}>
            <div id="custom-target" style="height: 200px;">
              <Field name="test" title="测试" decorator={[FormItem]} component={[Input]} />
            </div>
            <FormButtonGroupSticky target="#custom-target">
              <ElButton>提交</ElButton>
            </FormButtonGroupSticky>
          </Form>
        ),
      )

      const affix = container.querySelector('.el-affix')
      expect(affix).not.toBeNull()
    })

    it('应该使用默认 target 为表单 ID', async () => {
      const form = createForm()
      const { container } = render(
        () => (
          <Form form={form}>
            <div id={`formily-${form.id}`} style="height: 200px;">
              <Field name="test" title="测试" decorator={[FormItem]} component={[Input]} />
            </div>
            <FormButtonGroupSticky>
              <ElButton>提交</ElButton>
            </FormButtonGroupSticky>
          </Form>
        ),
      )

      const affix = container.querySelector('.el-affix')
      expect(affix).not.toBeNull()

      const stickyGroup = container.querySelector('.formily-element-plus-form-button-group__sticky')
      expect(stickyGroup).not.toBeNull()
    })

    it('应该设置 offset 偏移量', async () => {
      const form = createForm()
      const { container } = render(
        () => (
          <Form form={form}>
            <div id={`formily-${form.id}`} style="height: 200px;">
              <Field name="test" title="测试" decorator={[FormItem]} component={[Input]} />
            </div>
            <FormButtonGroupSticky offset={20}>
              <ElButton>提交</ElButton>
            </FormButtonGroupSticky>
          </Form>
        ),
      )

      const affix = container.querySelector('.el-affix')
      expect(affix).not.toBeNull()
    })
  })
})
