import { createForm } from '@silver-formily/core'
import { StrictMode } from 'react'
import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { Form, FormButtonGroup, FormItem, FormLayout, Input, Submit } from '../src'

afterEach(async () => {
  await cleanup()
  vi.restoreAllMocks()
  window.scrollTo(0, 0)
})
const nextFrames = () => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))

it.each(['top', 'bottom'] as const)('aligns a nested FormItem before and during %s attachment', async (position) => {
  const { container } = await render(
    <>
      <Form form={createForm()} labelCol={6} wrapperCol={10} style={{ width: 600 }}>
        <FormItem.BaseItem label="Name"><Input /></FormItem.BaseItem>
        <div style={{ height: '150vh' }} />
        <FormButtonGroup.Sticky position={position}>
          <FormButtonGroup.FormItem><Submit>Submit</Submit></FormButtonGroup.FormItem>
        </FormButtonGroup.Sticky>
      </Form>
      <div style={{ height: '150vh' }} />
    </>,
  )
  const { root, inner } = elements(container)
  const inputControl = container.querySelector('.silver-formily-form-item__control')!
  const actionItem = inner.querySelector('.silver-formily-form-item')!
  const button = inner.querySelector('button')!
  const expectAligned = () => {
    expect(actionItem.getBoundingClientRect().width).toBe(600)
    expect(button.getBoundingClientRect().left).toBeCloseTo(inputControl.getBoundingClientRect().left)
  }
  const rootTop = root.getBoundingClientRect().top
  if (position === 'top')
    window.scrollTo(0, rootTop + 10)
  await vi.waitFor(() => {
    expect(getComputedStyle(inner).position).toBe('fixed')
    expectAligned()
  })
  window.scrollTo(0, position === 'top' ? 0 : rootTop - 100)
  await vi.waitFor(() => {
    expect(getComputedStyle(inner).position).toBe('static')
    expectAligned()
  })
})

it('keeps the placeholder width stable in an inline flex form after fixing', async () => {
  const { container } = await render(
    <Form form={createForm()} layout="inline" style={{ width: 360 }}>
      <div style={{ width: '100%', height: '150vh' }} />
      <FormButtonGroup.Sticky>Actions</FormButtonGroup.Sticky>
    </Form>,
  )
  const { root, inner } = elements(container)
  await vi.waitFor(() => expect(getComputedStyle(inner).position).toBe('fixed'))
  await nextFrames()
  expect(root.getBoundingClientRect().width).toBe(360)
  expect(inner.getBoundingClientRect().width).toBe(360)
  expect(getComputedStyle(inner).position).toBe('fixed')
})

function elements(container: HTMLElement) {
  return {
    root: container.querySelector<HTMLElement>('.silver-formily-form-button-group-sticky')!,
    inner: container.querySelector<HTMLElement>('.silver-formily-form-button-group-sticky__inner')!,
    form: container.querySelector<HTMLElement>('.silver-formily-form-layout')!,
  }
}

it('bounds bottom attachment to a custom Form, preserving width and the original space', async () => {
  const { container } = await render(
    <>
      <div style={{ height: '150vh' }} />
      <Form form={createForm()} component="section" style={{ width: 360 }}>
        <div style={{ height: '150vh' }} />
        <FormButtonGroup.Sticky offsetBottom="1rem" zIndex={12}><div style={{ height: 48 }}>Actions</div></FormButtonGroup.Sticky>
      </Form>
      <div style={{ height: '150vh' }} />
    </>,
  )
  const { root, inner, form } = elements(container)
  const start = form.getBoundingClientRect().top
  const end = form.getBoundingClientRect().bottom
  await nextFrames()
  expect(getComputedStyle(inner).position).toBe('static')
  window.scrollTo(0, start - 100)
  await vi.waitFor(() => expect(getComputedStyle(inner).position).toBe('fixed'))
  const offset = Number.parseFloat(getComputedStyle(document.documentElement).fontSize)
  expect(inner.getBoundingClientRect().bottom).toBeCloseTo(document.documentElement.clientHeight - offset)
  expect(inner.getBoundingClientRect().width).toBe(360)
  expect(root.getBoundingClientRect().height).toBe(inner.getBoundingClientRect().height)
  expect(getComputedStyle(inner).zIndex).toBe('12')
  window.scrollTo(0, end + 20)
  await vi.waitFor(() => expect(getComputedStyle(inner).position).toBe('static'))
  window.scrollTo(0, start - 100)
  await vi.waitFor(() => expect(getComputedStyle(inner).position).toBe('fixed'))
  window.scrollTo(0, 0)
  await vi.waitFor(() => expect(getComputedStyle(inner).position).toBe('static'))
})

