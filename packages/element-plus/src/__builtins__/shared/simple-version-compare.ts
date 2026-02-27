function normalizeVersion(v: string) {
  return v.split('.').map((n) => {
    const num = Number.parseInt(n, 10)
    return Number.isNaN(num) ? '0'.padStart(10, '0') : num.toString().padStart(10, '0')
  }).join('.')
}

export function quickVersionCompare(v1: string, v2: string): number {
  const nv1 = normalizeVersion(v1)
  const nv2 = normalizeVersion(v2)
  return nv1 > nv2 ? 1 : (nv1 < nv2 ? -1 : 0)
}

export function lt(v1: string, v2: string): boolean {
  return quickVersionCompare(v1, v2) < 0
}
