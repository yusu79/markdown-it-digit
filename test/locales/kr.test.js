"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const formatKorean = require("../../src/locales/kr");

const KOREAN_UNITS = [
    "만", "억", "조", "경", "해", "자", "양", "구", "간", "정", "재", "극",
    "항하사", "아승기", "나유타", "불가사의", "무량대수"
];

test("4桁以下の整数を変更しない", () => {
    assert.equal(formatKorean("0"), "0");
    assert.equal(formatKorean("1234"), "1234");
});

test("右端から4桁ごとに韓国語単位を挿入する", () => {
    assert.equal(formatKorean("10000"), "1<sub>만</sub>0000");
    assert.equal(
        formatKorean("1234567890123"),
        "1<sub>조</sub>2345<sub>억</sub>6789<sub>만</sub>0123"
    );
});

test("ゼロだけの中間グループを省略しない", () => {
    assert.equal(
        formatKorean("1000000000001"),
        "1<sub>조</sub>0000<sub>억</sub>0000<sub>만</sub>0001"
    );
});

test("10^48から10^68までの境界をハングル単位で出力する", () => {
    const cases = [
        [48, "극"],
        [52, "항하사"],
        [64, "불가사의"],
        [68, "무량대수"]
    ];

    for (const [exponent, unit] of cases) {
        assert.equal(
            formatKorean("1" + "0".repeat(exponent)).startsWith(`1<sub>${unit}</sub>`),
            true
        );
    }
});

test("만から무량대수までの全単位を正しい順序で挿入する", () => {
    const output = formatKorean("1" + "0000".repeat(17));
    const actualUnits = [...output.matchAll(/<sub>([^<]+)<\/sub>/g)].map(
        (match) => match[1]
    );

    assert.deepEqual(actualUnits, [...KOREAN_UNITS].reverse());
});

test("무량대수を超える上位桁を単位なしで保持する", () => {
    const number = "1" + "0000".repeat(18);
    const output = formatKorean(number);

    assert.equal(output.startsWith("10000<sub>무량대수</sub>"), true);
    assert.equal(output.replace(/<sub>[^<]+<\/sub>/g, ""), number);
});