it('sticks to the top with the bottom=false alias and stops at the form trailing edge', async () => {
  const { container } = await render(
    <>
      <Form form={createForm()} style={{ width: 360 }}>
        <FormButtonGroup.Sticky bottom={false} offsetTop={20}><div style={{ height: 48 }}>Header</div></FormButtonGroup.Sticky>
        <div style={{ height: '150vh' }} />
      </Form>
      <div style={{ height: '150vh' }} />
    </>,
  )
  const { inner, form } = elements(container)
  const start = form.getBoundingClientRect().top
  const end = form.getBoundingClientRect().bottom
  window.scrollTo(0, start + 100)
  await vi.waitFor(() => expect(getComputedStyle(inner).position).toBe('fixed'))
  expect(inner.getBoundingClientRect().top).toBeCloseTo(20)
  window.scrollTo(0, end - 40)
  await vi.waitFor(() => expect(inner.getBoundingClientRect().bottom).toBeCloseTo(form.getBoundingClientRect().bottom))
  window.scrollTo(0, end + 20)
  await vi.waitFor(() => expect(getComputedStyle(inner).position).toBe('static'))
})

it('uses an explicit container ahead of its surrounding Form boundary', async () => {
  const boundary = document.createElement('div')
  Object.assign(boundary.style, { position: 'absolute', height: '400px', width: '360px' })
  document.body.appendChild(boundary)
  try {
    const { container } = await render(
      <>
        <Form form={createForm()}>
          <FormButtonGroup.Sticky position="top" offsetTop={20} container={boundary}><div style={{ height: 48 }}>Header</div></FormButtonGroup.Sticky>
          <div style={{ height: '150vh' }} />
        </Form>
        <div style={{ height: '150vh' }} />
      </>,
    )
    const { root, inner } = elements(container)
    const start = root.getBoundingClientRect().top
    boundary.style.top = `${start}px`
    window.scrollTo(0, start + 100)
    await vi.waitFor(() => expect(getComputedStyle(inner).position).toBe('fixed'))
    expect(inner.getBoundingClientRect().top).toBeCloseTo(20)
    window.scrollTo(0, start + 370)
    await vi.waitFor(() => expect(inner.getBoundingClientRect().bottom).toBeCloseTo(boundary.getBoundingClientRect().bottom))
    window.scrollTo(0, start + 450)
    await vi.waitFor(() => expect(getComputedStyle(inner).position).toBe('static'))
  }
  finally {
    boundary.remove()
  }
})

it('keeps ownership of the Form when a nested FormLayout has scrolled away', async () => {
  const { container } = await render(
    <>
      <Form form={createForm()}>
        <FormLayout>
          <FormButtonGroup.Sticky position="top"><div style={{ height: 48 }}>Header</div></FormButtonGroup.Sticky>
          <div style={{ height: 80 }} />
        </FormLayout>
        <div style={{ height: '150vh' }} />
      </Form>
      <div style={{ height: '100vh' }} />
    </>,
  )
  const { inner } = elements(container)
  const nested = container.querySelectorAll('.silver-formily-form-layout')[1]
  window.scrollTo(0, nested.getBoundingClientRect().bottom + 50)
  await vi.waitFor(() => expect(getComputedStyle(inner).position).toBe('fixed'))
  expect(inner.getBoundingClientRect().top).toBeCloseTo(0)
})

it('tracks content height and form width, and suspends floating when hidden', async () => {
  const { container } = await render(
    <Form form={createForm()} style={{ width: 360 }}>
      <div style={{ height: '150vh' }} />
      <FormButtonGroup.Sticky><div data-content style={{ height: 48 }}>Actions</div></FormButtonGroup.Sticky>
    </Form>,
  )
  const { root, inner, form } = elements(container)
  await vi.waitFor(() => expect(getComputedStyle(inner).position).toBe('fixed'))
  form.style.width = '240px'
  container.querySelector<HTMLElement>('[data-content]')!.style.height = '90px'
  await vi.waitFor(() => {
    expect(inner.getBoundingClientRect().width).toBe(240)
    expect(root.getBoundingClientRect().height).toBe(inner.getBoundingClientRect().height)
    expect(root.getBoundingClientRect().height).toBeGreaterThan(90)
  })
  form.style.display = 'none'
  await vi.waitFor(() => expect(getComputedStyle(inner).position).toBe('static'))
  form.style.display = 'block'
  await vi.waitFor(() => expect(getComputedStyle(inner).position).toBe('fixed'))
})

