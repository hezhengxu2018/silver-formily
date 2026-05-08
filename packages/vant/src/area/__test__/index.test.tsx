import type { AreaList } from '../types'
import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import FormItem from '../../form-item'
import PreviewText from '../../preview-text'
import Area from '../index'
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

function getTrigger(container: Element) {
  return container.querySelector<HTMLInputElement>('input.van-field__control')!
}

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

function getConfirmButton() {
  const button = getVisiblePicker()?.querySelector<HTMLElement>('.van-picker__confirm')

  if (!button)
    throw new Error('Area confirm button not found')

  return button
}

describe('area', () => {
  it('应该通过触发区打开 Popup，并在确认后写回区域编码和回显名称', async () => {
    const form = createForm({
      values: {
        area: '330102',
      },
    })
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="area"
          title="地区"
          decorator={[FormItem]}
          component={[Area, { areaList }]}
        />
      </FormProvider>
    ))

    const trigger = getTrigger(container)

    expect(trigger.value).toBe('浙江省 / 杭州市 / 上城区')

    await userEvent.click(trigger)

    await vi.waitFor(() => {
      expect(getVisiblePicker()).not.toBeNull()
      expect(getVisiblePicker()?.closest('.van-popup')).not.toBeNull()
    })

    getVisibleOption('拱墅区', 2).click()
    getConfirmButton().click()

    await vi.waitFor(() => {
      expect(form.values.area).toBe('330105')
      expect(trigger.value).toBe('浙江省 / 杭州市 / 拱墅区')
      expect(getVisiblePicker()).toBeNull()
    })
  })

  it('应该支持 dataSource、displayFormatter、只读预览和禁用状态', async () => {
    const form = createForm({
      values: {
        area: '330102',
      },
    })
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="area"
          title="地区"
          decorator={[FormItem]}
          component={[Area, {
            displayFormatter: (value, selectedOptions) => {
              return `${value}:${selectedOptions.map(option => option?.text).join('-')}`
            },
          }]}
          dataSource={areaList as any}
        />
      </FormProvider>
    ))

    expect(getTrigger(container).value).toBe('330102:浙江省-杭州市-上城区')

    form.setFieldState('area', (state) => {
      state.pattern = 'readPretty'
    })

    await vi.waitFor(() => {
      expect(container.querySelector('.van-field__control')?.textContent?.trim()).toBe('330102:浙江省-杭州市-上城区')
    })

    const disabledResult = render(() => <Area areaList={areaList} disabled modelValue="330102" />)
    const disabledTrigger = getTrigger(disabledResult.container)

    expect(disabledTrigger).toBeDisabled()
  })

  it('应该在 readonly、readOnly trigger 下阻止打开弹层', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="readonlyArea"
          title="只读"
          decorator={[FormItem]}
          component={[Area, { areaList, readonly: true }]}
        />
        <Field
          name="readOnlyArea"
          title="兼容只读"
          decorator={[FormItem]}
          component={[Area, { areaList, readOnly: true }]}
        />
      </FormProvider>
    ))

    const triggers = container.querySelectorAll<HTMLInputElement>('input.van-field__control')

    expect(triggers[0]).not.toBeDisabled()
    triggers[0].click()
    expect(getVisiblePicker()).toBeNull()

    expect(triggers[1]).not.toBeDisabled()
    triggers[1].click()
    expect(getVisiblePicker()).toBeNull()
  })

  it('应该透传 popupProps 和面板插槽', async () => {
    const { container } = render(() => (
      <Area
        areaList={areaList}
        popupProps={{ overlayClass: 'area-popup' }}
      >
        {{
          title: () => '选择地区',
          cancel: () => '返回',
          confirm: () => '保存',
        }}
      </Area>
    ))

    await userEvent.click(getTrigger(container))

    await vi.waitFor(() => {
      expect(document.querySelector('.area-popup')).not.toBeNull()
      expect(document.querySelector('.van-picker__toolbar')?.textContent).toContain('选择地区')
      expect(document.querySelector('.van-picker__cancel')?.textContent).toBe('返回')
      expect(document.querySelector('.van-picker__confirm')?.textContent).toBe('保存')
    })
  })

  it('应该支持 PreviewText.Area 独立预览', async () => {
    render(() => (
      <PreviewText.Area
        areaList={areaList}
        modelValue="330102"
      />
    ))

    await vi.waitFor(() => {
      expect(document.body.textContent).toContain('浙江省 / 杭州市 / 上城区')
    })
  })

  it('应该在预览态按 columnsNum、columnsPlaceholder 和 separator 生成显示文本', async () => {
    render(() => (
      <>
        <PreviewText.Area
          areaList={areaList}
          modelValue="330102"
          columnsPlaceholder={['请选择省', '请选择市', '请选择区']}
          separator=" > "
        />
        <PreviewText.Area
          areaList={areaList}
          modelValue="330100"
          columnsNum={2}
          columnsPlaceholder={['请选择省', '请选择市']}
        />
        <PreviewText.Area
          areaList={areaList}
          modelValue="330000"
          columnsNum={1}
          columnsPlaceholder={['请选择省']}
        />
      </>
    ))

    await vi.waitFor(() => {
      expect(document.body.textContent).toContain('浙江省 > 杭州市 > 上城区')
      expect(document.body.textContent).toContain('浙江省 / 杭州市')
      expect(document.body.textContent).toContain('浙江省')
    })
  })

  it('应该按 columnsNum 和 columnsPlaceholder 渲染可见列与占位项', async () => {
    const { container } = render(() => (
      <Area
        areaList={areaList}
        columnsNum={2}
        columnsPlaceholder={['请选择省', '请选择市']}
      />
    ))

    await userEvent.click(getTrigger(container))

    await vi.waitFor(() => {
      expect(getVisiblePickerColumns()).toHaveLength(2)
    })

    const [provinceColumn, cityColumn] = getVisiblePickerColumns()

    expect(provinceColumn.textContent).toContain('请选择省')
    expect(cityColumn.textContent).toContain('请选择市')
    expect(cityColumn.textContent).not.toContain('请选择区')
  })

  it('应该在数据未就绪时回退展示原始编码，并支持单列模式', async () => {
    const singleColumnResult = render(() => (
      <Area
        areaList={areaList}
        columnsNum={1}
      />
    ))

    await userEvent.click(getTrigger(singleColumnResult.container))

    await vi.waitFor(() => {
      expect(getVisiblePickerColumns()).toHaveLength(1)
    })

    document.body.innerHTML = ''

    render(() => (
      <PreviewText.Area
        areaList={{
          province_list: {},
          city_list: {},
          county_list: {},
        }}
        modelValue="330102"
      />
    ))

    await vi.waitFor(() => {
      expect(document.body.textContent).toContain('330102')
    })
  })
})
