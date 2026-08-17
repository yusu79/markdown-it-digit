"use strict";

const createEastAsianFormatter = require("./east-asian");

const JAPANESE_UNITS = [
    "万",
    "億",
    "兆",
    "京",
    "垓",
    "𥝱",
    "穣",
    "溝",
    "澗",
    "正",
    "載",
    "極",
    "恒河沙",
    "阿僧祇",
    "那由他",
    "不可思議",
    "無量大数"
];

const formatJapanese = createEastAsianFormatter(JAPANESE_UNITS);

module.exports = formatJapanese;
