export function pickDataProps(props: object = {}) {
  const results: Record<string, unknown> = {}

  for (const key in props) {
    if (key.includes('data-')) {
      results[key] = (props as Record<string, unknown>)[key]
    }
  }

  return results
}
