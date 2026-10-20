import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { FormButtonGroup, FormLayout } from '../src'

afterEach(async () => {
  await cleanup()
  vi.restoreAllMocks()
  window.scrollTo(0, 0)
})

function elements(container: HTMLElement) {
  return {
    root: container.querySelector<HTMLElement>('.adm-formily-button-group-sticky')!,
    inner: container.querySelector<HTMLElement>('.adm-formily-button-group-sticky-inner')!,
  }
}

it('sticks to the viewport bottom with an offset, preserves space and returns to flow', async () => {
  const { container } = await render(
    <div style={{ width: 360 }}>
      <div style={{ height: '120vh' }} />
      <FormButtonGroup.Sticky offsetBottom="1rem" zIndex={12}>
        <div style={{ height: 48 }}>操作栏</div>
      </FormButtonGroup.Sticky>
      <div style={{ height: '100vh' }} />
    </div>,
  )
  const { root, inner } = elements(container)
  await vi.waitFor(() => expect(getComputedStyle(inner).position).toBe('fixed'))
  expect(root.getBoundingClientRect().height).toBe(48)
  expect(inner.getBoundingClientRect().width).toBe(360)
  expect(getComputedStyle(inner).zIndex).toBe('12')
  expect(inner.getBoundingClientRect().bottom).toBeCloseTo(document.documentElement.clientHeight - Number.parseFloat(getComputedStyle(document.documentElement).fontSize))
  window.scrollTo(0, root.getBoundingClientRect().top - 100)
  await vi.waitFor(() => expect(getComputedStyle(inner).position).toBe('static'))
  expect(root.getBoundingClientRect().height).toBe(48)
})

