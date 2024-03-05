import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'ts/ban-ts-comment': 'off',
    'ts/prefer-ts-expect-error': 'off',
    'no-console': 'warn',
  },
})
