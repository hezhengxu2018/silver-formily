export function attach<T extends { onMount: () => void }>(target: T): T {
  target.onMount()
  return target
}

export function sleep(duration = 100) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}
