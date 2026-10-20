import { createForm } from '@silver-formily/core'
import { FormProvider, VoidField } from '@silver-formily/react'
import { Button } from 'antd-mobile'
import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { FormButtonGroup, Reset, Submit } from '../src'

afterEach(cleanup)

it('fills the group content width without Space wrappers and respects block=false', async () => {
  const { container } = await render(
    <FormProvider form={createForm()}>
      <div style={{ width: 360 }}>
        <FormButtonGroup data-testid="group">
          <Submit />
          <Submit block={false}>短按钮</Submit>
        </FormButtonGroup>
      </div>
    </FormProvider>,
  )
  const buttons = container.querySelectorAll('button')
  const first = buttons[0].getBoundingClientRect()
  const second = buttons[1].getBoundingClientRect()
  expect(first.width).toBe(328)
  expect(second.width).toBeLessThan(first.width)
  expect(second.top - first.bottom).toBe(12)
  expect(container.querySelector('.adm-space')).toBeNull()
})

it.each(['horizontal', 'compact'] as const)('shares width between Submit, Reset and Button in %s layout', async (layout) => {
  const { container } = await render(
    <FormProvider form={createForm()}>
      <FormButtonGroup layout={layout} shape="rounded" inset={false} gap="8px" style={{ width: 360 }}>
        <Reset>重置</Reset>
        <Button>普通按钮</Button>
        <Submit />
      </FormButtonGroup>
    </FormProvider>,
  )
  const buttons = Array.from(container.querySelectorAll('button'))
  const rects = buttons.map(button => button.getBoundingClientRect())
  expect(Math.abs(rects[0].width - rects[2].width)).toBeLessThan(1)
  expect(rects[2].right - rects[0].left).toBeCloseTo(360)
  if (layout === 'horizontal') {
    expect(rects[1].left - rects[0].right).toBe(8)
  }
  else {
    expect(getComputedStyle(buttons[0]).borderTopLeftRadius).toBe('999px')
    expect(getComputedStyle(buttons[0]).borderTopRightRadius).toBe('0px')
    expect(getComputedStyle(buttons[1]).borderRadius).toBe('0px')
    expect(getComputedStyle(buttons[2]).borderTopRightRadius).toBe('999px')
    expect(rects[1].left - rects[0].right).toBe(-1)
  }
})

it('applies explicit safe area across layouts and forwards DOM props', async () => {
  const click = vi.fn()
  const { container, getByText } = await render(
    <>
      <FormButtonGroup safeAreaInsetBottom inset={false} aria-label="普通布局">普通</FormButtonGroup>
      <FormButtonGroup layout="compact" safeAreaInsetBottom onClick={click}>紧凑</FormButtonGroup>
    </>,
  )
  const groups = container.querySelectorAll('.adm-formily-button-group')
  expect(groups[0].classList.contains('adm-formily-button-group-safe-area')).toBe(true)
  expect(groups[1].classList.contains('adm-formily-button-group-safe-area')).toBe(true)
  expect(getComputedStyle(groups[0]).paddingBottom).toBe('0px')
  expect(getComputedStyle(groups[1]).paddingBottom).toBe('16px')
  await getByText('紧凑').click()
  expect(click).toHaveBeenCalledOnce()
})


it('defaults to rectangular buttons and lets the group shape override Submit', async () => {
  const { container } = await render(
    <FormProvider form={createForm()}>
      <Submit />
      <Submit shape="rounded" />
      <FormButtonGroup><Submit shape="rounded" /></FormButtonGroup>
      <FormButtonGroup shape="rectangular"><Submit shape="rounded" /></FormButtonGroup>
      <FormButtonGroup shape="rounded"><div><Submit shape="rectangular" /></div></FormButtonGroup>
      <FormButtonGroup shape="rounded">
        <FormButtonGroup><Submit /></FormButtonGroup>
      </FormButtonGroup>
    </FormProvider>,
  )
  const shapes = Array.from(container.querySelectorAll('button')).map(button => getComputedStyle(button).borderTopLeftRadius)
  expect(shapes).toEqual(['0px', '1000px', '1000px', '0px', '1000px', '0px'])
})

