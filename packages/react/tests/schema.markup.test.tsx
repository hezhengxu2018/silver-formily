import type React from 'react'
import type { Locator } from 'vitest/browser'
import { createForm } from '@silver-formily/core'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import {
  createSchemaField,
  FormProvider,
  RecordScope,
  RecordsScope,
  RecursionField,
  useField,
  useFieldSchema,
} from '../src'

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

afterEach(cleanup)

const Input: React.FC<{
  value?: string
  onChange?: (...args: any) => void
  [key: string]: any
}> = ({ value, onChange, ...others }) => {
  return (
    <input
      data-testid="input"
      {...others}
      value={value || ''}
      onChange={onChange}
    />
  )
}

describe('markup schema field', () => {
  it('string', async () => {
    const form = createForm()
    const SchemaField = createSchemaField({
      components: {
        Input,
      },
    })
    const { getByTestId } = await render(
      <FormProvider form={form}>
        <SchemaField>
          <SchemaField.String x-component="Input" />
        </SchemaField>
      </FormProvider>,
    )
    await expect.element(getByTestId('input')).toBeVisible()
  })
  it('boolean', async () => {
    const form = createForm()
    const SchemaField = createSchemaField({
      components: {
        Input,
      },
    })
    const { getByTestId } = await render(
      <FormProvider form={form}>
        <SchemaField>
          <SchemaField.Boolean x-component="Input" />
        </SchemaField>
      </FormProvider>,
    )
    await expect.element(getByTestId('input')).toBeVisible()
  })
  it('number', async () => {
    const form = createForm()
    const SchemaField = createSchemaField({
      components: {
        Input,
      },
    })
    const { getByTestId } = await render(
      <FormProvider form={form}>
        <SchemaField>
          <SchemaField.Number x-component="Input" />
        </SchemaField>
      </FormProvider>,
    )
    await expect.element(getByTestId('input')).toBeVisible()
  })
  it('date', async () => {
    const form = createForm()
    const SchemaField = createSchemaField({
      components: {
        Input,
      },
    })
    const { getByTestId } = await render(
      <FormProvider form={form}>
        <SchemaField>
          <SchemaField.Date x-component="Input" />
        </SchemaField>
      </FormProvider>,
    )
    await expect.element(getByTestId('input')).toBeVisible()
  })
  it('datetime', async () => {
    const form = createForm()
    const SchemaField = createSchemaField({
      components: {
        Input,
      },
    })
    const { getByTestId } = await render(
      <FormProvider form={form}>
        <SchemaField>
          <SchemaField.DateTime x-component="Input" />
        </SchemaField>
      </FormProvider>,
    )
    await expect.element(getByTestId('input')).toBeVisible()
  })
  it('void', async () => {
    const form = createForm()
    const VoidComponent = (props: any) => {
      return <div data-testid="void-component">{props.children}</div>
    }
    const SchemaField = createSchemaField({
      components: {
        VoidComponent,
      },
    })
    const { getByTestId } = await render(
      <FormProvider form={form}>
        <SchemaField>
          <SchemaField.Void x-component="VoidComponent" />
        </SchemaField>
      </FormProvider>,
    )
    await expect.element(getByTestId('void-component')).toBeInTheDocument()
  })
  it('array', async () => {
    const form = createForm()
    const SchemaField = createSchemaField({
      components: {
        Input,
      },
    })
    await render(
      <FormProvider form={form}>
        <SchemaField>
          <SchemaField.Array>
            <SchemaField.Object>
              <SchemaField.String x-component="Input" />
            </SchemaField.Object>
            <SchemaField.Void />
          </SchemaField.Array>
        </SchemaField>
      </FormProvider>,
    )
  })
  it('other', async () => {
    const form = createForm()
    const SchemaField = createSchemaField({
      components: {
        Input,
      },
    })
    await render(
      <FormProvider form={form}>
        <SchemaField>
          <SchemaField.Markup type="other">
            <SchemaField.Markup />
          </SchemaField.Markup>
        </SchemaField>
      </FormProvider>,
    )
  })
  it('no parent', async () => {
    const form = createForm()
    const SchemaField = createSchemaField({
      components: {
        Input,
      },
    })
    await render(
      <FormProvider form={form}>
        <SchemaField.Markup type="other">
          <SchemaField.Markup />
        </SchemaField.Markup>
      </FormProvider>,
    )
  })
  it('props children', async () => {
    const form = createForm()
    const Text = (props: any) => {
      return <div data-testid="children-test">{props.children}</div>
    }
    const SchemaField = createSchemaField({
      components: {
        Text,
      },
    })
    const { getByTestId } = await render(
      <FormProvider form={form}>
        <SchemaField>
          <SchemaField.Void
            x-component="Text"
            x-component-props={{ children: 'props' }}
          />
        </SchemaField>
      </FormProvider>,
    )
    const element = await getByTestId('children-test').element()
    await expect.element(getByTestId('children-test')).toBeVisible()
    expect(element.innerHTML).toEqual('props')
  })
  it('x-content', async () => {
    const form = createForm()
    const Text = (props: any) => {
      return <div data-testid="content-test">{props.children}</div>
    }
    const SchemaField = createSchemaField({
      components: {
        Text,
      },
    })
    const { getByTestId } = await render(
      <FormProvider form={form}>
        <SchemaField>
          <SchemaField.Void x-component="Text" x-content="content" />
        </SchemaField>
      </FormProvider>,
    )
    const element = await getByTestId('content-test').element()
    await expect.element(getByTestId('content-test')).toBeVisible()
    expect(element.innerHTML).toEqual('content')
  })
})

