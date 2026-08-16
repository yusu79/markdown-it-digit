"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const createEastAsianFormatter = require("../../src/locales/east-asian");

const formatEastAsian = createEastAsianFormatter(["unit4", "unit8", "unit12"]);

test("4桁以下の整数を変更しない", () => {
    assert.equal(formatEastAsian("0"), "0");
    assert.equal(formatEastAsian("1234"), "1234");
});

test("右端から4桁ごとに対応する単位を挿入する", () => {
    assert.equal(formatEastAsian("10000"), "1<sub>unit4</sub>0000");
    assert.equal(
        formatEastAsian("1234567890123"),
        "1<sub>unit12</sub>2345<sub>unit8</sub>6789<sub>unit4</sub>0123"
    );
});

test("ゼロだけの中間グループも省略しない", () => {
    assert.equal(
        formatEastAsian("1000000000001"),
        "1<sub>unit12</sub>0000<sub>unit8</sub>0000<sub>unit4</sub>0001"
    );
});

test("最大単位を超える上位桁を単位なしで保持する", () => {
    const number = "1" + "0000".repeat(4);

    assert.equal(
        formatEastAsian(number),
        "10000<sub>unit12</sub>0000<sub>unit8</sub>0000<sub>unit4</sub>0000"
    );
});
