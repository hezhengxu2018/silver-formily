import type { PropType } from 'vue'
import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { defineComponent } from 'vue'
import { getElement } from '../../__test__/dom'
import { FormItem } from '../../form-item'
import { Input } from '../../input'
import { useGrid } from '../hooks'
import Grid from '../index'
import 'vant/lib/index.css'

const GridProbe = defineComponent({
  props: {
    displayKeys: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  setup(props) {
    const grid = useGrid()

    return () => props.displayKeys.map((keyName) => {
      const currentValue = (grid.value as unknown as Record<string, unknown>)[keyName]

      return (
        <div key={keyName} data-testid={keyName}>
          {typeof currentValue === 'boolean' ? String(currentValue) : currentValue}
        </div>
      )
    })
  },
})

describe('grid', () => {
  it('应该正常渲染普通子节点', async () => {
    const { container } = render(() => (
      <Grid>
        <div data-testid="content">网格内容</div>
      </Grid>
    ))

    await expect.element(getElement(container, '.silver-formily-vant-grid')).toBeInTheDocument()
    await expect.element(getElement(container, '[data-testid="content"]')).toBeInTheDocument()
  })

  it('应该通过 useGrid 暴露网格实例配置', async () => {
    const { getByTestId } = render(() => (
      <Grid columns={2} columnGap={16} rowGap={20}>
        <GridProbe displayKeys={['columns', 'columnGap', 'rowGap']} />
      </Grid>
    ))

    await expect.element(getByTestId('columns')).toHaveTextContent('2')
    await expect.element(getByTestId('columnGap')).toHaveTextContent('16')
    await expect.element(getByTestId('rowGap')).toHaveTextContent('20')
  })

  it('应该支持通过 Grid.GridColumn 设置跨列', async () => {
    const GridColumn = Grid.GridColumn
    const { container } = render(() => (
      <Grid columns={2}>
        <GridColumn gridSpan={2} data-testid="grid-column">
          <div>跨列内容</div>
        </GridColumn>
      </Grid>
    ))

    const gridColumn = getElement(container, '[data-testid="grid-column"]')

    await expect.element(gridColumn).toHaveAttribute('data-grid-span', '2')
    await expect.element(gridColumn).toHaveStyle({ gridColumn: 'span 2 / auto' })
  })

  it('应该支持普通节点通过 data-grid-span 控制跨列', async () => {
    const { container } = render(() => (
      <Grid columns={2}>
        <div data-testid="fill-column" data-grid-span="-1">
          自动铺满
        </div>
      </Grid>
    ))

    const fillColumn = getElement(container, '[data-testid="fill-column"]')

    await expect.element(fillColumn).toHaveAttribute('data-grid-span', '-1')
    await vi.waitFor(() => {
      expect(getComputedStyle(fillColumn).gridColumn).toBe('1 / -1')
    })
  })

  it('应该支持直接放入 Formily 字段节点', async () => {
    const form = createForm()
    const { container } = render(() => (
      <FormProvider form={form}>
        <Grid columns={2} columnGap={12} rowGap={12}>
          <Field
            name="username"
            title="用户名"
            decorator={[FormItem]}
            component={[
              Input,
              {
                placeholder: '请输入用户名',
              },
            ]}
          />
        </Grid>
      </FormProvider>
    ))

    await expect.element(getElement(container, '.silver-formily-vant-grid')).toBeInTheDocument()
    expect(container.textContent).toContain('用户名')
    expect(container.querySelector('input')?.getAttribute('placeholder')).toBe('请输入用户名')
  })
})
