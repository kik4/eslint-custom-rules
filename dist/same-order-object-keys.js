"use strict";
const getPropKeyValueOrName = (prop) => {
    switch (prop.key.type) {
        case "Identifier":
            return prop.key.name;
        case "Literal":
            return typeof prop.key.value === "string" ? prop.key.value : prop.type;
        default:
            return prop.type;
    }
};
const checkSamePropKeysRecursive = (context, src, dst) => {
    if (src.type !== dst.type) {
        context.report({
            node: dst,
            message: "違うよ"
        });
        return;
    }
    if (src.type === "ObjectExpression" && dst.type === "ObjectExpression") {
        if (!isSamePropKeys(src, dst)) {
            context.report({
                node: dst,
                message: "違うよ"
            });
            return;
        }
        for (let j = 0; j < src.properties.length; j++) {
            checkSamePropKeysRecursive(context, src.properties[j].value, dst.properties[j].value);
        }
    }
    if (src.type === "ArrayExpression" && dst.type === "ArrayExpression") {
        if (src.elements.length !== dst.elements.length) {
            context.report({
                node: dst,
                message: "違うよ"
            });
            return;
        }
        for (let j = 0; j < src.elements.length; j++) {
            const srcElement = src.elements[j], dstElement = dst.elements[j];
            if (srcElement.type !== dstElement.type) {
                context.report({
                    node: dstElement,
                    message: "違うよ"
                });
                return;
            }
            if (srcElement.type === "ObjectExpression" &&
                dstElement.type === "ObjectExpression") {
                checkSamePropKeysRecursive(context, srcElement, dstElement);
            }
        }
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
const rule = {
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
    create(context) {
        return {
            ObjectExpression: (node) => {
                const expression = node;
                expression.properties.forEach(prop => {
                    // 開始キーを待つ
                    if (getPropKeyValueOrName(prop) !== context.options[0].checkKey)
                        return;
                    // 開始キーの下は object である
                    if (prop.value.type !== "ObjectExpression")
                        return;
                    const childProps = prop.value.properties;
                    // プロパティは 2 以上 である
                    if (childProps.length <= 1)
                        return;
                    // 1 つ目のプロパティと2つ目以降を順番に比較していく
                    const src = childProps[0].value;
                    for (let i = 1; i < childProps.length; i++) {
                        const dst = childProps[i].value;
                        checkSamePropKeysRecursive(context, src, dst);
                    }
                });
            }
        };
    }
};
module.exports = rule;
