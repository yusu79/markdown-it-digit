"use strict";

const createEastAsianFormatter = require("./east-asian");

const TAIWANESE_UNITS = [
    "萬",
    "億",
    "兆",
    "京",
    "垓",
    "秭",
    "穰",
    "溝",
    "澗",
    "正",
    "載",
    "極",
    "恆河沙",
    "阿僧祇",
    "那由他",
    "不可思議",
    "無量大數"
];

const formatTaiwanese = createEastAsianFormatter(TAIWANESE_UNITS);

module.exports = formatTaiwanese;
