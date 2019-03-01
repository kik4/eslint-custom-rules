"use strict";

const getPropKeyValueOrName = prop => prop.key.value || prop.key.name;

const checkSamePropKeysRecursive = (context, src, dst) => {
  if (src.type !== "ObjectExpression" && dst.type !== "ObjectExpression") {
    return;
  }
  if (src.type === dst.type) {
    if (!isSamePropKeys(src, dst)) {
      context.report({
        node: dst,
        message: "違うよ"
      });
    } else {
      for (let j = 0; j < src.properties.length; j++) {
        checkSamePropKeysRecursive(
          context,
          src.properties[j].value,
          dst.properties[j].value
        );
      }
    }
  } else {
    context.report({
      node: dst,
      message: "違うよ"
    });
  }
};

const isSamePropKeys = (src, dst) => {
  if (src.properties.length !== dst.properties.length) {
    return false;
  }

  const srcKeys = src.properties.map(getPropKeyValueOrName);
  const dstKeys = dst.properties.map(getPropKeyValueOrName);
  if (srcKeys.toString() !== dstKeys.toString()) {
    return false;
  }

  return true;
};

module.exports = {
  meta: {
    schema: [] // no options
  },
  create: function(context) {
    return {
      ObjectExpression: function(node) {
        node.properties.forEach(prop => {
          if (getPropKeyValueOrName(prop) !== "sameOrder") return;
          if (prop.value.type !== "ObjectExpression") return;

          const props = prop.value.properties;
          if (props.length <= 1) return;

          const src = props[0].value;
          for (let i = 1; i < props.length; i++) {
            const dst = props[i].value;
            checkSamePropKeysRecursive(context, src, dst);
          }
        });
      }
    };
  }
};