describe('recursion field', () => {
  it('onlyRenderProperties', async () => {
    const form = createForm()
    const CustomObject: React.FC = () => {
      const schema = useFieldSchema()
      return (
        <div data-testid="object">
          <RecursionField schema={schema} />
        </div>
      )
    }
    const CustomObject2: React.FC = () => {
      const field = useField()
      const schema = useFieldSchema()
      return (
        <div data-testid="only-properties">
          <RecursionField
            name={schema.name}
            basePath={field.address}
            schema={schema}
            onlyRenderProperties
          />
        </div>
      )
    }
    const SchemaField = createSchemaField({
      components: {
        Input,
        CustomObject,
        CustomObject2,
      },
    })
    const screen = await render(
      <FormProvider form={form}>
        <SchemaField>
          <SchemaField.Object x-component="CustomObject">
            <SchemaField.String x-component="Input" />
          </SchemaField.Object>
          <SchemaField.Object x-component="CustomObject2">
            <SchemaField.String x-component="Input" />
          </SchemaField.Object>
          <SchemaField.Void x-component="CustomObject2">
            <SchemaField.String x-component="Input" />
          </SchemaField.Void>
        </SchemaField>
      </FormProvider>,
    )
    expect(await getElementsOrEmpty(screen.getByTestId('input'))).toHaveLength(3)
    expect(await getElementsOrEmpty(screen.getByTestId('object'))).toHaveLength(1)
    expect(await getElementsOrEmpty(screen.getByTestId('only-properties'))).toHaveLength(2)
  })

  it('mapProperties', async () => {
    const form = createForm()
    const CustomObject: React.FC = () => {
      const schema = useFieldSchema()
      return (
        <div data-testid="object">
          <RecursionField
            schema={schema}
            mapProperties={(schema) => {
              schema.default = '123'
              return schema
            }}
          />
        </div>
      )
    }
    const CustomObject2: React.FC = () => {
      const schema = useFieldSchema()
      return (
        <div data-testid="object">
          <RecursionField
            schema={schema}
            mapProperties={() => {
              return null as any
            }}
          />
        </div>
      )
    }
    const SchemaField = createSchemaField({
      components: {
        Input,
        CustomObject,
        CustomObject2,
      },
    })
    const screen = await render(
      <FormProvider form={form}>
        <SchemaField>
          <SchemaField.Object x-component="CustomObject">
            <SchemaField.String x-component="Input" />
          </SchemaField.Object>
          <SchemaField.Object x-component="CustomObject2">
            <SchemaField.String x-component="Input" />
          </SchemaField.Object>
        </SchemaField>
      </FormProvider>,
    )
    const inputs = await getElementsOrEmpty(screen.getByTestId('input'))
    expect(inputs).toHaveLength(2)
    expect(inputs[0].getAttribute('value')).toEqual('123')
    expect(inputs[1].getAttribute('value')).toEqual('')
  })

  it('filterProperties', async () => {
    const form = createForm()
    const CustomObject: React.FC = () => {
      const schema = useFieldSchema()
      return (
        <div data-testid="object">
          <RecursionField
            schema={schema}
            filterProperties={(schema) => {
              if (schema['x-component'] === 'Input')
                return false
              return true
            }}
          />
        </div>
      )
    }
    const CustomObject2: React.FC = () => {
      const schema = useFieldSchema()
      return (
        <div data-testid="object">
          <RecursionField
            schema={schema}
            filterProperties={(schema) => {
              if (schema['x-component'] === 'Input')
                return true
              return false
            }}
          />
        </div>
      )
    }
    const SchemaField = createSchemaField({
      components: {
        Input,
        CustomObject,
        CustomObject2,
      },
    })
    const screen = await render(
      <FormProvider form={form}>
        <SchemaField>
          <SchemaField.Object x-component="CustomObject">
            <SchemaField.String x-component="Input" />
          </SchemaField.Object>
          <SchemaField.Object x-component="CustomObject2">
            <SchemaField.String x-component="Input" />
          </SchemaField.Object>
        </SchemaField>
      </FormProvider>,
    )
    expect(await getElementsOrEmpty(screen.getByTestId('input'))).toHaveLength(1)
    expect(await getElementsOrEmpty(screen.getByTestId('object'))).toHaveLength(2)
  })

  it('onlyRenderSelf', async () => {
    const form = createForm()
    const CustomObject: React.FC = () => {
      const schema = useFieldSchema()
      return (
        <div data-testid="object">
          <RecursionField schema={schema} onlyRenderSelf />
        </div>
      )
    }
    const SchemaField = createSchemaField({
      components: {
        Input,
        CustomObject,
      },
    })
    const screen = await render(
      <FormProvider form={form}>
        <SchemaField>
          <SchemaField.Object x-component="CustomObject">
            <SchemaField.String x-component="Input" />
          </SchemaField.Object>
        </SchemaField>
      </FormProvider>,
    )
    expect(await getElementsOrEmpty(screen.getByTestId('input'))).toHaveLength(0)
    expect(await getElementsOrEmpty(screen.getByTestId('object'))).toHaveLength(1)
  })

  it('illegal schema', async () => {
    const form = createForm()
    const CustomObject: React.FC = () => {
      return (
        <div data-testid="object">
          <RecursionField schema={null as any} />
        </div>
      )
    }
    const CustomObject2: React.FC = () => {
      return (
        <div data-testid="object">
          <RecursionField schema={{} as any} />
        </div>
      )
    }
    const SchemaField = createSchemaField({
      components: {
        Input,
        CustomObject,
        CustomObject2,
      },
    })
    const { getByTestId } = await render(
      <FormProvider form={form}>
        <SchemaField>
          <SchemaField.Object x-component="CustomObject">
            <SchemaField.String x-component="Input" />
          </SchemaField.Object>
          <SchemaField.Object x-component="CustomObject2">
            <SchemaField.String x-component="Input" />
          </SchemaField.Object>
        </SchemaField>
      </FormProvider>,
    )
    await expect.element(getByTestId('input')).not.toBeInTheDocument()
  })
})

