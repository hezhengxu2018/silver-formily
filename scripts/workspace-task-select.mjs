import { spawn } from 'node:child_process'
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { consola } from 'consola'
import prompts from 'prompts'

const currentDir = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(currentDir, '..')
const workspaceDirs = ['apps', 'packages']

async function getTaskWorkspaces(task) {
  const workspaces = []

  for (const dir of workspaceDirs) {
    const baseDir = path.join(rootDir, dir)
    const entries = await readdir(baseDir, { withFileTypes: true })

    for (const entry of entries) {
      if (!entry.isDirectory())
        continue

      const relativePath = path.join(dir, entry.name)
      const packageJsonPath = path.join(baseDir, entry.name, 'package.json')

      try {
        const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'))
        const command = packageJson.scripts?.[task]
        if (!command)
          continue

        const taskConfig = packageJson.silverFormily?.tasks?.[task] ?? {}

        workspaces.push({
          command,
          filterMode: taskConfig.filterMode,
          group: dir,
          name: packageJson.name,
          path: relativePath,
          shortName: entry.name,
        })
      }
      catch {
        continue
      }
    }
  }

  return workspaces.sort((left, right) => left.path.localeCompare(right.path))
}

function getVisibleWorkspaces(workspaces, options) {
  const { isWorkspaceVisible } = options
  if (!isWorkspaceVisible)
    return workspaces

  return workspaces.filter(isWorkspaceVisible)
}

function printHelp(options) {
  const { commandName, helpDescriptionLines, passthroughHelpLine } = options

  consola.box(`用法:
  pnpm ${commandName}
  pnpm ${commandName} -- all
  pnpm ${commandName} -- <workspace-name|workspace-path>
  pnpm ${commandName} -- --list

说明:
${helpDescriptionLines.map(line => `  ${line}`).join('\n')}
  ${passthroughHelpLine}`)
}

function printWorkspaceList(workspaces, options, hiddenWorkspaceCount = 0) {
  const { commandName, task } = options
  const nameWidth = Math.max('name'.length, ...workspaces.map(workspace => workspace.name.length))
  const pathWidth = Math.max('path'.length, ...workspaces.map(workspace => workspace.path.length))

  consola.box(`可用的 ${commandName} workspace（共 ${workspaces.length} 个）`)
  console.log(`  ${'name'.padEnd(nameWidth)}  ${'path'.padEnd(pathWidth)}  command`)
  console.log(`  ${'all'.padEnd(nameWidth)}  ${'全部项目'.padEnd(pathWidth)}  turbo run ${task}`)

  for (const workspace of workspaces) {
    console.log(
      `  ${workspace.name.padEnd(nameWidth)}  ${workspace.path.padEnd(pathWidth)}  ${workspace.command}`,
    )
  }

  if (hiddenWorkspaceCount > 0)
    consola.info(`另有 ${hiddenWorkspaceCount} 个 workspace 已从列表中隐藏，可通过 pnpm ${commandName} -- <workspace-name|workspace-path> 直接运行。`)
}

function resolveSelection(input, workspaces) {
  const normalized = input.trim()
  if (!normalized)
    return undefined
  if (normalized === 'all' || normalized === '--all')
    return { type: 'all' }

  const match = workspaces.find(workspace =>
    workspace.name === normalized
    || workspace.path === normalized
    || workspace.shortName === normalized,
  )

  return match ? { type: 'workspace', workspace: match } : undefined
}

function getTurboArgs(selection, options, extraTurboArgs) {
  const { filterMode, task } = options
  const args = ['exec', 'turbo', 'run', task]

  if (selection?.type === 'workspace') {
    const resolvedFilterMode = selection.workspace.filterMode ?? filterMode
    const filterSuffix = resolvedFilterMode === 'with-dependencies' ? '...' : ''
    args.push(`--filter=${selection.workspace.name}${filterSuffix}`)
  }

  return [...args, ...extraTurboArgs]
}

function formatSelectionLabel(selection) {
  return selection?.type === 'workspace'
    ? `${selection.workspace.path} (${selection.workspace.name})`
    : '全部项目'
}

function runTurbo(selection, options, extraTurboArgs) {
  const { commandName, startActionLabel } = options
  const args = getTurboArgs(selection, options, extraTurboArgs)
  const label = formatSelectionLabel(selection)

  consola.start(`准备${startActionLabel} ${commandName}: ${label}`)
  consola.info(`执行命令: pnpm ${args.join(' ')}`)

  const child = spawn('pnpm', args, {
    cwd: rootDir,
    env: process.env,
    stdio: 'inherit',
  })

  child.on('error', (error) => {
    consola.error(error)
    process.exit(1)
  })

  child.on('exit', (code, signal) => {
    if (signal)
      process.kill(process.pid, signal)
    process.exit(code ?? 0)
  })
}

