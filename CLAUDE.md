# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fréttir ("News" in Icelandic) is a single-page news reader that fetches articles from The Guardian API and rewrites them into simplified Icelandic using the Gemini API. The entire app lives in one file: `index.html`.

## Development

No build system, package manager, or bundler. Open `index.html` directly in a browser. Babel transpiles JSX in-browser via `<script type="text/babel">`.

## Architecture

**Single-file app** (`index.html`, ~730 lines) containing:

- **CDN dependencies**: React 18, ReactDOM, Babel standalone, Tailwind CSS CDN, Inter font
- **Two external APIs**:
  - Guardian Content API (`content.guardianapis.com`) — fetches news articles
  - Google Gemini API (`generativelanguage.googleapis.com`) — rewrites articles into simple Icelandic
- **All state is in `localStorage`** under `frettir_*` keys (API keys, tags, active tags, article cache)

**Key data flow**: User selects topic tags → Guardian API returns articles → articles are queued for Gemini rewrite in batches of 3 with 1.5s delay between batches → rewritten results are cached in localStorage (max 400 entries)

**React components** (all in the single file):
- `App` — main orchestrator, manages tags/articles/fetch lifecycle
- `SetupScreen` — first-run API key entry with Guardian key validation
- `Card` / `ArticleModal` — article display (card grid + full-text modal)
- `SettingsModal` — change API keys, clear cache
- `TagPill` — topic filter chips

**Styling**: Tailwind utility classes throughout; color-coded tags from a 12-color pool with pre-declared Tailwind class strings (required for CDN purging).

## Important Patterns

- The `runRef` counter in `App` guards against stale async responses when tags change mid-fetch
- Gemini prompt returns structured `TITILL:/SAMANTEKT:/HEILD:` format parsed with regex
- Tag colors must use full Tailwind class strings in the `C` object (not computed) so the CDN includes them
