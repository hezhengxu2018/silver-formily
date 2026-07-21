export function attach<T extends { onMount: () => void }>(
  target: T | undefined,
): T {
  if (!target)
    throw new Error('Expected a mountable model')

  target.onMount()
  return target
}

export function sleep(duration = 100) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}
