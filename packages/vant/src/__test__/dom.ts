export function getElement<T extends Element = HTMLElement>(container: ParentNode, selector: string) {
  const element = container.querySelector<T>(selector)

  if (!element) {
    throw new Error(`Element not found: ${selector}`)
  }

  return element
}
