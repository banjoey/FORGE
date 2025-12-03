module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  env: {
    node: true,
    es2022: true,
  },
  rules: {
    // TypeScript-specific rules
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_'
    }],
    '@typescript-eslint/no-non-null-assertion': 'warn',

    // General rules
    'no-console': 'off', // Allow console.log for CLI tools
    'prefer-const': 'warn',
    'no-var': 'error',
    'eqeqeq': ['error', 'always'],

    // Security-related rules
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-new-func': 'error',
  },
  ignorePatterns: [
    'node_modules/',
    'dist/',
    '*.js', // Ignore compiled JS files
  ],
  overrides: [
    {
      // Type-aware linting for src files only (tests excluded from tsconfig.json)
      files: ['src/**/*.ts'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
}
