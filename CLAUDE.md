# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fréttir ("News" in Icelandic) is a single-page news reader that fetches articles from The Guardian API and rewrites them into simplified Icelandic using the Gemini API.

## Development

Run `npm run dev` to start the Vite dev server with HMR. Run `npm run build` to produce a production build in `dist/`.

## Architecture

**Vite + React 18 + Tailwind CSS v4** — no additional libraries.

**File structure:**
```
src/
  main.jsx              — entry point (ReactDOM.createRoot)
  App.jsx               — main orchestrator, manages tags/articles/fetch lifecycle
  constants.js          — LS (localStorage keys), PRESET_TAGS, COLOR_POOL, C (color map)
  utils.js              — stripHtml, ago, getCache/putCache, getSeen/markSeen
  api.js                — fetchTag (Guardian), rewriteArticle (Gemini)
  index.css             — Tailwind import + custom animations/scrollbar styles
  components/
    SetupScreen.jsx     — first-run API key entry with Guardian key validation
    TagPill.jsx         — topic filter chips with new-article badge
    Card.jsx            — article card for grid display
    FeaturedCard.jsx    — large featured card for newest article
    ArticleModal.jsx    — full-text article modal
    SettingsModal.jsx   — change API keys, clear cache
    Skeleton.jsx        — loading placeholder
```

**Two external APIs:**
- Guardian Content API (`content.guardianapis.com`) — fetches news articles
- Google Gemini API (`generativelanguage.googleapis.com`) — rewrites articles into simple Icelandic

**All state is in `localStorage`** under `frettir_*` keys (API keys, tags, active tags, article cache, seen articles)

**Key data flow:** User selects topic tags → Guardian API returns articles → articles are queued for Gemini rewrite sequentially with adaptive delays → rewritten results are cached in localStorage (max 400 entries)

## Important Patterns

- The `runRef` counter in `App` guards against stale async responses when tags change mid-fetch
- Gemini prompt returns structured `TITILL:/SAMANTEKT:/HEILD:` format parsed with regex
- Tag colors must use full Tailwind class strings in the `C` object (not computed) so Tailwind's content scanner includes them
- `rewriteArticle` has retry logic with exponential backoff (rate-limit aware)
