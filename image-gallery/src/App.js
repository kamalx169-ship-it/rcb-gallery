import React, { useState, useEffect, useRef } from "react";
import Gallery from "./components/Gallery";
import "./style.css";

const NAV_LINKS = ["Home", "Squad", "Schedule", "Gallery", "News", "Fan Zone"];

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const heroRef = useRef(null);
  const tickerItems = [
    "E E SALA CUP NAMDE", "PLAY BOLD", "IPL 2026", "RED ARMY",
    "CHINNASWAMY", "ROYAL CHALLENGERS", "E E SALA CUP NAMDE", "PLAY BOLD",
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="app">
      {/* ── NOISE OVERLAY ── */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* ── NAVBAR ── */}
      <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
        <div className="navbar__inner">
          <div className="navbar__brand">
            <div className="brand-logo">
              <span>RCB</span>
              <div className="brand-logo__ring" />
            </div>
            <div className="brand-text">
              <strong>Royal Challengers</strong>
              <span>Bangalore · IPL 2026</span>
            </div>
          </div>

          <ul className={`navbar__links ${menuOpen ? "open" : ""}`}>
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <button className={`nav-link ${link === "Gallery" ? "active" : ""}`}>
                  {link}
                </button>
              </li>
            ))}
          </ul>

          <div className="navbar__actions">
            <div className="live-badge">
              <span className="live-dot" />
              LIVE
            </div>
            <button className="btn-tickets">
              <span>Get Tickets</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              className={`hamburger ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* ── TICKER ── */}
      <div className="ticker-wrap" aria-hidden="true">
        <div className="ticker-track">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="ticker-item">
              {item}
              <span className="ticker-sep">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── HERO ── */}
      <header className="hero" ref={heroRef}>
        {/* Dynamic mesh gradient that follows mouse */}
        <div
          className="hero__mesh"
          style={{
            background: `radial-gradient(ellipse 80% 60% at ${mousePos.x}% ${mousePos.y}%, rgba(204,0,0,0.22) 0%, transparent 60%),
                         radial-gradient(ellipse 60% 80% at ${100 - mousePos.x}% ${100 - mousePos.y}%, rgba(255,215,0,0.08) 0%, transparent 55%),
                         radial-gradient(ellipse 100% 100% at 50% 50%, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.7) 100%)`,
          }}
        />

        <div className="hero__bg-img" />
        <div className="hero__scanlines" aria-hidden="true" />

        {/* Floating geometric shapes */}
        <div className="hero__geo geo--1" aria-hidden="true" />
        <div className="hero__geo geo--2" aria-hidden="true" />
        <div className="hero__geo geo--3" aria-hidden="true" />

        <div className="hero__content">
          {/* Season label */}
          <div className="hero__season">
            <span className="season-num">19</span>
            <div className="season-text">
              <span>SEASON</span>
              <span>IPL 2026</span>
            </div>
            <div className="season-divider" />
            <span className="season-tag">EST. 2008</span>
          </div>

          {/* Main heading — split layout */}
          <div className="hero__heading-wrap">
            <h1 className="hero__heading">
              <span className="h-line h-line--1">
                <span className="h-word">PLAY</span>
              </span>
              <span className="h-line h-line--2">
                <span className="h-word h-word--outline">BOLD</span>
                <span className="h-accent">.</span>
              </span>
              <span className="h-line h-line--3">
                <span className="h-word h-word--small">WIN TOGETHER</span>
              </span>
            </h1>

            {/* Side stat block */}
            <div className="hero__side-stats">
              {[
                { n: "16", l: "Years" },
                { n: "40K", l: "Fans" },
                { n: "∞", l: "Passion" },
              ].map((s) => (
                <div key={s.l} className="side-stat">
                  <span className="side-stat__n">{s.n}</span>
                  <span className="side-stat__l">{s.l}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="hero__tagline">ಇ ಇ ಸಾಲ ಕಪ್ ನಮ್ದೆ · E E Sala Cup Namde</p>

          <div className="hero__bottom">
            <p className="hero__sub">
              Every frame. Every over. Every roar.<br />
              The official gallery of Royal Challengers Bangalore.
            </p>
            <div className="hero__ctas">
              <button
                className="btn-primary"
                onClick={() => document.getElementById("gallery").scrollIntoView({ behavior: "smooth" })}
              >
                <span className="btn-primary__inner">
                  <span>Explore Gallery</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="btn-primary__bg" />
              </button>
              <button className="btn-ghost">
                Watch Highlights
              </button>
            </div>
          </div>
        </div>

        {/* Hero right — vertical text */}
        <div className="hero__vertical-text" aria-hidden="true">
          ROYAL · CHALLENGERS · BANGALORE · 2026
        </div>

        {/* Scroll indicator */}
        <div className="hero__scroll">
          <div className="scroll-track">
            <div className="scroll-thumb" />
          </div>
          <span>SCROLL</span>
        </div>
      </header>

      {/* ── GALLERY ── */}
      <main className="main" id="gallery">
        <div className="section-header">
          <div className="section-header__label">
            <span className="label-line" />
            <span>Photo Archive</span>
            <span className="label-count">12</span>
          </div>
          <h2 className="section-title">
            <span>Moments</span>
            <em>That Define Us</em>
          </h2>
          <p className="section-desc">
            From the training ground to the roar of Chinnaswamy — every photograph
            captures the relentless spirit of the Red Army.
          </p>
        </div>

        <Gallery />
      </main>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="brand-logo brand-logo--xl">
              <span>RCB</span>
              <div className="brand-logo__ring" />
            </div>
            <div>
              <p className="footer__name">Royal Challengers Bangalore</p>
              <p className="footer__est">Est. 2008 · Indian Premier League</p>
            </div>
          </div>
          <div className="footer__tagline-block">
            <span>E E SALA</span>
            <span className="footer__cup">CUP NAMDE 🏆</span>
          </div>
        </div>

        <div className="footer__mid">
          <nav className="footer__nav">
            {["Squad", "Schedule", "Gallery", "News", "Fan Zone", "Shop", "About"].map((l) => (
              <button key={l} className="footer-link">{l}</button>
            ))}
          </nav>
          <div className="footer__social">
            {[
              { l: "TW", name: "Twitter" },
              { l: "IG", name: "Instagram" },
              { l: "FB", name: "Facebook" },
              { l: "YT", name: "YouTube" },
            ].map((s) => (
              <button key={s.name} className="social-btn" aria-label={s.name}>
                {s.l}
              </button>
            ))}
          </div>
        </div>

        <div className="footer__bottom">
          <span>© 2026 Royal Challengers Bangalore. All Rights Reserved.</span>
          <span>Built with React JS</span>
        </div>
      </footer>
    </div>
  );
};

export default App;