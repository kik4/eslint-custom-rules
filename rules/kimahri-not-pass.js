"use strict";

// ルール定義。
module.exports = function(context) {
  return {
    Literal: function(node) {
      if (typeof (node.value) == "string" && node.value.indexOf("キマリ") !== -1) {
        context.report({ node: node, message: 'キマリは通さない' });
      }
    }
  };
};

// ルールのオプション定義。今回は使わない。
module.exports.schema = [];
