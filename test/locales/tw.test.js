"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const formatTaiwanese = require("../../src/locales/tw");

const TAIWANESE_UNITS = [
    "萬", "億", "兆", "京", "垓", "秭", "穰", "溝", "澗", "正", "載",
    "極", "恆河沙", "阿僧祇", "那由他", "不可思議", "無量大數"
];

test("4桁以下の整数を変更しない", () => {
    assert.equal(formatTaiwanese("0"), "0");
    assert.equal(formatTaiwanese("1234"), "1234");
});

test("右端から4桁ごとに台湾の繁体字単位を挿入する", () => {
    assert.equal(formatTaiwanese("10000"), "1<sub>萬</sub>0000");
    assert.equal(
        formatTaiwanese("1234567890123"),
        "1<sub>兆</sub>2345<sub>億</sub>6789<sub>萬</sub>0123"
    );
});

test("ゼロだけの中間グループを省略しない", () => {
    assert.equal(
        formatTaiwanese("1000000000001"),
        "1<sub>兆</sub>0000<sub>億</sub>0000<sub>萬</sub>0001"
    );
});

test("10^48から10^68までの境界を繁体字単位で出力する", () => {
    const cases = [
        [48, "極"],
        [52, "恆河沙"],
        [64, "不可思議"],
        [68, "無量大數"]
    ];

    for (const [exponent, unit] of cases) {
        assert.equal(
            formatTaiwanese("1" + "0".repeat(exponent)).startsWith(`1<sub>${unit}</sub>`),
            true
        );
    }
});

test("萬から無量大數までの全単位を正しい順序で挿入する", () => {
    const output = formatTaiwanese("1" + "0000".repeat(17));
    const actualUnits = [...output.matchAll(/<sub>([^<]+)<\/sub>/g)].map(
        (match) => match[1]
    );

    assert.deepEqual(actualUnits, [...TAIWANESE_UNITS].reverse());
});

test("無量大數を超える上位桁を単位なしで保持する", () => {
    const number = "1" + "0000".repeat(18);
    const output = formatTaiwanese(number);

    assert.equal(output.startsWith("10000<sub>無量大數</sub>"), true);
    assert.equal(output.replace(/<sub>[^<]+<\/sub>/g, ""), number);
});
