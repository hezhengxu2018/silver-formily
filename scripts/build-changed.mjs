#!/usr/bin/env node
import { spawnSync } from 'node:child_process'
import process from 'node:process'

function run(command, args, options = {}) {
  const result = spawnSync(command, args, { encoding: 'utf8', ...options })
  if (result.error)
    throw result.error
  if (result.status !== 0) {
    console.error(result.stdout)
    console.error(result.stderr)
    process.exit(result.status ?? 1)
  }
  return result.stdout
}

const statusJson = run('pnpm', ['changeset', 'status', '--json'])
const status = JSON.parse(statusJson || '{}')
const releases = status.releases?.map(release => release.name) ?? []

if (!releases.length) {
  console.log('No packages require publishing. Skipping build.')
  process.exit(0)
}

console.log('Building packages:', releases.join(', '))
const filters = releases.flatMap(name => ['--filter', name])
const build = spawnSync('pnpm', ['turbo', 'run', 'build', ...filters], {
  stdio: 'inherit',
})

if (build.error)
  throw build.error
process.exit(build.status ?? 0)
