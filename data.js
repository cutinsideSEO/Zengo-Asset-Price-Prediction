/* data.js — Solana (SOL) price-prediction page data.
   Spot price, market data, Polymarket markets and Fear & Greed are replaced with
   LIVE values at runtime by polymarket.js; the values below are the illustrative
   fallback used on first paint and when an API is unavailable.
   Forecast TARGETS are our (illustrative) model; near-term figures are expressed as
   growth factors off the live spot so they stay realistic as the price moves. */
window.PP = {
  money: (n) => "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  money0: (n) => "$" + Math.round(Number(n)).toLocaleString("en-US"),
  // tradeable Buy prices (fall back to the implied probability when bid/ask absent, e.g. sample data)
  buyYes: (m) => (m && m.buyYes != null) ? m.buyYes : (m ? m.yes : 0),
  buyNo: (m) => (m && m.buyNo != null) ? m.buyNo : (m ? 100 - m.yes : 0),
};
// Zengo site links + nav/footer structure (mirrors the live zengo.com header & footer).
window.ZNAV = {
  home: "https://zengo.com/",
  predictionMarkets: "https://zengo.com/prediction-markets/",
  signup: "https://web.zengo.com/signup",
  login: "https://web.zengo.com/login",
  download: "https://zengo.onelink.me/uCxL/3f57e09e",
  menus: [
    { label: "Individuals", items: [
      ["Zengo Crypto Wallet", "https://zengo.com/crypto-wallet/"],
      ["Zengo Pro", "https://zengo.com/pro/"],
      ["Withdraw", "https://zengo.com/withdraw/"],
      ["Support", "https://zengo.com/support/"],
    ] },
    { label: "Business", items: [
      ["Zengo Business", "https://zengo.com/business/"],
      ["Security and Compliance", "https://zengo.com/business/security/"],
      ["Use Cases", "https://zengo.com/business/use-cases/"],
      ["On/Off Ramp", "https://zengo.com/business/onramp/"],
      ["Accept Crypto Payments", "https://zengo.com/business/crypto-payments/"],
      ["Get Paid in Crypto", "https://zengo.com/business/get-paid-in-crypto/"],
      ["Book a Demo", "https://zengo.com/business/book-a-demo/"],
    ] },
    { label: "Security", items: [
      ["Security Model", "https://zengo.com/security/"],
      ["MPC Technology", "https://zengo.com/mpc-wallet/"],
      ["3FA Recovery", "https://help.zengo.com/en/articles/2603673-what-is-zengo-s-recovery-kit"],
      ["Pro Security Features", "https://zengo.com/security-pro/"],
      ["Zengo X Research", "https://zengo.com/research/"],
    ] },
    { label: "Crypto", items: [
      ["Buy and Sell", "https://zengo.com/buy/"],
      ["Swap", "https://zengo.com/trade-swap/"],
      ["Earn Ethereum", "https://zengo.com/eth-staking/"],
      ["Assets", "https://zengo.com/assets/"],
    ] },
    { label: "Learn", items: [
      ["Blog", "https://zengo.com/blog/"],
      ["Video Tutorials", "https://www.youtube.com/@ZengoWallet"],
      ["Podcast", "https://thezencryptoshow.transistor.fm/subscribe"],
      ["About", "https://zengo.com/zengo-mission-personal-finance-for-everyone-everywhere/"],
      ["Team", "https://zengo.com/team/"],
      ["Careers", "https://zengo.com/careers/"],
      ["Branding Kit", "https://zengo.com/brand/zengo-brand-kit-2025.zip"],
    ] },
  ],
  social: [
    ["LinkedIn", "https://www.linkedin.com/company/zengo"],
    ["X", "https://www.twitter.com/zengo"],
    ["Reddit", "https://www.reddit.com/r/ZengoWallet/"],
    ["GitHub", "https://github.com/Zengo-X"],
    ["Medium", "https://medium.com/zengo"],
    ["Discord", "https://discord.gg/zengo"],
    ["YouTube", "https://www.youtube.com/c/ZenGoWallet"],
  ],
  legal: [
    ["Privacy Policy", "https://zengo.com/privacy-policy/"],
    ["Terms of Use", "https://zengo.com/terms-of-use/"],
    ["BIPA Notice", "https://zengo.com/biometric-information-policy/"],
  ],
};
window.SOL = {
  symbol: "SOL",
  name: "Solana",
  price: 74.18,
  chg24h: 3.42,
  chg7d: -1.86,
  chg30d: 12.4,
  marketCap: "$39.6B",
  rank: "#6",
  vol24h: "$3.1B",
  ath: "$294.33",
  atl: "$0.50",
  supply: "534.1M SOL",
  updated: "just now",

  // Hero prose — MANAGED IN WORDPRESS (Gutenberg rich-text / ACF WYSIWYG field, HTML allowed).
  // `preview` shows by default; `full` is revealed by the "Read more" toggle. Both ship in the
  // DOM at all times (the toggle only clamps height) so the long-form copy stays crawlable.
  heroContent: {
    preview: "Solana (SOL) is one of the largest cryptocurrencies by market cap and one of the most-used high-throughput smart-contract networks — which makes it one of the most-searched coins for a price prediction.",
    full:
      "<p>This page brings together two very different signals. Our model projects a base case near <b>$92 for 2026</b>, extending toward <b>$245 by 2030</b> — algorithmic estimates drawn from Solana's historical volatility and trend, shown as bear, base and bull scenarios. Alongside it, you can see what traders are actually backing right now in live prediction markets powered by Polymarket: real money on real outcomes, not a forecast.</p>" +
      "<p>We also lay out the forces that actually move the price — network reliability (Firedancer), DePIN and a mobile-first strategy, regulation (MiCA and spot-ETF filings), staking and supply dynamics, and SOL's correlation with the broader crypto cycle — so the numbers sit in context rather than in isolation.</p>" +
      "<p><b>None of this is financial advice.</b> Crypto is highly volatile and you can lose your capital. Treat every forecast as a scenario, do your own research, and consider independent professional advice before investing. <a href=\"#odds\">See what the market is pricing in →</a></p>",
  },

  // M2 at-a-glance — near term as growth factors off live spot; long term as absolute model targets
  glance: [
    { h: "7-day", factor: 1.0407 },
    { h: "1-month", factor: 1.1068 },
    { h: "2026 avg", target: 92 },
    { h: "2030 avg", target: 245 },
    { h: "2040 avg", target: 540 },
  ],

  // M3 Polymarket markets (LIVE — overwritten by polymarket.js; sample fallback below)
  markets: [
    { q: "Will SOL be above $100 on Dec 31, 2026?", yes: 41, vol: "$2.4M", resolves: "Dec 31, 2026", days: 569,
      spark: [33,35,34,38,40,39,42,41] },
    { q: "Will SOL hit a new all-time high in 2026?", yes: 23, vol: "$1.1M", resolves: "Dec 31, 2026", days: 569,
      spark: [30,28,27,25,24,22,23,23] },
    { q: "Will SOL flip BNB by market cap in 2026?", yes: 34, vol: "$640K", resolves: "Dec 31, 2026", days: 569,
      spark: [26,29,31,30,33,32,35,34] },
  ],
  compare: { pct: 41, label: "is above $100 on Dec 31, 2026" },
  // M3 variant B ladder (LIVE — overwritten by polymarket.js)
  ladder: { q: "Where does the market price SOL by Dec 31, 2026?", sub: "Market-implied probability that SOL closes above each level.", vol: "$2.4M traded", resolves: "Dec 31, 2026",
    rows: [
      { strike: "$60", pct: 86 },
      { strike: "$80", pct: 64 },
      { strike: "$100", pct: 41 },
      { strike: "$150", pct: 19 },
      { strike: "$200", pct: 8 },
      { strike: "$300", pct: 3 },
    ] },

  // M5 short-term 7-day — growth factors off live spot (preserves the % path)
  shortTerm: [
    { day: "Day 1", date: "Tomorrow", f: 1.0097 },
    { day: "Day 2", date: "", f: 1.0191 },
    { day: "Day 3", date: "", f: 1.0137 },
    { day: "Day 4", date: "", f: 1.0259 },
    { day: "Day 5", date: "", f: 1.0360 },
    { day: "Day 6", date: "", f: 1.0299 },
    { day: "Day 7", date: "1 week", f: 1.0407 },
  ],

  // M6 year tables — absolute model targets (ROI computed vs live spot in the component)
  years: {
    "2026": { min: 58, avg: 92, max: 134 },
    "2027": { min: 71, avg: 128, max: 190 },
    "2028": { min: 96, avg: 165, max: 255 },
    "2029": { min: 120, avg: 201, max: 330 },
    "2030": { min: 155, avg: 245, max: 420 },
    "2040": { min: 300, avg: 540, max: 980 },
  },

  // M8 technicals — values are derived from the live spot + trend in the component
  technicals: {
    indicators: [
      { name: "SMA (50)", sub: "Simple moving avg", k: "sma50" },
      { name: "SMA (200)", sub: "Simple moving avg", k: "sma200" },
      { name: "EMA (100)", sub: "Exp. moving avg", k: "ema100" },
      { name: "RSI (14)", sub: "Relative strength", k: "rsi" },
      { name: "MACD", sub: "12,26,9", k: "macd" },
      { name: "Stoch %K", sub: "Stochastic", k: "stoch" },
    ],
  },

  // M9 sentiment — `mood` is replaced with live Fear & Greed by polymarket.js
  mood: 62, moodLabel: "Greed",

  // M10 drivers
  drivers: [
    { ic: "firedancer", color: "var(--zg-orange)", h: "Firedancer & reliability", p: "A new independent validator client built by Jump aims to end the outage narrative that dogged Solana. More uptime and throughput is the single biggest swing factor for confidence — and price.", imp: "High impact", impColor: "var(--zg-orange)" },
    { ic: "depin", color: "var(--zg-info)", h: "DePIN & mobile", p: "Solana anchors much of decentralised physical infrastructure (wireless, mapping, compute) and a mobile-first hardware strategy. Real device demand is a durable, non-speculative driver.", imp: "Structural", impColor: "var(--zg-info)" },
    { ic: "reg", color: "var(--zg-positive)", h: "Regulation & spot ETFs", p: "EU's MiCA framework and the arrival of spot Solana ETFs shape how institutions can access SOL. Regulated products deepen liquidity and can dampen — or amplify — volatility.", imp: "Catalyst", impColor: "var(--zg-positive)" },
    { ic: "supply", color: "var(--zg-lavender,#f7caf1)", h: "Supply, staking & inflation", p: "Issuance schedule, the ~65% staking ratio and fee-burn dynamics set the float that actually trades. Less liquid supply tends to move price faster in both directions.", imp: "Ongoing", impColor: "#BDBCC3" },
    { ic: "btc", color: "#F7931A", h: "BTC correlation & cycles", p: "SOL still moves largely with Bitcoin and the broader risk cycle. Honest framing: a lot of any forecast is really a bet on the macro crypto tide, not SOL alone.", imp: "Macro", impColor: "#F7931A" },
    { ic: "eco", color: "#00CECB", h: "Ecosystem & app revenue", p: "DEX volume, stablecoin settlement and real on-chain fee revenue increasingly back the valuation. Activity that generates fees is the fundamental the market rewards over time.", imp: "Demand", impColor: "var(--zg-yes)" },
  ],

  // M13 FAQ
  faq: [
    { q: "What is the Solana price prediction for 2026?", a: "Our model projects SOL trading roughly between $58 and $134 in 2026, with an average near $92. These are algorithmic estimates based on historical volatility and trend — not guarantees. Crypto is highly volatile and you can lose your capital." },
    { q: "What is the Solana price prediction for 2030?", a: "Longer-range projections are far more speculative. Our model's base case for 2030 is around $245, with a wide bull/bear range from roughly $155 to $420. Treat multi-year crypto forecasts as scenarios, not certainties." },
    { q: "What is the Solana price prediction for 2040?", a: "A 15-year horizon is highly speculative. Our model's long-range scenario for 2040 centers near $540, within a very wide band (roughly $300 to $980), and assumes Solana remains a top-tier network through multiple market cycles. Treat it as a scenario, not a prediction." },
    { q: "Will Solana reach $500 or $1,000?", a: "Reaching $500 would be roughly a 7-8x move from current levels; $1,000 would be around a 15x move. Whether that happens depends on adoption, network reliability (Firedancer), DePIN growth and the broader market cycle. You can also see the live market-implied probability of SOL clearing key levels in the odds module above." },
    { q: "What's the difference between an algorithmic forecast and market odds?", a: "An algorithmic forecast extrapolates from past price behaviour. Market odds come from a prediction market — the price traders pay for a 'Yes' contract on an outcome, which equals the probability the market assigns it. One is a projection; the other is real money on the line. We show both, clearly labelled." },
    { q: "How are these forecasts calculated?", a: "The price targets come from an algorithmic model that reads SOL's historical volatility and trend across bear, base and bull scenarios. The probabilities come from live Polymarket markets. We update both regularly and label each clearly." },
    { q: "Is Solana a good investment in 2026?", a: "We can't answer that for you — this page is information, not financial advice. Weigh the technical signals, the fundamentals and your own risk tolerance, and consider independent professional advice before investing." },
    { q: "Can I trade Solana outcomes on Zengo?", a: "Yes — Zengo offers prediction markets inside its self-custodial wallet, powered by Polymarket, settling in USDC. Availability depends on your region; check in-app for current status where you are." },
  ],

  // M14 related coins
  related: [
    { sym: "BTC", name: "Bitcoin", color: "#F7931A", url: "https://zengo.com/prediction-markets/bitcoin-price-prediction/" },
    { sym: "ETH", name: "Ethereum", color: "#627EEA", url: "https://zengo.com/prediction-markets/ethereum-price-prediction/" },
    { sym: "XRP", name: "XRP", color: "#23292F", url: "https://zengo.com/prediction-markets/xrp-price-prediction/" },
    { sym: "DOGE", name: "Dogecoin", color: "#C2A633", url: "https://zengo.com/prediction-markets/dogecoin-price-prediction/" },
    { sym: "ADA", name: "Cardano", color: "#0033AD", url: "https://zengo.com/prediction-markets/cardano-price-prediction/" },
  ],
};
