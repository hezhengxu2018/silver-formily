import { createForm } from '@silver-formily/core'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import { defineComponent, h } from 'vue'
import {
  createSchemaField,
  FormProvider,
  RecordScope,
  RecordsScope,
} from '../components'

const Text = defineComponent({
  name: 'RecordScopeText',
  props: {
    text: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    return () => h('div', { 'data-testid': 'record-scope-text' }, props.text)
  },
})

const { SchemaField } = createSchemaField({
  components: {
    Text,
  },
})

describe('record scope', () => {
  it('应该向子树注入 $record 与 $index 表达式变量', async () => {
    const form = createForm()
    const records = [
      { id: 1, name: '张三' },
      { id: 2, name: '李四' },
    ]

    const itemSchema = {
      type: 'object',
      properties: {
        text: {
          'type': 'void',
          'x-component': 'Text',
          'x-component-props': { text: '{{ $record.name + " @ " + $index }}' },
        },
      },
    }

    const screen = await render(
      defineComponent({
        setup() {
          return () =>
            h(FormProvider, { form }, {
              default: () => [
                h(RecordsScope, { getRecords: () => records }, {
                  default: () =>
                    records.map((record, index) =>
                      h(RecordScope, {
                        key: record.id,
                        getRecord: () => record,
                        getIndex: () => index,
                      }, {
                        default: () => [
                          h(SchemaField, { schema: itemSchema, name: `item_${index}` }),
                        ],
                      }),
                    ),
                }),
              ],
            })
        },
      }),
    )

    await expect
      .element(screen.getByTestId('record-scope-text').first())
      .toHaveTextContent('张三 @ 0')
    await expect
      .element(screen.getByTestId('record-scope-text').nth(1))
      .toHaveTextContent('李四 @ 1')
  })

  it('嵌套 RecordScope 时 $lookup 应指向父级记录', async () => {
    const form = createForm()
    const parentRecord = { id: 1, name: 'parent' }
    const childRecord = { id: 2, name: 'child' }

    const nestedSchema = {
      type: 'object',
      properties: {
        text: {
          'type': 'void',
          'x-component': 'Text',
          'x-component-props': { text: '{{ $record.name + " / " + $lookup.name }}' },
        },
      },
    }

    const screen = await render(
      defineComponent({
        setup() {
          return () =>
            h(FormProvider, { form }, {
              default: () => [
                h(RecordScope, { getRecord: () => parentRecord, getIndex: () => 0 }, {
                  default: () => [
                    h(RecordScope, { getRecord: () => childRecord, getIndex: () => 0 }, {
                      default: () => [
                        h(SchemaField, { schema: nestedSchema, name: 'nested' }),
                      ],
                    }),
                  ],
                }),
              ],
            })
        },
      }),
    )

    await expect
      .element(screen.getByTestId('record-scope-text'))
      .toHaveTextContent('child / parent')
  })

  it('应该向子树注入 $records 表达式变量', async () => {
    const form = createForm()
    const records = [
      { id: 1, name: '张三' },
      { id: 2, name: '李四' },
      { id: 3, name: '王五' },
    ]

    const schema = {
      type: 'object',
      properties: {
        text: {
          'type': 'void',
          'x-component': 'Text',
          'x-component-props': { text: '{{ "count: " + $records.length }}' },
        },
      },
    }

    const screen = await render(
      defineComponent({
        setup() {
          return () =>
            h(FormProvider, { form }, {
              default: () => [
                h(RecordsScope, { getRecords: () => records }, {
                  default: () => [h(SchemaField, { schema })],
                }),
              ],
            })
        },
      }),
    )

    await expect
      .element(screen.getByTestId('record-scope-text'))
      .toHaveTextContent('count: 3')
  })
})
