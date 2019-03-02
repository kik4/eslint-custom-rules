"use strict";

const RuleTester = require("eslint").RuleTester;
const rule = require("../rules/kimahri-not-pass");

const tester = new RuleTester();

tester.run("kiomahri-not-pass", rule, {
  valid: [{ code: "var a = 1;" }, { code: '"召喚士"' }, { code: '"ガード"' }],
  invalid: [{ code: '"キマリ"', errors: ["キマリは通さない"] }]
});
