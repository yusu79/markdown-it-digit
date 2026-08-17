"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const formatJapanese = require("../../src/locales/jp");

test("4桁以下の整数を変更しない", () => {
    assert.equal(formatJapanese("0"), "0");
    assert.equal(formatJapanese("1234"), "1234");
});

test("右端から4桁ごとに日本語単位を挿入する", () => {
    assert.equal(formatJapanese("10000"), "1<sub>万</sub>0000");
    assert.equal(formatJapanese("1000000"), "100<sub>万</sub>0000");
    assert.equal(
        formatJapanese("123456789"),
        "1<sub>億</sub>2345<sub>万</sub>6789"
    );
    assert.equal(
        formatJapanese("1234567890123"),
        "1<sub>兆</sub>2345<sub>億</sub>6789<sub>万</sub>0123"
    );
});

test("万から無量大数までの全単位を挿入する", () => {
    const number = "1" + "0000".repeat(17);
    const expected = [
        "1<sub>無量大数</sub>",
        "0000<sub>不可思議</sub>",
        "0000<sub>那由他</sub>",
        "0000<sub>阿僧祇</sub>",
        "0000<sub>恒河沙</sub>",
        "0000<sub>極</sub>",
        "0000<sub>載</sub>",
        "0000<sub>正</sub>",
        "0000<sub>澗</sub>",
        "0000<sub>溝</sub>",
        "0000<sub>穣</sub>",
        "0000<sub>𥝱</sub>",
        "0000<sub>垓</sub>",
        "0000<sub>京</sub>",
        "0000<sub>兆</sub>",
        "0000<sub>億</sub>",
        "0000<sub>万</sub>",
        "0000"
    ].join("");

    assert.equal(formatJapanese(number), expected);
});

test("無量大数を超える上位桁を単位なしで保持する", () => {
    const number = "1" + "0000".repeat(18);
    const expectedPrefix = "10000<sub>無量大数</sub>";

    assert.equal(formatJapanese(number).startsWith(expectedPrefix), true);
    assert.equal(
        formatJapanese(number).replace(/<sub>[^<]+<\/sub>/g, ""),
        number
    );
});
