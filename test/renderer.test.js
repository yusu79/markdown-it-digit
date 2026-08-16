"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");
const MarkdownIt = require("markdown-it");

const createDigitRenderer = require("../src/renderer");

function renderToken(token) {
    const markdownIt = new MarkdownIt();
    const renderDigit = createDigitRenderer(markdownIt);

    return renderDigit([token], 0);
}

test("enはHTML要素を含まないプレーンテキストを出力する", () => {
    assert.equal(
        renderToken({
            content: "$1000000${en}",
            meta: { digit: { number: "1000000", locale: "en" } }
        }),
        "1,000,000"
    );
});

test("inはインド式に区切ったプレーンテキストを出力する", () => {
    assert.equal(
        renderToken({
            content: "$123456789${in}",
            meta: { digit: { number: "123456789", locale: "in" } }
        }),
        "12,34,56,789"
    );
});

test("jpは固定された単位だけをsub要素として出力する", () => {
    assert.equal(
        renderToken({
            content: "$123456789${jp}",
            meta: { digit: { number: "123456789", locale: "jp" } }
        }),
        "1<sub>億</sub>2345<sub>万</sub>6789"
    );
});

test("cn、kr、twは各表記の単位をsub要素として出力する", () => {
    const cases = [
        ["cn", "1<sub>亿</sub>2345<sub>万</sub>6789"],
        ["kr", "1<sub>억</sub>2345<sub>만</sub>6789"],
        ["tw", "1<sub>億</sub>2345<sub>萬</sub>6789"]
    ];

    for (const [locale, expected] of cases) {
        assert.equal(
            renderToken({
                content: `$123456789\${${locale}}`,
                meta: { digit: { number: "123456789", locale } }
            }),
            expected
        );
    }
});

test("未対応ロケールの元記法をHTMLエスケープする", () => {
    assert.equal(
        renderToken({
            content: "<script>alert(1)</script>",
            meta: { digit: { number: "1000", locale: "unknown" } }
        }),
        "&lt;script&gt;alert(1)&lt;/script&gt;"
    );
});

test("数字以外を含む解析情報を変換せずHTMLエスケープする", () => {
    assert.equal(
        renderToken({
            content: "<img src=x onerror=alert(1)>",
            meta: { digit: { number: "<img>", locale: "jp" } }
        }),
        "&lt;img src=x onerror=alert(1)&gt;"
    );
});

test("解析情報がないトークンも安全にフォールバックする", () => {
    assert.equal(
        renderToken({ content: "<strong>unsafe</strong>" }),
        "&lt;strong&gt;unsafe&lt;/strong&gt;"
    );
});
