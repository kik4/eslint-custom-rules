const rulesDirPlugin = require("eslint-plugin-rulesdir");
rulesDirPlugin.RULES_DIR = "rules";

module.exports = {
  parserOptions: {
    ecmaVersion: 6
  },
  plugins: ["rulesdir", "kimahri"],
  rules: {
    "rulesdir/same-order-object-keys": ["error", { checkKey: "sameOrder" }],
    "kimahri/not-pass": "error"
  }
};
