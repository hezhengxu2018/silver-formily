#!/usr/bin/env node
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { spawnPnpmSync } from './pnpm-process.mjs'

const currentDir = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(currentDir, '..')
const workspaceDir = process.cwd()
const packageJsonPath = path.join(workspaceDir, 'package.json')

function normalizeExtraArgs(args) {
  return args[0] === '--' ? args.slice(1) : args
}

const extraArgs = normalizeExtraArgs(process.argv.slice(2))
const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'))
const buildDependencies = packageJson.silverFormily?.docs?.buildDependencies ?? []

if (!Array.isArray(buildDependencies) || !buildDependencies.every(item => typeof item === 'string')) {
  console.error('silverFormily.docs.buildDependencies 必须是字符串数组。')
  process.exit(1)
}

const uniqueDependencies = [...new Set(buildDependencies)]

if (!uniqueDependencies.length) {
  console.log(`No docs build dependencies configured for ${packageJson.name}. Skipping docs:deps.`)
  process.exit(0)
}

console.log(`Preparing docs dependencies for ${packageJson.name}: ${uniqueDependencies.join(', ')}`)

const filters = uniqueDependencies.flatMap(name => ['--filter', name])
const result = spawnPnpmSync(['exec', 'turbo', 'run', 'build', ...filters, ...extraArgs], {
  cwd: rootDir,
  env: process.env,
  stdio: 'inherit',
})

if (result.error)
  throw result.error

process.exit(result.status ?? 0)
