export function queryElement(container: ParentNode, selector: string): HTMLElement {
  const element = container.querySelector<HTMLElement>(selector)
  if (!element)
    throw new Error(`Element not found: ${selector}`)
  return element
}

export function ensureDomElement(element: Element | null | undefined, description = 'element'): HTMLElement | SVGElement {
  if (element instanceof HTMLElement || element instanceof SVGElement)
    return element

  throw new Error(`Element not found: ${description}`)
}
