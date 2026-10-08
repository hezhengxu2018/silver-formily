import type React from 'react'
import { Component, Fragment } from 'react'
import { expect } from 'vitest'
import { render } from 'vitest-browser-react'

export class ErrorBoundary extends Component<
  { children?: React.ReactNode },
  { error: Error | null }
> {
  state: { error: Error | null } = {
    error: null,
  }

  componentDidCatch(error: Error) {
    this.setState({
      error,
    })
  }

  render() {
    if (this.state.error) {
      return (
        <div data-testid="error-boundary-message">
          {this.state.error.message}
        </div>
      )
    }
    return <Fragment>{this.props.children}</Fragment>
  }
}

export async function expectThrowError(callback: () => React.ReactElement) {
  const screen = await render(<ErrorBoundary>{callback()}</ErrorBoundary>)
  await expect
    .element(screen.getByTestId('error-boundary-message'))
    .toBeVisible()
}
