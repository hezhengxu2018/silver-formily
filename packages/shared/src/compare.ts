import { isEqual as baseIsEqual } from 'es-toolkit/predicate'

export function isEqual(a: unknown, b: unknown) {
  const isUrlA = a instanceof URL
  const isUrlB = b instanceof URL

  if (isUrlA !== isUrlB)
    return false

  if (isUrlA && isUrlB)
    return a.href === b.href

  return baseIsEqual(a, b)
}
