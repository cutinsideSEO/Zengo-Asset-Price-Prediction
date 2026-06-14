/* modulesB.jsx — Chart (M4), Short-term (M5), Year tables (M6), Calculator (M7),
   Technicals (M8), Sentiment & news (M9). */
const SB = window.SOL;

function ChartSection() {
  return (
    <section className="module" id="chart" data-screen-label="Price chart (M4)">
      <div className="module__head">
        <div>
          <div className="eyebrow module__eyebrow"><span className="dot" />Price & forecast</div>
          <h2>SOL price chart with forecast band</h2>
          <p className="sub">Historical price with our bull-to-bear projection extended into the future. Toggle line or candles and switch timeframe.</p>
        </div>
      </div>
      <div className="card card--pad">
        <PriceChart end={SB.price} forecast={{ min: SB.years["2026"].min, avg: SB.years["2026"].avg, max: SB.years["2026"].max }} />
      </div>
    </section>
  );
}

function ShortTerm() {
  return (
    <section className="module" id="short" data-screen-label="Short-term outlook (M5)">
      <div className="module__head">
        <div>
          <div className="eyebrow module__eyebrow"><span className="dot" />Next 7 days</div>
          <h2>Short-term outlook</h2>
          <p className="sub">A trend-based daily path for the week ahead. For traders watching the near term.</p>
        </div>
      </div>
      <div className="card" style={{ overflow: "hidden" }}>
        <table className="tbl">
          <thead><tr><th>Day</th><th></th><th className="r">Forecast</th><th className="r">vs today</th></tr></thead>
          <tbody>
            {SB.shortTerm.map((d, i) => {
              const pct = (d.f - 1) * 100;
              return (
                <tr key={i}>
                  <td className="day">{d.day}</td>
                  <td style={{ color: "var(--zg-gray-500)" }}>{d.date}</td>
                  <td className="r">{window.PP.money(SB.price * d.f)}</td>
                  <td className={"r " + (pct >= 0 ? "pos" : "neg")}>{pct >= 0 ? "+" : ""}{pct.toFixed(2)}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function YearTables() {
  const yrs = Object.keys(SB.years);
  const [yr, setYr] = React.useState("2026");
  const m = window.PP.money;
  const roiOf = (y) => Math.round((SB.years[y].avg / SB.price - 1) * 100);
  const d = SB.years[yr];
  const roi = roiOf(yr);
  return (
    <section className="module" id="forecast" data-screen-label="Long-term forecast (M6)">
      <div className="module__head">
        <div>
          <div className="eyebrow module__eyebrow"><span className="dot" />Long-term forecast</div>
          <h2>Solana price forecast {yr}</h2>
          <p className="sub">Year-by-year min / average / max targets with projected ROI from today's price. Pick a year.</p>
        </div>
      </div>
      <div className="card card--pad">
        <div className="ytabs">
          {yrs.map(y => <button key={y} className={"ytab" + (y === yr ? " on" : "")} onClick={() => setYr(y)}>{y}</button>)}
        </div>
        <div className="ycols">
          <div className="ystat ystat--min"><div className="l">Bear case (min)</div><div className="v num">{m(d.min)}</div></div>
          <div className="ystat ystat--avg"><div className="l">Base case (avg)</div><div className="v num">{m(d.avg)}</div><div className={"roi num " + (roi >= 0 ? "pos" : "neg")}>{roi >= 0 ? "+" : ""}{roi}% ROI</div></div>
          <div className="ystat ystat--max"><div className="l">Bull case (max)</div><div className="v num">{m(d.max)}</div></div>
        </div>
        <table className="tbl">
          <thead><tr><th>Year</th><th className="r">Min</th><th className="r">Average</th><th className="r">Max</th><th className="r">Potential ROI</th></tr></thead>
          <tbody>
            {yrs.map(y => {
              const r = roiOf(y);
              return (
                <tr key={y} style={y === yr ? { background: "var(--zg-gray-100)" } : {}}>
                  <td className="day">{y}</td>
                  <td className="r neg">{m(SB.years[y].min)}</td>
                  <td className="r">{m(SB.years[y].avg)}</td>
                  <td className="r pos">{m(SB.years[y].max)}</td>
                  <td className={"r " + (r >= 0 ? "pos" : "neg")}>{r >= 0 ? "+" : ""}{r}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Calculator() {
  const [amount, setAmount] = React.useState(1000);
  const [growth, setGrowth] = React.useState(22);
  const [years, setYears] = React.useState(4);
  const [scn, setScn] = React.useState("base");
  const presets = { bear: 5, base: 22, bull: 45 };
  const setScenario = (k) => { setScn(k); setGrowth(presets[k]); };
  const onGrowth = (v) => { setGrowth(v); setScn(Object.keys(presets).find(k => presets[k] === v) || "custom"); };

  const mult = Math.pow(1 + growth / 100, years);
  const value = amount * mult;
  const roi = (mult - 1) * 100;
  const projPrice = SB.price * mult;
  const fmt = n => "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });

  return (
    <section className="module" id="calc" data-screen-label="Scenario / ROI calculator (M7)">
      <div className="module__head">
        <div>
          <div className="eyebrow module__eyebrow"><span className="dot" />Scenario calculator</div>
          <h2>Model your own SOL scenario</h2>
          <p className="sub">Set an amount and a growth assumption — or pick a preset. Results are hypothetical and based solely on your inputs.</p>
        </div>
      </div>
      <div className="calc">
        <div className="calc__in">
          <div className="field">
            <label>Investment amount</label>
            <div className="input"><span>$</span><input type="number" min="0" value={amount} onChange={e => setAmount(Math.max(0, +e.target.value || 0))} /></div>
          </div>
          <div className="field">
            <label>Scenario</label>
            <div className="scn">
              {["bear", "base", "bull"].map(k => (
                <button key={k} className={scn === k ? "on" : ""} onClick={() => setScenario(k)}>{k[0].toUpperCase() + k.slice(1)} · {presets[k]}%</button>
              ))}
            </div>
          </div>
          <div className="field">
            <label>Assumed annual growth — <b className="num" style={{ color: "var(--zg-ink)" }}>{growth}%</b></label>
            <input className="rng" type="range" min="-20" max="80" value={growth} onChange={e => onGrowth(+e.target.value)} />
          </div>
          <div className="field">
            <label>Time horizon — <b className="num" style={{ color: "var(--zg-ink)" }}>{years} {years === 1 ? "year" : "years"}</b></label>
            <input className="rng" type="range" min="1" max="15" value={years} onChange={e => setYears(+e.target.value)} />
          </div>
        </div>
        <div className="calc__out">
          <div className="l">Projected value</div>
          <div className="big num">{fmt(value)}</div>
          <div className={"roi num " + (roi >= 0 ? "pos" : "neg")} style={{ marginTop: 6 }}>{roi >= 0 ? "+" : ""}{roi.toFixed(0)}% · {fmt(Math.abs(value - amount))} {roi >= 0 ? "gain" : "loss"}</div>
          <div style={{ display: "flex", gap: 18, marginTop: 16 }}>
            <div><div className="l">Implied SOL price</div><div className="num" style={{ fontWeight: 700, fontSize: 20, marginTop: 4 }}>{fmt(projPrice)}</div></div>
            <div><div className="l">Holding</div><div className="num" style={{ fontWeight: 700, fontSize: 20, marginTop: 4 }}>{(amount / SB.price).toFixed(2)} SOL</div></div>
          </div>
          <div className="calc__note">Hypothetical scenario based solely on your inputs. Not a Zengo prediction or a return Zengo offers, and not an indicator of future performance.</div>
        </div>
      </div>
    </section>
  );
}

// --- real technical-analysis helpers (computed from CoinGecko daily closes) ---
function taSMA(a, p) { if (a.length < p) return null; const s = a.slice(-p); return s.reduce((x, y) => x + y, 0) / p; }
function taEMAseries(a, p) { const k = 2 / (p + 1); const out = [a[0]]; for (let i = 1; i < a.length; i++) out.push(a[i] * k + out[i - 1] * (1 - k)); return out; }
function taEMA(a, p) { if (a.length < p) return null; return taEMAseries(a, p).slice(-1)[0]; }
function taRSI(a, p = 14) {
  if (a.length < p + 1) return null;
  let gain = 0, loss = 0;
  for (let i = 1; i <= p; i++) { const d = a[i] - a[i - 1]; if (d >= 0) gain += d; else loss -= d; }
  let ag = gain / p, al = loss / p;
  for (let i = p + 1; i < a.length; i++) { const d = a[i] - a[i - 1]; ag = (ag * (p - 1) + Math.max(d, 0)) / p; al = (al * (p - 1) + Math.max(-d, 0)) / p; }
  if (al === 0) return 100;
  return 100 - 100 / (1 + ag / al);
}
function taMACD(a) { if (a.length < 35) return null; const line = taEMAseries(a, 12).map((v, i) => v - taEMAseries(a, 26)[i]); const signal = taEMAseries(line, 9); return line.slice(-1)[0] - signal.slice(-1)[0]; }
function taStoch(a, p = 14) { if (a.length < p) return null; const w = a.slice(-p); const lo = Math.min(...w), hi = Math.max(...w); if (hi === lo) return 50; return (a[a.length - 1] - lo) / (hi - lo) * 100; }

function Technicals() {
  const spot = SB.price, trend = SB.chg30d || 0;
  const m = window.PP.money;
  const hist = SB.hist && SB.hist.daily && SB.hist.daily.length > 30 ? SB.hist.daily : null;

  let inds, support, resistance;
  if (hist) {
    // REAL indicators from price history
    const sma50 = taSMA(hist, 50), sma200 = taSMA(hist, 200), ema100 = taEMA(hist, 100);
    const rsi = taRSI(hist, 14), macd = taMACD(hist), stoch = taStoch(hist, 14);
    const tagMA = (ma) => ma == null ? "neutral" : (spot >= ma ? "buy" : "sell");
    const calc = {
      sma50: [sma50 ? m(sma50) : "—", tagMA(sma50)],
      sma200: [sma200 ? m(sma200) : "—", tagMA(sma200)],
      ema100: [ema100 ? m(ema100) : "—", tagMA(ema100)],
      rsi: [rsi != null ? rsi.toFixed(1) : "—", rsi == null ? "neutral" : rsi > 70 ? "sell" : rsi < 30 ? "buy" : "neutral"],
      macd: [macd != null ? (macd >= 0 ? "+" : "") + macd.toFixed(2) : "—", macd == null ? "neutral" : macd >= 0 ? "buy" : "sell"],
      stoch: [stoch != null ? stoch.toFixed(1) : "—", stoch == null ? "neutral" : stoch > 80 ? "sell" : stoch < 20 ? "buy" : "neutral"],
    };
    inds = SB.technicals.indicators.map(it => ({ ...it, val: calc[it.k][0], tag: calc[it.k][1] }));
    // REAL support / resistance from recent swing lows / highs
    const lowN = (n) => m(Math.min(...hist.slice(-n)));
    const highN = (n) => m(Math.max(...hist.slice(-n)));
    support = [["30-day low", lowN(30)], ["90-day low", lowN(90)], ["52-week low", lowN(hist.length)]];
    resistance = [["30-day high", highN(30)], ["90-day high", highN(90)], ["52-week high", highN(hist.length)]];
  } else {
    // pre-load placeholder (replaced once history loads)
    inds = SB.technicals.indicators.map(it => ({ ...it, val: "—", tag: "neutral" }));
    support = [["30-day low", "—"], ["90-day low", "—"], ["52-week low", "—"]];
    resistance = [["30-day high", "—"], ["90-day high", "—"], ["52-week high", "—"]];
  }
  const buys = inds.filter(i => i.tag === "buy").length;
  const sells = inds.filter(i => i.tag === "sell").length;
  const verdict = buys > sells + 1 ? "Bullish" : sells > buys ? "Bearish" : "Neutral";
  const gaugeVal = inds.length ? Math.round(50 + ((buys - sells) / inds.length) * 50) : 50;
  return (
    <section className="module" id="tech" data-screen-label="Technical analysis (M8)">
      <div className="module__head">
        <div>
          <div className="eyebrow module__eyebrow"><span className="dot" />Technical analysis</div>
          <h2>Signals & key levels</h2>
          <p className="sub">Moving averages, oscillators and support/resistance computed from the last 12 months of price data.</p>
        </div>
      </div>
      <div className="card card--pad">
        <div className="tech">
          <div>
            <div className="gauge">
              <Gauge value={gaugeVal} label={verdict} size={170} />
              <div className="gauge__l">Summary signal · {buys} buy · {sells} sell · {inds.length - buys - sells} neutral</div>
            </div>
            <div className="sr">
              <div className="sr__box"><div className="h" style={{ color: "var(--zg-positive)" }}>Support</div>
                {support.map((l, i) => <div className="sr__lvl" key={i}><span style={{ color: "var(--zg-gray-500)" }}>{l[0]}</span><span>{l[1]}</span></div>)}
              </div>
              <div className="sr__box"><div className="h" style={{ color: "var(--zg-no)" }}>Resistance</div>
                {resistance.map((l, i) => <div className="sr__lvl" key={i}><span style={{ color: "var(--zg-gray-500)" }}>{l[0]}</span><span>{l[1]}</span></div>)}
              </div>
            </div>
          </div>
          <div className="ind">
            {inds.map((ind, i) => (
              <div className="ind__row" key={i}>
                <div className="ind__name">{ind.name}<small>{ind.sub}</small></div>
                <div className="ind__val">{ind.val}</div>
                <div className={"tag tag--" + ind.tag}>{ind.tag === "buy" ? "Buy" : ind.tag === "sell" ? "Sell" : "Neutral"}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Sentiment() {
  const moodLabel = SB.moodLabel || (SB.mood < 25 ? "Extreme fear" : SB.mood < 45 ? "Fear" : SB.mood < 55 ? "Neutral" : SB.mood < 75 ? "Greed" : "Extreme greed");
  const chip = (k) => ({ Bullish: { background: "rgba(0,182,122,.13)", color: "var(--zg-positive)" }, Bearish: { background: "rgba(255,94,91,.13)", color: "var(--zg-no)" }, Neutral: { background: "var(--zg-gray-100)", color: "var(--zg-gray-500)" } }[k]);
  const dir = (v, hi, lo) => v >= hi ? "Bullish" : v <= lo ? "Bearish" : "Neutral";
  const sg = (n) => (n >= 0 ? "+" : "") + Number(n).toFixed(2) + "%";
  const signals = [
    { name: "Crypto Fear & Greed", sub: "Market-wide mood", val: SB.mood + " · " + moodLabel, tag: SB.mood > 55 ? "Bullish" : SB.mood < 45 ? "Bearish" : "Neutral" },
    { name: "24-hour momentum", sub: "SOL spot price", val: sg(SB.chg24h), tag: dir(SB.chg24h, 1, -1) },
    { name: "7-day trend", sub: "SOL spot price", val: sg(SB.chg7d), tag: dir(SB.chg7d, 3, -3) },
    { name: "30-day trend", sub: "SOL spot price", val: sg(SB.chg30d), tag: dir(SB.chg30d, 5, -5) },
    { name: "Market-implied", sub: "Polymarket · reach $100 in 2026", val: (SB.compare ? SB.compare.pct : "—") + "%", tag: SB.compare ? (SB.compare.pct >= 60 ? "Bullish" : SB.compare.pct <= 40 ? "Bearish" : "Neutral") : "Neutral" },
  ];
  return (
    <section className="module" id="news" data-screen-label="Market sentiment (M9)">
      <div className="module__head">
        <div>
          <div className="eyebrow module__eyebrow"><span className="dot" />Market sentiment</div>
          <h2>Where sentiment sits right now</h2>
          <p className="sub">Live signals — the Crypto Fear &amp; Greed Index, SOL price momentum, and what prediction markets imply. No opinions, just the data.</p>
        </div>
      </div>
      <div className="card card--pad">
        <div className="sent">
          <div className="mood">
            <Gauge value={SB.mood} label={moodLabel} size={170} />
            <div className="mood__l">{moodLabel}</div>
            <div className="mood__sub">Crypto Fear &amp; Greed Index · live, updated daily.</div>
          </div>
          <div className="ind">
            {signals.map((s, i) => (
              <div className="ind__row" key={i}>
                <div className="ind__name">{s.name}<small>{s.sub}</small></div>
                <div className="ind__val">{s.val}</div>
                <div className="tag" style={chip(s.tag)}>{s.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { ChartSection, ShortTerm, YearTables, Calculator, Technicals, Sentiment });
