module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // 'no-unused-vars': 'off', //!  Ignore unused vars
    // 'no-unused-vars': 'error', //!  Error unused vars
    'no-unused-vars': 'warn', //!  Warn unused vars
    'react-hooks/exhaustive-deps': 'warn', //!  Warn if useEffect() dependencies are missing
    'react/prop-types': 'off', //! Disable prop-types checking

  },
}
