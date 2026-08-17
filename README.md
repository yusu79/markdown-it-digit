# markdown-it-digit

[日本語](README.jp.md)

A [markdown-it](https://github.com/markdown-it/markdown-it) plugin that formats integers written with an explicit locale marker. Ordinary numbers are left unchanged.

## Install

```sh
npm install markdown-it-digit
```

## Usage

```js
const MarkdownIt = require("markdown-it");
const markdownItDigit = require("markdown-it-digit");

const md = new MarkdownIt().use(markdownItDigit);

md.render("$1234567${en}");
// <p>1,234,567</p>\n
```

The package provides a CommonJS entry point. It does not provide an ESM entry point or plugin options.

## Syntax

```text
$<number>${<locale>}
```

`<number>` must contain one or more ASCII digits (`0`–`9`). Leading zeros are preserved. Locale identifiers are case-sensitive.

## Supported locales

| Locale | Format |
| --- | --- |
| `en` | Groups digits in threes with commas |
| `in` | Uses a three-digit final group and two-digit preceding groups |
| `jp` | Inserts Japanese myriad-based units |
| `cn` | Inserts Simplified Chinese myriad-based units |
| `kr` | Inserts Korean myriad-based units |
| `tw` | Inserts Traditional Chinese myriad-based units |

`jp`, `cn`, `kr`, and `tw` are format identifiers defined by this package. They are not ISO language codes or BCP 47 language tags.

## Examples

| Input | HTML output |
| --- | --- |
| `$1234567${en}` | `1,234,567` |
| `$123456789${in}` | `12,34,56,789` |
| `$123456789${jp}` | `1<sub>億</sub>2345<sub>万</sub>6789` |
| `$123456789${cn}` | `1<sub>亿</sub>2345<sub>万</sub>6789` |
| `$123456789${kr}` | `1<sub>억</sub>2345<sub>만</sub>6789` |
| `$123456789${tw}` | `1<sub>億</sub>2345<sub>萬</sub>6789` |
| `$0001000${en}` | `0,001,000` |

East Asian formats preserve every digit and every zero-only group. Units are visual position guides; the value is not abbreviated.

## Content that is not transformed

The plugin transforms valid syntax in ordinary inline text, including link labels and text between HTML tags. It does not transform syntax in:

- fenced or indented code blocks
- inline code
- URLs or text beginning with an explicit URI scheme
- Markdown link destinations
- HTML attributes or HTML comments
- syntax escaped with a Markdown backslash

Ordinary numbers without the plugin syntax are not transformed.

## Invalid input and unsupported locales

Invalid syntax is left unchanged. A syntactically valid but unsupported or incorrectly cased locale, such as `unknown`, `EN`, or `en-US`, is also left unchanged.

If a formatter unexpectedly throws, the original syntax is returned with HTML escaping instead of failing the complete Markdown render.

## Public API

The only public API is the markdown-it plugin function returned by:

```js
const markdownItDigit = require("markdown-it-digit");
```

Internal parsers, renderers, locale modules, formatter registries, and token metadata are not public and cannot be imported through package subpaths. External locale registration is not supported.

For the complete behavior, see [the specification](docs/specification.md).

## License

[MIT](LICENSE)
