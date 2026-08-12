"use strict";

const parseDigitSyntax = require("./parser");
const createDigitRenderer = require("./renderer");

function isInsideUrl(source, position) {
    const prefix = source.slice(0, position);

    return /(?:^|[\s(<[])(?:[a-z][a-z0-9+.-]*:\/\/|www\.)[^\s<>]*$/i.test(prefix);
}

function isInsideHtmlTag(source, position) {
    const linePrefix = source.slice(0, position).split("\n").at(-1);
    const tagStart = linePrefix.lastIndexOf("<");
    const tagEnd = linePrefix.lastIndexOf(">");

    if (tagStart <= tagEnd) {
        return false;
    }

    return /^<\/?[A-Za-z][^<>]*$/.test(linePrefix.slice(tagStart));
}

function digitRule(state, silent) {
    const parsed = parseDigitSyntax(state.src, state.pos);

    if (
        parsed === null ||
        isInsideUrl(state.src, state.pos) ||
        isInsideHtmlTag(state.src, state.pos)
    ) {
        return false;
    }

    if (!silent) {
        const token = state.push("digit", "", 0);

        token.content = parsed.raw;
        token.meta = {
            digit: {
                raw: parsed.raw,
                number: parsed.number,
                locale: parsed.locale
            }
        };
    }

    state.pos += parsed.length;
    return true;
}

function markdownItDigit(markdownIt) {
    markdownIt.inline.ruler.before("text", "digit", digitRule);
    markdownIt.renderer.rules.digit = createDigitRenderer(markdownIt);
}

module.exports = markdownItDigit;
