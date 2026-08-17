# markdown-it-digit

[English](README.md)

明示的なlocale記法で指定した整数を読みやすく整形する [markdown-it](https://github.com/markdown-it/markdown-it) プラグインです。通常の数値は変更しません。

## インストール

```sh
npm install markdown-it-digit
```

## 基本的な使い方

```js
const MarkdownIt = require("markdown-it");
const markdownItDigit = require("markdown-it-digit");

const md = new MarkdownIt().use(markdownItDigit);

md.render("$1234567${en}");
// <p>1,234,567</p>\n
```

本パッケージはCommonJSのエントリポイントを提供します。ESM用エントリポイントとplugin optionsはありません。

## 記法

```text
$<number>${<locale>}
```

`<number>` は1文字以上のASCII数字（`0`～`9`）で記述します。先頭ゼロは保持されます。locale識別子では大文字と小文字を区別します。

## 対応locale

| locale | 表記方式 |
| --- | --- |
| `en` | 3桁ごとにカンマで区切る |
| `in` | 右端を3桁、その左側を2桁ごとに区切る |
| `jp` | 日本語の万進法単位を挿入する |
| `cn` | 簡体字中国語の万進法単位を挿入する |
| `kr` | 韓国語の万進法単位を挿入する |
| `tw` | 繁体字中国語の万進法単位を挿入する |

`jp`、`cn`、`kr`、`tw` は本パッケージ独自のフォーマット識別子であり、ISO言語コードやBCP 47言語タグではありません。

## 変換例

| 入力 | HTML出力 |
| --- | --- |
| `$1234567${en}` | `1,234,567` |
| `$123456789${in}` | `12,34,56,789` |
| `$123456789${jp}` | `1<sub>億</sub>2345<sub>万</sub>6789` |
| `$123456789${cn}` | `1<sub>亿</sub>2345<sub>万</sub>6789` |
| `$123456789${kr}` | `1<sub>억</sub>2345<sub>만</sub>6789` |
| `$123456789${tw}` | `1<sub>億</sub>2345<sub>萬</sub>6789` |
| `$0001000${en}` | `0,001,000` |

東アジア形式では、元の数字とゼロだけのグループをすべて保持します。単位は桁位置を示すものであり、数値を省略しません。

## 変換対象外

通常のインラインテキストにある正しい専用記法を変換します。Markdownリンクの表示テキストやHTMLタグ間のテキストも対象です。次の場所は変換しません。

- fenced code block、インデントされたcode block
- インラインコード
- URL、または明示的なURI schemeで始まるテキスト
- Markdownリンクのリンク先
- HTML属性、HTMLコメント
- Markdownのバックスラッシュでエスケープされた記法

専用記法を使用していない通常の数値も変換しません。

## 不正入力・未対応locale

不正な構文は入力のまま残します。構文として正しくても、`unknown`、`EN`、`en-US` などの未対応または大文字小文字が異なるlocaleも入力のまま残します。

formatter内部で予期しない例外が発生した場合は、Markdown全体のレンダリングを失敗させず、元の記法をHTMLエスケープして返します。

## Public API

Public APIは、次のrequireで取得するmarkdown-itプラグイン関数だけです。

```js
const markdownItDigit = require("markdown-it-digit");
```

内部parser、renderer、localeモジュール、formatterレジストリ、token metadataはPublic APIではなく、package subpathからimportできません。外部locale登録APIも提供しません。

完全な挙動は[数値変換仕様](docs/specification.md)を参照してください。

## License

[MIT](LICENSE)
