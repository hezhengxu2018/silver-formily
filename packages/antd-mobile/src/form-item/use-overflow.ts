import { useEffect, useRef, useState } from 'react'

export function useOverflow() {
  const containerRef = useRef<HTMLSpanElement>(null)
  const contentRef = useRef<HTMLSpanElement>(null)
  const [overflow, setOverflow] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    const content = contentRef.current
    if (!container || !content)
      return
    const measure = () => {
      setOverflow(container.clientWidth > 0 && content.getBoundingClientRect().width > container.clientWidth + 1)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(container)
    observer.observe(content)
    // Inline text preserves ellipsis, but its text updates do not resize an observed box.
    const contentObserver = new MutationObserver(measure)
    contentObserver.observe(content, { childList: true, characterData: true, subtree: true })
    return () => {
      observer.disconnect()
      contentObserver.disconnect()
    }
  }, [])

  return { containerRef, contentRef, overflow }
}
