import spawn from 'cross-spawn'

export function spawnPnpm(args, options) {
  return spawn('pnpm', args, options)
}

export function spawnPnpmSync(args, options) {
  return spawn.sync('pnpm', args, options)
}
