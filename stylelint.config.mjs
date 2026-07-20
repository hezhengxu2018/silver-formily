export default {
  extends: ['stylelint-config-standard-scss'],
  ignoreFiles: [
    '**/coverage/**',
    '**/dist/**',
    '**/node_modules/**',
  ],
  overrides: [
    {
      customSyntax: 'postcss-html',
      files: ['**/*.vue'],
    },
    {
      customSyntax: 'postcss-scss',
      files: ['**/*.scss'],
    },
  ],
  plugins: ['stylelint-order'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'apply',
          'custom-variant',
          'layer',
          'plugin',
          'reference',
          'source',
          'theme',
          'utility',
          'variant',
        ],
      },
    ],
    'order/properties-alphabetical-order': true,
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'apply',
          'custom-variant',
          'layer',
          'plugin',
          'reference',
          'source',
          'theme',
          'utility',
          'variant',
        ],
      },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep', 'global', 'slotted'],
      },
    ],
  },
}
