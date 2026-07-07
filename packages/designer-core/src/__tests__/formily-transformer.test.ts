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
        {
          id: 'nested-form',
          componentName: 'Field',
          props: {
            'name': 'profile',
            'type': 'object',
            'x-component': 'Form',
          },
          children: [
            {
              id: 'nested-form-field',
              componentName: 'Field',
              props: {
                'name': 'nickname',
                'type': 'string',
                'x-component': 'Input',
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
    expect(properties.profile).toMatchObject({
      'type': 'object',
      'x-component': 'Form',
      'x-designable-id': 'nested-form',
      'x-index': 2,
    })
    expect(properties.profile.properties?.nickname).toMatchObject({
      'type': 'string',
      'x-component': 'Input',
      'x-designable-id': 'nested-form-field',
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
          profile: {
            'type': 'object',
            'x-component': 'Form',
            'x-designable-id': 'profile-form-id',
            'properties': {
              nickname: {
                'type': 'string',
                'x-component': 'Input',
                'x-designable-id': 'nickname-id',
              },
            },
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
        {
          id: 'profile-form-id',
          componentName: 'Field',
          props: {
            'type': 'object',
            'x-component': 'Form',
            'x-designable-id': 'profile-form-id',
          },
          children: [
            {
              id: 'nickname-id',
              componentName: 'Field',
              props: {
                'type': 'string',
                'x-component': 'Input',
                'x-designable-id': 'nickname-id',
              },
            },
          ],
        },
      ],
    })
  })
})
