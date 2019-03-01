const rulesDirPlugin = require("eslint-plugin-rulesdir");
rulesDirPlugin.RULES_DIR = "rules";

module.exports = {
  parserOptions: {
    ecmaVersion: 6
  },
  plugins: ["rulesdir"],
  rules: {
    "rulesdir/kimahri-not-pass": "error",
    "rulesdir/same-order-object-keys": ["error", { checkKey: "sameOrder" }]
  }
};
