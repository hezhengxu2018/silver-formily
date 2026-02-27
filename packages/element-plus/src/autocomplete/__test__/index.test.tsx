import type { Field as FormilyField } from '@formily/core'
import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import { nextTick } from 'vue'
import Autocomplete from '../index'
import 'element-plus/theme-chalk/index.css'

const options = [
  { value: 'Apple' },
  { value: 'Banana' },
  { value: 'Cherry' },
]

const suggestionSelector = '.el-autocomplete-suggestion__list li'
type OptionList = typeof options

async function waitForSuggestionItems(expectedLength?: number) {
  await vi.waitFor(() => {
    const items = document.querySelectorAll(suggestionSelector)
    if (expectedLength === undefined)
      expect(items.length).toBeGreaterThan(0)
    else
      expect(items).toHaveLength(expectedLength)
  })
  return document.querySelectorAll(suggestionSelector)
}

function createDeferredFetch(data: OptionList = options) {
  let flushFetch: (() => void) | undefined
  const fetchSuggestions = vi.fn((
    query: string,
    cb: (items: OptionList) => void,
    field?: FormilyField,
  ) => new Promise<OptionList>((resolve) => {
    if (field)
      field.loading = true

    flushFetch = () => {
      if (field)
        field.loading = false
      cb(data)
      resolve(data)
    }
  }))

  return {
    fetchSuggestions,
    async flush() {
      flushFetch?.()
      await nextTick()
    },
  }
}

const decoratorSlots = {
  prefix: () => <span class="auto-prefix">PFX</span>,
  suffix: () => <span class="auto-suffix">SFX</span>,
  prepend: () => <span class="auto-prepend">PRE</span>,
  append: () => <span class="auto-append">APP</span>,
}

