/* app.jsx — page composition. */
function App() {
  const [, setTick] = React.useState(0);
  React.useEffect(() => {
    if (typeof window.loadLive !== "function") return;
    let cancelled = false;
    const rerender = () => { if (!cancelled) setTick(t => t + 1); };
    const refresh = () => window.loadLive().then(rerender).catch(rerender);
    refresh();
    // keep odds/price current while the page stays open
    const id = setInterval(refresh, 60000);
    const onVis = () => { if (!document.hidden) refresh(); };
    document.addEventListener("visibilitychange", onVis);
    return () => { cancelled = true; clearInterval(id); document.removeEventListener("visibilitychange", onVis); };
  }, []);
  return (
    <div>
      <Nav />
      <Hero />
      <main className="body">
        <div className="wrap">
          <div className="layout">
            <div className="col-main">
              <Glance />
              <OddsModule />
              <ChartSection />
              <ShortTerm />
              <YearTables />
              <Calculator />
              <Technicals />
              <Sentiment />
            </div>
            <Rail />
          </div>
        </div>
      </main>
      <Drivers />
      <Explainer />
      <ProductCta />
      <Faq />
      <RelatedCoins />
      <Disclaimer />
      <Footer />
      <MobileCta />
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