it('sticks to the top and is pushed out by its explicit container boundary', async () => {
  const boundary = document.createElement('div')
  boundary.style.height = '400px'
  boundary.style.width = '360px'
  document.body.appendChild(boundary)
  try {
    const { container } = await render(
      <>
        <FormButtonGroup.Sticky position="top" offsetTop={20} container={boundary}>
          <div style={{ height: 48 }}>顶部</div>
        </FormButtonGroup.Sticky>
        <div style={{ height: '200vh' }} />
      </>,
    )
    const { root, inner } = elements(container)
    // Move the boundary to contain the actual sticky root without remounting React.
    boundary.style.position = 'absolute'
    boundary.style.top = `${root.getBoundingClientRect().top}px`
    const start = root.getBoundingClientRect().top
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

it('uses the nearest native form before the FormLayout boundary', async () => {
  const { container } = await render(
    <FormLayout>
      <form style={{ marginTop: '120vh' }}>
        <div style={{ height: '100vh' }} />
        <FormButtonGroup.Sticky><div style={{ height: 48 }}>操作栏</div></FormButtonGroup.Sticky>
      </form>
    </FormLayout>,
  )
  const { inner } = elements(container)
  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
  expect(getComputedStyle(inner).position).toBe('static')
  window.scrollTo(0, document.documentElement.clientHeight)
  await vi.waitFor(() => expect(getComputedStyle(inner).position).toBe('fixed'))
})

it('uses FormLayout as the default boundary and adjusts at its leading edge', async () => {
  const { container } = await render(
    <div style={{ paddingTop: '120vh' }}>
      <FormLayout>
        <div style={{ height: '120vh' }} />
        <FormButtonGroup.Sticky><div style={{ height: 48 }}>操作栏</div></FormButtonGroup.Sticky>
      </FormLayout>
    </div>,
  )
  const { inner } = elements(container)
  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
  expect(getComputedStyle(inner).position).toBe('static')
  const layout = container.querySelector('.adm-list')!
  window.scrollTo(0, layout.getBoundingClientRect().top - document.documentElement.clientHeight + 20)
  await vi.waitFor(() => expect(getComputedStyle(inner).position).toBe('fixed'))
  expect(inner.getBoundingClientRect().top).toBeCloseTo(layout.getBoundingClientRect().top)
})

it('updates width, content height, hidden state and nested scrolling', async () => {
  const { container } = await render(
    <div data-scroller style={{ height: '100vh', overflow: 'auto', width: 360 }}>
      <div style={{ height: '120vh' }} />
      <FormButtonGroup.Sticky><div data-content style={{ height: 48 }}>操作栏</div></FormButtonGroup.Sticky>
      <div style={{ height: '100vh' }} />
    </div>,
  )
  const { root, inner } = elements(container)
  const scroller = container.querySelector<HTMLElement>('[data-scroller]')!
  await vi.waitFor(() => expect(getComputedStyle(inner).position).toBe('fixed'))
  scroller.style.width = '300px'
  container.querySelector<HTMLElement>('[data-content]')!.style.height = '80px'
  await vi.waitFor(() => {
    expect(inner.getBoundingClientRect().width).toBe(300)
    expect(root.getBoundingClientRect().height).toBe(80)
  })
  scroller.style.display = 'none'
  await vi.waitFor(() => expect(inner.classList.contains('adm-formily-button-group-sticky-fixed')).toBe(false))
  scroller.style.display = 'block'
  await vi.waitFor(() => expect(getComputedStyle(inner).position).toBe('fixed'))
  scroller.scrollTop = document.documentElement.clientHeight
  await vi.waitFor(() => expect(getComputedStyle(inner).position).toBe('static'))
})

it('cleans up pending measurements and scroll listeners on unmount', async () => {
  const remove = vi.spyOn(window, 'removeEventListener')
  const add = vi.spyOn(window, 'addEventListener')
  const { unmount } = await render(<FormButtonGroup.Sticky>操作栏</FormButtonGroup.Sticky>)
  await vi.waitFor(() => expect(add).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true }))
  window.dispatchEvent(new Event('resize'))
  await unmount()
  expect(remove).toHaveBeenCalledWith('scroll', expect.any(Function))
  expect(remove).toHaveBeenCalledWith('resize', expect.any(Function))
  remove.mockRestore()
})


it('only floats while the form is visible, including scrolling back above it', async () => {
  const { container } = await render(
    <>
      <div style={{ height: '150vh' }}>表单之前</div>
      <FormLayout>
        <div style={{ height: '150vh' }}>表单内容</div>
        <FormButtonGroup.Sticky><div style={{ height: 48 }}>提交</div></FormButtonGroup.Sticky>
      </FormLayout>
      <div style={{ height: '150vh' }}>表单之后</div>
    </>,
  )
  const { inner } = elements(container)
  const layout = container.querySelector('.adm-list')!
  const start = layout.getBoundingClientRect().top
  const end = layout.getBoundingClientRect().bottom
  const viewport = document.documentElement.clientHeight
  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
  expect(getComputedStyle(inner).position).toBe('static')
  expect(inner.getBoundingClientRect().top).toBeGreaterThan(viewport)
  window.scrollTo(0, start - viewport + 100)
  await vi.waitFor(() => expect(getComputedStyle(inner).position).toBe('fixed'))
  expect(inner.getBoundingClientRect().bottom).toBeCloseTo(viewport)
  window.scrollTo(0, 0)
  await vi.waitFor(() => expect(getComputedStyle(inner).position).toBe('static'))
  expect(inner.getBoundingClientRect().top).toBeGreaterThan(viewport)
  window.scrollTo(0, end + 20)
  await vi.waitFor(() => expect(getComputedStyle(inner).position).toBe('static'))
  expect(inner.getBoundingClientRect().bottom).toBeLessThan(0)
})

it('does not float a form clipped out by an inner scroll container', async () => {
  const { container } = await render(
    <div data-scroller style={{ height: 100, overflow: 'auto', width: 360 }}>
      <div style={{ height: 180 }} />
      <FormLayout>
        <div style={{ height: '150vh' }} />
        <FormButtonGroup.Sticky><div style={{ height: 48 }}>提交</div></FormButtonGroup.Sticky>
      </FormLayout>
    </div>,
  )
  const { inner } = elements(container)
  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
  expect(getComputedStyle(inner).position).toBe('static')
  container.querySelector<HTMLElement>('[data-scroller]')!.scrollTop = 180
  await vi.waitFor(() => expect(getComputedStyle(inner).position).toBe('fixed'))
  container.querySelector<HTMLElement>('[data-scroller]')!.scrollTop = 0
  await vi.waitFor(() => expect(getComputedStyle(inner).position).toBe('static'))
})


it('pauses geometry measurements outside the viewport and restarts them on reentry', async () => {
  const { container } = await render(
    <>
      <div style={{ height: '150vh' }} />
      <FormLayout>
        <div style={{ height: '150vh' }} />
        <FormButtonGroup.Sticky><div style={{ height: 48 }}>操作栏</div></FormButtonGroup.Sticky>
      </FormLayout>
      <div style={{ height: '100vh' }} />
    </>,
  )
  const { root, inner } = elements(container)
  const layout = container.querySelector<HTMLElement>('.adm-list')!
  const start = layout.getBoundingClientRect().top
  const measureRoot = vi.spyOn(root, 'getBoundingClientRect')
  const measureBoundary = vi.spyOn(layout, 'getBoundingClientRect')
  const nextFrames = () => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
  await nextFrames()
  window.dispatchEvent(new Event('scroll'))
  window.dispatchEvent(new Event('resize'))
  await nextFrames()
  expect(measureRoot).not.toHaveBeenCalled()
  expect(measureBoundary).not.toHaveBeenCalled()
  window.scrollTo(0, start - 100)
  await vi.waitFor(() => expect(getComputedStyle(inner).position).toBe('fixed'))
  expect(measureRoot).toHaveBeenCalled()
  window.scrollTo(0, 0)
  await vi.waitFor(() => expect(getComputedStyle(inner).position).toBe('static'))
  await nextFrames()
  measureRoot.mockClear()
  measureBoundary.mockClear()
  window.dispatchEvent(new Event('scroll'))
  window.dispatchEvent(new Event('resize'))
  await nextFrames()
  expect(measureRoot).not.toHaveBeenCalled()
  expect(measureBoundary).not.toHaveBeenCalled()
  container.querySelector<HTMLElement>('.adm-formily-button-group-sticky-inner > div')!.style.height = '80px'
  window.scrollTo(0, start - 100)
  await vi.waitFor(() => {
    expect(getComputedStyle(inner).position).toBe('fixed')
    expect(root.getBoundingClientRect().height).toBe(80)
  })
})

it('remeasures wrapped content after a fixed bar changes width', async () => {
  const { container } = await render(
    <div data-wrapper style={{ width: 360 }}>
      <div style={{ height: '150vh' }} />
      <FormButtonGroup.Sticky>
        <div style={{ fontSize: 20, lineHeight: '30px', overflowWrap: 'anywhere', padding: 8 }}>
          This action bar contains enough text to wrap over multiple lines when its container becomes narrower.
        </div>
      </FormButtonGroup.Sticky>
    </div>,
  )
  const { root, inner } = elements(container)
  await vi.waitFor(() => expect(getComputedStyle(inner).position).toBe('fixed'))
  const initialHeight = inner.getBoundingClientRect().height
  container.querySelector<HTMLElement>('[data-wrapper]')!.style.width = '180px'
  await vi.waitFor(() => {
    expect(inner.getBoundingClientRect().width).toBe(180)
    expect(inner.getBoundingClientRect().height).toBeGreaterThan(initialHeight)
    expect(root.getBoundingClientRect().height).toBe(inner.getBoundingClientRect().height)
    expect(inner.getBoundingClientRect().bottom).toBeCloseTo(document.documentElement.clientHeight)
  })
})

it('does not mutate inline width on scroll when geometry is unchanged', async () => {
  const { container } = await render(
    <div style={{ width: 360 }}>
      <div style={{ height: '150vh' }} />
      <FormButtonGroup.Sticky><div style={{ height: 48 }}>操作栏</div></FormButtonGroup.Sticky>
    </div>,
  )
  const { inner } = elements(container)
  await vi.waitFor(() => expect(getComputedStyle(inner).position).toBe('fixed'))
  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
  const mutations: MutationRecord[] = []
  const observer = new MutationObserver(records => mutations.push(...records))
  observer.observe(inner, { attributes: true, attributeFilter: ['style'] })
  try {
    window.dispatchEvent(new Event('scroll'))
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
    expect(mutations).toHaveLength(0)
  }
  finally {
    observer.disconnect()
  }
})
