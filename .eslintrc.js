const rulesDirPlugin = require("eslint-plugin-rulesdir");
rulesDirPlugin.RULES_DIR = "dist";

module.exports = {
  parserOptions: {
    ecmaVersion: 8
  },
  plugins: ["rulesdir"],
  rules: {
    "rulesdir/same-order-object-keys": ["error", { checkKey: "sameOrder" }]
  }
};