it('schema reactions', async () => {
  const form = createForm()
  const SchemaField = createSchemaField({
    components: {
      Input,
    },
  })
  const { getByTestId } = await render(
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.String
          name="aaa"
          x-component="Input"
          x-component-props={{
            'data-testid': 'aaa',
          }}
        />
        <SchemaField.String
          name="bbb"
          x-component="Input"
          x-component-props={{
            'data-testid': 'bbb',
          }}
          x-reactions={[
            {
              when: '{{$form.values.aaa === "123"}}',
              fulfill: {
                state: {
                  visible: true,
                },
              },
              otherwise: {
                state: {
                  visible: false,
                },
              },
            },
            {
              when: '{{$self.value === "123"}}',
              target: 'ccc',
              fulfill: {
                schema: {
                  'x-visible': true,
                },
              },
              otherwise: {
                schema: {
                  'x-visible': false,
                },
              },
            },
          ]}
        />
        <SchemaField.String
          name="ccc"
          x-component="Input"
          x-component-props={{
            'data-testid': 'ccc',
          }}
        />
      </SchemaField>
    </FormProvider>,
  )
  await expect.element(getByTestId('bbb')).not.toBeInTheDocument()
  await getByTestId('aaa').fill('123')
  await expect.element(getByTestId('bbb')).toBeVisible()
  await expect.element(getByTestId('ccc')).not.toBeInTheDocument()
  await getByTestId('bbb').fill('123')
  await expect.element(getByTestId('ccc')).toBeVisible()
})

