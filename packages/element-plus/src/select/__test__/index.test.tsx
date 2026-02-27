import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import Select from '../index'
import 'element-plus/theme-chalk/index.css'

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
]

const groupOptions = [
  {
    label: 'Group 1',
    options: [
      { value: 'g1-1', label: 'Group 1 Option 1' },
      { value: 'g1-2', label: 'Group 1 Option 2' },
    ],
  },
  {
    label: 'Group 2',
    options: [
      { value: 'g2-1', label: 'Group 2 Option 1' },
      { value: 'g2-2', label: 'Group 2 Option 2' },
    ],
  },
]

describe('select', () => {
  describe('基础功能', () => {
    it('应该正常渲染', async () => {
      const page = render(() => (
        <FormProvider form={createForm()}>
          <Field name="select" component={[Select]} dataSource={options} />
        </FormProvider>
      ))
      await expect.element(page.getByRole('combobox')).toBeInTheDocument()
      await expect.element(page.getByText('Select')).toBeInTheDocument()
      await page.getByText('Select').click()
      const Options = page.getByRole('option').all()
      expect(Options).toHaveLength(3)
    })

    it('应该支持分组选项', async () => {
      const { getByText, getByRole } = render(() => (
        <FormProvider form={createForm()}>
          <Field name="select" component={[Select]} dataSource={groupOptions} />
        </FormProvider>
      ))

      const selectDOM = getByText('Select')
      await selectDOM.click()
      const groups = document.querySelectorAll('.el-select-group__title')
      expect(groups).toHaveLength(2)
      const optionDOMNodes = getByRole('option').all()
      expect(optionDOMNodes).toHaveLength(4)
    })
  })

  describe('表单交互', () => {
    it('应该在单选模式下更新表单值', async () => {
      const form = createForm()
      render(() => (
        <FormProvider form={form}>
          <Field name="select" component={[Select]} dataSource={options} />
        </FormProvider>
      ))

      const selectDOM = document.querySelector('.el-select')
      await userEvent.click(selectDOM)
      const optionDOM1 = document.querySelector('.el-select-dropdown__item')
      await userEvent.click(optionDOM1)
      expect(form.values.select).toEqual('1')
    })

    it('应该在多选模式下更新表单值', async () => {
      const form = createForm()
      render(() => (
        <FormProvider form={form}>
          <Field
            name="select"
            component={[Select]}
            dataSource={options}
            multiple
          />
        </FormProvider>
      ))

      await expect.element(document.querySelector('.el-select')).toBeVisible()
      await userEvent.click(document.querySelector('.el-select'))
      const optionsDOM = document.querySelectorAll('.el-select-dropdown__item')
      await userEvent.click(optionsDOM[0])
      await userEvent.click(optionsDOM[2])
      expect(form.values.select).toEqual(['1', '3'])
    })
  })

  describe('属性传递', () => {
    it('应该支持禁用状态', async () => {
      render(() => (
        <FormProvider form={createForm()}>
          <Field
            name="select"
            component={[Select, { disabled: true }]}
            dataSource={options}
          />
        </FormProvider>
      ))

      expect(document.querySelector('.el-select__wrapper')).toHaveClass('is-disabled')
    })
  })

  describe('插槽支持', () => {
    it('应该支持自定义option', async () => {
      render(() => (
        <Select options={options}>
          {{
            option: ({ option }) => (
              <div class="custom-option">{`自定义插槽${option.label}`}</div>
            ),
          }}
        </Select>
      ))
      const selectDOM = document.querySelector('.el-select')
      await userEvent.click(selectDOM)
      const customOption = document.querySelector('.custom-option')
      expect(customOption).toBeInTheDocument()
      expect(customOption.innerHTML).toEqual('自定义插槽Option 1')
    })

    it('应该在option-group 模式下支持自定义option', async () => {
      render(() => (
        <Select options={groupOptions}>
          {{
            option: ({ option }) => (
              <div class="custom-option">{`自定义插槽${option.label}`}</div>
            ),
          }}
        </Select>
      ))
      const selectDOM = document.querySelector('.el-select')
      await userEvent.click(selectDOM)
      const customOption = document.querySelector('.custom-option')
      expect(customOption).toBeInTheDocument()
      expect(customOption.innerHTML).toEqual('自定义插槽Group 1 Option 1')
    })

    it('应该支持header slot', async () => {
      render(() => (
        <FormProvider form={createForm()}>
          <Field name="select" component={[Select]} dataSource={options} initialValue="1">
            {{
              header: ({ field }) => (
                <div class="custom-header">
                  自定义头部,field值为
                  {field.value}
                </div>
              ),
            }}
          </Field>
        </FormProvider>
      ))
      const selectDOM = document.querySelector('.el-select')
      await userEvent.click(selectDOM)
      const customHeader = document.querySelector('.custom-header')
      expect(customHeader).toBeInTheDocument()
      expect(customHeader).toBeVisible()
      expect(customHeader.innerHTML).toEqual('自定义头部,field值为1')
    })

    it('应该支持自定义footer slot', async () => {
      render(() => (
        <FormProvider form={createForm()}>
          <Field name="select" component={[Select]} dataSource={options} initialValue="2">
            {{
              footer: ({ field }) => (
                <div class="custom-footer">
                  自定义底部,field值为
                  {field.value}
                </div>
              ),
            }}
          </Field>
        </FormProvider>
      ))
      const selectDOM = document.querySelector('.el-select')
      await userEvent.click(selectDOM)
      const customFooter = document.querySelector('.custom-footer')
      expect(customFooter).toBeInTheDocument()
      expect(customFooter).toBeVisible()
      expect(customFooter.innerHTML).toEqual('自定义底部,field值为2')
    })

    it('应该支持loading slot', async () => {
      render(() => (
        <Select options={[]} loading>
          {{
            loading: () => <div class="custom-loading">自定义加载中...</div>,
          }}
        </Select>
      ))
      const selectDOM = document.querySelector('.el-select')
      await userEvent.click(selectDOM)
      const customLoading = document.querySelector('.custom-loading')
      expect(customLoading).toBeInTheDocument()
      expect(customLoading).toBeVisible()
      expect(customLoading.innerHTML).toEqual('自定义加载中...')
    })

    it('应该支持empty slot', async () => {
      render(() => (
        <Select options={[]}>
          {{
            empty: () => <div class="custom-empty">自定义空数据</div>,
          }}
        </Select>
      ))
      const selectDOM = document.querySelector('.el-select')
      await userEvent.click(selectDOM)
      const customEmpty = document.querySelector('.custom-empty')
      expect(customEmpty).toBeInTheDocument()
      expect(customEmpty).toBeVisible()
      expect(customEmpty.innerHTML).toEqual('自定义空数据')
    })

    it('应该支持prefix slot', async () => {
      render(() => (
        <Select options={options}>
          {{
            prefix: () => <div class="custom-prefix">自定义前缀</div>,
          }}
        </Select>
      ))
      const customPrefix = document.querySelector('.custom-prefix')
      expect(customPrefix).toBeInTheDocument()
      expect(customPrefix).toBeVisible()
      expect(customPrefix.innerHTML).toEqual('自定义前缀')
    })

    it('应该支持tag slot', async () => {
      render(() => (
        <FormProvider form={createForm()}>
          <Field name="select" component={[Select, { multiple: true }]} dataSource={options} initialValue={['1', '2']}>
            {{
              tag: ({ field }) => (
                <div class="custom-tag">
                  自定义Tag
                  {field.value}
                </div>
              ),
            }}
          </Field>
        </FormProvider>
      ))
      const customPrefix = document.querySelector('.custom-tag')
      expect(customPrefix).toBeInTheDocument()
      expect(customPrefix).toBeVisible()
      expect(customPrefix.innerHTML).toEqual('自定义Tag12')
    })

    it('应该支持label-value slot', async () => {
      render(() => (
        <FormProvider form={createForm()}>
          <Field name="select" component={[Select]} dataSource={options} initialValue="1">
            {{
              label: ({ label, value }) => (
                <div class="custom-label-value">
                  {`自定义Label:${label},Value:${value}`}
                </div>
              ),
            }}
          </Field>
        </FormProvider>
      ))
      const customPrefix = document.querySelector('.custom-label-value')
      expect(customPrefix).toBeInTheDocument()
      expect(customPrefix).toBeVisible()
      await vi.waitFor(() => {
        expect(customPrefix.innerHTML).toEqual('自定义Label:Option 1,Value:1')
      })
    })
  })
})
