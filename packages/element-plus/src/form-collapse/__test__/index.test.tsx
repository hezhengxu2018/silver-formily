import { createForm } from '@formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/vue'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import { FormCollapse, FormItem, FormLayout, Input, Submit } from '../../index'
import 'element-plus/theme-chalk/index.css'

describe('formCollapse', () => {
  describe('基础功能', () => {
    it('应该通过 schema 正常渲染', async () => {
      const { SchemaField } = createSchemaField({
        components: {
          FormItem,
          FormCollapse,
          Input,
        },
      })

      const form = createForm()
      const formCollapse = FormCollapse.createFormCollapse()

      const schema = {
        type: 'object',
        properties: {
          collapse: {
            'type': 'void',
            'title': '折叠面板',
            'x-decorator': 'FormItem',
            'x-component': 'FormCollapse',
            'x-component-props': {
              formCollapse: '{{formCollapse}}',
            },
            'properties': {
              tab1: {
                'type': 'void',
                'x-component': 'FormCollapse.Item',
                'x-component-props': {
                  title: 'A1',
                },
                'properties': {
                  aaa: {
                    'type': 'string',
                    'title': 'AAA',
                    'x-decorator': 'FormItem',
                    'required': true,
                    'x-component': 'Input',
                  },
                },
              },
              tab2: {
                'type': 'void',
                'x-component': 'FormCollapse.Item',
                'x-component-props': {
                  title: 'A2',
                },
                'properties': {
                  bbb: {
                    'type': 'string',
                    'title': 'BBB',
                    'x-decorator': 'FormItem',
                    'required': true,
                    'x-component': 'Input',
                  },
                },
              },
            },
          },
        },
      }

      const { container } = render(() => (
        <FormProvider form={form}>
          <FormLayout>
            <SchemaField schema={schema} scope={{ formCollapse }} />
          </FormLayout>
        </FormProvider>
      ))

      await expect.element(container.querySelector('.formily-element-plus-form-collapse')).toBeInTheDocument()
      await expect.element(container.querySelector('.el-collapse')).toBeInTheDocument()
      await expect.element(container.querySelector('.el-collapse-item')).toBeInTheDocument()
    })

    it('应该支持设置默认展开项', async () => {
      const { SchemaField } = createSchemaField({
        components: {
          FormItem,
          FormCollapse,
          Input,
        },
      })

      const form = createForm()
      const formCollapse = FormCollapse.createFormCollapse('tab1')

      const schema = {
        type: 'object',
        properties: {
          collapse: {
            'type': 'void',
            'title': '折叠面板',
            'x-decorator': 'FormItem',
            'x-component': 'FormCollapse',
            'x-component-props': {
              formCollapse: '{{formCollapse}}',
            },
            'properties': {
              tab1: {
                'type': 'void',
                'x-component': 'FormCollapse.Item',
                'x-component-props': {
                  title: 'A1',
                },
                'properties': {
                  aaa: {
                    'type': 'string',
                    'title': 'AAA',
                    'x-decorator': 'FormItem',
                    'required': true,
                    'x-component': 'Input',
                  },
                },
              },
              tab2: {
                'type': 'void',
                'x-component': 'FormCollapse.Item',
                'x-component-props': {
                  title: 'A2',
                },
                'properties': {
                  bbb: {
                    'type': 'string',
                    'title': 'BBB',
                    'x-decorator': 'FormItem',
                    'required': true,
                    'x-component': 'Input',
                  },
                },
              },
            },
          },
        },
      }

      const { container } = render(() => (
        <FormProvider form={form}>
          <FormLayout>
            <SchemaField schema={schema} scope={{ formCollapse }} />
          </FormLayout>
        </FormProvider>
      ))

      const activePanel = container.querySelector('.el-collapse-item.is-active')
      await expect.element(activePanel).toBeInTheDocument()
      await expect.element(activePanel).toHaveTextContent('A1')
    })

    it('应该可以通过 activeKey 设置展开项', async () => {
      const { SchemaField } = createSchemaField({
        components: {
          FormItem,
          FormCollapse,
          Input,
        },
      })

      const form = createForm()
      const formCollapse = FormCollapse.createFormCollapse()
      formCollapse.setActiveKeys(['tab2'])

      const schema = {
        type: 'object',
        properties: {
          collapse: {
            'type': 'void',
            'title': '折叠面板',
            'x-decorator': 'FormItem',
            'x-component': 'FormCollapse',
            'x-component-props': {
              formCollapse: '{{formCollapse}}',
            },
            'properties': {
              tab1: {
                'type': 'void',
                'x-component': 'FormCollapse.Item',
                'x-component-props': {
                  title: 'A1',
                },
                'properties': {
                  aaa: {
                    'type': 'string',
                    'title': 'AAA',
                    'x-decorator': 'FormItem',
                    'required': true,
                    'x-component': 'Input',
                  },
                },
              },
              tab2: {
                'type': 'void',
                'x-component': 'FormCollapse.Item',
                'x-component-props': {
                  title: 'A2',
                },
                'properties': {
                  bbb: {
                    'type': 'string',
                    'title': 'BBB',
                    'x-decorator': 'FormItem',
                    'required': true,
                    'x-component': 'Input',
                  },
                },
              },
            },
          },
        },
      }

      const { container } = render(() => (
        <FormProvider form={form}>
          <FormLayout>
            <SchemaField schema={schema} scope={{ formCollapse }} />
          </FormLayout>
        </FormProvider>
      ))

      const activePanel = container.querySelector('.el-collapse-item.is-active')
      await expect.element(activePanel).toBeInTheDocument()
      await expect.element(activePanel).toHaveTextContent('A2')
    })
  })

  describe('错误状态展示', () => {
    it('应该可以显示错误数量', async () => {
      const { SchemaField } = createSchemaField({
        components: {
          FormItem,
          FormCollapse,
          Input,
        },
      })

      const form = createForm()
      const formCollapse = FormCollapse.createFormCollapse()

      const schema = {
        type: 'object',
        properties: {
          collapse: {
            'type': 'void',
            'title': '折叠面板',
            'x-decorator': 'FormItem',
            'x-component': 'FormCollapse',
            'x-component-props': {
              formCollapse: '{{formCollapse}}',
            },
            'properties': {
              tab1: {
                'type': 'void',
                'x-component': 'FormCollapse.Item',
                'x-component-props': {
                  title: 'A1',
                },
                'properties': {
                  aaa: {
                    'type': 'string',
                    'title': 'AAA',
                    'x-decorator': 'FormItem',
                    'required': true,
                    'x-component': 'Input',
                  },
                },
              },
            },
          },
        },
      }

      form.createField({
        name: 'aaa',
        title: 'AAA',
        required: true,
        validator: { required: true, message: '此项为必填项' },
      })

      const submit = () => Promise.resolve()

      const { container, getByText } = render(() => (
        <FormProvider form={form}>
          <FormLayout>
            <SchemaField schema={schema} scope={{ formCollapse }} />
            <Submit onSubmit={submit}>提交</Submit>
          </FormLayout>
        </FormProvider>
      ))
      await getByText('提交').click()
      await expect.element(container.querySelector('.formily-element-plus-form-collapse-errors-badge')).toBeInTheDocument()
      await expect.element(container.querySelector('.el-badge__content')).toHaveTextContent('1')
    })
  })

  describe('formCollapse API', () => {
    it('应该可以通过hasActiveKey 方法正确判断', async () => {
      const formCollapse = FormCollapse.createFormCollapse(['tab1'])
      expect(formCollapse.hasActiveKey('tab1')).toBe(true)
      expect(formCollapse.hasActiveKey('tab2')).toBe(false)
    })

    it('应该可以通过setActiveKeys 方法正确设置', async () => {
      const formCollapse = FormCollapse.createFormCollapse(['tab1'])
      formCollapse.setActiveKeys(['tab2'])
      expect(formCollapse.hasActiveKey('tab1')).toBe(false)
      expect(formCollapse.hasActiveKey('tab2')).toBe(true)
    })

    it('应该可以通过addActiveKey 方法正确添加', async () => {
      const formCollapse = FormCollapse.createFormCollapse(['tab1'])
      formCollapse.addActiveKey('tab2')
      expect(formCollapse.hasActiveKey('tab1')).toBe(true)
      expect(formCollapse.hasActiveKey('tab2')).toBe(true)
    })

    it('应该可以通过removeActiveKey 方法正确移除', async () => {
      const formCollapse = FormCollapse.createFormCollapse(['tab1', 'tab2'])
      formCollapse.removeActiveKey('tab1')
      expect(formCollapse.hasActiveKey('tab1')).toBe(false)
      expect(formCollapse.hasActiveKey('panel2')).toBe(false)
    })

    it('应该可以通过toggleActiveKey 方法正确切换', async () => {
      const formCollapse = FormCollapse.createFormCollapse(['tab1'])
      formCollapse.toggleActiveKey('tab1')
      expect(formCollapse.hasActiveKey('tab1')).toBe(false)

      formCollapse.toggleActiveKey('tab2')
      expect(formCollapse.hasActiveKey('tab2')).toBe(true)
    })
  })

  describe('自定义标题', () => {
    it('应该可以通过 x-content.title 自定义标题', async () => {
      const { SchemaField } = createSchemaField({
        components: {
          FormItem,
          FormCollapse,
          Input,
        },
      })

      const form = createForm()
      const formCollapse = FormCollapse.createFormCollapse()

      const schema = {
        type: 'object',
        properties: {
          collapse: {
            'type': 'void',
            'title': '折叠面板',
            'x-decorator': 'FormItem',
            'x-component': 'FormCollapse',
            'x-component-props': {
              formCollapse: '{{formCollapse}}',
            },
            'properties': {
              tab1: {
                'type': 'void',
                'x-component': 'FormCollapse.Item',
                'x-component-props': {
                  title: '默认标题',
                },
                'x-content': {
                  title: '自定义标题',
                },
                'properties': {
                  aaa: {
                    'type': 'string',
                    'title': 'AAA',
                    'x-decorator': 'FormItem',
                    'required': true,
                    'x-component': 'Input',
                  },
                },
              },
            },
          },
        },
      }

      const { container } = render(() => (
        <FormProvider form={form}>
          <FormLayout>
            <SchemaField schema={schema} scope={{ formCollapse }} />
          </FormLayout>
        </FormProvider>
      ))

      await expect.element(container.querySelector('.el-collapse-item__header')).toBeInTheDocument()
      await expect.element(container.querySelector('.el-collapse-item__header')).toHaveTextContent('自定义标题')
    })

    it('应该可以通过 x-content.title 函数自定义标题', async () => {
      const { SchemaField } = createSchemaField({
        components: {
          FormItem,
          FormCollapse,
          Input,
        },
      })

      const form = createForm()
      const formCollapse = FormCollapse.createFormCollapse()
      const customTitle = vi.fn().mockImplementation((errors) => {
        return `自定义标题 (${errors || 0})`
      })

      const schema = {
        type: 'object',
        properties: {
          collapse: {
            'type': 'void',
            'title': '折叠面板',
            'x-decorator': 'FormItem',
            'x-component': 'FormCollapse',
            'x-component-props': {
              formCollapse: '{{formCollapse}}',
            },
            'properties': {
              tab1: {
                'type': 'void',
                'x-component': 'FormCollapse.Item',
                'x-component-props': {
                  title: '默认标题',
                },
                'x-content': {
                  title: customTitle,
                },
                'properties': {
                  aaa: {
                    'type': 'string',
                    'title': 'AAA',
                    'x-decorator': 'FormItem',
                    'required': true,
                    'x-component': 'Input',
                  },
                },
              },
            },
          },
        },
      }

      const { container } = render(() => (
        <FormProvider form={form}>
          <FormLayout>
            <SchemaField schema={schema} scope={{ formCollapse, customTitle }} />
          </FormLayout>
        </FormProvider>
      ))

      await expect.element(container.querySelector('.el-collapse-item__header')).toBeInTheDocument()
      await expect.element(container.querySelector('.el-collapse-item__header')).toHaveTextContent('自定义标题 (0)')
      expect(customTitle).toHaveBeenCalled()
    })

    it('应该可以通过 x-content.title 函数显示错误数量', async () => {
      const { SchemaField } = createSchemaField({
        components: {
          FormItem,
          FormCollapse,
          Input,
        },
      })

      const form = createForm()
      const formCollapse = FormCollapse.createFormCollapse()
      const customTitle = vi.fn().mockImplementation((errors) => {
        return `自定义标题 (${errors || 0})`
      })

      const schema = {
        type: 'object',
        properties: {
          collapse: {
            'type': 'void',
            'title': '折叠面板',
            'x-decorator': 'FormItem',
            'x-component': 'FormCollapse',
            'x-component-props': {
              formCollapse: '{{formCollapse}}',
            },
            'properties': {
              tab1: {
                'type': 'void',
                'x-component': 'FormCollapse.Item',
                'x-component-props': {
                  title: '默认标题',
                },
                'x-content': {
                  title: customTitle,
                },
                'properties': {
                  aaa: {
                    'type': 'string',
                    'title': 'AAA',
                    'x-decorator': 'FormItem',
                    'required': true,
                    'x-component': 'Input',
                  },
                },
              },
            },
          },
        },
      }

      form.createField({
        name: 'aaa',
        title: 'AAA',
        required: true,
        validator: { required: true, message: '此项为必填项' },
      })

      const submit = () => Promise.resolve()

      const { container, getByText } = render(() => (
        <FormProvider form={form}>
          <FormLayout>
            <SchemaField schema={schema} scope={{ formCollapse, customTitle }} />
            <Submit onSubmit={submit}>提交</Submit>
          </FormLayout>
        </FormProvider>
      ))

      await getByText('提交').click()

      // 验证自定义标题函数被调用并传入了错误数量
      expect(customTitle).toHaveBeenCalledWith(1)

      // 验证错误徽标显示
      await expect.element(container.querySelector('.formily-element-plus-form-collapse-errors-badge')).toBeInTheDocument()
      await expect.element(container.querySelector('.el-badge__content')).toHaveTextContent('1')

      // 验证标题内容
      await expect.element(container.querySelector('.el-collapse-item__header')).toHaveTextContent('自定义标题 (1)')
    })
  })

  describe('配置项测试', () => {
    it('应该只能展开一个面板，在accordion模式下', async () => {
      const { SchemaField } = createSchemaField({
        components: {
          FormItem,
          FormCollapse,
          Input,
        },
      })

      const form = createForm()
      const formCollapse = FormCollapse.createFormCollapse(['tab1'])

      const schema = {
        type: 'object',
        properties: {
          collapse: {
            'type': 'void',
            'title': '折叠面板',
            'x-decorator': 'FormItem',
            'x-component': 'FormCollapse',
            'x-component-props': {
              formCollapse: '{{formCollapse}}',
              accordion: true,
            },
            'properties': {
              tab1: {
                'type': 'void',
                'x-component': 'FormCollapse.Item',
                'x-component-props': {
                  title: 'A1',
                },
                'properties': {
                  aaa: {
                    'type': 'string',
                    'title': 'AAA',
                    'x-decorator': 'FormItem',
                    'required': true,
                    'x-component': 'Input',
                  },
                },
              },
              tab2: {
                'type': 'void',
                'x-component': 'FormCollapse.Item',
                'x-component-props': {
                  title: 'A2',
                },
                'properties': {
                  bbb: {
                    'type': 'string',
                    'title': 'BBB',
                    'x-decorator': 'FormItem',
                    'required': true,
                    'x-component': 'Input',
                  },
                },
              },
            },
          },
        },
      }

      const { container } = render(() => (
        <FormProvider form={form}>
          <FormLayout>
            <SchemaField schema={schema} scope={{ formCollapse }} />
          </FormLayout>
        </FormProvider>
      ))

      // 初始状态下，tab1 应该是展开的
      const activePanels = container.querySelectorAll('.el-collapse-item.is-active')
      expect(activePanels.length).toBe(1)
      await expect.element(activePanels[0]).toHaveTextContent('A1')

      // 模拟点击第二个面板
      const secondPanelHeader = container.querySelectorAll('.el-collapse-item__header')[1]
      await userEvent.click(secondPanelHeader)
      // 点击后，只有第二个面板展开，第一个面板关闭
      const newActivePanels = container.querySelectorAll('.el-collapse-item.is-active')
      expect(newActivePanels.length).toBe(1)
      await expect.element(newActivePanels[0]).toHaveTextContent('A2')

      // 验证 formCollapse 中的 activeKeys 也被正确更新
      expect(formCollapse.hasActiveKey('tab1')).toBe(false)
      expect(formCollapse.hasActiveKey('tab2')).toBe(true)
    })

    it('应该正常渲染，在不提供 formCollapse 时', async () => {
      const { SchemaField } = createSchemaField({
        components: {
          FormItem,
          FormCollapse,
          Input,
        },
      })

      const form = createForm()

      const schema = {
        type: 'object',
        properties: {
          collapse: {
            'type': 'void',
            'title': '折叠面板',
            'x-decorator': 'FormItem',
            'x-component': 'FormCollapse',
            'properties': {
              tab1: {
                'type': 'void',
                'x-component': 'FormCollapse.Item',
                'x-component-props': {
                  title: 'A1',
                },
                'properties': {
                  aaa: {
                    'type': 'string',
                    'title': 'AAA',
                    'x-decorator': 'FormItem',
                    'required': true,
                    'x-component': 'Input',
                  },
                },
              },
              tab2: {
                'type': 'void',
                'x-component': 'FormCollapse.Item',
                'x-component-props': {
                  title: 'A2',
                },
                'properties': {
                  bbb: {
                    'type': 'string',
                    'title': 'BBB',
                    'x-decorator': 'FormItem',
                    'required': true,
                    'x-component': 'Input',
                  },
                },
              },
            },
          },
        },
      }

      const { container } = render(() => (
        <FormProvider form={form}>
          <FormLayout>
            <SchemaField schema={schema} />
          </FormLayout>
        </FormProvider>
      ))

      // 验证组件正常渲染
      await expect.element(container.querySelector('.formily-element-plus-form-collapse')).toBeInTheDocument()
      await expect.element(container.querySelector('.el-collapse')).toBeInTheDocument()

      // 默认情况下，所有面板都应该展开
      const activePanels = container.querySelectorAll('.el-collapse-item.is-active')
      expect(activePanels.length).toBe(2)
    })

    it('应该正常渲染，在配置 activeKey 属性时', async () => {
      const { SchemaField } = createSchemaField({
        components: {
          FormItem,
          FormCollapse,
          Input,
        },
      })

      const form = createForm()

      const schema = {
        type: 'object',
        properties: {
          collapse: {
            'type': 'void',
            'title': '折叠面板',
            'x-decorator': 'FormItem',
            'x-component': 'FormCollapse',
            'x-component-props': {
              activeKey: 'tab2',
            },
            'properties': {
              tab1: {
                'type': 'void',
                'x-component': 'FormCollapse.Item',
                'x-component-props': {
                  title: 'A1',
                },
                'properties': {
                  aaa: {
                    'type': 'string',
                    'title': 'AAA',
                    'x-decorator': 'FormItem',
                    'required': true,
                    'x-component': 'Input',
                  },
                },
              },
              tab2: {
                'type': 'void',
                'x-component': 'FormCollapse.Item',
                'x-component-props': {
                  title: 'A2',
                },
                'properties': {
                  bbb: {
                    'type': 'string',
                    'title': 'BBB',
                    'x-decorator': 'FormItem',
                    'required': true,
                    'x-component': 'Input',
                  },
                },
              },
            },
          },
        },
      }

      const { container } = render(() => (
        <FormProvider form={form}>
          <FormLayout>
            <SchemaField schema={schema} />
          </FormLayout>
        </FormProvider>
      ))

      // 验证组件正常渲染
      await expect.element(container.querySelector('.formily-element-plus-form-collapse')).toBeInTheDocument()

      // 只有 tab2 应该被展开
      const activePanels = container.querySelectorAll('.el-collapse-item.is-active')
      expect(activePanels.length).toBe(1)
      await expect.element(activePanels[0]).toHaveTextContent('A2')
    })

    it('应该通过 visible 属性控制面板的显示和隐藏', async () => {
      const { SchemaField } = createSchemaField({
        components: {
          FormItem,
          FormCollapse,
          Input,
        },
      })

      const form = createForm()
      const formCollapse = FormCollapse.createFormCollapse()

      const schema = {
        type: 'object',
        properties: {
          collapse: {
            'type': 'void',
            'title': '折叠面板',
            'x-decorator': 'FormItem',
            'x-component': 'FormCollapse',
            'x-component-props': {
              formCollapse: '{{formCollapse}}',
            },
            'properties': {
              tab1: {
                'type': 'void',
                'x-component': 'FormCollapse.Item',
                'x-component-props': {
                  title: 'A1',
                },
                'properties': {
                  aaa: {
                    'type': 'string',
                    'title': 'AAA',
                    'x-decorator': 'FormItem',
                    'required': true,
                    'x-component': 'Input',
                  },
                },
              },
              tab2: {
                'type': 'void',
                'x-component': 'FormCollapse.Item',
                'x-component-props': {
                  title: 'A2',
                },
                'properties': {
                  bbb: {
                    'type': 'string',
                    'title': 'BBB',
                    'x-decorator': 'FormItem',
                    'required': true,
                    'x-component': 'Input',
                  },
                },
              },
              tab3: {
                'type': 'void',
                'x-visible': false,
                'x-component': 'FormCollapse.Item',
                'x-component-props': {
                  title: 'A3',
                },
                'properties': {
                  ccc: {
                    'type': 'string',
                    'title': 'CCC',
                    'x-decorator': 'FormItem',
                    'required': true,
                    'x-component': 'Input',
                  },
                },
              },
            },
          },
        },
      }

      const { container } = render(() => (
        <FormProvider form={form}>
          <FormLayout>
            <SchemaField schema={schema} scope={{ formCollapse }} />
          </FormLayout>
        </FormProvider>
      ))

      await vi.waitFor(() => {
        const initialPanels = container.querySelectorAll('.el-collapse-item')
        expect(initialPanels.length).toBe(2)
      })

      form.query('tab3').take((field) => {
        field.visible = true
      })

      await vi.waitFor(() => {
        const initialPanels = container.querySelectorAll('.el-collapse-item')
        expect(initialPanels.length).toBe(3)
      })
    })
  })
})
