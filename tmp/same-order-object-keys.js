"use strict";

const a = {
  sameOrder: {
    a: {
      "1": "A",
      "2": "B"
    },
    b: {
      "1": "C",
      "3": "X",
      "2": "D"
    },
    c: {
      "1": "E",
      "2": "F"
    }
  }
};

const b = {
  sameOrder: {
    a: {
      "1": "A",
      "2": {
        alpha: "hoge",
        beta: "fuga",
        gamma: {
          alpha: "hoge",
          beta: "fuga"
        }
      },
      "3": {
        alpha: {
          alpha: "hoge"
        }
      }
    },
    b: {
      "1": "C",
      "2": {
        alpha: "hoge",
        beta: "fuga",
        gamma: "hoge"
      },
      "3": "D"
    }
  }
};

const c = {
  sameOrder: {
    a: {
      "1": "A",
      "2": {
        alpha: "hoge",
        beta: "fuga",
        gamma: {
          alpha: "hoge",
          beta: "fuga"
        }
      }
    },
    b: "hage"
  }
};
