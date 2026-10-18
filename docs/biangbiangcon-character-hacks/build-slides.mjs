import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";

// node build-slides.mjs <runtime package.json> <skill dir> <build dir> <new output.pptx>
// Append pdf to export the existing final PPTX as a new sibling PDF.
const [manifest, skillDir, buildArg, outputArg, mode] = process.argv.slice(2);
if (![manifest, skillDir, buildArg, outputArg].every(Boolean)) {
  throw Error("Missing build arguments");
}
const workspaceDir = path.resolve(import.meta.dirname, "../..");
const buildDir = path.resolve(buildArg);
const outputPath = path.resolve(outputArg);
for (const p of [buildDir, outputPath]) {
  if (!p.startsWith(workspaceDir + path.sep)) throw Error("Output outside workspace");
}
const require = createRequire(path.resolve(manifest));
process.env.RUNTIME_NODE_MODULES = path.join(path.dirname(path.resolve(manifest)), "node_modules");
const { GlobalFonts } = require("@napi-rs/canvas");
GlobalFonts.registerFromPath(
  "C:/Users/mande/AppData/Local/Microsoft/Windows/Fonts/BabelStoneHan.ttf",
);
const { Presentation, PresentationFile, FileBlob } = require("@oai/artifact-tool");
await fs.mkdir(buildDir, { recursive: true });
await fs.mkdir(path.dirname(outputPath), { recursive: true });
const writeBlob = async (p, b) => fs.writeFile(p, new Uint8Array(await b.arrayBuffer()));
if (mode === "pdf") {
  const pdf = outputPath.replace(/\.pptx$/i, "-preview.pdf");
  try {
    await fs.access(pdf);
    throw Error("PDF exists. Choose a new revision filename.");
  } catch (e) {
    if (e.code !== "ENOENT") throw e;
  }
  // Assemble the visually reviewed slide renders. Editable content stays in PPTX.
  const python = path.resolve(manifest, "../../python/python.exe");
  const script = [
    "import sys, json, zipfile",
    "from pathlib import Path",
    "from xml.etree import ElementTree as E",
    "from reportlab.pdfgen.canvas import Canvas",
    "pptx, build, output = sys.argv[1:]",
    "ns={'p':'http://schemas.openxmlformats.org/presentationml/2006/main','a':'http://schemas.openxmlformats.org/drawingml/2006/main','r':'http://schemas.openxmlformats.org/officeDocument/2006/relationships'}",
    "z=zipfile.ZipFile(pptx)",
    "slides=sorted([n for n in z.namelist() if n.startswith('ppt/slides/slide') and n.endswith('.xml')],key=lambda n:int(Path(n).stem[5:]))",
    "c=Canvas(output,pagesize=(960,540),pageCompression=1)",
    "c.setTitle('BiangBiangCon - Character Data Hacking')",
    "for i,n in enumerate(slides,1):",
    " image=Path(build)/('slide-%02d.png'%i)",
    " if not image.exists(): raise RuntimeError('Missing reviewed slide render')",
    " c.drawImage(str(image),0,0,width=960,height=540)",
    " relpath='ppt/slides/_rels/'+Path(n).name+'.rels'",
    " rels={e.attrib['Id']:e.attrib['Target'] for e in E.fromstring(z.read(relpath)) if e.attrib.get('TargetMode')=='External'}",
    " for sp in E.fromstring(z.read(n)).findall('.//p:sp',ns):",
    "  xf=sp.find('p:spPr/a:xfrm',ns)",
    "  if xf is None: continue",
    "  off=xf.find('a:off',ns); ext=xf.find('a:ext',ns)",
    "  if off is None or ext is None: continue",
    "  x=int(off.attrib['x'])/12700; y=int(off.attrib['y'])/12700",
    "  w=int(ext.attrib['cx'])/12700; h=int(ext.attrib['cy'])/12700",
    "  for hl in sp.findall('.//a:hlinkClick',ns):",
    "   uri=rels.get(hl.attrib.get('{'+ns['r']+'}id'))",
    "   if uri and uri.startswith(('https://','http://')): c.linkURL(uri,(x,540-y-h,x+w,540-y),relative=0,thickness=0)",
    " c.showPage()",
    "c.save()",
    "print(json.dumps({'pdf':output,'slides':len(slides),'type':'rendered-preview'}))",
  ].join("\n");
  const result = spawnSync(python, ["-X", "utf8", "-", outputPath, buildDir, pdf], {
    input: script,
    encoding: "utf8",
  });
  if (result.status !== 0) throw Error(result.stderr || "PDF assembly failed");
  console.log(result.stdout.trim());
  process.exit(0);
}
const { finalizePresentation } = await import(
  pathToFileURL(
    path.join(skillDir, "container_tools/artifact_tool_utils.mjs"),
  ).href
);
const font = "Noto Sans JP", han = "BabelStone Han";
const ink = "#20363B", accent = "#007D81", blue = "#2964A0";
const muted = "#5E7075", paper = "#FCFCF8", pale = "#EAF3F1";
const presentation = Presentation.create({ slideSize: { width: 1280, height: 720 } });
const nativeTables = [];
const r = {
  esr: "http://www.catb.org/~esr/faqs/hacker-howto.html",
  esrJa: "https://cruel.org/freeware/hacker.html",
  own: "https://mandel59.hateblo.jp/entry/2023/11/19/212703",
  old: path.join(workspaceDir, "var/mjlt-111217075152-phpapp01.pdf"),
  mj: "https://mandel59.hateblo.jp/entry/2024/02/09/005117",
  report21: "https://www.unicode.org/review/pri433/feedback.html",
  review21: "https://www.unicode.org/L2/L2021/21129-cjk-unihan-group-utc168.pdf#page=22",
  report22: "https://www.unicode.org/L2/L2022/22133-kspoofing-kzvariant-cand.pdf",
  review22: "https://www.unicode.org/L2/L2022/22127-cjk-unihan-group-utc172.pdf#page=22",
  delimiter: "https://www.unicode.org/review/pri483/feedback.html#ID20240215045359",
  delimiterReview: "https://www.unicode.org/L2/L2024/24067-cjk-unihan-wg-utc179.pdf#page=4",
  dict: "https://dict.variants.moe.edu.tw/dictView.jsp?ID=4977&la=1",
  science: "https://www.unesco.org/en/open-science/about",
  repo: "https://github.com/mandel59/mojidata",
  app: "https://mojidata.ryusei.dev/",
  plan: path.join(workspaceDir, "docs/biangbiangcon-open-character-data.md"),
  ids: path.join(workspaceDir, "projects/ids-inverted-index-search/README.md"),
  chise: path.join(workspaceDir, "var/sources/idsgrep-0.6/source/chise.eids"),
  abbreviation: path.join(workspaceDir, "docs/kanji-abbreviation-minimum-strokes.md"),
};
function text(s, value, x, y, w, h, size = 36, color = ink, bold = false, family = font) {
  const sh = s.shapes.add({
    geometry: "textbox",
    position: { left: x, top: y, width: w, height: h },
    fill: "none",
    line: { fill: "none", width: 0 },
  });
  sh.text = value;
  sh.text.style = {
    typeface: family,
    fontSize: size,
    color,
    bold,
    autoFit: "none",
    wrap: "word",
    verticalAlignment: "top",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  };
  return sh;
}
function pair(s, jp, en, x, y, w, jpSize = 34, enSize = 25, color = ink) {
  text(s, jp, x, y, w, 54, jpSize, color);
  text(s, en, x, y + 57, w, Math.min(72, 700 - y - 57), enSize, muted);
}
function glyph(s, v, x, y, w = 180, size = 136, color = ink) {
  return text(s, v, x, y, w, size * 1.4, size, color, false, han);
}
function link(s, label, uri, x, y, w, size = 24) {
  return text(s, [[{ run: label, link: { uri, isExternal: true } }]], x, y, w, 45, size, accent);
}
function connect(s, a, b, fromSide = "right", toSide = "left", arrow = true) {
  return s.shapes.connect(a, b, {
    kind: "straight",
    fromSide,
    toSide,
    line: { fill: muted, width: 2.5 },
    tail: { type: arrow ? "triangle" : "none", width: "sm", length: "sm" },
  });
}
function stage(s, jp, en, x, y, w = 270, color = ink) {
  const a = text(s, jp, x, y, w, 130, 33, color, true);
  text(s, en, x, y + 67, w, 100, 25, muted);
  return a;
}
function table(s, values, x, y, widths, height, size = 28) {
  const t = s.tables.add({
    rows: values.length,
    columns: values[0].length,
    left: x,
    top: y,
    width: widths.reduce((a, b) => a + b, 0),
    height,
    columnWidths: widths,
    values,
  });
  t.borders.assign({ fill: "#CBDAD6", width: 1, style: "solid" });
  t.cells.block({ row: 0, column: 0, rowCount: values.length, columnCount: values[0].length })
    .assign({
      fill: paper,
      textStyle: { typeface: font, fontSize: size, color: ink },
      margins: { left: 14, right: 12, top: 8, bottom: 7 },
      anchor: "center",
    });
  t.cells.block({ row: 0, column: 0, rowCount: 1, columnCount: values[0].length })
    .assign({ fill: pale, textStyle: { color: accent, bold: true } });
  nativeTables.push(presentation.slides.items.length);
  return t;
}
function slide(jp, en, time, spoken, sources = [], extra = "") {
  const s = presentation.slides.add();
  s.background.fill = paper;
  if (jp) text(s, jp, 72, 40, 1130, 76, 46, ink, true);
  if (en) text(s, en, 74, 119, 1110, 55, 25, muted);
  text(s, String(presentation.slides.items.length).padStart(2, "0"), 1185, 675, 60, 32, 18, muted);
  s.speakerNotes.textFrame.setText(
    time + "\n\n" + spoken + "\n\n" + extra +
      "\n\n出典 / Sources\n" + sources.join("\n") + "\n" + r.plan,
  );
  return s;
}

