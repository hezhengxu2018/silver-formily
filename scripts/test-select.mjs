import { runWorkspaceTaskSelector } from './workspace-task-select.mjs'

await runWorkspaceTaskSelector({
  allChoiceDescription: '运行所有声明了 test 脚本的 workspace',
  cancelMessage: '已取消运行测试。',
  commandName: 'test',
  emptyMessage: '未找到声明了 test 脚本的 workspace。',
  filterMode: 'workspace-only',
  helpDescriptionLines: [
    '不带参数时会进入可搜索的交互式选择器。',
    '可按 workspace 名称、路径、目录名或 test 命令输入关键字过滤。',
    '选择单个 workspace 时，默认直接执行该 workspace 的 test；只有 all 或 Turbo flags 才会走 turbo。',
    '根据 turbo.json 中的 dependsOn 配置，test 前会先执行依赖链上的 build。',
  ],
  introMessage: '输入关键字过滤，支持按名称、路径、目录名或 test 命令搜索。按 Enter 运行，Esc 取消。',
  noMatchesMessage: '未找到匹配项',
  nonTtyActionLabel: '运行',
  passthroughHelpLine: '单个 workspace 的额外参数会透传给对应 test 脚本，例如 pnpm test -- @silver-formily/vant -- src/functional-popup/__test__/index.test.tsx；Turbo 参数仍可通过 pnpm test -- all --dry 传入。',
  promptMessage: '选择要运行测试的模块',
  runSelectedWorkspaceDirectly: true,
  startActionLabel: '运行',
  submitActionLabel: '已选择测试目标',
  task: 'test',
})
