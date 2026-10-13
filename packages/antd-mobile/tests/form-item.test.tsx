import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { afterEach, expect, it } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { FormItem, FormLayout, Input } from '../src'

afterEach(cleanup)

it('renders form item with input and label', async () => {
  const form = createForm()
  const { getByText, getByPlaceholder } = await render(
    <FormProvider form={form}>
      <FormLayout>
        <Field
          name="username"
          title="用户名"
          required
          component={[Input, { placeholder: '请输入用户名' }]}
          decorator={[FormItem]}
        />
      </FormLayout>
    </FormProvider>,
  )

  await expect.element(getByText('用户名')).toBeInTheDocument()
  await expect.element(getByPlaceholder('请输入用户名')).toBeVisible()
})

it('shows required asterisk and validation feedback', async () => {
  const form = createForm()
  const { getByText, getByRole, container } = await render(
    <FormProvider form={form}>
      <FormLayout>
        <Field
          name="email"
          title="邮箱"
          required
          validator={{ format: 'email', message: '邮箱格式不正确' }}
          component={[Input]}
          decorator={[FormItem]}
        />
      </FormLayout>
    </FormProvider>,
  )

  expect(container.innerHTML).toContain('adm-formily-item-asterisk')

  await getByRole('textbox').fill('not-an-email')
  await form.validate().catch(() => {})
  await expect.element(getByText('邮箱格式不正确')).toBeInTheDocument()
})

it('input value flows through formily field', async () => {
  const form = createForm()
  const { getByPlaceholder } = await render(
    <FormProvider form={form}>
      <FormLayout>
        <Field
          name="nickname"
          title="昵称"
          component={[Input, { placeholder: '请输入昵称' }]}
          decorator={[FormItem]}
        />
      </FormLayout>
    </FormProvider>,
  )

  await getByPlaceholder('请输入昵称').fill('silver')
  expect(form.values.nickname).toBe('silver')
})