it('expression scope', async () => {
  let aa = false
  let bb = false
  let cc = false
  const form = createForm()
  const SchemaField = createSchemaField({
    components: {
      Input,
    },
    scope: {
      aa() {
        aa = true
      },
    },
  })

  const scope = {
    bb() {
      bb = true
    },
    cc() {
      cc = true
    },
  }

  const schema = {
    type: 'object',
    properties: {
      aa: {
        'type': 'string',
        'x-component': 'Input',
        'x-reactions': '{{ aa }}',
      },
      bb: {
        'type': 'string',
        'x-component': 'Input',
        'x-reactions': '{{ bb }}',
      },
      cc: {
        'type': 'string',
        'x-component': 'Input',
        'x-reactions': {
          dependencies: ['aa'],
          fulfill: {
            run: 'cc()',
          },
        },
      },
    },
  }

  await render(
    <FormProvider form={form}>
      <SchemaField schema={schema} scope={scope} />
    </FormProvider>,
  )

  expect(aa).toBeTruthy()
  expect(bb).toBeTruthy()
  expect(cc).toBeTruthy()
})

it('expression x-content', async () => {
  const form = createForm()
  const SchemaField = createSchemaField({
    components: {
      Wrapper: (props: any) => props.children,
    },
    scope: {
      child: <div data-testid="child"></div>,
    },
  })

  const { getByTestId } = await render(
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.String
          name="aaa"
          x-component="Wrapper"
          x-content="{{child}}"
        />
      </SchemaField>
    </FormProvider>,
  )

  await expect.element(getByTestId('child')).toBeInTheDocument()
})

it('expression x-visible', async () => {
  const form = createForm()
  const SchemaField = createSchemaField({
    components: {
      AAA: () => <div>AAA</div>,
      BBB: () => <div>BBB</div>,
    },
  })

  const { getByText } = await render(
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.String name="aaa" x-component="AAA" />
        <SchemaField.String
          name="bbb"
          x-component="BBB"
          x-visible="{{$form.values.aaa === 123}}"
        />
      </SchemaField>
    </FormProvider>,
  )

  await expect.element(getByText('BBB')).not.toBeInTheDocument()
  form.values.aaa = 123
  await expect.element(getByText('BBB')).toBeInTheDocument()
})

it('expression x-value', async () => {
  const form = createForm({
    values: {
      aaa: 1,
    },
  })
  const SchemaField = createSchemaField({
    components: {
      Text: (props: any) => <div>{props.value}</div>,
    },
  })

  const { getByText } = await render(
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.String name="aaa" x-component="Text" />
        <SchemaField.String
          name="bbb"
          x-component="Text"
          x-value="{{$form.values.aaa * 10}}"
        />
      </SchemaField>
    </FormProvider>,
  )

  await expect.element(getByText('10')).toBeInTheDocument()
  form.values.aaa = 10
  await expect.element(getByText('100')).toBeInTheDocument()
})

it('nested update component props with expression', async () => {
  const form = createForm({
    values: {
      aaa: 'xxx',
    },
  })
  const SchemaField = createSchemaField({
    components: {
      Text: (props: any) => <div>{props.aa?.bb?.cc}</div>,
    },
  })

  const { getByText } = await render(
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.String name="aaa" x-component="Text" />
        <SchemaField.String
          name="bbb"
          x-component="Text"
          x-component-props={{ aa: { bb: { cc: '{{$form.values.aaa}}' } } }}
        />
      </SchemaField>
    </FormProvider>,
  )
  await expect.element(getByText('xxx')).toBeInTheDocument()
  form.values.aaa = '10'
  await expect.element(getByText('10')).toBeInTheDocument()
})

