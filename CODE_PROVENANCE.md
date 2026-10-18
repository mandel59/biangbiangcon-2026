# コードとフォントの由来

Gitで追跡しているコード・設定ファイルと同梱フォントについて、由来と加工内容を記載します。ライセンスの指定は[READMEのLicense節](README.md#license)を参照してください。

追跡ファイルと作成・変更履歴を確認した範囲では、Slidevなどの依存ライブラリ本体を直接改変したファイルや、そのためのパッチは確認されていません。スライド用の追加コード・設定と、以前のSQLやフォントを加工したファイルがあります。

## スライド用に追加したコード

Ryuseiの指示によりAIエージェントが生成・変更したコードです。表の「利用先」は呼び出すライブラリやAPIを示します。

| ファイル                                                                                 | 内容と利用先                                                                                                                               |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| [style.css](docs/biangbiangcon-character-hacks/slidev/style.css)                         | このスライド用の配色、レイアウト、図表のスタイル。CSSでテーマの表示を上書きし、FontsourceのCSSとJigmoのサブセットを読み込む。              |
| [export.mjs](docs/biangbiangcon-character-hacks/slidev/export.mjs)                       | SlidevのPDF出力CLIを呼び出すラッパー。ブラウザの指定と、WindowsでのEdgeの選択を行う。                                                      |
| [fonts/subset-jigmo.py](docs/biangbiangcon-character-hacks/slidev/fonts/subset-jigmo.py) | fontToolsを利用して、Jigmoからスライドで使う文字を抽出し、WOFF2に変換する。                                                                |
| [build-slides.mjs](docs/biangbiangcon-character-hacks/build-slides.mjs)                  | 以前のPowerPoint案を生成するコード。`@oai/artifact-tool`、`@napi-rs/canvas`、ReportLabと、外部のプレゼンテーション用補助ツールを呼び出す。 |
| [slides.md](docs/biangbiangcon-character-hacks/slidev/slides.md)                         | スライドコンテンツと、表示用のHTML・SVG、SQL・シェルのコード例が混在する。SQLの由来は次節を参照。                                          |

`style.css`は、Slidevが提供するスタイルの拡張機構を利用しています。ライブラリや標準テーマのソースファイルを置き換える構成ではありません。[Slidevのディレクトリ構成](https://sli.dev/custom/directory-structure)

## 既存のSQLを再構成したコード

[jgquery-steps.sql](docs/biangbiangcon-character-hacks/jgquery-steps.sql)は、Ryuseiが以前公開した[jgquery.sql](https://gist.github.com/mandel59/8a7cd6cca228723e248d5fccbd41e69a)を、発表用に「表を作る・つなぎ合わせる・絞る」の3ステップへ再構成したものです。既存ライブラリの修正には該当しません。

[slides.mdの発表者ノート](docs/biangbiangcon-character-hacks/slidev/slides.md)には、元のクエリが2022年7月のものであることと、次の変更内容が記録されています。

- CTEを日本の表、中国の表、画数の表、つなぎ合わせに分けて命名。
- 最後の条件で規範字のない行が除かれる箇所を、`LEFT JOIN`から`JOIN`に変更。
- 未使用の註解列と冗長な別名指定を削除。
- `ORDER BY`で結果の順序を明示。

スライド中のSQLもこの再構成版に基づきます。元のクエリの由来と変更内容の記述は、上記ノートに基づきます。

## 設定と依存関係の記録

| ファイル                                                                         | 内容                                                                                                                                                        |
| -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [vite.config.ts](docs/biangbiangcon-character-hacks/slidev/vite.config.ts)       | `build.cssMinify: false`を指定する追加設定。ファイル内のコメントでは、Slidev生成CSSの圧縮時の問題を回避するためと説明されている。Vite本体の修正は含まない。 |
| [package.json](docs/biangbiangcon-character-hacks/slidev/package.json)           | 依存パッケージと開発・ビルド・出力・デプロイのコマンドを指定する。                                                                                          |
| [package-lock.json](docs/biangbiangcon-character-hacks/slidev/package-lock.json) | npmが生成する依存解決の記録。パッケージの取得先・バージョン・整合性情報などを含む。ライブラリ本体のソースは含まない。                                       |
| [wrangler.jsonc](docs/biangbiangcon-character-hacks/slidev/wrangler.jsonc)       | Cloudflareでの静的ファイル配信とカスタムドメインの設定。                                                                                                    |
| [.gitignore](docs/biangbiangcon-character-hacks/slidev/.gitignore)               | インストールした依存関係、ビルド出力、一時ファイルなどを追跡対象から除外する設定。                                                                          |

Viteの設定は、Slidevが読み込む追加設定ファイルで指定しています。[SlidevのVite設定](https://sli.dev/custom/config-vite)

`package-lock.json`が記録するのはnpmの依存関係です。Python用のfontTools・Brotliや、以前のPowerPoint生成で使うライブラリ・補助ツールは、各スクリプトが別途利用するもので、このロックファイルの管理対象とは限りません。それぞれのソースをこのリポジトリへコピーして同梱する構成にはなっていません。

## 既存フォントを加工したファイル

次の3ファイルは、[Jigmoフォント](https://kamichikoichi.github.io/jigmo/)のサブセットです。元フォントのCC0-1.0が適用されます。

| 同梱ファイル                                                                               | 元ファイル   |
| ------------------------------------------------------------------------------------------ | ------------ |
| [Jigmo-subset.woff2](docs/biangbiangcon-character-hacks/slidev/fonts/Jigmo-subset.woff2)   | `Jigmo.ttf`  |
| [Jigmo2-subset.woff2](docs/biangbiangcon-character-hacks/slidev/fonts/Jigmo2-subset.woff2) | `Jigmo2.ttf` |
| [Jigmo3-subset.woff2](docs/biangbiangcon-character-hacks/slidev/fonts/Jigmo3-subset.woff2) | `Jigmo3.ttf` |

加工内容は、[subset-jigmo.py](docs/biangbiangcon-character-hacks/slidev/fonts/subset-jigmo.py)による、スライドで使用する漢字等への収録文字の絞り込みとWOFF2への変換です。フォントデータの加工と、加工に使うプログラムは別の対象です。

## 生成物

スライド本文、引用資料、画像、PDF・PowerPointのコンテンツについては、[README](README.md#license)とスライド内の出典を参照してください。

## 確認できない範囲

ここでの「追加したコード」は、このリポジトリ向けに追加されたファイルという分類です。AI生成時に参照された外部コードの有無や、その行単位の由来までは、追跡ファイルと履歴から特定できません。
