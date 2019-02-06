module.exports = {
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  extends: [
    'react-app',
    'prettier',
  ],
  plugins: [
    'prettier',
  ],
  rules: {
    'prettier/prettier': 'error'
  }
};
