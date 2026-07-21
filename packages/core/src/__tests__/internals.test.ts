import { expect, it, vi } from 'vitest'
import { createForm, onFieldValueChange } from '../'
import {
  deserialize,
  getValuesFromEvent,
  isHTMLInputEvent,
  matchFeedback,
  patchFieldStates,
} from '../shared/internals'
import { attach } from './shared'

it('getValuesFromEvent', () => {
  expect(getValuesFromEvent([{ target: { value: 123 } }])).toEqual([123])
  expect(getValuesFromEvent([{ target: { checked: true } }])).toEqual([true])
  expect(getValuesFromEvent([{ target: {} }])).toEqual([undefined])
  expect(getValuesFromEvent([{ target: null }])).toEqual([{ target: null }])
  expect(getValuesFromEvent([123])).toEqual([123])
  expect(getValuesFromEvent([null])).toEqual([null])
})

it('empty', () => {
  expect(matchFeedback()).toBeFalsy()
})

it('patchFieldStates', () => {
  const fields = {}
  patchFieldStates(fields, [{ type: 'update', address: 'aaa', payload: undefined }])
  patchFieldStates(fields, [
    { type: 'update3' as any, address: 'aaa', payload: undefined },
  ])
  expect(fields).toEqual({})
})

it('patchFieldStates should be sequence', () => {
  const form = attach(createForm())
  attach(
    form.createArrayField({
      name: 'array',
    }),
  )
  attach(
    form.createField({
      name: 'input',
      basePath: 'array.0',
    }),
  )
  attach(
    form.createField({
      name: 'input',
      basePath: 'array.1',
    }),
  )
  const before = Object.keys(form.fields)
  ;(form.fields.array as any).move(1, 0)
  const after = Object.keys(form.fields)
  expect(after).toEqual(before)

  const form2 = attach(createForm())
  attach(
    form2.createField({
      name: 'field1',
      title: 'Field 1',
    }),
  )
  attach(
    form2.createField({
      name: 'field2',
      title: 'Field 1',
    }),
  )

  patchFieldStates(form2.fields, [
    {
      type: 'update',
      address: 'field2',
      oldAddress: 'field1',
      payload: form2.fields.field1,
    },
    {
      type: 'update',
      address: 'field1',
      oldAddress: 'field2',
      payload: form2.fields.field2,
    },
  ])

  expect(Object.keys(form2.fields)).toEqual(['field1', 'field2'])
})

it('deserialize', () => {
  expect(deserialize(null, null)).toBeUndefined()
  expect(
    deserialize(
      {},
      {
        parent: null,
      },
    ),
  ).toEqual({})
})

it('isHTMLInputEvent', () => {
  expect(isHTMLInputEvent({ target: { checked: true } })).toBeTruthy()
  expect(isHTMLInputEvent({ target: { value: 123 } })).toBeTruthy()
  expect(
    isHTMLInputEvent({ target: { tagName: 'INPUT', value: null } }),
  ).toBeTruthy()
  expect(isHTMLInputEvent({ target: { tagName: 'INPUT' } })).toBeFalsy()
  expect(isHTMLInputEvent({ target: { tagName: 'DIV' } })).toBeFalsy()
  expect(isHTMLInputEvent({ target: {}, stopPropagation() {} })).toBeFalsy()
  expect(isHTMLInputEvent({})).toBeFalsy()
})

it('reset restores the initial value of a display none field', async () => {
  const valueChange = vi.fn()
  const form = attach(
    createForm({
      initialValues: {
        input: '123',
      },
      effects() {
        onFieldValueChange('input', valueChange)
      },
    }),
  )
  const field = attach(
    form.createField({
      name: 'input',
    }),
  )

  expect(form.values.input).toBe('123')
  await field.onInput('456')
  expect(form.values.input).toBe('456')
  field.setDisplay('none')
  expect(form.values.input).toBeUndefined()
  expect(valueChange).toHaveBeenCalledTimes(2)

  await form.reset()
  await form.reset()

  expect(field.display).toBe('none')
  expect(form.values.input).toBeUndefined()
  expect(valueChange).toHaveBeenCalledTimes(2)

  field.setDisplay('visible')

  expect(form.values.input).toBe('123')
  expect(valueChange).toHaveBeenCalledTimes(3)
})

it('reset force clears the cached value of a display none field', async () => {
  const form = attach(
    createForm({
      initialValues: {
        input: '123',
      },
    }),
  )
  const field = attach(
    form.createField({
      name: 'input',
    }),
  )

  await field.onInput('456')
  field.setDisplay('none')

  await field.reset({ forceClear: true })

  expect(field.display).toBe('none')
  expect(form.values.input).toBeUndefined()

  field.setDisplay('visible')

  expect(field.value).toBeUndefined()
  expect(form.values.input).toBeUndefined()
})

it('reset clears the cached value of a display none field without an initial value', async () => {
  const form = attach(
    createForm({
      values: {
        input: '123',
      },
    }),
  )
  const field = attach(
    form.createField({
      name: 'input',
    }),
  )

  field.setDisplay('none')

  await field.reset()

  expect(field.display).toBe('none')
  expect(form.values.input).toBeUndefined()

  field.setDisplay('visible')

  expect(field.value).toBeUndefined()
  expect(form.values.input).toBeUndefined()
})
