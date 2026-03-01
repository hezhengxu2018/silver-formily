import type { PropType } from 'vue'
import { createForm } from '@formily/core'
import { FormProvider } from '@silver-formily/vue'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { defineComponent } from 'vue'
import FormGridItem from '../form-grid-column.vue'
import FormGrid from '../form-grid.vue'
import { useFormGrid } from '../hooks'
import 'element-plus/theme-chalk/index.css'
import '../style.scss'

function queryElement(container: Element, selector: string): HTMLElement {
  const element = container.querySelector<HTMLElement>(selector)
  if (!element)
    throw new Error(`Element not found: ${selector}`)
  return element
}

const FormGridTest = defineComponent({
  props: {
    displayKey: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  setup(props) {
    const formGrid = useFormGrid()
    return () => props.displayKey.map(keyName => (
      <div key={keyName} data-testid={keyName}>
        { typeof formGrid.value[keyName] === 'boolean'
          ? String(formGrid.value[keyName])
          : formGrid.value[keyName] }
      </div>
    ))
  },
})

describe('formgrid', () => {
  describe('基础功能', () => {
    it('应该正常渲染', async () => {
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <FormGrid>
            <div data-testid="content">网格内容</div>
          </FormGrid>
        </FormProvider>
      ))

      await expect.element(queryElement(container, '.formily-element-plus-form-grid')).toBeInTheDocument()
      await expect.element(queryElement(container, '[data-testid="content"]')).toBeInTheDocument()
    })

    it('应该支持网格项渲染', async () => {
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <FormGrid>
            <FormGridItem>
              <div data-testid="grid-item">网格项内容</div>
            </FormGridItem>
          </FormGrid>
        </FormProvider>
      ))

      await expect.element(queryElement(container, '.formily-element-plus-form-grid')).toBeInTheDocument()
      await expect.element(queryElement(container, '[data-testid="grid-item"]')).toBeInTheDocument()
    })
  })

  describe('属性传递', () => {
    it('应该支持设置 columnGap 和 rowGap', async () => {
      const { getByTestId } = render(() => (
        <FormProvider form={createForm()}>
          <FormGrid columnGap={16} rowGap={20}>
            <FormGridTest displayKey={['columnGap', 'rowGap']} />
          </FormGrid>
        </FormProvider>
      ))

      await expect.element(getByTestId('columnGap')).toHaveTextContent('16')
      await expect.element(getByTestId('rowGap')).toHaveTextContent('20')
    })

    it('应该支持设置 minColumns 和 maxColumns', async () => {
      const { getByTestId } = render(() => (
        <FormProvider form={createForm()}>
          <FormGrid minColumns={2} maxColumns={4}>
            <FormGridTest displayKey={['minColumns', 'maxColumns']} />
          </FormGrid>
        </FormProvider>
      ))

      await expect.element(getByTestId('minColumns')).toHaveTextContent('2')
      await expect.element(getByTestId('maxColumns')).toHaveTextContent('4')
    })

    it('应该支持设置 minWidth 和 maxWidth', async () => {
      const { getByTestId } = render(() => (
        <FormProvider form={createForm()}>
          <FormGrid minWidth={100} maxWidth={300}>
            <FormGridTest displayKey={['minWidth', 'maxWidth']} />
          </FormGrid>
        </FormProvider>
      ))

      await expect.element(getByTestId('minWidth')).toHaveTextContent('100')
      await expect.element(getByTestId('maxWidth')).toHaveTextContent('300')
    })

    it('应该支持设置 colWrap', async () => {
      const { getByTestId } = render(() => (
        <FormProvider form={createForm()}>
          <FormGrid colWrap={false}>
            <FormGridTest displayKey={['colWrap']} />
          </FormGrid>
        </FormProvider>
      ))

      await expect.element(getByTestId('colWrap')).toHaveTextContent('false')
    })
  })

  describe('网格项属性', () => {
    it('应该支持设置 span', async () => {
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <FormGrid>
            <FormGridItem gridSpan={2} data-testid="grid-item">
              <div>跨列网格项</div>
            </FormGridItem>
          </FormGrid>
        </FormProvider>
      ))

      const gridItem = queryElement(container, '[data-testid="grid-item"]')
      await expect.element(gridItem).toBeInTheDocument()
      await vi.waitFor(() => {
        expect(gridItem).toHaveStyle({ gridColumn: 'span 2' })
      })
    })

    it('应该支持设置 offset', async () => {
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <FormGrid>
            <FormGridItem offset={1} data-testid="grid-item">
              <div>偏移网格项</div>
            </FormGridItem>
          </FormGrid>
        </FormProvider>
      ))

      const gridItem = queryElement(container, '[data-testid="grid-item"]')
      await expect.element(gridItem).toBeInTheDocument()
      await expect.element(gridItem).toHaveStyle({ gridColumnStart: 'span 1' })
    })
  })

  describe('嵌套网格', () => {
    it('应该支持嵌套 FormGrid', async () => {
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <FormGrid columnGap={16}>
            <FormGridItem span={2}>
              <FormGrid rowGap={8}>
                <FormGridItem data-testid="nested-item">
                  <div>嵌套网格项</div>
                </FormGridItem>
              </FormGrid>
            </FormGridItem>
          </FormGrid>
        </FormProvider>
      ))

      await expect.element(queryElement(container, '[data-testid="nested-item"]')).toBeInTheDocument()
      const nestedGrid = container.querySelectorAll('.formily-element-plus-form-grid')
      expect(nestedGrid.length).toBe(2)
    })
  })
})
