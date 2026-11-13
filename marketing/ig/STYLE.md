# Golden Chain Instagram style (Joshua's standing preferences)
- Every post's FIRST slide: full-bleed public-domain old-master artwork (NGA/Met open access), dark gradient at the bottom, headline in Instrument Serif with one gold italic word, small kicker or tag top-left, @golden_chain_cath footer + "Swipe →". Use the COVER() helper in posts.js. (Joshua liked posts 01 and 02 most.)
- Inner slides: vellum / ink / gold alternation as in posts.js; gap above the footer; phone mockups at the screenshot's true ratio.
- Logo: minimal gold sunburst ALWAYS on its cream-white disc in posts and the app icon (brand/mark.svg small, brand/seal.svg large).
- Never AI art. Captions: hook first, plain English, max 5 hashtags. Post 18:30 SAST via Chrome.

## Image quality and creative formats (added 10 Nov 2026)
- Never upscale. Every art crop must be at least 2160 px wide (2x the slide). Fetch crops straight from the museum IIIF server by region (see crops.py); NGA scans are 15,000 px and larger.
- Hook slide: headline under 40 characters, upper-middle, one idea, museum label bottom-left, "Swipe" bottom-right.
- One idea per slide. Keep text inside the central safe zone; nothing important on a seam.
- Formats to rotate: Look closer (detail tour with caption cards), gallery wall (framed painting and label), stacked big type on engravings, icon roundel, myth cards with stamp, typographic reveal, specimen cards (humour), two-slide panorama, arch window on a seasonal colour.
- Always credit the artwork in the caption.

## Redesign of unposted carousels (10 Nov 2026)
- redo.js rebuilds posts 07, 09-24, 26-30, 32, 34, 36, 38 from the original copy with new covers and a continuous art spine on inner slides.
- Cover styles rotate so the grid never repeats: hook (full-bleed), arch (painting in an arch on a seasonal colour), split (picture over a colour block), frame (gallery wall), round (roundel on paper).
- All art re-fetched at 4096 px. Rembrandt's Jacob's Ladder was dropped because the museum scan is only 790 px wide.

## Reference styles (13 Nov, posts 51-55, posts8.js)
Joshua sent reference posts he likes. Formats to keep using: (a) one painting over 2-3 slides with a yellow italic "subtitle" line and halftone dots; (b) full-bleed painting with a small elegant feast/season title, then text-free detail slides; (c) dark paper, short white quote, a glowing painting detail and outline sparkles; (d) cream paper, huge tight red sans, high-contrast black-and-white etching with a torn edge; (e) grey duotone painting with red blackletter. Little or no body text; the caption carries the explanation and the art credit.
