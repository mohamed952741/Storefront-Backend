module.exports = {
    env: {
      es2021: true,
      node: true,
      jasmine: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
      'prettier/prettier': 0,
      'no-console': 'off',
      '@typescript-eslint/no-var-requires': 0,
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      'prefer-const': 0,
      "no-switch-case-fall-through":0
    },
  };