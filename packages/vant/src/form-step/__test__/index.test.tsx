import type { ISchema } from '@formily/json-schema'
import { createForm } from '@formily/core'
import { observer } from '@silver-formily/reactive-vue'
import { createSchemaField, FormProvider } from '@silver-formily/vue'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { defineComponent } from 'vue'
import { getElement } from '../../__test__/dom'
import { FormItem, FormStep, Input, useFormStep } from '../../index'
import 'vant/lib/index.css'

function createTestSchema(): ISchema {
  return {
    type: 'object',
    properties: {
      stepper: {
        'type': 'void',
        'x-component': 'FormStep',
        'x-component-props': {
          formStep: '{{formStep}}',
        },
        'properties': {
          basic: {
            'type': 'void',
            'x-component': 'FormStep.StepPane',
            'x-component-props': {
              title: '基础信息',
            },
            'properties': {
              name: {
                'type': 'string',
                'title': '姓名',
                'required': true,
                'x-decorator': 'FormItem',
                'x-component': 'Input',
              },
            },
          },
          confirm: {
            'type': 'void',
            'x-component': 'FormStep.StepPane',
            'x-component-props': {
              title: '确认提交',
            },
            'properties': {
              mobile: {
                'type': 'string',
                'title': '手机号',
                'required': true,
                'x-decorator': 'FormItem',
                'x-component': 'Input',
              },
            },
          },
        },
      },
    },
  }
}