it('nested update component props with x-reactions', async () => {
  const form = createForm({
    values: {
      aaa: 'xxx',
    },
  })
  const SchemaField = createSchemaField({
    components: {
      Text: (props: any) => <div>{props.aa?.bb?.cc}</div>,
    },
  })

  const { getByText } = await render(
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.String name="aaa" x-component="Text" />
        <SchemaField.String
          name="bbb"
          x-component="Text"
          x-reactions={{
            fulfill: {
              schema: {
                'x-component-props.aa.bb.cc': '{{$form.values.aaa}}',
              } as any,
            },
          }}
        />
      </SchemaField>
    </FormProvider>,
  )
  await expect.element(getByText('xxx')).toBeInTheDocument()
  form.values.aaa = '10'
  await expect.element(getByText('10')).toBeInTheDocument()
})

it('schema x-validator/required', async () => {
  const form = createForm({
    values: {
      aaa: 'xxx',
    },
  })
  const SchemaField = createSchemaField({
    components: {
      Input: () => <div></div>,
    },
  })

  await render(
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.String
          name="input"
          required
          x-validator="email"
          x-component="Input"
        />
      </SchemaField>
    </FormProvider>,
  )
  await vi.waitFor(() => {
    expect(form.query('input').get('required')).toBeTruthy()
    expect(form.query('input').get('validator')).toEqual([
      { required: true },
      { format: 'email' },
    ])
  })
})

it('schema x-reactions when undefined', async () => {
  const form = createForm({
    values: {
      aaa: 'xxx',
    },
  })
  const SchemaField = createSchemaField({
    components: {
      Input: () => <div data-testid="input"></div>,
      Select: () => <div data-testid="select"></div>,
    },
  })

  const { getByTestId } = await render(
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.String name="input" required x-component="Input" />
        <SchemaField.String
          name="select"
          required
          x-component="Select"
          x-reactions={{
            when: '{{$values.input}}',
            fulfill: {
              state: {
                visible: true,
              },
            },
            otherwise: {
              state: {
                visible: false,
              },
            },
          }}
        />
      </SchemaField>
    </FormProvider>,
  )
  await expect.element(getByTestId('input')).toBeInTheDocument()
  await expect.element(getByTestId('select')).not.toBeInTheDocument()
})

it('void field children', async () => {
  const form = createForm()
  const SchemaField = createSchemaField({
    components: {
      Button: (props: any) => (
        <div data-testid="btn">{props.children || 'placeholder'}</div>
      ),
    },
  })

  const { getByTestId } = await render(
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Void x-component="Button" />
      </SchemaField>
    </FormProvider>,
  )
  await expect.element(getByTestId('btn')).toHaveTextContent('placeholder')
})

it('x-reactions runner for target', async () => {
  const form = createForm()
  const getTarget = vi.fn()
  const SchemaField = createSchemaField({
    components: {
      Input: () => <div></div>,
      Button: (props: any) => (
        <button
          data-testid="btn"
          onClick={(e) => {
            e.preventDefault()
            props.onChange('123')
          }}
        >
          Click
          {' '}
          {props.value}
        </button>
      ),
    },
    scope: {
      getTarget,
    },
  })

  const { getByTestId } = await render(
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.String name="target" default="333" x-component="Input" />
        <SchemaField.String
          x-component="Button"
          x-reactions={{
            target: 'target',
            effects: ['onFieldInputValueChange'],
            fulfill: {
              run: 'getTarget($target.value)',
            },
          }}
        />
      </SchemaField>
    </FormProvider>,
  )
  await getByTestId('btn').click()
  await expect.element(getByTestId('btn')).toHaveTextContent('Click 123')
  expect(getTarget).toBeCalledWith('333')
  expect(getTarget).toBeCalledTimes(1)
})

it('multi x-reactions isolate effect', async () => {
  const form = createForm()
  const otherEffect = vi.fn()
  const SchemaField = createSchemaField({
    components: {
      Input: () => <div data-testid="input"></div>,
      Button: (props: any) => (
        <button
          data-testid="btn"
          onClick={(e) => {
            e.preventDefault()
            props.onChange('123')
          }}
        >
          Click
          {' '}
          {props.value}
        </button>
      ),
    },
  })

  const { getByTestId } = await render(
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.String
          name="target"
          x-reactions={[
            otherEffect,
            {
              dependencies: ['btn'],
              fulfill: {
                state: {
                  visible: '{{$deps[0] === "123"}}',
                },
              },
            },
          ]}
          x-component="Input"
        />
        <SchemaField.String name="btn" x-component="Button" />
      </SchemaField>
    </FormProvider>,
  )
  await expect.element(getByTestId('input')).not.toBeInTheDocument()
  await getByTestId('btn').click()
  await expect.element(getByTestId('btn')).toHaveTextContent('Click 123')
  await expect.element(getByTestId('input')).toBeInTheDocument()
  expect(otherEffect).toBeCalledTimes(1)
})

