"""Subset the Jigmo fonts to the Han characters used in slides.md, as WOFF2 for the web.

Jigmo (https://kamichikoichi.github.io/jigmo/) is CC0. Download and unzip it, then run:
python fonts/subset-jigmo.py <dir with Jigmo.ttf, Jigmo2.ttf, Jigmo3.ttf>
Needs `pip install fonttools brotli`. Rerun after adding characters to the slides.
"""
import os
import sys

from fontTools import subset
from fontTools.ttLib import TTFont

HERE = os.path.dirname(os.path.abspath(__file__))
SLIDES = os.path.join(HERE, "..", "slides.md")
# CJK radicals, strokes, IDCs, unified ideographs (all extensions) and compatibility ideographs
RANGES = [(0x2E80, 0x2FFF), (0x31C0, 0x31EF), (0x3400, 0x4DBF), (0x4E00, 0x9FFF),
          (0xF900, 0xFAFF), (0x20000, 0x3FFFF)]


def main(src):
    text = open(SLIDES, encoding="utf-8").read()
    used = {ord(c) for c in text if any(lo <= ord(c) <= hi for lo, hi in RANGES)}
    for name in ("Jigmo", "Jigmo2", "Jigmo3"):
        path = os.path.join(src, f"{name}.ttf")
        cmap = TTFont(path, lazy=True).getBestCmap()
        codepoints = sorted(used & cmap.keys())
        options = subset.Options()
        options.flavor = "woff2"
        options.layout_features = ["*"]
        font = subset.load_font(path, options)
        subsetter = subset.Subsetter(options)
        subsetter.populate(unicodes=codepoints)
        subsetter.subset(font)
        out = os.path.join(HERE, f"{name}-subset.woff2")
        subset.save_font(font, out, options)
        print(name, len(codepoints), os.path.getsize(out))


if __name__ == "__main__":
    main(sys.argv[1])
