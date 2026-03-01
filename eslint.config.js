import antfu from '@antfu/eslint-config'

export const baseOptions = {
  vue: true,
  typescript: true,
  gitignore: true,
  rules: {
    'vue/one-component-per-file': 'off',
    'ts/consistent-type-definitions': 'off',
    'no-console': ['error', { allow: ['warn', 'error', 'log'] }],
    'style/no-multiple-empty-lines': 'off',
  },
  formatters: {
    css: true,
    html: true,
    markdown: 'prettier',
  },
}

export default antfu(baseOptions)
