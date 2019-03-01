"use strict";

const getPropKeyValueOrName = prop => prop.key.value || prop.key.name;

const checkSamePropKeysRecursive = (context, src, dst) => {
  if (src.type !== "ObjectExpression" && dst.type !== "ObjectExpression") {
    return;
  }

  if (src.type !== dst.type || !isSamePropKeys(src, dst)) {
    context.report({
      node: dst,
      message: "違うよ"
    });
    return;
  }

  for (let j = 0; j < src.properties.length; j++) {
    checkSamePropKeysRecursive(
      context,
      src.properties[j].value,
      dst.properties[j].value
    );
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
    schema: [
      {
        type: "object",
        properties: {
          checkKey: {
            type: "string"
          }
        },
        required: ["checkKey"],
        additionalProperties: false
      }
    ]
  },
  create: function(context) {
    return {
      ObjectExpression: function(node) {
        node.properties.forEach(prop => {
          if (getPropKeyValueOrName(prop) !== context.options[0].checkKey)
            return;
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
