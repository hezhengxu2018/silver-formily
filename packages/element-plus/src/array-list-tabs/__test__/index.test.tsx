import { Close } from '@element-plus/icons-vue'
import { createForm } from '@formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/vue'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import { defineComponent } from 'vue'
import { ArrayListTabs, Editable, FormItem, Input, PreviewText, Submit } from '../../index'
import 'element-plus/theme-chalk/index.css'

export const ArrayListTabsTest = defineComponent({
  name: 'TestComponent',
  props: {
    form: {
      type: Object,
      default: () => createForm(),
    },
  },
  setup(props) {
    const {
      SchemaField,
      SchemaArrayField,
      SchemaObjectField,
      SchemaStringField,
      SchemaVoidField,
    } = createSchemaField({
      components: {
        FormItem,
        Input,
        ArrayListTabs,
        Submit,
      },
    })

    return () => (
      <FormProvider form={props.form}>
        <SchemaField>
          <SchemaArrayField
            name="array"
            x-decorator="FormItem"
            x-component="ArrayListTabs"
            x-component-props={{
              tabTitleField: 'input',
            }}
            x-validator={{
              max: 5,
            }}
          >
            <SchemaObjectField>
              <SchemaStringField
                name="input"
                x-decorator="FormItem"
                title="input"
                x-component="Input"
                x-component-props={{
                  placeholder: '请输入Input',
                }}
                x-validator={[{ required: true }]}
              />
              <SchemaStringField
                name="input2"
                x-decorator="FormItem"
                title="input2"
                x-component="Input"
              />
              <SchemaVoidField
                x-component="ArrayListTabs.Remove"
                x-component-props={{
                  icon: Close,
                }}
              />
            </SchemaObjectField>
            <SchemaVoidField
              x-component="ArrayListTabs.Addition"
              title="添加条目"
            />
          </SchemaArrayField>
        </SchemaField>
        <Submit>提交</Submit>
      </FormProvider>
    )
  },
})

// 新增：showTitleFieldInTab 测试组件
export const ArrayListTabsWithShowTitleFieldTest = defineComponent({
  name: 'ArrayListTabsWithShowTitleFieldTest',
  props: {
    form: {
      type: Object,
      default: () => createForm(),
    },
    showTitleFieldInTab: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const {
      SchemaField,
      SchemaArrayField,
      SchemaObjectField,
      SchemaStringField,
      SchemaVoidField,
    } = createSchemaField({
      components: {
        FormItem,
        Input,
        ArrayListTabs,
        Editable,
        PreviewText,
      },
    })

    return () => (
      <FormProvider form={props.form}>
        <SchemaField>
          <SchemaArrayField
            name="array"
            x-decorator="FormItem"
            x-component="ArrayListTabs"
            x-component-props={{
              tabTitleField: 'input',
              showTitleFieldInTab: props.showTitleFieldInTab,
            }}
          >
            <SchemaObjectField>
              <SchemaVoidField
                x-component="PreviewText"
                x-component-props={{
                  placeholder: '未命名条目',
                }}
              >
                <SchemaStringField
                  name="input"
                  x-decorator="Editable"
                  x-decorator-props={{
                    layout: 'inline',
                    size: 'small',
                    editProps: {
                      style: {
                        width: '120px',
                      },
                    },
                  }}
                  title="input"
                  x-component="Input"
                  x-component-props={{
                    placeholder: '请输入Input',
                  }}
                  x-validator={[{ required: true }]}
                />
              </SchemaVoidField>
              <SchemaStringField
                name="input2"
                x-decorator="FormItem"
                title="input2"
                x-component="Input"
                x-validator={[{ required: true }]}
              />
              <SchemaStringField
                name="input3"
                x-decorator="FormItem"
                title="input3"
                x-component="Input"
              />
              <SchemaVoidField
                x-component="ArrayListTabs.Remove"
                x-component-props={{
                  icon: Close,
                }}
              />
            </SchemaObjectField>
            <SchemaVoidField
              x-component="ArrayListTabs.Addition"
              title="添加条目"
            />
          </SchemaArrayField>
        </SchemaField>
        <Submit onSubmit={() => {}}>提交</Submit>
      </FormProvider>
    )
  },
})

