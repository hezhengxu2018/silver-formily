import antfu from '@antfu/eslint-config'
import { baseOptions } from '../../eslint.config.js'

export default antfu({
  ...baseOptions,
  rules: {
    ...baseOptions.rules,
    'no-console': 'off',
  },
})
