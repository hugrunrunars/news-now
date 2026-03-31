<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Fréttir · Design Principles</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  :root {
    --violet: #834DFB;
    --yellow: #F0E100;
    --dark:   #18102B;
    --chalk:  #F5F3FF;
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'DM Sans', sans-serif;
    background: #0e0b18;
    color: var(--chalk);
    padding: 48px 24px 80px;
  }
  .doc { max-width: 720px; margin: 0 auto; }

  .cover {
    background: var(--violet);
    border-radius: 20px;
    padding: 40px 36px 36px;
    margin-bottom: 36px;
    position: relative;
    overflow: hidden;
  }
  .cover::after {
    content: '';
    position: absolute;
    bottom: -60px; right: -60px;
    width: 220px; height: 220px;
    border-radius: 50%;
    background: rgba(255,255,255,0.08);
  }
  .cover-tag { font-size: 11px; font-weight: 500; letter-spacing: .1em; color: rgba(255,255,255,0.6); text-transform: uppercase; margin-bottom: 14px; }
  .cover-title { font-size: 36px; font-weight: 700; color: #fff; line-height: 1.1; margin-bottom: 6px; }
  .cover-sub { font-size: 14px; color: rgba(255,255,255,0.65); margin-bottom: 28px; }
  .cover-pills { display: flex; gap: 8px; flex-wrap: wrap; }
  .pill { font-size: 11px; font-weight: 700; padding: 5px 13px; border-radius: 20px; letter-spacing: .04em; text-transform: uppercase; }
  .pill-yellow { background: var(--yellow); color: var(--dark); }
  .pill-dark   { background: var(--dark);   color: var(--chalk); }
  .pill-ghost  { background: rgba(255,255,255,0.15); color: #fff; border: 1px solid rgba(255,255,255,0.25); }

  .section { margin-bottom: 32px; }
  .section-label {
    font-size: 10px; font-weight: 700; letter-spacing: .12em; color: var(--violet);
    text-transform: uppercase; margin-bottom: 14px; padding-bottom: 10px;
    border-bottom: 1px solid rgba(131,77,251,0.25);
  }

  .principle-card {
    background: #1c1430;
    border: 1px solid rgba(131,77,251,0.2);
    border-radius: 16px;
    padding: 18px 20px;
    margin-bottom: 10px;
  }
  .pc-header { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px; }
  .pc-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; margin-top: 5px; }
  .pc-title { font-size: 15px; font-weight: 700; color: var(--chalk); }
  .pc-body { font-size: 13px; color: rgba(245,243,255,0.6); line-height: 1.65; padding-left: 20px; }

  .example-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 12px; }
  .example-box { background: #110d20; border-radius: 10px; padding: 12px 14px; border: 1px solid rgba(131,77,251,0.15); }
  .ex-label { font-size: 10px; font-weight: 700; color: var(--violet); text-transform: uppercase; letter-spacing: .08em; margin-bottom: 8px; }

  .nav-mock { display: flex; gap: 7px; flex-wrap: wrap; }
  .nav-pill { font-size: 12px; font-weight: 700; padding: 4px 13px; border-radius: 20px; }
  .nav-active { background: var(--violet); color: #fff; }
  .nav-yellow { background: var(--yellow); color: var(--dark); }
  .nav-ghost  { border: 1.5px dashed rgba(245,243,255,0.3); color: rgba(245,243,255,0.4); }

  .type-scale { display: grid; gap: 8px; margin-top: 10px; }
  .ts-row { display: flex; align-items: baseline; gap: 12px; }
  .ts-meta { font-family: 'DM Mono', monospace; font-size: 10px; color: rgba(245,243,255,0.35); min-width: 120px; }

  .color-row { display: flex; gap: 8px; margin-top: 12px; flex-wrap: wrap; }
  .color-chip { border-radius: 10px; padding: 10px 16px; font-size: 12px; font-weight: 700; }

  .hero-mock { background: #110d20; border-radius: 10px; padding: 14px; margin-top: 12px; display: flex; gap: 12px; border: 1px solid rgba(131,77,251,0.15); }
  .hero-img { width: 96px; height: 68px; background: linear-gradient(135deg, #2a1f45, #3d2a66); border-radius: 8px; flex-shrink: 0; }
  .hero-meta { flex: 1; }
  .hero-tag { display: flex; gap: 6px; margin-bottom: 6px; align-items: center; }
  .hero-tag-pill { font-size: 10px; font-weight: 700; padding: 2px 9px; border-radius: 20px; border: 1px solid var(--violet); color: var(--violet); text-transform: uppercase; letter-spacing: .04em; }
  .hero-tag-text { font-size: 10px; color: rgba(245,243,255,0.4); }
  .hero-headline { font-size: 13px; font-weight: 700; color: var(--chalk); line-height: 1.35; margin-bottom: 10px; }
  .hero-cta { display: flex; justify-content: flex-end; }
  .hero-btn { background: var(--yellow); color: var(--dark); font-size: 11px; font-weight: 700; padding: 5px 13px; border-radius: 20px; }

  .grid-demo { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-top: 10px; }
  .grid-card { background: #110d20; border-radius: 10px; overflow: hidden; border: 1px solid rgba(131,77,251,0.15); }
  .grid-img { height: 52px; background: linear-gradient(135deg, #1e1535, #2e1f50); }
  .grid-body { padding: 8px 10px; }
  .grid-tag { font-size: 10px; font-weight: 700; margin-bottom: 3px; text-transform: uppercase; letter-spacing: .04em; }
  .grid-text { font-size: 11px; color: var(--chalk); font-weight: 500; line-height: 1.3; }

  .swatch-strip { display: flex; border-radius: 12px; overflow: hidden; margin-top: 14px; height: 52px; }
  .swatch { flex: 1; display: flex; align-items: flex-end; padding: 6px 10px; }
  .swatch-label { font-family: 'DM Mono', monospace; font-size: 9px; font-weight: 500; opacity: 0.7; }

  .do-dont { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 12px; }
  .do-box { border-radius: 10px; padding: 14px 16px; }
  .do   { background: rgba(240,225,0,0.07); border: 1px solid rgba(240,225,0,0.28); }
  .dont { background: rgba(131,77,251,0.07); border: 1px solid rgba(131,77,251,0.22); }
  .do-label { font-size: 10px; font-weight: 700; margin-bottom: 7px; text-transform: uppercase; letter-spacing: .08em; }
  .do   .do-label { color: var(--yellow); }
  .dont .do-label { color: var(--violet); }
  .do-text { font-size: 12px; line-height: 1.55; color: rgba(245,243,255,0.55); }
</style>
</head>
<body>
<div class="doc">

  <div class="cover">
    <div class="cover-tag">Fréttir · Design System</div>
    <div class="cover-title">Design Principles</div>
    <div class="cover-sub">Version 1.0 · News App UI Guidelines</div>
    <div class="cover-pills">
      <span class="pill pill-yellow">Typography</span>
      <span class="pill pill-dark">Colour</span>
      <span class="pill pill-ghost">Navigation</span>
      <span class="pill pill-ghost">Layout</span>
      <span class="pill pill-ghost">Hierarchy</span>
    </div>
  </div>

  <div class="section">
    <div class="section-label">Colour palette</div>
    <div class="principle-card">
      <div class="pc-header">
        <div class="pc-dot" style="background:var(--violet)"></div>
        <div class="pc-title">Quantus palette 2025</div>
      </div>
      <div class="pc-body">Four anchors. Electric Violet owns interaction and brand. Turbo yellow signals action and CTAs. Haiti anchors all dark surfaces. Blue Chalk is the lightest neutral — used for body text and subtle backgrounds.</div>
      <div class="swatch-strip">
        <div class="swatch" style="background:#834DFB"><span class="swatch-label" style="color:#fff">#834DFB</span></div>
        <div class="swatch" style="background:#F0E100"><span class="swatch-label" style="color:#18102B">#F0E100</span></div>
        <div class="swatch" style="background:#18102B"><span class="swatch-label" style="color:#F5F3FF">#18102B</span></div>
        <div class="swatch" style="background:#F5F3FF"><span class="swatch-label" style="color:#18102B">#F5F3FF</span></div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-label">Core philosophy</div>
    <div class="principle-card">
      <div class="pc-header">
        <div class="pc-dot" style="background:var(--violet)"></div>
        <div class="pc-title">Content clarity above all</div>
      </div>
      <div class="pc-body">The interface should disappear. Headlines, images, and timestamps carry the full weight of user attention — chrome, controls, and decoration are secondary. Every layout decision starts with: does this help the reader get to the story faster?</div>
    </div>
    <div class="principle-card">
      <div class="pc-header">
        <div class="pc-dot" style="background:var(--yellow)"></div>
        <div class="pc-title">Informed scanning over forced reading</div>
      </div>
      <div class="pc-body">Readers scan before they read. The layout must reward scanning: a strong headline, a clear category pill, and a thumbnail image should be enough for a user to decide whether to continue. Summary text and timestamps are supporting details — never load-bearing.</div>
    </div>
    <div class="principle-card">
      <div class="pc-header">
        <div class="pc-dot" style="background:var(--chalk)"></div>
        <div class="pc-title">Dark surfaces, vivid signals</div>
      </div>
      <div class="pc-body">The app chrome uses Haiti (#18102B) to visually recede. Interactive elements and category pills use Electric Violet or Turbo yellow. Colour always carries meaning — it is never used for ambient decoration.</div>
    </div>
  </div>

  <div class="section">
    <div class="section-label">Navigation</div>
    <div class="principle-card">
      <div class="pc-header">
        <div class="pc-dot" style="background:var(--violet)"></div>
        <div class="pc-title">Topic pills as primary navigation</div>
      </div>
      <div class="pc-body">Horizontal scrollable pill-row for topic filtering. The active state uses Electric Violet fill with white text. High-priority or breaking categories may use Turbo yellow. The "add topic" slot uses a ghost outline — never a fill — to signal editability.</div>
      <div class="example-row">
        <div class="example-box">
          <div class="ex-label">Topic pills</div>
          <div class="nav-mock">
            <span class="nav-pill nav-active">Allt</span>
            <span class="nav-pill nav-yellow">World</span>
            <span class="nav-pill" style="background:rgba(131,77,251,0.2);color:var(--violet)">Technology</span>
            <span class="nav-pill" style="background:rgba(245,243,255,0.07);color:rgba(245,243,255,0.5)">Science</span>
          </div>
        </div>
        <div class="example-box">
          <div class="ex-label">Add topic</div>
          <div class="nav-mock">
            <span class="nav-pill nav-ghost">+ Bæta við</span>
          </div>
          <div class="pc-body" style="padding:8px 0 0;font-size:11px">Ghost border only. Never filled. Never violet.</div>
        </div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-label">Layout &amp; composition</div>
    <div class="principle-card">
      <div class="pc-header">
        <div class="pc-dot" style="background:var(--yellow)"></div>
        <div class="pc-title">Hero + grid: a two-tier hierarchy</div>
      </div>
      <div class="pc-body">The top story is a full-width hero with a large image left, rich metadata right, and a Turbo yellow CTA. Below it, secondary stories use a three-column card grid. Never mix the two modes within a section — the size contrast communicates editorial importance.</div>
      <div class="hero-mock">
        <div class="hero-img"></div>
        <div class="hero-meta">
          <div class="hero-tag">
            <span class="hero-tag-pill">World</span>
            <span class="hero-tag-text">World news · Nýjast</span>
          </div>
          <div class="hero-headline">Middle East crisis live: 'Go get your own oil,' Trump tells allies</div>
          <div class="hero-cta"><span class="hero-btn">Lesa meira →</span></div>
        </div>
      </div>
      <div class="grid-demo">
        <div class="grid-card"><div class="grid-img"></div><div class="grid-body"><div class="grid-tag" style="color:var(--violet)">World</div><div class="grid-text">Italy denies use of Sicily airbase</div></div></div>
        <div class="grid-card"><div class="grid-img"></div><div class="grid-body"><div class="grid-tag" style="color:var(--violet)">World</div><div class="grid-text">Sicily airbase – Europe live</div></div></div>
        <div class="grid-card"><div class="grid-img"></div><div class="grid-body"><div class="grid-tag" style="color:var(--yellow)">Technology</div><div class="grid-text">UK parents: screen time for under-fives</div></div></div>
      </div>
    </div>
    <div class="principle-card">
      <div class="pc-header">
        <div class="pc-dot" style="background:var(--chalk)"></div>
        <div class="pc-title">Images bleed to card edges</div>
      </div>
      <div class="pc-body">Card thumbnails fill the full width of the card with no internal padding or rounding on the image. Apply corner radius to the card container, not the image. The image is a visual anchor — clipping or padding it weakens the card's presence.</div>
    </div>
  </div>

  <div class="section">
    <div class="section-label">Typography</div>
    <div class="principle-card">
      <div class="pc-header">
        <div class="pc-dot" style="background:var(--yellow)"></div>
        <div class="pc-title">Three-level type scale</div>
      </div>
      <div class="pc-body">Headlines use weight 700 at large size to demand attention. Body and summary text uses weight 400 in Blue Chalk at reduced opacity. Category labels are weight 700 at small size in the category colour. Never exceed three type sizes within a single card.</div>
      <div class="type-scale">
        <div class="ts-row"><span class="ts-meta">hero headline</span><span style="font-size:18px;font-weight:700;color:#F5F3FF">Middle East crisis live</span></div>
        <div class="ts-row"><span class="ts-meta">card headline</span><span style="font-size:14px;font-weight:700;color:#F5F3FF">Italy denies use of Sicily airbase</span></div>
        <div class="ts-row"><span class="ts-meta">summary</span><span style="font-size:13px;font-weight:400;color:rgba(245,243,255,0.5)">Defence ministry says US failed to request authorisation</span></div>
        <div class="ts-row"><span class="ts-meta">category label</span><span style="font-size:11px;font-weight:700;color:#834DFB;text-transform:uppercase;letter-spacing:.06em">World news</span></div>
        <div class="ts-row"><span class="ts-meta">timestamp</span><span style="font-size:11px;font-weight:400;color:rgba(245,243,255,0.35)">Rétt núna · Nýjast</span></div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-label">Colour usage rules</div>
    <div class="principle-card">
      <div class="pc-header">
        <div class="pc-dot" style="background:var(--violet)"></div>
        <div class="pc-title">Colour encodes role, not decoration</div>
      </div>
      <div class="pc-body">Every colour use must have a function. Electric Violet = brand, interaction, active state. Turbo yellow = primary CTA, breaking/priority category. Haiti = dark surfaces and app chrome. Blue Chalk = body text, subtle fills. Never apply a palette colour purely for visual variety.</div>
      <div class="color-row">
        <span class="color-chip" style="background:#834DFB;color:#fff">Electric Violet</span>
        <span class="color-chip" style="background:#F0E100;color:#18102B">Turbo</span>
        <span class="color-chip" style="background:#18102B;color:#F5F3FF;border:1px solid rgba(245,243,255,0.1)">Haiti</span>
        <span class="color-chip" style="background:#F5F3FF;color:#18102B">Blue Chalk</span>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-label">Metadata &amp; labelling</div>
    <div class="principle-card">
      <div class="pc-header">
        <div class="pc-dot" style="background:var(--violet)"></div>
        <div class="pc-title">Category badge + section + recency tag</div>
      </div>
      <div class="pc-body">Each story carries up to three metadata signals in a horizontal strip above the headline: a coloured category pill, a plain-text section name, and an optional recency badge ("Nýjast"). The coloured pill is always leftmost. Keep this strip to one line — never wrap or stack.</div>
    </div>
    <div class="principle-card">
      <div class="pc-header">
        <div class="pc-dot" style="background:var(--yellow)"></div>
        <div class="pc-title">Translate on demand, not by default</div>
      </div>
      <div class="pc-body">Content loads in source language. A "Þýði…" (Translate…) link below the summary offers translation without forcing it. This respects readers who can read the original and avoids machine-translation errors in the primary reading flow.</div>
    </div>
  </div>

  <div class="section">
    <div class="section-label">Do / don't</div>
    <div class="do-dont">
      <div class="do-box do">
        <div class="do-label">Do</div>
        <div class="do-text">Use Electric Violet for active states and Turbo yellow for primary CTAs</div>
      </div>
      <div class="do-box dont">
        <div class="do-label">Don't</div>
        <div class="do-text">Use palette colours for ambient decoration — every colour must carry a defined role</div>
      </div>
      <div class="do-box do">
        <div class="do-label">Do</div>
        <div class="do-text">Let images bleed full-width within their card — no inner padding or rounding</div>
      </div>
      <div class="do-box dont">
        <div class="do-label">Don't</div>
        <div class="do-text">Round or pad images inside cards — it weakens the visual anchor</div>
      </div>
      <div class="do-box do">
        <div class="do-label">Do</div>
        <div class="do-text">Reserve the hero slot for one story only at maximum editorial weight</div>
      </div>
      <div class="do-box dont">
        <div class="do-label">Don't</div>
        <div class="do-text">Show more than one story at hero size — it collapses the hierarchy</div>
      </div>
      <div class="do-box do">
        <div class="do-label">Do</div>
        <div class="do-text">Keep headlines weight 700; summaries weight 400 at reduced opacity</div>
      </div>
      <div class="do-box dont">
        <div class="do-label">Don't</div>
        <div class="do-text">Bold summary text — it competes with headline weight and kills the scan hierarchy</div>
      </div>
    </div>
  </div>

</div>
</body>
</html>
