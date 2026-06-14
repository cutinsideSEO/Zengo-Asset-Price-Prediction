/* viz.jsx — animated price chart, sparkline, radial gauge. */

// seeded RNG so the chart is deterministic across renders
function makeRng(seed) {
  let s = seed >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}

// Evenly sample an array down to n points.
function sampleArr(arr, n) {
  if (!arr || arr.length === 0) return [];
  if (arr.length <= n) return arr.slice();
  const step = (arr.length - 1) / (n - 1);
  const out = [];
  for (let i = 0; i < n; i++) out.push(arr[Math.round(i * step)]);
  return out;
}
// Real OHLC-ish series from live CoinGecko close prices (window.SOL.hist), per timeframe.
function realSeries(tf) {
  const h = window.SOL && window.SOL.hist;
  if (!h) return null;
  let closes;
  if (tf === "24H") closes = sampleArr(h.hourly, 26);
  else if (tf === "7D") closes = (h.daily || []).slice(-7);
  else if (tf === "30D") closes = (h.daily || []).slice(-30);
  else closes = sampleArr(h.daily, 60); // 1Y / ALL (≈365d fetched)
  if (!closes || closes.length < 3) return null;
  return closes.map((c, i) => {
    const o = i === 0 ? closes[0] : closes[i - 1];
    return { o, c, hi: Math.max(o, c) * 1.004, lo: Math.min(o, c) * 0.996 };
  });
}

// Build OHLC-ish series for a timeframe, ending at `end` price.
// Prefers real CoinGecko history; falls back to a deterministic synthetic walk.
function buildSeries(tf, end) {
  const real = realSeries(tf);
  if (real) return real;
  const cfg = {
    "24H": { n: 24, vol: 0.010, drift: -0.0012 },
    "7D":  { n: 28, vol: 0.016, drift: 0.0009 },
    "30D": { n: 30, vol: 0.022, drift: 0.0042 },
    "1Y":  { n: 52, vol: 0.05,  drift: 0.012 },
    "ALL": { n: 60, vol: 0.075, drift: 0.022 },
  }[tf];
  const rng = makeRng({ "24H": 11, "7D": 23, "30D": 37, "1Y": 59, "ALL": 91 }[tf]);
  // work backwards from end so the line always lands on current price
  const closes = [end];
  for (let i = 1; i < cfg.n; i++) {
    const prev = closes[0];
    const step = (rng() - 0.5) * 2 * cfg.vol + cfg.drift;
    closes.unshift(prev / (1 + step));
  }
  return closes.map((c, i) => {
    const o = i === 0 ? c * (1 - (rng() - 0.5) * cfg.vol) : closes[i - 1];
    const hi = Math.max(o, c) * (1 + rng() * cfg.vol * 0.6);
    const lo = Math.min(o, c) * (1 - rng() * cfg.vol * 0.6);
    return { o, c, hi, lo };
  });
}

