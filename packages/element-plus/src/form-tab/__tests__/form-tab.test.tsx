import { createForm } from '@formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/vue'
import { ElButton } from 'element-plus'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import { FormItem, Input } from '../../index'
import { FormTab } from '../index'
import 'element-plus/theme-chalk/index.css'

describe('formTab - JSON Schema', () => {
  const createTestSchema = (formTabRef?: any) => ({
    type: 'object',
    properties: {
      collapse: {
        'type': 'void',
        'x-component': 'FormTab',
        'x-component-props': {
          formTab: formTabRef || '{{formTab}}',
        },
        'properties': {
          tab1: {
            'type': 'void',
            'x-component': 'FormTab.TabPane',
            'x-component-props': {
              label: 'A1',
            },
            'properties': {
              aaa: {
                'type': 'string',
                'title': 'AAA',
                'x-decorator': 'FormItem',
                'required': true,
                'x-component': 'Input',
              },
              aaaa: {
                'type': 'string',
                'title': 'AAAA',
                'x-decorator': 'FormItem',
                'required': true,
                'x-component': 'Input',
              },
            },
          },
          tab2: {
            'type': 'void',
            'x-component': 'FormTab.TabPane',
            'x-component-props': {
              label: 'A2',
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
            'x-component': 'FormTab.TabPane',
            'x-component-props': {
              label: 'A3',
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
  })

  it('应该支持通过JSON Schema渲染FormTab', async () => {
    const formTab = FormTab.createFormTab()
    const { SchemaField } = createSchemaField({
      components: {
        FormItem,
        FormTab,
        Input,
      },
    })

    const { getByText } = render(() => (
      <FormProvider form={createForm()}>
        <SchemaField schema={createTestSchema()} scope={{ formTab }} />
      </FormProvider>
    ))

    await expect.element(getByText('A1')).toBeVisible()
    await expect.element(getByText('A2')).toBeVisible()
    await expect.element(getByText('AAA', { exact: true })).toBeVisible()
  })

  it('应该通过formTab控制默认激活Tab', async () => {
    const formTab = FormTab.createFormTab('tab2')
    const { SchemaField } = createSchemaField({
      components: {
        FormItem,
        FormTab,
        Input,
      },
    })

    const { getByText } = render(() => (
      <FormProvider form={createForm()}>
        <SchemaField schema={createTestSchema(formTab)} scope={{ formTab }} />
      </FormProvider>
    ))

    await expect.element(getByText('BBB')).toBeVisible()
  })

  it('应该可以通过formTab.setActiveKey切换Tab', async () => {
    const { SchemaField } = createSchemaField({
      components: {
        FormItem,
        FormTab,
        Input,
      },
    })

    const formTab = FormTab.createFormTab()
    const form = createForm()
    const { getByText, getByRole } = render(() => (
      <FormProvider form={form}>
        <SchemaField schema={createTestSchema(formTab)} scope={{ formTab }} />
        <ElButton onClick={() => formTab.setActiveKey('tab2')}>
          切换第二个Tab
        </ElButton>
      </FormProvider>
    ))

    await getByRole('button', { name: '切换第二个Tab' }).click()
    await expect.element(getByText('BBB')).toBeVisible()
  })

  it('应该可以通过form.query控制Tab显示/隐藏', async () => {
    const { SchemaField } = createSchemaField({
      components: {
        FormItem,
        FormTab,
        Input,
      },
    })

    const form = createForm()
    const formTab = FormTab.createFormTab('tab2')
    const { getByText, getByRole } = render(() => (
      <FormProvider form={form}>
        <SchemaField schema={createTestSchema()} scope={{ formTab }} />
        <ElButton
          onClick={() => {
            form.query('collapse.tab3').take((field) => {
              field.visible = !field.visible
            })
          }}
        >
          显示/隐藏最后一个Tab
        </ElButton>
      </FormProvider>
    ))

    // 初始状态Tab3应该显示
    await expect.element(getByText('A3')).toBeVisible()

    // 点击按钮隐藏Tab3
    await getByRole('button', { name: '显示/隐藏最后一个Tab' }).click()
    await expect.element(getByText('A3')).not.toBeInTheDocument()

    // 再次点击显示Tab3
    await getByRole('button', { name: '显示/隐藏最后一个Tab' }).click()
    await expect.element(getByText('A3')).toBeVisible()
  })

  it('应该支持通过短路径查询控制Tab显示/隐藏', async () => {
    const { SchemaField } = createSchemaField({
      components: {
        FormItem,
        FormTab,
        Input,
      },
    })

    const form = createForm()
    const formTab = FormTab.createFormTab('tab2')
    const { getByText, getByRole } = render(() => (
      <FormProvider form={form}>
        <SchemaField schema={createTestSchema()} scope={{ formTab }} />
        <ElButton
          onClick={() => {
            form.query('tab3').take((field) => {
              field.visible = !field.visible
            })
          }}
        >
          显示/隐藏最后一个Tab
        </ElButton>
      </FormProvider>
    ))

    await expect.element(getByText('A3')).toBeVisible()
    await getByRole('button', { name: '显示/隐藏最后一个Tab' }).click()
    await expect.element(getByText('A3')).not.toBeInTheDocument()
    await getByRole('button', { name: '显示/隐藏最后一个Tab' }).click()
    await expect.element(getByText('A3')).toBeVisible()
  })

  it('应该可以通过点击Tab标签切换内容', async () => {
    const { SchemaField } = createSchemaField({
      components: {
        FormItem,
        FormTab,
        Input,
      },
    })

    const formTab = FormTab.createFormTab()
    const { getByText } = render(() => (
      <FormProvider form={createForm()}>
        <SchemaField schema={createTestSchema(formTab)} scope={{ formTab }} />
      </FormProvider>
    ))

    await expect.element(getByText('AAA', { exact: true })).toBeVisible()

    await getByText('A2').click()
    await expect.element(getByText('BBB')).toBeVisible()

    await getByText('A3').click()
    await expect.element(getByText('CCC')).toBeVisible()
  })
})
