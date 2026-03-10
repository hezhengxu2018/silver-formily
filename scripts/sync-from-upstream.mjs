#!/usr/bin/env node
import { spawnSync } from 'node:child_process'
import process from 'node:process'

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    encoding: 'utf8',
    stdio: 'inherit',
    ...options,
  })

  if (result.error)
    throw result.error

  if (result.status !== 0)
    process.exit(result.status ?? 1)
}

function capture(command, args) {
  const result = spawnSync(command, args, { encoding: 'utf8' })

  if (result.error)
    throw result.error

  if (result.status !== 0)
    process.exit(result.status ?? 1)

  return result.stdout.trim()
}

function printHelp() {
  console.log(`Sync a branch from upstream without discarding internal commits.

Usage:
  node scripts/sync-from-upstream.mjs [branch]
  pnpm sync:upstream -- [branch]

Examples:
  pnpm sync:upstream
  pnpm sync:upstream -- reactive

Flow:
  1. fetch upstream and origin branches (skip tags)
  2. checkout <branch>
  3. fast-forward local branch from origin/<branch>
  4. merge upstream/<branch> into local branch
  5. push local branch to origin/<branch>

Tags are intentionally skipped because this workflow only syncs branch history.
If upstream retags an existing release, fetching tags here can fail with
"would clobber existing tag" and block the branch sync.

If merge conflicts happen, resolve them manually and then run:
  git add <files>
  git merge --continue
  git push origin <branch>`)
}

const args = process.argv.slice(2)

if (args.includes('-h') || args.includes('--help')) {
  printHelp()
  process.exit(0)
}

const branch = args[0] || 'main'
const currentBranch = capture('git', ['rev-parse', '--abbrev-ref', 'HEAD'])
const workingTree = capture('git', ['status', '--porcelain'])

if (workingTree) {
  console.error('Working tree is not clean. Commit or stash changes before syncing.')
  process.exit(1)
}

run('git', ['fetch', 'upstream', '--prune', '--no-tags'])
run('git', ['fetch', 'origin', '--prune', '--no-tags'])
run('git', ['rev-parse', '--verify', `upstream/${branch}`])

if (currentBranch !== branch)
  run('git', ['checkout', branch])

const hasOriginBranch = spawnSync('git', ['rev-parse', '--verify', `origin/${branch}`], {
  encoding: 'utf8',
})

if (hasOriginBranch.error)
  throw hasOriginBranch.error

if (hasOriginBranch.status === 0)
  run('git', ['merge', '--ff-only', `origin/${branch}`])

const mergeResult = spawnSync('git', ['merge', '--no-edit', `upstream/${branch}`], {
  encoding: 'utf8',
  stdio: 'inherit',
})

if (mergeResult.error)
  throw mergeResult.error

if (mergeResult.status !== 0) {
  console.error(`Merge failed. Resolve conflicts, then run 'git merge --continue' and 'git push origin ${branch}'.`)
  process.exit(mergeResult.status ?? 1)
}

run('git', ['push', 'origin', branch])

console.log(`Synced ${branch} from upstream/${branch} and pushed to origin/${branch}`)