describe('arrayListTabs', async () => {
  it('应该渲染', async () => {
    const screen = render(ArrayListTabsTest)
    await expect.element(screen.getByText('No Data')).toBeInTheDocument()
  })

  it('应该支持基础交互', async () => {
    const screen = render(ArrayListTabsTest)
    await screen.getByText('添加条目').click()
    await screen.getByText('添加条目').click()
    await screen.getByText('添加条目').click()
    await screen.getByText('添加条目').click()
    await screen.getByText('添加条目').click()
    await screen.getByText('添加条目').click()
    await expect
      .element(screen.getByText('5'))
      .toBeInTheDocument()
  })

  it('应该支持数据输入', async () => {
    const form = createForm()
    const screen = render(ArrayListTabsTest, { props: { form } })
    // 添加一个条目
    await screen.getByText('添加条目').click()

    // 获取输入框并输入数据
    const inputField = screen.getByPlaceholder('请输入Input')
    await inputField.fill('测试标题')
    await expect.element(screen.getByText('测试标题')).toBeInTheDocument()

    // 获取第二个输入框并输入数据
    await screen.getByLabelText('input2').fill('测试内容')

    expect(form.values.array[0].input).toBe('测试标题')
    expect(form.values.array[0].input2).toBe('测试内容')
  })

  it('应该支持tab页切换', async () => {
    const screen = render(ArrayListTabsTest)

    // 添加三个条目
    await screen.getByText('添加条目').click()
    await screen.getByText('添加条目').click()
    await screen.getByText('添加条目').click()

    // 为每个条目设置不同的标题
    const inputFields = screen.getByPlaceholder('请输入Input')
    await inputFields.nth(0).fill('Tab 1')
    await screen.getByText('未命名条目').nth(0).click()
    await inputFields.nth(1).fill('Tab 2')
    await screen.getByText('未命名条目').nth(0).click()
    await inputFields.nth(2).fill('Tab 3')
    await screen.getByText('Tab 2').click()
  })

  it('应该支持关闭tab页', async () => {
    const screen = render(ArrayListTabsTest)

    // 添加两个条目
    await screen.getByText('添加条目').click()
    await screen.getByText('添加条目').click()

    // // 为每个条目设置不同的标题
    const inputFields = screen.getByPlaceholder('请输入Input')
    await inputFields.nth(0).fill('Tab 1')
    await screen.getByText('未命名条目').nth(0).click()
    await inputFields.nth(1).fill('Tab 2')
    await expect.element(screen.getByText('Tab 1')).toBeInTheDocument()
    await expect.element(screen.getByText('Tab 2')).toBeInTheDocument()

    // 获取删除按钮并点击第一个tab的删除按钮
    const removeButtons = screen.container.querySelectorAll('.formily-element-plus-array-base-remove')
    await userEvent.click(removeButtons[1])

    await expect.element(screen.getByText('Tab 1')).toBeInTheDocument()
    const activeTab = screen.container.querySelector('.is-active')
    expect(activeTab.textContent).toContain('Tab 1')
  })

  describe('showTitleFieldInTab 配置项测试', () => {
    it('应该为可编辑组件，在showTitleFieldInTab 为 true 时', async () => {
      const form = createForm()
      const screen = render(ArrayListTabsWithShowTitleFieldTest, {
        props: {
          form,
          showTitleFieldInTab: true,
        },
      })

      // 添加一个条目
      await screen.getByText('添加条目').click()

      // 验证 tab 标题区域包含可编辑组件
      const tabContent = screen.container.querySelector('.formily-element-plus-array-list-tabs_list-item--content')
      expect(tabContent).toBeTruthy()

      // 验证存在 PreviewText 组件（显示"未命名条目"占位符）
      await expect.element(screen.getByText('未命名条目')).toBeInTheDocument()

      // 点击进入编辑模式
      await screen.getByText('未命名条目').click()

      // 验证出现输入框
      const editInput = screen.container.querySelector('.el-input__inner')
      expect(editInput).toBeTruthy()

      await userEvent.type(editInput, '可编辑标题')
      await userEvent.click(screen.container)
      await expect.element(screen.getByText('可编辑标题')).toBeInTheDocument()
    })

    it('应该不显示标题字段，在showTitleFieldInTab 为 true 时', async () => {
      const form = createForm()
      const screen = render(ArrayListTabsWithShowTitleFieldTest, {
        props: {
          form,
          showTitleFieldInTab: true,
        },
      })

      await screen.getByText('添加条目').click()

      const tabPanel = screen.container.querySelector('.formily-element-plus-array-list-tabs-tabpane')
      expect(tabPanel).toBeTruthy()

      // 验证只显示 input2 和 input3 字段
      await expect.element(screen.getByLabelText('input2')).toBeInTheDocument()
      await expect.element(screen.getByLabelText('input3')).toBeInTheDocument()

      // 验证不显示 input 字段的 FormItem（因为它在 tab 标题中渲染）
      const inputFormItems = screen.container.querySelectorAll('.el-form-item')
      const inputLabels = Array.from(inputFormItems).map(item => item.querySelector('.el-form-item__label')?.textContent)
      expect(inputLabels.filter(label => label === 'input')).toHaveLength(0)
    })

    it('应该有不同的错误统计行为，在不同 showTitleFieldInTab 配置下', async () => {
      // 测试 showTitleFieldInTab 为 true 时的错误统计
      const form1 = createForm()
      const screen1 = render(ArrayListTabsWithShowTitleFieldTest, {
        props: {
          form: form1,
          showTitleFieldInTab: true,
        },
      })

      await screen1.getByText('添加条目').click()
      await screen1.getByText('提交').click()
      const errorBadge1 = screen1.container.querySelector('.el-badge__content')
      expect(errorBadge1).toBeTruthy()
      expect(errorBadge1.textContent).toBe('1')
    })
  })
})
