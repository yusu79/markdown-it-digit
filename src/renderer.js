"use strict";

const formatChinese = require("./locales/cn");
const formatEnglish = require("./locales/en");
const formatIndian = require("./locales/in");
const formatJapanese = require("./locales/jp");
const formatKorean = require("./locales/kr");
const formatTaiwanese = require("./locales/tw");

const FORMATTERS = {
    cn: formatChinese,
    en: formatEnglish,
    in: formatIndian,
    jp: formatJapanese,
    kr: formatKorean,
    tw: formatTaiwanese
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
