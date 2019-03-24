"use strict";

const RuleTester = require("eslint").RuleTester;
const rule = require("../dist/same-order-object-keys");

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
    `,
      options: [{ checkKey: "sameOrder" }]
    },
    {
      code: `
      const d = {
        sameOrder: {
          a: {
            "1": "A",
            "2": [
              "a",
              {
                alpha: "hoge",
                beta: "fuga",
                gamma: {
                  alpha: "hoge",
                  beta: "fuga"
                }
              },
              "c"
            ]
          },
          b: {
            "1": "A",
            "2": [
              "a",
              {
                alpha: "hoge",
                beta: "fuga",
                gamma: {
                  alpha: "hoge",
                  beta: "fuga"
                }
              },
              "c"
            ]
          }
        }
      };
      `,
      options: [{ checkKey: "sameOrder" }]
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
      options: [{ checkKey: "sameOrder" }],
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
      options: [{ checkKey: "sameOrder" }],
      errors: ["違うよ"]
    },
    {
      code: `
      const d = {
        sameOrder: {
          a: {
            "1": "A",
            "2": [
              "a",
              {
                alpha: "hoge",
                beta: "fuga",
                gamma: {
                  alpha: "hoge",
                  beta: "fuga"
                }
              },
              "c"
            ]
          },
          b: {
            "1": "A",
            "2": [
              "a",
              {
                alpha: "hoge",
                beta: "fuga",
                gamma: {
                  beta: "fuga"
                }
              },
              "c"
            ]
          }
        }
      };
      `,
      options: [{ checkKey: "sameOrder" }],
      errors: ["違うよ"]
    }
  ]
});
