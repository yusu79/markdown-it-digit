"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const formatEnglish = require("../../src/locales/en");

test("3桁ごとにカンマで区切る", () => {
    assert.equal(formatEnglish("1000"), "1,000");
    assert.equal(formatEnglish("10000"), "10,000");
    assert.equal(formatEnglish("100000"), "100,000");
    assert.equal(formatEnglish("1000000"), "1,000,000");
    assert.equal(formatEnglish("1234567"), "1,234,567");
});

test("3桁以下の整数を変更しない", () => {
    assert.equal(formatEnglish("0"), "0");
    assert.equal(formatEnglish("12"), "12");
    assert.equal(formatEnglish("999"), "999");
});

test("非常に大きな整数を桁落ちさせずに区切る", () => {
    assert.equal(
        formatEnglish("12345678901234567890"),
        "12,345,678,901,234,567,890"
    );
});