it('keeps compact edges square by default and respects explicit rounded buttons', async () => {
  const { container } = await render(
    <FormProvider form={createForm()}>
      <FormButtonGroup layout="compact">
        <Reset>重置</Reset>
        <Submit />
      </FormButtonGroup>
      <FormButtonGroup layout="compact">
        <Submit shape="rounded" />
      </FormButtonGroup>
    </FormProvider>,
  )
  const buttons = Array.from(container.querySelectorAll('button'))
  expect(getComputedStyle(buttons[0]).borderRadius).toBe('0px')
  expect(getComputedStyle(buttons[1]).borderRadius).toBe('0px')
  expect(getComputedStyle(buttons[2]).borderRadius).toBe('999px')
})


it('inherits group shape and block defaults through wrapped and schema Reset buttons', async () => {
  function WrappedReset() {
    return <Reset shape="rectangular">包装重置</Reset>
  }
  const form = createForm({ initialValues: { username: 'initial' } })
  form.createField({ name: 'username' })
  form.setValues({ username: 'changed' })
  const { container, getByRole } = await render(
    <FormProvider form={form}>
      <FormButtonGroup shape="rounded" style={{ width: 360 }}>
        <WrappedReset />
        <VoidField name="reset" component={[Reset, { children: 'Schema 重置', shape: 'rectangular' }]} />
        <Reset block={false}>短按钮</Reset>
      </FormButtonGroup>
      <FormButtonGroup><Reset shape="rounded">自选圆角</Reset></FormButtonGroup>
      <Reset>独立按钮</Reset>
    </FormProvider>,
  )
  const buttons = Array.from(container.querySelectorAll('button'))
  for (const button of buttons.slice(0, 2)) {
    expect(getComputedStyle(button).borderTopLeftRadius).toBe('1000px')
    expect(button.getBoundingClientRect().width).toBe(328)
  }
  expect(buttons[2].getBoundingClientRect().width).toBeLessThan(328)
  expect(getComputedStyle(buttons[3]).borderTopLeftRadius).toBe('1000px')
  expect(buttons[4].classList.contains('adm-button-block')).toBe(false)
  expect(buttons[4].classList.contains('adm-button-shape-default')).toBe(true)
  await getByRole('button', { name: 'Schema 重置' }).click()
  await vi.waitFor(() => expect(form.values.username).toBe('initial'))
})

it.each(['vertical', 'horizontal', 'compact'] as const)('inherits bottom Sticky safe area in %s layout with explicit overrides', async (layout) => {
  const { container } = await render(
    <div>
      <FormButtonGroup layout={layout}>普通</FormButtonGroup>
      <FormButtonGroup.Sticky>
        <div><FormButtonGroup layout={layout}>默认吸底</FormButtonGroup></div>
        <FormButtonGroup layout={layout} safeAreaInsetBottom={false}>关闭</FormButtonGroup>
        <FormButtonGroup.Sticky position="top">
          <FormButtonGroup layout={layout}>嵌套顶部</FormButtonGroup>
        </FormButtonGroup.Sticky>
      </FormButtonGroup.Sticky>
      <FormButtonGroup.Sticky position="top">
        <FormButtonGroup layout={layout}>顶部</FormButtonGroup>
        <FormButtonGroup layout={layout} safeAreaInsetBottom>顶部开启</FormButtonGroup>
      </FormButtonGroup.Sticky>
    </div>,
  )
  const enabled = Array.from(container.querySelectorAll('.adm-formily-button-group'))
    .map(group => group.classList.contains('adm-formily-button-group-safe-area'))
  expect(enabled).toEqual([false, true, false, false, false, true])
})
