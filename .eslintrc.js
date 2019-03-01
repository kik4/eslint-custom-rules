const rulesDirPlugin = require('eslint-plugin-rulesdir');
rulesDirPlugin.RULES_DIR = 'rules';

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  plugins: [
    'rulesdir'
  ],
  rules: { "rulesdir/kimahri-not-pass": "error" }
};