function normalizeSearchText(value) {
  return value.trim().toLowerCase()
}

function getChoiceScore(query, choice) {
  if (!query)
    return 0

  const title = normalizeSearchText(choice.title)
  const description = normalizeSearchText(choice.description)
  const searchText = choice.searchText

  if (!searchText.includes(query))
    return Number.NEGATIVE_INFINITY

  let score = 0
  const tokens = query.split(/\s+/).filter(Boolean)

  for (const token of tokens) {
    if (title === token)
      score += 160
    else if (title.startsWith(token))
      score += 100
    else if (description.includes(token))
      score += 40
    else if (searchText.includes(token))
      score += 20
    else
      return Number.NEGATIVE_INFINITY
  }

  if (title === query)
    score += 320
  else if (title.startsWith(query))
    score += 200
  else if (description.includes(query))
    score += 60

  return score
}

function createPromptChoices(workspaces, options) {
  const { allChoiceDescription, commandName, task } = options

  return [
    {
      description: allChoiceDescription,
      rank: 0,
      searchText: normalizeSearchText(`all 全部项目 所有 workspace turbo run ${task} ${commandName}`),
      title: '全部项目',
      value: { type: 'all' },
    },
    ...workspaces.map((workspace, index) => ({
      description: `${workspace.name} · ${workspace.command}`,
      rank: index + 1,
      searchText: normalizeSearchText([
        workspace.group,
        workspace.name,
        workspace.path,
        workspace.shortName,
        workspace.command,
      ].join(' ')),
      title: workspace.path,
      value: { type: 'workspace', workspace },
    })),
  ]
}

async function suggestChoices(input, choices) {
  const query = normalizeSearchText(input)

  return choices
    .map(choice => ({
      choice,
      score: getChoiceScore(query, choice),
    }))
    .filter(item => item.score > Number.NEGATIVE_INFINITY)
    .sort((left, right) => right.score - left.score || left.choice.rank - right.choice.rank)
    .map(item => item.choice)
}

async function promptSelection(workspaces, options) {
  const { cancelMessage, introMessage, noMatchesMessage, promptMessage, submitActionLabel } = options
  const choices = createPromptChoices(workspaces, options)

  consola.box(introMessage)

  const { selection } = await prompts({
    choices,
    initial: 0,
    limit: 12,
    message: promptMessage,
    name: 'selection',
    noMatches: noMatchesMessage,
    suggest: suggestChoices,
    type: 'autocomplete',
  }, {
    onCancel: () => {
      consola.info(cancelMessage)
      return false
    },
  })

  if (!selection)
    process.exit(0)

  consola.ready(`${submitActionLabel}: ${formatSelectionLabel(selection)}`)
  return selection
}

function parseCliArgs(rawArgs) {
  const args = rawArgs.filter(arg => arg !== '--')
  const firstArg = args[0]

  if (!firstArg)
    return { extraTurboArgs: [] }

  if (['--help', '-h', '--list'].includes(firstArg))
    return { commandArg: firstArg, extraTurboArgs: args.slice(1) }

  if (firstArg === 'all' || firstArg === '--all' || !firstArg.startsWith('-'))
    return { commandArg: firstArg, extraTurboArgs: args.slice(1) }

  return { extraTurboArgs: args }
}

export async function runWorkspaceTaskSelector(options) {
  const workspaces = await getTaskWorkspaces(options.task)
  const visibleWorkspaces = getVisibleWorkspaces(workspaces, options)
  const { commandArg, extraTurboArgs } = parseCliArgs(process.argv.slice(2))

  if (workspaces.length === 0) {
    consola.error(options.emptyMessage)
    process.exit(1)
  }

  if (commandArg === '--help' || commandArg === '-h') {
    printHelp(options)
    process.exit(0)
  }

  if (commandArg === '--list') {
    printWorkspaceList(visibleWorkspaces, options, workspaces.length - visibleWorkspaces.length)
    process.exit(0)
  }

  if (commandArg) {
    const selection = resolveSelection(commandArg, workspaces)
    if (!selection) {
      consola.error(`未找到可用的 ${options.commandName} workspace: ${commandArg}`)
      printWorkspaceList(visibleWorkspaces, options, workspaces.length - visibleWorkspaces.length)
      process.exit(1)
    }

    runTurbo(selection, options, extraTurboArgs)
    return
  }

  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    consola.info(`未检测到交互终端，默认${options.nonTtyActionLabel}全部项目。`)
    runTurbo({ type: 'all' }, options, extraTurboArgs)
    return
  }

  const selection = await promptSelection(visibleWorkspaces, options)
  runTurbo(selection, options, extraTurboArgs)
}
