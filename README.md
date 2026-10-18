# 文字情報ハックのすすめ

BiangBiangCon 2026-10-16 発表スライドを公開します。

公開スライド中には発表者用台本およびノートが含まれています。

ノートの内容に関しては詳細レビューができていませんが、発表当日のものを残したままにしてあります。

このリポジトリ内およびコミット履歴には、作成途中の古い発表案・台本・スライドも残っています。これらには不正確な記述が含まれる可能性があります。発表版は以下のWeb版・PDF版を参照してください。

- [Web版](https://biangbiangcon.ryusei.dev)
- [PDF版](docs/biangbiangcon-character-hacks/slidev/slides.pdf)

## 作成に使ったAIエージェント

スライドの作成には、次のAIエージェントとモデルを使いました。

| エージェント | モデル |
| --- | --- |
| Claude Code | Claude Opus 5.5 |
| Codex | GPT-6.1 Sol |

## License

コード・設定ファイルと同梱フォントの由来・加工内容は、[コードとフォントの由来](CODE_PROVENANCE.md)を参照してください。

### 依存ライブラリ・フォント

Slidevなどの依存ライブラリやフォントには、それぞれのライセンスが適用されます。主な依存関係は次のとおりです。

| 対象                                                                                      | ライセンス                                                                                          |
| ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Slidev (`@slidev/cli`)                                                                    | [MIT](https://github.com/slidevjs/slidev/blob/main/LICENSE)                                         |
| Slidev標準テーマ (`@slidev/theme-default`)                                                | [MIT](https://github.com/slidevjs/themes/blob/main/LICENSE)                                         |
| Playwright (`playwright-chromium`)                                                        | [Apache-2.0](https://github.com/microsoft/playwright/blob/main/LICENSE)                             |
| Noto Sans / Noto Sans JP / Noto Sans SC / Noto Serif JP / Noto Serif SC (`@fontsource/*`) | [SIL Open Font License 1.1 (OFL-1.1)](https://openfontlicense.org/open-font-license-official-text/) |
| Jigmo / Jigmo2 / Jigmo3（同梱のサブセットを含む）                                         | [CC0-1.0](https://kamichikoichi.github.io/jigmo/#ライセンス)                                        |

その他の間接依存を含む各パッケージのライセンスは、[package-lock.json](docs/biangbiangcon-character-hacks/slidev/package-lock.json)および各パッケージに付属するライセンス・著作権表示を参照してください。

### プログラムの作成・変更分

Ryuseiの指示によりAIエージェントが生成・変更したプログラム（スクリプト、Vueコンポーネント、CSS、スライド内のコード例など）は、[MIT No Attribution License (MIT-0)](https://opensource.org/license/mit-0)で公開します。

依存ライブラリや既存コードに由来する部分には、元のライセンスおよび著作権表示が引き続き適用されます。

### スライドコンテンツ

Ryuseiが作成したスライドコンテンツ（本文、図表、発表者用台本・ノートなど。プログラムを除く）は、[Creative Commons Attribution 4.0 International (CC-BY-4.0)](https://creativecommons.org/licenses/by/4.0/deed.ja)で公開します。Web版・PDF版にも同じライセンスを適用します。

利用時は、著作者名「Ryusei Yamaguchi」、出典およびライセンスへのリンクを示し、変更した場合はその旨を明記してください。

引用した資料・画像・データなど、第三者が権利を有するものには、それぞれのライセンス・利用条件が適用されます。出典はスライド内の記載を参照してください。
