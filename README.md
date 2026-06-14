# Solana (SOL) Price Prediction — Zengo

A template-based crypto **price-prediction page** for Zengo, reference build: **Solana (SOL)**.
It combines an algorithmic forecast with **live prediction-market odds from Polymarket**, a live
price chart, technicals, a scenario calculator, and the fundamentals that drive the price.

> Built on the Zengo 2.0 design system. Header/footer mirror the live zengo.com site.

---

## Quick start

This is a static page — no build step is required to preview it. Because it loads ES-module-free
scripts and fetches cross-origin APIs, serve it over HTTP (don't just `file://` open it):

```bash
# from this folder
npx serve .
# or
python3 -m http.server 8000
```

Then open `http://localhost:8000/`.

---

## File structure

```
index.html              Entry point (meta, SEO/JSON-LD, <noscript> fallback, script order)
prediction.css          Page styles (imports colors_and_type.css)
colors_and_type.css     Zengo design tokens + @font-face (Satoshi)
data.js                 Page CONTENT + config (WordPress-managed copy, forecast targets, nav/footer, links)
polymarket.js           Live data layer (CoinGecko price/history, Polymarket odds, Fear & Greed)
icons.jsx               Inline SVG icons + brand marks
viz.jsx                 Price chart, sparkline, radial gauge (+ real TA helpers live in modulesB)
modulesA.jsx            Nav, Hero, At-a-glance, Odds module (3 layouts)
modulesB.jsx            Chart, Short-term, Year tables, Calculator, Technicals, Sentiment
modulesC.jsx            Drivers, Explainer, Product CTA, FAQ, Related coins, Disclaimer, Footer, Rail
app.jsx                 Composition + 60s live-data refresh
assets/                 sol-coin.png, logo/*.svg
fonts/                  Satoshi (woff2/woff: Regular, Medium, Bold, Black)
```

---

## Live data sources

| Data | Source | Endpoint |
|------|--------|----------|
| Spot price, 24h/7d/30d, mcap, ATH, 12-mo history | CoinGecko | `api.coingecko.com` |
| Prediction-market odds (Yes/No, bid/ask, volume) | Polymarket Gamma | `gamma-api.polymarket.com` |
| Market mood | alternative.me | `api.alternative.me/fng` |

All fetches are best-effort with an 8s timeout. If a feed is unavailable the page falls back to
coherent sample data and the odds label downgrades from "Live from Polymarket" to "Indicative odds".
Data refreshes every 60s while the tab is open.

---

## ⚠️ Before production (important)

This repo is the **review/prototype** build. Two changes are required before it goes live as an
SEO page:

1. **Pre-compile the JSX.** It currently uses React + Babel **in the browser** (runtime compile via
   CDN). That hurts LCP and means non-JS crawlers see only the `<noscript>` fallback. Compile the
   `.jsx` to a single bundle (Vite/esbuild) and drop the Babel CDN script, **or** server-render
   (SSR/ISR) so the full HTML ships in the response.
2. **Route live data through a backend-for-frontend.** The browser currently calls Polymarket /
   CoinGecko / alternative.me directly. In production, fetch server-side on a schedule, cache, and
   serve your own `/api/...` JSON (handles rate limits + keys; CoinGecko's free tier is the binding
   constraint).

Other notes:
- **Content is CMS-ready:** all copy lives in `data.js` (the hero "Read more" block is modeled as a
  WordPress rich-text field). To generate BTC/ETH/XRP pages, supply a new content object — the
  template and live-data layer are coin-agnostic apart from a small per-asset config.
- **Forecast targets** ($92 '26, $245 '30, $540 '40) are illustrative model outputs and must be
  replaced with the real model's numbers before publishing.
- Canonical URL is set to `https://zengo.com/prediction-markets/solana-price-prediction/` — update
  to the final slug.

---

## Disclaimer

Forecasts and probabilities are for general information only and are not financial advice. Crypto is
highly volatile. Market-implied probabilities reflect live Polymarket trading and change constantly.
Zengo is a self-custodial wallet and an eToro company.
