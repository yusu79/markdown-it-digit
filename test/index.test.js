"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");
const MarkdownIt = require("markdown-it");

const markdownItDigit = require("../src");

test("プラグイン関数を公開する", () => {
    assert.equal(typeof markdownItDigit, "function");
});

test("markdown-itのプラグインとして登録できる", () => {
    const markdownIt = new MarkdownIt().use(markdownItDigit);

    assert.equal(markdownIt.render("$1000${en}"), "<p>1,000</p>\n");
});
