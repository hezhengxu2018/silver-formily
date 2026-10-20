import { createForm } from '@silver-formily/core'
import { expect, it } from 'vitest'
import { mapFieldProps } from '../src/form-item/field-props'

it('maps field defaults while preserving explicit empty overrides', () => {
  const field = createForm().createField({ name: 'name', title: 'Name', description: 'Description', required: true })!
  field.selfErrors = ['First', '', 'Second', '']
  expect(mapFieldProps({}, field)).toMatchObject({ label: 'Name', extra: 'Description', asterisk: true, feedbackStatus: 'error', feedbackText: ['First', ', ', 'Second'] })
  expect(mapFieldProps({ label: null, extra: '', asterisk: false, feedbackText: null, feedbackStatus: '' }, field)).toMatchObject({ label: null, extra: '', asterisk: false, feedbackText: null, feedbackStatus: '' })
})

it('prioritizes errors, warnings and successes and hides stale messages during validation', () => {
  const field = createForm().createField({ name: 'name' })!
  field.selfErrors = ['Error']
  field.selfWarnings = ['Warning']
  field.selfSuccesses = ['Success']
  expect(mapFieldProps({}, field).feedbackText).toEqual(['Error'])
  field.selfErrors = []
  expect(mapFieldProps({}, field)).toMatchObject({ feedbackText: ['Warning'], feedbackStatus: 'warning' })
  field.selfWarnings = []
  expect(mapFieldProps({}, field)).toMatchObject({ feedbackText: ['Success'], feedbackStatus: 'success' })
  field.validating = true
  expect(mapFieldProps({}, field)).toMatchObject({ feedbackText: undefined, feedbackStatus: 'pending' })
  expect(mapFieldProps({ feedbackText: 'Checking', feedbackStatus: 'warning' }, field)).toMatchObject({ feedbackText: 'Checking', feedbackStatus: 'warning' })
})

it('honors explicit required and asterisk settings including readPretty', () => {
  const field = createForm().createField({ name: 'name', required: true })!
  expect(mapFieldProps({ required: false }, field).asterisk).toBe(false)
  expect(mapFieldProps({ asterisk: false }, field).asterisk).toBe(false)
  field.pattern = 'readPretty'
  expect(mapFieldProps({}, field).asterisk).toBe(false)
  expect(mapFieldProps({ required: true }, field).asterisk).toBe(false)
  expect(mapFieldProps({ asterisk: true }, field).asterisk).toBe(true)
})

it('supports void fields and standalone props without reading validation state', () => {
  const field = createForm().createVoidField({ name: 'group', title: 'Group', description: 'Info' })
  expect(mapFieldProps({}, field)).toEqual({ label: 'Group', extra: 'Info', asterisk: false })
  expect(mapFieldProps({ label: '', extra: null, required: true, asterisk: false }, field)).toEqual({ label: '', extra: null, asterisk: false })
  const props = { label: 'Standalone', required: true }
  expect(mapFieldProps(props)).toBe(props)
})

it('does not create empty feedback for pristine fields or empty messages', () => {
  const field = createForm().createField({ name: 'name' })!
  expect(mapFieldProps({}, field).feedbackText).toBeUndefined()
  field.selfErrors = ['', null, undefined]
  expect(mapFieldProps({}, field).feedbackText).toBeUndefined()
  field.selfWarnings = ['Warning']
  expect(mapFieldProps({}, field).feedbackText).toEqual(['Warning'])
})
