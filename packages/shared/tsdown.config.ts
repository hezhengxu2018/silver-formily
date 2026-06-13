import { mkdir, readdir, readFile, rename, rm, writeFile } from 'node:fs/promises'
import { dirname, relative, resolve } from 'node:path'
import process from 'node:process'
import { defineConfig } from 'tsdown'

async function collectFiles(root: string): Promise<string[]> {
  const entries = await readdir(root, { withFileTypes: true })
  const files = await Promise.all(entries.map(async (entry) => {
    const entryPath = resolve(root, entry.name)
    if (entry.isDirectory())
      return collectFiles(entryPath)

    return [entryPath]
  }))

  return files.flat()
}

function toImportPath(fromFile: string, toFile: string) {
  const rel = relative(dirname(fromFile), toFile)
  const normalized = rel.split('\\').join('/')
  return normalized.startsWith('.') ? normalized : `./${normalized}`
}

function normalizePath(path: string) {
  return path.split('\\').join('/')
}

async function shortenBundledEsToolkitPaths(outDir: string) {
  const pnpmDir = resolve(outDir, 'node_modules/.pnpm')
  const packages = await readdir(pnpmDir, { withFileTypes: true }).catch(() => [])
  const esToolkitDir = packages.find(entry => entry.isDirectory() && entry.name.startsWith('es-toolkit@'))

  if (!esToolkitDir)
    return

  const bundledRoot = resolve(pnpmDir, esToolkitDir.name, 'node_modules/es-toolkit')
  const targetRoot = resolve(outDir, 'vendor/es-toolkit')
  const flattenedRoot = targetRoot

  await mkdir(dirname(targetRoot), { recursive: true })
  await rename(bundledRoot, targetRoot)

  const distRoot = resolve(targetRoot, 'dist')
  const distEntries = await readdir(distRoot, { withFileTypes: true }).catch(() => [])
  await Promise.all(distEntries.map(async (entry) => {
    await rename(resolve(distRoot, entry.name), resolve(targetRoot, entry.name))
  }))
  await rm(distRoot, { force: true, recursive: true })

  const outputFiles = await collectFiles(outDir)
  await Promise.all(outputFiles.map(async (filePath) => {
    if (!filePath.endsWith('.mjs') && !filePath.endsWith('.d.ts'))
      return

    if (filePath.startsWith(targetRoot))
      return

    const source = await readFile(filePath, 'utf8')
    const rewritten = source.replace(/(['"])(\.{1,2}\/node_modules\/\.pnpm\/es-toolkit@[^'"]+?\/node_modules\/es-toolkit\/[^'"]+)(['"])/g, (_, quoteStart, specifier, quoteEnd) => {
      const normalizedSpecifier = normalizePath(specifier)
      const relativeVendorPath = normalizedSpecifier
        .replace(/^\.{1,2}\/node_modules\/\.pnpm\/es-toolkit@[^/]+\/node_modules\/es-toolkit\//, '')
        .replace(/^dist\//, '')
      const absoluteNewPath = resolve(flattenedRoot, relativeVendorPath)
      return `${quoteStart}${toImportPath(filePath, absoluteNewPath)}${quoteEnd}`
    })

    if (rewritten !== source)
      await writeFile(filePath, rewritten)
  }))

  await rm(resolve(outDir, 'node_modules'), { force: true, recursive: true })
}

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  outDir: 'esm',
  unbundle: true,
  clean: true,
  sourcemap: true,
  dts: true,
  deps: {
    alwaysBundle: ['es-toolkit'],
    onlyBundle: ['es-toolkit'],
  },
  hooks: {
    'build:done': async function () {
      await shortenBundledEsToolkitPaths(resolve(process.cwd(), 'esm'))
    },
  },
  outExtensions: () => ({
    dts: '.d.ts',
    js: '.mjs',
  }),
})
