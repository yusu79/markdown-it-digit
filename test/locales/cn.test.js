"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const formatChinese = require("../../src/locales/cn");

const CHINESE_UNITS = [
    "万", "亿", "兆", "京", "垓", "秭", "穰", "沟", "涧", "正", "载",
    "极", "恒河沙", "阿僧祇", "那由他", "不可思议", "无量大数"
];

test("4桁以下の整数を変更しない", () => {
    assert.equal(formatChinese("0"), "0");
    assert.equal(formatChinese("1234"), "1234");
});

test("右端から4桁ごとに中国語単位を挿入する", () => {
    assert.equal(formatChinese("10000"), "1<sub>万</sub>0000");
    assert.equal(
        formatChinese("1234567890123"),
        "1<sub>兆</sub>2345<sub>亿</sub>6789<sub>万</sub>0123"
    );
});

test("ゼロだけの中間グループを省略しない", () => {
    assert.equal(
        formatChinese("1000000000001"),
        "1<sub>兆</sub>0000<sub>亿</sub>0000<sub>万</sub>0001"
    );
});

test("10^48から10^68までの境界を簡体字単位で出力する", () => {
    const cases = [
        [48, "极"],
        [52, "恒河沙"],
        [64, "不可思议"],
        [68, "无量大数"]
    ];

    for (const [exponent, unit] of cases) {
        assert.equal(
            formatChinese("1" + "0".repeat(exponent)).startsWith(`1<sub>${unit}</sub>`),
            true
        );
    }
});

test("万から无量大数までの全単位を正しい順序で挿入する", () => {
    const output = formatChinese("1" + "0000".repeat(17));
    const actualUnits = [...output.matchAll(/<sub>([^<]+)<\/sub>/g)].map(
        (match) => match[1]
    );

    assert.deepEqual(actualUnits, [...CHINESE_UNITS].reverse());
});

test("无量大数を超える上位桁を単位なしで保持する", () => {
    const number = "1" + "0000".repeat(18);
    const output = formatChinese(number);

    assert.equal(output.startsWith("10000<sub>无量大数</sub>"), true);
    assert.equal(output.replace(/<sub>[^<]+<\/sub>/g, ""), number);
});
