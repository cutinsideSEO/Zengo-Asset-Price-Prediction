/* polymarket.js — live data layer.
   Pulls REAL data at runtime and merges it into window.SOL:
     • Spot / market data  → CoinGecko  (/coins/markets)
     • Prediction markets   → Polymarket Gamma public-search (read-only, public)
     • Market mood          → alternative.me Fear & Greed
   Everything is best-effort: any failure leaves the illustrative sample in place
   and the page degrades gracefully (per spec §8.3). The browser talks to the
   public APIs directly here for the prototype; production routes via a BFF.            */
(function () {
  const CG = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=solana&price_change_percentage=24h,7d,30d";
  const GAMMA = "https://gamma-api.polymarket.com/public-search?q=solana&limit_per_type=20&events_status=active";
  const FNG = "https://api.alternative.me/fng/?limit=1";
  const PM_EVENT = "https://polymarket.com/event/";

  const money = (n, dp = 2) => "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: dp, maximumFractionDigits: dp });
  const big = (n) => {
    n = Number(n) || 0;
    if (n >= 1e9) return "$" + (n / 1e9).toFixed(1) + "B";
    if (n >= 1e6) return "$" + (n / 1e6).toFixed(1) + "M";
    if (n >= 1e3) return "$" + (n / 1e3).toFixed(1) + "K";
    return "$" + n.toFixed(0);
  };
  const pct = (x) => Math.round(Number(x) * 100);
  const firstPrice = (m) => { try { return +JSON.parse(m.outcomePrices)[0]; } catch (e) { return NaN; } };
  const fmtDate = (iso) => { const d = new Date(iso); return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }); };
  const daysTo = (iso) => Math.max(0, Math.round((new Date(iso) - Date.now()) / 86400000));

  async function getJSON(url, ms = 8000) {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), ms);
    try { const r = await fetch(url, { signal: ctl.signal }); if (!r.ok) throw new Error(r.status); return await r.json(); }
    finally { clearTimeout(t); }
  }

  window.__pmStatus = "loading";

  window.loadLive = async function () {
    const S = window.SOL;
    let gotPrice = false, gotMarkets = false;

    // ---- 1) CoinGecko spot + market data ----
    try {
      const a = await getJSON(CG);
      const c = Array.isArray(a) ? a[0] : a;
      if (c && c.current_price) {
        S.price = c.current_price;
        S.chg24h = +(c.price_change_percentage_24h_in_currency ?? c.price_change_percentage_24h ?? 0).toFixed(2);
        S.chg7d = c.price_change_percentage_7d_in_currency != null ? +c.price_change_percentage_7d_in_currency.toFixed(2) : S.chg7d;
        S.chg30d = c.price_change_percentage_30d_in_currency != null ? +c.price_change_percentage_30d_in_currency.toFixed(2) : S.chg30d;
        S.marketCap = big(c.market_cap);
        S.vol24h = big(c.total_volume);
        S.ath = money(c.ath);
        S.atl = money(c.atl);
        S.supply = (c.circulating_supply / 1e6).toFixed(1) + "M SOL";
        S.rank = "#" + c.market_cap_rank;
        S.updated = "just now";
        gotPrice = true;
      }
    } catch (e) { /* keep sample price */ }

    // ---- 1b) CoinGecko price history (for the real chart) ----
    try {
      const [d365, d1] = await Promise.all([
        getJSON("https://api.coingecko.com/api/v3/coins/solana/market_chart?vs_currency=usd&days=365"),
        getJSON("https://api.coingecko.com/api/v3/coins/solana/market_chart?vs_currency=usd&days=1"),
      ]);
      const daily = (d365.prices || []).map((p) => p[1]);
      const hourly = (d1.prices || []).map((p) => p[1]);
      if (daily.length > 30) S.hist = { daily, hourly };
    } catch (e) { /* chart falls back to synthetic */ }

    // ---- 1c) If the spot call failed but history loaded, derive price + changes
    //          from the series so the snapshot stays consistent with the live
    //          chart/markets (never show a stale sample price next to live data). ----
    if (!gotPrice && S.hist && S.hist.daily.length > 31) {
      const d = S.hist.daily, h = S.hist.hourly || [];
      const last = d[d.length - 1];
      const pc = (a, b) => (b ? +(((a - b) / b) * 100).toFixed(2) : 0);
      S.price = last;
      S.chg24h = h.length > 2 ? pc(h[h.length - 1], h[0]) : pc(last, d[d.length - 2]);
      S.chg7d = pc(last, d[d.length - 8]);
      S.chg30d = pc(last, d[d.length - 31]);
      S.updated = "just now";
      gotPrice = true; // derived from history
    }
    const priceLive = gotPrice;

    // Live markets + Fear & Greed only apply when we have a live price; otherwise
    // everything stays on the coherent sample data (never mix live + stale).
    if (priceLive) {
      const mood0 = Math.max(5, Math.min(95, Math.round(50 + (S.chg30d || 0) * 0.9)));
      S.mood = mood0;
      S.moodLabel = mood0 < 25 ? "Extreme Fear" : mood0 < 45 ? "Fear" : mood0 < 55 ? "Neutral" : mood0 < 75 ? "Greed" : "Extreme Greed";
    }

    // ---- 2) Polymarket markets ----
    if (priceLive) try {
      const j = await getJSON(GAMMA);
      const events = j.events || [];
      const ev = (slug) => events.find((e) => e.slug === slug);

      const e2026 = ev("what-price-will-solana-hit-before-2027") ||
        events.find((e) => /hit.*(2026|before-2027)/i.test(e.slug) && (e.markets || []).length > 6);
      const eath = ev("solana-all-time-high-by") || events.find((e) => /all-time-high/i.test(e.slug));

      let ups = [];
      let evVol = 0, evEnd = "2027-01-01T05:00:00Z";
      if (e2026) {
        evVol = e2026.volume || 0; evEnd = e2026.endDate || evEnd;
        ups = (e2026.markets || [])
          .filter((m) => (m.groupItemTitle || "").includes("↑"))
          .map((m) => {
            const ask = m.bestAsk != null ? +m.bestAsk : null;
            const bid = m.bestBid != null ? +m.bestBid : null;
            const last = firstPrice(m);
            const spread = (ask != null && bid != null) ? (ask - bid) : 1;
            // probability = order-book midpoint when the book is sane, else last/outcome price
            const mid = (ask != null && bid != null && spread <= 0.5) ? (ask + bid) / 2 : last;
            return {
              strike: parseInt((m.groupItemTitle || "").replace(/[^0-9]/g, ""), 10),
              yes: mid, ask, bid, spread,
              vol: +m.volumeNum || 0,
              slug: m.slug,
            };
          })
          .filter((x) => x.strike && isFinite(x.yes) && x.yes > 0.004 && x.yes < 0.99)
          .sort((a, b) => a.strike - b.strike);
      }
      const atStrike = (target) => {
        if (!ups.length) return null;
        return ups.reduce((best, x) => Math.abs(x.strike - target) < Math.abs(best.strike - target) ? x : best);
      };

      // ATH-by-Dec-2026 market
      let athMkt = null;
      if (eath) {
        athMkt = (eath.markets || []).find((m) => /Dec.*2026|December 31, 2026/i.test(m.groupItemTitle || m.question || ""))
          || (eath.markets || []).sort((a, b) => (b.volumeNum || 0) - (a.volumeNum || 0))[0];
      }

      if (ups.length >= 4) {
        const resolves = fmtDate(evEnd), days = daysTo(evEnd);
        // Only feature genuinely tradeable markets (real volume + sane spread) so we
        // never surface a dead sub-market with a stale price and an empty order book.
        const liquid = ups.filter((x) => x.vol > 0 && x.spread <= 0.2);
        const pool = liquid.length >= 4 ? liquid : ups;
        // Buy prices match Polymarket exactly: Buy Yes = best ask; Buy No = 1 - Yes best bid.
        const buyYesC = (x) => x.ask != null ? Math.round(x.ask * 100) : pct(x.yes);
        const buyNoC = (x) => x.bid != null ? Math.round((1 - x.bid) * 100) : 100 - pct(x.yes);
        const mkReach = (x) => ({ q: `Will Solana reach $${x.strike} in 2026?`, yes: pct(x.yes), buyYes: buyYesC(x), buyNo: buyNoC(x), vol: big(x.vol), resolves, days, slug: (e2026 && e2026.slug) || "" });

        // featured cards = the most relevant near-the-money liquid strikes (lowest strikes
        // = closest to spot = highest, most meaningful probabilities), shown low→high
        const featured = [...pool].sort((a, b) => a.strike - b.strike).slice(0, 2);
        const cards = featured.map(mkReach);
        if (athMkt) {
          const aYes = firstPrice(athMkt);
          cards.push({ q: "Will Solana hit a new all-time high by Dec 31, 2026?", yes: pct(aYes),
            buyYes: athMkt.bestAsk != null ? Math.round(+athMkt.bestAsk * 100) : pct(aYes),
            buyNo: athMkt.bestBid != null ? Math.round((1 - +athMkt.bestBid) * 100) : 100 - pct(aYes),
            vol: big(athMkt.volumeNum || 0), resolves: "Dec 31, 2026", days: daysTo("2027-01-01"), slug: athMkt.slug || "" });
        }
        // ladder = the live liquid curve across strikes, sampled to ~6 rows
        const ascending = [...pool].sort((a, b) => a.strike - b.strike);
        const sample = (arr, n) => { if (arr.length <= n) return arr; const out = []; const step = (arr.length - 1) / (n - 1); for (let i = 0; i < n; i++) out.push(arr[Math.round(i * step)]); return out; };
        const rows = sample(ascending, 6).map((x) => ({ strike: "$" + x.strike, pct: pct(x.yes) }));
        // enforce the no-arbitrage bound: P(reach higher price) ≤ P(reach lower price)
        let cap = 100;
        rows.forEach((r) => { r.pct = Math.min(r.pct, cap); cap = r.pct; });

        if (cards.length >= 3 && rows.length >= 4) {
          S.markets = cards;
          S.ladder = {
            q: "Will Solana reach these levels in 2026?",
            sub: "Market-implied chance SOL trades at or above each level at some point in 2026.",
            vol: big(evVol) + " traded",
            resolves,
            rows,
          };
          S.compare = { pct: cards[0].yes, label: cards[0].q.replace(/^Will Solana /, "").replace(/\?$/, "").replace(/^reach/, "reaches") };
          S.pmEventUrl = PM_EVENT + ((e2026 && e2026.slug) || "");
          gotMarkets = true;
        }
      }
    } catch (e) { /* keep sample markets */ }

    // ---- 3) Fear & Greed (overrides the trend-derived baseline) ----
    if (priceLive) try {
      const f = await getJSON(FNG);
      const d = f.data && f.data[0];
      if (d && d.value) { S.mood = +d.value; S.moodLabel = d.value_classification; }
    } catch (e) { /* keep trend-derived mood */ }

    window.__pmStatus = (priceLive && gotMarkets) ? "live" : "sample";
    return { price: gotPrice, markets: gotMarkets };
  };
})();
