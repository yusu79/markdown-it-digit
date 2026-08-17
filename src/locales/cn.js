"use strict";

const createEastAsianFormatter = require("./east-asian");

const CHINESE_UNITS = [
    "万",
    "亿",
    "兆",
    "京",
    "垓",
    "秭",
    "穰",
    "沟",
    "涧",
    "正",
    "载",
    "极",
    "恒河沙",
    "阿僧祇",
    "那由他",
    "不可思议",
    "无量大数"
];

const formatChinese = createEastAsianFormatter(CHINESE_UNITS);

module.exports = formatChinese;
