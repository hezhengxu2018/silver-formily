import { defineBrowserCommand } from '@vitest/browser'

type SelectorStrategy = 'first' | 'last'

function assertPlaywrightProvider(ctx: { provider: { name: string } }, commandName: string) {
  if (ctx.provider.name !== 'playwright')
    throw new Error(`${commandName} only supports playwright provider, got ${ctx.provider.name}`)
}

export const dragByHtml5 = defineBrowserCommand(async (ctx, sourceSelector: string, targetSelector: string) => {
  assertPlaywrightProvider(ctx, 'dragByHtml5')

  const frame = await ctx.frame()
  const source = frame.locator(sourceSelector).last()

  await source.waitFor()

  return await frame.evaluate(async ({ sourceSelector, targetSelector }) => {
    const resolveElement = (selector: string, strategy: SelectorStrategy) => {
      const elements = Array.from(document.querySelectorAll<HTMLElement>(selector))
      return strategy === 'first' ? elements[0] : elements.at(-1)
    }

    const flushFrame = () => new Promise<void>(resolve => requestAnimationFrame(() => resolve()))
    const waitForElement = async (selector: string, strategy: SelectorStrategy, attempts = 30) => {
      for (let index = 0; index < attempts; index += 1) {
        const element = resolveElement(selector, strategy)
        if (element)
          return element
        await flushFrame()
      }

      return null
    }

    const source = resolveElement(sourceSelector, 'last')
    if (!source)
      throw new Error(`Cannot resolve drag source inside frame: ${sourceSelector}`)

    const dataTransfer = new DataTransfer()
    const sourceRect = source.getBoundingClientRect()

    const dispatchDrag = (
      target: HTMLElement,
      type: 'dragstart' | 'dragenter' | 'dragover' | 'drop' | 'dragend',
    ) => {
      target.dispatchEvent(new DragEvent(type, {
        bubbles: true,
        cancelable: true,
        dataTransfer,
        clientX: sourceRect.x + sourceRect.width / 2,
        clientY: sourceRect.y + sourceRect.height / 2,
      }))
    }

    dispatchDrag(source, 'dragstart')
    await flushFrame()

    const target = await waitForElement(targetSelector, 'first')
    if (!target)
      throw new Error(`Cannot resolve drag target inside frame: ${targetSelector}`)

    dispatchDrag(target, 'dragenter')
    dispatchDrag(target, 'dragover')
    dispatchDrag(target, 'drop')
    dispatchDrag(source, 'dragend')
    await flushFrame()

    return {
      activeElement: document.activeElement instanceof HTMLElement
        ? {
            tagName: document.activeElement.tagName,
            className: document.activeElement.className,
            dataset: { ...document.activeElement.dataset },
          }
        : null,
      sourceExists: true,
      targetExists: true,
    }
  }, {
    sourceSelector,
    targetSelector,
  })
})

