import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: true,
  gitignore: true,
  ignores: ['.vitepress/cache/**', '.vitepress/dist/**', '**/*.d.ts'],
  rules: {
    'vue/one-component-per-file': 'off',
  },
})
