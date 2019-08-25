module.exports = {
  extends: ['@spotify', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  parserOptions: {
    projects: './packages/**/tsconfig.json',
    tsconfigRootDir: '',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