export const dragByPointer = defineBrowserCommand(async (ctx, sourceSelector: string, targetSelector: string) => {
  assertPlaywrightProvider(ctx, 'dragByPointer')

  const frame = await ctx.frame()
  const source = frame.locator(sourceSelector).last()

  await source.waitFor()

  return await frame.evaluate(async ({ sourceSelector, targetSelector }) => {
    const resolveElement = (selector: string, strategy: SelectorStrategy) => {
      const elements = Array.from(document.querySelectorAll<HTMLElement>(selector))
      return strategy === 'first' ? elements[0] : elements.at(-1)
    }

    const flushFrame = () => new Promise<void>(resolve => requestAnimationFrame(() => resolve()))
    const flushFrames = async (count: number) => {
      for (let index = 0; index < count; index += 1)
        await flushFrame()
    }
    const waitForElement = async (selector: string, strategy: SelectorStrategy, attempts = 30) => {
      for (let index = 0; index < attempts; index += 1) {
        const element = resolveElement(selector, strategy)
        if (element)
          return element
        await flushFrame()
      }

      return null
    }

    const source = resolveElement(sourceSelector, 'last')
    if (!source)
      throw new Error(`Cannot resolve drag source inside frame: ${sourceSelector}`)

    const dispatchPointer = (
      target: Document | HTMLElement,
      type: 'pointerdown' | 'pointermove' | 'pointerup',
      point: { x: number, y: number },
      buttons: number,
    ) => {
      target.dispatchEvent(new PointerEvent(type, {
        bubbles: true,
        cancelable: true,
        composed: true,
        button: 0,
        buttons,
        clientX: point.x,
        clientY: point.y,
        pointerId: 1,
        pointerType: 'mouse',
        isPrimary: true,
      }))
    }

    const sourceRect = source.getBoundingClientRect()
    const sourceCenter = {
      x: sourceRect.x + sourceRect.width / 2,
      y: sourceRect.y + sourceRect.height / 2,
    }

    await flushFrames(3)

    dispatchPointer(source, 'pointerdown', sourceCenter, 1)
    await flushFrames(2)

    const target = await waitForElement(targetSelector, 'first')
    if (!target)
      throw new Error(`Cannot resolve drag target inside frame: ${targetSelector}`)

    const targetRect = target.getBoundingClientRect()
    const targetCenter = {
      x: targetRect.x + targetRect.width / 2,
      y: targetRect.y + targetRect.height / 2,
    }

    const steps = 6
    for (let index = 1; index <= steps; index += 1) {
      const progress = index / steps
      dispatchPointer(document, 'pointermove', {
        x: sourceCenter.x + (targetCenter.x - sourceCenter.x) * progress,
        y: sourceCenter.y + (targetCenter.y - sourceCenter.y) * progress,
      }, 1)
      await flushFrame()
    }

    await flushFrames(2)
    dispatchPointer(document, 'pointerup', targetCenter, 0)
    await flushFrames(2)

    const targetElement = document.elementFromPoint(targetCenter.x, targetCenter.y)

    return {
      previewCount: document.querySelectorAll('.dnd-kit-preview').length,
      draggableCount: document.querySelectorAll('[data-dnd-kit-draggable]').length,
      droppableCount: document.querySelectorAll('[data-dnd-kit-droppable]').length,
      activeElement: document.activeElement instanceof HTMLElement
        ? {
            tagName: document.activeElement.tagName,
            className: document.activeElement.className,
            dataset: { ...document.activeElement.dataset },
          }
        : null,
      elementAtTargetPoint: targetElement instanceof HTMLElement
        ? targetElement.dataset.testid || targetElement.className || targetElement.tagName
        : null,
      sourceCenter,
      targetCenter,
    }
  }, {
    sourceSelector,
    targetSelector,
  })
})

export const inspectPointerDrag = defineBrowserCommand(async (ctx, sourceSelector: string, targetSelector: string) => {
  assertPlaywrightProvider(ctx, 'inspectPointerDrag')

  const frame = await ctx.frame()
  const source = frame.locator(sourceSelector).last()
  const target = frame.locator(targetSelector).first()

  await source.waitFor()
  await target.waitFor()

  return await frame.evaluate(({ sourceSelector, targetSelector }) => {
    const readElement = (selector: string, strategy: SelectorStrategy) => {
      const all = Array.from(document.querySelectorAll(selector))
      const element = strategy === 'first' ? all[0] : all.at(-1)

      if (!(element instanceof HTMLElement)) {
        return {
          selector,
          count: all.length,
          exists: false,
        }
      }

      const rect = element.getBoundingClientRect()

      return {
        selector,
        count: all.length,
        exists: true,
        className: element.className,
        dataset: { ...element.dataset },
        rect: {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
        },
      }
    }

    const activeElement = () => {
      const element = document.activeElement
      if (!(element instanceof HTMLElement))
        return null

      return {
        tagName: element.tagName,
        className: element.className,
        dataset: { ...element.dataset },
      }
    }

    const source = readElement(sourceSelector, 'last')
    const target = readElement(targetSelector, 'first')

    return {
      source,
      target,
      draggableCount: document.querySelectorAll('[data-dnd-kit-draggable]').length,
      droppableCount: document.querySelectorAll('[data-dnd-kit-droppable]').length,
      previewCount: document.querySelectorAll('.dnd-kit-preview').length,
      activeElement: activeElement(),
      sourceCenter: source.rect
        ? {
            x: source.rect.x + source.rect.width / 2,
            y: source.rect.y + source.rect.height / 2,
          }
        : { x: 0, y: 0 },
      targetCenter: target.rect
        ? {
            x: target.rect.x + target.rect.width / 2,
            y: target.rect.y + target.rect.height / 2,
          }
        : { x: 0, y: 0 },
    }
  }, {
    sourceSelector,
    targetSelector,
  })
})
