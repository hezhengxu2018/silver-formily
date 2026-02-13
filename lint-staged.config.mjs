const quote = (file) => JSON.stringify(file)

const eslintTask = (configPath) => (files) => {
  const targetsList = files.filter(file => !file.endsWith('.d.ts'))

  if (!targetsList.length)
    return 'echo "No ESLint targets"'

  const targets = targetsList.map(quote).join(' ')
  return `pnpm exec eslint --config ${configPath} --max-warnings=0 --fix ${targets}`
}

const prettierTask = (files) => {
  if (!files.length)
    return 'echo "No Prettier targets"'

  const targets = files.map(quote).join(' ')
  return `pnpm exec prettier --write ${targets}`
}

export default {
  // Library source + demos colocated with @silver-formily/vue
  'packages/vue/**/*.{js,ts,jsx,tsx,vue}': eslintTask('packages/vue/eslint.config.js'),

  // Reactive core package
  'packages/reactive-vue/**/*.{js,ts,jsx,tsx}': eslintTask('packages/reactive-vue/eslint.config.js'),

  // Shared docs tooling package
  'packages/docs-toolkit/**/*.{js,ts,jsx,tsx}': eslintTask('packages/docs-toolkit/eslint.config.js'),

  // Vue demos & docs live under apps but reuse the shared antfu config
  'apps/vue-docs/**/*.{js,ts,jsx,tsx,vue}': eslintTask('apps/vue-docs/eslint.config.js'),

  // Reactive Vue docs lint their demos via a local config as well
  'apps/reactive-vue-docs/**/*.{js,ts,jsx,tsx,vue}': eslintTask('apps/reactive-vue-docs/eslint.config.js'),

  // Markdown/config/content formatting across the whole repo
  '**/*.{md,mdx,json,yml,yaml,html,css,scss}': prettierTask,
}
