"use strict";

const formatEnglish = require("./locales/en");
const formatJapanese = require("./locales/jp");

const FORMATTERS = {
    en: formatEnglish,
    jp: formatJapanese
};

function createDigitRenderer(markdownIt) {
    return (tokens, index) => {
        const token = tokens[index];
        const digit = token.meta?.digit;
        const formatter = FORMATTERS[digit?.locale];

        if (formatter === undefined || !/^\d+$/.test(digit.number)) {
            return markdownIt.utils.escapeHtml(token.content);
        }

        return formatter(digit.number);
    };
}

module.exports = createDigitRenderer;
