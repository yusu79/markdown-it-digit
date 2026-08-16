"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");
const MarkdownIt = require("markdown-it");

const markdownItDigit = require("../src");

function parseInlineChildren(source) {
    const tokens = new MarkdownIt().use(markdownItDigit).parse(source, {});
    const inlineToken = tokens.find((token) => token.type === "inline");

    return inlineToken === undefined ? [] : inlineToken.children;
}

function findDigitTokens(source) {
    return parseInlineChildren(source).filter((token) => token.meta?.digit !== undefined);
}

test("専用記法を解析情報付きトークンへ変換する", () => {
    const [token] = findDigitTokens("price: $1000000${en} yen");

    assert.equal(token.type, "digit");
    assert.equal(token.content, "$1000000${en}");
    assert.deepEqual(token.meta.digit, {
        raw: "$1000000${en}",
        number: "1000000",
        locale: "en"
    });
});

test("1行にある複数の専用記法をそれぞれトークン化する", () => {
    const tokens = findDigitTokens("$1000${en} / $10000${jp}");

    assert.deepEqual(
        tokens.map((token) => token.meta.digit.locale),
        ["en", "jp"]
    );
});

test("enの専用記法を3桁区切りで描画する", () => {
    const markdownIt = new MarkdownIt().use(markdownItDigit);

    assert.equal(
        markdownIt.render("price: $1000${en}"),
        "<p>price: 1,000</p>\n"
    );
});

test("inの専用記法をインド式の桁区切りで描画する", () => {
    const markdownIt = new MarkdownIt().use(markdownItDigit);

    assert.equal(
        markdownIt.render("$123456789${in}"),
        "<p>12,34,56,789</p>\n"
    );
});

test("未対応ロケールは元の専用記法をそのまま描画する", () => {
    const markdownIt = new MarkdownIt().use(markdownItDigit);

    assert.equal(
        markdownIt.render("$1000${unknown}"),
        "<p>$1000${unknown}</p>\n"
    );
});

test("jpの専用記法を日本語4桁単位で描画する", () => {
    const markdownIt = new MarkdownIt().use(markdownItDigit);

    assert.equal(
        markdownIt.render("$123456789${jp}"),
        "<p>1<sub>億</sub>2345<sub>万</sub>6789</p>\n"
    );
});

test("cn、kr、twの専用記法を各表記の4桁単位で描画する", () => {
    const markdownIt = new MarkdownIt().use(markdownItDigit);

    assert.equal(
        markdownIt.render("$123456789${cn} / $123456789${kr} / $123456789${tw}"),
        [
            "<p>1<sub>亿</sub>2345<sub>万</sub>6789 / ",
            "1<sub>억</sub>2345<sub>만</sub>6789 / ",
            "1<sub>億</sub>2345<sub>萬</sub>6789</p>\n"
        ].join("")
    );
});

test("エスケープされた専用記法をトークン化しない", () => {
    assert.equal(findDigitTokens("\\$1000${en}").length, 0);
});

test("インラインコード内をトークン化しない", () => {
    assert.equal(findDigitTokens("`$1000${en}`").length, 0);
});

test("コードブロック内をトークン化しない", () => {
    assert.equal(findDigitTokens("```text\n$1000${en}\n```").length, 0);
});

test("インデントされたコードブロック内をトークン化しない", () => {
    assert.equal(findDigitTokens("    $1000${en}").length, 0);
});

test("MarkdownリンクのURLをトークン化しない", () => {
    assert.equal(
        findDigitTokens("[example](https://example.com/$1000${en})").length,
        0
    );
});

test("プレーンなURL内をトークン化しない", () => {
    assert.equal(
        findDigitTokens("https://example.com/$1000${en}").length,
        0
    );
});

test("括弧内や他スキームのURLをトークン化しない", () => {
    const sources = [
        "(https://example.com/$1000${en})",
        "ftp://example.com/$1000${en}",
        "www.example.com/$1000${en}"
    ];

    for (const source of sources) {
        assert.equal(findDigitTokens(source).length, 0, source);
    }
});

test("Markdownの自動リンク内をトークン化しない", () => {
    assert.equal(
        findDigitTokens("<https://example.com/$1000${en}>").length,
        0
    );
});

test("HTML属性内をトークン化しない", () => {
    const source = '<span data-value="$1000${en}">text</span>';

    assert.equal(findDigitTokens(source).length, 0);
});

test("HTMLを有効にした場合も属性内をトークン化しない", () => {
    const markdownIt = new MarkdownIt({ html: true }).use(markdownItDigit);
    const tokens = markdownIt.parse(
        '<span data-value="$1000${en}">text</span>',
        {}
    );
    const digitTokens = tokens
        .flatMap((token) => token.children ?? [])
        .filter((token) => token.type === "digit");

    assert.equal(digitTokens.length, 0);
});

test("通常のHTML入力をプラグイン経由で有効化しない", () => {
    const markdownIt = new MarkdownIt({ html: false }).use(markdownItDigit);

    assert.equal(
        markdownIt.render("<script>alert(1)</script> $1000${en}"),
        "<p>&lt;script&gt;alert(1)&lt;/script&gt; 1,000</p>\n"
    );
});
