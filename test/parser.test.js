"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const parseDigitSyntax = require("../src/parser");

test("整数とロケールを解析する", () => {
    assert.deepEqual(parseDigitSyntax("$1000000${en}"), {
        raw: "$1000000${en}",
        number: "1000000",
        locale: "en",
        length: 13
    });
});

test("地域を含むロケールを解析する", () => {
    assert.deepEqual(parseDigitSyntax("$1000000${en-US}"), {
        raw: "$1000000${en-US}",
        number: "1000000",
        locale: "en-US",
        length: 16
    });
});

test("未対応ロケールも構文として解析する", () => {
    const result = parseDigitSyntax("$1000000${unknown}");

    assert.equal(result.locale, "unknown");
});

test("非常に大きな整数を文字列のまま保持する", () => {
    const number = "1" + "0".repeat(100);
    const result = parseDigitSyntax(`$${number}\${jp}`);

    assert.equal(result.number, number);
});

test("指定した位置から解析する", () => {
    const source = "price: $1000${en} yen";
    const start = source.indexOf("$");

    assert.deepEqual(parseDigitSyntax(source, start), {
        raw: "$1000${en}",
        number: "1000",
        locale: "en",
        length: 10
    });
});

test("専用記法の直後にある文字を消費しない", () => {
    const result = parseDigitSyntax("$1000${en}yen");

    assert.equal(result.raw, "$1000${en}");
    assert.equal(result.length, 10);
});

test("不正な構文を解析しない", () => {
    const invalidSources = [
        "$${en}",
        "$abc${en}",
        "$1000000$",
        "$1000000{}",
        "$1000000${}",
        "$1000000${en_US}",
        "\\$1000000${en}"
    ];

    for (const source of invalidSources) {
        assert.equal(parseDigitSyntax(source), null, source);
    }
});

test("無効な入力または開始位置を解析しない", () => {
    assert.equal(parseDigitSyntax(null), null);
    assert.equal(parseDigitSyntax("$1000${en}", -1), null);
    assert.equal(parseDigitSyntax("$1000${en}", 1.5), null);
    assert.equal(parseDigitSyntax("$1000${en}", 100), null);
});
