# Changelog
すべての重要な変更はこのファイルに記録されます。

フォーマットは [Keep a Changelog](https://keepachangelog.com/ja/1.1.0/) に基づき、
バージョニングは [Semantic Versioning](https://semver.org/lang/ja/) を採用しています。

変更の種類
- Added         新機能
- Changed       既存機能の変更
- Deprecated    間もなく削除される機能
- Removed       今回で削除された機能
- Fixed         不具合修正
- Security      脆弱性に関する報告

バージョン X.Y.Z
- X メジャーバージョン      パブリックAPIに対して後方互換性を持たない変更
- Y マイナーバージョン      後方互換性を保ちつつ機能性をパブリックAPIに追加した場合
- Z パッチバージョン        後方互換性を保ったバグ修正を取り込んだ場合


---

## [1.0.0] - 2026-08-17

### Added

- `$<number>${<locale>}` 記法を変換するCommonJS版markdown-itプラグイン
- 3桁区切りの `en` とインド式桁区切りの `in`
- 日本語・簡体字中国語・韓国語・繁体字中国語の万進法に対応する `jp`、`cn`、`kr`、`tw`
- コード、URL、リンク先、HTML属性などを変換対象外にするMarkdownコンテキスト判定
- 未対応locale、不正入力、formatter例外時に元の記法を安全に保持するフォールバック
- 英語版・日本語版READMEと数値変換仕様書
