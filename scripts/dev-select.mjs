import { runWorkspaceTaskSelector } from './workspace-task-select.mjs'

await runWorkspaceTaskSelector({
  allChoiceDescription: '启动所有声明了 dev 脚本的 workspace',
  cancelMessage: '已取消启动。',
  commandName: 'dev',
  emptyMessage: '未找到声明了 dev 脚本的 workspace。',
  filterMode: 'with-dependencies',
  helpDescriptionLines: [
    '不带参数时会进入可搜索的交互式选择器，默认仅展示 apps 下的文档与应用。',
    '可按 workspace 名称、路径、目录名或 dev 命令输入关键字过滤。',
    '选择单个 workspace 时，默认直接执行该 workspace 的 dev；只有 all 或 Turbo flags 才会走 turbo。',
    '库默认会带上依赖任务，文档站通常只启动自身并在包内处理 dev:deps。',
    '包级 dev 任务仍可通过 pnpm dev -- <workspace-name|workspace-path> 直接运行。',
  ],
  isWorkspaceVisible: workspace => workspace.group === 'apps',
  introMessage: '输入关键字过滤，支持按名称、路径、目录名或 dev 命令搜索。按 Enter 启动，Esc 取消。',
  noMatchesMessage: '未找到匹配项',
  nonTtyActionLabel: '启动',
  passthroughHelpLine: '额外参数会透传给 turbo run dev，例如 pnpm dev -- vue-docs --dry。',
  promptMessage: '选择要启动的模块',
  runSelectedWorkspaceDirectly: true,
  startActionLabel: '启动',
  submitActionLabel: '已选择目标',
  task: 'dev',
})
