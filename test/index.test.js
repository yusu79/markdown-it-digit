"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");
const MarkdownIt = require("markdown-it");

const markdownItDigit = require("markdown-it-digit");

test("プラグイン関数を公開する", () => {
    assert.equal(typeof markdownItDigit, "function");
});

test("markdown-itのプラグインとして登録できる", () => {
    const markdownIt = new MarkdownIt().use(markdownItDigit);

    assert.equal(markdownIt.render("$1000${en}"), "<p>1,000</p>\n");
});

test("内部モジュールのdeep importを公開しない", () => {
    const internalModules = [
        "markdown-it-digit/src/parser",
        "markdown-it-digit/src/renderer",
        "markdown-it-digit/src/locales/en",
        "markdown-it-digit/src/locales/east-asian"
    ];

    for (const modulePath of internalModules) {
        assert.throws(
            () => require(modulePath),
            (error) => error.code === "ERR_PACKAGE_PATH_NOT_EXPORTED",
            modulePath
        );
    }
});
