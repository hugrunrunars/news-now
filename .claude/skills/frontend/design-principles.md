<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Fréttir · Design Principles</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@400;500;700&family=DM+Mono:wght@400&display=swap" rel="stylesheet">
<style>
  :root {
    --forest:  #3A5615;
    --pink:    #EDA6BF;
    --cream:   #FAF3EC;
    --lime:    #ACC653;
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--forest);
    padding: 52px 24px 80px;
  }
  .doc { max-width: 720px; margin: 0 auto; }

  /* COVER */
  .cover {
    background: var(--forest);
    border-radius: 24px;
    padding: 44px 40px 40px;
    margin-bottom: 40px;
    position: relative;
    overflow: hidden;
  }
  .cover::before {
    content: '';
    position: absolute;
    top: -80px; right: -80px;
    width: 300px; height: 300px;
    border-radius: 50%;
    background: rgba(172,198,83,0.15);
  }
  .cover::after {
    content: '';
    position: absolute;
    bottom: -40px; left: 60px;
    width: 160px; height: 160px;
    border-radius: 50%;
    background: rgba(237,166,191,0.1);
  }
  .cover-tag {
    font-family: 'DM Mono', monospace;
    font-size: 10px; letter-spacing: .14em;
    color: var(--lime); text-transform: uppercase; margin-bottom: 16px;
  }
  .cover-title {
    font-family: 'Playfair Display', serif;
    font-size: 42px; font-weight: 700; color: var(--cream);
    line-height: 1.1; margin-bottom: 8px;
  }
  .cover-sub { font-size: 14px; color: rgba(250,243,236,0.55); margin-bottom: 32px; }
  .cover-pills { display: flex; gap: 8px; flex-wrap: wrap; }
  .pill { font-size: 11px; font-weight: 700; padding: 5px 14px; border-radius: 20px; letter-spacing: .04em; text-transform: uppercase; }
  .pill-lime   { background: var(--lime);  color: var(--forest); }
  .pill-pink   { background: var(--pink);  color: var(--forest); }
  .pill-ghost  { border: 1px solid rgba(250,243,236,0.25); color: rgba(250,243,236,0.55); }

  /* SECTIONS */
  .section { margin-bottom: 32px; }
  .section-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px; letter-spacing: .14em; color: var(--forest);
    text-transform: uppercase; margin-bottom: 14px; padding-bottom: 10px;
    border-bottom: 1px solid rgba(58,86,21,0.15);
    opacity: 0.6;
  }

  /* CARDS */
  .principle-card {
    background: #fff;
    border: 1px solid rgba(58,86,21,0.1);
    border-radius: 16px;
    padding: 18px 20px;
    margin-bottom: 10px;
  }
  .pc-header { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px; }
  .pc-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; margin-top: 5px; }
  .pc-title { font-size: 15px; font-weight: 700; color: var(--forest); }
  .pc-body { font-size: 13px; color: rgba(58,86,21,0.65); line-height: 1.65; padding-left: 20px; }

  /* EXAMPLES */
  .example-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 12px; }
  .example-box { background: var(--cream); border-radius: 10px; padding: 12px 14px; border: 1px solid rgba(58,86,21,0.08); }
  .ex-label { font-family: 'DM Mono', monospace; font-size: 10px; color: var(--forest); text-transform: uppercase; letter-spacing: .1em; margin-bottom: 8px; opacity: 0.5; }

  /* NAV PILLS DEMO */
  .nav-mock { display: flex; gap: 7px; flex-wrap: wrap; }
  .nav-pill { font-size: 12px; font-weight: 700; padding: 4px 13px; border-radius: 20px; }
  .nav-active { background: var(--forest); color: var(--cream); }
  .nav-lime   { background: var(--lime); color: var(--forest); }
  .nav-pink   { background: var(--pink); color: var(--forest); }
  .nav-ghost  { border: 1.5px dashed rgba(58,86,21,0.3); color: rgba(58,86,21,0.4); }

  /* TYPE SCALE */
  .type-scale { display: grid; gap: 8px; margin-top: 10px; }
  .ts-row { display: flex; align-items: baseline; gap: 12px; }
  .ts-meta { font-family: 'DM Mono', monospace; font-size: 10px; color: rgba(58,86,21,0.4); min-width: 120px; }

  /* COLOUR CHIPS */
  .color-row { display: flex; gap: 8px; margin-top: 12px; flex-wrap: wrap; }
  .color-chip { border-radius: 10px; padding: 10px 16px; font-size: 12px; font-weight: 700; }

  /* SWATCH STRIP */
  .swatch-strip { display: flex; border-radius: 12px; overflow: hidden; margin-top: 14px; height: 56px; }
  .swatch { flex: 1; display: flex; align-items: flex-end; padding: 7px 10px; }
  .swatch-label { font-family: 'DM Mono', monospace; font-size: 9px; opacity: 0.7; }

  /* HERO MOCK */
  .hero-mock { background: var(--cream); border-radius: 10px; padding: 14px; margin-top: 12px; display: flex; gap: 12px; border: 1px solid rgba(58,86,21,0.1); }
  .hero-img { width: 96px; height: 68px; background: linear-gradient(135deg, #3A5615, #ACC653); border-radius: 8px; flex-shrink: 0; }
  .hero-meta { flex: 1; }
  .hero-tag { display: flex; gap: 6px; margin-bottom: 6px; align-items: center; }
  .hero-tag-pill { font-size: 10px; font-weight: 700; padding: 2px 9px; border-radius: 20px; border: 1px solid var(--forest); color: var(--forest); text-transform: uppercase; letter-spacing: .04em; }
  .hero-tag-text { font-size: 10px; color: rgba(58,86,21,0.45); }
  .hero-headline { font-family: 'Playfair Display', serif; font-size: 14px; font-weight: 700; color: var(--forest); line-height: 1.35; margin-bottom: 10px; }
  .hero-cta { display: flex; justify-content: flex-end; }
  .hero-btn { background: var(--forest); color: var(--cream); font-size: 11px; font-weight: 700; padding: 5px 13px; border-radius: 20px; }

  /* GRID MOCK */
  .grid-demo { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-top: 10px; }
  .grid-card { background: var(--cream); border-radius: 10px; overflow: hidden; border: 1px solid rgba(58,86,21,0.1); }
  .grid-img-1 { height: 52px; background: linear-gradient(135deg, #3A5615 0%, #ACC653 100%); }
  .grid-img-2 { height: 52px; background: linear-gradient(135deg, #ACC653 0%, #3A5615 100%); }
  .grid-img-3 { height: 52px; background: linear-gradient(135deg, #EDA6BF 0%, #3A5615 100%); }
  .grid-body { padding: 8px 10px; }
  .grid-tag { font-size: 10px; font-weight: 700; margin-bottom: 3px; text-transform: uppercase; letter-spacing: .04em; }
  .grid-text { font-size: 11px; color: var(--forest); font-weight: 500; line-height: 1.3; }

  /* DO / DON'T */
  .do-dont { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 12px; }
  .do-box { border-radius: 10px; padding: 14px 16px; }
  .do   { background: rgba(172,198,83,0.12); border: 1px solid rgba(172,198,83,0.4); }
  .dont { background: rgba(237,166,191,0.12); border: 1px solid rgba(237,166,191,0.4); }
  .do-label { font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 400; margin-bottom: 7px; text-transform: uppercase; letter-spacing: .1em; }
  .do   .do-label { color: #5a7a1a; }
  .dont .do-label { color: #b05080; }
  .do-text { font-size: 12px; line-height: 1.55; color: rgba(58,86,21,0.65); }
</style>
</head>
<body>
<div class="doc">

  <!-- COVER -->
  <div class="cover">
    <div class="cover-tag">Fréttir · Design System</div>
    <div class="cover-title">Design<br>Principles</div>
    <div class="cover-sub">Version 1.0 · News App UI Guidelines</div>
    <div class="cover-pills">
      <span class="pill pill-lime">Typography</span>
      <span class="pill pill-pink">Colour</span>
      <span class="pill pill-ghost">Navigation</span>
      <span class="pill pill-ghost">Layout</span>
      <span class="pill pill-ghost">Hierarchy</span>
    </div>
  </div>

  <!-- PALETTE -->
  <div class="section">
    <div class="section-label">Colour palette</div>
    <div class="principle-card">
      <div class="pc-header">
        <div class="pc-dot" style="background:var(--forest)"></div>
        <div class="pc-title">Matcha palette</div>
      </div>
      <div class="pc-body">Four anchors drawn from nature. Forest green owns brand and interaction. Sakura pink signals human interest and culture. Lime is the energetic accent for CTAs and highlights. Cream is the resting surface for all editorial content.</div>
      <div class="swatch-strip">
        <div class="swatch" style="background:#3A5615"><span class="swatch-label" style="color:#FAF3EC">#3A5615</span></div>
        <div class="swatch" style="background:#EDA6BF"><span class="swatch-label" style="color:#3A5615">#EDA6BF</span></div>
        <div class="swatch" style="background:#FAF3EC; border-top: 1px solid rgba(58,86,21,0.12)"><span class="swatch-label" style="color:#3A5615">#FAF3EC</span></div>
        <div class="swatch" style="background:#ACC653"><span class="swatch-label" style="color:#3A5615">#ACC653</span></div>
      </div>
    </div>
  </div>

  <!-- CORE PHILOSOPHY -->
  <div class="section">
    <div class="section-label">Core philosophy</div>
    <div class="principle-card">
      <div class="pc-header">
        <div class="pc-dot" style="background:var(--forest)"></div>
        <div class="pc-title">Content clarity above all</div>
      </div>
      <div class="pc-body">The interface should disappear. Headlines, images, and timestamps carry the full weight of user attention — chrome, controls, and decoration are secondary. Every layout decision starts with: does this help the reader get to the story faster?</div>
    </div>
    <div class="principle-card">
      <div class="pc-header">
        <div class="pc-dot" style="background:var(--lime)"></div>
        <div class="pc-title">Informed scanning over forced reading</div>
      </div>
      <div class="pc-body">Readers scan before they read. The layout must reward scanning: a strong headline, a clear category pill, and a thumbnail image should be enough for a user to decide whether to continue. Summary text and timestamps are supporting details — never load-bearing.</div>
    </div>
    <div class="principle-card">
      <div class="pc-header">
        <div class="pc-dot" style="background:var(--pink)"></div>
        <div class="pc-title">Light surfaces, grounded signals</div>
      </div>
      <div class="pc-body">Content rests on cream (#FAF3EC), giving the interface an editorial, paper-like quality. Forest green anchors all interactive states. Pink marks culture and human-interest categories. Lime is reserved for primary CTAs and live/breaking signals.</div>
    </div>
  </div>

  <!-- NAVIGATION -->
  <div class="section">
    <div class="section-label">Navigation</div>
    <div class="principle-card">
      <div class="pc-header">
        <div class="pc-dot" style="background:var(--forest)"></div>
        <div class="pc-title">Topic pills as primary navigation</div>
      </div>
      <div class="pc-body">Horizontal scrollable pill-row for topic filtering. The active state uses forest green fill with cream text. Lime signals breaking or live categories. Sakura pink marks culture topics. The "add topic" slot uses a ghost dashed outline — never a fill.</div>
      <div class="example-row">
        <div class="example-box">
          <div class="ex-label">Topic pills</div>
          <div class="nav-mock">
            <span class="nav-pill nav-active">Allt</span>
            <span class="nav-pill nav-lime">World</span>
            <span class="nav-pill nav-pink">Culture</span>
            <span class="nav-pill" style="background:rgba(58,86,21,0.08);color:var(--forest)">Science</span>
          </div>
        </div>
        <div class="example-box">
          <div class="ex-label">Add topic</div>
          <div class="nav-mock">
            <span class="nav-pill nav-ghost">+ Bæta við</span>
          </div>
          <div class="pc-body" style="padding:8px 0 0;font-size:11px">Dashed ghost border only. Never filled.</div>
        </div>
      </div>
    </div>
  </div>

  <!-- LAYOUT -->
  <div class="section">
    <div class="section-label">Layout &amp; composition</div>
    <div class="principle-card">
      <div class="pc-header">
        <div class="pc-dot" style="background:var(--lime)"></div>
        <div class="pc-title">Hero + grid: a two-tier hierarchy</div>
      </div>
      <div class="pc-body">The top story is a full-width hero with a large image left and rich metadata right. Below it, secondary stories use a three-column card grid. Never mix the two modes within a section — the size contrast itself communicates editorial importance.</div>
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
        <div class="grid-card"><div class="grid-img-1"></div><div class="grid-body"><div class="grid-tag" style="color:var(--forest)">World</div><div class="grid-text">Italy denies use of Sicily airbase</div></div></div>
        <div class="grid-card"><div class="grid-img-2"></div><div class="grid-body"><div class="grid-tag" style="color:#5a7a1a">Science</div><div class="grid-text">Sicily airbase – Europe live</div></div></div>
        <div class="grid-card"><div class="grid-img-3"></div><div class="grid-body"><div class="grid-tag" style="color:#b05080">Culture</div><div class="grid-text">UK parents: screen time for under-fives</div></div></div>
      </div>
    </div>
    <div class="principle-card">
      <div class="pc-header">
        <div class="pc-dot" style="background:var(--forest)"></div>
        <div class="pc-title">Images bleed to card edges</div>
      </div>
      <div class="pc-body">Card thumbnails fill the full width of the card with no internal padding or rounding on the image. Apply corner radius to the card container, not the image. The image is a visual anchor — clipping or padding it weakens the card's presence.</div>
    </div>
  </div>

  <!-- TYPOGRAPHY -->
  <div class="section">
    <div class="section-label">Typography</div>
    <div class="principle-card">
      <div class="pc-header">
        <div class="pc-dot" style="background:var(--lime)"></div>
        <div class="pc-title">Serif display, sans body</div>
      </div>
      <div class="pc-body">Hero and card headlines use a serif display face — editorial authority, warmth, and distinctiveness. All UI chrome, metadata, labels, and body copy use DM Sans. The contrast between the two families creates a clear reading hierarchy without relying on size alone.</div>
      <div class="type-scale">
        <div class="ts-row"><span class="ts-meta">hero headline</span><span style="font-family:'Playfair Display',serif;font-size:18px;font-weight:700;color:var(--forest)">Middle East crisis live</span></div>
        <div class="ts-row"><span class="ts-meta">card headline</span><span style="font-family:'Playfair Display',serif;font-size:14px;font-weight:700;color:var(--forest)">Italy denies Sicily airbase use</span></div>
        <div class="ts-row"><span class="ts-meta">summary</span><span style="font-size:13px;font-weight:400;color:rgba(58,86,21,0.55)">Defence ministry says US failed to request authorisation</span></div>
        <div class="ts-row"><span class="ts-meta">category label</span><span style="font-size:11px;font-weight:700;color:var(--forest);text-transform:uppercase;letter-spacing:.06em">World news</span></div>
        <div class="ts-row"><span class="ts-meta">timestamp</span><span style="font-family:'DM Mono',monospace;font-size:11px;color:rgba(58,86,21,0.35)">Rétt núna · Nýjast</span></div>
      </div>
    </div>
  </div>

  <!-- COLOUR RULES -->
  <div class="section">
    <div class="section-label">Colour usage rules</div>
    <div class="principle-card">
      <div class="pc-header">
        <div class="pc-dot" style="background:var(--forest)"></div>
        <div class="pc-title">Colour encodes role, not decoration</div>
      </div>
      <div class="pc-body">Every colour use must have a function. Forest = brand, interaction, active state. Lime = primary CTA, live/breaking signal. Sakura pink = culture and human-interest category. Cream = content surface. Never apply a palette colour purely for visual variety.</div>
      <div class="color-row">
        <span class="color-chip" style="background:#3A5615;color:#FAF3EC">Forest</span>
        <span class="color-chip" style="background:#EDA6BF;color:#3A5615">Sakura</span>
        <span class="color-chip" style="background:#FAF3EC;color:#3A5615;border:1px solid rgba(58,86,21,0.12)">Cream</span>
        <span class="color-chip" style="background:#ACC653;color:#3A5615">Lime</span>
      </div>
    </div>
  </div>

  <!-- METADATA -->
  <div class="section">
    <div class="section-label">Metadata &amp; labelling</div>
    <div class="principle-card">
      <div class="pc-header">
        <div class="pc-dot" style="background:var(--forest)"></div>
        <div class="pc-title">Category badge + section + recency tag</div>
      </div>
      <div class="pc-body">Each story carries up to three metadata signals in a horizontal strip above the headline: a coloured category pill, a plain-text section name, and an optional recency badge ("Nýjast"). The coloured pill is always leftmost. Keep this strip to one line — never wrap or stack.</div>
    </div>
    <div class="principle-card">
      <div class="pc-header">
        <div class="pc-dot" style="background:var(--lime)"></div>
        <div class="pc-title">Translate on demand, not by default</div>
      </div>
      <div class="pc-body">Content loads in source language. A "Þýði…" (Translate…) link below the summary offers translation without forcing it. This respects readers who can read the original and avoids machine-translation errors in the primary reading flow.</div>
    </div>
  </div>

  <!-- DO / DON'T -->
  <div class="section">
    <div class="section-label">Do / don't</div>
    <div class="do-dont">
      <div class="do-box do">
        <div class="do-label">Do</div>
        <div class="do-text">Use forest green for active states and lime for primary CTAs and live signals</div>
      </div>
      <div class="do-box dont">
        <div class="do-label">Don't</div>
        <div class="do-text">Use palette colours for decoration — every colour must carry a defined role</div>
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
        <div class="do-text">Use serif display type for headlines to signal editorial authority</div>
      </div>
      <div class="do-box dont">
        <div class="do-label">Don't</div>
        <div class="do-text">Use the display serif for UI chrome, metadata, or body copy — that's DM Sans</div>
      </div>
      <div class="do-box do">
        <div class="do-label">Do</div>
        <div class="do-text">Reserve the hero slot for one story only at maximum editorial weight</div>
      </div>
      <div class="do-box dont">
        <div class="do-label">Don't</div>
        <div class="do-text">Show more than one story at hero size — it collapses the hierarchy</div>
      </div>
    </div>
  </div>

</div>
</body>
</html>
