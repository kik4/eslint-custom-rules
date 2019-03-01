"use strict";

const RuleTester = require("eslint").RuleTester;
const rule = require("../rules/same-order-object-keys");

const tester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6
  }
});

tester.run("same-order-object-keys", rule, {
  valid: [
    {
      code: `
const a = {
  "sameOrder": {
    "a": {
      "1": 'A',
      "2": 'B'
    },
    "b": {
      "1": 'C',
      "2": 'D'
    },
    "c": {
      "1": 'E',
      "2": 'F'
    }
  }
}
    `
    }
  ],
  invalid: [
    {
      code: `
const a = {
  sameOrder: {
    "a": {
      "1": 'A',
      "2": 'B'
    },
    "b": {
      "1": 'C',
      "2": 'D'
    },
    "c": {
      "1": 'E',
      "2": 'F',
      "3": 'G'
    }
  }
}
    `,
      errors: ["違うよ"]
    },
    {
      code: `
const b = {
  sameOrder: {
    a: {
      "1": "A",
      "2": {
        alpha: "hoge",
        beta: "fuga"
      }
    },
    b: {
      "1": "C",
      "2": {
        beta: "fuga",
        alpha: "hoge"
      }
    }
  }
};      
    `,
      errors: ["違うよ"]
    }
  ]
});
