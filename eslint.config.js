import antfu from '@antfu/eslint-config'

export const baseOptions = {
  vue: true,
  typescript: true,
  gitignore: true,
  rules: {
    'vue/one-component-per-file': 'off',
    'ts/consistent-type-definitions': 'off',
  },
  formatters: {
    css: true,
    html: true,
    markdown: 'prettier',
  },
}

export default antfu(baseOptions)
