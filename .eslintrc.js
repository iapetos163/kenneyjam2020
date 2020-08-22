module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'standard-with-typescript'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  parserOptions: {
    project: ['tsconfig.json'],
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    "@typescript-eslint/space-before-function-paren": "off",
    "@typescript-eslint/semi": ["warn", "always"]
  }
}