// 01 Cover
{
  const s = slide(
    "",
    "",
    "0:00–0:15",
    "文字情報のソフトウェアを作っているmandel59です。今日は文字の知識と使える技術をつなぎ、自分で調べられるようにしてきた話をします。",
  );
  text(s, "文字情報ハックのすすめ", 78, 215, 1120, 110, 68, ink, true);
  text(s, "An Invitation to Hacking Character Data", 82, 340, 1090, 68, 37, accent);
  text(s, "Ryusei Yamaguchi / mandel59", 84, 532, 1090, 56, 30);
  text(s, "BiangBiangCon", 84, 594, 1050, 44, 25, muted);
}
// 02 Motivation
{
  const s = slide(
    "データはあるのに",
    "The data is there",
    "0:15–1:00",
    "始めた理由は、そこにデータがあるのに、自分が調べたい条件で検索できないのが嫌だったからです。公開された一覧と、検索できることは別です。条件を変えてどんな字があるのかを調べたい。紙の索引や既存の画面にその条件がなくても、自分の問いを試せるようにしたかったんです。",
  );
  text(s, "調べたい条件で\n検索できない", 80, 231, 1090, 182, 66, ink, true);
  text(s, "I cannot search by the conditions I care about", 84, 440, 1090, 93, 33, accent);
  pair(
    s,
    "その検索を、自分で作ってみる",
    "I can try building that search myself",
    85,
    572,
    1090,
    33,
    25,
  );
}
// 03 Attitude
{
  const s = slide(
    "ハッカーの心構え",
    "A hacker's attitude",
    "1:00–1:30",
    "ESRの『How To Become A Hacker』につながる心構えを込めています。使える知識や技術で自分から問題に取り組み、工夫や成果を共有する。記事を踏まえた私の説明です。難しいプログラムを書くことだけでなく、情報の整理や公開、基盤を支える仕事も考えます。",
    [r.esr, r.esrJa, r.own],
    "発表者による要約。逐語引用や唯一の定義ではない。AIへの関連付けは発表者の解釈。",
  );
  pair(s, "自分から問題に取り組む", "Take initiative in solving problems", 82, 229, 1100, 44, 29);
  pair(
    s,
    "既にある知識や技術を使う",
    "Build on existing knowledge and tools",
    82,
    369,
    1100,
    44,
    29,
  );
  pair(s, "工夫や成果を共有する", "Share the work and what you learn", 82, 509, 1100, 44, 29);
  link(s, "Eric S. Raymond  How To Become A Hacker / 日本語訳", r.esrJa, 84, 643, 1080, 23);
}
// 04 Historical source
{
  const s = slide(
    "2011年のMJ検索",
    "Searching MJ character data in 2011",
    "1:30–2:30",
    "2011年にMJ文字情報の一覧を使って検索ソフトウェアを作りました。必要な字を探しやすくしたくて、知っていたSQLiteへ取り込みました。当時の発表には、CSVをSQLiteに変換したことや、Unicodeにない字を扱ったことが書いてあります。TODOには他のデータとの組み合わせや部品検索もありました。",
    [r.old],
    "画像は旧発表PDF第5ページ。現在の仕様やライセンスを証明する資料にはしない。",
  );
  text(s, "一覧を取り込んで\n自分の検索を作る", 78, 248, 520, 154, 46, ink, true);
  text(s, "Import the list and make it searchable", 82, 423, 510, 100, 29, muted);
  const b = await fs.readFile(path.join(buildDir, "mj-2011-page5.png"));
  s.images.add({
    blob: b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength),
    contentType: "image/png",
    alt: "2011年の発表、アプリ作成の説明ページ",
    fit: "contain",
    position: { left: 635, top: 210, width: 560, height: 420 },
  });
  text(s, "Ryusei Yamaguchi「IPAmj明朝の漢字を検索」", 641, 639, 548, 31, 18, muted);
}
// 05 Environment-specific tools
{
  const s = slide(
    "環境に合わせて道具を選ぶ",
    "Choosing tools for the environment",
    "2:30–4:30",
    "手元ではCSVをSQLiteに取り込み、SQLを使えば検索を作れました。未符号化字はFreeTypeでフォントからグリフを取り出して表示しました。Web版をGitHub Pagesで動かすにはXMLとXPathへ変え、表示には画像を使いました。SQLiteを知っていたのは開発者だったからです。利用者には名前が見えなくてもアプリの内部で使われる道具です。こういう道具を知ることで、自分の検索を作るまでの距離が縮まります。",
    [r.old],
    "手元とWeb版は別の方式。旧PDF第5・6ページ。",
  );
  const a = stage(s, "MJの文字情報一覧", "Published MJ character list", 440, 203, 460, accent);
  const b = stage(s, "CSV ＋ SQLite", "Local application", 115, 378, 470);
  const c = stage(s, "XML ＋ XPath", "Web application", 730, 378, 450);
  connect(s, a, b, "bottom", "top");
  connect(s, a, c, "bottom", "top");
  pair(
    s,
    "未符号化字はFreeTypeで表示",
    "Render unencoded glyphs from the font",
    115,
    490,
    480,
    28,
    24,
  );
  pair(s, "未符号化字は画像で表示", "Display images of unencoded glyphs", 730, 490, 465, 28, 24);
  pair(
    s,
    "知っている技術で、使える検索にする",
    "Turn available data into a search you can use",
    82,
    600,
    1100,
    30,
    24,
    accent,
  );
}
// 06 Normalization, editable schematic tables
{
  const s = slide(
    "検索しやすい形に整える",
    "Preparing data for search",
    "4:30–6:00",
    "Mojidataでは形式の違うMJやUnihanを取り込みます。一つのセルの複数値は、仕様に従って個別のレコードに分けます。画面は説明用の表です。また、U+5F01のような符号位置の表記を弁という文字列にそろえると、他の表とつなぎやすくなります。区切り方は資料によって違い、意味を読んで決める必要があります。",
    [r.repo],
    "模式例。実際のテーブル表示ではない。正規化は正しさの保証ではない。MJ字形とUCS抽象文字は単位が違う。",
  );
  table(s, [["字 / Character", "値 / Values"], ["弁", "瓣 辨 辯"]], 80, 236, [190, 320], 150);
  table(s, [["字 / Character", "値 / Value"], ["弁", "瓣"], ["弁", "辨"], ["弁", "辯"]], 730, 236, [
    190,
    280,
  ], 288);
  const a = text(s, "複数値", 300, 405, 210, 50, 28, muted);
  const b = text(s, "個別の行", 755, 545, 400, 52, 30, accent);
  connect(s, a, b);
  text(s, "Multiple values", 300, 455, 220, 52, 24, muted);
  text(s, "Separate records", 755, 596, 400, 40, 24, muted);
  text(s, "模式例 / Schematic example", 80, 191, 1100, 35, 23, muted);
  pair(s, "符号位置の表記もそろえる", "Use UCS strings as common join keys", 82, 548, 530, 30, 24);
}
// 07 Combining sources
{
  const s = slide(
    "字の対応と画数をつなぐ",
    "Connecting relationships and stroke counts",
    "6:00–7:30",
    "略字に略す前の画数が一番少ない漢字は何か。対応に両側の画数を付け、減るものを元の画数で比べます。既存調査の条件では最小5画で、戹から厄などが候補になります。ただし画数差だけでは意図的に省いた字か分かりません。辞典で関係を確かめます。日本の新字体だけなら收6画と収4画が最小例になります。",
    [r.abbreviation, r.dict],
    "選定したsimplified関係とkJapaneseNewVariant、Unihan総画数先頭値による固定入力の結果。手書き略字全般の最小値ではない。",
  );
  table(s, [["対応元 / Source", "対応先 / Target"], ["戹", "厄"]], 80, 221, [250, 250], 148);
  table(
    s,
    [["字 / Character", "画数 / Strokes"], ["戹", "5"], ["厄", "4"]],
    730,
    221,
    [245, 245],
    222,
  );
  glyph(s, "戹", 105, 416, 180, 121, accent);
  text(s, "5画 / 5 strokes", 282, 445, 390, 69, 34);
  glyph(s, "厄", 735, 443, 150, 102, accent);
  text(s, "4画 / 4 strokes", 900, 469, 310, 66, 34);
  pair(
    s,
    "関係の来歴は、出典で確かめる",
    "Check the history in the sources",
    82,
    576,
    1100,
    33,
    25,
  );
}
// 08 Structural question, real examples
{
  const s = slide(
    "つくりが魚の漢字",
    "Characters with 魚 on the right",
    "7:30–8:30",
    "魚を含む字、魚へんの字、つくりが魚の字は違います。魚へんは魚部の索引で多くを見つけられます。でもつくりが魚の字は、漁なら水部、䗨なら虫部へ分かれます。紙の字典では内画数11の字を丹念に見るような探し方になります。包含だけでなく位置や構造を条件にしたいんです。",
    [r.chise],
    "構造の例: 漁=⿰氵魚、䗨=⿰虫魚。現在のMojidata検索結果全体ではない。",
  );
  pair(s, "魚へん", "Fish on the left", 105, 205, 420, 35, 26);
  glyph(s, "鯖", 130, 320, 300, 156);
  pair(s, "魚部", "Fish radical", 130, 529, 400, 32, 25);
  pair(s, "つくりが魚", "Fish on the right", 670, 205, 480, 35, 26, accent);
  glyph(s, "漁", 690, 320, 225, 156, accent);
  glyph(s, "䗨", 955, 320, 225, 156, accent);
  pair(s, "水部", "Water radical", 690, 529, 220, 32, 25);
  pair(s, "虫部", "Insect radical", 955, 529, 230, 32, 25);
}
// 09 Query syntax
{
  const s = slide(
    "構造を条件にする検索",
    "A query for the structure",
    "8:30–9:00",
    "全角アットマーク、左右構造の記号、疑問符、魚というクエリです。アットマークは字全体へ合わせること。左右構造の左は何でもよく、右は魚を持つという意味です。魚という文字列を含むだけでなく、構造を条件にできます。",
    [r.app, r.ids],
    "ユーザーインターフェースの構文。内部の全体一致記号とは区別する。",
  );
  text(s, "＠⿰？魚", 102, 222, 1080, 179, 116, accent, false, han);
  [["＠", "字全体", "Whole structure"], ["⿰", "左右", "Left–right"], [
    "？",
    "左側は任意",
    "Any left component",
  ], ["魚", "右側が魚", "Fish on the right"]]
    .forEach(([v, jp, en], i) => {
      const x = 84 + i * 294;
      glyph(s, v, x, 423, 230, 64);
      pair(s, jp, en, x, 524, 275, 29, 23);
    });
  link(s, "mojidata.ryusei.dev", r.app, 84, 648, 1080, 24);
}
// 10 Recursive decomposition
{
  const s = slide(
    "部品を再帰的に辿る",
    "Following components recursively",
    "9:00–9:45",
    "染は氿と木の上下構造です。氿を分解すると氵と九の左右構造になります。染の最初の記述に氵がなくても部品を辿れば見つかります。IDS DBは、こうした再帰的な分解の結果を持っています。",
    [r.ids, path.join(workspaceDir, "docs/mojidata-presentation.md")],
    "保存済み例: 染=⿱氿木、氿=⿰氵九。別条件の検索結果とは混ぜない。",
  );
  glyph(s, "染", 85, 255, 320, 168);
  text(s, "⿱氿木", 87, 477, 390, 85, 54, muted, false, han);
  const root = glyph(s, "⿱", 785, 185, 100, 68);
  const l = glyph(s, "⿰", 585, 335, 100, 68, accent), rr = glyph(s, "木", 985, 335, 100, 68);
  const a = glyph(s, "氵", 485, 499, 100, 68, accent),
    b = glyph(s, "九", 695, 499, 100, 68, accent);
  connect(s, root, l, "bottom", "top", false);
  connect(s, root, rr, "bottom", "top", false);
  connect(s, l, a, "bottom", "top", false);
  connect(s, l, b, "bottom", "top", false);
  text(s, "氿を展開 / Expand 氿", 440, 260, 350, 43, 24, accent);
  pair(s, "最初の記述にない氵も見つかる", "Find 氵 inside a component", 83, 589, 1100, 30, 24);
}
// 11 Prefix serialization and matching subtree colors
{
  const s = slide(
    "木構造を文字列にする",
    "Serializing trees in prefix order",
    "9:45–10:45",
    "親を先に書くポーランド記法で並べます。AとBは説明用の記号です。青い左側の部分木は、列の中でも連続します。この性質を使って、文字列を検索する仕組みが利用できます。文字の知識と技術の性質がつながるところです。",
    [r.ids],
    "説明用の木。部分木の列の性質と検索構文の意味は別。",
  );
  const root = glyph(s, "⿰", 310, 190, 100, 64);
  const l = glyph(s, "⿱", 160, 321, 100, 64, blue), rr = glyph(s, "魚", 475, 321, 100, 64);
  const a = text(s, "A", 105, 461, 90, 99, 68, blue), b = text(s, "B", 265, 461, 90, 99, 68, blue);
  connect(s, root, l, "bottom", "top", false);
  connect(s, root, rr, "bottom", "top", false);
  connect(s, l, a, "bottom", "top", false);
  connect(s, l, b, "bottom", "top", false);
  ["⿰", "⿱", "A", "B", "魚"].forEach((v, i) =>
    text(
      s,
      v,
      660 + i * 105,
      329,
      105,
      108,
      69,
      i > 0 && i < 4 ? blue : ink,
      false,
      v === "A" || v === "B" ? font : han,
    )
  );
  pair(s, "親を先に書く", "Write the parent first", 661, 452, 518, 32, 25);
  pair(
    s,
    "部分木は、連続した列になる",
    "A subtree becomes a contiguous sequence",
    83,
    594,
    1100,
    32,
    25,
    blue,
  );
}
// 12 FTS filter and exact check
{
  const s = slide(
    "全文検索の技術を応用する",
    "Repurposing full-text search",
    "10:45–12:30",
    "再帰的な分解を順序付きの列にして、汎用の全文検索、FTSで候補を絞ります。ワイルドカードや全体一致などの条件は、その後で構造として検査します。FTSだけですべてを判定するわけではありません。専用の仕組みを全部一から作る代わりに、汎用技術が得意な候補絞り込みを活用しています。文字の知識と情報処理をつなぐ使い方が、私にとってハックらしい工夫です。",
    [r.ids],
    "学術的な初出や唯一の方法とは主張しない。必要条件による候補絞り込みと構造の検査を分ける。",
  );
  const a = stage(s, "分解したIDSの列", "Serialized decompositions", 80, 270, 310);
  const b = stage(s, "FTSで候補を絞る", "Filter with full-text search", 490, 270, 310, accent);
  const c = stage(s, "構造の条件を検査", "Verify the structural query", 890, 270, 310);
  connect(s, a, b);
  connect(s, b, c);
  pair(
    s,
    "木構造の知識を、汎用の検索技術につなぐ",
    "Bridge character structures and a general-purpose search engine",
    82,
    511,
    1100,
    37,
    28,
    accent,
  );
}
// 13 Consistency checking
{
  const s = slide(
    "検索基盤でデータを検査する",
    "Using the search infrastructure to check data",
    "12:30–14:00",
    "整合性の仮説を立て、制約をクエリにし、外れる候補を調べます。誤りなのか、仮説に例外があるのか、出典を読んで確かめます。MJでは遡などの部首や内画数の問題を記事にしました。Unihanには𡿨の総画数を3から1へ訂正する報告もしています。ここでの一般的な流れを、当時の正確な発見手順とは言いません。",
    [r.mj, r.report21, r.review21],
    "MJ記事の遡の候補記録は水部・内画数14。抽出SQLは歴史的に未確認。𡿨は2021年の報告とUnicode 14.0向け勧告。",
  );
  const a = [["仮説", "Hypothesis"], ["制約", "Query constraint"], ["候補", "Candidates"], [
    "出典確認",
    "Source review",
  ]]
    .map(([jp, en], i) => stage(s, jp, en, 82 + i * 295, 202, 225, i === 2 ? accent : ink));
  for (let i = 0; i < a.length - 1; i++) connect(s, a[i], a[i + 1]);
  glyph(s, "遡", 115, 355, 180, 127);
  pair(s, "水部・内画数14", "Water radical, 14 residual strokes", 297, 402, 320, 29, 24);
  glyph(s, "𡿨", 750, 355, 190, 127);
  pair(s, "総画数 3 → 1", "Total strokes: 3 to 1", 950, 402, 250, 29, 24);
  pair(
    s,
    "外れる記録は、調べるべき候補",
    "An inconsistency is a candidate for investigation",
    83,
    592,
    1100,
    32,
    25,
  );
}
// 14 Lookalikes and proposal
{
  const s = slide(
    "似た字の発見とUnihanへの提案",
    "Finding lookalikes and proposing relationships",
    "14:00–16:00",
    "2022年にIDS検索で常用漢字にそっくりな字を探しました。十と𬂛、兵と𠔊などです。Unihanの関係情報と照合し、未登録の関係を提案しました。専門家の検討では一部の分類を修正し、Unicode 15.0へ向けた更新を勧告しました。見つけた候補がそのまま正しい分類になるとは限りません。根拠を持ち寄って検討へ参加することも、公開データを使うことの広がりです。",
    [r.report22, r.review22, "https://x.com/mandel59/status/1543854321150099456"],
    "L2/22-133は2022-07-05付。分類修正とUnicode 15.0向け勧告を区別し、現行データへの全候補反映とは主張しない。",
  );
  glyph(s, "十", 92, 222, 230, 157);
  glyph(s, "𬂛", 350, 222, 250, 157, accent);
  glyph(s, "兵", 708, 222, 230, 157);
  glyph(s, "𠔊", 970, 222, 230, 157, accent);
  const a = stage(s, "候補を提案", "Propose candidates", 84, 463, 300);
  const b = stage(s, "分類を検討", "Review classification", 492, 463, 300);
  const c = stage(s, "更新を勧告", "Recommend updates", 899, 463, 300);
  connect(s, a, b);
  connect(s, b, c);
  ["U+5341", "U+2C09B", "U+5175", "U+2050A"].forEach((value, i) => {
    text(s, value, [95, 353, 710, 973][i], 421, 230, 35, 23, muted);
  });
  text(s, "2022  L2/22-133", 85, 636, 1080, 40, 23, muted);
}
// 15 Expert knowledge and externalized knowledge
{
  const s = slide(
    "記憶の知識と、外部化した知識",
    "Knowledge in memory and in shared data",
    "16:00–16:30",
    "詳しい人は辞書を読んで多くの字を覚え、脳そのものが自由な索引になります。来歴や文脈、文字の原理への洞察もあります。一方、外部化した知識なら大量の記録を同じ条件で調べ、他の人が検証し再利用できます。この両方をつなぐことが大事です。",
  );
  pair(s, "脳の索引", "An index in our memory", 83, 225, 520, 43, 28, accent);
  pair(s, "外部化した知識", "Externalized knowledge", 706, 225, 495, 43, 28, accent);
  pair(s, "字の来歴や文脈", "History and context", 83, 384, 515, 33, 25);
  pair(s, "大量の記録を比較", "Compare many records", 706, 384, 494, 33, 25);
  pair(s, "文字の原理への洞察", "Insight into character principles", 83, 516, 540, 33, 25);
  pair(s, "他の人が検証・再利用", "Others can check and reuse it", 706, 516, 494, 33, 25);
}
// 16 Unification criteria as a desired reusable input
{
  const s = slide(
    "符号化済みかを調べる知識",
    "Knowledge for checking whether a character is encoded",
    "16:30–17:00",
    "UCSで既に符号化された字かどうかは、形や構造だけでは判断できず、統合基準の知識も必要です。現状はZ Variantなどで同一性を補っています。UCVのような基準が再利用できるオープンデータになれば、より正確な処理や標準化支援の道具を作れます。",
    [r.ids],
    "UCV=Unifiable Component Variations。将来への希望。現在の利用条件の調査結果や実装済みの機能として述べない。",
  );
  const a = stage(s, "字形・構造", "Glyphs and structures", 120, 229, 480);
  const b = stage(s, "統合基準", "Unification criteria", 730, 229, 460, accent);
  const c = stage(s, "UCSの抽象文字", "Abstract characters in the UCS", 397, 422, 570);
  connect(s, a, c, "bottom", "top");
  connect(s, b, c, "bottom", "top");
  pair(
    s,
    "UCVなども、再利用できるオープンデータに",
    "Reusable open data for unification criteria such as UCV",
    83,
    593,
    1100,
    32,
    25,
    accent,
  );
}
// 17 AI as one available tool
{
  const s = slide(
    "使える技能も借りる",
    "Drawing on available skills",
    "17:00–17:30",
    "私は最近、Mojidataの更新でもAIにかなり頼っています。プロパティの差分確認や、日本の新旧字体の取り扱いの更新などです。心構えは技能の代用になりませんが、必要な技能を借りて取り組むことも、一緒に学ぶこともできます。使える技術で問題に取り組む姿勢は同じです。",
    [r.repo],
    "本人の説明とローカル履歴db872f60、91b03714（2026-09-22）。両コミットにCodex生成記録。全判断をAIに帰属させない。",
  );
  text(s, "最近のMojidata更新は\nAIにかなり頼っている", 83, 225, 1095, 172, 54, ink, true);
  text(s, "I rely heavily on AI for recent Mojidata updates", 85, 418, 1090, 82, 31, accent);
  pair(
    s,
    "技能を活用して取り組み、必要なら一緒に学ぶ",
    "Use available skills and learn together when needed",
    85,
    540,
    1090,
    33,
    25,
  );
}
// 18 Invitation and sharing
{
  const s = slide(
    "自分で分析し、小さな成果も公開する",
    "Analyze data and share small contributions",
    "17:30–18:00",
    "オープンデータを自分で分析してみよう。対応表や誤り候補、クエリだけでも、次の人が加工できる形で公開してほしいです。出典と利用条件を付け、確定事項と要検証を分ける。データを整える仕事も参加です。公開された知識を使い、検証や改善へ参加する点でオープンサイエンスにもつながります。",
    [r.science, r.app, r.repo],
    "本編はここまで。18分と余裕2分を想定。後続4枚は補足。",
  );
  pair(
    s,
    "気になる問いを試す",
    "Investigate a question you care about",
    83,
    224,
    1100,
    43,
    29,
    accent,
  );
  text(s, "対応表 / Character mappings", 85, 383, 690, 64, 34);
  text(s, "誤り候補 / Potential errors", 85, 459, 690, 64, 34);
  text(s, "分析クエリ / Analysis queries", 85, 535, 690, 64, 34);
  pair(s, "オープンサイエンス", "Open science", 819, 383, 370, 29, 25, accent);
  text(s, "知識の検証・改善に参加する", 819, 501, 370, 83, 27);
  text(s, "Join the review and improvement of knowledge", 819, 578, 370, 63, 23, muted);
  text(s, "出典・利用条件・検証状況を添える", 86, 615, 1100, 45, 27, muted);
  text(s, "Include sources, reuse terms and verification status", 86, 656, 1070, 37, 23, muted);
}
// 19 Appendix: delimiters
{
  const s = slide(
    "補足  自由文の区切り文字",
    "Appendix: delimiters in prose",
    "補足 / Appendix",
    "kDefinitionでセミコロンを複数値の区切りにする仕様変更がありましたが、自由文では説明途中や括弧内にも出てきます。2024年2月に報告し、検討ではデータを変えず仕様変更を戻す方向となりました。文書から区切り方を取り出す実装は6月であり、2月の発見原因だったとは言えません。",
    [r.delimiter, r.delimiterReview],
    "Mojidata 0d9b844cは2024-06-06。発見経路は未確認。",
  );
  text(s, ";", 95, 211, 235, 205, 168, accent);
  pair(
    s,
    "値の境界？  文章中の記号？",
    "A value boundary or punctuation in prose?",
    340,
    265,
    850,
    40,
    28,
  );
  pair(
    s,
    "kDefinitionの仕様を、実際の文章と照合する",
    "Check the specification against the actual definitions",
    85,
    475,
    1100,
    34,
    26,
  );
  text(s, "2024年2月の報告 / Reported in February 2024", 87, 622, 1070, 42, 25, muted);
}
// 20 Appendix: specific maintenance
{
  const s = slide(
    "補足  最近の更新作業",
    "Appendix: recent maintenance work",
    "補足 / Appendix",
    "9月22日はUnicodeのプロパティ定義と実データの差分確認の手順を文書化し、日本の新旧字体を検索対象に含めました。この二件にはCodexの生成記録があります。10月10日のIVD・文字マップ更新には登録差分と既存データへの影響の確認が記録されています。",
    [r.repo],
    "ローカル履歴db872f60、91b03714、167f36bc。docs/unicode-update.md、docs/data-updates/2026-10-10-ivd-cmap.md。検査を再実行した証明や公開済みの証明とはしない。",
  );
  table(
    s,
    [
      ["日付 / Date", "作業 / Work", "確認 / Check"],
      ["2026-09-22", "プロパティの差分\nProperty diffs", "定義と実データ\nSpec and data"],
      ["2026-09-22", "日本の新旧字体\nJapanese variants", "複数値・検索対象\nValues and search"],
      ["2026-10-10", "IVD・文字マップ\nIVD and cmap", "登録差分・既存値\nNew and existing data"],
    ],
    83,
    218,
    [240, 462, 410],
    383,
    27,
  );
  text(s, "履歴 / Commits: db872f60, 91b03714, 167f36bc", 87, 633, 1110, 40, 24, muted);
}
// 21 Appendix: complete minimum candidates
{
  const s = slide(
    "補足  最小画数は条件で変わる",
    "Appendix: the minimum depends on the conditions",
    "補足 / Appendix",
    "選んだsimplified関係と日本の新字体の関係では、最小の対応元は5画でこの6字が候補です。日本の新字体だけなら收6画と収4画。Unihanの先頭の画数値を使っています。手書き略字全般を網羅せず、成立順序も表からは分かりません。",
    [r.abbreviation, r.dict],
    "選定されたsimplifiedラベルとkJapaneseNewVariant。画数が既知で減る対応を比較。",
  );
  table(
    s,
    [
      ["対応元 / Source", "画数 / Strokes", "対応先 / Target", "画数 / Strokes"],
      ["匃", "5", "丐", "4"],
      ["匄", "5", "丐", "4"],
      ["宁", "5", "㝉", "4"],
      ["宂", "5", "冗", "4"],
      ["戹", "5", "厄", "4"],
      ["疋", "5", "匹", "4"],
    ],
    83,
    212,
    [335, 220, 335, 220],
    350,
    27,
  );
  pair(
    s,
    "日本の新字体だけなら、收6画と収4画",
    "Japanese shinjitai only: 收 with 6 strokes and 収 with 4",
    85,
    592,
    1110,
    29,
    24,
  );
}
// 22 Appendix: clickable references
{
  const s = slide(
    "参照文献と入口",
    "References and places to start",
    "補足 / Appendix",
    "参照文献とMojidataの入口です。公開検索を使う、データを整える、erq-mojidata-playgroundをクローンして分析することなどから参加できます。",
    Object.values(r).filter((v) => v.startsWith("http")),
  );
  [
    ["ESR  How To Become A Hacker（日本語訳）", r.esrJa, "cruel.org/freeware/hacker.html"],
    ["Ryusei  ハックとデジタル社会", r.own, "mandel59.hateblo.jp/entry/2023/11/19/212703"],
    ["MJ文字情報一覧 部首・内画数の誤り", r.mj, "mandel59.hateblo.jp/entry/2024/02/09/005117"],
    [
      "Unihanへの類似字提案 / Lookalike proposal",
      r.report22,
      "unicode.org/L2/L2022/22133-kspoofing-kzvariant-cand.pdf",
    ],
    ["UNESCO  Open science", r.science, "unesco.org/en/open-science/about"],
    ["Mojidata  公開検索 / Search", r.app, "mojidata.ryusei.dev"],
  ].forEach(([label, uri, url], i) => {
    const y = 192 + i * 78;
    text(s, label, 84, y, 1110, 41, 27);
    link(s, url, uri, 86, y + 40, 1110, 23);
  });
}
const owners = [...new Set(nativeTables)];
const candidatePath = path.join(buildDir, "candidate.pptx");
await (await PresentationFile.exportPptx(presentation)).save(candidatePath);
const runtimeRoot = path.resolve(manifest, "../..");
const validation = await finalizePresentation({
  workspaceDir,
  candidatePath,
  finalPath: outputPath,
  pythonExecutable: path.join(runtimeRoot, "python/python.exe"),
  integrityValidatorPath: path.join(
    skillDir,
    "container_tools/inspect_presentation_package_integrity.py",
  ),
  layoutValidatorPath: path.join(
    skillDir,
    "container_tools/inspect_presentation_layout_geometry.py",
  ),
  layoutArgs: [
    "--expected-slide-size-emu",
    "12192000,6858000",
    "--validate-heading-fit",
    ...owners.flatMap((n) => ["--require-native-table-slide", String(n)]),
  ],
  requiredNativeTableOwnerSlides: owners,
  requiredNativeChartOwnerSlides: [],
  fontPolicy: { basis: "design", families: [font, han] },
  verifyArtifactToolImport: true,
  receiptPath: path.join(buildDir, path.basename(outputPath) + ".validation.json"),
});
const deck = await PresentationFile.importPptx(await FileBlob.load(outputPath));
for (const [i, s] of deck.slides.items.entries()) {
  const stem = "slide-" + String(i + 1).padStart(2, "0");
  await writeBlob(
    path.join(buildDir, stem + ".png"),
    await deck.export({ slide: s, format: "png", scale: 1 }),
  );
  const layout = await s.export({ format: "layout" });
  await fs.writeFile(path.join(buildDir, stem + ".layout.json"), await layout.text());
}
console.log(JSON.stringify({ slides: deck.slides.items.length, outputPath, validation }));
