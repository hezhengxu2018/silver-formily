#!/usr/bin/env node
import { readFileSync, rmSync } from 'node:fs'
import process from 'node:process'
import { spawnPnpmSync } from './pnpm-process.mjs'

function runPnpm(args, options = {}) {
  const result = spawnPnpmSync(args, { encoding: 'utf8', ...options })
  if (result.error)
    throw result.error
  if (result.status !== 0) {
    console.error(result.stdout)
    console.error(result.stderr)
    process.exit(result.status ?? 1)
  }
  return result.stdout
}

const statusFile = '.changeset-status.tmp.json'
runPnpm(['exec', 'changeset', 'status', '--output', statusFile])
const status = JSON.parse(readFileSync(statusFile, 'utf8') || '{}')
rmSync(statusFile, { force: true })
const releases = status.releases?.map(release => release.name) ?? []

if (!releases.length) {
  console.log('No packages require publishing. Skipping build.')
  process.exit(0)
}

console.log('Building packages:', releases.join(', '))
const filters = releases.flatMap(name => ['--filter', name])
const build = spawnPnpmSync(['turbo', 'run', 'build', ...filters], {
  stdio: 'inherit',
})

if (build.error)
  throw build.error
process.exit(build.status ?? 0)
