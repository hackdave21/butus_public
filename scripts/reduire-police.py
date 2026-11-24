"""Réduit Bricolage Grotesque à ce que le site utilise : largeur 90 %, graisses 700 à 800.
L'axe opsz (taille optique) est gardé, donc le dessin des titres ne change pas.

À relancer seulement si la police est mise à jour, ou si une autre graisse ou largeur devient nécessaire :
    pip install fonttools brotli
    python scripts/reduire-police.py
"""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'node_modules/@fontsource-variable/bricolage-grotesque'
OUT = ROOT / 'src/fonts'
OUT.mkdir(exist_ok=True)

for subset in ('latin', 'latin-ext', 'vietnamese'):
    src = SRC / f'files/bricolage-grotesque-{subset}-standard-normal.woff2'
    font = instancer.instantiateVariableFont(TTFont(src), {'wdth': 90, 'wght': (700, 800)})
    font.flavor = 'woff2'
    out = OUT / f'bricolage-grotesque-{subset}.woff2'
    font.save(out)
    print(f'{out.name} : {src.stat().st_size} -> {out.stat().st_size} octets')

(OUT / 'bricolage-grotesque-LICENSE.txt').write_bytes((SRC / 'LICENSE').read_bytes())
