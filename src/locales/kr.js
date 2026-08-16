"use strict";

const createEastAsianFormatter = require("./east-asian");

const KOREAN_UNITS = [
    "만",
    "억",
    "조",
    "경",
    "해",
    "자",
    "양",
    "구",
    "간",
    "정",
    "재",
    "극",
    "항하사",
    "아승기",
    "나유타",
    "불가사의",
    "무량대수"
];

const formatKorean = createEastAsianFormatter(KOREAN_UNITS);

module.exports = formatKorean;