function PriceChart({ end, forecast }) {
  const [tf, setTf] = React.useState("30D");
  const [mode, setMode] = React.useState("line");
  const [drawn, setDrawn] = React.useState(true);
  const series = React.useMemo(() => buildSeries(tf, end), [tf, end]);
  const first = React.useRef(true);

  React.useEffect(() => {
    if (first.current) { first.current = false; return; }
    setDrawn(false);
    const t = setTimeout(() => setDrawn(true), 40);
    return () => clearTimeout(t);
  }, [tf, mode]);

  const W = 820, H = 340, padL = 6, padR = 64, padT = 16, padB = 26;
  const histW = (W - padL - padR) * 0.66;
  const fcW = (W - padL - padR) * 0.34;
  // y-domain spans history + forecast band
  const allLo = Math.min(...series.map(d => d.lo), forecast.min);
  const allHi = Math.max(...series.map(d => d.hi), forecast.max);
  const pad = (allHi - allLo) * 0.08;
  const lo = allLo - pad, hi = allHi + pad;
  const y = v => padT + (H - padT - padB) * (1 - (v - lo) / (hi - lo));
  const n = series.length;
  const xH = i => padL + (histW) * (i / (n - 1));
  const last = series[n - 1].c;

  // history line path
  const linePts = series.map((d, i) => [xH(i), y(d.c)]);
  const linePath = linePts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  const areaPath = linePath + ` L ${xH(n - 1).toFixed(1)} ${H - padB} L ${padL} ${H - padB} Z`;

  // forecast band (from last close -> min/avg/max at far right)
  const fcX0 = padL + histW, fcX1 = padL + histW + fcW;
  const bandTop = `M ${fcX0} ${y(last)} C ${fcX0 + fcW * 0.5} ${y(last)}, ${fcX1 - fcW * 0.4} ${y(forecast.max)}, ${fcX1} ${y(forecast.max)}`;
  const bandBot = `L ${fcX1} ${y(forecast.min)} C ${fcX1 - fcW * 0.4} ${y(forecast.min)}, ${fcX0 + fcW * 0.5} ${y(last)}, ${fcX0} ${y(last)} Z`;
  const avgPath = `M ${fcX0} ${y(last)} C ${fcX0 + fcW * 0.5} ${y(last)}, ${fcX1 - fcW * 0.4} ${y(forecast.avg)}, ${fcX1} ${y(forecast.avg)}`;

  // y gridlines / labels
  const ticks = 4;
  const gridVals = Array.from({ length: ticks + 1 }, (_, i) => lo + (hi - lo) * (i / ticks));
  const fmt = v => "$" + (v >= 100 ? v.toFixed(0) : v.toFixed(1));

  // candle width
  const cw = Math.max(3, (histW / n) * 0.6);

  return (
    <div>
      <div className="chart__bar">
        <div className="chart__price">
          <span className="p num">${end.toFixed(2)}</span>
          <span className="snap__chg pos" style={{ background: "rgba(0,182,122,.12)" }}><IcUp /> Live</span>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <div className="toggle">
            <button className={mode === "line" ? "on" : ""} onClick={() => setMode("line")}>Line</button>
            <button className={mode === "candle" ? "on" : ""} onClick={() => setMode("candle")}>Candles</button>
          </div>
          <div className="tfs">
            {["24H", "7D", "30D", "1Y", "ALL"].map(t => (
              <button key={t} className={tf === t ? "on" : ""} onClick={() => setTf(t)}>{t}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="chart__wrap">
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block", height: "auto" }} preserveAspectRatio="none">
          <defs>
            <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(254,153,12,.20)" />
              <stop offset="100%" stopColor="rgba(254,153,12,0)" />
            </linearGradient>
            <linearGradient id="bandFill" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(108,177,255,.05)" />
              <stop offset="100%" stopColor="rgba(108,177,255,.22)" />
            </linearGradient>
          </defs>

          {/* gridlines */}
          {gridVals.map((v, i) => (
            <g key={i}>
              <line x1={padL} y1={y(v)} x2={W - padR} y2={y(v)} stroke="#EEEDEB" strokeWidth="1" />
              <text x={W - padR + 8} y={y(v) + 4} fontFamily="Inter" fontSize="11" fontWeight="600" fill="#A8A8A8">{fmt(v)}</text>
            </g>
          ))}

          {/* forecast band */}
          <path d={bandTop + " " + bandBot} fill="url(#bandFill)" opacity={drawn ? 1 : 0} style={{ transition: "opacity .6s ease .5s" }} />
          <path d={avgPath} fill="none" stroke="var(--zg-info)" strokeWidth="2" strokeDasharray="5 5" opacity={drawn ? 1 : 0} style={{ transition: "opacity .6s ease .6s" }} />
          <line x1={fcX0} y1={padT} x2={fcX0} y2={H - padB} stroke="#E3E1DE" strokeWidth="1" strokeDasharray="3 4" />
          <text x={fcX0 + 6} y={padT + 12} fontFamily="Inter" fontSize="10.5" fontWeight="700" fill="#A8A8A8">FORECAST →</text>

          {/* history */}
          {mode === "line" ? (
            <g>
              <path d={areaPath} fill="url(#areaFill)" opacity={drawn ? 1 : 0} style={{ transition: "opacity .8s ease .3s" }} />
              <path d={linePath} fill="none" stroke="var(--zg-orange)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                style={{ opacity: drawn ? 1 : 0, transition: "opacity .7s ease .15s" }} />
              <circle cx={xH(n - 1)} cy={y(last)} r="4.5" fill="var(--zg-orange)" opacity={drawn ? 1 : 0} style={{ transition: "opacity .3s ease 1s" }} />
            </g>
          ) : (
            <g>
              {series.map((d, i) => {
                const up = d.c >= d.o;
                const col = up ? "var(--zg-positive)" : "var(--zg-no)";
                const cx = xH(i);
                return (
                  <g key={i} opacity={drawn ? 1 : 0} style={{ transition: `opacity .4s ease ${0.2 + i * 0.012}s` }}>
                    <line x1={cx} y1={y(d.hi)} x2={cx} y2={y(d.lo)} stroke={col} strokeWidth="1.2" />
                    <rect x={cx - cw / 2} y={Math.min(y(d.o), y(d.c))} width={cw} height={Math.max(2, Math.abs(y(d.o) - y(d.c)))} fill={col} rx="1" />
                  </g>
                );
              })}
            </g>
          )}

          {/* forecast endpoint markers */}
          {["max", "avg", "min"].map((k, i) => (
            <g key={k} opacity={drawn ? 1 : 0} style={{ transition: `opacity .4s ease ${0.8 + i * 0.1}s` }}>
              <circle cx={fcX1} cy={y(forecast[k])} r="3" fill={k === "avg" ? "var(--zg-info)" : "#C8C9CD"} />
            </g>
          ))}
        </svg>
      </div>

      <div className="chart__legend">
        <span><i className="lg-swatch" style={{ background: "var(--zg-orange)" }} /> SOL price · CoinGecko</span>
        <span><i className="lg-swatch" style={{ background: "var(--zg-info)", height: 0, borderTop: "2px dashed var(--zg-info)" }} /> Model forecast (avg)</span>
        <span><i className="lg-swatch" style={{ background: "rgba(108,177,255,.3)", height: 10, borderRadius: 2 }} /> Bull-bear range</span>
      </div>
    </div>
  );
}

function Sparkline({ data, color = "var(--zg-yes)", w = 220, h = 34 }) {
  const lo = Math.min(...data), hi = Math.max(...data);
  const x = i => (w) * (i / (data.length - 1));
  const y = v => h - 3 - (h - 6) * ((v - lo) / (hi - lo || 1));
  const path = data.map((v, i) => (i ? "L" : "M") + x(i).toFixed(1) + " " + y(v).toFixed(1)).join(" ");
  const area = path + ` L ${w} ${h} L 0 ${h} Z`;
  const id = "sp" + Math.round(data.reduce((a, b) => a + b, 0));
  return (
    <svg className="spark" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity="0.25" /><stop offset="100%" stopColor={color} stopOpacity="0" /></linearGradient></defs>
      <path d={area} fill={`url(#${id})`} />
      <path d={path} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// radial gauge 0-100 with colored arc
function Gauge({ value, size = 150, label, sublabel, dark }) {
  const [v, setV] = React.useState(0);
  React.useEffect(() => { const t = setTimeout(() => setV(value), 120); return () => clearTimeout(t); }, [value]);
  const r = size / 2 - 14;
  const cx = size / 2, cy = size / 2;
  const start = -220, end = 40; // degrees sweep
  const sweep = end - start;
  const ang = start + sweep * (v / 100);
  const pol = (deg) => [cx + r * Math.cos(deg * Math.PI / 180), cy + r * Math.sin(deg * Math.PI / 180)];
  const arc = (a0, a1) => {
    const [x0, y0] = pol(a0), [x1, y1] = pol(a1);
    const large = (a1 - a0) > 180 ? 1 : 0;
    return `M ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1}`;
  };
  const col = value < 34 ? "var(--zg-no)" : value < 56 ? "var(--zg-orange)" : "var(--zg-positive)";
  const [hx, hy] = pol(ang);
  return (
    <svg width={size} height={size * 0.78} viewBox={`0 0 ${size} ${size * 0.82}`} style={{ display: "block", overflow: "visible" }}>
      <path d={arc(start, end)} fill="none" stroke={dark ? "var(--zg-surface-600)" : "var(--zg-gray-200)"} strokeWidth="11" strokeLinecap="round" />
      <path d={arc(start, ang)} fill="none" stroke={col} strokeWidth="11" strokeLinecap="round" style={{ transition: "all 1.1s cubic-bezier(.3,.9,.3,1)" }} />
      <circle cx={hx} cy={hy} r="7" fill="#fff" stroke={col} strokeWidth="3" style={{ transition: "all 1.1s cubic-bezier(.3,.9,.3,1)" }} />
      <text x={cx} y={cy + 2} textAnchor="middle" fontFamily="Inter" fontWeight="700" fontSize="30" fill={dark ? "#fff" : "var(--zg-ink)"}>{Math.round(v)}</text>
      <text x={cx} y={cy + 22} textAnchor="middle" fontFamily="Inter" fontWeight="600" fontSize="11" fill={col}>{label}</text>
    </svg>
  );
}

Object.assign(window, { PriceChart, Sparkline, Gauge });
