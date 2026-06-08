import type { SchemaPatch } from './types'
import { isArr, isFn } from '@silver-formily/shared'

const patches: SchemaPatch[] = []

const polyfills: Record<string, SchemaPatch[]> = {}

export function reducePatches(schema: any) {
  return patches.reduce(
    (buf, patch) => {
      return patch(buf)
    },
    { ...schema },
  )
}

export function registerPatches(...args: SchemaPatch[]) {
  args.forEach((patch) => {
    if (isFn(patch) && !patches.includes(patch)) {
      patches.push(patch)
    }
  })
}

export function registerPolyfills(version: string, patch: SchemaPatch) {
  if (version && isFn(patch)) {
    polyfills[version] = polyfills[version] || []
    polyfills[version].push(patch)
  }
}

export function enablePolyfills(versions?: string[]) {
  if (isArr(versions)) {
    versions.forEach((version) => {
      if (isArr(polyfills[version])) {
        polyfills[version].forEach((patch) => {
          registerPatches(patch)
        })
      }
    })
  }
}
