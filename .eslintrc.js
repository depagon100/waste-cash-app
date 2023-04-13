module.exports = {
  extends: ['@react-native-community'],
  plugins: ['simple-import-sort', 'sort-keys-fix'],
  root: true,
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    'no-unused-vars': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        printWidth: 80,
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'all',
        useTabs: false,
      },
    ],
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        ignoreCase: false,
        shorthandFirst: true,
      },
    ],
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    'sort-keys-fix/sort-keys-fix': 'error',
  },
};
