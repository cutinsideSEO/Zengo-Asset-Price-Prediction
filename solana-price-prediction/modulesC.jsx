/* modulesC.jsx — Drivers (M10), Explainer (M11), Product CTA (M12), FAQ (M13),
   Related coins + disclaimer (M14), Footer, and the sticky Rail. */
const SC = window.SOL;

function DriverIcon({ kind }) {
  const common = { width: 22, height: 22, fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", style: { display: "block" } };
  const paths = {
    firedancer: <path d="M12 3c2 3 5 5 5 9a5 5 0 0 1-10 0c0-2 1-3 2-4 0 1 1 2 2 2 1 0 1-1 1-3 0-2 0-3-2-4z" />,
    depin: <g><circle cx="12" cy="6" r="2.5" /><circle cx="5" cy="18" r="2.5" /><circle cx="19" cy="18" r="2.5" /><path d="M12 8.5v4M10.5 14l-3.5 2.5M13.5 14l3.5 2.5" /></g>,
    reg: <g><path d="M12 3l8 3v6c0 5-3.4 7.8-8 9-4.6-1.2-8-4-8-9V6z" /><path d="M9 12l2 2 4-4" /></g>,
    supply: <g><circle cx="12" cy="12" r="9" /><path d="M12 7v10M14.5 9.2c-.6-.7-1.5-1-2.5-1-1.4 0-2.5.7-2.5 1.9 0 2.6 5 1.3 5 3.9 0 1.2-1.1 2-2.5 2-1 0-1.9-.3-2.5-1" /></g>,
    btc: <g><path d="M4 16l4-9 4 7 3-5 5 7" /><circle cx="4" cy="16" r="1.4" fill="currentColor" /></g>,
    eco: <g><rect x="3" y="13" width="4" height="8" rx="1" /><rect x="10" y="8" width="4" height="13" rx="1" /><rect x="17" y="4" width="4" height="17" rx="1" /></g>,
  };
  return <svg viewBox="0 0 24 24" {...common}>{paths[kind] || paths.eco}</svg>;
}

function Drivers() {
  return (
    <section className="sec sec--dark band" id="drivers" data-screen-label="Why the price moves (M10)">
      <div className="wrap">
        <div className="band__head">
          <div className="eyebrow"><span className="dot" />The why, not just the what</div>
          <h2>What actually drives Solana's price</h2>
          <p>Forecasts and odds tell you where the market sits. These are the forces that move it — the fundamentals competitors leave out.</p>
        </div>
        <div className="drivers">
          {SC.drivers.map((d, i) => (
            <div className="driver" key={i}>
              <div className="driver__ic" style={{ background: "color-mix(in srgb," + (d.color) + " 16%, transparent)", color: d.color }}><DriverIcon kind={d.ic} /></div>
              <h3>{d.h}</h3>
              <p>{d.p}</p>
              <span className="imp" style={{ background: "color-mix(in srgb," + d.impColor + " 16%, transparent)", color: d.impColor }}>{d.imp}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Explainer() {
  return (
    <section className="sec sec--light band" id="how" data-screen-label="How forecasts & markets work (M11)">
      <div className="wrap">
        <div className="band__head">
          <div className="eyebrow"><span className="dot" />How this works</div>
          <h2>Forecasts vs. markets, in plain English</h2>
          <p>Two different signals, two different sources. Here's how to read each one — and why we show both.</p>
        </div>
        <div className="steps">
          <div className="step"><div className="step__n">01</div><h3>Algorithmic forecast</h3><p>Our model extrapolates from SOL's historical volatility and trend across bear, base and bull scenarios. It answers: "what does a trend-based model project?"</p></div>
          <div className="step"><div className="step__n">02</div><h3>Market-implied odds</h3><p>A prediction market's "Yes" price equals the probability the crowd assigns an outcome. A 60¢ Yes means a 60% implied chance. Real money, not a moving average.</p></div>
          <div className="step"><div className="step__n">03</div><h3>Reading the chart</h3><p>The solid line is real price history; the shaded band is our projected range. Wider band = more uncertainty. Neither is a promise — both are estimates.</p></div>
        </div>
        <div className="explain-split">
          <div className="esplit" style={{ borderColor: "rgba(108,177,255,.4)", background: "rgba(108,177,255,.06)" }}>
            <h4><span className="tagdot" style={{ background: "var(--zg-info)", width: 11, height: 11 }} />A projection</h4>
            <p>Algorithmic targets are scenarios, not certainties. Multi-year crypto forecasts especially should be read as ranges of possibility.</p>
          </div>
          <div className="esplit" style={{ borderColor: "rgba(0,206,203,.4)", background: "rgba(0,206,203,.06)" }}>
            <h4><span className="tagdot" style={{ background: "var(--zg-yes)", width: 11, height: 11 }} />Real money on the line</h4>
            <p>Market odds move constantly as traders buy and sell. They reflect live conviction — but they are not Zengo forecasts or guarantees.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductCta() {
  const trust = [
    { ic: <IcKey />, t: "Self-custodial", s: "MPC keys — no seed phrase, only you control funds" },
    { ic: <IcShield />, t: "0 hacks in 7 years", s: "3-factor recovery, backed by eToro" },
    { ic: <IcNoKyc />, t: "No KYC to start", s: "Be trading in minutes" },
    { ic: <IcUsdc />, t: "Settles in USDC", s: "Outcomes resolve in dollars" },
  ];
  return (
    <section className="sec band" style={{ background: "var(--zg-orange)" }} id="product" data-screen-label="Predictions product CTA (M12)">
      <div className="wrap">
        <div className="prod">
          <div>
            <div className="eyebrow" style={{ color: "rgba(16,16,16,.6)", marginBottom: 14 }}><span className="dot" style={{ background: "var(--zg-ink)" }} />Zengo Predictions</div>
            <h2>Trade SOL outcome markets in Zengo.</h2>
            <p>The forecasts above are editorial. This is the product: trade real-world Solana outcomes inside the self-custodial wallet two million people trust — driven by traders, not the house.</p>
            <div className="trust">
              {trust.map((x, i) => (
                <div className="trust__i" key={i}><span className="ic">{x.ic}</span><span className="t">{x.t}<small>{x.s}</small></span></div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a className="btn btn--ink" href={window.ZNAV.download} target="_blank" rel="noopener">Download Zengo</a>
              <a className="btn btn--ghost" href={window.ZNAV.predictionMarkets} target="_blank" rel="noopener">How prediction markets work <IcArrow size={18} /></a>
            </div>
          </div>
          <div className="prod__visual">
            <div className="eyebrow" style={{ color: "var(--zg-text-dim)", marginBottom: 14 }}><span className="live-dot" />In your wallet</div>
            <div className="ocard__q" style={{ minHeight: 0, marginBottom: 16 }}>{SC.markets[0].q}</div>
            <div className="pbar" style={{ height: 10 }}><i className="yes" style={{ width: SC.markets[0].yes + "%" }} /><i className="no" style={{ width: (100 - SC.markets[0].yes) + "%" }} /></div>
            <div className="ocard__legend" style={{ marginTop: 10 }}><span className="y">Buy Yes {window.PP.buyYes(SC.markets[0])}¢</span><span className="n">Buy No {window.PP.buyNo(SC.markets[0])}¢</span></div>
            <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
              <a className="yn yn--yes" href={window.ZNAV.signup} target="_blank" rel="noopener" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--zg-font-num)", fontWeight: 700, fontSize: 14, border: 0, borderRadius: 10, padding: 13, background: "rgba(0,206,203,.16)", color: "var(--zg-yes)", cursor: "pointer" }}>Buy Yes · {window.PP.buyYes(SC.markets[0])}¢</a>
              <a className="yn yn--no" href={window.ZNAV.signup} target="_blank" rel="noopener" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--zg-font-num)", fontWeight: 700, fontSize: 14, border: 0, borderRadius: 10, padding: 13, background: "rgba(255,94,91,.16)", color: "var(--zg-no)", cursor: "pointer" }}>Buy No · {window.PP.buyNo(SC.markets[0])}¢</a>
            </div>
            <div className="ocard__meta" style={{ marginTop: 16 }}><span>Settles in USDC</span><span>{SC.markets[0].vol} traded</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="sec sec--dark band band--center" id="faq" data-screen-label="FAQ (M13)">
      <div className="wrap">
        <div className="band__head">
          <div className="eyebrow" style={{ justifyContent: "center" }}><span className="dot" />Questions</div>
          <h2>SOL price prediction — FAQ</h2>
        </div>
        <div className="faqlist">
          {SC.faq.map((f, i) => (
            <details className="faq" key={i} open={i === 0}>
              <summary className="faq__q"><span>{f.q}</span><span className="faq__ic"><IcPlus /></span></summary>
              <div className="faq__a">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function RelatedCoins() {
  return (
    <section className="sec sec--cream band" id="related" data-screen-label="Related coins (M14)">
      <div className="wrap">
        <div className="band__head">
          <div className="eyebrow"><span className="dot" />More predictions</div>
          <h2>Explore other coin forecasts</h2>
          <p>The same template, with unique analysis and live markets per coin.</p>
        </div>
        <div className="coins">
          {SC.related.map((c, i) => (
            <a className="coinpill" key={i} href={c.url || "#"}>
              <span className="dot" style={{ background: c.color }}>{c.sym}</span>
              <span className="nm">{c.name}<small>{c.sym} prediction</small></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Disclaimer() {
  return (
    <div className="disclaim">
      <div className="disclaim__inner">
        <span className="disclaim__ic"><IcInfo size={20} /></span>
        <p>
          <b>Not financial advice.</b> The forecasts, probabilities and data on this page are for general information only and do not
          constitute financial, investment or trading advice, or any recommendation. Cryptocurrency prices are highly volatile and you
          may lose your capital. Past performance is not a reliable indicator of future results. Algorithmic forecasts are estimates;
          market-implied probabilities reflect live trading activity (<b>data: Polymarket</b>) and change constantly. Zengo is a
          self-custodial wallet; prediction markets are powered by Polymarket and settle in USDC. <b>Zengo is an eToro company.</b>{" "}
          Always do your own research and consider independent professional advice before making any financial decision.
          Market &amp; price data: CoinGecko, Polymarket, alternative.me (Fear &amp; Greed).
        </p>
      </div>
    </div>
  );
}

function SocialIcon({ name }) {
  const p = {
    LinkedIn: <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM10 9.5h3.8v1.6h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.76V21h-4v-5.3c0-1.26-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V21h-4z" />,
    X: <path d="M17.2 3h2.9l-6.3 7.2L21.5 21h-5.6l-4.4-5.7L6.5 21H3.6l6.8-7.7L3 3h5.7l4 5.3zM16.1 19.3h1.6L7.9 4.6H6.2z" />,
    Reddit: <path d="M22 12.1a2.1 2.1 0 0 0-3.5-1.5 10.3 10.3 0 0 0-5.2-1.6l.9-4 2.8.6a1.5 1.5 0 1 0 .2-1.4l-3.4-.7-1.2 5.5a10.4 10.4 0 0 0-5.4 1.6 2.1 2.1 0 1 0-2.3 3.4 4 4 0 0 0 0 .6c0 2.9 3.4 5.3 7.6 5.3s7.6-2.4 7.6-5.3a4 4 0 0 0 0-.6 2.1 2.1 0 0 0 1.6-2zM8 13.5a1.3 1.3 0 1 1 2.6 0 1.3 1.3 0 0 1-2.6 0zm7.3 3.3a4.8 4.8 0 0 1-3.3 1 4.8 4.8 0 0 1-3.3-1 .5.5 0 0 1 .7-.7c.6.5 1.6.8 2.6.8s2-.3 2.6-.8a.5.5 0 0 1 .7.7zm-.2-2a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6z" />,
    GitHub: <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />,
    Medium: <path d="M2.8 6.9c0-.2 0-.4-.2-.6L1.2 4.5V4.3h4.4l3.4 7.5 3-7.5h4.2v.2l-1.2 1.2c-.1.1-.2.2-.2.4v9c0 .2.1.3.2.4l1.2 1.1v.2h-5.8v-.2l1.2-1.2c.1-.1.1-.2.1-.4V8.1l-3.4 8.6h-.5L4.2 8.1v5.8c0 .3.1.5.3.7l1.6 1.9v.2H1.6v-.2l1.6-1.9c.2-.2.3-.4.2-.7z" />,
    Discord: <path d="M19.3 5.4A17 17 0 0 0 15.1 4l-.2.4a16 16 0 0 1 3.7 1.2 15.6 15.6 0 0 0-13.2 0A16 16 0 0 1 9.1 4.4L8.9 4a17 17 0 0 0-4.2 1.4C2 9.3 1.3 13.1 1.6 16.9a17 17 0 0 0 5.2 2.6l.4-.6a11 11 0 0 1-1.8-.9l.4-.3a12 12 0 0 0 10.4 0l.4.3a11 11 0 0 1-1.8.9l.4.6a17 17 0 0 0 5.2-2.6c.4-4.4-.7-8.2-3.5-11.5zM8.5 14.6c-1 0-1.9-.9-1.9-2.1s.8-2.1 1.9-2.1 1.9 1 1.9 2.1-.8 2.1-1.9 2.1zm7 0c-1 0-1.9-.9-1.9-2.1s.8-2.1 1.9-2.1 1.9 1 1.9 2.1-.8 2.1-1.9 2.1z" />,
    YouTube: <path d="M23 7.5a3 3 0 0 0-2.1-2.1C19 4.9 12 4.9 12 4.9s-7 0-8.9.5A3 3 0 0 0 1 7.5 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.5a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23.5 12 31 31 0 0 0 23 7.5zM9.8 15.3V8.7l5.7 3.3z" />,
  }[name];
  return <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">{p}</svg>;
}

function Footer() {
  const Z = window.ZNAV;
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <div className="footer__brand">
            <a href={Z.home} aria-label="Zengo home">
              <img src={(window.__resources && window.__resources.footerLogo) || "assets/logo/zengo-lockup-white.svg"} alt="Zengo, an eToro company" style={{ height: 36, display: "block" }} />
            </a>
            <p>The self-custodial wallet two million people trust — now a window onto the world's deepest prediction markets.</p>
            <span className="footer__iso">ISO 27001 · Information Security Certified</span>
            <div className="footer__social">
              {Z.social.map(([name, href]) => (
                <a key={name} href={href} target="_blank" rel="noopener" aria-label={name}><SocialIcon name={name} /></a>
              ))}
            </div>
          </div>
          <div className="footer__cols">
            {Z.menus.map(m => (
              <div className="footer__col" key={m.label}>
                <h4>{m.label}</h4>
                <ul>{m.items.map(([t, h]) => <li key={t}><a href={h} target="_blank" rel="noopener">{t}</a></li>)}</ul>
              </div>
            ))}
          </div>
        </div>
        <div className="footer__legal">
          <span>© 2026 Zengo Ltd. All rights reserved.</span>
          <span className="footer__legal-links">{Z.legal.map(([t, h]) => <a key={t} href={h} target="_blank" rel="noopener">{t}</a>)}</span>
        </div>
      </div>
    </footer>
  );
}

/* sticky rail */
function Rail() {
  return (
    <aside className="rail">
      <div className="rail-card rail-card--dark">
        <div className="rl-top"><span className="rl-eyebrow"><span className="live-dot" style={{ display: "inline-block", marginRight: 6 }} />Live · SOL</span></div>
        <div className="rl-price num">${SC.price.toFixed(2)}</div>
        <div className={"rl-chg num " + (SC.chg24h >= 0 ? "pos" : "neg")}>{SC.chg24h >= 0 ? "+" : ""}{SC.chg24h}% · 24h</div>
        <div style={{ marginTop: 14 }}>
          <div className="rl-eyebrow" style={{ marginBottom: 4 }}>MARKET IS PRICING</div>
          {SC.markets.slice(0, 2).map((m, i) => (
            <div className="rl-mini" key={i}><span className="q">{m.q}</span><span className="p num">{m.yes}%</span></div>
          ))}
        </div>
        <a className="btn btn--block" href={window.ZNAV.signup} target="_blank" rel="noopener" style={{ marginTop: 14, fontSize: 15 }}>Trade in Zengo</a>
      </div>
      <div className="rail-card">
        <div className="rl-eyebrow" style={{ marginBottom: 10 }}>ON THIS PAGE</div>
        <nav className="rl-jump">
          <a href="#odds">Market odds <IcArrow size={16} /></a>
          <a href="#chart">Price chart <IcArrow size={16} /></a>
          <a href="#forecast">2026-2030 forecast <IcArrow size={16} /></a>
          <a href="#calc">Scenario calculator <IcArrow size={16} /></a>
          <a href="#tech">Technicals <IcArrow size={16} /></a>
          <a href="#faq">FAQ <IcArrow size={16} /></a>
        </nav>
      </div>
    </aside>
  );
}

function MobileCta() {
  return (
    <div className="mcta">
      <div className="mc-price">${SC.price.toFixed(2)}<small className={SC.chg24h >= 0 ? "pos" : "neg"}>{SC.chg24h >= 0 ? "+" : ""}{SC.chg24h}% 24h</small></div>
      <a className="btn" href={window.ZNAV.signup} target="_blank" rel="noopener">Trade SOL in Zengo</a>
    </div>
  );
}

Object.assign(window, { Drivers, Explainer, ProductCta, Faq, RelatedCoins, Disclaimer, Footer, Rail, MobileCta });
