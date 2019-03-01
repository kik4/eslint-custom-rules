"use strict";

const RuleTester = require("eslint").RuleTester;
const rule = require("../rules/kimahri-not-pass");

const tester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6
  }
});

tester.run("kiomahri-not-pass", rule, {
  valid: [{ code: "1" }, { code: '"召喚士"' }, { code: '"ガード"' }],
  invalid: [
    { code: '"キマリ"', errors: ["キマリは通さない"] },
    { code: 'const a = "「キマリは通さない」"', errors: ["キマリは通さない"] }
  ]
});
