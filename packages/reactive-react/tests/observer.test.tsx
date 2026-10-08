import type React from 'react'
import { observable } from '@silver-formily/reactive'
import { createRef, StrictMode } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { Observer, observer } from '../src'

// 注意：macOS 文件系统大小写不敏感，Observer 组件的测试也放在本文件中
afterEach(cleanup)

describe('observer', () => {
  it('renders observable state and re-renders on mutation', async () => {
    const obs = observable({ count: 0 })
    const App = observer(() => <div data-testid="count">{obs.count}</div>)
    const screen = await render(<App />)
    await expect.element(screen.getByTestId('count')).toHaveTextContent('0')

    obs.count++
    await expect.element(screen.getByTestId('count')).toHaveTextContent('1')
  })

  it('supports custom displayName option', () => {
    const App = observer(() => <div>content</div>, {
      displayName: 'CustomDisplayName',
    })
    expect(App.displayName).toBe('CustomDisplayName')
  })

  it('passes ref to the wrapped component with forwardRef option', async () => {
    const obs = observable({ text: 'hello' })
    const App = observer<
      { text: string, ref?: React.Ref<HTMLDivElement> },
      { forwardRef: true }
    >(
      props => (
        <div data-testid="text" ref={props.ref}>
          {props.text}
        </div>
      ),
      { forwardRef: true },
    )
    const ref: React.RefObject<HTMLDivElement | null> = { current: null }
    const screen = await render(<App ref={ref} text={obs.text} />)
    await expect
      .element(screen.getByTestId('text'))
      .toHaveTextContent('hello')
    expect(ref.current?.tagName).toBe('DIV')
  })

  it('hoists statics from the wrapped component', () => {
    const Base = (() => {
      const component: ((
        props: { value: string, children?: React.ReactNode },
      ) => React.ReactElement) & { title: string } = props => (
        <div>{props.value}</div>
      )
      component.title = 'base-title'
      return component
    })()
    const Wrapped = observer(Base)
    expect((Wrapped as unknown as { title: string }).title).toBe('base-title')
  })

  it('accepts object and callback refs when original props omit ref', async () => {
    const App = observer((props: { children: string }) => <div {...props} />, { forwardRef: true })
    const ref = createRef<HTMLDivElement>()
    const callback = vi.fn<(node: HTMLDivElement | null) => void>()
    await render(
      <>
        <App ref={ref}>object</App>
        <App ref={callback}>callback</App>
      </>,
    )
    expect(ref.current?.textContent).toBe('object')
    expect(callback.mock.calls[0][0]?.textContent).toBe('callback')
  })

  it('skips re-render when observable state is untouched', async () => {
    const unrelated = observable({ value: 'x' })
    let renderCount = 0
    const Child = observer(() => {
      renderCount++
      return <div>child</div>
    })
    const App = observer(() => {
      renderCount++
      return (
        <div>
          <span data-testid="value">{unrelated.value}</span>
          <Child />
        </div>
      )
    })
    const screen = await render(<App />)
    unrelated.value = 'y'
    await expect.element(screen.getByTestId('value')).toHaveTextContent('y')
    // Child 未读取 unrelated.value，不应被重新渲染
    expect(renderCount).toBe(3)
  })

  it('stops re-rendering after unmount', async () => {
    const obs = observable({ value: 1 })
    let renderCount = 0
    const App = observer(() => {
      renderCount++
      return <div data-testid="value">{obs.value}</div>
    })
    const { unmount } = await render(<App />)
    expect(renderCount).toBe(1)

    await unmount()
    obs.value = 2
    await new Promise(resolve => setTimeout(resolve, 100))
    expect(renderCount).toBe(1)
  })

  it('keeps independent observers isolated', async () => {
    const a = observable({ value: 'a0' })
    const b = observable({ value: 'b0' })
    const CompA = observer(() => <div data-testid="a">{a.value}</div>)
    const CompB = observer(() => <div data-testid="b">{b.value}</div>)
    const screen = await render(
      <>
        <CompA />
        <CompB />
      </>,
    )

    a.value = 'a1'
    await expect.element(screen.getByTestId('a')).toHaveTextContent('a1')
    await expect.element(screen.getByTestId('b')).toHaveTextContent('b0')
  })

  it('stays reactive under StrictMode', async () => {
    const obs = observable({ value: 'initial' })
    const App = observer(() => <div data-testid="strict">{obs.value}</div>)
    const screen = await render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
    await expect
      .element(screen.getByTestId('strict'))
      .toHaveTextContent('initial')

    obs.value = 'strict-updated'
    await expect
      .element(screen.getByTestId('strict'))
      .toHaveTextContent('strict-updated')
  })
})

describe('observer component', () => {
  it('renders reactive children via render function', async () => {
    const obs = observable({ value: 'hello' })
    const screen = await render(
      <Observer>
        {() => <div data-testid="value">{obs.value}</div>}
      </Observer>,
    )
    await expect
      .element(screen.getByTestId('value'))
      .toHaveTextContent('hello')

    obs.value = 'world'
    await expect
      .element(screen.getByTestId('value'))
      .toHaveTextContent('world')
  })

  it('renders static children directly', async () => {
    const screen = await render(
      <Observer>
        <div data-testid="static">static-content</div>
      </Observer>,
    )
    await expect
      .element(screen.getByTestId('static'))
      .toHaveTextContent('static-content')
  })

  it('renders nothing when children is omitted', async () => {
    const { container } = await render(<Observer />)
    expect(container.innerHTML).toBe('')
  })
})
