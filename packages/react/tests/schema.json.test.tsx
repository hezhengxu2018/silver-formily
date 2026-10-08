import type React from 'react'
import type { Locator } from 'vitest/browser'
import { createForm } from '@silver-formily/core'
import { Schema } from '@silver-formily/json-schema'
import { useState } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { createSchemaField, FormProvider } from '../src'

afterEach(cleanup)

// vitest browser 的 locator 没有 queryAll 系列，这里通过 query() 判存在后再取全部匹配，
// 无匹配时返回空数组而不是抛错，等价于 testing-library 的 queryAllByTestId
async function getElementsOrEmpty(locator: Locator) {
  try {
    return await locator.elements()
  }
  catch {
    return []
  }
}

function Input({ value, onChange }: any) {
  return <input data-testid="input" value={value || ''} onChange={onChange} />
}

// 上游测试使用 antd 的 Button/Rate 与 @ant-design/icons 图标组件，
// 这里用等价的本地轻量实现保持断言语义不变
function Button({ icon, children, ...others }: any) {
  return (
    <button {...others}>
      {icon}
      {children}
    </button>
  )
}

const SearchOutlined = (props: any) => <span {...props}>search-icon</span>

function DollarOutlined({ rotate, ...others }: any) {
  return (
    <span
      {...others}
      style={{
        ...others.style,
        display: 'inline-block',
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
      }}
    >
      dollar-icon
    </span>
  )
}

function Rate({ defaultValue = 0, count = 10, character, ...others }: any) {
  const [value] = useState(defaultValue)
  return (
    <div role="radiogroup" {...others}>
      {Array.from({ length: count }, (_, index) => (
        <span key={index}>{character?.({ value, index })}</span>
      ))}
    </div>
  )
}

describe('json schema field', () => {
  it('string field', async () => {
    const form = createForm()
    const SchemaField = createSchemaField({
      components: {
        Input,
      },
    })
    const { getByTestId } = await render(
      <FormProvider form={form}>
        <SchemaField
          name="string"
          schema={
            new Schema({
              'type': 'string',
              'default': '123',
              'x-component': 'Input',
            })
          }
        />
      </FormProvider>,
    )
    const input = await getByTestId('input').element()
    expect(input).toBeInstanceOf(HTMLInputElement)
    expect(input.getAttribute('value')).toEqual('123')
  })
  it('object field', async () => {
    const form = createForm()
    const SchemaField = createSchemaField({
      components: {
        Input,
      },
    })
    const { getByTestId } = await render(
      <FormProvider form={form}>
        <SchemaField
          name="object"
          schema={{
            type: 'object',
            properties: {
              string: {
                'type': 'string',
                'x-component': 'Input',
              },
            },
          }}
        />
      </FormProvider>,
    )
    await expect.element(getByTestId('input')).toBeVisible()
  })
  it('x-component-props children', async () => {
    const form = createForm()
    const Text: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
      return <div data-testid="children-test">{children}</div>
    }
    const SchemaField = createSchemaField({
      components: {
        Text,
      },
    })
    const { getByTestId } = await render(
      <FormProvider form={form}>
        <SchemaField
          name="object"
          schema={{
            type: 'object',
            properties: {
              string: {
                'type': 'string',
                'x-component': 'Text',
                'x-component-props': {
                  children: 'children',
                },
              },
            },
          }}
        />
      </FormProvider>,
    )
    const element = await getByTestId('children-test').element()
    await expect.element(getByTestId('children-test')).toBeVisible()
    expect(element.innerHTML).toEqual('children')
  })
  it('x-content', async () => {
    const form = createForm()
    const Text: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
      return <div data-testid="content-test">{children}</div>
    }
    const SchemaField = createSchemaField({
      components: {
        Text,
      },
    })
    const { getByTestId } = await render(
      <FormProvider form={form}>
        <SchemaField
          name="object"
          schema={{
            type: 'object',
            properties: {
              string: {
                'type': 'string',
                'x-component': 'Text',
                'x-content': 'content',
              },
            },
          }}
        />
      </FormProvider>,
    )
    const element = await getByTestId('content-test').element()
    await expect.element(getByTestId('content-test')).toBeVisible()
    expect(element.innerHTML).toEqual('content')
  })
  it('x-slot-node', async () => {
    const form = createForm()
    const SchemaField = createSchemaField({
      components: {
        SearchOutlined,
        Button,
      },
    })
    const { getByTestId } = await render(
      <FormProvider form={form}>
        <SchemaField
          name="object"
          schema={{
            type: 'object',
            properties: {
              icon: {
                'x-slot-node': {
                  target: 'button.x-component-props.icon',
                },
                'x-component': 'SearchOutlined',
                'x-component-props': {
                  'data-testid': 'icon',
                },
              },
              button: {
                'type': 'string',
                'x-component': 'Button',
                'x-component-props': {
                  'data-testid': 'button',
                },
              },
            },
          }}
        />
      </FormProvider>,
    )
    const button = getByTestId('button')
    const icon = getByTestId('icon')

    await expect.element(button).toContainElement(icon)
  })
  it('x-slot-node render prop', async () => {
    const form = createForm()
    const SchemaField = createSchemaField({
      components: {
        Rate,
        DollarOutlined,
      },
    })
    const screen = await render(
      <FormProvider form={form}>
        <SchemaField
          name="object"
          schema={{
            type: 'object',
            properties: {
              icon: {
                'x-slot-node': {
                  target: 'rate.x-component-props.character',
                  isRenderProp: true,
                },
                'x-component': 'DollarOutlined',
                'x-component-props': {
                  'data-testid': 'icon',
                  'rotate': '{{$slotArgs[0].value * 45}}',
                  'style': {
                    // eslint-disable-next-line no-template-curly-in-string -- 字符串内容是 formily 表达式，${...} 不是 JS 插值
                    fontSize: '{{`${$slotArgs[0].value * 10}px`}}',
                  },
                },
              },
              rate: {
                'x-component': 'Rate',
                'x-component-props': {
                  defaultValue: 2,
                },
              },
            },
          }}
        />
      </FormProvider>,
    )

    const rate = screen.getByRole('radiogroup')
    await expect.element(rate).toBeVisible()
    const icons = await getElementsOrEmpty(screen.getByTestId('icon'))
    expect(icons).toHaveLength(10)
    const rateElement = await rate.element()
    for (const icon of icons) {
      expect(rateElement.contains(icon)).toBe(true)
    }

    const style = window.getComputedStyle(icons[0])
    const fontSize = style.fontSize
    expect(fontSize).toBe('20px')
  })
})
