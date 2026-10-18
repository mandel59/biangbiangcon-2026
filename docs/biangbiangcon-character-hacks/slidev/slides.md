---
theme: default
title: 文字情報ハックのすすめ
info: |
  ## 文字情報ハックのすすめ / An Invitation to Hacking Character Data

  BiangBiangCon, 2026-10-16 — Ryusei Yamaguchi (mandel59)

  字典の索引では引けない問いに、公開された文字データと既存の技術を組み合わせて答える。

  Answering questions no dictionary index can, by combining open character data with existing tools.
author: Ryusei Yamaguchi
class: cover
aspectRatio: 4/3
canvasWidth: 820
colorSchema: light
transition: none
drawings:
  enabled: false
fonts:
  sans: Noto Sans JP
  serif: Noto Serif JP
  mono: Consolas
  local: [ Noto Sans JP, Noto Serif JP, Consolas ]
---

<div class="meta">BIANGBIANGCON · 2026-10-16</div>

# 文字情報ハックのすすめ

<p class="en">An Invitation to Hacking Character Data</p>
<p class="zh" lang="zh-Hans">动手玩转文字数据</p>

<div class="who">Ryusei Yamaguchi / mandel59</div>

<!--
0:00–0:10

「文字情報ハックのすすめ」という話をします。

***

（中国語題「动手玩转文字数据」：AI翻訳字幕で「ハック」が「黑客」（攻撃者の含みがある）や「破解」（クラック）になるのを避け、意図を先に見せるため。玩转＝使いこなす・いろいろ試して遊ぶ、动手＝自分で手を動かす。中国語話者による確認はまだ。）
-->

---

# 漢字の文字情報を引くMojidataを作っています

<p class="en">I build Mojidata, a web app for looking up kanji character data</p>

<div class="body">
<div class="intro">
<div class="me"><div class="nm">Ryusei Yamaguchi</div><div class="hd">mandel59</div><div class="role">プログラマー<span class="en">Programmer</span></div></div>
<div class="app"><div class="k">Mojidata Web App</div><a class="url" href="https://mojidata.ryusei.dev/" target="_blank" rel="noopener">mojidata.ryusei.dev</a><div class="x">漢字を検索し、読み・画数・異体字などの文字情報をまとめて引ける<span class="en">Type a kanji to look up readings, strokes, variants, IDS and more</span></div><a class="demo" href="https://mojidata.ryusei.dev/" target="_blank" rel="noopener">デモを開く<span class="en">Open the demo</span></a></div>
</div>
</div>

<!--
0:10–1:30

ヤマグチ リュウセイです。私はプログラマーです。昔から文字や文字コードに関心があったので、昔から、それを処理するためのツールやアプリを作ることが趣味でした。

たとえば、モジデータウェブアップというアプリを作っています。ちょっと見てみましょう。

（ここで漢字検索のデモページを開いて紹介します。）

***

