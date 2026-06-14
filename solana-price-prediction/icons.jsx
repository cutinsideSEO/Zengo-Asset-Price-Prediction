/* icons.jsx — inline SVG glyphs + brand marks for the prediction page. */
function Solana({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 397 311" fill="none" style={{ display: "block" }}>
      <path d="M64 237c2.4-2.4 5.7-3.8 9.2-3.8h315c5.8 0 8.7 7 4.6 11.1l-62 62c-2.4 2.4-5.7 3.8-9.2 3.8H6.6c-5.8 0-8.7-7-4.6-11.1l62-62z" fill="#fff"/>
      <path d="M64 6.8C66.5 4.4 69.8 3 73.2 3h315c5.8 0 8.7 7 4.6 11.1l-62 62c-2.4 2.4-5.7 3.8-9.2 3.8H6.6c-5.8 0-8.7-7-4.6-11.1l62-62z" fill="#fff"/>
      <path d="M333 121c-2.4-2.4-5.7-3.8-9.2-3.8H8.8c-5.8 0-8.7 7-4.6 11.1l62 62c2.4 2.4 5.7 3.8 9.2 3.8h315c5.8 0 8.7-7 4.6-11.1l-62-62z" fill="#fff"/>
    </svg>
  );
}
function IcChevron({ size = 18, dir = "down", style }) {
  const r = { down: 0, up: 180, right: -90, left: 90 }[dir] || 0;
  return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block", flex: "none", transform: `rotate(${r}deg)`, ...style }}><path d="M5 9l7 7 7-7" /></svg>;
}
function IcArrow({ size = 20, style }) {
  return <svg viewBox="0 0 26 13" width={size} height={size * 0.5} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block", flex: "none", ...style }}><path d="M0 6.5h24M18.5 1L24 6.5 18.5 12" /></svg>;
}
function IcPlus({ size = 22, style }) {
  return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ display: "block", flex: "none", ...style }}><path d="M5 12h14M12 5v14" /></svg>;
}
function IcUp({ size = 13, style }) {
  return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block", flex: "none", ...style }}><path d="M6 14l6-6 6 6" /></svg>;
}
function IcDown({ size = 13, style }) {
  return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block", flex: "none", ...style }}><path d="M6 10l6 6 6-6" /></svg>;
}
function IcClock({ size = 14, style }) {
  return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block", flex: "none", ...style }}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
}
function IcInfo({ size = 16, style }) {
  return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block", flex: "none", ...style }}><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></svg>;
}
function IcShield({ size = 22, style }) {
  return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block", flex: "none", ...style }}><path d="M12 3l8 3v6c0 5-3.4 7.8-8 9-4.6-1.2-8-4-8-9V6z" /><path d="M9 12l2 2 4-4" /></svg>;
}
function IcKey({ size = 22, style }) {
  return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block", flex: "none", ...style }}><circle cx="8" cy="15" r="4" /><path d="M10.8 12.2L20 3M17 6l2 2M14 9l2 2" /></svg>;
}
function IcUsdc({ size = 22, style }) {
  return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block", flex: "none", ...style }}><circle cx="12" cy="12" r="9" /><path d="M12 7v10M14.5 9.2c-.6-.7-1.5-1-2.5-1-1.4 0-2.5.7-2.5 1.9 0 2.6 5 1.3 5 3.9 0 1.2-1.1 2-2.5 2-1 0-1.9-.3-2.5-1" /></svg>;
}
function IcNoKyc({ size = 22, style }) {
  return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block", flex: "none", ...style }}><circle cx="12" cy="8" r="4" /><path d="M4 20c0-3.3 3.6-6 8-6 1.4 0 2.7.3 3.8.7M16 16l5 5M21 16l-5 5" /></svg>;
}
function IcBurger({ size = 24, style }) {
  return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ display: "block", ...style }}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
}
function IcCheck({ size = 16, style }) {
  return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block", flex: "none", ...style }}><path d="M5 12l5 5L20 6" /></svg>;
}
function ZMark({ size = 26, color = "var(--zg-orange)", style }) {
  return (
    <svg viewBox="0 0 27.996 24.037" width={size} height={size} fill={color} style={{ display: "block", flex: "none", ...style }}>
      <path fillRule="evenodd" d="M 26.143 8.993 C 24.938 10.534 23.789 12.018 23.789 12.018 L 19.839 12.018 C 19.839 12.018 23.481 7.424 24.042 6.64 C 25.022 5.239 23.986 2.998 21.408 2.998 L 11.267 2.998 L 13.62 0 L 22.305 0 C 23.425 0 25.778 0 27.403 2.773 C 28.916 5.295 27.179 7.676 26.143 8.993 Z M 21.436 15.016 L 13.592 15.016 L 19.475 7.508 C 19.895 6.976 19.391 5.995 18.691 5.995 L 8.914 5.995 L 6.56 8.993 L 14.376 8.993 L 8.493 16.529 C 8.017 17.145 8.381 18.042 9.25 18.042 L 19.083 18.042 L 21.436 15.016 Z M 4.207 12.018 C 4.207 12.018 3.058 13.503 1.854 15.044 C 0.817 16.361 -0.92 18.742 0.593 21.263 C 2.218 24.037 4.571 24.037 5.692 24.037 L 14.376 24.037 L 16.73 21.011 L 6.588 21.011 C 3.983 21.011 2.974 18.77 3.955 17.369 C 4.515 16.585 8.157 11.99 8.157 11.99 L 4.207 11.99 L 4.207 12.018 Z" />
    </svg>
  );
}
Object.assign(window, { Solana, IcChevron, IcArrow, IcPlus, IcUp, IcDown, IcClock, IcInfo, IcShield, IcKey, IcUsdc, IcNoKyc, IcBurger, IcCheck, ZMark });
