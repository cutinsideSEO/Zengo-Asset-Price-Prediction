/* modulesA.jsx — Nav, Hero (M0+M1), At-a-glance (M2), Odds module (M3, 3 variants). */
const S = window.SOL;

function Nav() {
  const Z = window.ZNAV;
  return (
    <nav className="nav">
      <div className="nav__l">
        <a href={Z.home} aria-label="Zengo home">
          <img src={(window.__resources && window.__resources.navLogo) || "assets/logo/zengo-wordmark-orange.svg"} alt="Zengo" style={{ height: 25, display: "block" }} />
        </a>
        <div className="nav__links">
          {Z.menus.map(m => (
            <div className="nav__group" key={m.label}>
              <span className="nav__item">{m.label}<IcChevron dir="down" size={14} style={{ opacity: .6 }} /></span>
              <div className="nav__dd">
                {m.items.map(([t, h]) => (
                  <a key={t} href={h} target="_blank" rel="noopener">{t}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="nav__r">
        <a className="nav__login" href={Z.login} target="_blank" rel="noopener">Log in</a>
        <a className="nav__signup" href={Z.signup} target="_blank" rel="noopener">Sign up</a>
        <button className="nav__burger" aria-label="Menu"><IcBurger /></button>
      </div>
    </nav>
  );
}

function ChangePill({ d, big }) {
  const up = d >= 0;
  return <span className={"snap__chg " + (up ? "pos" : "neg")} style={big ? { fontSize: 16 } : {}}>{up ? <IcUp /> : <IcDown />} {up ? "+" : ""}{d}%</span>;
}

function HeroProse() {
  const [open, setOpen] = React.useState(false);
  const c = S.heroContent;
  return (
    <div className="hero__prose">
      <p className="hero__lead" dangerouslySetInnerHTML={{ __html: c.preview }} />
      <div className={"hero__more" + (open ? " is-open" : "")} id="hero-more">
        <div className="hero__more-inner" dangerouslySetInnerHTML={{ __html: c.full }} />
      </div>
      <button className="hero__toggle" aria-expanded={open} aria-controls="hero-more" onClick={() => setOpen(o => !o)}>
        {open ? "Show less" : "Read more"}
        <IcChevron dir={open ? "up" : "down"} size={16} />
      </button>
    </div>
  );
}

function Hero() {
  return (
    <header className="hero" data-screen-label="Hero / snapshot">
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <ol>
            <li><a href={window.ZNAV.home}>Home</a></li>
            <li><a href={window.ZNAV.predictionMarkets}>Prediction Markets</a></li>
            <li><a href={window.ZNAV.predictionMarkets}>Crypto Predictions</a></li>
            <li aria-current="page">Solana Price Prediction</li>
          </ol>
        </nav>
        <div className="hero__top">
          <div>
            <div className="hero__coin">
              <img className="coin-badge" src={(window.__resources && window.__resources.coinBadge) || "assets/sol-coin.png"} alt="Solana (SOL)" />
              <span className="tk">Solana · SOL · {S.rank}</span>
            </div>
            <h1>Solana (SOL) Price Prediction <span className="hl">2026-2030</span></h1>
            <HeroProse />
            <div className="hero__cta">
              <a className="btn" href={window.ZNAV.signup} target="_blank" rel="noopener">Trade SOL markets</a>
              <a className="arrow-link" href="#odds" style={{ color: "#fff" }}>See market odds <IcArrow /></a>
            </div>
          </div>

          {/* M1 snapshot */}
          <div className="snap" data-screen-label="Live price snapshot (M1)">
            <div className="snap__top">
              <div>
                <div className="snap__price num">${S.price.toFixed(2)}</div>
              </div>
              <ChangePill d={S.chg24h} big />
            </div>
            <div className="snap__chips">
              <div className="snap__chip"><div className="l">24h</div><div className={"v num " + (S.chg24h >= 0 ? "pos" : "neg")}>{S.chg24h >= 0 ? "+" : ""}{S.chg24h}%</div></div>
              <div className="snap__chip"><div className="l">7d</div><div className={"v num " + (S.chg7d >= 0 ? "pos" : "neg")}>{S.chg7d >= 0 ? "+" : ""}{S.chg7d}%</div></div>
              <div className="snap__chip"><div className="l">30d</div><div className={"v num " + (S.chg30d >= 0 ? "pos" : "neg")}>{S.chg30d >= 0 ? "+" : ""}{S.chg30d}%</div></div>
            </div>
            <div className="snap__grid">
              <div className="snap__cell"><div className="l">Market cap</div><div className="v num">{S.marketCap}</div></div>
              <div className="snap__cell"><div className="l">24h volume</div><div className="v num">{S.vol24h}</div></div>
              <div className="snap__cell"><div className="l">All-time high</div><div className="v num">{S.ath}</div></div>
              <div className="snap__cell"><div className="l">Circulating</div><div className="v num">{S.supply}</div></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function Glance() {
  return (
    <section className="module" id="glance" data-screen-label="At-a-glance forecast (M2)">
      <div className="module__head">
        <div>
          <div className="eyebrow module__eyebrow"><span className="dot" />Forecast at a glance</div>
          <h2>Where our model sees SOL heading</h2>
          <p className="sub">Algorithmic targets across every horizon. The yearly figures are detailed with full min/avg/max ranges below.</p>
        </div>
      </div>
      <div className="glance">
        {S.glance.map(g => {
          const price = g.target != null ? g.target : S.price * g.factor;
          const d = g.target != null ? (g.target / S.price - 1) * 100 : (g.factor - 1) * 100;
          const up = d >= 0;
          return (
            <div className="gtile" key={g.h}>
              <div className="h">{g.h}</div>
              <div className="v num">{window.PP.money(price)}</div>
              <div className={"d " + (up ? "pos" : "neg")}>{up ? <IcUp /> : <IcDown />} {up ? "+" : ""}{Math.abs(d) < 20 ? d.toFixed(1) : d.toFixed(0)}%</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ---------- M3 odds module ---------- */
function ProbBar({ yes, anim }) {
  return (
    <div className="pbar">
      <i className="yes" style={{ width: (anim ? yes : 0) + "%" }} />
      <i className="no" style={{ width: (anim ? 100 - yes : 0) + "%" }} />
    </div>
  );
}

function OddsCardA({ m, anim }) {
  return (
    <div className="ocard">
      <div className="ocard__q">{m.q}</div>
      <div className="ocard__pct">
        <span className="big num">{m.yes}%</span>
        <span className="lab">implied chance · Yes</span>
      </div>
      <ProbBar yes={m.yes} anim={anim} />
      <div className="ocard__legend"><span className="y">Buy Yes {window.PP.buyYes(m)}¢</span><span className="n">Buy No {window.PP.buyNo(m)}¢</span></div>
      {m.spark ? <Sparkline data={m.spark} /> : null}
      <div className="ocard__meta">
        <span><IcClock size={11} style={{ display: "inline", verticalAlign: "-1px", marginRight: 4 }} />Resolves {m.resolves}</span>
        <span>{m.vol} traded</span>
      </div>
      <a className="ocard__cta" href={window.ZNAV.signup} target="_blank" rel="noopener">Trade in Zengo <IcArrow size={18} /></a>
    </div>
  );
}

function VariantA({ anim }) {
  return <div className="odds-cards">{S.markets.map((m, i) => <OddsCardA key={i} m={m} anim={anim} />)}</div>;
}

function VariantB({ anim }) {
  const L = S.ladder;
  return (
    <div className="ladder">
      <div className="ladder__top">
        <div className="ladder__q">{L.q}</div>
        <div className="ladder__meta">{L.vol} · resolves {L.resolves}</div>
      </div>
      <div className="ladder__meta" style={{ color: "var(--zg-text-dim)" }}>{L.sub || "Market-implied probability that SOL closes above each level."}</div>
      <div className="ladder__rows">
        {L.rows.map((r, i) => (
          <div className={"lrow" + (r.cur ? " cur" : "")} key={i}>
            <span className="strike num">{r.strike}</span>
            <span className="ltrack"><span className="lfill" style={{ width: (anim ? r.pct : 0) + "%" }} /></span>
            <span className="lpct num">{r.pct}%</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 18, flexWrap: "wrap", gap: 12 }}>
        <span className="ladder__meta">Current price <b style={{ color: "var(--zg-orange)" }}>${S.price.toFixed(2)}</b></span>
        <a className="ocard__cta" href={window.ZNAV.signup} target="_blank" rel="noopener" style={{ width: "auto", padding: "11px 20px" }}>Trade SOL price markets in Zengo <IcArrow size={18} /></a>
      </div>
    </div>
  );
}

function VariantC({ anim }) {
  const feat = S.markets[0];
  const r = 88, c = 2 * Math.PI * r;
  return (
    <div className="spot">
      <div className="spot__main">
        <div className="ocard__q" style={{ minHeight: 0, fontSize: 18 }}>{feat.q}</div>
        <div className="dial">
          <svg width="200" height="200" viewBox="0 0 200 200" style={{ display: "block" }}>
            <circle cx="100" cy="100" r={r} fill="none" stroke="var(--zg-surface-600)" strokeWidth="16" />
            <circle cx="100" cy="100" r={r} fill="none" stroke="var(--zg-yes)" strokeWidth="16" strokeLinecap="round"
              strokeDasharray={c} strokeDashoffset={anim ? c * (1 - feat.yes / 100) : c}
              transform="rotate(-90 100 100)" style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(.3,.9,.3,1)" }} />
          </svg>
          <div className="dial__pct"><span className="n num">{feat.yes}%</span><span className="l">Yes · implied</span></div>
        </div>
        <div className="ocard__legend" style={{ marginTop: 4 }}><span className="y">Buy Yes {window.PP.buyYes(feat)}¢</span><span className="n">Buy No {window.PP.buyNo(feat)}¢</span></div>
        <div className="ocard__meta"><span><IcClock size={11} style={{ display: "inline", verticalAlign: "-1px", marginRight: 4 }} />Resolves {feat.resolves}</span><span>{feat.vol} traded</span></div>
        <a className="ocard__cta" href={window.ZNAV.signup} target="_blank" rel="noopener" style={{ marginTop: 14 }}>Trade in Zengo <IcArrow size={18} /></a>
      </div>
      <div className="spot__side">
        {S.markets.slice(1).map((m, i) => (
          <div className="sside" key={i}>
            <div className="q">{m.q}</div>
            <div className="row"><span className="p num">{m.yes}%</span><div style={{ flex: 1 }}><ProbBar yes={m.yes} anim={anim} /></div></div>
            <a className="ocard__meta" href={window.ZNAV.signup} target="_blank" rel="noopener" style={{ border: 0, padding: 0, marginTop: 2 }}><span>{m.vol} traded</span><span style={{ color: "var(--zg-orange)" }}>Trade →</span></a>
          </div>
        ))}
      </div>
    </div>
  );
}

function OddsModule() {
  const [view, setView] = React.useState("A");
  const [anim, setAnim] = React.useState(false);
  React.useEffect(() => {
    setAnim(false);
    const t = setTimeout(() => setAnim(true), 60);
    return () => clearTimeout(t);
  }, [view]);
  const views = { A: "Market cards", B: "Probability ladder", C: "Spotlight" };
  const status = window.__pmStatus || "loading";
  const eyebrow = status === "live" ? "Live from Polymarket" : status === "sample" ? "Indicative odds · live feed unavailable" : "Connecting to Polymarket…";
  return (
    <section className="module" id="odds" data-screen-label="Market-implied odds (M3)">
      <div className="odds">
        <div className="odds__head">
          <div>
            <div className="eyebrow" style={{ color: "var(--zg-text-dim)", marginBottom: 10 }}><span className="live-dot" style={{ opacity: status === "live" ? 1 : 0.4 }} />{eyebrow}</div>
            <h2>What the market is pricing in</h2>
            <p className="sub">Live odds from real Solana prediction markets, streamed from Polymarket. These reflect what traders are backing now and change in real time — they are not Zengo forecasts.</p>
          </div>
          {S.pmEventUrl
            ? <a className="odds__src" href={S.pmEventUrl} target="_blank" rel="noopener"><span className="poly-dot" />Market data: Polymarket ↗</a>
            : <span className="odds__src"><span className="poly-dot" />Market data: Polymarket</span>}
        </div>

        <div className="seg" role="tablist" aria-label="Odds module layout">
          {Object.entries(views).map(([k, lbl]) => (
            <button key={k} className={view === k ? "on" : ""} onClick={() => setView(k)} role="tab" aria-selected={view === k}
              style={{ background: view === k ? "#fff" : "transparent", color: view === k ? "var(--zg-ink)" : "var(--zg-text-dim)" }}>{lbl}</button>
          ))}
        </div>

        {view === "A" && <VariantA anim={anim} />}
        {view === "B" && <VariantB anim={anim} />}
        {view === "C" && <VariantC anim={anim} />}

        {/* algorithmic vs market comparison */}
        <div className="compare">
          <div className="compare__half">
            <div className="t"><span className="tagdot" style={{ background: "var(--zg-info)" }} />OUR MODEL</div>
            <div className="v num">~{window.PP.money(S.years["2026"].avg)}<small>projected 2026 average (algorithmic)</small></div>
          </div>
          <div className="compare__vs">VS</div>
          <div className="compare__half">
            <div className="t"><span className="tagdot" style={{ background: "var(--zg-yes)" }} />THE MARKET</div>
            <div className="v num">{S.compare.pct}% chance<small>traders' odds SOL {S.compare.label}</small></div>
          </div>
        </div>
        <p style={{ fontFamily: "var(--zg-font-num)", fontSize: 12, color: "var(--zg-text-faint)", margin: "14px 0 0", display: "flex", alignItems: "center", gap: 7 }}>
          <IcInfo size={13} /> One is a trend-based projection; the other is real money on the line. We show both, clearly labelled.
        </p>
      </div>
    </section>
  );
}

Object.assign(window, { Nav, Hero, Glance, OddsModule });
