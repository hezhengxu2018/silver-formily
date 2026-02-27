import type { PropType } from 'vue'
import type { IFormLayoutProps } from '../types'
import { createForm } from '@formily/core'
import { FormProvider } from '@silver-formily/vue'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import { page } from 'vitest/browser'
import { defineComponent, ref } from 'vue'
import FormLayout from '../index'
import {
  calcBreakpointIndex,
  calcFactor,
  calculateProps,
  factor,
  useFormLayout,
} from '../utils'
import 'element-plus/theme-chalk/index.css'

const FormLayoutTest = defineComponent({
  props: {
    displayKey: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  setup(props) {
    const formLayout = useFormLayout()
    return () =>
      props.displayKey.map(keyName => (
        <div key={keyName} data-testid={keyName}>
          {typeof formLayout.value[keyName] === 'boolean'
            ? String(formLayout.value[keyName])
            : formLayout.value[keyName]}
        </div>
      ))
  },
})

describe('formLayout', () => {
  describe('基础功能', () => {
    it('应该正常渲染', async () => {
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <FormLayout>
            <div data-testid="content">表单内容</div>
          </FormLayout>
        </FormProvider>
      ))

      await expect
        .element(container.querySelector('.formily-element-plus-form'))
        .toBeInTheDocument()
      await expect
        .element(container.querySelector('[data-testid="content"]'))
        .toBeInTheDocument()
    })

    it('应该支持不同布局模式', async () => {
      const { getByTestId } = render(() => (
        <FormProvider form={createForm()}>
          <FormLayout layout="vertical">
            <FormLayoutTest displayKey={['layout']} />
          </FormLayout>
        </FormProvider>
      ))

      await expect.element(getByTestId('layout')).toHaveTextContent('vertical')
    })
  })

  describe('属性传递', () => {
    it('应该支持设置 colon', async () => {
      const { getByTestId } = render(() => (
        <FormProvider form={createForm()}>
          <FormLayout colon={false}>
            <FormLayoutTest displayKey={['colon']} />
          </FormLayout>
        </FormProvider>
      ))

      await expect.element(getByTestId('colon')).toHaveTextContent('false')
    })

    it('应该支持设置 labelWidth', async () => {
      const { getByTestId } = render(() => (
        <FormProvider form={createForm()}>
          <FormLayout labelWidth={120}>
            <FormLayoutTest displayKey={['labelWidth']} />
          </FormLayout>
        </FormProvider>
      ))

      await expect.element(getByTestId('labelWidth')).toHaveTextContent('120')
    })

    it('应该支持设置 size', async () => {
      const { getByTestId } = render(() => (
        <FormProvider form={createForm()}>
          <FormLayout size="small">
            <FormLayoutTest displayKey={['size']} />
          </FormLayout>
        </FormProvider>
      ))

      await expect.element(getByTestId('size')).toHaveTextContent('small')
    })

    it('应该支持设置 fullness', async () => {
      const { getByTestId } = render(() => (
        <FormProvider form={createForm()}>
          <FormLayout fullness>
            <FormLayoutTest displayKey={['fullness']} />
          </FormLayout>
        </FormProvider>
      ))

      await expect.element(getByTestId('fullness')).toHaveTextContent('true')
    })
  })

  describe('嵌套布局', () => {
    it('应该支持嵌套 FormLayout 并使用 shallow', async () => {
      const { getByTestId } = render(() => (
        <FormProvider form={createForm()}>
          <FormLayout layout="horizontal" labelWidth={100} shallow={false}>
            <FormLayout layout="vertical">
              <FormLayoutTest displayKey={['layout', 'labelWidth']} />
            </FormLayout>
          </FormLayout>
        </FormProvider>
      ))

      await expect.element(getByTestId('layout')).toHaveTextContent('vertical')
      await expect.element(getByTestId('labelWidth')).toHaveTextContent('100')
    })

    it('应该支持嵌套 FormLayout 并使用 non-shallow', async () => {
      const { getByTestId } = render(() => (
        <FormProvider form={createForm()}>
          <FormLayout layout="horizontal" labelWidth={100}>
            <FormLayout layout="vertical" shallow={false}>
              <FormLayoutTest displayKey={['layout', 'labelWidth']} />
            </FormLayout>
          </FormLayout>
        </FormProvider>
      ))

      await expect.element(getByTestId('layout')).toHaveTextContent('vertical')
      // 非shallow模式下，内部布局会覆盖外部布局的属性
      await expect
        .element(getByTestId('labelWidth'))
        .not
        .toHaveTextContent('100')
    })

    it('应该支持嵌套 FormLayout 并会动态修改', async () => {
      const { getByTestId } = render(
        defineComponent({
          setup() {
            const labelWidth = ref(100)
            return () => (
              <div>
                <FormProvider form={createForm()}>
                  <FormLayout layout="horizontal">
                    <FormLayout layout="vertical" labelWidth={labelWidth.value}>
                      <FormLayoutTest displayKey={['layout', 'labelWidth']} />
                    </FormLayout>
                  </FormLayout>
                </FormProvider>
                <button
                  data-testid="button"
                  onClick={() => {
                    labelWidth.value = 200
                  }}
                >
                  setLabel
                </button>
              </div>
            )
          },
        }),
      )
      await expect.element(getByTestId('labelWidth')).toHaveTextContent('100')
      await getByTestId('button').click()
      await expect.element(getByTestId('labelWidth')).toHaveTextContent('200')
    })
  })

  describe('栅格布局', () => {
    it('应该支持设置 labelCol 和 wrapperCol', async () => {
      const { getByTestId } = render(() => (
        <FormProvider form={createForm()}>
          <FormLayout labelCol={6} wrapperCol={18}>
            <FormLayoutTest displayKey={['labelCol', 'wrapperCol']} />
          </FormLayout>
        </FormProvider>
      ))

      await expect.element(getByTestId('labelCol')).toHaveTextContent('6')
      await expect.element(getByTestId('wrapperCol')).toHaveTextContent('18')
    })
  })

  describe('反馈布局', () => {
    it('应该支持设置 feedbackLayout', async () => {
      const { getByTestId } = render(() => (
        <FormProvider form={createForm()}>
          <FormLayout feedbackLayout="loose">
            <FormLayoutTest displayKey={['feedbackLayout']} />
          </FormLayout>
        </FormProvider>
      ))

      await expect
        .element(getByTestId('feedbackLayout'))
        .toHaveTextContent('loose')
    })
  })

  describe('响应式布局', () => {
    it('应该支持响应式布局配置', async () => {
      const { getByTestId } = render(() => (
        <FormProvider form={createForm()}>
          <FormLayout
            breakpoints={[640, 1024]}
            layout={['vertical', 'horizontal', 'inline']}
            labelCol={[24, 6, 4]}
            wrapperCol={[24, 18, 20]}
          >
            <FormLayoutTest displayKey={['layout', 'labelCol', 'wrapperCol']} />
          </FormLayout>
        </FormProvider>
      ))

      // 设置小屏幕尺寸 (小于第一个断点 640)
      await page.viewport(500, 800)

      // 应该使用第一个配置
      await expect.element(getByTestId('layout')).toHaveTextContent('vertical')
      await expect.element(getByTestId('labelCol')).toHaveTextContent('24')
      await expect.element(getByTestId('wrapperCol')).toHaveTextContent('24')

      // 设置中等屏幕尺寸 (大于第一个断点 640，小于第二个断点 1024)
      await page.viewport(800, 800)

      // 应该使用第二个配置
      await expect
        .element(getByTestId('layout'))
        .toHaveTextContent('horizontal')
      await expect.element(getByTestId('labelCol')).toHaveTextContent('6')
      await expect.element(getByTestId('wrapperCol')).toHaveTextContent('18')

      // 设置大屏幕尺寸 (大于第二个断点 1024)
      await page.viewport(1200, 800)

      // 应该使用第三个配置
      await expect.element(getByTestId('layout')).toHaveTextContent('inline')
      await expect.element(getByTestId('labelCol')).toHaveTextContent('4')
      await expect.element(getByTestId('wrapperCol')).toHaveTextContent('20')
    })

    it('应该在宽度变化时更新其他布局属性', async () => {
      const { getByTestId } = render(() => (
        <FormProvider form={createForm()}>
          <FormLayout
            breakpoints={[576, 992]}
            labelAlign={['left', 'right', 'center']}
            wrapperAlign={['left', 'center', 'right']}
          >
            <FormLayoutTest displayKey={['labelAlign', 'wrapperAlign']} />
          </FormLayout>
        </FormProvider>
      ))

      // 小屏幕 (< 576px)
      await page.viewport(400, 800)
      await expect.element(getByTestId('labelAlign')).toHaveTextContent('left')
      await expect
        .element(getByTestId('wrapperAlign'))
        .toHaveTextContent('left')

      // 中等屏幕 (576px - 992px)
      await page.viewport(700, 800)
      await expect.element(getByTestId('labelAlign')).toHaveTextContent('right')
      await expect
        .element(getByTestId('wrapperAlign'))
        .toHaveTextContent('center')

      // 大屏幕 (> 992px)
      await page.viewport(1100, 800)
      await expect
        .element(getByTestId('labelAlign'))
        .toHaveTextContent('center')
      await expect
        .element(getByTestId('wrapperAlign'))
        .toHaveTextContent('right')
    })
  })
})

