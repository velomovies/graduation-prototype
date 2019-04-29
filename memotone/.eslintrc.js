module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/essential'
  ],
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {"no-console": "off", "comma-dangle": ["error", "always-multiline"]}
}
