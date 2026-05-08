import type { AreaList } from '../types'
import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import FormItem from '../../form-item'
import AreaPanel from '../index'
import 'vant/lib/index.css'

const areaList: AreaList = {
  province_list: {
    330000: '浙江省',
    320000: '江苏省',
  },
  city_list: {
    330100: '杭州市',
    330200: '宁波市',
    320100: '南京市',
  },
  county_list: {
    330102: '上城区',
    330105: '拱墅区',
    330203: '海曙区',
    320102: '玄武区',
  },
}

function waitForAnimationFrame() {
  return new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => resolve())
  })
}

afterEach(async () => {
  document.body.innerHTML = ''
  vi.clearAllMocks()
  await waitForAnimationFrame()
  await waitForAnimationFrame()
  await waitForAnimationFrame()
})

function getVisiblePicker() {
  return Array.from(document.querySelectorAll<HTMLElement>('.van-picker')).find((picker) => {
    const popup = picker.closest<HTMLElement>('.van-popup')

    if (!popup)
      return true

    return window.getComputedStyle(popup).display !== 'none'
  }) ?? null
}

function getVisiblePickerColumns() {
  const picker = getVisiblePicker()

  if (!picker)
    throw new Error('Visible picker not found')

  return Array.from(picker.querySelectorAll<HTMLElement>('.van-picker-column'))
}

function getVisibleOption(text: string, columnIndex = 0) {
  return Array.from(getVisiblePickerColumns()[columnIndex].querySelectorAll<HTMLElement>('.van-picker-column__item')).find((element) => {
    return element.textContent?.trim() === text
  })!
}

function getVisibleSelectedTexts() {
  return getVisiblePickerColumns().map((column) => {
    const selected = column.querySelector<HTMLElement>('.van-picker-column__item--selected')

    if (!selected)
      throw new Error('Selected area item not found')

    return selected.textContent?.trim() ?? ''
  })
}

function getConfirmButton() {
  const button = getVisiblePicker()?.querySelector<HTMLElement>('.van-picker__confirm')

  if (!button)
    throw new Error('AreaPanel confirm button not found')

  return button
}

function getCancelButton() {
  const button = getVisiblePicker()?.querySelector<HTMLElement>('.van-picker__cancel')

  if (!button)
    throw new Error('AreaPanel cancel button not found')

  return button
}

describe('area-panel', () => {
  it('应该直接渲染省市区滚轮，并只在确认后写回区域编码', async () => {
    const form = createForm({
      values: {
        area: '330102',
      },
    })

    render(() => (
      <FormProvider form={form}>
        <Field
          name="area"
          title="地区"
          decorator={[FormItem]}
          component={[AreaPanel, { areaList }]}
        />
      </FormProvider>
    ))

    await vi.waitFor(() => {
      expect(getVisiblePickerColumns()).toHaveLength(3)
      expect(document.querySelector('.van-popup')).toBeNull()
      expect(getVisibleSelectedTexts()).toEqual(['浙江省', '杭州市', '上城区'])
    })

    getVisibleOption('拱墅区', 2).click()

    expect(form.values.area).toBe('330102')

    getConfirmButton().click()

    await vi.waitFor(() => {
      expect(form.values.area).toBe('330105')
      expect(getVisibleSelectedTexts()).toEqual(['浙江省', '杭州市', '拱墅区'])
    })
  })

  it('应该支持 dataSource 映射、城市列数和取消回滚', async () => {
    const form = createForm({
      values: {
        area: '330100',
      },
    })

    render(() => (
      <FormProvider form={form}>
        <Field
          name="area"
          component={[AreaPanel, { columnsNum: 2 }]}
          dataSource={areaList as any}
        />
      </FormProvider>
    ))

    await vi.waitFor(() => {
      expect(getVisiblePickerColumns()).toHaveLength(2)
      expect(getVisibleSelectedTexts()).toEqual(['浙江省', '杭州市'])
    })

    getVisibleOption('宁波市', 1).click()

    expect(form.values.area).toBe('330100')

    getCancelButton().click()

    await vi.waitFor(() => {
      expect(form.values.area).toBe('330100')
      expect(getVisibleSelectedTexts()).toEqual(['浙江省', '杭州市'])
    })
  })

  it('应该透传工具栏插槽', async () => {
    render(() => (
      <AreaPanel areaList={areaList} modelValue="330102" readonly>
        {{
          'cancel': () => '返回',
          'confirm': () => '保存',
          'title': () => '选择地区',
          'toolbar': () => <div class="custom-toolbar">自定义工具栏</div>,
          'columns-top': () => <div class="columns-top">顶部</div>,
          'columns-bottom': () => <div class="columns-bottom">底部</div>,
        }}
      </AreaPanel>
    ))

    await vi.waitFor(() => {
      expect(document.querySelector('.custom-toolbar')).not.toBeNull()
      expect(document.querySelector('.columns-top')).not.toBeNull()
      expect(document.querySelector('.columns-bottom')).not.toBeNull()
    })
  })
})