describe('autocomplete', () => {
  describe('basic', () => {
    it('should render and show options on focus', async () => {
      const page = render(() => (
        <FormProvider form={createForm()}>
          <Field
            name="autocomplete"
            component={[Autocomplete, { triggerOnFocus: true, placeholder: 'Type here' }]}
            dataSource={options}
          />
        </FormProvider>
      ))

      const input = page.getByPlaceholder('Type here')
      await expect.element(input).toBeInTheDocument()
      await userEvent.click(input)
      await waitForSuggestionItems(3)
    })

    it('should update form value after selecting suggestion', async () => {
      const form = createForm()
      render(() => (
        <FormProvider form={form}>
          <Field name="autocomplete" component={[Autocomplete, { triggerOnFocus: true }]} dataSource={options} />
        </FormProvider>
      ))

      const input = document.querySelector('input')
      await userEvent.click(input!)
      const items = await waitForSuggestionItems(3)
      await userEvent.click(items[1])

      expect(form.values.autocomplete).toBe('Banana')
    })

    it('should filter local options by input keyword', async () => {
      render(() => (
        <FormProvider form={createForm()}>
          <Field name="autocomplete" component={[Autocomplete]} dataSource={options} />
        </FormProvider>
      ))

      const input = document.querySelector('input')
      await userEvent.type(input!, 'ap')
      const items = await waitForSuggestionItems(1)
      expect(items[0].textContent).toContain('Apple')
    })
  })

  describe('slots and customization', () => {
    it('should expose field to default slot', async () => {
      render(() => (
        <FormProvider form={createForm()}>
          <Field name="autocomplete" component={[Autocomplete, { triggerOnFocus: true }]} dataSource={options} initialValue="Prefilled">
            {{
              default: ({ item, field }) => (
                <div class="custom-item">
                  {item.value}
                  -
                  {field?.initialValue}
                </div>
              ),
            }}
          </Field>
        </FormProvider>
      ))

      const input = document.querySelector('input')
      await userEvent.click(input!)
      await userEvent.clear(input!)

      await vi.waitFor(() => {
        const customItem = document.querySelector('.custom-item')
        expect(customItem).toBeInTheDocument()
        expect(customItem?.textContent).toContain('Prefilled')
      })
    })

    it('should prioritize external fetchSuggestions and inject field', async () => {
      const fetchSuggestions = vi.fn((query: string, cb: (data: Array<{ value: string }>) => void, fieldArg?: any) => {
        cb(query ? [{ value: `${query}-result` }] : [{ value: 'default-result' }])
        return fieldArg
      })

      render(() => (
        <FormProvider form={createForm()}>
          <Field
            name="autocomplete"
            component={[Autocomplete, { fetchSuggestions, triggerOnFocus: true }]}
            dataSource={[]}
          />
        </FormProvider>
      ))

      const input = document.querySelector('input')
      await userEvent.click(input!)
      await userEvent.type(input!, 'custom')

      await vi.waitFor(() => {
        expect(fetchSuggestions).toHaveBeenCalled()
      })

      const fieldArg = fetchSuggestions.mock.calls[0][2]
      expect(fieldArg?.path?.toString()).toBe('autocomplete')
      const items = await waitForSuggestionItems()
      expect(items[0].textContent).toContain('custom-result')
    })

    it('should support header and footer slots', async () => {
      render(() => (
        <FormProvider form={createForm()}>
          <Field
            name="autocomplete"
            component={[Autocomplete, { triggerOnFocus: true }]}
            dataSource={options}
            initialValue="Apple"
          >
            {{
              header: ({ field }) => <div class="custom-header">{field?.value?.value}</div>,
              footer: () => <div class="custom-footer">footer</div>,
            }}
          </Field>
        </FormProvider>
      ))

      const input = document.querySelector('input')
      await userEvent.click(input!)
      await vi.waitFor(() => {
        expect(document.querySelector('.custom-header')).toBeInTheDocument()
        expect(document.querySelector('.custom-footer')).toBeInTheDocument()
      })
    })

    it('should support loading slot', async () => {
      const { fetchSuggestions, flush } = createDeferredFetch()
      render(() => (
        <FormProvider form={createForm()}>
          <Field
            name="slot-loading"
            component={[Autocomplete, { triggerOnFocus: true, fetchSuggestions }]}
            dataSource={[]}
          >
            {{
              loading: () => <div class="custom-loading">loading...</div>,
            }}
          </Field>
        </FormProvider>
      ))

      const input = document.querySelector('input')
      await userEvent.type(input!, 'c')
      await vi.waitFor(() => {
        expect(fetchSuggestions).toHaveBeenCalled()
        expect(document.querySelector('.custom-loading')).toBeInTheDocument()
      })

      await flush()
      await waitForSuggestionItems(options.length)
    })

    it('should render prefix/suffix/prepend/append slots', async () => {
      render(() => (
        <FormProvider form={createForm()}>
          <Field
            name="decorators"
            component={[Autocomplete]}
            dataSource={options}
            v-slots={decoratorSlots}
          />
        </FormProvider>
      ))

      expect(document.querySelector('.auto-prefix')).toBeInTheDocument()
      expect(document.querySelector('.auto-suffix')).toBeInTheDocument()
      expect(document.querySelector('.auto-prepend')).toBeInTheDocument()
      expect(document.querySelector('.auto-append')).toBeInTheDocument()
    })

    it('should sync field loading state in remote mode', async () => {
      const form = createForm()
      const { fetchSuggestions, flush } = createDeferredFetch()
      render(() => (
        <FormProvider form={form}>
          <Field
            name="auto-loading"
            component={[Autocomplete, { triggerOnFocus: true, fetchSuggestions }]}
            dataSource={[]}
          >
            {{
              loading: () => <div class="field-loading">field loading</div>,
            }}
          </Field>
        </FormProvider>
      ))

      await nextTick()
      const field = form.query('auto-loading').take()
      const input = document.querySelector('input')
      await userEvent.type(input!, 'c')

      await vi.waitFor(() => {
        expect((field as FormilyField)?.loading).toBe(true)
        expect(document.querySelector('.field-loading')).toBeInTheDocument()
      })

      await flush()
      await vi.waitFor(() => {
        expect((field as FormilyField)?.loading).toBe(false)
      })
    })

    it('should provide ElAutocomplete instance via field invoke', async () => {
      const form = createForm()
      render(() => (
        <FormProvider form={form}>
          <Field name="auto-ref" component={[Autocomplete]} dataSource={options} />
        </FormProvider>
      ))

      await nextTick()
      const field = form.query('auto-ref').take()
      const autoRef = field?.invoke('getElAutocompleteRef')
      expect(autoRef?.value).toBeTruthy()
    })
  })
})
