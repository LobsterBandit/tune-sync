module.exports = {
  extends: ['@spotify', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