（ここでブラウザでmojidata.ryusei.devを開いて実演する。約1分。字を一つ入れて、読み・画数・異体字・IDSが一画面で引けることを見せ、IDS検索の画面にも少し触れる。会場のWi-Fiが使えないときは、スクリーンショットか、このスライドのまま口頭で説明する。）
（Mojidata Web Appのリポジトリは2023年4月から。文字データの部分（Mojidata）は2020年12月から作っている。）
注：[Mojidata Web App](https://mojidata.ryusei.dev/)
-->

---

# 手元のものを組み合わせて作る。これがハック

<p class="en">Built by combining the character data and tools at hand: that is a hack</p>

<div class="body">
<div class="hack3 made">
<div><div class="o">公開されたデータを</div><div class="v">集める</div><div class="en">Collect character data others have published</div></div>
<div><div class="o">手元の技術と</div><div class="v">組み合わせる</div><div class="en">Combine it with the tools at hand</div></div>
<div><div class="o">できたものを</div><div class="v">公開する</div><div class="en">Publish what you made</div></div>
</div>
<p class="hackcap">Mojidataも、こうして作った<span class="en">Mojidata was made this way</span></p>
</div>

<!--
1:30–2:10

今お見せしたモジデータは、どうやって作るんでしょうか。アプリに入っている文字情報は、すでに誰かが作って公開してあるものを集めてきて、公開したものです。自分は手元にある文字情報と技術を組み合わせて、ありあわせのアプリを作ったんです。その作り方のことを、プログラマーは「ハック」と呼ぶことがあります。ここからは、私が今までどういう「ハック」をして、何を作ってきたのかということを、３つの問題を通して紹介します。

***

（補足29枚目「ハックとは」の三つの心構え（取り組む・活かす・公開する）を、Mojidataの作り方に当てはめた形。集める・組み合わせる＝活かす、公開する＝公開する。ハックという語の定義そのものは補足で扱う。）
-->

---
class: door
---

<div class="dnum">①</div>

# 新字体より画数が多い簡体字は？

<p class="en">Simplified characters with more strokes than shinjitai?</p>

<div class="ill ill1"><div class="side"><span class="han" lang="ja">漢</span><span class="k">新字体<span class="en">Shinjitai</span></span></div><div class="lt"><span class="q shu">？</span>＜</div><div class="side"><span class="han" lang="zh-Hans">汉</span><span class="k">簡体字<span class="en">Simplified</span></span></div></div>

<!--
2:10–2:25

最初の問題、新字体より画数が多い簡体字は？

***
-->

---

<p class="recall">① 新字体より画数が多い簡体字は？<span class="en">Simplified characters with more strokes than shinjitai?</span></p>

# 画数の多い簡体字がある。他にもある？

<p class="en">Some simplified forms have more strokes. Are there more?</p>

<div class="body">
<div class="vs">
<div class="head"><span>常用漢字<span class="en">Jōyō</span></span><span>旧字体・繁体字<span class="en">Traditional</span></span><span>規範字<span class="en">Chinese standard</span></span></div>
<div><span class="han" lang="ja">気</span><b>6</b><span class="han tr" lang="zh-Hant">氣</span><b class="tr">10</b><span class="han cn" lang="zh-Hans">气</span><b>4</b></div>
<div><span class="han" lang="ja">発</span><b>9</b><span class="han tr" lang="zh-Hant">發</span><b class="tr">12</b><span class="han cn" lang="zh-Hans">发</span><b>5</b></div>
<div><span class="han" lang="ja">広</span><b>5</b><span class="han tr" lang="zh-Hant">廣</span><b class="tr">15</b><span class="han cn" lang="zh-Hans">广</span><b>3</b></div>
<div><span class="han" lang="ja">電</span><b>13</b><span class="han tr" lang="zh-Hant">電</span><b class="tr">13</b><span class="han cn" lang="zh-Hans">电</span><b>5</b></div>
<div><span class="han" lang="ja">円</span><b>4</b><span class="han tr" lang="zh-Hant">圓</span><b class="tr">13</b><span class="han cn" lang="zh-Hans">圆</span><b class="shu">10</b></div>
</div>
</div>

<!--
2:25–3:15

一つ目は、2022年にツイッターに書かれていた疑問をもとに、私が調べた問いです。

日本でも中国でも、日常で使う漢字を画数の少ないものにする、ということをやっていて、どちらも伝統的な旧字体・繁体字を簡単にした形を使っていますが、気、発、広のように、日中で簡単にする方法は違います。電のように、日本では簡単にしなかった字もあります。こうして見ると、中国の簡体字の方が画数が少ないように感じますが、そうとも限りません。

たとえば、円は4画ですが、中国のエンは10画です。こういう字は、ほかにもあるでしょうか。

***

（気・発・広・電は、日中の字体差の紹介によく使われる典型例として載せた。画数の多い簡体字の例は円だけを残した（ほかに両两、図图、圧压など）。画数は、常用漢字と旧字体・繁体字もMJ文字情報一覧表、規範字が通用規範漢字表（2026-10-15、moji.dbで確認）。規範字の列には簡略化されていない字（佛、收など）も含まれるので、例には簡体字の組だけを選んだ。器・墨・増のように、字形はほぼ同じで数え方や部品の形が違う組も載せていない。）
注：[2022-07-14の抽出](https://x.com/mandel59/status/1547293802565496832)（[クエリ](https://gist.github.com/mandel59/8a7cd6cca228723e248d5fccbd41e69a)）。当時のデータ。日中で画数の数え方が違う場合は考慮していない。
-->

---

# 材料も道具も、すでに公開されている

<p class="en">The data and the tools are already out there</p>

<div class="body">
<div class="kit">
<div>
<div class="label">データ <span class="en">/ Data</span></div>
<ul class="items data-items">
<li><b>Unihan</b><span class="en">Unihan Database, Unicode Consortium</span></li>
<li><b>IDS</b><span class="en">IDS Database, BabelStone</span></li>
<li><b>MJ文字情報一覧表</b><span class="en">List of MJ Characters, Character Information Technology Promotion Council</span></li>
<li><b>常用漢字表</b><span class="en">Jōyō Kanji Table, Agency for Cultural Affairs</span></li>
<li><b>通用規範漢字表</b><span class="en">List of Common Standard Chinese Characters, State Council of China</span></li>
</ul>
</div>
<div>
<div class="label">技術 <span class="en">/ Tools</span></div>
<ul class="items">
<li><b>SQLite</b><span>データベース / Database</span></li>
<li><b>全文検索</b><span>Full-text search</span></li>
<li><b>JavaScript</b><span>プログラミング言語 / Language</span></li>
</ul>
</div>
<div class="into">
<span class="ar">→</span>
<div class="dst">Mojidata<span class="en">組み合わせたもの<br>Combined</span></div>
</div>
</div>
</div>

<!--
3:15–4:00

答えるための材料と道具は、沢山公開されています。文字情報として、Unicodeのユニハン、バベルストーンIDS、MJ文字情報一覧表、常用漢字表、中国の通用規範漢字表といったデータが入手できます。

技術は、SQLiteというデータベースと、その全文検索、そしてJavaScript。こういったものを組み合わせると、漢字について色々なことが調べられます。

私が、こうした既存の成果と技術を組み合わせて、自分が使いやすいようにまとめたものを、モジデータと呼んでいます。

***

（データと技術は、Mojidataが実際に使っているものから代表を選んだ。データはほかにIVD、Adobe-Japan1、MJ縮退マップ、Kanji Database Projectの異体字、入管正字、同音の漢字による書きかえなど。技術はほかにsql.js（ブラウザで動くSQLite）、Node.js、better-sqlite3、Cloudflare D1など。）
注：Mojidataリポジトリ packages/mojidata/README.md のデータ一覧、各パッケージの依存（typescript、sql.js、better-sqlite3）。
データ名・提供元：[Unihan](https://www.unicode.org/reports/tr38/)、[BabelStone IDS](https://babelstone.co.uk/CJK/IDS.HTML)、[MJ文字情報一覧表](https://moji.or.jp/mojikiban/mjlist/)（[CITPCの英語名](https://unicode.org/ivd/moji_joho/)）、[常用漢字表](https://www.bunka.go.jp/kokugo_nihongo/sisaku/joho/joho/kijun/naikaku/kanji/)（[文化庁の英語名](https://www.bunka.go.jp/english/about/)）、[規範字の表と国務院](https://english.www.gov.cn/archive/publications/2014/08/23/content_281474983042904.htm)。
-->

---

<p class="recall">① 新字体より画数が多い簡体字は？<span class="en">Simplified characters with more strokes than shinjitai?</span><span class="step">ステップ1　表を作る<span class="en">Step 1: build the tables</span></span></p>

# 日本と中国で、異体字と画数の表を作る

<p class="en">First, build variant and stroke-count tables on each side</p>

<div class="body">
<div class="vt2">
<div class="vt jp">
<div class="h">日本の表<span class="en">Japan</span></div>
<table>
<thead><tr><th>常用漢字・画数<span class="en">Jōyō, strokes</span></th><th>異体字<span class="en">Variants</span></th></tr></thead>
<tbody>
<tr><td class="han" lang="ja">気<i>6</i></td><td class="han" lang="ja"><span class="self">気</span>氣</td></tr>
<tr><td class="han" lang="ja">発<i>9</i></td><td class="han" lang="ja"><span class="self">発</span>發</td></tr>
<tr><td class="han" lang="ja">髪<i>14</i></td><td class="han" lang="ja"><span class="self">髪</span>髮</td></tr>
<tr><td class="han" lang="ja">電<i>13</i></td><td class="han" lang="ja"><span class="self">電</span></td></tr>
</tbody>
</table>
<div class="src">異体字：常用漢字表、Unihan kZVariant、MJ縮退マップ、手で足した6組<br>画数：MJ文字情報一覧表</div>
</div>
<div class="vt cn">
<div class="h">中国の表<span class="en">China</span></div>
<table>
<thead><tr><th>異体字<span class="en">Variants</span></th><th>規範字・画数<span class="en">Standard, strokes</span></th></tr></thead>
<tbody>
<tr><td class="han" lang="ja"><span class="self">气</span>氣</td><td class="han" lang="zh-Hans">气<b>4</b></td></tr>
<tr><td class="han" lang="ja"><span class="self">发</span>發髮</td><td class="han" lang="zh-Hans">发<b>5</b></td></tr>
<tr><td class="han" lang="ja"><span class="self">电</span>電</td><td class="han" lang="zh-Hans">电<b>5</b></td></tr>
</tbody>
</table>
<div class="src">異体字：通用規範漢字表の異体字表、Unihan kSimplifiedVariant<br>画数：通用規範漢字表</div>
</div>
</div>
</div>

<!--
4:00–5:05

解き方は、三つのステップに分けます。ステップ1で日本と中国それぞれの表を作り、ステップ2でつなぎ合わせ、ステップ3で条件で絞ります。

日本の常用漢字と中国の規範字を、直接結ぶ表は実はありません。そこで、まず常用漢字と、その異体字の表を作ります。新字体と旧字体の関係を、常用漢字表やUnihan、MJの縮退マップから持ってきます。足りない関係は手で書き足します。
もうひとつ、規範字に関しても同様に、規範字と異体字との対応表を作ります。簡体字と繁体字の関係を含む対応表を、通用規範漢字表やUnihanを材料にして作ります。

画数の表も、ここで用意しておきます。常用漢字の画数はMJ文字情報一覧表から、規範字の画数は通用規範漢字表から取ります。

***

（解き方を三つのステップに分ける。ステップ1で表を作り、ステップ2でつなぎ合わせ、ステップ3で条件で絞る。中国の表は、つなぎ合わせに進みやすいよう、異体字を左、規範字を右に置いた。）
（どちらの表も、字そのものを異体字の側に含める（薄い字）。これで、電→电のように常用漢字がそのまま中国の表の異体字と一致する組や、乗→乘、仏→佛のように規範字がそのまま日本の異体字と一致する組もつながる。发の行の髮は、通用規範漢字表が发の繁体字として載せているもの（中国では髪の意味でも发と書く）。日本の表では発→發と髪→髮が別の行なので、発と髪の両方が发につながる（次の8枚目）。例は、簡体字のほうが画数の少ない組から選んだ（円圓圆・浜濱滨・仏佛のように答えになる組は、ここでは出さない）。）
（質疑用：彿・髴は、表の註解は空だが、中国で彷彿・髣髴を仿佛と書くため佛にまとめられた字と思われる（未確認）。日本では彷彿のまま使うので、日本の資料だけを見ていると佛と彿が並ぶことはない。中国の表を見て初めて気付いた関係で、データを見ていくうちに見えてくることの例。常用漢字は彿・髴に対応しないので、84組の結果には影響しない。手で足した6組は羨→羡、舎→舍、舗→舖、諮→咨、駄→馱、𠮟→叱。）
（投稿で「浜の簡体字は、旧字体の濱を経由して滨を参照する必要がある」「Unicodeでは細かい画数の違いは無視して統合されている」と書いた難しさが、この二つの表にあたる。）
注：[2022-07-13の投稿](https://x.com/mandel59/status/1547149754412331008)　[jgquery.sql](https://gist.github.com/mandel59/8a7cd6cca228723e248d5fccbd41e69a)
-->

---

<p class="recall">① 新字体より画数が多い簡体字は？<span class="en">Simplified characters with more strokes than shinjitai?</span><span class="step">ステップ2　つなぎ合わせる<span class="en">Step 2: join</span></span></p>

# 二つの表を、同じ文字でつなぐ

<p class="en">Then join the two tables on the same character</p>

<div class="body">
<div class="vjoin">
<div class="hd"><span>常用漢字<span class="en">Jōyō</span></span><span class="jp">日本の表<span class="en">Japan</span></span><span>同じ文字<span class="en">Same character</span></span><span class="cn">中国の表<span class="en">China</span></span><span>規範字<span class="en">Chinese standard</span></span></div>
<svg class="jsvg" viewBox="0 0 650 360" xmlns="http://www.w3.org/2000/svg">
<g class="e">
<path class="ej" d="M125 45H255"/>
<path class="ej" d="M125 135H255"/>
<path class="ej" d="M125 225H255"/>
<path class="ej" d="M125 315H255"/>
<path class="ec" d="M395 45H525"/>
<path class="ec" d="M395 135C460 135 460 180 525 180"/>
<path class="ec" d="M395 225C460 225 460 180 525 180"/>
<path class="ec" d="M395 315H525"/>
</g>
<text class="c" x="55" y="68" lang="ja">気</text>
<rect class="box" x="287" y="7" width="76" height="76" rx="4"/><text class="c" x="325" y="68" lang="ja">氣</text>
<text class="c" x="55" y="158" lang="ja">発</text>
<rect class="box" x="287" y="97" width="76" height="76" rx="4"/><text class="c" x="325" y="158" lang="ja">發</text>
<text class="c" x="55" y="248" lang="ja">髪</text>
<rect class="box" x="287" y="187" width="76" height="76" rx="4"/><text class="c" x="325" y="248" lang="ja">髮</text>
<text class="c" x="55" y="338" lang="ja">電</text>
<rect class="box" x="287" y="277" width="76" height="76" rx="4"/><text class="c" x="325" y="338" lang="ja">電</text>
<text class="c" x="595" y="68" lang="zh-Hans">气</text>
<text class="c" x="595" y="203" lang="zh-Hans">发</text>
<text class="c" x="595" y="338" lang="zh-Hans">电</text>
</svg>
</div>
</div>

<!--
5:05–5:30

ステップ2で、作った2つの表をつなぎ合わせると、日本の常用漢字と中国の規範字の対応表が出来上がります。たとえば、いちばん上の行では、新字体と簡体字が、旧字体を通ってつながります。

***

（13枚目のSQLのjgの部分にあたる。日本の表の異体字と、中国の表の異体字が同じ文字（同じUnicode符号位置）の行どうしを結ぶ。「字形」は日本の用語では包摂される違いを指すので、ここでは「同じ文字」と言う。両端の画数は、ステップ1で用意した画数の表（MJ文字情報一覧表の総画数、通用規範漢字表の笔画）から付く。）
注：[jgquery.sql](https://gist.github.com/mandel59/8a7cd6cca228723e248d5fccbd41e69a)
-->

---

<p class="recall">① 新字体より画数が多い簡体字は？<span class="en">Simplified characters with more strokes than shinjitai?</span><span class="step">ステップ2の結果<span class="en">Step 2 result</span></span></p>

# つないだ結果は、表の作り方で変わる

<p class="en">How you build the tables shapes what the join gives you</p>

<div class="body">
<div class="relwrap">
<svg class="relgraph" viewBox="0 0 868 406" xmlns="http://www.w3.org/2000/svg">
<g class="hd"><text x="10.0" y="10">常用</text><text x="52.0" y="10">異体</text><text x="94.0" y="10">規範</text></g>
<g class="hd"><text x="134.0" y="10">常用</text><text x="176.0" y="10">異体</text><text x="218.0" y="10">規範</text></g>
<g class="hd"><text x="258.0" y="10">常用</text><text x="300.0" y="10">異体</text><text x="342.0" y="10">規範</text></g>
<g class="hd"><text x="382.0" y="10">常用</text><text x="424.0" y="10">異体</text><text x="466.0" y="10">規範</text></g>
<g class="hd"><text x="506.0" y="10">常用</text><text x="548.0" y="10">異体</text><text x="590.0" y="10">規範</text></g>
<g class="hd"><text x="630.0" y="10">常用</text><text x="672.0" y="10">異体</text><text x="714.0" y="10">規範</text></g>
<g class="hd"><text x="754.0" y="10">常用</text><text x="796.0" y="10">異体</text><text x="838.0" y="10">規範</text></g>
<g class="e"><path class="same" d="M21.0 62.0C31.0 62.0 31.0 29.0 41.0 29.0"/><path class="same" d="M63.0 29.0C73.0 29.0 73.0 29.0 83.0 29.0"/><path class="kangxi" d="M21.0 62.0C31.0 62.0 31.0 51.0 41.0 51.0"/><path class="same" d="M63.0 51.0C73.0 51.0 73.0 51.0 83.0 51.0"/><path class="kangxi" d="M21.0 62.0C31.0 62.0 31.0 73.0 41.0 73.0"/><path class="same" d="M63.0 73.0C73.0 73.0 73.0 73.0 83.0 73.0"/><path class="kangxi" d="M21.0 62.0C31.0 62.0 31.0 95.0 41.0 95.0"/><path class="tghb" d="M63.0 95.0C73.0 95.0 73.0 95.0 83.0 95.0"/><path class="same" d="M21.0 126.0C52.0 126.0 52.0 137.0 83.0 137.0"/><path class="tghb" d="M21.0 126.0C52.0 126.0 52.0 159.0 83.0 159.0"/><path class="same" d="M21.0 148.0C52.0 148.0 52.0 159.0 83.0 159.0"/><path class="tghb" d="M21.0 170.0C52.0 170.0 52.0 159.0 83.0 159.0"/><path class="tghb" d="M21.0 201.0C52.0 201.0 52.0 212.0 83.0 212.0"/><path class="tghb" d="M21.0 223.0C52.0 223.0 52.0 212.0 83.0 212.0"/><path class="ksimp" d="M21.0 245.0C52.0 245.0 52.0 212.0 83.0 212.0"/><path class="same" d="M21.0 245.0C52.0 245.0 52.0 234.0 83.0 234.0"/><path class="same" d="M21.0 276.0C52.0 276.0 52.0 276.0 83.0 276.0"/><path class="tghb" d="M21.0 298.0C52.0 298.0 52.0 276.0 83.0 276.0"/><path class="same" d="M21.0 298.0C52.0 298.0 52.0 298.0 83.0 298.0"/><path class="same" d="M21.0 329.0C52.0 329.0 52.0 329.0 83.0 329.0"/><path class="tghb" d="M21.0 351.0C52.0 351.0 52.0 329.0 83.0 329.0"/><path class="same" d="M21.0 351.0C52.0 351.0 52.0 351.0 83.0 351.0"/><path class="same" d="M145.0 29.0C176.0 29.0 176.0 29.0 207.0 29.0"/><path class="tghb" d="M145.0 51.0C176.0 51.0 176.0 29.0 207.0 29.0"/><path class="same" d="M145.0 51.0C176.0 51.0 176.0 51.0 207.0 51.0"/><path class="same" d="M145.0 82.0C155.0 82.0 155.0 82.0 165.0 82.0"/><path class="same" d="M187.0 82.0C197.0 82.0 197.0 82.0 207.0 82.0"/><path class="kangxi" d="M145.0 104.0C155.0 104.0 155.0 104.0 165.0 104.0"/><path class="tghb" d="M187.0 104.0C197.0 104.0 197.0 82.0 207.0 82.0"/><path class="same" d="M187.0 104.0C197.0 104.0 197.0 104.0 207.0 104.0"/><path class="same" d="M145.0 135.0C176.0 135.0 176.0 135.0 207.0 135.0"/><path class="tghb" d="M145.0 135.0C176.0 135.0 176.0 157.0 207.0 157.0"/><path class="tghb" d="M145.0 157.0C176.0 157.0 176.0 157.0 207.0 157.0"/><path class="same" d="M145.0 188.0C176.0 188.0 176.0 188.0 207.0 188.0"/><path class="ksimp" d="M145.0 210.0C176.0 210.0 176.0 188.0 207.0 188.0"/><path class="same" d="M145.0 210.0C176.0 210.0 176.0 210.0 207.0 210.0"/><path class="same" d="M145.0 252.0C155.0 252.0 155.0 241.0 165.0 241.0"/><path class="tghb" d="M187.0 241.0C197.0 241.0 197.0 252.0 207.0 252.0"/><path class="mj" d="M145.0 274.0C155.0 274.0 155.0 263.0 165.0 263.0"/><path class="tghb" d="M187.0 263.0C197.0 263.0 197.0 252.0 207.0 252.0"/><path class="same" d="M145.0 274.0C155.0 274.0 155.0 285.0 165.0 285.0"/><path class="tghb" d="M187.0 285.0C197.0 285.0 197.0 274.0 207.0 274.0"/><path class="tghb" d="M145.0 316.0C176.0 316.0 176.0 327.0 207.0 327.0"/><path class="tghb" d="M145.0 338.0C176.0 338.0 176.0 327.0 207.0 327.0"/><path class="same" d="M145.0 380.0C155.0 380.0 155.0 369.0 165.0 369.0"/><path class="same" d="M187.0 369.0C197.0 369.0 197.0 369.0 207.0 369.0"/><path class="kangxi" d="M145.0 380.0C155.0 380.0 155.0 391.0 165.0 391.0"/><path class="same" d="M187.0 391.0C197.0 391.0 197.0 391.0 207.0 391.0"/><path class="tghb" d="M269.0 29.0C300.0 29.0 300.0 40.0 331.0 40.0"/><path class="same" d="M269.0 51.0C300.0 51.0 300.0 40.0 331.0 40.0"/><path class="tghb" d="M269.0 82.0C300.0 82.0 300.0 93.0 331.0 93.0"/><path class="tghb" d="M269.0 104.0C300.0 104.0 300.0 93.0 331.0 93.0"/><path class="tghb" d="M269.0 135.0C300.0 135.0 300.0 146.0 331.0 146.0"/><path class="tghb" d="M269.0 157.0C300.0 157.0 300.0 146.0 331.0 146.0"/><path class="same" d="M269.0 188.0C300.0 188.0 300.0 199.0 331.0 199.0"/><path class="tghb" d="M269.0 210.0C300.0 210.0 300.0 199.0 331.0 199.0"/><path class="same" d="M269.0 241.0C300.0 241.0 300.0 252.0 331.0 252.0"/><path class="tghb" d="M269.0 263.0C300.0 263.0 300.0 252.0 331.0 252.0"/><path class="mj" d="M269.0 305.0C279.0 305.0 279.0 294.0 289.0 294.0"/><path class="same" d="M311.0 294.0C321.0 294.0 321.0 294.0 331.0 294.0"/><path class="same" d="M269.0 305.0C279.0 305.0 279.0 316.0 289.0 316.0"/><path class="same" d="M311.0 316.0C321.0 316.0 321.0 316.0 331.0 316.0"/><path class="same" d="M269.0 347.0C300.0 347.0 300.0 358.0 331.0 358.0"/><path class="tghb" d="M269.0 369.0C300.0 369.0 300.0 358.0 331.0 358.0"/><path class="same" d="M393.0 29.0C424.0 29.0 424.0 40.0 455.0 40.0"/><path class="tghb" d="M393.0 51.0C424.0 51.0 424.0 40.0 455.0 40.0"/><path class="tghb" d="M393.0 82.0C424.0 82.0 424.0 93.0 455.0 93.0"/><path class="same" d="M393.0 104.0C424.0 104.0 424.0 93.0 455.0 93.0"/><path class="same" d="M393.0 135.0C403.0 135.0 403.0 135.0 413.0 135.0"/><path class="same" d="M435.0 135.0C445.0 135.0 445.0 146.0 455.0 146.0"/><path class="kangxi" d="M393.0 157.0C403.0 157.0 403.0 157.0 413.0 157.0"/><path class="tghb" d="M435.0 157.0C445.0 157.0 445.0 146.0 455.0 146.0"/><path class="same" d="M393.0 188.0C424.0 188.0 424.0 199.0 455.0 199.0"/><path class="tghb" d="M393.0 210.0C424.0 210.0 424.0 199.0 455.0 199.0"/><path class="kangxi" d="M393.0 241.0C403.0 241.0 403.0 241.0 413.0 241.0"/><path class="tghb" d="M435.0 241.0C445.0 241.0 445.0 252.0 455.0 252.0"/><path class="same" d="M393.0 263.0C403.0 263.0 403.0 263.0 413.0 263.0"/><path class="same" d="M435.0 263.0C445.0 263.0 445.0 252.0 455.0 252.0"/><path class="same" d="M393.0 294.0C403.0 294.0 403.0 294.0 413.0 294.0"/><path class="tghb" d="M435.0 294.0C445.0 294.0 445.0 305.0 455.0 305.0"/><path class="manual" d="M393.0 316.0C403.0 316.0 403.0 316.0 413.0 316.0"/><path class="same" d="M435.0 316.0C445.0 316.0 445.0 305.0 455.0 305.0"/><path class="tghb" d="M517.0 29.0C548.0 29.0 548.0 40.0 579.0 40.0"/><path class="same" d="M517.0 51.0C548.0 51.0 548.0 40.0 579.0 40.0"/><path class="same" d="M517.0 82.0C527.0 82.0 527.0 82.0 537.0 82.0"/><path class="same" d="M559.0 82.0C569.0 82.0 569.0 93.0 579.0 93.0"/><path class="kangxi" d="M517.0 104.0C527.0 104.0 527.0 104.0 537.0 104.0"/><path class="tghb" d="M559.0 104.0C569.0 104.0 569.0 93.0 579.0 93.0"/><path class="same" d="M517.0 135.0C548.0 135.0 548.0 146.0 579.0 146.0"/><path class="tghb" d="M517.0 157.0C548.0 157.0 548.0 146.0 579.0 146.0"/><path class="kangxi" d="M517.0 188.0C527.0 188.0 527.0 188.0 537.0 188.0"/><path class="tghb" d="M559.0 188.0C569.0 188.0 569.0 199.0 579.0 199.0"/><path class="same" d="M517.0 210.0C527.0 210.0 527.0 210.0 537.0 210.0"/><path class="tghb" d="M559.0 210.0C569.0 210.0 569.0 199.0 579.0 199.0"/><path class="same" d="M517.0 241.0C548.0 241.0 548.0 252.0 579.0 252.0"/><path class="tghb" d="M517.0 263.0C548.0 263.0 548.0 252.0 579.0 252.0"/><path class="same" d="M517.0 294.0C548.0 294.0 548.0 305.0 579.0 305.0"/><path class="tghb" d="M517.0 316.0C548.0 316.0 548.0 305.0 579.0 305.0"/><path class="same" d="M517.0 347.0C548.0 347.0 548.0 358.0 579.0 358.0"/><path class="tghb" d="M517.0 369.0C548.0 369.0 548.0 358.0 579.0 358.0"/><path class="same" d="M641.0 40.0C651.0 40.0 651.0 29.0 661.0 29.0"/><path class="same" d="M683.0 29.0C693.0 29.0 693.0 29.0 703.0 29.0"/><path class="kangxi" d="M641.0 40.0C651.0 40.0 651.0 51.0 661.0 51.0"/><path class="same" d="M683.0 51.0C693.0 51.0 693.0 51.0 703.0 51.0"/><path class="ksimp" d="M641.0 82.0C672.0 82.0 672.0 93.0 703.0 93.0"/><path class="tghb" d="M641.0 104.0C672.0 104.0 672.0 93.0 703.0 93.0"/><path class="same" d="M641.0 146.0C651.0 146.0 651.0 135.0 661.0 135.0"/><path class="same" d="M683.0 135.0C693.0 135.0 693.0 135.0 703.0 135.0"/><path class="kangxi" d="M641.0 146.0C651.0 146.0 651.0 157.0 661.0 157.0"/><path class="tghb" d="M683.0 157.0C693.0 157.0 693.0 157.0 703.0 157.0"/><path class="tghb" d="M641.0 188.0C672.0 188.0 672.0 199.0 703.0 199.0"/><path class="tghb" d="M641.0 210.0C672.0 210.0 672.0 199.0 703.0 199.0"/><path class="kangxi" d="M641.0 241.0C651.0 241.0 651.0 241.0 661.0 241.0"/><path class="tghb" d="M683.0 241.0C693.0 241.0 693.0 252.0 703.0 252.0"/><path class="kangxi" d="M641.0 263.0C651.0 263.0 651.0 263.0 661.0 263.0"/><path class="tghb" d="M683.0 263.0C693.0 263.0 693.0 252.0 703.0 252.0"/><path class="kangxi" d="M641.0 305.0C651.0 305.0 651.0 294.0 661.0 294.0"/><path class="same" d="M683.0 294.0C693.0 294.0 693.0 294.0 703.0 294.0"/><path class="same" d="M641.0 305.0C651.0 305.0 651.0 316.0 661.0 316.0"/><path class="same" d="M683.0 316.0C693.0 316.0 693.0 316.0 703.0 316.0"/><path class="tghb" d="M641.0 347.0C672.0 347.0 672.0 358.0 703.0 358.0"/><path class="same" d="M641.0 369.0C672.0 369.0 672.0 358.0 703.0 358.0"/><path class="tghb" d="M765.0 40.0C796.0 40.0 796.0 29.0 827.0 29.0"/><path class="tghb" d="M765.0 40.0C796.0 40.0 796.0 51.0 827.0 51.0"/><path class="tghb" d="M765.0 82.0C796.0 82.0 796.0 93.0 827.0 93.0"/><path class="same" d="M765.0 104.0C796.0 104.0 796.0 93.0 827.0 93.0"/><path class="same" d="M765.0 146.0C775.0 146.0 775.0 135.0 785.0 135.0"/><path class="same" d="M807.0 135.0C817.0 135.0 817.0 135.0 827.0 135.0"/><path class="kangxi" d="M765.0 146.0C775.0 146.0 775.0 157.0 785.0 157.0"/><path class="same" d="M807.0 157.0C817.0 157.0 817.0 157.0 827.0 157.0"/><path class="tghb" d="M765.0 188.0C796.0 188.0 796.0 199.0 827.0 199.0"/><path class="tghb" d="M765.0 210.0C796.0 210.0 796.0 199.0 827.0 199.0"/><path class="kangxi" d="M765.0 252.0C775.0 252.0 775.0 241.0 785.0 241.0"/><path class="tghb" d="M807.0 241.0C817.0 241.0 817.0 241.0 827.0 241.0"/><path class="same" d="M765.0 252.0C775.0 252.0 775.0 263.0 785.0 263.0"/><path class="same" d="M807.0 263.0C817.0 263.0 817.0 263.0 827.0 263.0"/><path class="tghb" d="M765.0 294.0C796.0 294.0 796.0 305.0 827.0 305.0"/><path class="same" d="M765.0 316.0C796.0 316.0 796.0 305.0 827.0 305.0"/><path class="same" d="M765.0 347.0C775.0 347.0 775.0 347.0 785.0 347.0"/><path class="same" d="M807.0 347.0C817.0 347.0 817.0 358.0 827.0 358.0"/><path class="kangxi" d="M765.0 369.0C775.0 369.0 775.0 369.0 785.0 369.0"/><path class="tghb" d="M807.0 369.0C817.0 369.0 817.0 358.0 827.0 358.0"/></g>
<g class="n j"><rect x="-1.0" y="51.0" width="22" height="22" rx="3"/><text x="10.0" y="68.0" lang="ja">弁</text></g><g class="n v"><rect x="41.0" y="18.0" width="22" height="22" rx="3"/><text x="52.0" y="35.0" lang="ja">弁</text></g><g class="n v"><rect x="41.0" y="40.0" width="22" height="22" rx="3"/><text x="52.0" y="57.0" lang="ja">瓣</text></g><g class="n v"><rect x="41.0" y="62.0" width="22" height="22" rx="3"/><text x="52.0" y="79.0" lang="ja">辨</text></g><g class="n v"><rect x="41.0" y="84.0" width="22" height="22" rx="3"/><text x="52.0" y="101.0" lang="ja">辯</text></g><g class="n g"><rect x="83.0" y="18.0" width="22" height="22" rx="3"/><text x="94.0" y="35.0" lang="zh-Hans">弁</text></g><g class="n g"><rect x="83.0" y="40.0" width="22" height="22" rx="3"/><text x="94.0" y="57.0" lang="zh-Hans">瓣</text></g><g class="n g"><rect x="83.0" y="62.0" width="22" height="22" rx="3"/><text x="94.0" y="79.0" lang="zh-Hans">辨</text></g><g class="n g"><rect x="83.0" y="84.0" width="22" height="22" rx="3"/><text x="94.0" y="101.0" lang="zh-Hans">辩</text></g><g class="n j"><rect x="-1.0" y="115.0" width="22" height="22" rx="3"/><text x="10.0" y="132.0" lang="ja">乾</text></g><g class="n j"><rect x="-1.0" y="137.0" width="22" height="22" rx="3"/><text x="10.0" y="154.0" lang="ja">干</text></g><g class="n j"><rect x="-1.0" y="159.0" width="22" height="22" rx="3"/><text x="10.0" y="176.0" lang="ja">幹</text></g><g class="n g"><rect x="83.0" y="126.0" width="22" height="22" rx="3"/><text x="94.0" y="143.0" lang="zh-Hans">乾</text></g><g class="n g"><rect x="83.0" y="148.0" width="22" height="22" rx="3"/><text x="94.0" y="165.0" lang="zh-Hans">干</text></g><g class="n j"><rect x="-1.0" y="190.0" width="22" height="22" rx="3"/><text x="10.0" y="207.0" lang="ja">復</text></g><g class="n j"><rect x="-1.0" y="212.0" width="22" height="22" rx="3"/><text x="10.0" y="229.0" lang="ja">複</text></g><g class="n j"><rect x="-1.0" y="234.0" width="22" height="22" rx="3"/><text x="10.0" y="251.0" lang="ja">覆</text></g><g class="n g"><rect x="83.0" y="201.0" width="22" height="22" rx="3"/><text x="94.0" y="218.0" lang="zh-Hans">复</text></g><g class="n g"><rect x="83.0" y="223.0" width="22" height="22" rx="3"/><text x="94.0" y="240.0" lang="zh-Hans">覆</text></g><g class="n j"><rect x="-1.0" y="265.0" width="22" height="22" rx="3"/><text x="10.0" y="282.0" lang="ja">了</text></g><g class="n j"><rect x="-1.0" y="287.0" width="22" height="22" rx="3"/><text x="10.0" y="304.0" lang="ja">瞭</text></g><g class="n g"><rect x="83.0" y="265.0" width="22" height="22" rx="3"/><text x="94.0" y="282.0" lang="zh-Hans">了</text></g><g class="n g"><rect x="83.0" y="287.0" width="22" height="22" rx="3"/><text x="94.0" y="304.0" lang="zh-Hans">瞭</text></g><g class="n j"><rect x="-1.0" y="318.0" width="22" height="22" rx="3"/><text x="10.0" y="335.0" lang="ja">升</text></g><g class="n j"><rect x="-1.0" y="340.0" width="22" height="22" rx="3"/><text x="10.0" y="357.0" lang="ja">昇</text></g><g class="n g"><rect x="83.0" y="318.0" width="22" height="22" rx="3"/><text x="94.0" y="335.0" lang="zh-Hans">升</text></g><g class="n g"><rect x="83.0" y="340.0" width="22" height="22" rx="3"/><text x="94.0" y="357.0" lang="zh-Hans">昇</text></g><g class="n j"><rect x="123.0" y="18.0" width="22" height="22" rx="3"/><text x="134.0" y="35.0" lang="ja">坂</text></g><g class="n j"><rect x="123.0" y="40.0" width="22" height="22" rx="3"/><text x="134.0" y="57.0" lang="ja">阪</text></g><g class="n g"><rect x="207.0" y="18.0" width="22" height="22" rx="3"/><text x="218.0" y="35.0" lang="zh-Hans">坂</text></g><g class="n g"><rect x="207.0" y="40.0" width="22" height="22" rx="3"/><text x="218.0" y="57.0" lang="zh-Hans">阪</text></g><g class="n j"><rect x="123.0" y="71.0" width="22" height="22" rx="3"/><text x="134.0" y="88.0" lang="ja">征</text></g><g class="n j"><rect x="123.0" y="93.0" width="22" height="22" rx="3"/><text x="134.0" y="110.0" lang="ja">徴</text></g><g class="n v"><rect x="165.0" y="71.0" width="22" height="22" rx="3"/><text x="176.0" y="88.0" lang="ja">征</text></g><g class="n v"><rect x="165.0" y="93.0" width="22" height="22" rx="3"/><text x="176.0" y="110.0" lang="ja">徵</text></g><g class="n g"><rect x="207.0" y="71.0" width="22" height="22" rx="3"/><text x="218.0" y="88.0" lang="zh-Hans">征</text></g><g class="n g"><rect x="207.0" y="93.0" width="22" height="22" rx="3"/><text x="218.0" y="110.0" lang="zh-Hans">徵</text></g><g class="n j"><rect x="123.0" y="124.0" width="22" height="22" rx="3"/><text x="134.0" y="141.0" lang="ja">氾</text></g><g class="n j"><rect x="123.0" y="146.0" width="22" height="22" rx="3"/><text x="134.0" y="163.0" lang="ja">汎</text></g><g class="n g"><rect x="207.0" y="124.0" width="22" height="22" rx="3"/><text x="218.0" y="141.0" lang="zh-Hans">氾</text></g><g class="n g"><rect x="207.0" y="146.0" width="22" height="22" rx="3"/><text x="218.0" y="163.0" lang="zh-Hans">泛</text></g><g class="n j"><rect x="123.0" y="177.0" width="22" height="22" rx="3"/><text x="134.0" y="194.0" lang="ja">着</text></g><g class="n j"><rect x="123.0" y="199.0" width="22" height="22" rx="3"/><text x="134.0" y="216.0" lang="ja">著</text></g><g class="n g"><rect x="207.0" y="177.0" width="22" height="22" rx="3"/><text x="218.0" y="194.0" lang="zh-Hans">着</text></g><g class="n g"><rect x="207.0" y="199.0" width="22" height="22" rx="3"/><text x="218.0" y="216.0" lang="zh-Hans">著</text></g><g class="n j"><rect x="123.0" y="241.0" width="22" height="22" rx="3"/><text x="134.0" y="258.0" lang="ja">閑</text></g><g class="n j"><rect x="123.0" y="263.0" width="22" height="22" rx="3"/><text x="134.0" y="280.0" lang="ja">間</text></g><g class="n v"><rect x="165.0" y="230.0" width="22" height="22" rx="3"/><text x="176.0" y="247.0" lang="ja">閑</text></g><g class="n v"><rect x="165.0" y="252.0" width="22" height="22" rx="3"/><text x="176.0" y="269.0" lang="ja">閒</text></g><g class="n v"><rect x="165.0" y="274.0" width="22" height="22" rx="3"/><text x="176.0" y="291.0" lang="ja">間</text></g><g class="n g"><rect x="207.0" y="241.0" width="22" height="22" rx="3"/><text x="218.0" y="258.0" lang="zh-Hans">闲</text></g><g class="n g"><rect x="207.0" y="263.0" width="22" height="22" rx="3"/><text x="218.0" y="280.0" lang="zh-Hans">间</text></g><g class="n j"><rect x="123.0" y="305.0" width="22" height="22" rx="3"/><text x="134.0" y="322.0" lang="ja">並</text></g><g class="n j"><rect x="123.0" y="327.0" width="22" height="22" rx="3"/><text x="134.0" y="344.0" lang="ja">併</text></g><g class="n g"><rect x="207.0" y="316.0" width="22" height="22" rx="3"/><text x="218.0" y="333.0" lang="zh-Hans">并</text></g><g class="n j"><rect x="123.0" y="369.0" width="22" height="22" rx="3"/><text x="134.0" y="386.0" lang="ja">予</text></g><g class="n v"><rect x="165.0" y="358.0" width="22" height="22" rx="3"/><text x="176.0" y="375.0" lang="ja">予</text></g><g class="n v"><rect x="165.0" y="380.0" width="22" height="22" rx="3"/><text x="176.0" y="397.0" lang="ja">豫</text></g><g class="n g"><rect x="207.0" y="358.0" width="22" height="22" rx="3"/><text x="218.0" y="375.0" lang="zh-Hans">予</text></g><g class="n g"><rect x="207.0" y="380.0" width="22" height="22" rx="3"/><text x="218.0" y="397.0" lang="zh-Hans">豫</text></g><g class="n j"><rect x="247.0" y="18.0" width="22" height="22" rx="3"/><text x="258.0" y="35.0" lang="ja">係</text></g><g class="n j"><rect x="247.0" y="40.0" width="22" height="22" rx="3"/><text x="258.0" y="57.0" lang="ja">系</text></g><g class="n g"><rect x="331.0" y="29.0" width="22" height="22" rx="3"/><text x="342.0" y="46.0" lang="zh-Hans">系</text></g><g class="n j"><rect x="247.0" y="71.0" width="22" height="22" rx="3"/><text x="258.0" y="88.0" lang="ja">個</text></g><g class="n j"><rect x="247.0" y="93.0" width="22" height="22" rx="3"/><text x="258.0" y="110.0" lang="ja">箇</text></g><g class="n g"><rect x="331.0" y="82.0" width="22" height="22" rx="3"/><text x="342.0" y="99.0" lang="zh-Hans">个</text></g><g class="n j"><rect x="247.0" y="124.0" width="22" height="22" rx="3"/><text x="258.0" y="141.0" lang="ja">働</text></g><g class="n j"><rect x="247.0" y="146.0" width="22" height="22" rx="3"/><text x="258.0" y="163.0" lang="ja">動</text></g><g class="n g"><rect x="331.0" y="135.0" width="22" height="22" rx="3"/><text x="342.0" y="152.0" lang="zh-Hans">动</text></g><g class="n j"><rect x="247.0" y="177.0" width="22" height="22" rx="3"/><text x="258.0" y="194.0" lang="ja">准</text></g><g class="n j"><rect x="247.0" y="199.0" width="22" height="22" rx="3"/><text x="258.0" y="216.0" lang="ja">準</text></g><g class="n g"><rect x="331.0" y="188.0" width="22" height="22" rx="3"/><text x="342.0" y="205.0" lang="zh-Hans">准</text></g><g class="n j"><rect x="247.0" y="230.0" width="22" height="22" rx="3"/><text x="258.0" y="247.0" lang="ja">制</text></g><g class="n j"><rect x="247.0" y="252.0" width="22" height="22" rx="3"/><text x="258.0" y="269.0" lang="ja">製</text></g><g class="n g"><rect x="331.0" y="241.0" width="22" height="22" rx="3"/><text x="342.0" y="258.0" lang="zh-Hans">制</text></g><g class="n j"><rect x="247.0" y="294.0" width="22" height="22" rx="3"/><text x="258.0" y="311.0" lang="ja">参</text></g><g class="n v"><rect x="289.0" y="283.0" width="22" height="22" rx="3"/><text x="300.0" y="300.0" lang="ja">叁</text></g><g class="n v"><rect x="289.0" y="305.0" width="22" height="22" rx="3"/><text x="300.0" y="322.0" lang="ja">参</text></g><g class="n g"><rect x="331.0" y="283.0" width="22" height="22" rx="3"/><text x="342.0" y="300.0" lang="zh-Hans">叁</text></g><g class="n g"><rect x="331.0" y="305.0" width="22" height="22" rx="3"/><text x="342.0" y="322.0" lang="zh-Hans">参</text></g><g class="n j"><rect x="247.0" y="336.0" width="22" height="22" rx="3"/><text x="258.0" y="353.0" lang="ja">后</text></g><g class="n j"><rect x="247.0" y="358.0" width="22" height="22" rx="3"/><text x="258.0" y="375.0" lang="ja">後</text></g><g class="n g"><rect x="331.0" y="347.0" width="22" height="22" rx="3"/><text x="342.0" y="364.0" lang="zh-Hans">后</text></g><g class="n j"><rect x="371.0" y="18.0" width="22" height="22" rx="3"/><text x="382.0" y="35.0" lang="ja">周</text></g><g class="n j"><rect x="371.0" y="40.0" width="22" height="22" rx="3"/><text x="382.0" y="57.0" lang="ja">週</text></g><g class="n g"><rect x="455.0" y="29.0" width="22" height="22" rx="3"/><text x="466.0" y="46.0" lang="zh-Hans">周</text></g><g class="n j"><rect x="371.0" y="71.0" width="22" height="22" rx="3"/><text x="382.0" y="88.0" lang="ja">咲</text></g><g class="n j"><rect x="371.0" y="93.0" width="22" height="22" rx="3"/><text x="382.0" y="110.0" lang="ja">笑</text></g><g class="n g"><rect x="455.0" y="82.0" width="22" height="22" rx="3"/><text x="466.0" y="99.0" lang="zh-Hans">笑</text></g><g class="n j"><rect x="371.0" y="124.0" width="22" height="22" rx="3"/><text x="382.0" y="141.0" lang="ja">娘</text></g><g class="n j"><rect x="371.0" y="146.0" width="22" height="22" rx="3"/><text x="382.0" y="163.0" lang="ja">嬢</text></g><g class="n v"><rect x="413.0" y="124.0" width="22" height="22" rx="3"/><text x="424.0" y="141.0" lang="ja">娘</text></g><g class="n v"><rect x="413.0" y="146.0" width="22" height="22" rx="3"/><text x="424.0" y="163.0" lang="ja">孃</text></g><g class="n g"><rect x="455.0" y="135.0" width="22" height="22" rx="3"/><text x="466.0" y="152.0" lang="zh-Hans">娘</text></g><g class="n j"><rect x="371.0" y="177.0" width="22" height="22" rx="3"/><text x="382.0" y="194.0" lang="ja">志</text></g><g class="n j"><rect x="371.0" y="199.0" width="22" height="22" rx="3"/><text x="382.0" y="216.0" lang="ja">誌</text></g><g class="n g"><rect x="455.0" y="188.0" width="22" height="22" rx="3"/><text x="466.0" y="205.0" lang="zh-Hans">志</text></g><g class="n j"><rect x="371.0" y="230.0" width="22" height="22" rx="3"/><text x="382.0" y="247.0" lang="ja">拠</text></g><g class="n j"><rect x="371.0" y="252.0" width="22" height="22" rx="3"/><text x="382.0" y="269.0" lang="ja">据</text></g><g class="n v"><rect x="413.0" y="230.0" width="22" height="22" rx="3"/><text x="424.0" y="247.0" lang="ja">據</text></g><g class="n v"><rect x="413.0" y="252.0" width="22" height="22" rx="3"/><text x="424.0" y="269.0" lang="ja">据</text></g><g class="n g"><rect x="455.0" y="241.0" width="22" height="22" rx="3"/><text x="466.0" y="258.0" lang="zh-Hans">据</text></g><g class="n j"><rect x="371.0" y="283.0" width="22" height="22" rx="3"/><text x="382.0" y="300.0" lang="ja">捨</text></g><g class="n j"><rect x="371.0" y="305.0" width="22" height="22" rx="3"/><text x="382.0" y="322.0" lang="ja">舎</text></g><g class="n v"><rect x="413.0" y="283.0" width="22" height="22" rx="3"/><text x="424.0" y="300.0" lang="ja">捨</text></g><g class="n v"><rect x="413.0" y="305.0" width="22" height="22" rx="3"/><text x="424.0" y="322.0" lang="ja">舍</text></g><g class="n g"><rect x="455.0" y="294.0" width="22" height="22" rx="3"/><text x="466.0" y="311.0" lang="zh-Hans">舍</text></g><g class="n j"><rect x="495.0" y="18.0" width="22" height="22" rx="3"/><text x="506.0" y="35.0" lang="ja">採</text></g><g class="n j"><rect x="495.0" y="40.0" width="22" height="22" rx="3"/><text x="506.0" y="57.0" lang="ja">采</text></g><g class="n g"><rect x="579.0" y="29.0" width="22" height="22" rx="3"/><text x="590.0" y="46.0" lang="zh-Hans">采</text></g><g class="n j"><rect x="495.0" y="71.0" width="22" height="22" rx="3"/><text x="506.0" y="88.0" lang="ja">斗</text></g><g class="n j"><rect x="495.0" y="93.0" width="22" height="22" rx="3"/><text x="506.0" y="110.0" lang="ja">闘</text></g><g class="n v"><rect x="537.0" y="71.0" width="22" height="22" rx="3"/><text x="548.0" y="88.0" lang="ja">斗</text></g><g class="n v"><rect x="537.0" y="93.0" width="22" height="22" rx="3"/><text x="548.0" y="110.0" lang="ja">鬭</text></g><g class="n g"><rect x="579.0" y="82.0" width="22" height="22" rx="3"/><text x="590.0" y="99.0" lang="zh-Hans">斗</text></g><g class="n j"><rect x="495.0" y="124.0" width="22" height="22" rx="3"/><text x="506.0" y="141.0" lang="ja">暗</text></g><g class="n j"><rect x="495.0" y="146.0" width="22" height="22" rx="3"/><text x="506.0" y="163.0" lang="ja">闇</text></g><g class="n g"><rect x="579.0" y="135.0" width="22" height="22" rx="3"/><text x="590.0" y="152.0" lang="zh-Hans">暗</text></g><g class="n j"><rect x="495.0" y="177.0" width="22" height="22" rx="3"/><text x="506.0" y="194.0" lang="ja">暦</text></g><g class="n j"><rect x="495.0" y="199.0" width="22" height="22" rx="3"/><text x="506.0" y="216.0" lang="ja">歴</text></g><g class="n v"><rect x="537.0" y="177.0" width="22" height="22" rx="3"/><text x="548.0" y="194.0" lang="ja">曆</text></g><g class="n v"><rect x="537.0" y="199.0" width="22" height="22" rx="3"/><text x="548.0" y="216.0" lang="ja">歴</text></g><g class="n g"><rect x="579.0" y="188.0" width="22" height="22" rx="3"/><text x="590.0" y="205.0" lang="zh-Hans">历</text></g><g class="n j"><rect x="495.0" y="230.0" width="22" height="22" rx="3"/><text x="506.0" y="247.0" lang="ja">机</text></g><g class="n j"><rect x="495.0" y="252.0" width="22" height="22" rx="3"/><text x="506.0" y="269.0" lang="ja">機</text></g><g class="n g"><rect x="579.0" y="241.0" width="22" height="22" rx="3"/><text x="590.0" y="258.0" lang="zh-Hans">机</text></g><g class="n j"><rect x="495.0" y="283.0" width="22" height="22" rx="3"/><text x="506.0" y="300.0" lang="ja">果</text></g><g class="n j"><rect x="495.0" y="305.0" width="22" height="22" rx="3"/><text x="506.0" y="322.0" lang="ja">菓</text></g><g class="n g"><rect x="579.0" y="294.0" width="22" height="22" rx="3"/><text x="590.0" y="311.0" lang="zh-Hans">果</text></g><g class="n j"><rect x="495.0" y="336.0" width="22" height="22" rx="3"/><text x="506.0" y="353.0" lang="ja">棋</text></g><g class="n j"><rect x="495.0" y="358.0" width="22" height="22" rx="3"/><text x="506.0" y="375.0" lang="ja">碁</text></g><g class="n g"><rect x="579.0" y="347.0" width="22" height="22" rx="3"/><text x="590.0" y="364.0" lang="zh-Hans">棋</text></g><g class="n j"><rect x="619.0" y="29.0" width="22" height="22" rx="3"/><text x="630.0" y="46.0" lang="ja">欠</text></g><g class="n v"><rect x="661.0" y="18.0" width="22" height="22" rx="3"/><text x="672.0" y="35.0" lang="ja">欠</text></g><g class="n v"><rect x="661.0" y="40.0" width="22" height="22" rx="3"/><text x="672.0" y="57.0" lang="ja">缺</text></g><g class="n g"><rect x="703.0" y="18.0" width="22" height="22" rx="3"/><text x="714.0" y="35.0" lang="zh-Hans">欠</text></g><g class="n g"><rect x="703.0" y="40.0" width="22" height="22" rx="3"/><text x="714.0" y="57.0" lang="zh-Hans">缺</text></g><g class="n j"><rect x="619.0" y="71.0" width="22" height="22" rx="3"/><text x="630.0" y="88.0" lang="ja">沖</text></g><g class="n j"><rect x="619.0" y="93.0" width="22" height="22" rx="3"/><text x="630.0" y="110.0" lang="ja">衝</text></g><g class="n g"><rect x="703.0" y="82.0" width="22" height="22" rx="3"/><text x="714.0" y="99.0" lang="zh-Hans">冲</text></g><g class="n j"><rect x="619.0" y="135.0" width="22" height="22" rx="3"/><text x="630.0" y="152.0" lang="ja">浜</text></g><g class="n v"><rect x="661.0" y="124.0" width="22" height="22" rx="3"/><text x="672.0" y="141.0" lang="ja">浜</text></g><g class="n v"><rect x="661.0" y="146.0" width="22" height="22" rx="3"/><text x="672.0" y="163.0" lang="ja">濱</text></g><g class="n g"><rect x="703.0" y="124.0" width="22" height="22" rx="3"/><text x="714.0" y="141.0" lang="zh-Hans">浜</text></g><g class="n g"><rect x="703.0" y="146.0" width="22" height="22" rx="3"/><text x="714.0" y="163.0" lang="zh-Hans">滨</text></g><g class="n j"><rect x="619.0" y="177.0" width="22" height="22" rx="3"/><text x="630.0" y="194.0" lang="ja">獲</text></g><g class="n j"><rect x="619.0" y="199.0" width="22" height="22" rx="3"/><text x="630.0" y="216.0" lang="ja">穫</text></g><g class="n g"><rect x="703.0" y="188.0" width="22" height="22" rx="3"/><text x="714.0" y="205.0" lang="zh-Hans">获</text></g><g class="n j"><rect x="619.0" y="230.0" width="22" height="22" rx="3"/><text x="630.0" y="247.0" lang="ja">発</text></g><g class="n j"><rect x="619.0" y="252.0" width="22" height="22" rx="3"/><text x="630.0" y="269.0" lang="ja">髪</text></g><g class="n v"><rect x="661.0" y="230.0" width="22" height="22" rx="3"/><text x="672.0" y="247.0" lang="ja">發</text></g><g class="n v"><rect x="661.0" y="252.0" width="22" height="22" rx="3"/><text x="672.0" y="269.0" lang="ja">髮</text></g><g class="n g"><rect x="703.0" y="241.0" width="22" height="22" rx="3"/><text x="714.0" y="258.0" lang="zh-Hans">发</text></g><g class="n j"><rect x="619.0" y="294.0" width="22" height="22" rx="3"/><text x="630.0" y="311.0" lang="ja">秘</text></g><g class="n v"><rect x="661.0" y="283.0" width="22" height="22" rx="3"/><text x="672.0" y="300.0" lang="ja">祕</text></g><g class="n v"><rect x="661.0" y="305.0" width="22" height="22" rx="3"/><text x="672.0" y="322.0" lang="ja">秘</text></g><g class="n g"><rect x="703.0" y="283.0" width="22" height="22" rx="3"/><text x="714.0" y="300.0" lang="zh-Hans">祕</text></g><g class="n g"><rect x="703.0" y="305.0" width="22" height="22" rx="3"/><text x="714.0" y="322.0" lang="zh-Hans">秘</text></g><g class="n j"><rect x="619.0" y="336.0" width="22" height="22" rx="3"/><text x="630.0" y="353.0" lang="ja">穀</text></g><g class="n j"><rect x="619.0" y="358.0" width="22" height="22" rx="3"/><text x="630.0" y="375.0" lang="ja">谷</text></g><g class="n g"><rect x="703.0" y="347.0" width="22" height="22" rx="3"/><text x="714.0" y="364.0" lang="zh-Hans">谷</text></g><g class="n j"><rect x="743.0" y="29.0" width="22" height="22" rx="3"/><text x="754.0" y="46.0" lang="ja">線</text></g><g class="n g"><rect x="827.0" y="18.0" width="22" height="22" rx="3"/><text x="838.0" y="35.0" lang="zh-Hans">线</text></g><g class="n g"><rect x="827.0" y="40.0" width="22" height="22" rx="3"/><text x="838.0" y="57.0" lang="zh-Hans">缐</text></g><g class="n j"><rect x="743.0" y="71.0" width="22" height="22" rx="3"/><text x="754.0" y="88.0" lang="ja">緻</text></g><g class="n j"><rect x="743.0" y="93.0" width="22" height="22" rx="3"/><text x="754.0" y="110.0" lang="ja">致</text></g><g class="n g"><rect x="827.0" y="82.0" width="22" height="22" rx="3"/><text x="838.0" y="99.0" lang="zh-Hans">致</text></g><g class="n j"><rect x="743.0" y="135.0" width="22" height="22" rx="3"/><text x="754.0" y="152.0" lang="ja">缶</text></g><g class="n v"><rect x="785.0" y="124.0" width="22" height="22" rx="3"/><text x="796.0" y="141.0" lang="ja">缶</text></g><g class="n v"><rect x="785.0" y="146.0" width="22" height="22" rx="3"/><text x="796.0" y="163.0" lang="ja">罐</text></g><g class="n g"><rect x="827.0" y="124.0" width="22" height="22" rx="3"/><text x="838.0" y="141.0" lang="zh-Hans">缶</text></g><g class="n g"><rect x="827.0" y="146.0" width="22" height="22" rx="3"/><text x="838.0" y="163.0" lang="zh-Hans">罐</text></g><g class="n j"><rect x="743.0" y="177.0" width="22" height="22" rx="3"/><text x="754.0" y="194.0" lang="ja">脅</text></g><g class="n j"><rect x="743.0" y="199.0" width="22" height="22" rx="3"/><text x="754.0" y="216.0" lang="ja">脇</text></g><g class="n g"><rect x="827.0" y="188.0" width="22" height="22" rx="3"/><text x="838.0" y="205.0" lang="zh-Hans">胁</text></g><g class="n j"><rect x="743.0" y="241.0" width="22" height="22" rx="3"/><text x="754.0" y="258.0" lang="ja">芸</text></g><g class="n v"><rect x="785.0" y="230.0" width="22" height="22" rx="3"/><text x="796.0" y="247.0" lang="ja">藝</text></g><g class="n v"><rect x="785.0" y="252.0" width="22" height="22" rx="3"/><text x="796.0" y="269.0" lang="ja">芸</text></g><g class="n g"><rect x="827.0" y="230.0" width="22" height="22" rx="3"/><text x="838.0" y="247.0" lang="zh-Hans">艺</text></g><g class="n g"><rect x="827.0" y="252.0" width="22" height="22" rx="3"/><text x="838.0" y="269.0" lang="zh-Hans">芸</text></g><g class="n j"><rect x="743.0" y="283.0" width="22" height="22" rx="3"/><text x="754.0" y="300.0" lang="ja">裏</text></g><g class="n j"><rect x="743.0" y="305.0" width="22" height="22" rx="3"/><text x="754.0" y="322.0" lang="ja">里</text></g><g class="n g"><rect x="827.0" y="294.0" width="22" height="22" rx="3"/><text x="838.0" y="311.0" lang="zh-Hans">里</text></g><g class="n j"><rect x="743.0" y="336.0" width="22" height="22" rx="3"/><text x="754.0" y="353.0" lang="ja">面</text></g><g class="n j"><rect x="743.0" y="358.0" width="22" height="22" rx="3"/><text x="754.0" y="375.0" lang="ja">麺</text></g><g class="n v"><rect x="785.0" y="336.0" width="22" height="22" rx="3"/><text x="796.0" y="353.0" lang="ja">面</text></g><g class="n v"><rect x="785.0" y="358.0" width="22" height="22" rx="3"/><text x="796.0" y="375.0" lang="ja">麵</text></g><g class="n g"><rect x="827.0" y="347.0" width="22" height="22" rx="3"/><text x="838.0" y="364.0" lang="zh-Hans">面</text></g>
</svg>
<ul class="rellegend">
<li><i class="kangxi"></i>常用漢字表の康熙字典体</li>
<li><i class="mj"></i>MJ縮退マップ</li>
<li><i class="manual"></i>手で足した組</li>
<li><i class="tghb"></i>通用規範漢字表の異体字表</li>
<li><i class="ksimp"></i>Unihan kSimplifiedVariantのみ</li>
<li><i class="same"></i>同じ字</li>
</ul>
</div>
</div>

<!--
5:30–6:25

つないだ結果は、いつも1対1になるとは限りません。今の例のように、二つの常用漢字が一つの規範字につながることもあります。1対1になっていない組を集めてみると、2つの表をつなげたものがどういう様子になっているのかが見えてきます。常用漢字の弁は、四つの規範字に分かれます。線の色は、経由した資料です。たとえば点線は、Unihanの簡体字関係を材料にしたことで入った関係です。転覆の覆は、中国の規範字表ではそはそのままの形ですが、Unihanの関係を使ったので、復活の復や複数の複と同じ簡体字にもつながっています。繋ぐ前の表の作り方で、結果も変わることが分かると思います。

***

（2,145組のうち、常用漢字か規範字のどちらかが2回以上出てくる105組を、つながりごとに46のかたまりにした図。左から常用漢字、経由した異体字、規範字。一つひとつを読むための図ではなく、1対多（弁→弁・瓣・辨・辩）、多対1（復・複・覆→复）、両方（乾・干・幹と乾・干）があることを示す図。）
（エッジの色は対応の出自。規範字へのエッジは、通用規範漢字表の異体字表にあればその色、kSimplifiedVariantにしかないものは別の色にした（両方にあるものが多い）。日本側で経由した異体字は、康熙字典体・MJ縮退マップ・手で足した組のいずれか。この105組ではkZVariantを経由した組はなかった。各組は最短の経路だけを描いた。）
（目立つ出自：間→閒はMJ縮退マップ、参→叁もMJ縮退マップ、沖→冲・著→着・覆→复はkSimplifiedVariantだけにある。舎→舍は手で足した組。）
（覆：通用規範漢字表では覆は覆のまま規範字（3440番、18画）で、复の繁体字は復・複だけ。UnihanのkSimplifiedVariantは覆に复と覆の両方を挙げる。質疑用：1964年の簡化字総表では覆も复にまとめられ、1986年の改訂で覆に戻ったと記憶している（未確認）。）
注：jgquery.sqlの各段を出自付きで出力し直して作図（Mojidata moji.db 2026-10-10ビルド、2026-10-12実行）。
-->

---

<p class="recall">① 新字体より画数が多い簡体字は？<span class="en">Simplified characters with more strokes than shinjitai?</span><span class="step">ステップ2の結果<span class="en">Step 2 result</span></span></p>

# 常用漢字と規範字の対応表は、2,145組になる

<p class="en">The table has 2,145 Jōyō–Chinese standard pairs</p>

<div class="body">
<div class="result84 table1">
<div><span class="han" lang="ja">一</span><i>1</i><span class="ar">→</span><span class="han" lang="zh-Hans">一</span><b>1</b></div>
<div><span class="han" lang="ja">丁</span><i>2</i><span class="ar">→</span><span class="han" lang="zh-Hans">丁</span><b>2</b></div>
<div><span class="han" lang="ja">七</span><i>2</i><span class="ar">→</span><span class="han" lang="zh-Hans">七</span><b>2</b></div>
<div><span class="han" lang="ja">万</span><i>3</i><span class="ar">→</span><span class="han" lang="zh-Hans">万</span><b>3</b></div>
<div><span class="han" lang="ja">丈</span><i>3</i><span class="ar">→</span><span class="han" lang="zh-Hans">丈</span><b>3</b></div>
<div><span class="han" lang="ja">三</span><i>3</i><span class="ar">→</span><span class="han" lang="zh-Hans">三</span><b>3</b></div>
<div><span class="han" lang="ja">上</span><i>3</i><span class="ar">→</span><span class="han" lang="zh-Hans">上</span><b>3</b></div>
<div><span class="han" lang="ja">下</span><i>3</i><span class="ar">→</span><span class="han" lang="zh-Hans">下</span><b>3</b></div>
<div><span class="han" lang="ja">不</span><i>4</i><span class="ar">→</span><span class="han" lang="zh-Hans">不</span><b>4</b></div>
<div><span class="han" lang="ja">与</span><i>3</i><span class="ar">→</span><span class="han" lang="zh-Hans">与</span><b>3</b></div>
<div><span class="han" lang="ja">且</span><i>5</i><span class="ar">→</span><span class="han" lang="zh-Hans">且</span><b>5</b></div>
<div><span class="han" lang="ja">世</span><i>5</i><span class="ar">→</span><span class="han" lang="zh-Hans">世</span><b>5</b></div>
<div><span class="han" lang="ja">丘</span><i>5</i><span class="ar">→</span><span class="han" lang="zh-Hans">丘</span><b>5</b></div>
<div><span class="han" lang="ja">丙</span><i>5</i><span class="ar">→</span><span class="han" lang="zh-Hans">丙</span><b>5</b></div>
<div><span class="han" lang="ja">両</span><i>6</i><span class="ar">→</span><span class="han" lang="zh-Hans">两</span><b>7</b></div>
<div><span class="han" lang="ja">並</span><i>8</i><span class="ar">→</span><span class="han" lang="zh-Hans">并</span><b>6</b></div>
<div><span class="han" lang="ja">中</span><i>4</i><span class="ar">→</span><span class="han" lang="zh-Hans">中</span><b>4</b></div>
<div><span class="han" lang="ja">串</span><i>7</i><span class="ar">→</span><span class="han" lang="zh-Hans">串</span><b>7</b></div>
<div><span class="han" lang="ja">丸</span><i>3</i><span class="ar">→</span><span class="han" lang="zh-Hans">丸</span><b>3</b></div>
<div><span class="han" lang="ja">丹</span><i>4</i><span class="ar">→</span><span class="han" lang="zh-Hans">丹</span><b>4</b></div>
<div><span class="han" lang="ja">主</span><i>5</i><span class="ar">→</span><span class="han" lang="zh-Hans">主</span><b>5</b></div>
<div><span class="han" lang="ja">久</span><i>3</i><span class="ar">→</span><span class="han" lang="zh-Hans">久</span><b>3</b></div>
<div><span class="han" lang="ja">乏</span><i>5</i><span class="ar">→</span><span class="han" lang="zh-Hans">乏</span><b>4</b></div>
<div><span class="han" lang="ja">乗</span><i>9</i><span class="ar">→</span><span class="han" lang="zh-Hans">乘</span><b>10</b></div>
<div><span class="han" lang="ja">乙</span><i>1</i><span class="ar">→</span><span class="han" lang="zh-Hans">乙</span><b>1</b></div>
<div><span class="han" lang="ja">九</span><i>2</i><span class="ar">→</span><span class="han" lang="zh-Hans">九</span><b>2</b></div>
<div><span class="han" lang="ja">乞</span><i>3</i><span class="ar">→</span><span class="han" lang="zh-Hans">乞</span><b>3</b></div>
<div><span class="han" lang="ja">乱</span><i>7</i><span class="ar">→</span><span class="han" lang="zh-Hans">乱</span><b>7</b></div>
<div><span class="han" lang="ja">乳</span><i>8</i><span class="ar">→</span><span class="han" lang="zh-Hans">乳</span><b>8</b></div>
<div class="hl"><span class="han" lang="ja">乾</span><i>11</i><span class="ar">→</span><span class="han" lang="zh-Hans">乾</span><b>11</b></div>
<div class="hl"><span class="han" lang="ja">乾</span><i>11</i><span class="ar">→</span><span class="han" lang="zh-Hans">干</span><b>3</b></div>
<div><span class="han" lang="ja">亀</span><i>11</i><span class="ar">→</span><span class="han" lang="zh-Hans">龟</span><b>7</b></div>
<div><span class="han" lang="ja">了</span><i>2</i><span class="ar">→</span><span class="han" lang="zh-Hans">了</span><b>2</b></div>
<div class="hl"><span class="han" lang="ja">予</span><i>4</i><span class="ar">→</span><span class="han" lang="zh-Hans">予</span><b>4</b></div>
<div class="hl"><span class="han" lang="ja">予</span><i>4</i><span class="ar">→</span><span class="han" lang="zh-Hans">豫</span><b>15</b></div>
<div><span class="han" lang="ja">争</span><i>6</i><span class="ar">→</span><span class="han" lang="zh-Hans">争</span><b>6</b></div>
<div><span class="han" lang="ja">事</span><i>8</i><span class="ar">→</span><span class="han" lang="zh-Hans">事</span><b>8</b></div>
<div><span class="han" lang="ja">二</span><i>2</i><span class="ar">→</span><span class="han" lang="zh-Hans">二</span><b>2</b></div>
<div><span class="han" lang="ja">互</span><i>4</i><span class="ar">→</span><span class="han" lang="zh-Hans">互</span><b>4</b></div>
<div><span class="han" lang="ja">五</span><i>4</i><span class="ar">→</span><span class="han" lang="zh-Hans">五</span><b>4</b></div>
<div><span class="han" lang="ja">井</span><i>4</i><span class="ar">→</span><span class="han" lang="zh-Hans">井</span><b>4</b></div>
<div><span class="han" lang="ja">亜</span><i>7</i><span class="ar">→</span><span class="han" lang="zh-Hans">亚</span><b>6</b></div>
<div><span class="han" lang="ja">亡</span><i>3</i><span class="ar">→</span><span class="han" lang="zh-Hans">亡</span><b>3</b></div>
<div><span class="han" lang="ja">交</span><i>6</i><span class="ar">→</span><span class="han" lang="zh-Hans">交</span><b>6</b></div>
<div><span class="han" lang="ja">享</span><i>8</i><span class="ar">→</span><span class="han" lang="zh-Hans">享</span><b>8</b></div>
<div><span class="han" lang="ja">京</span><i>8</i><span class="ar">→</span><span class="han" lang="zh-Hans">京</span><b>8</b></div>
<div><span class="han" lang="ja">亭</span><i>9</i><span class="ar">→</span><span class="han" lang="zh-Hans">亭</span><b>9</b></div>
<div><span class="han" lang="ja">人</span><i>2</i><span class="ar">→</span><span class="han" lang="zh-Hans">人</span><b>2</b></div>
<div><span class="han" lang="ja">仁</span><i>4</i><span class="ar">→</span><span class="han" lang="zh-Hans">仁</span><b>4</b></div>
<div><span class="han" lang="ja">今</span><i>4</i><span class="ar">→</span><span class="han" lang="zh-Hans">今</span><b>4</b></div>
<div><span class="han" lang="ja">介</span><i>4</i><span class="ar">→</span><span class="han" lang="zh-Hans">介</span><b>4</b></div>
<div><span class="han" lang="ja">仏</span><i>4</i><span class="ar">→</span><span class="han" lang="zh-Hans">佛</span><b>7</b></div>
<div><span class="han" lang="ja">仕</span><i>5</i><span class="ar">→</span><span class="han" lang="zh-Hans">仕</span><b>5</b></div>
<div><span class="han" lang="ja">他</span><i>5</i><span class="ar">→</span><span class="han" lang="zh-Hans">他</span><b>5</b></div>
<div><span class="han" lang="ja">付</span><i>5</i><span class="ar">→</span><span class="han" lang="zh-Hans">付</span><b>5</b></div>
<div><span class="han" lang="ja">仙</span><i>5</i><span class="ar">→</span><span class="han" lang="zh-Hans">仙</span><b>5</b></div>
<div><span class="han" lang="ja">代</span><i>5</i><span class="ar">→</span><span class="han" lang="zh-Hans">代</span><b>5</b></div>
<div><span class="han" lang="ja">令</span><i>5</i><span class="ar">→</span><span class="han" lang="zh-Hans">令</span><b>5</b></div>
<div><span class="han" lang="ja">以</span><i>5</i><span class="ar">→</span><span class="han" lang="zh-Hans">以</span><b>4</b></div>
<div><span class="han" lang="ja">仮</span><i>6</i><span class="ar">→</span><span class="han" lang="zh-Hans">假</span><b>11</b></div>
<div><span class="han" lang="ja">仰</span><i>6</i><span class="ar">→</span><span class="han" lang="zh-Hans">仰</span><b>6</b></div>
<div><span class="han" lang="ja">仲</span><i>6</i><span class="ar">→</span><span class="han" lang="zh-Hans">仲</span><b>6</b></div>
<div><span class="han" lang="ja">件</span><i>6</i><span class="ar">→</span><span class="han" lang="zh-Hans">件</span><b>6</b></div>
<div><span class="han" lang="ja">任</span><i>6</i><span class="ar">→</span><span class="han" lang="zh-Hans">任</span><b>6</b></div>
<div><span class="han" lang="ja">企</span><i>6</i><span class="ar">→</span><span class="han" lang="zh-Hans">企</span><b>6</b></div>
<div><span class="han" lang="ja">伎</span><i>6</i><span class="ar">→</span><span class="han" lang="zh-Hans">伎</span><b>6</b></div>
<div><span class="han" lang="ja">伏</span><i>6</i><span class="ar">→</span><span class="han" lang="zh-Hans">伏</span><b>6</b></div>
<div><span class="han" lang="ja">伐</span><i>6</i><span class="ar">→</span><span class="han" lang="zh-Hans">伐</span><b>6</b></div>
<div><span class="han" lang="ja">休</span><i>6</i><span class="ar">→</span><span class="han" lang="zh-Hans">休</span><b>6</b></div>
<div><span class="han" lang="ja">会</span><i>6</i><span class="ar">→</span><span class="han" lang="zh-Hans">会</span><b>6</b></div>
<div><span class="han" lang="ja">伝</span><i>6</i><span class="ar">→</span><span class="han" lang="zh-Hans">传</span><b>6</b></div>
<div><span class="han" lang="ja">伯</span><i>7</i><span class="ar">→</span><span class="han" lang="zh-Hans">伯</span><b>7</b></div>
<div class="more"><span class="fn">画数：常用漢字はMJ文字情報一覧表、規範字は通用規範漢字表による<span class="en">Stroke counts: Jōyō from the MJ list, Chinese from the Common Standard list</span></span><span>… 全2,145組 <span class="en">2,145 pairs in all</span></span></div>
</div>
</div>

<!--
6:25–6:45

こうしてできた対応表の全体は、2,145組になりました。ほとんどは、日本と中国で同じ字どうしの組です。乾や予のように1対1になっていない組は、ごく一部です。

***

（答えの前に、対応表そのものを見せるスライド。条件で絞る前なので、一・一のように同じ字の組がほとんど。乾→乾・干、予→予・豫のように一つの常用漢字に複数の規範字が付くこともある。画数はまだ比べていない。）
（対応表は、jgquery.sqlから最後の`WHERE 総画数 < 笔画`だけを外して実行したもの。2,465行のうち、規範字が見つからなかった320行を除いた2,145組。常用漢字2,136字のうち、峠・捗・扱・堀・匂・枠・塀・込・畑・丼・栃の11字には規範字が見つからなかった（2026-10-13に、どの行にも規範字が付かない常用漢字を数え直して同じ11字）。規範字が付く常用漢字は2,125字で、乾・予のように二つ以上付く字があるので2,145組になる。）
（質疑用：11字のうち、峠・匂・枠・込・畑・栃・塀は日本で作られた国字で、中国に対応する字がない。丼・扱・捗・堀は中国にも字はあるが、別の意味やまれな字として使われ、規範字表に載っていないと思われる。分類は記憶によるもので未確認。並びはクエリの出力順で、先頭72組を載せた。）
注：Mojidata packages/mojidata/dist/moji.db（2026-10-10ビルド）を sqlite3 3.45.1 で読み取り専用に開き、jgquery.sqlからWHERE句だけを外して実行（2026-10-12）。13枚目の書き直したSQLからWHEREを外すと、規範字のない行は最初から出ず2,145行になり、先頭72組の並びも同じ（2026-10-13確認）。
-->

---

<p class="recall">① 新字体より画数が多い簡体字は？<span class="en">Simplified characters with more strokes than shinjitai?</span><span class="step">ステップ3　条件で絞る<span class="en">Step 3: filter</span></span></p>

# 対応表を、画数の条件で絞る

<p class="en">Filter the table by stroke count</p>

<div class="body">
<div class="filter">
<div class="rows">
<div class="total"><span class="k">対応表 <span class="en">All pairs</span></span><span class="n">2,145組</span><span class="ex"></span></div>
<div><span class="k">常用漢字のほうが多い <span class="en">Jōyō has more</span></span><span class="n">729組</span><span class="ex"><span lang="ja">亀</span>11→<span lang="zh-Hans">龟</span>7　<span lang="ja">価</span>8→<span lang="zh-Hans">价</span>6</span></div>
<div><span class="k">同じ <span class="en">Same</span></span><span class="n">1,332組</span><span class="ex"><span lang="ja">一</span>1→<span lang="zh-Hans">一</span>1　<span lang="ja">乱</span>7→<span lang="zh-Hans">乱</span>7</span></div>
<div class="hit"><span class="k">規範字のほうが多い <span class="en">Chinese standard has more</span></span><span class="n">84組</span><span class="ex"><span lang="ja">円</span>4→<span lang="zh-Hans">圆</span>10　<span lang="ja">両</span>6→<span lang="zh-Hans">两</span>7</span></div>
</div>
</div>
</div>

<!--
6:45–7:25

ステップ3は、この表を条件で絞るだけです。常用漢字のほうが画数の少ない組だけを残します。もうこの表では、絞った結果の数を表示しちゃっています。できあがった日本の漢字と中国の漢字の組が二千百四十五組。6割以上は日本と中国で同じ画数ですが、3割は日本の常用漢字の方が画数が多いです。そして、4%ほどは逆に中国の規範字の方が画数が多いですね。

***

（ステップ3は、ステップ2でできた対応表に条件を一つ掛けるだけ。対応表ができてしまえば、問いは「どの行を残すか」になる。残る84組が次のスライドの結果。）
（内訳は、規範字が見つかった2,145組を、MJ文字情報一覧表の総画数と通用規範漢字表の笔画で比べたもの。729＋1,332＋84＝2,145。）
注：数え方はステップ2の結果と同じ実行による（2026-10-12）。
-->

---

<p class="recall">① 新字体より画数が多い簡体字は？<span class="en">Simplified characters with more strokes than shinjitai?</span><span class="step">ステップ3の結果<span class="en">Step 3 result</span></span></p>

# 条件で絞ると、84組が残る

<p class="en">Filtering leaves 84 pairs</p>

<div class="body">
<div class="result84">
<div class="hl"><span class="han" lang="ja">両</span><i>6</i><span class="ar">→</span><span class="han" lang="zh-Hans">两</span><b>7</b></div>
<div><span class="han" lang="ja">乗</span><i>9</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">乘</span><b>10</b></div>
<div><span class="han" lang="ja">予</span><i>4</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">豫</span><b>15</b></div>
<div><span class="han" lang="ja">仏</span><i>4</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">佛</span><b>7</b></div>
<div><span class="han" lang="ja">仮</span><i>6</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">假</span><b>11</b></div>
<div><span class="han" lang="ja">侮</span><i>8</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">侮</span><b>9</b></div>
<div><span class="han" lang="ja">僧</span><i>13</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">僧</span><b>14</b></div>
<div class="hl"><span class="han" lang="ja">円</span><i>4</i><span class="ar">→</span><span class="han" lang="zh-Hans">圆</span><b>10</b></div>
<div><span class="han" lang="ja">剰</span><i>11</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">剩</span><b>12</b></div>
<div><span class="han" lang="ja">効</span><i>8</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">效</span><b>10</b></div>
<div><span class="han" lang="ja">勅</span><i>9</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">敕</span><b>11</b></div>
<div><span class="han" lang="ja">勤</span><i>12</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">勤</span><b>13</b></div>
<div><span class="han" lang="ja">収</span><i>4</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">收</span><b>6</b></div>
<div><span class="han nokyu" lang="ja">咲</span><i>9</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">笑</span><b>10</b></div>
<div><span class="han" lang="ja">喝</span><i>11</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">喝</span><b>12</b></div>
<div><span class="han" lang="ja">器</span><i>15</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">器</span><b>16</b></div>
<div class="hl"><span class="han" lang="ja">図</span><i>7</i><span class="ar">→</span><span class="han" lang="zh-Hans">图</span><b>8</b></div>
<div class="hl"><span class="han" lang="ja">圧</span><i>5</i><span class="ar">→</span><span class="han" lang="zh-Hans">压</span><b>6</b></div>
<div><span class="han" lang="ja">増</span><i>14</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">增</span><b>15</b></div>
<div><span class="han" lang="ja">墨</span><i>14</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">墨</span><b>15</b></div>
<div><span class="han" lang="ja">壌</span><i>16</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">壤</span><b>20</b></div>
<div><span class="han" lang="ja">壱</span><i>7</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">壹</span><b>12</b></div>
<div class="hl"><span class="han" lang="ja">売</span><i>7</i><span class="ar">→</span><span class="han" lang="zh-Hans">卖</span><b>8</b></div>
<div><span class="han" lang="ja">弁</span><i>5</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">瓣</span><b>19</b></div>
<div><span class="han" lang="ja">弁</span><i>5</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">辨</span><b>16</b></div>
<div class="hl"><span class="han" lang="ja">弁</span><i>5</i><span class="ar">→</span><span class="han" lang="zh-Hans">辩</span><b>16</b></div>
<div class="hl"><span class="han" lang="ja">弐</span><i>6</i><span class="ar">→</span><span class="han" lang="zh-Hans">贰</span><b>9</b></div>
<div><span class="han nokyu" lang="ja">弔</span><i>4</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">吊</span><b>6</b></div>
<div><span class="han nokyu" lang="ja">強</span><i>11</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">强</span><b>12</b></div>
<div><span class="han nokyu" lang="ja">彫</span><i>11</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">雕</span><b>16</b></div>
<div><span class="han" lang="ja">徳</span><i>14</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">德</span><b>15</b></div>
<div><span class="han" lang="ja">徴</span><i>14</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">徵</span><b>15</b></div>
<div><span class="han" lang="ja">恵</span><i>10</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">惠</span><b>12</b></div>
<div><span class="han" lang="ja">悔</span><i>9</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">悔</span><b>10</b></div>
<div><span class="han" lang="ja">憎</span><i>14</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">憎</span><b>15</b></div>
<div><span class="han" lang="ja">戻</span><i>7</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">戾</span><b>8</b></div>
<div><span class="han" lang="ja">払</span><i>5</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">拂</span><b>8</b></div>
<div><span class="han" lang="ja">抜</span><i>7</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">拔</span><b>8</b></div>
<div class="hl"><span class="han" lang="ja">択</span><i>7</i><span class="ar">→</span><span class="han" lang="zh-Hans">择</span><b>8</b></div>
<div><span class="han" lang="ja">拝</span><i>8</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">拜</span><b>9</b></div>
<div class="hl"><span class="han" lang="ja">拠</span><i>8</i><span class="ar">→</span><span class="han" lang="zh-Hans">据</span><b>11</b></div>
<div><span class="han" lang="ja">挿</span><i>10</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">插</span><b>12</b></div>
<div><span class="han" lang="ja">捜</span><i>10</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">搜</span><b>12</b></div>
<div><span class="han" lang="ja">掲</span><i>11</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">揭</span><b>12</b></div>
<div><span class="han" lang="ja">揺</span><i>12</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">摇</span><b>13</b></div>
<div><span class="han nokyu" lang="ja">搾</span><i>13</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">榨</span><b>14</b></div>
<div><span class="han" lang="ja">敏</span><i>10</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">敏</span><b>11</b></div>
<div><span class="han" lang="ja">曽</span><i>11</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">曾</span><b>12</b></div>
<div class="hl"><span class="han" lang="ja">桜</span><i>10</i><span class="ar">→</span><span class="han" lang="zh-Hans">樱</span><b>15</b></div>
<div><span class="han" lang="ja">梅</span><i>10</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">梅</span><b>11</b></div>
<div><span class="han" lang="ja">欠</span><i>4</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">缺</span><b>10</b></div>
<div><span class="han" lang="ja">毎</span><i>6</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">每</span><b>7</b></div>
<div><span class="han nokyu" lang="ja">毒</span><i>8</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">毒</span><b>9</b></div>
<div><span class="han nokyu" lang="ja">氷</span><i>5</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">冰</span><b>6</b></div>
<div><span class="han nokyu" lang="ja">氾</span><i>5</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">泛</span><b>7</b></div>
<div><span class="han nokyu" lang="ja">汎</span><i>6</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">泛</span><b>7</b></div>
<div class="hl"><span class="han" lang="ja">沢</span><i>7</i><span class="ar">→</span><span class="han" lang="zh-Hans">泽</span><b>8</b></div>
<div class="hl"><span class="han" lang="ja">浜</span><i>10</i><span class="ar">→</span><span class="han" lang="zh-Hans">滨</span><b>13</b></div>
<div><span class="han" lang="ja">海</span><i>9</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">海</span><b>10</b></div>
<div><span class="han" lang="ja">渇</span><i>11</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">渴</span><b>12</b></div>
<div><span class="han" lang="ja">渓</span><i>11</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">溪</span><b>13</b></div>
<div class="hl"><span class="han" lang="ja">満</span><i>12</i><span class="ar">→</span><span class="han" lang="zh-Hans">满</span><b>13</b></div>
<div><span class="han" lang="ja">畳</span><i>12</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">叠</span><b>13</b></div>
<div><span class="han" lang="ja">痩</span><i>12</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">瘦</span><b>14</b></div>
<div><span class="han" lang="ja">砕</span><i>9</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">碎</span><b>13</b></div>
<div><span class="han" lang="ja">稲</span><i>14</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">稻</span><b>15</b></div>
<div><span class="han" lang="ja">穂</span><i>15</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">穗</span><b>17</b></div>
<div><span class="han" lang="ja">突</span><i>8</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">突</span><b>9</b></div>
<div><span class="han nokyu" lang="ja">窓</span><i>11</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">窗</span><b>12</b></div>
<div><span class="han" lang="ja">粋</span><i>10</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">粹</span><b>14</b></div>
<div><span class="han" lang="ja">繁</span><i>16</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">繁</span><b>17</b></div>
<div><span class="han" lang="ja">缶</span><i>6</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">罐</span><b>23</b></div>
<div><span class="han" lang="ja">臭</span><i>9</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">臭</span><b>10</b></div>
<div><span class="han" lang="ja">蔵</span><i>15</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">藏</span><b>17</b></div>
<div><span class="han" lang="ja">薫</span><i>16</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">薰</span><b>17</b></div>
<div><span class="han nokyu" lang="ja">衷</span><i>9</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">衷</span><b>10</b></div>
<div><span class="han" lang="ja">褐</span><i>13</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">褐</span><b>14</b></div>
<div><span class="han" lang="ja">覇</span><i>19</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">霸</span><b>21</b></div>
<div class="hl"><span class="han" lang="ja">賛</span><i>15</i><span class="ar">→</span><span class="han" lang="zh-Hans">赞</span><b>16</b></div>
<div><span class="han" lang="ja">酔</span><i>11</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">醉</span><b>15</b></div>
<div class="hl"><span class="han" lang="ja">釈</span><i>11</i><span class="ar">→</span><span class="han" lang="zh-Hans">释</span><b>12</b></div>
<div><span class="han" lang="ja">髄</span><i>19</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">髓</span><b>21</b></div>
<div><span class="han" lang="ja">黒</span><i>11</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">黑</span><b>12</b></div>
<div><span class="han" lang="ja">黙</span><i>15</i><span class="ar">→</span><span class="han dento" lang="zh-Hans">默</span><b>16</b></div>
</div>
<p class="legend84"><span><span class="mk nokyu"></span>常用漢字表に康熙字典体なし<span class="en">No Kangxi form in the Jōyō table</span></span><span><span class="mk dento"></span>規範字表に繁体字なし<span class="en">No traditional form in the Chinese standard list</span></span></p>
</div>

<!--
7:25–8:10

84組を表にまとめてみました。

マークが付いた文字は、旧字体や繁体字の対応が表に載っていなかった文字です。だから、新字体や簡体字ではないとも言えます。マークのない赤い15組が、問いのいちばん素直な答えです。

でも、残りの組も面白いですね。日本では新字体になっているけど、中国では伝統的な字のままの形という組が、けっこうあります。両方にマークが付いている組もありますね。自分でデータを分析して眺めてみると、こういうことが見えてくるのが面白いです。

***

（公開したjgquery.sqlを、現行のMojidata（2026-10-10ビルド、Unicode 18.0のデータ）でそのまま実行した結果の全84行。色付きは印のない15組（両方の表に載っている組）で、答えのスライドの4組（両两・円圆・図图・圧压）もこの中にある。並びはクエリの出力順。）
（○の11組はすべて●でもあるので、問いに合うかどうかは●だけで分かれる。●の組は、右の字が簡体字ではないので問いに合わない。仏・佛、毎・每、海・海は、どれも日本の側だけ形が変わった組。弁は瓣・辨（●）と辩に分かれる。）
（線の引き方の例：通用規範漢字表は疊を叠の繁体字ではなく異体字として載せるので、叠は●になる（1955年の異体字整理によると記憶しているが未確認）。Unihanでは叠のkTraditionalVariantに疊がある。搖・摇は部品の形の違いで、規範字表には繁体字も異体字も載っていない。常用漢字表は毎に「いわゆる康熙字典体」每を掲げる。質疑で、何を新字体・簡体字と呼ぶかが表の決め方に依る例として話せる。）
（印は表に載っているかどうかだけで付けた。○は常用漢字表に「いわゆる康熙字典体」が掲載されていない常用漢字で11字。●は通用規範漢字表の繁体字との対照に、自分以外の繁体字が載っていない規範字で69組。どちらの印もない、両方の表に載っている組は15組（両两 円圆 図图 圧压 売卖 弁辩 弐贰 択择 拠据 桜樱 沢泽 浜滨 満满 賛赞 釈释）で、おおむね日中とも略した組にあたる。「旧字体」「伝承字」とは言い切らない。叠・摇のように繁体字が載っていない字も、表どおりに●とした。）
注：Mojidata packages/mojidata/dist/moji.db を sqlite3 3.45.1 で読み取り専用に開き、jgquery.sqlを無変更で実行（2026-10-11）。13枚目の書き直したSQLでも同じ84行が同じ順に出る（2026-10-13確認）。印はjoyo_kangxiとtghb_variantsで判定（2026-10-13）。
-->

---

<p class="recall">① 新字体より画数が多い簡体字は？<span class="en">Simplified characters with more strokes than shinjitai?</span></p>

# 問いをSQLで書けば、答えが機械的に出る

<p class="en">Write the question in SQL, and the answer comes out mechanically</p>

<div class="body">
<div class="realsql">
<pre class="whole"><code><span class="pre">-- SQLite</span><span class="pre">WITH</span><span class="pre">  -- ステップ1：表を作る</span><span class="expand">  joyo_itaiji (常用漢字, 異体字) AS (</span><span class="expand">    SELECT 漢字, 康熙字典体 FROM joyo_kangxi</span><span class="expand">    UNION</span><span class="expand">    SELECT 漢字, 漢字 FROM joyo</span><span class="expand">  ),</span><span class="expand">  japan (常用漢字, 異体字) AS (</span><span class="expand">    SELECT 常用漢字, 異体字 FROM joyo_itaiji</span><span class="expand">    UNION</span><span class="expand">    SELECT joyo_itaiji.常用漢字, unihan_variant.value</span><span class="expand">      FROM joyo_itaiji</span><span class="expand">        JOIN unihan_variant</span><span class="expand">          ON unihan_variant.property = &#x27;kZVariant&#x27;</span><span class="expand">          AND unihan_variant.UCS = joyo_itaiji.異体字</span><span class="expand">    UNION</span><span class="expand">    SELECT joyo_itaiji.常用漢字, mji.実装したUCS</span><span class="expand">      FROM joyo_itaiji</span><span class="expand">        JOIN mjsm_JIS包摂規準UCS統合規則 AS mjsm</span><span class="expand">          ON mjsm.縮退UCS = joyo_itaiji.異体字</span><span class="expand">        JOIN mji ON mji.MJ文字図形名 = mjsm.MJ文字図形名</span><span class="expand">      WHERE mji.実装したUCS IS NOT NULL</span><span class="expand">    UNION</span><span class="expand">    VALUES (&#x27;羨&#x27;, &#x27;羡&#x27;), (&#x27;舎&#x27;, &#x27;舍&#x27;), (&#x27;舗&#x27;, &#x27;舖&#x27;),</span><span class="expand">      (&#x27;諮&#x27;, &#x27;咨&#x27;), (&#x27;駄&#x27;, &#x27;馱&#x27;), (&#x27;𠮟&#x27;, &#x27;叱&#x27;)</span><span class="expand">  ),</span><span class="map">  china (異体字, 規範字) AS (</span><span class="map">    SELECT 异体字, 规范字 FROM tghb_variants</span><span class="map">    UNION</span><span class="map">    SELECT 规范字, 规范字 FROM tghb</span><span class="map">    UNION</span><span class="map">    SELECT UCS, value FROM unihan_variant</span><span class="map">      WHERE property = &#x27;kSimplifiedVariant&#x27;</span><span class="map">        AND value IN (SELECT 规范字 FROM tghb)</span><span class="map">  ),</span><span class="strokes">  japan_kakusu (常用漢字, 総画数) AS (</span><span class="strokes">    SELECT 実装したUCS, 総画数 FROM mji WHERE 漢字施策 = &#x27;常用漢字&#x27;</span><span class="strokes">  ),</span><span class="strokes">  china_kakusu (規範字, 笔画) AS (</span><span class="strokes">    SELECT 规范字, 笔画 FROM tghb</span><span class="strokes">  ),</span><span class="pre">  -- ステップ2：つなぎ合わせる</span><span class="join">  jg AS (</span><span class="join">    SELECT DISTINCT 常用漢字, 総画数, 規範字, 笔画</span><span class="join">      FROM japan</span><span class="join">        JOIN china USING (異体字)</span><span class="join">        LEFT JOIN japan_kakusu USING (常用漢字)</span><span class="join">        LEFT JOIN china_kakusu USING (規範字)</span><span class="join">  )</span><span class="pre">-- ステップ3：絞る</span><span class="ask">SELECT * FROM jg</span><span class="ask hl">WHERE 総画数 &lt; 笔画</span><span class="ask">ORDER BY 常用漢字, 規範字;</span></code></pre>
<div class="side">
<ul class="legend">
<li><i class="expand"></i>1 日本の表を作る</li>
<li><i class="map"></i>1 中国の表を作る</li>
<li><i class="strokes"></i>1 画数の表を作る</li>
<li><i class="join"></i>2 つなぎ合わせる</li>
<li><i class="ask"></i>3 絞る</li>
</ul>
</div>
</div>
</div>

<!--
8:10–9:25

ここまでやってきた三つのステップの図表を、手作業で作るのは大変ですが、私は、コンピューターを使いました。SQLという、データベースに問い合わせる言葉で、今説明した作業を書くと、大量の漢字があっても自動で処理ができます。これが実際のクエリです。

このSQLは長くて難しいように見えますが、今まで喋ってきた3ステップの内容を細かく書いているだけです。表を準備し、つなぎ合わせ、絞り込む。
「新字体より画数が多い簡体字は？」という問いは一言ですが、どの字とどの字を対応させるのか、画数をどの資料から数えるのか、という前提が隠れています。このSQLは、その前提を、機械が自動処理できるところまで細かく書き下したものです。前提の決め方はいろいろあって、これはその一つです。一度書けば、常用漢字すべてについて、同じ条件で答えが機械的に出てきます。

今はこういったSQLも全部AIが書いてくれるんですけど、細かい条件は人間が理解して決めてあげたほうがいいですね。

***

（公開したjgquery.sql（2022-07、全54行）を、結果を変えずに3ステップの形に書き直したもの（[jgquery-steps.sql](../jgquery-steps.sql)）。変えた点：CTEを日本の表（japan）・中国の表（china）・画数の表（japan_kakusu・china_kakusu）・つなぎ合わせ（jg）に分けて名付けた。kihanjiへのLEFT JOINは、規範字のない行が最後のWHEREで落ちるのでJOINにした。使っていない註解列と、冗長な「規範字 AS 規範字」を外した。並びをORDER BYで明示した。2026-10-13に、moji.db（2026-10-10ビルド）で公開版と結果を比べ、84行が順序まで一致し、WHEREを外すと2,145行になることを確かめた。）
（全文を読むためではなく、SQL全体が、問いを計算できる程度に詳しく書いたものであることを示すために載せている。対応のさせ方や画数の出典の決め方は一通りではなく、これはその一つで、正しい定め方というわけではない。言葉の問いでは暗黙になっている前提（日中の字の対応のさせ方、画数の出典）を書き下すと、これだけの長さになる。WHEREの1行だけが問いなのではない。結果には佛・收のように中国で簡略化されていない規範字も出る（規範字はそれ自身に対応させているため）。）
注：書き直す前の[jgquery.sql（Gist, 2022-07）](https://gist.github.com/mandel59/8a7cd6cca228723e248d5fccbd41e69a)
-->

---
class: door
---

<div class="dnum">②</div>

# つくりが魚の漢字は？

<p class="en">Characters with 魚 on the right?</p>

<div class="ill ill2"><div class="sq han"><span class="l">？</span><span class="r shu">魚</span></div></div>

<!--
9:25–9:40

次の問題に行きましょう。二つ目です。つくりが魚の漢字は？

***
-->

---

<p class="recall">② つくりが魚の漢字は？<span class="en">Characters with 魚 on the right?</span></p>

# つくりが魚の字は部首がばらばら。全部探すには？

<p class="en">Characters with 魚 on the right sit under many radicals. How to find them all?</p>

<div class="body">
<div class="three">
<div><h3>魚を含む<span class="en">Contains 魚</span></h3><div class="glyph han">鯖 漁</div></div>
<div><h3>魚へん<span class="en">魚 on the left</span></h3><div class="glyph han">鯖</div><p class="verdict">魚部の索引で引ける<span class="en">In the 魚 radical index</span></p></div>
<div><h3>つくりが魚<span class="en">魚 on the right</span></h3><div class="glyph han shu">漁 䗨</div><p class="verdict">水部・虫部に散らばる<span class="en">Scattered across radicals</span></p></div>
</div>
</div>

<!--
9:40–10:00

魚へんならだいたい部首がサカナの索引で引けますが、つくりが魚の字は、部首がミズとかムシとか、ばらばらです。どうやったら、右側がサカナの字が探せるでしょうか。

***

魚部=ギョ部、水部=スイ部、虫部=キ部だけど口頭じゃ伝わらないからそれぞれサカナ、ミズ、ムシとする。

（質疑用：魚へんの字でも、魚部に入っていない字がある。MojidataのIDSが⿰魚で始まる1,114字のうち、UnihanのkRSUnicodeで魚部（195）でないのは3字：穌（禾部、115.11、⿰魚禾）、𣤿（欠部、76.21、⿰魚𣣴）、𫑨（邑部、163.11、⿰魚阝）。穌は18枚目の蘇の部品。「魚へんなら魚部の索引で引ける」は、ほとんどの字では成り立つが例外もある。2026-10-15、moji.db（2026-10-10ビルド）のidsとunihan_kRSUnicodeで確認。）
注：説明用の字例。漁＝⿰氵魚、䗨＝⿰虫魚（CHISE IDS）。検索結果の全一覧ではない。
-->

---

<p class="recall">② つくりが魚の漢字は？<span class="en">Characters with 魚 on the right?</span></p>

# ②の解き方：IDSデータを使って検索する

<p class="en">How ②: search with IDS data</p>

<div class="body">
<div class="idssearch">
<div>
<div class="label">検索式 <span class="en">/ Query</span></div>
<div class="query">
<div><div class="tok">⿰</div><div class="what">左右に並ぶ<span class="en">Left–right</span></div></div>
<div><div class="tok">？</div><div class="what">左は何でも<span class="en">Anything on the left</span></div></div>
<div><div class="tok">魚</div><div class="what">右は魚<span class="en">魚 on the right</span></div></div>
</div>
<p class="scope">字全体に一致<span class="en">Matches the whole character</span></p>
</div>
<div>
<div class="label">IDSデータ <span class="en">/ IDS data</span></div>
<div class="idsrows">
<div class="hit"><span class="han c">漁</span><span class="han ids">⿰氵魚</span><span class="m">○</span></div>
<div class="hit"><span class="han c">䗨</span><span class="han ids">⿰虫魚</span><span class="m">○</span></div>
<div><span class="han c">鯖</span><span class="han ids">⿰魚青</span><span class="m">×</span></div>
</div>
</div>
</div>
</div>

<!--
10:00–10:35

解き方です。IDSという、漢字を部品とその配置で書いたデータを使います。漁は、左右に並ぶ記号のあとにサンズイと魚。この字は虫と魚。鯖は、魚が左側です。

これを、字全体が「左右に並ぶ、左は何でも、右は魚」になる、というパターンで検索すると、部首をまたいで、つくりが魚の字だけをまとめて引けます。

***

（IDSは漢字を部品とその配置で書いたデータ。画面の値はMojidataに入っているBabelStoneのIDS（鯖には⿰魚靑もある）。この問題はIDSデータさえあれば、Mojidataに限らずzi.toolsやIDSgrepなどでも検索しやすい。字全体一致の指定（ids-findの--whole、Webアプリの＠など）は画面では省いている。時間があれば、ここでIDS検索を実演する（約2分）。）
-->

---

<p class="recall">② つくりが魚の漢字は？<span class="en">Characters with 魚 on the right?</span></p>

# 実行すると、34字が一度に出てくる

<p class="en">Run it, and 34 characters come out at once</p>

<div class="body">
<div class="result34 han"><span class="hl">漁</span><span>龽</span><span>䁩</span><span>䐳</span><span class="hl">䗨</span><span>䲆</span><span>𠽐</span><span>𡐚</span><span>𡠵</span><span>𢐗</span><span>𢠐</span><span>𢳶</span><span>𣊘</span><span>𣩕</span><span>𨢭</span><span>𨫗</span><span>𨫷</span><span>𩥭</span><span>𩵑</span><span>𩵫</span><span>𩶿</span><span>𩸇</span><span>𪫔</span><span>𫙣</span><span>𮃣</span><span>𮬋</span><span>𱆏</span><span>𱜊</span><span>𲍂</span><span>𲮲</span><span>𳍓</span><span>𳍲</span><span>𳎋</span><span>𳑊</span></div>
<p class="scope">ids-find --whole=⿰？魚（字全体に一致）の結果<span class="en">Result of a whole-character match</span></p>
</div>

<!--
10:35–10:55

モジデータのIDS検索を使うと、つくりが魚の字が、34字出てきました。字典で探そうとすると、水、火、目と、ばらばらの部首に載っている字です。

***

（現行のMojidataのids-findで `--whole=⿰？魚` を実行した全結果。漢字はGlyphWiki由来のJigmo（CC0）で表示している（拡張JはJigmo3）。色付きは答えのスライドで見せた漁・䗨。多くは拡張漢字で、字典の部首索引では水部・虫部・目部・肉部などにばらばらに載る字。）
注：Mojidata packages/idstool の ids-find（yarn node packages/idstool/bin/ids-find.js --whole=⿰？魚）、2026-10-11実行。
-->

---

<p class="recall">② つくりが魚の漢字は？<span class="en">Characters with 魚 on the right?</span></p>

# 部品を事前に展開しておくと、中の部品でも引ける

<p class="en">Pre-expanding components makes inner parts searchable</p>

<div class="body">
<div class="exp3">
<div class="st"><div class="k">字<span class="en">Character</span></div><div class="han big">蘇</div></div>
<div class="ar">→</div>
<div class="st"><div class="k">IDS<span class="en">As recorded</span></div><div class="seq han"><i>⿱</i><i>艹</i><i class="more">穌</i></div><div class="x">穌も、さらに分解できる<span class="en">穌 can be split further</span></div></div>
<div class="ar">→</div>
<div class="st"><div class="k shu">再帰的に展開<span class="en">Expanded recursively</span></div><div class="seq han"><i>⿱</i><i>艹</i><span class="grp"><i>⿰</i><i class="hl">魚</i><i>禾</i></span></div><div class="x">穌 ＝ ⿰魚禾 に置き換える<span class="en">Replace 穌 with ⿰魚禾</span></div></div>
</div>
<div class="cmp">
<div><span class="k">展開しないで保存<span class="en">Stored as is</span></span><span class="seq han sm"><i>⿱</i><i>艹</i><i>穌</i></span><span class="r">「魚」では引けない<span class="en">Not found by 魚</span></span><span class="m">×</span></div>
<div class="ok"><span class="k">展開して保存<span class="en">Stored expanded</span></span><span class="seq han sm"><i>⿱</i><i>艹</i><i>⿰</i><i class="hl">魚</i><i>禾</i></span><span class="r">「魚」で引ける<span class="en">Found by 魚</span></span><span class="m">○</span></div>
</div>
</div>

<!--
10:55–11:30

IDSのデータを全文検索で引くこと自体は、よく知られたやり方なんですが、モジデータでは、色々な検索が素早くできるよう、工夫をしています。

モジデータでは、まず部品を再帰的に、くりかえし展開しておきます。たとえば、紫蘇の蘇の字は、くさかんむりの下に、魚とノギが並んでいます。この部品も開いた形で保存しておくと、蘇の中の魚まで、全文検索で引けるようになります。

***

（IDSを全文検索で引くこと自体は知られている。この発表の技術的な工夫は、部品の再帰的な事前展開と、SQLiteのFTS（FTS4/FTS5）で候補を絞ってから構造を照合する二段構成。IDSの基本は、直後のzi.toolsの発表に譲る。）
（模式図。蘇はMojidataのIDSで⿱艹穌、穌は⿰魚禾。展開した形を全文検索の索引に保存するので、魚で引くと蘇も候補に入る。実際の索引の持ち方（トークンの切り方など）は図より細かい。）
注：学術的な初出や唯一の方法だとは主張していない。実装と検索意味論はprojects/ids-inverted-index-search。
-->

---

<p class="recall">② つくりが魚の漢字は？<span class="en">Characters with 魚 on the right?</span></p>

# 全文検索で候補を絞り、残りだけ構造を確かめる

<p class="en">Narrow down with full-text search, then check the structure</p>

<div class="body">
<div class="sieve">
<div class="q"><span class="k">IDS検索式<span class="en">IDS query</span></span><span class="seq han"><i class="hit">⿰</i><i class="any">？</i><i class="hit">魚</i></span><span class="ar">→</span><span class="k">全文検索の検索条件<span class="en">Full-text query</span></span><code class="fts">"⿰" AND "魚"</code></div>
<div class="cands">
<div class="hd"><span class="k"><b class="no">1</b><span class="shu">全文検索で絞る</span><span class="en">Keep those containing both ⿰ and 魚</span></span><span class="k"><b class="no">2</b>構造を照合<span class="en">Check: is 魚 on the right?</span></span></div>
<div><span class="han c">漁</span><span class="seq han sm"><i class="hit">⿰</i><i>氵</i><i class="hit">魚</i></span><span class="m ok" v-click>✔</span></div>
<div><span class="han c">䗨</span><span class="seq han sm"><i class="hit">⿰</i><i>虫</i><i class="hit">魚</i></span><span class="m ok" v-click="1">✔</span></div>
<div><span class="han c">鯖</span><span class="seq han sm"><i class="hit">⿰</i><i class="hit">魚</i><i>青</i></span><span class="m" v-click="1">× <small>魚が左<span class="en">魚 on the left</span></small></span></div>
<div><span class="han c">蘇</span><span class="seq han sm"><i>⿱</i><i>艹</i><i class="hit">⿰</i><i class="hit">魚</i><i>禾</i></span><span class="m" v-click="1">× <small>中の⿰でも魚が左<span class="en">魚 on the left inside</span></small></span></div>
</div>
</div>
<p class="scope">仕組みの模式図。全体一致の条件は省略<span class="en">Schematic; the whole-character condition is omitted</span></p>
</div>

<!--
11:30–12:10

検索のときは、まずIDS検索式を、全文検索の検索条件に変換して検索し、候補を絞ります。この段階では、元のIDS検索の条件に合わない字も残りますが、候補はだいぶ絞れます。

[click] そのあと、残った候補を見て、右側が魚という構造のものを残します。鯖は魚が左ですし、蘇も、中の左右の組み立てで魚が左なので、除外します。これで、IDS検索ができました。

***

（模式図。検索式⿰？魚は、まず「？」を除いた"⿰" AND "魚"という全文検索のクエリになり、⿰と魚を両方含む字が候補に残る（色付きは全文検索で当たった部品）。次に、残った候補だけを⿰？魚の構造と照合する。候補の4字は説明用で、全文検索の実際の候補一覧ではない。裏取り（2026-10-15、mojidata-api-coreのidsfind-query.tsと現行のidsfind.db）：クエリの部品を空白でつなぎ、「？」の位置で分けた各部分をFTSのフレーズにしてANDで結ぶ。⿰？魚は("⿰" AND "魚")になり、候補は1,426字（索引では魚もさらに分解されているので、実際には魚の分解列がフレーズになる。図ではこの細かさを省いた）。17枚目の34字は字全体一致（ids-findの--whole）の結果で、このときは字の始めと終わりを表す§が付いて("§ ⿰" AND "魚 §")になり、全文検索の段階で鯖・蘇はもう外れる。候補55字のうち、構造の照合で34字が残る。図は--wholeなしの⿰？魚の流れで、漁⿰氵魚・䗨⿰虫魚は照合で合い、鯖⿰魚青・蘇⿱艹⿰魚禾は合わない。蘇が合わないのは、全体一致でないときは、中の⿰魚禾でも魚が左だから（全体一致なら、全文検索の段階でもう外れる）。画面には、16・17枚目に「字全体に一致」、この図に「全体一致の条件は省略」と添えた（2026-10-16のレビューへの対応）。全文検索で候補を絞るので、構造の照合は全部の字ではなく残った候補にだけ行えばよく、速い。速度の倍率などの数値は、この発表では扱わない。）
-->

---
class: door
---

<div class="dnum">③</div>

# 常用漢字にそっくりな字はあるか？

<p class="en">Do Jōyō kanji have lookalikes?</p>

<div class="ill ill3 han"><span>十</span><span class="eq">≒</span><span class="shu">？</span></div>

<!--
12:10–12:25

三つ目の問題は、僕が2022年に取り組んだ話です。常用漢字にそっくりな字はあるか。

***
-->

---

<p class="recall">③ 常用漢字にそっくりな字はあるか？<span class="en">Do Jōyō kanji have lookalikes?</span></p>

# 常用漢字にそっくりな字がある。他にもある？

<p class="en">Jōyō kanji have lookalikes. Are there more? (2022)</p>

<div class="body">
<div class="hero han"><span>十</span><span v-click class="shu">𬂛</span></div>
<div class="hero-cp"><span>U+5341</span><span v-click="1">U+2C09B</span></div>
</div>

<!--
12:25–12:50

これは数字の十です。

[click] そしてこれは、別の符号位置にある別の字です。MJには「えだなし」という読みで収録されています。並べても、見分けるのはかなり難しいと思います。では、他にもあるでしょうか。

***

（十を見せてから、クリックで𬂛。会場に字形を見てもらう。符号位置はL2/22-133の記載。兵𠔊・田𫭂・逸𨓜などは、この後の検索で見つかった候補なので、ここでは出さない。）
注：[探索時の投稿 (2022-07-04)](https://x.com/mandel59/status/1543854321150099456)：ids-findで常用漢字にそっくりな字を検索。十と𬂛、兵と𠔊、田と𫭂、逸と𨓜 など
-->

---

<p class="recall">③ 常用漢字にそっくりな字はあるか？<span class="en">Do Jōyō kanji have lookalikes?</span></p>

# ③の解き方：常用漢字の全字を、構造で検索する

<p class="en">How ③: search every Jōyō kanji by its structure, all at once (2022)</p>

<div class="body">
<div class="idsflow">
<div class="hd"><span>常用漢字<span class="en">Jōyō</span></span><span></span><span>IDS<span class="en">Structure</span></span><span></span><span>同じIDSを持つ字<span class="en">Characters with the same IDS</span></span></div>
<div><span class="han j">十</span><span class="ar">→</span><span class="han ids">⿻一丨</span><span class="ar">→</span><span class="han hits"><span class="self">十</span><span class="shu">𬂛</span></span></div>
<div><span class="han j">兵</span><span class="ar">→</span><span class="han ids">⿱丘八</span><span class="ar">→</span><span class="han hits"><span class="self">兵</span><span class="shu">𠔊</span></span></div>
<div><span class="han j">田</span><span class="ar">→</span><span class="han ids">⿴囗十</span><span class="ar">→</span><span class="han hits"><span class="self">田</span><span class="shu">𫭂</span></span></div>
<div><span class="han j">逸</span><span class="ar">→</span><span class="han ids">⿺辶免<span class="src">J</span></span><span class="ar">→</span><span class="han hits"><span class="self">逸</span><span class="shu">𨓜</span></span></div>
<div class="more">… 常用漢字2,136字のIDSを、ids-findでまとめて検索<span class="en">All 2,136 Jōyō kanji, searched at once</span></div>
</div>
<div class="idsfoot">
<p>字ではなくIDSを渡す<span class="en">Pass the IDS, not the character</span></p>
<p>常用漢字以外の字が出たら、Unihanの記録と照合<span class="en">If a non-Jōyō character turns up, check it against Unihan</span></p>
</div>
</div>

<!--
12:50–13:35

似た漢字をどうやって探すのか。さっきのIDS検索を、もう一度使います。常用漢字のIDS、つまり部品の組み立て方を、Mojidataの構造検索のコマンド、ids-findに流し込みました。たとえば十のIDSで検索すると、十のほかに、もう一つ別の字が見つかります。これを常用漢字の全部の字について、まとめて行いました。このとき、字ではなくIDSを渡します。常用漢字以外の字が出たら、Unihanに記録されている関係と照合します。

***

（mojidata idstoolのids-findコマンドに、常用漢字表の字ではなくそのIDSを流し込み、構造が一致する別の字を拾った（発表者の説明）。字を渡すと、索引で異体として同一視された字（閲閱、姫姬など）まで拾い、実質的にkdpvなどのペアをUnihanに提案することになるため。2022年当時の正確なオプションは確認していない。）
（図のIDSは今のmoji.db（2026-10-10ビルド）のidsで確認（2026-10-16）。逸は、Jソースの字形のIDS ⿺辶免で𨓜（GPソースで⿺辶免）と一致する。Gソースなどの⿺辶兔では一致しない。十𬂛・兵𠔊・田𫭂・逸𨓜は、2022年のIDSでも今のIDSでも出る組。）
（質疑用：手順はシェルの数行で書ける。`sqlite3 -separator ' ' moji.db "SELECT DISTINCT 漢字, IDS FROM joyo JOIN ids ON UCS = 漢字" | while read c ids; do echo "$c $(ids-find --whole=$ids)"; done`）
注：[探索時の投稿 (2022-07-04)](https://x.com/mandel59/status/1543854321150099456)「ids-findを使って常用漢字とそっくりな漢字を検索したら…いっぱいペアが見つかった」
-->

---

<p class="recall">③ 見つけた字は、Unihanに登録済みか？<span class="en">Are the lookalikes already in Unihan?</span></p>

# 照合すると、Unihanにまだない関係があった

<p class="en">Checking Unihan turned up relations not yet recorded (2022)</p>

<div class="body">
<div class="counts">
<div class="gh found">検索で見つけた組<span class="en">Found by the search</span></div><div class="gh">ほかに見つけていた例<span class="en">Found separately</span></div>
<div><div class="num shu">10<span>組</span></div><div class="lab">そっくりなのに、関係なし<span class="en">Lookalikes with no relation</span></div><div class="ex han">十𬂛 兵𠔊 了𠄐 …</div></div>
<div><div class="num">2<span>組</span></div><div class="lab">kZVariantのない字形違い<span class="en">Variants without kZVariant</span></div><div class="ex han">緒緖 謠謡</div></div>
<div class="other"><div class="num">1<span>字</span></div><div class="lab">一字だけ未登録<span class="en">Only one missing</span></div><div class="ex han">叱𠮟 ＋ 𫜸</div></div>
</div>
<div class="outcome"><span><strong>L2/22-133</strong>で提案<span class="en">Proposed (2022-07)</span></span><span class="ar">→</span><span class="shu">採用（Unicode 15.0）<span class="en">Adopted for Unicode 15.0</span></span></div>
</div>

<!--
13:35–14:35

そっくりな字が見つかると、次の問いが出てきます。Unihanには、見た目が紛らわしい字の組を記録する、kSpoofingVariantというプロパティがあります。見つけた組は、そこに登録済みでしょうか。

照合すると、そっくりなのに関係が記録されていない組が10組ありました。字形違いなのにkZVariantがない組も、2組ありました。

この検索で見つけた組をもとに、ほかに見つけていた例も合わせて、2022年7月に、L2/22-133という文書で提案しました。どちらの関係として扱うかは、専門家の判断に委ねています。

この提案は採用され、Unicode 15.0に向けたデータの更新につながりました。使う側が見つけた候補が、標準のデータに返っていったわけです。

***

（10組＝了𠄐・二𠄞𠄟𠄠・十𬂛・兵𠔊・天𫯛・延𢌛・田𫭂・目𡆤・逸𨓜・隆𨺓。注記付きの緒緖・謠謡（kZVariantなし）を別に数えた。2022年7月当時のMojidataが使っていたBabelStone IDS（mandel59/babelstone-ids 77f676b、2022-07-01に固定）では、𫯛が⿱一大で天と同じ、延のV由来が⿺廴正で𢌛と同じだったので、この12組はどれも構造検索で出る。今のIDSでは𫯛が⿱㇒大、延のV由来が⿺廴⿱一{117}に変わったので、天𫯛と延𢌛は2026年の再実行（26枚目）では出ない。残りの10組は今も出る。叱𠮟は登録済みで𫜸だけ未登録、という例は、検索とは別に見つけていたものを合わせて提案したと考えられる（2022年当時のIDSでも今のIDSでも、𠮟が⿰口七、叱がV由来で⿰口七、𫜸が⿰口匕で、𠮟のIDSから構造検索しても𫜸には届かない。見つけた経緯そのものは未確認）。言と訁にkSemanticVariantがない点も文書にあるが、ここでは数えない。）
（提案文書の趣旨：似た形が利用者を誤らせうるので、kSpoofingVariantまたはkZVariantとしての追加を提案し、扱いの判断はUTCの専門家に委ねた。変更データを添付。）
（結果は、外から見た大筋として「提案して、採用された」とまとめている。組織上はCJK & Unihan GroupがUTC #172へUnicode 15.0に向けた更新を勧告した形で、その内部の手続きと、個々の分類（逸𨓜・隆𨺓がkZVariantになった等）はこの発表の範囲外。すべての候補が提案どおりに採用・反映されたわけではない。）
（質疑用：緒緖・謠謡は、ISO/IEC 10646 Annex S S.3（[2020年版、IRG N2857](https://unicode.org/irg/docs/n2857-AnnexS.pdf)）に原規格分離の例として載っている（緒緖はTで、CNS 11643-1986の第1面と第14面、謠謡はJで、どちらもJIS X 0208）。UAX #38（Unicode 13.0）はkZVariantを、誤りや原規格分離で複数回符号化された、形と意味が同じ字の関係と定義するので、この2組はkZVariantとして出せた。Unicode 12.0まではkZVariantがあった（緒⇄緖、謡→謠）が、13.0の全面見直しで一括で消え、L2/22-133で再び挙げた。個々の削除理由を示す文書はない。経緯は[mojidata-llm-wiki: kZVariant](https://github.com/mandel59/mojidata-llm-wiki/blob/main/wiki/topics/kzvariant.md)。逸𨓜・隆𨺓は、𨓜・𨺓が拡張Bの字で原規格分離の対象外であり、同じ字と言える客観的なデータがなかったので、kSpoofingVariantとして出して分類を専門家に委ねた（発表者の説明）。）
注：[L2/22-133 New candidates of Unihan kSpoofingVariant and kZVariant](https://www.unicode.org/L2/L2022/22133-kspoofing-kzvariant-cand.pdf)　[L2/22-127 §12](https://www.unicode.org/L2/L2022/22127-cjk-unihan-group-utc172.pdf#page=22)
-->

---

# あなたの問いから、同じ手順で始められる

<p class="en">Start from your own question, the same way</p>

<div class="body">
<div class="steps five">
<div><div class="n">1</div><div class="s">問いを選ぶ</div><div class="en">Pick a question</div></div>
<div><div class="n">2</div><div class="s">材料を探す</div><div class="en">Find data</div><div class="x">MJ · Unihan · IDS · Mojidata</div></div>
<div><div class="n">3</div><div class="s">道具を選ぶ</div><div class="en">Pick tools</div><div class="x">表計算 · SQLite · AI</div></div>
<div><div class="n">4</div><div class="s">問いに取り組む</div><div class="en">Work on it</div></div>
<div class="last"><div class="n">5</div><div class="s">公開する</div><div class="en">Publish</div></div>
</div>
</div>

<!--
14:35–15:15

あなたも、同じ手順で始められます。何か気になっている問題、簡単には調べられない問いを一つ選ぶ。MJ文字情報やUnihan、Mojidataなどの材料を探す。道具は、表計算でもSQLiteでも、なんでもいいです。今はAIを使うことも出来ます。

そして、問いに取り組む。最後に、見つけたことを公開する。対応表やクエリのような小さな成果でも、次の人の材料になり、新しいハックに繋がっていきます。

***

（AIとハックの接続は発表者の考えで、ESRの主張ではない。）
（読めることと、加工・再配布しやすい条件で公開されていることは別。UCVの展望は質疑で。）
注：オープンサイエンスとの接点：[UNESCO, About Open Science](https://www.unesco.org/en/open-science/about)
-->

---
class: closing
---

<p class="final">字典にない索引を、<br>公開データから作ろう。<br><span class="shu">そして、次の人のために公開しよう。</span></p>
<p class="en">Build the index your dictionary doesn't have — from open data.<br>Then publish it for the next person.</p>

<p class="thanks">ありがとうございました / Thank you　—　mandel59</p>

<!--
15:15–15:45

字典にない索引は、公開データから作れます。そして、作ったものは、次の人のために公開してください。

文字に詳しい人と、技術を持つ人がつながれば、共有のデータを確かめたり、標準化に参加したりしやすくなります。今日のこの会は、まさにそういう場所だと思います。ありがとうございました。

***

（本編ここまで。）
-->

---
class: backup
---

<span class="kicker">補足 / Backup</span>

<p class="recall">③ 2026年に、同じ検索をやり直すと？<span class="en">What if we rerun the search in 2026?</span></p>

# 今やると、44字に52の候補が出てくる

<p class="en">Today, the same search gives 52 candidates for 44 Jōyō kanji</p>

<div class="body">
<div class="result44 han"><div class="hl"><b>了</b>𠄐</div><div class="hl"><b>二</b>𠄞𠄟𠄠</div><div><b>値</b>值</div><div class="hl"><b>兵</b>𠔊</div><div><b>冊</b>䍏</div><div class="hl"><b>十</b>𬂛</div><div><b>吉</b>𠮷</div><div><b>器</b>𠾖</div><div><b>土</b>士</div><div><b>士</b>土</div><div><b>央</b>𰋙</div><div><b>巾</b>门</div><div><b>径</b>𮱻</div><div class="hl"><b>志</b>𢖽</div><div><b>晩</b>晚</div><div><b>未</b>末本</div><div><b>末</b>未本</div><div><b>本</b>未末</div><div><b>東</b>果</div><div><b>果</b>東</div><div><b>柿</b>杮</div><div><b>欄</b>𣟬</div><div><b>殻</b>殼</div><div><b>瀬</b>瀨</div><div><b>玉</b>玊</div><div class="hl"><b>田</b>𫭂</div><div><b>由</b>甲申</div><div><b>甲</b>由申</div><div><b>申</b>由甲</div><div class="hl"><b>目</b>𡆤</div><div><b>稽</b>𥡴</div><div><b>突</b>𥤮</div><div class="hl"><b>緒</b>緖</div><div class="hl"><b>臭</b>𦤀</div><div><b>致</b>𦤶</div><div><b>蚕</b>𧉕</div><div><b>言</b>訁</div><div class="hl"><b>謡</b>謠</div><div><b>謹</b>𧫴</div><div><b>辛</b>𨐋</div><div class="hl"><b>逸</b>𨓜</div><div class="hl"><b>隆</b>𨺓</div><div><b>類</b>𩔖</div><div><b>𠮟</b>叱</div></div>
</div>

<!--
質疑用。今のデータで同じ検索をやり直すとどうなるかを聞かれた場合。

ここまでが2022年の話です。同じ検索を、今のデータでやり直してみました。常用漢字のうち44字について、52の候補が出てきます。

ただ、土と士、由と甲のように、IDSでは区別がつかない別の字も混ざっています。ここでも、最後は人が見て選びます。

***

（2026-10-11に、常用漢字表の全字のIDS（moji.dbのidsテーブルにあるもの全部）を渡して、構造全体が一致する別の字を探した全結果（自分自身と&で始まる未符号化の部品は除く）。太字が常用漢字、続く字が同じ構造の別の字。色付きは2022年に提案に入れた組を含む字。）
（今のMojidataの検索索引は、kZVariant（兑＝兌など）とkdpvの部首異体（扌→手、𦣞→臣など）を同一視して作られていて、IDSを渡しても同一視は効く。そこで同一視を切った索引（MOJIDATA_IDSDB_EXPAND_Z_VARIANTS=0、MOJIDATA_IDSDB_NORMALIZE_KDPV_RADICAL_VARIANTS=0）を別に作って検索した。同一視ありで字を渡すと、246字に380の候補が出て、その多くは同一視でつながっただけの組だった。）
（十𬂛は、IDS（⿻一丨）を渡すと出る。字を渡す検索では、2023-04-10のコミットf0af94bで⿻に字ごとの隠し引数を足したため、互いにマッチしない。その代わり、IDSを渡すと由・甲・申（どれも⿻日丨）も互いに出る。土士・未末本・東果も、IDSでは区別がつかない別の字。最後は人が見て選ぶ。）
注：WSLのMojidata（idsdbを同一視なしで再構築し、mojidata-api-coreのidsfindで検索、2026-10-11実行）。joyoテーブルは読みごとに行があるので、字の重複を除いた。
-->

---
class: backup
---

<span class="kicker">補足 / Backup</span>

<p class="recall">③ 2026年に、同じ検索をやり直すと？<span class="en">What if we rerun the search in 2026?</span></p>

# 今やると、まだない候補がまた見つかる

<p class="en">Run it today, and new candidates turn up again</p>

<div class="body">
<div class="now2">
<div>
<div class="label">Unihanに収録済みの組 <span class="en">/ Pairs already recorded in Unihan</span></div>
<div class="done">
<div><span class="han">兵𠔊 了𠄐 二𠄞𠄟𠄠 目𡆤 田𫭂 臭𦤀 𠮟𫜸</span><b>kSpoofingVariant</b></div>
<div><span class="han">逸𨓜 隆𨺓 志𢖽 緒緖 謡謠</span><b>kZVariant</b></div>
</div>

</div>
<div>
<div class="label">まだ記録のない候補 <span class="en">/ Not yet recorded</span></div>
<div class="num shu">13<span>組</span></div>
<div class="han ex">辛𨐋</div>
<div class="han other">冊䍏 央𰋙 玉玊 土士 未末本 東果 由甲申 巾门</div>
</div>
</div>
</div>

<!--
質疑用。今のデータで同じ検索をやり直すとどうなるかを聞かれた場合。

左には、今のUnihanに収録済みの組を示しています。

そして、まだ記録のない組が、13組あります。多くは土と士のような、もともと別の字や、少し似ている程度の組ですが、辛のように、そっくりな字が見つかる常用漢字もあります。同じ問いを、今やり直すと、また続きができるわけです。

***

（今の検索結果52組を、今のUnihan（Unicode 18.0）のvariant系プロパティ（kSpoofingVariant、kZVariant、kSemanticVariant、kSpecializedSemanticVariant、kSimplifiedVariant、kTraditionalVariant、kCompatibilityVariant、kJapaneseNewVariant、kJapaneseOldVariant）と両方向で照合した。記録あり31組、なし21組（向きの重複を除くと13組）。）
（左は今のUnihanに収録済みの組の例。十𬂛・吉𠮷・器𠾖・径𮱻・柿杮・欄𣟬・突𥤮・致𦤶・蚕𧉕・謹𧫴などもkSpoofingVariantで記録済みだが、いつ誰の提案で入ったかは確認していない。）
（記録のない13組のうち、発表者が見てそっくりと言えるのは辛𨐋だけで、提案に値するかは未検討。冊䍏・央𰋙・玉玊は少し似ている程度。土士・未末本・東果・由甲申・巾门はIDSでは区別がつかない、もともと別の字。）
注：WSLのMojidata moji.dbのunihan_variantと照合（2026-10-11）。
-->

---
class: backup
---

<span class="kicker">補足 / Backup</span>

# 𬂛と𬺰は、同じ読みで似ているのに異体関係がない

<p class="en">𬂛 and 𬺰 share a reading and a shape, yet are not linked as variants</p>

<div class="body">
<table class="mogi">
<thead><tr><th></th><th><span class="han">𬂛</span><span class="cp">U+2C09B</span></th><th><span class="han">𬺰</span><span class="cp">U+2CEB0</span></th></tr></thead>
<tbody>
<tr><th>MJ<span class="en">MJ list</span></th><td>MJ056819</td><td>MJ059293</td></tr>
<tr><th>IDS</th><td class="han">⿻一丨</td><td class="han">⿻一亅</td></tr>
<tr><th>MJの読み<span class="en">Reading in MJ</span></th><td>えだなし</td><td>えだなし</td></tr>
<tr><th>名字の読み<span class="en">As a surname</span></th><td colspan="2">もぎき</td></tr>
<tr><th>Unihanの異体関係<span class="en">Unihan variants</span></th><td><span class="han">十</span><span class="note">kSpoofingVariant</span></td><td>なし</td></tr>
<tr><th>kStrange<span class="en">Unusual forms</span></th><td><span class="han">木</span><span class="note">I: incomplete U+6728</span></td><td><span class="han">才</span><span class="note">I: incomplete U+624D</span></td></tr>
</tbody>
</table>
<p class="mogi-claim shu">同じ読みで形も似ている。何らかの異体関係として登録されるべきでは<span class="en">Same reading, similar shape: they should be linked as variants of some kind</span></p>
<p class="plea">「えだなし」の確かな用例をご存じの方は、教えてください<span class="en">If you know a documented use of the reading “edanashi”, please tell me</span></p>
</div>

<!--
質疑用。十と𬂛の話の続きを聞かれた場合。

𬂛には、そっくりな字がもう一つあります。𬺰です。MJ文字情報一覧表では、どちらも「えだなし」と読むとされていますが、実際には「もぎき」という読みで、名字に使われていることが確認されています。「えだなし」のほうは、確かな用例があるのかどうか、私は疑っています。ご存じの方がいたら、ぜひ教えてください。

この二つの字の間には、Unicodeの異体関係が何も設定されていません。ユニハンのkStrangeというプロパティでは、それぞれ木と才の不完全な形とされていますが、これは異体関係ではありません。MJで同じ読みとされていて、形も似ている以上、何らかの異体関係として登録されるべきだと考えています。

***

（MJ、読み、IDS、Unihanは、moji.db（2026-10-10ビルド）のmji・mji_reading・ids・unihan_*で確認（2026-10-16）。𬂛はMJ056819、kIRG_JSourceはJK-58711。𬺰はMJ059293、kIRG_JSourceはJMJ-059293。IDSは𬂛が⿻一丨、𬺰が⿻一亅（ほかにXソースの㇯才㇒）。Unihanの異体系プロパティは、𬂛が十とのkSpoofingVariant（2022年の提案で入った組）だけで、𬂛と𬺰の間にはkSpoofingVariant・kZVariant・kSemanticVariant・kSpecializedSemanticVariantのどれもない。kStrangeは𬂛がI:U+6728（木）、𬺰がI:U+624D（才）。Iは、その字の不完全な形に見えること（Incomplete）を表し、異体関係のプロパティではない。𬂛を木の不完全な形とする見方は、「えだなし」（枝のない木）という読みとも合う。）
（「もぎき」の名字の用例は発表者の確認による。出典は未記入なので、質疑で出典を聞かれたら答えられるように追記する。「えだなし」に確かな用例がないというのは発表者の疑いで、確かめてはいない。どの種類の異体関係が適当か（kSpoofingVariantかkZVariantか、ほかか）はまだ決めていない。）
-->

---
class: backup
---

<span class="kicker">補足 / Backup</span>

# ハックとは、取り組み、活かし、公開すること

<p class="en">Hacking means taking on, reusing, and publishing</p>

<div class="body">
<div class="hack3">
<div><div class="o">自発的に</div><div class="v">取り組む</div><div class="en">Take on problems on your own</div></div>
<div><div class="o">手元の材料や技術を</div><div class="v">活かす</div><div class="en">Reuse existing work</div></div>
<div><div class="o">見つけたことを</div><div class="v">公開する</div><div class="en">Publish what you find</div></div>
</div>
</div>

<!--
質疑用。「ハック」という語の意味を聞かれた場合。

「ハック」という言葉を使った意図を次の三つにまとめます。自発的に取り組む。手元の材料や技術を、活かす。見つけたことを、公開する。だいたい、こういうことを、ここではハックと。これは有名なハッカーのひとり、エリック・レイモンドの書いたハウトゥビカムアハッカー「ハッカーになるには」をヒントに、自分なりに思い切って言い換えてみたものです。

***

（対応：取り組む＝ESRの心構え1「解決を待つ魅力的な問題」とStallmanの遊び心。自発的に＝他人の依頼や許可を待たず自由にやる。活かす＝心構え2「同じ問題を二度解かない」を受け取る側から言い換え、Jargon Fileの「既存の設計を別の目的に作り替える」を足したもの。公開する＝ESRの「有益な情報を公開する」と本人の記事の「成果を返す」。役に立つことは条件にしていない。公開の要素はStallmanではなくESRと本人の記事に由来する。心構え3–5と、文化・評判による定義は使っていない。）
注：cf. Eric S. Raymond, [How To Become A Hacker](http://www.catb.org/~esr/faqs/hacker-howto.html)（[日本語訳](https://cruel.org/freeware/hacker.html)）を踏まえた本発表での言い換え。唯一の定義・逐語引用ではない。
-->

---
class: backup
---

<span class="kicker">補足 / Backup</span>

# 参照文献 / References

<div class="refs">
<div><a href="http://www.catb.org/~esr/faqs/hacker-howto.html">Eric S. Raymond, How To Become A Hacker</a>（<a href="https://cruel.org/freeware/hacker.html">日本語訳</a>）<span class="en">Hacker attitude, skills and sharing</span></div>
<div><a href="https://mandel59.hateblo.jp/entry/2024/02/09/005117">MJ文字情報の問題に関する記事 (2024)</a> ／ <a href="https://www.unicode.org/review/pri433/feedback.html">Unihanへの報告 (2021)</a><span class="en">MJ data issues and Unihan feedback</span></div>
<div><a href="https://www.unicode.org/L2/L2022/22133-kspoofing-kzvariant-cand.pdf">類似字関係の提案 L2/22-133 (2022)</a> ／ <a href="https://www.unicode.org/L2/L2022/22127-cjk-unihan-group-utc172.pdf#page=22">検討 L2/22-127 §12</a><span class="en">Proposed kSpoofingVariant / kZVariant relationships and review</span></div>
<div><a href="https://x.com/mandel59/status/1547293802565496832">常用漢字と規範字の画数比較 (2022)</a> ／ <a href="https://x.com/mandel59/status/1654413541192122368">日中の読みの集計 (2023)</a><span class="en">Stroke and reading comparisons</span></div>
<div><a href="https://www.unesco.org/en/open-science/about">UNESCO, About Open Science</a><span class="en">Access, reuse and participation</span></div>
</div>

<!--
質疑・配布用。文献の紹介を求められた場合。

ハッカーの心構えについては、Eric S. Raymondの「How To Become A Hacker」と、その日本語訳を参照しています。今回紹介したMJ・Unihanの報告、類似字の提案と検討資料、画数と読みの比較の投稿にもリンクを付けています。

***
-->
