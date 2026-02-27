import type { Form } from '@formily/core'
import type { QueryFormItemRequest } from '../../index'
import { createForm } from '@formily/core'
import { createSchemaField, Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import { defineComponent } from 'vue'
import { QueryFormItem, SelectTable } from '../../index'
import 'element-plus/theme-chalk/index.css'

const querySchema = {
  type: 'object',
  properties: {
    keyword: {
      'type': 'string',
      'title': 'Keyword',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
  },
}

function formilyWrapperFactory(
  form: Form,
  request?: (params: Record<string, any>) => Promise<any>,
  decoratorProps: Record<string, any> = {},
  fieldProps: Record<string, any> = {},
) {
  return defineComponent({
    setup() {
      return () => (
        <FormProvider form={form}>
          <Field
            name="selected"
            {...fieldProps}
            decorator={[QueryFormItem, { querySchema, request, ...decoratorProps }]}
            component={[
              SelectTable,
              {
                rowKey: 'id',
                mode: 'multiple',
                columns: [{ prop: 'name', label: 'Name' }],
              },
            ]}
          />
        </FormProvider>
      )
    },
  })
}

function createDeferred<T>() {
  let resolve!: (value: T | PromiseLike<T>) => void
  let reject!: (reason?: any) => void
  const promise = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej
  })

  return {
    promise,
    resolve,
    reject,
  }
}