it('nested record scope', async () => {
  const form = createForm()
  const SchemaField = createSchemaField({
    components: {
      Text: (props: any) => <div data-testid="text">{props.text}</div>,
    },
  })

  const { getByTestId } = await render(
    <FormProvider form={form}>
      <RecordScope getRecord={() => ({ bb: '321' })} getIndex={() => 1}>
        <RecordScope getRecord={() => ({ aa: '123' })} getIndex={() => 2}>
          <SchemaField>
            <SchemaField.Void
              x-component="Text"
              x-component-props={{
                text: '{{$record.aa + $record.$lookup.bb + $index + $lookup.$index}}',
              }}
            />
          </SchemaField>
        </RecordScope>
      </RecordScope>
    </FormProvider>,
  )
  await expect.element(getByTestId('text')).toHaveTextContent('12332121')
})

it('literal record scope', async () => {
  const form = createForm()
  const SchemaField = createSchemaField({
    components: {
      Text: (props: any) => <div data-testid="text">{props.text}</div>,
    },
  })

  const { getByTestId } = await render(
    <FormProvider form={form}>
      <RecordScope getRecord={() => '123'} getIndex={() => 2}>
        <SchemaField>
          <SchemaField.Void
            x-component="Text"
            x-component-props={{
              text: '{{$record + $index}}',
            }}
          />
        </SchemaField>
      </RecordScope>
    </FormProvider>,
  )
  await expect.element(getByTestId('text')).toHaveTextContent('1232')
})

it('records scope', async () => {
  const form = createForm()
  const SchemaField = createSchemaField({
    components: {
      Text: (props: any) => <div data-testid="text">{props.text}</div>,
    },
  })

  const { getByTestId } = await render(
    <FormProvider form={form}>
      <RecordsScope getRecords={() => [1, 2, 3]}>
        <SchemaField>
          <SchemaField.Void
            x-component="Text"
            x-component-props={{
              text: '{{$records[2]}}',
            }}
          />
        </SchemaField>
      </RecordsScope>
    </FormProvider>,
  )
  await expect.element(getByTestId('text')).toHaveTextContent('3')
})

it('propsRecursion as true', async () => {
  const form = createForm()
  const CustomObject: React.FC = () => {
    const schema = useFieldSchema()
    return (
      <div data-testid="object">
        <RecursionField
          schema={schema}
          propsRecursion={true}
          filterProperties={(schema) => {
            if (schema['x-component'] === 'Input') {
              return false
            }
            return true
          }}
        />
      </div>
    )
  }

  const SchemaField = createSchemaField({
    components: {
      Input,
      CustomObject,
    },
  })
  const screen = await render(
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Object x-component="CustomObject">
          <SchemaField.String x-component="Input" />
          <SchemaField.Object>
            <SchemaField.String x-component="Input" />
          </SchemaField.Object>
        </SchemaField.Object>
      </SchemaField>
    </FormProvider>,
  )
  expect(await getElementsOrEmpty(screen.getByTestId('input'))).toHaveLength(0)
  expect(await getElementsOrEmpty(screen.getByTestId('object'))).toHaveLength(1)
})

it('propsRecursion as empty', async () => {
  const form = createForm()
  const CustomObject: React.FC = () => {
    const schema = useFieldSchema()
    return (
      <div data-testid="object">
        <RecursionField
          schema={schema}
          filterProperties={(schema) => {
            if (schema['x-component'] === 'Input') {
              return false
            }
            return true
          }}
        />
      </div>
    )
  }

  const SchemaField = createSchemaField({
    components: {
      Input,
      CustomObject,
    },
  })
  const screen = await render(
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Object x-component="CustomObject">
          <SchemaField.String x-component="Input" />
          <SchemaField.Object>
            <SchemaField.String x-component="Input" />
          </SchemaField.Object>
        </SchemaField.Object>
      </SchemaField>
    </FormProvider>,
  )
  expect(await getElementsOrEmpty(screen.getByTestId('input'))).toHaveLength(1)
  expect(await getElementsOrEmpty(screen.getByTestId('object'))).toHaveLength(1)
})