it('floats each button group only while its corresponding Form is visible', async () => {
  const { container } = await render(
    <>
      <Form form={createForm()}>
        <div style={{ height: '120vh' }} />
        <FormButtonGroup.Sticky>First</FormButtonGroup.Sticky>
      </Form>
      <div style={{ height: '100vh' }} />
      <Form form={createForm()}>
        <div style={{ height: '120vh' }} />
        <FormButtonGroup.Sticky>Second</FormButtonGroup.Sticky>
      </Form>
      <div style={{ height: '100vh' }} />
    </>,
  )
  const inners = container.querySelectorAll<HTMLElement>('.silver-formily-form-button-group-sticky__inner')
  await vi.waitFor(() => expect(getComputedStyle(inners[0]).position).toBe('fixed'))
  expect(getComputedStyle(inners[1]).position).toBe('static')
  const forms = container.querySelectorAll('.silver-formily-form-layout')
  window.scrollTo(0, forms[1].getBoundingClientRect().top + 100)
  await vi.waitFor(() => {
    expect(getComputedStyle(inners[0]).position).toBe('static')
    expect(getComputedStyle(inners[1]).position).toBe('fixed')
  })
})

it('keeps native submission inside the owning form while fixed', async () => {
  const submit = vi.fn()
  const { container, getByRole } = await render(
    <Form form={createForm({ initialValues: { name: 'Alice' } })} onAutoSubmit={submit}>
      <div style={{ height: '150vh' }} />
      <FormButtonGroup.Sticky><Submit>Save</Submit></FormButtonGroup.Sticky>
    </Form>,
  )
  const { inner } = elements(container)
  await vi.waitFor(() => expect(getComputedStyle(inner).position).toBe('fixed'))
  expect(inner.closest('form')).toBe(container.querySelector('form'))
  await getByRole('button', { name: 'Save' }).click()
  await vi.waitFor(() => expect(submit).toHaveBeenCalledWith({ name: 'Alice' }))
})

it('uses native form fallback and ignores a form clipped out by an inner scroller', async () => {
  const { container } = await render(
    <div data-scroller style={{ height: 100, overflow: 'auto', width: 360 }}>
      <div style={{ height: 180 }} />
      <form>
        <div style={{ height: '150vh' }} />
        <FormButtonGroup.Sticky>Actions</FormButtonGroup.Sticky>
      </form>
    </div>,
  )
  const { inner } = elements(container)
  const scroller = container.querySelector<HTMLElement>('[data-scroller]')!
  await nextFrames()
  expect(getComputedStyle(inner).position).toBe('static')
  scroller.scrollTop = 180
  await vi.waitFor(() => expect(getComputedStyle(inner).position).toBe('fixed'))
  scroller.scrollTop = 0
  await vi.waitFor(() => expect(getComputedStyle(inner).position).toBe('static'))
})

it('cleans up listeners and pending measurements under StrictMode', async () => {
  const add = vi.spyOn(window, 'addEventListener')
  const remove = vi.spyOn(window, 'removeEventListener')
  const { unmount } = await render(
    <StrictMode>
      <Form form={createForm()}>
        <FormButtonGroup.Sticky>Actions</FormButtonGroup.Sticky>
      </Form>
    </StrictMode>,
  )
  await vi.waitFor(() => expect(add).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true }))
  window.dispatchEvent(new Event('resize'))
  await unmount()
  expect(remove).toHaveBeenCalledWith('scroll', expect.any(Function))
  expect(remove).toHaveBeenCalledWith('resize', expect.any(Function))
})

it('finds the fixed BEM FormLayout boundary without a Form or explicit container', async () => {
  const { container } = await render(
    <>
      <FormLayout>
        <div style={{ height: '150vh' }} />
        <div><FormButtonGroup.Sticky className="caller-sticky">Actions</FormButtonGroup.Sticky></div>
      </FormLayout>
      <div style={{ height: '150vh' }} />
    </>,
  )
  const { root, inner } = elements(container)
  expect(root.classList.contains('caller-sticky')).toBe(true)
  await vi.waitFor(() => {
    expect(getComputedStyle(inner).position).toBe('fixed')
    expect(inner.classList.contains('silver-formily-form-button-group-sticky__inner--fixed')).toBe(true)
  })
  const layout = container.querySelector('.silver-formily-form-layout')!
  window.scrollTo(0, layout.getBoundingClientRect().bottom + 10)
  await vi.waitFor(() => {
    expect(getComputedStyle(inner).position).toBe('static')
    expect(inner.classList.contains('silver-formily-form-button-group-sticky__inner--fixed')).toBe(false)
  })
})
