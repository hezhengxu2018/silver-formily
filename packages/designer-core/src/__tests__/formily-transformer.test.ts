import type { ITreeNode } from '../models'
import { describe, expect, it } from 'vitest'
import { transformToSchema, transformToTreeNode } from '../transformer'

describe('formily transformer', () => {
  it('transforms designer tree to formily schema document', () => {
    const tree: ITreeNode = {
      id: 'root',
      componentName: 'Form',
      props: { layout: 'horizontal' },
      children: [
        {
          id: 'name-field',
          componentName: 'Field',
          props: {
            'name': 'name',
            'title': 'Name',
            'type': 'string',
            'x-component': 'Input',
          },
        },
        {
          id: 'array-field',
          componentName: 'Field',
          props: {
            'name': 'list',
            'type': 'array',
            'x-component': 'ArrayTable',
          },
          children: [
            {
              id: 'array-item',
              componentName: 'Field',
              props: { type: 'object' },
              children: [
                {
                  id: 'array-item-name',
                  componentName: 'Field',
                  props: {
                    'name': 'itemName',
                    'type': 'string',
                    'x-component': 'Input',
                  },
                },
              ],
            },
            {
              id: 'array-addition',
              componentName: 'Field',
              props: {
                'type': 'void',
                'x-component': 'ArrayTable.Addition',
              },
            },
          ],
        },
      ],
    }

    const document = transformToSchema(tree)
    const properties = document.schema?.properties as Record<string, any>

    expect(document.form).toEqual({ layout: 'horizontal' })
    expect(properties.name).toMatchObject({
      'title': 'Name',
      'type': 'string',
      'x-component': 'Input',
      'x-designable-id': 'name-field',
      'x-index': 0,
    })
    expect(properties.list).toMatchObject({
      'type': 'array',
      'x-component': 'ArrayTable',
      'x-designable-id': 'array-field',
      'x-index': 1,
    })
    expect(properties.list.items).toMatchObject({
      'type': 'object',
      'x-designable-id': 'array-item',
    })
    expect(properties.list.properties?.['array-addition']).toMatchObject({
      'type': 'void',
      'x-component': 'ArrayTable.Addition',
      'x-designable-id': 'array-addition',
      'x-index': 0,
    })
  })

  it('transforms formily schema document to designer tree', () => {
    const tree = transformToTreeNode({
      form: { layout: 'vertical' },
      schema: {
        type: 'object',
        properties: {
          username: {
            'type': 'string',
            'title': 'Username',
            'x-component': 'Input',
            'x-designable-id': 'username-id',
          },
        },
      },
    })

    expect(tree).toMatchObject({
      componentName: 'Form',
      props: { layout: 'vertical' },
      children: [
        {
          id: 'username-id',
          componentName: 'Field',
          props: {
            'type': 'string',
            'title': 'Username',
            'x-component': 'Input',
            'x-designable-id': 'username-id',
          },
        },
      ],
    })
  })
})
