export function pickDataProps(props: any = {}) {
  const results: Record<string, any> = {}

  for (const key in props) {
    if (key.includes('data-')) {
      results[key] = props[key]
    }
  }

  return results
}