describe('断点计算工具函数', () => {
  describe('calcBreakpointIndex', () => {
    it('应该返回第一个大于等于宽度的断点索引', () => {
      const breakpoints = [480, 720, 1200]

      expect(calcBreakpointIndex(breakpoints, 400)).toBe(0)
      expect(calcBreakpointIndex(breakpoints, 480)).toBe(0)
      expect(calcBreakpointIndex(breakpoints, 600)).toBe(1)
      expect(calcBreakpointIndex(breakpoints, 720)).toBe(1)
      expect(calcBreakpointIndex(breakpoints, 1000)).toBe(2)
      expect(calcBreakpointIndex(breakpoints, 1200)).toBe(2)
    })

    it('应该在宽度大于所有断点时返回-1', () => {
      const breakpoints = [480, 720, 1200]

      expect(calcBreakpointIndex(breakpoints, 1500)).toBe(-1)
    })

    it('应该在断点数组为空时返回-1', () => {
      expect(calcBreakpointIndex([], 800)).toBe(-1)
    })
  })

  describe('calcFactor', () => {
    it('应该在值不是数组时直接返回该值', () => {
      expect(calcFactor('horizontal', 1)).toBe('horizontal')
      expect(calcFactor(10, 2)).toBe(10)
      expect(calcFactor(null, 0)).toBe(null)
    })

    it('应该在值是数组时返回对应断点索引的值', () => {
      const layouts = ['vertical', 'horizontal', 'inline']

      expect(calcFactor(layouts, 0)).toBe('vertical')
      expect(calcFactor(layouts, 1)).toBe('horizontal')
      expect(calcFactor(layouts, 2)).toBe('inline')
    })

    it('应该在断点索引超出数组范围时返回边界值', () => {
      const layouts = ['vertical', 'horizontal']
      // -1 具有特殊含义，calcFactor仅为内部使用，不编写对应测试
      expect(calcFactor(layouts, 3)).toBe('horizontal')
    })

    it('应该在数组为空时返回数组本身', () => {
      const emptyArray = []
      expect(calcFactor(emptyArray, 0)).toBe(emptyArray)
    })
  })

  describe('factor', () => {
    it('应该在值有效时调用calcFactor', () => {
      const layouts = ['vertical', 'horizontal', 'inline']

      expect(factor(layouts, 1)).toBe('horizontal')
      expect(factor('vertical', 0)).toBe('vertical')
    })

    it('应该在值无效时直接返回该值', () => {
      expect(factor(undefined, 1)).toBe(undefined)
      expect(factor(null, 2)).toBe(null)
    })
  })

  describe('calculateProps', () => {
    it('应该根据断点计算正确的属性值', () => {
      const props: IFormLayoutProps = {
        breakpoints: [480, 720, 1200],
        layout: ['vertical', 'horizontal', 'inline'],
        labelAlign: ['left', 'right'],
        wrapperAlign: ['left', 'right', 'left'],
        labelCol: [6, 4, 3],
        wrapperCol: [18, 20, 21],
        size: 'default',
      }

      // 模拟一个元素对象
      const element = {
        clientWidth: 600,
      } as Element

      const result = calculateProps(element, props)

      // 宽度600对应断点索引1
      expect(result.layout).toBe('horizontal')
      expect(result.labelAlign).toBe('right')
      expect(result.wrapperAlign).toBe('right')
      expect(result.labelCol).toBe(4)
      expect(result.wrapperCol).toBe(20)
      expect(result.size).toBe('default')
    })

    it('应该在宽度大于所有断点时使用最后一个值', () => {
      const props: IFormLayoutProps = {
        breakpoints: [480, 720],
        layout: ['vertical', 'horizontal', 'inline'],
        labelCol: [6, 4, 3],
        wrapperCol: [18, 20, 21],
      }

      const element = {
        clientWidth: 1500,
      } as Element

      const result = calculateProps(element, props)

      // 宽度1500大于所有断点，断点索引为-1，应该使用最后一个值
      expect(result.layout).toBe('inline')
      expect(result.labelCol).toBe(3)
      expect(result.wrapperCol).toBe(21)
    })

    it('应该在属性不是数组时保持原值', () => {
      const props: IFormLayoutProps = {
        breakpoints: [480, 720],
        layout: 'horizontal',
        labelCol: 4,
        wrapperCol: 20,
      }

      const element = {
        clientWidth: 600,
      } as Element

      const result = calculateProps(element, props)

      expect(result.layout).toBe('horizontal')
      expect(result.labelCol).toBe(4)
      expect(result.wrapperCol).toBe(20)
    })

    it('应该保留其他非响应式属性', () => {
      const props: IFormLayoutProps = {
        breakpoints: [480, 720],
        layout: ['vertical', 'horizontal'],
        colon: true,
        labelWrap: true,
        feedbackLayout: 'loose',
      }

      const element = {
        clientWidth: 500,
      } as Element

      const result = calculateProps(element, props)

      expect(result.layout).toBe('horizontal')
      expect(result.colon).toBe(true)
      expect(result.labelWrap).toBe(true)
      expect(result.feedbackLayout).toBe('loose')
    })
  })
})