describe('form-step', () => {
  describe('基础渲染', () => {
    it('应该通过 schema 渲染分步表单', async () => {
      const { SchemaField } = createSchemaField({
        components: {
          FormItem,
          FormStep,
          Input,
        },
      })

      const form = createForm()
      const formStep = FormStep.createFormStep()
      const { container } = render(() => (
        <FormProvider form={form}>
          <SchemaField schema={createTestSchema()} scope={{ formStep }} />
        </FormProvider>
      ))

      await expect.element(getElement(container, '.silver-formily-vant-form-step')).toBeInTheDocument()
      await expect.element(getElement(container, '.van-steps')).toBeInTheDocument()
      expect(container.querySelectorAll('.van-step')).toHaveLength(2)
      expect(container.textContent).toContain('基础信息')
    })

    it('应该支持设置默认当前步骤', async () => {
      const { SchemaField } = createSchemaField({
        components: {
          FormItem,
          FormStep,
          Input,
        },
      })

      const form = createForm()
      const formStep = FormStep.createFormStep(1)

      const page = render(() => (
        <FormProvider form={form}>
          <SchemaField schema={createTestSchema()} scope={{ formStep }} />
        </FormProvider>
      ))

      await expect.element(page.getByText('手机号')).toBeVisible()
      expect(formStep.current).toBe(1)
    })

    it('应该支持隐藏步骤条显示', async () => {
      const { SchemaField } = createSchemaField({
        components: {
          FormItem,
          FormStep,
          Input,
        },
      })

      const form = createForm()
      const formStep = FormStep.createFormStep()
      const schema = createTestSchema()
      const properties = schema.properties as Record<string, ISchema> | undefined
      const stepperSchema = properties?.stepper as ISchema

      stepperSchema['x-component-props'] = {
        ...(stepperSchema['x-component-props'] as Record<string, unknown> | undefined),
        hideSteps: true,
      }

      const { container, getByText } = render(() => (
        <FormProvider form={form}>
          <SchemaField schema={schema} scope={{ formStep }} />
        </FormProvider>
      ))

      expect(container.querySelector('.van-steps')).toBeNull()
      await expect.element(getByText('姓名')).toBeVisible()
    })

    it('应该注入内部创建的 formStep 实例', async () => {
      let injectedFormStep: ReturnType<typeof useFormStep> | null = null

      const { SchemaField } = createSchemaField({
        components: {
          FormItem,
          FormStep,
          Input,
          StepProbe: defineComponent({
            setup() {
              injectedFormStep = useFormStep()
              return () => <span>step-probe</span>
            },
          }),
        },
      })

      const form = createForm()
      const schema: ISchema = {
        type: 'object',
        properties: {
          stepper: {
            'type': 'void',
            'x-component': 'FormStep',
            'properties': {
              basic: {
                'type': 'void',
                'x-component': 'FormStep.StepPane',
                'x-component-props': {
                  title: '基础信息',
                },
                'properties': {
                  probe: {
                    'type': 'void',
                    'x-component': 'StepProbe',
                  },
                },
              },
              confirm: {
                'type': 'void',
                'x-component': 'FormStep.StepPane',
                'x-component-props': {
                  title: '确认提交',
                },
                'properties': {
                  mobile: {
                    'type': 'string',
                    'title': '手机号',
                    'x-decorator': 'FormItem',
                    'x-component': 'Input',
                  },
                },
              },
            },
          },
        },
      }

      render(() => (
        <FormProvider form={form}>
          <SchemaField schema={schema} />
        </FormProvider>
      ))

      expect(injectedFormStep?.value).toBeTruthy()
      expect(injectedFormStep?.value.current).toBe(0)
      expect(injectedFormStep?.value.allowNext).toBe(true)
    })
  })

  describe('步骤切换', () => {
    it('应该支持校验后前进、返回和提交', async () => {
      const submit = vi.fn()

      const page = render(observer(defineComponent({
        setup() {
          const { SchemaField } = createSchemaField({
            components: {
              FormItem,
              FormStep,
              Input,
            },
          })

          const form = createForm()
          const formStep = FormStep.createFormStep()

          return () => (
            <FormProvider form={form}>
              <SchemaField schema={createTestSchema()} scope={{ formStep }} />
              <button
                type="button"
                disabled={!formStep.allowBack}
                onClick={() => formStep.back()}
              >
                上一步
              </button>
              <button
                type="button"
                disabled={!formStep.allowNext}
                onClick={() => formStep.next()}
              >
                下一步
              </button>
              <button
                type="button"
                disabled={formStep.allowNext}
                onClick={() => formStep.submit(submit)}
              >
                提交
              </button>
            </FormProvider>
          )
        },
      })))

      const backButton = page.getByRole('button', { name: '上一步' })
      const nextButton = page.getByRole('button', { name: '下一步' })
      const submitButton = page.getByRole('button', { name: '提交' })

      await expect.element(backButton).toBeDisabled()
      await expect.element(submitButton).toBeDisabled()

      await nextButton.click()

      await vi.waitFor(() => {
        const errorMessage = document.querySelector('.van-field__error-message')?.textContent ?? ''
        expect(errorMessage).toMatch(/必填|required/i)
      })

      expect(document.body.textContent).toContain('基础信息')
      await page.getByRole('textbox').fill('银羽')
      await nextButton.click()

      await expect.element(backButton).not.toBeDisabled()
      await expect.element(submitButton).not.toBeDisabled()
      await expect.element(page.getByText('手机号')).toBeVisible()

      await backButton.click()
      await expect.element(backButton).toBeDisabled()
      await expect.element(page.getByText('姓名')).toBeVisible()

      await page.getByRole('textbox').fill('银羽')
      await nextButton.click()
      await page.getByRole('textbox').fill('13800138000')
      await submitButton.click()

      await vi.waitFor(() => {
        expect(submit).toHaveBeenCalledTimes(1)
      })
    })

    it('应该支持通过内部创建的 formStep 切换步骤', async () => {
      const StepActions = defineComponent({
        setup() {
          const formStep = useFormStep()

          return () => (
            <button
              type="button"
              onClick={() => formStep.value.next()}
            >
              内部下一步
            </button>
          )
        },
      })

      const { SchemaField } = createSchemaField({
        components: {
          FormItem,
          FormStep,
          Input,
          StepActions,
        },
      })

      const form = createForm()
      const schema: ISchema = {
        type: 'object',
        properties: {
          stepper: {
            'type': 'void',
            'x-component': 'FormStep',
            'properties': {
              basic: {
                'type': 'void',
                'x-component': 'FormStep.StepPane',
                'x-component-props': {
                  title: '基础信息',
                },
                'properties': {
                  name: {
                    'type': 'string',
                    'title': '姓名',
                    'required': true,
                    'x-decorator': 'FormItem',
                    'x-component': 'Input',
                  },
                  actions: {
                    'type': 'void',
                    'x-component': 'StepActions',
                  },
                },
              },
              confirm: {
                'type': 'void',
                'x-component': 'FormStep.StepPane',
                'x-component-props': {
                  title: '确认提交',
                },
                'properties': {
                  mobile: {
                    'type': 'string',
                    'title': '手机号',
                    'x-decorator': 'FormItem',
                    'x-component': 'Input',
                  },
                },
              },
            },
          },
        },
      }

      const page = render(() => (
        <FormProvider form={form}>
          <SchemaField schema={schema} />
        </FormProvider>
      ))

      await page.getByRole('textbox').fill('银羽')
      await page.getByRole('button', { name: '内部下一步' }).click()
      await expect.element(page.getByText('手机号')).toBeVisible()
    })
  })

  describe('插槽与 API', () => {
    let form: ReturnType<typeof createForm>
    let formStep: ReturnType<typeof FormStep.createFormStep>

    beforeEach(() => {
      form = createForm()
      formStep = FormStep.createFormStep()
    })

    it('应该支持自定义标题和图标内容', async () => {
      const CustomIcon = defineComponent({
        setup() {
          return () => <span class="custom-step-icon">图标</span>
        },
      })

      const { SchemaField } = createSchemaField({
        components: {
          FormItem,
          FormStep,
          Input,
        },
      })

      const schema: ISchema = {
        type: 'object',
        properties: {
          stepper: {
            'type': 'void',
            'x-component': 'FormStep',
            'x-component-props': {
              formStep: '{{formStep}}',
            },
            'properties': {
              basic: {
                'type': 'void',
                'x-component': 'FormStep.StepPane',
                'x-component-props': {
                  title: '默认标题',
                },
                'x-content': {
                  title: '自定义标题',
                  icon: CustomIcon,
                },
                'properties': {
                  name: {
                    'type': 'string',
                    'title': '姓名',
                    'x-decorator': 'FormItem',
                    'x-component': 'Input',
                  },
                },
              },
            },
          },
        },
      }

      const { container, getByText } = render(() => (
        <FormProvider form={form}>
          <SchemaField schema={schema} scope={{ formStep }} />
        </FormProvider>
      ))

      await expect.element(getByText('自定义标题')).toBeInTheDocument()
      await expect.element(getElement(container, '.custom-step-icon')).toBeInTheDocument()
    })

    it('应该支持 formStep API', async () => {
      const validateSpy = vi.spyOn(form, 'validate').mockResolvedValue(null as never)
      const submitSpy = vi.spyOn(form, 'submit').mockResolvedValue(form.values as never)

      formStep.connect([
        { name: 'basic', props: { title: '第一步' }, schema: {} as any },
        { name: 'confirm', props: { title: '第二步' }, schema: {} as any },
      ], {
        form,
        address: 'stepper',
      } as any)

      formStep.setCurrent(1)
      expect(formStep.current).toBe(1)

      await formStep.back()
      expect(formStep.current).toBe(0)

      await formStep.next()
      expect(validateSpy).toHaveBeenCalled()
      expect(formStep.current).toBe(1)

      await formStep.submit(vi.fn())
      expect(submitSpy).toHaveBeenCalled()
    })
  })
})
