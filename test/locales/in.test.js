"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const formatIndian = require("../../src/locales/in");

test("右端を3桁、その左側を2桁ごとにカンマで区切る", () => {
    assert.equal(formatIndian("1000"), "1,000");
    assert.equal(formatIndian("10000"), "10,000");
    assert.equal(formatIndian("100000"), "1,00,000");
    assert.equal(formatIndian("1000000"), "10,00,000");
    assert.equal(formatIndian("10000000"), "1,00,00,000");
    assert.equal(formatIndian("123456789"), "12,34,56,789");
});

test("3桁以下の整数を変更しない", () => {
    assert.equal(formatIndian("0"), "0");
    assert.equal(formatIndian("12"), "12");
    assert.equal(formatIndian("999"), "999");
});

test("非常に大きな整数を桁落ちさせずに区切る", () => {
    assert.equal(
        formatIndian("12345678901234567890"),
        "1,23,45,67,89,01,23,45,67,890"
    );
});