describe('queryFormItem', () => {
  it('should request with pagination info by default and sync field dataSource', async () => {
    const form = createForm()
    const request = vi.fn<QueryFormItemRequest>(async () => ({
      data: [{ id: '1', name: 'Row-1' }],
      success: true,
      total: 1,
    }))

    render(formilyWrapperFactory(form, request))

    await vi.waitFor(() => {
      expect(request).toHaveBeenCalled()
    })

    expect(request.mock.calls[0]?.[0]).toEqual({ current: 1, pageSize: 10 })
    await vi.waitFor(() => {
      expect(document.body.textContent).toContain('Row-1')
    })
    expect(form.query('selected').get('dataSource')).toEqual([{ id: '1', name: 'Row-1' }])
  })

  it('should keep field value after dataSource update by default', async () => {
    const form = createForm({
      values: {
        selected: ['legacy-id'],
      },
    })
    const request = vi.fn<QueryFormItemRequest>(async () => ({
      data: [{ id: '18', name: 'Row-18' }],
      success: true,
      total: 1,
    }))

    render(formilyWrapperFactory(form, request))

    await vi.waitFor(() => {
      expect(request).toHaveBeenCalled()
    })

    expect(form.query('selected').get('value')).toEqual(['legacy-id'])
  })

  it('should clear field value after dataSource update when enabled', async () => {
    const form = createForm({
      values: {
        selected: ['legacy-id'],
      },
    })
    const request = vi.fn<QueryFormItemRequest>(async () => ({
      data: [{ id: '19', name: 'Row-19' }],
      success: true,
      total: 1,
    }))

    render(formilyWrapperFactory(form, request, {
      clearOnDataChange: true,
    }))

    await vi.waitFor(() => {
      expect(request).toHaveBeenCalled()
    })

    expect(form.query('selected').get('value')).toBeUndefined()
  })

  it('should not pass pagination params when pagination is disabled', async () => {
    const form = createForm()
    const request = vi.fn<QueryFormItemRequest>(async () => ({
      data: [{ id: '2', name: 'Row-2' }],
      success: true,
      total: 1,
    }))

    const screen = render(formilyWrapperFactory(form, request, {
      pagination: false,
    }))

    await vi.waitFor(() => {
      expect(request).toHaveBeenCalled()
    })

    expect(request.mock.calls[0]?.[0]).toEqual({})
    await vi.waitFor(() => {
      expect(document.body.textContent).toContain('Row-2')
    })
    expect(screen.container.querySelector('.el-pagination')).toBeNull()
  })

  it('should render query form in light mode', async () => {
    const form = createForm()
    const request = vi.fn<QueryFormItemRequest>(async () => ({
      data: [{ id: '3', name: 'Row-3' }],
      success: true,
      total: 1,
    }))

    const screen = render(formilyWrapperFactory(form, request, {
      mode: 'light',
      pagination: false,
      throttleWait: 0,
    }))

    await expect.element(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('should render query form when querySchema is provided', async () => {
    const form = createForm()
    const request = vi.fn<QueryFormItemRequest>(async () => ({
      data: [{ id: '4', name: 'Row-4' }],
      success: true,
      total: 1,
    }))

    const screen = render(formilyWrapperFactory(form, request, {
      mode: 'light',
      pagination: false,
      querySchema,
    }))

    await expect.element(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('should request with pagination props values', async () => {
    const form = createForm()
    const request = vi.fn<QueryFormItemRequest>(async () => ({
      data: [{ id: '5', name: 'Row-5' }],
      success: true,
      total: 1,
    }))

    render(formilyWrapperFactory(form, request, {
      paginationProps: {
        currentPage: 2,
        pageSize: 5,
      },
    }))

    await vi.waitFor(() => {
      expect(request).toHaveBeenCalled()
    })
    expect(request.mock.calls[0]?.[0]).toEqual({ current: 2, pageSize: 5 })
  })

  it('should map pagination params by paginationMap', async () => {
    const form = createForm()
    const request = vi.fn<QueryFormItemRequest>(async () => ({
      data: [{ id: '9', name: 'Row-9' }],
      success: true,
      total: 1,
    }))

    render(formilyWrapperFactory(form, request, {
      paginationMap: {
        current: 'pageNum',
      },
    }))

    await vi.waitFor(() => {
      expect(request).toHaveBeenCalled()
    })

    expect(request.mock.calls[0]?.[0]).toEqual({ pageNum: 1, pageSize: 10 })
  })

  it('should prefer queryFormProps.form values for initial request', async () => {
    const form = createForm()
    const externalQueryForm = createForm({
      values: {
        keyword: 'initial-keyword',
      },
    })
    const request = vi.fn<QueryFormItemRequest>(async () => ({
      data: [{ id: '8', name: 'Row-8' }],
      success: true,
      total: 1,
    }))

    render(formilyWrapperFactory(form, request, {
      queryFormProps: {
        form: () => externalQueryForm,
      },
    }))

    await vi.waitFor(() => {
      expect(request).toHaveBeenCalled()
    })

    expect(request.mock.calls[0]?.[0]).toEqual({
      keyword: 'initial-keyword',
      current: 1,
      pageSize: 10,
    })
  })

  it('should hide pagination in markup schema when pagination is false', async () => {
    const form = createForm()
    const request = vi.fn<QueryFormItemRequest>(async () => ({
      data: [{ id: '6', name: 'Row-6' }],
      success: true,
      total: 1,
    }))

    const schema = {
      type: 'object',
      properties: {
        selected: {
          'type': 'array',
          'x-decorator': 'QueryFormItem',
          'x-decorator-props': {
            mode: 'light',
            querySchema,
            request,
            pagination: false,
          },
          'x-component': 'SelectTable',
          'x-component-props': {
            rowKey: 'id',
            mode: 'multiple',
            columns: [{ prop: 'name', label: 'Name' }],
          },
        },
      },
    }

    const { SchemaField } = createSchemaField({
      components: {
        QueryFormItem,
        SelectTable,
      },
    })

    const screen = render(defineComponent({
      setup() {
        return () => (
          <FormProvider form={form}>
            <SchemaField schema={schema as any} />
          </FormProvider>
        )
      },
    }))

    await vi.waitFor(() => {
      expect(request).toHaveBeenCalled()
    })

    expect(screen.container.querySelector('.el-pagination')).toBeNull()
  })

  it('should not sync dataSource when request success is false', async () => {
    const form = createForm()
    const request = vi.fn<QueryFormItemRequest>(async () => ({
      data: [{ id: '7', name: 'Row-7' }],
      success: false,
      total: 1,
    }))

    render(formilyWrapperFactory(form, request))

    await vi.waitFor(() => {
      expect(request).toHaveBeenCalled()
    })

    expect(document.body.textContent).not.toContain('Row-7')
    expect(form.query('selected').get('dataSource')).toEqual([])
  })

  it('should render form item label and required marker', async () => {
    const form = createForm()
    const request = vi.fn<QueryFormItemRequest>(async () => ({
      data: [],
      success: true,
      total: 0,
    }))

    const screen = render(formilyWrapperFactory(
      form,
      request,
      {
        pagination: false,
      },
      {
        title: 'Selected Rows',
        required: true,
      },
    ))

    await vi.waitFor(() => {
      expect(request).toHaveBeenCalled()
    })

    const fieldLabel = screen.getByText('Selected Rows')
    const formItemElement = fieldLabel.element().closest('.formily-element-plus-form-item')

    await expect.element(screen.container.querySelector('.el-form-item__label')).toHaveTextContent('Selected Rows')
    await expect.element(formItemElement).toHaveClass('is-required')
    await expect.element(formItemElement).toHaveClass('formily-element-plus-form-item--isolated')
    await expect.element(formItemElement).not.toHaveClass('el-form-item')
  })

  it('should show validation feedback through form item wrapper', async () => {
    const form = createForm()
    const request = vi.fn<QueryFormItemRequest>(async () => ({
      data: [],
      success: true,
      total: 0,
    }))

    const feedbackMessage = 'Please select at least one row'
    render(formilyWrapperFactory(
      form,
      request,
      {
        pagination: false,
      },
      {
        title: 'Selected Rows',
        required: true,
        validator: [
          {
            required: true,
            message: feedbackMessage,
          },
        ],
      },
    ))

    await vi.waitFor(() => {
      expect(request).toHaveBeenCalled()
    })

    await form.validate().catch(() => {})

    await vi.waitFor(() => {
      expect(document.body.textContent).toContain(feedbackMessage)
    })
  })

  it('should not request on mount when immediate is false and should request on submit', async () => {
    const form = createForm()
    const request = vi.fn<QueryFormItemRequest>(async () => ({
      data: [{ id: '10', name: 'Row-10' }],
      success: true,
      total: 1,
    }))

    const screen = render(formilyWrapperFactory(form, request, {
      immediate: false,
    }))

    expect(request).not.toHaveBeenCalled()

    await screen.getByRole('button', { name: '查询' }).click()

    await vi.waitFor(() => {
      expect(request).toHaveBeenCalledTimes(1)
    })
    expect(request.mock.calls[0]?.[0]).toEqual({ current: 1, pageSize: 10 })
  })

  it('should fallback to queryFormProps.schema when querySchema is undefined', async () => {
    const form = createForm()
    const request = vi.fn<QueryFormItemRequest>(async () => ({
      data: [{ id: '11', name: 'Row-11' }],
      success: true,
      total: 1,
    }))

    const screen = render(formilyWrapperFactory(form, request, {
      mode: 'light',
      pagination: false,
      querySchema: undefined,
      queryFormProps: {
        schema: querySchema,
        throttleWait: 0,
      },
    }))

    await expect.element(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('should safely skip executeRequest when request is not provided', async () => {
    const form = createForm()
    const screen = render(formilyWrapperFactory(form))

    await expect.element(screen.getByRole('button', { name: '查询' })).toBeInTheDocument()
    await screen.getByRole('button', { name: '查询' }).click()
    await Promise.resolve()

    expect(form.query('selected').get('dataSource')).toBeUndefined()
  })

  it('should not trigger request when reset onClick returns false', async () => {
    const form = createForm()
    const request = vi.fn<QueryFormItemRequest>(async () => ({
      data: [{ id: '12', name: 'Row-12' }],
      success: true,
      total: 1,
    }))
    const onResetClick = vi.fn(() => false)

    const screen = render(formilyWrapperFactory(form, request, {
      queryFormProps: {
        resetProps: {
          onClick: onResetClick,
        },
      },
    }))

    await vi.waitFor(() => {
      expect(request).toHaveBeenCalledTimes(1)
    })

    await screen.getByRole('button', { name: '重置' }).click()
    await Promise.resolve()

    expect(onResetClick).toHaveBeenCalledTimes(1)
    expect(request).toHaveBeenCalledTimes(1)
  })

  it('should trigger request when reset onClick does not return false', async () => {
    const form = createForm()
    const request = vi.fn<QueryFormItemRequest>(async () => ({
      data: [{ id: '12-1', name: 'Row-12-1' }],
      success: true,
      total: 1,
    }))

    const screen = render(formilyWrapperFactory(form, request))

    await vi.waitFor(() => {
      expect(request).toHaveBeenCalledTimes(1)
    })

    await screen.getByRole('button', { name: '重置' }).click()

    await vi.waitFor(() => {
      expect(request).toHaveBeenCalledTimes(2)
    })
    expect(request.mock.calls[1]?.[0]).toEqual({ current: 1, pageSize: 10 })
  })

  it('should set current page to first page before submit when current page is not 1', async () => {
    const form = createForm()
    const request = vi.fn<QueryFormItemRequest>(async () => ({
      data: [{ id: '13', name: 'Row-13' }],
      success: true,
      total: 20,
    }))

    const screen = render(formilyWrapperFactory(form, request, {
      paginationProps: {
        currentPage: 2,
      },
    }))

    await vi.waitFor(() => {
      expect(request).toHaveBeenCalledTimes(1)
    })
    expect(request.mock.calls[0]?.[0]).toEqual({ current: 2, pageSize: 10 })

    await screen.getByRole('button', { name: '查询' }).click()

    await vi.waitFor(() => {
      expect(request).toHaveBeenCalledTimes(2)
    })
    expect(request.mock.calls[1]?.[0]).toEqual({ current: 1, pageSize: 10 })
  })

  it('should request with updated pagination params when page or pageSize changes', async () => {
    const form = createForm()
    const request = vi.fn<QueryFormItemRequest>(async ({ current, pageSize }) => ({
      data: [{ id: `${current}-${pageSize}`, name: `Row-${current}-${pageSize}` }],
      success: true,
      total: 50,
    }))

    const screen = render(formilyWrapperFactory(form, request, {
      paginationProps: {
        layout: 'total, sizes, prev, pager, next',
        pageSizes: [10, 20],
      },
    }))

    await vi.waitFor(() => {
      expect(request).toHaveBeenCalledTimes(1)
    })

    await vi.waitFor(() => {
      const nextButton = screen.container.querySelector('.btn-next')
      expect(nextButton).not.toBeNull()
      expect(nextButton?.classList.contains('is-disabled')).toBe(false)
    })
    await userEvent.click(screen.container.querySelector('.btn-next') as HTMLElement)

    await vi.waitFor(() => {
      expect(screen.container.querySelector('.el-pager .is-active')?.textContent?.trim()).toBe('2')
    })

    await vi.waitFor(() => {
      expect(request).toHaveBeenCalledTimes(2)
    })
    expect(request.mock.calls[1]?.[0]).toEqual({ current: 2, pageSize: 10 })

    const pageSizeSelector = screen.container.querySelector('.el-pagination__sizes .el-select')
    expect(pageSizeSelector).not.toBeNull()
    await userEvent.click(pageSizeSelector as HTMLElement)

    await vi.waitFor(() => {
      expect(document.querySelectorAll('.el-select-dropdown__item').length).toBeGreaterThan(0)
    })
    const pageSizeOptions = Array.from(document.querySelectorAll('.el-select-dropdown__item')) as HTMLElement[]
    const lastPageSizeOption = pageSizeOptions.at(-1) ?? null
    expect(lastPageSizeOption).not.toBeNull()
    await userEvent.click(lastPageSizeOption as HTMLElement)

    await vi.waitFor(() => {
      expect(request).toHaveBeenCalledTimes(3)
    })
    expect(request.mock.calls.at(-1)?.[0]).toEqual({ current: 1, pageSize: 20 })
  })

  it('should emit requestSuccess with fallback total from data length', async () => {
    const form = createForm()
    const onRequestSuccess = vi.fn()
    const request = vi.fn<QueryFormItemRequest>(async () => ({
      data: [{ id: '14', name: 'Row-14' }, { id: '15', name: 'Row-15' }],
      success: true,
    }))

    render(formilyWrapperFactory(form, request, {
      onRequestSuccess,
    }))

    await vi.waitFor(() => {
      expect(onRequestSuccess).toHaveBeenCalled()
    })

    expect(onRequestSuccess.mock.calls[0]?.[0]?.total).toBe(2)
  })

  it('should emit requestFailed when request throws', async () => {
    const form = createForm()
    const error = new Error('request-error')
    const onRequestFailed = vi.fn()
    const request = vi.fn<QueryFormItemRequest>(async () => {
      throw error
    })

    render(formilyWrapperFactory(form, request, {
      onRequestFailed,
    }))

    await vi.waitFor(() => {
      expect(onRequestFailed).toHaveBeenCalledTimes(1)
    })

    expect(onRequestFailed.mock.calls[0]?.[0]).toBe(error)
    expect(form.query('selected').get('loading')).toBe(false)
  })

  it('should ignore stale response when a newer request already exists', async () => {
    const form = createForm()
    const firstRequest = createDeferred<any>()
    const secondRequest = createDeferred<any>()
    const request = vi.fn<QueryFormItemRequest>()
      .mockImplementationOnce(() => firstRequest.promise)
      .mockImplementationOnce(() => secondRequest.promise)
    const screen = render(formilyWrapperFactory(form, request))

    await vi.waitFor(() => {
      expect(request).toHaveBeenCalledTimes(1)
    })

    await screen.getByRole('button', { name: '查询' }).click()

    await vi.waitFor(() => {
      expect(request).toHaveBeenCalledTimes(2)
    })

    secondRequest.resolve({
      data: [{ id: '16', name: 'Row-16' }],
      success: true,
      total: 1,
    })

    await vi.waitFor(() => {
      expect(form.query('selected').get('dataSource')).toEqual([{ id: '16', name: 'Row-16' }])
    })

    firstRequest.resolve({
      data: [{ id: '16-old', name: 'Row-16-old' }],
      success: true,
      total: 1,
    })

    await Promise.resolve()

    expect(form.query('selected').get('dataSource')).toEqual([{ id: '16', name: 'Row-16' }])
  })

  it('should ignore stale error when a newer request already exists', async () => {
    const form = createForm()
    const firstRequest = createDeferred<any>()
    const secondRequest = createDeferred<any>()
    const onRequestFailed = vi.fn()
    const request = vi.fn<QueryFormItemRequest>()
      .mockImplementationOnce(() => firstRequest.promise)
      .mockImplementationOnce(() => secondRequest.promise)
    const screen = render(formilyWrapperFactory(form, request, {
      onRequestFailed,
    }))

    await vi.waitFor(() => {
      expect(request).toHaveBeenCalledTimes(1)
    })

    await screen.getByRole('button', { name: '查询' }).click()

    await vi.waitFor(() => {
      expect(request).toHaveBeenCalledTimes(2)
    })

    firstRequest.reject(new Error('stale-error'))
    secondRequest.resolve({
      data: [{ id: '17', name: 'Row-17' }],
      success: true,
      total: 1,
    })

    await vi.waitFor(() => {
      expect(form.query('selected').get('dataSource')).toEqual([{ id: '17', name: 'Row-17' }])
    })

    expect(onRequestFailed).not.toHaveBeenCalled()
  })
})
