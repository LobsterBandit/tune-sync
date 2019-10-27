module.exports = {
  extends: ['@spotify', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  parserOptions: {
    projects: ['./tsconfig.eslint.json', './packages/*/tsconfig.json'],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
  },
};
