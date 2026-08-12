import React, { useEffect, useState } from "react";

/* ---------------------------------------------------------------
   POOJA CITY — Commercial Plotted Development, Torwa, Bilaspur
   Design tokens
   Ink        #16262A   deep slate — authority / survey-ink
   Ink-2      #1E3A3F   panel dark
   Terracotta #B0552F   Chhattisgarh soil / brick
   Gold       #C79A3D   seal / certificate accent
   Parchment  #F1EAD9   document paper
   Sage       #7C9885   land / plantation
   Line       #D9CFB8   hairline on parchment
   Text-dark  #221D17
---------------------------------------------------------------- */

const KHASRAS = ["1368/1", "1368/3", "1369/1", "1369/3", "1371/2"];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-in");
        });
      },
      { threshold: 0.16 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function PlotGrid() {
  // Signature element: a stylised cadastral plan of the five khasra
  // parcels that make up the project, with the 30m road-setback line
  // called out — literally "plotted development".
  return (
    <svg viewBox="0 0 640 460" className="plot-grid" aria-hidden="true">
      <defs>
        <pattern id="hatch" width="7" height="7" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="7" stroke="rgba(199,154,61,0.35)" strokeWidth="1" />
        </pattern>
      </defs>

      {/* road */}
      <rect x="0" y="0" width="640" height="70" fill="rgba(241,234,217,0.06)" />
      <line x1="0" y1="35" x2="640" y2="35" stroke="#C79A3D" strokeWidth="1.4" strokeDasharray="10 8" />
      <text x="16" y="22" className="svg-label">NEHRU CHOWK — DARDIGHAT MARG · 60.00 M ROW</text>

      {/* setback line */}
      <line x1="0" y1="105" x2="640" y2="105" stroke="#7C9885" strokeWidth="1.2" strokeDasharray="3 5" />
      <text x="16" y="98" className="svg-label svg-label--sage">30.00 M SETBACK FROM ROAD MID-LINE</text>

      {/* five parcels */}
      {[
        { x: 30, y: 130, w: 220, h: 140, id: "1368/1" },
        { x: 270, y: 130, w: 150, h: 140, id: "1368/3" },
        { x: 440, y: 130, w: 170, h: 90, id: "1369/1" },
        { x: 30, y: 290, w: 260, h: 130, id: "1369/3" },
        { x: 310, y: 250, w: 300, h: 170, id: "1371/2" },
      ].map((p, i) => (
        <g key={p.id} className="parcel" style={{ animationDelay: `${i * 120}ms` }}>
          <rect x={p.x} y={p.y} width={p.w} height={p.h} fill="url(#hatch)" stroke="#C79A3D" strokeWidth="1.2" />
          <text x={p.x + p.w / 2} y={p.y + p.h / 2 - 4} textAnchor="middle" className="svg-parcel-id">
            KH. {p.id}
          </text>
          <text x={p.x + p.w / 2} y={p.y + p.h / 2 + 14} textAnchor="middle" className="svg-parcel-sub">
            VILLAGE TORVA
          </text>
        </g>
      ))}

      <text x="16" y="446" className="svg-label">TOTAL AREA 0.4930 HA · COMMERCIAL PLOTTING 0.324989 HA</text>
    </svg>
  );
}

function Stat({ value, label }) {
  return (
    <div className="stat reveal">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function DocCard({ tag, title, desc, meta, href }) {
  return (
    <a className="doc-card reveal" href={href} download>
      <div className="doc-card-top">
        <div className="doc-tag">{tag}</div>
        <span className="doc-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
            <path d="M12 3v12m0 0l-4.5-4.5M12 15l4.5-4.5M4 19h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      <h3>{title}</h3>
      <p>{desc}</p>
      <div className="doc-meta">
        <span>{meta}</span>
        <span className="doc-cta">Download PDF →</span>
      </div>
    </a>
  );
}

function PromoterCard({ initials, name, father, address, role }) {
  return (
    <div className="promoter-card reveal">
      <div className="avatar">{initials}</div>
      <h3>{name}</h3>
      <p className="promoter-role">{role}</p>
      <dl>
        <dt>Father&rsquo;s name</dt>
        <dd>{father}</dd>
        <dt>Address</dt>
        <dd>{address}</dd>
      </dl>
    </div>
  );
}

export default function PoojaCity() {
  useReveal();
  const [navSolid, setNavSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="pc-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,500;9..144,600;9..144,700&family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .pc-root {
          --ink:#16262A; --ink2:#1E3A3F; --terracotta:#B0552F; --gold:#C79A3D;
          --parchment:#F1EAD9; --sage:#7C9885; --line:#D9CFB8; --text:#221D17;
          font-family:'Space Grotesk', sans-serif;
          background:var(--parchment);
          color:var(--text);
          width:100%;
          overflow-x:hidden;
        }
        .pc-root * { box-sizing:border-box; }
        .mono { font-family:'IBM Plex Mono', monospace; letter-spacing:0.03em; }
        .display { font-family:'Fraunces', serif; }

        /* ---------- nav ---------- */
        .nav {
          position:fixed; top:0; left:0; right:0; z-index:50;
          display:flex; align-items:center; justify-content:space-between;
          padding:18px 6vw; transition:background .3s ease, padding .3s ease, box-shadow .3s ease;
          background:transparent;
        }
        .nav.solid { background:rgba(22,38,42,0.95); padding:12px 6vw; box-shadow:0 6px 24px rgba(0,0,0,0.25); backdrop-filter:blur(6px); }
        .nav-mark { display:flex; align-items:center; gap:10px; color:var(--parchment); font-family:'Fraunces',serif; font-weight:600; font-size:1.15rem; }
        .nav-mark .dot { width:9px; height:9px; background:var(--gold); border-radius:1px; transform:rotate(45deg); flex:none; }
        .nav-links { display:flex; gap:28px; }
        .nav-links a { color:rgba(241,234,217,0.75); text-decoration:none; font-size:0.82rem; letter-spacing:0.08em; text-transform:uppercase; transition:color .2s; }
        .nav-links a:hover { color:var(--gold); }
        .nav-cta { border:1px solid var(--gold); color:var(--gold); padding:8px 16px; font-size:0.78rem; letter-spacing:0.08em; text-transform:uppercase; text-decoration:none; transition:all .2s; }
        .nav-cta:hover { background:var(--gold); color:var(--ink); }
        .nav-burger { display:none; width:30px; height:20px; position:relative; background:none; border:none; padding:0; cursor:pointer; flex:none; }
        .nav-burger span { position:absolute; left:0; right:0; height:1.6px; background:var(--parchment); transition:transform .25s ease, opacity .25s ease, top .25s ease; }
        .nav-burger span:first-child { top:2px; }
        .nav-burger span:last-child { top:16px; }
        .nav-burger.is-open span:first-child { top:9px; transform:rotate(45deg); }
        .nav-burger.is-open span:last-child { top:9px; transform:rotate(-45deg); }

        .mobile-menu {
          position:fixed; inset:0; z-index:49; background:var(--ink);
          display:flex; flex-direction:column; align-items:flex-start; justify-content:center;
          gap:6px; padding:0 8vw;
          opacity:0; pointer-events:none; transform:translateY(-8px);
          transition:opacity .28s ease, transform .28s ease;
        }
        .mobile-menu.is-open { opacity:1; pointer-events:auto; transform:translateY(0); }
        .mobile-menu a {
          font-family:'Fraunces',serif; font-size:2rem; color:var(--parchment); text-decoration:none;
          padding:12px 0; border-bottom:1px solid rgba(241,234,217,0.12); width:100%;
        }
        .mobile-menu-rera { margin-top:24px; color:var(--gold); font-size:0.8rem; letter-spacing:0.04em; }

        @media (max-width:760px){
          .nav-links{ display:none; }
          .nav-cta{ display:none; }
          .nav-burger{ display:block; }
        }

        /* ---------- hero ---------- */
        .hero {
          position:relative; min-height:100vh; background:var(--ink);
          display:flex; flex-direction:column; justify-content:center;
          padding:120px 6vw 80px; overflow:hidden;
          background-image:
            linear-gradient(180deg, rgba(22,38,42,0.35), rgba(22,38,42,0.92)),
            repeating-linear-gradient(0deg, rgba(199,154,61,0.05) 0 1px, transparent 1px 64px),
            repeating-linear-gradient(90deg, rgba(199,154,61,0.05) 0 1px, transparent 1px 64px);
        }
        .hero-inner { position:relative; z-index:2; max-width:760px; }
        .eyebrow {
          display:inline-flex; align-items:center; gap:10px;
          color:var(--gold); font-size:0.75rem; letter-spacing:0.18em; text-transform:uppercase;
          border:1px solid rgba(199,154,61,0.5); padding:7px 14px; margin-bottom:28px;
        }
        .eyebrow::before { content:''; width:6px; height:6px; background:var(--gold); border-radius:50%; }
        .hero h1 {
          font-family:'Fraunces', serif; font-weight:600; font-optical-sizing:auto;
          font-size:clamp(3rem, 8vw, 6.4rem); line-height:0.96; color:var(--parchment); margin:0 0 22px;
          letter-spacing:-0.01em;
        }
        .hero h1 em { font-style:italic; color:var(--terracotta); font-weight:500; }
        .hero p.lede { color:rgba(241,234,217,0.72); font-size:1.15rem; max-width:520px; line-height:1.6; margin:0 0 40px; }
        .hero-actions { display:flex; gap:16px; flex-wrap:wrap; margin-bottom:56px; }
        .btn {
          font-family:'Space Grotesk',sans-serif; font-weight:600; font-size:0.9rem;
          padding:15px 28px; text-decoration:none; letter-spacing:0.02em; cursor:pointer;
          border:1px solid transparent; transition:all .22s ease; display:inline-flex; align-items:center; gap:10px;
        }
        .btn-primary { background:var(--terracotta); color:var(--parchment); }
        .btn-primary:hover { background:#c66539; transform:translateY(-2px); }
        .btn-ghost { border-color:rgba(241,234,217,0.35); color:var(--parchment); }
        .btn-ghost:hover { border-color:var(--gold); color:var(--gold); }

        .hero-rera { display:flex; gap:36px; flex-wrap:wrap; border-top:1px solid rgba(241,234,217,0.18); padding-top:24px; }
        .hero-rera div span { display:block; }
        .hero-rera .k { color:rgba(241,234,217,0.5); font-size:0.68rem; letter-spacing:0.14em; text-transform:uppercase; margin-bottom:6px; }
        .hero-rera .v { color:var(--gold); font-size:0.95rem; }

        @media (max-width:640px){
          .hero{ min-height:auto; padding:96px 6vw 56px; }
          .eyebrow{ font-size:0.65rem; padding:6px 10px; margin-bottom:20px; }
          .hero h1{ font-size:2.5rem; line-height:1.04; margin-bottom:16px; }
          .hero p.lede{ font-size:1rem; margin-bottom:28px; }
          .hero-actions{ margin-bottom:36px; }
          .btn{ padding:13px 22px; font-size:0.85rem; width:100%; justify-content:center; }
          .hero-rera{ gap:20px 28px; }
        }

        .plot-grid { position:absolute; right:-4%; top:50%; transform:translateY(-50%); width:56%; max-width:640px; opacity:0.9; z-index:1; }
        @media (max-width:980px){ .plot-grid{ display:none; } }
        .parcel { opacity:0; animation:fadeIn .8s ease forwards; }
        @keyframes fadeIn { to { opacity:1; } }
        .svg-label { fill:rgba(241,234,217,0.55); font-family:'IBM Plex Mono',monospace; font-size:9.5px; letter-spacing:0.08em; }
        .svg-label--sage { fill:#93b39c; }
        .svg-parcel-id { fill:var(--gold); font-family:'IBM Plex Mono',monospace; font-size:12px; letter-spacing:0.05em; }
        .svg-parcel-sub { fill:rgba(241,234,217,0.4); font-family:'IBM Plex Mono',monospace; font-size:8px; letter-spacing:0.12em; }

        /* ---------- reveal ---------- */
        .reveal { opacity:0; transform:translateY(22px); transition:opacity .7s ease, transform .7s ease; }
        .reveal.is-in { opacity:1; transform:translateY(0); }

        /* ---------- section shell ---------- */
        section.block { padding:110px 6vw; position:relative; }
        .kicker { font-family:'IBM Plex Mono',monospace; font-size:0.75rem; letter-spacing:0.16em; text-transform:uppercase; color:var(--terracotta); margin-bottom:14px; display:block; }
        h2.h-title { font-family:'Fraunces',serif; font-weight:600; font-size:clamp(2rem,4vw,3rem); margin:0 0 20px; letter-spacing:-0.01em; }
        .lead-text { font-size:1.05rem; line-height:1.75; color:#463c31; max-width:640px; }

        /* ---------- stats strip ---------- */
        .stats-strip { background:var(--ink2); padding:56px 6vw; display:flex; flex-wrap:wrap; gap:0; }
        .stat { flex:1 1 200px; padding:0 32px; border-left:1px solid rgba(241,234,217,0.15); }
        .stat:first-child { border-left:none; padding-left:0; }
        .stat-value { font-family:'Fraunces',serif; font-weight:600; font-size:2.6rem; color:var(--gold); line-height:1; }
        .stat-label { color:rgba(241,234,217,0.6); font-size:0.78rem; letter-spacing:0.06em; text-transform:uppercase; margin-top:10px; }
        @media (max-width:760px){ .stat{ border-left:none; border-top:1px solid rgba(241,234,217,0.15); padding:20px 0 0; margin-top:20px; } }

        /* ---------- about / grid diagram section ---------- */
        .about-wrap { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }
        @media (max-width:900px){ .about-wrap{ grid-template-columns:1fr; } }
        .about-diagram { background:var(--ink); padding:20px; position:relative; }
        .about-diagram .plot-grid { position:static; transform:none; width:100%; opacity:1; }
        .khasra-chips { display:flex; flex-wrap:wrap; gap:8px; margin-top:24px; }
        .khasra-chips span { font-family:'IBM Plex Mono',monospace; font-size:0.75rem; border:1px solid var(--line); padding:6px 10px; color:var(--terracotta); }

        /* ---------- location ---------- */
        .location-block { background:var(--parchment); border-top:1px solid var(--line); border-bottom:1px solid var(--line); }
        .loc-grid { display:grid; grid-template-columns:1.1fr 1fr; gap:60px; }
        @media (max-width:900px){ .loc-grid{ grid-template-columns:1fr; } }
        .loc-list { list-style:none; margin:32px 0 0; padding:0; display:flex; flex-direction:column; gap:22px; }
        .loc-list li { display:flex; gap:18px; padding-bottom:22px; border-bottom:1px solid var(--line); }
        .loc-list .li-label { font-family:'IBM Plex Mono',monospace; font-size:0.7rem; letter-spacing:0.1em; text-transform:uppercase; color:var(--sage); width:140px; flex:none; padding-top:2px; }
        .loc-list .li-value { font-size:1rem; line-height:1.5; }
        .map-card { background:var(--ink); color:var(--parchment); padding:40px; position:relative; overflow:hidden; }
        .map-card::after { content:''; position:absolute; inset:0; background-image:repeating-linear-gradient(0deg, rgba(199,154,61,0.06) 0 1px, transparent 1px 40px), repeating-linear-gradient(90deg, rgba(199,154,61,0.06) 0 1px, transparent 1px 40px); }
        .map-card .mc-inner { position:relative; z-index:1; }
        .map-card h3 { font-family:'Fraunces',serif; font-size:1.5rem; margin:0 0 12px; }
        .map-card .pin { display:inline-flex; align-items:center; gap:8px; color:var(--gold); font-family:'IBM Plex Mono',monospace; font-size:0.8rem; margin-top:20px; }

        /* ---------- approvals ---------- */
        .approval-grid { display:grid; grid-template-columns:1fr 1fr; gap:28px; margin-top:48px; }
        @media (max-width:840px){ .approval-grid{ grid-template-columns:1fr; } }
        .approval-card { background:#fff; border:1px solid var(--line); padding:36px; position:relative; }
        .approval-card .ac-seal { position:absolute; top:32px; right:32px; width:52px; height:52px; border:1.4px solid var(--gold); border-radius:50%; display:flex; align-items:center; justify-content:center; font-family:'IBM Plex Mono',monospace; font-size:0.6rem; color:var(--gold); text-align:center; line-height:1.1; }
        .approval-card h3 { font-family:'Fraunces',serif; font-size:1.4rem; margin:0 0 6px; padding-right:70px; }
        .approval-card .ac-sub { font-family:'IBM Plex Mono',monospace; font-size:0.72rem; color:var(--terracotta); letter-spacing:0.05em; margin-bottom:22px; display:block; }
        .approval-card ul { margin:0; padding-left:18px; display:flex; flex-direction:column; gap:10px; }
        .approval-card li { font-size:0.92rem; line-height:1.55; color:#463c31; }
        .approval-card .ac-foot { margin-top:24px; padding-top:18px; border-top:1px solid var(--line); font-family:'IBM Plex Mono',monospace; font-size:0.72rem; color:#6b6153; display:flex; justify-content:space-between; flex-wrap:wrap; gap:8px; }

        /* ---------- promoters ---------- */
        .promoter-block { background:var(--ink2); }
        .promoter-block .kicker { color:var(--gold); }
        .promoter-block h2.h-title, .promoter-block .lead-text { color:var(--parchment); }
        .promoter-block .lead-text { color:rgba(241,234,217,0.68); }
        .promoter-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:28px; margin-top:48px; }
        @media (max-width:760px){ .promoter-grid{ grid-template-columns:1fr; } }
        .promoter-card { background:rgba(241,234,217,0.04); border:1px solid rgba(241,234,217,0.14); padding:36px; }
        .avatar { width:56px; height:56px; border:1.4px solid var(--gold); color:var(--gold); font-family:'Fraunces',serif; font-size:1.2rem; display:flex; align-items:center; justify-content:center; margin-bottom:20px; }
        .promoter-card h3 { font-family:'Fraunces',serif; color:var(--parchment); font-size:1.3rem; margin:0 0 4px; }
        .promoter-role { color:var(--gold); font-size:0.78rem; letter-spacing:0.08em; text-transform:uppercase; margin:0 0 20px; }
        .promoter-card dl { margin:0; display:flex; flex-direction:column; gap:14px; }
        .promoter-card dt { font-family:'IBM Plex Mono',monospace; font-size:0.68rem; letter-spacing:0.1em; text-transform:uppercase; color:rgba(241,234,217,0.45); margin-bottom:4px; }
        .promoter-card dd { margin:0; color:rgba(241,234,217,0.85); font-size:0.92rem; line-height:1.5; }

        /* ---------- documents ---------- */
        .doc-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; margin-top:48px; }
        @media (max-width:900px){ .doc-grid{ grid-template-columns:1fr; } }
        .doc-card {
          display:block; border:1px solid var(--line); background:#fff; padding:30px;
          text-decoration:none; color:inherit; cursor:pointer;
          transition:border-color .2s, transform .2s, box-shadow .2s;
        }
        .doc-card, .doc-card:visited, .doc-card:active { color:inherit; text-decoration:none; }
        .doc-card:hover { border-color:var(--terracotta); transform:translateY(-4px); box-shadow:0 14px 30px rgba(22,38,42,0.1); }
        .doc-card-top { display:flex; align-items:center; justify-content:space-between; margin-bottom:16px; }
        .doc-icon {
          width:30px; height:30px; border:1px solid var(--line); border-radius:50%;
          display:flex; align-items:center; justify-content:center; color:var(--terracotta);
          transition:background .2s, color .2s, border-color .2s;
        }
        .doc-card:hover .doc-icon { background:var(--terracotta); color:#fff; border-color:var(--terracotta); }
        .doc-tag { font-family:'IBM Plex Mono',monospace; font-size:0.68rem; letter-spacing:0.1em; text-transform:uppercase; color:var(--terracotta); border:1px solid var(--terracotta); display:inline-block; padding:4px 10px; margin:0; }
        .doc-card h3 { font-family:'Fraunces',serif; font-size:1.2rem; margin:0 0 10px; color:var(--text); text-decoration:none; }
        .doc-card p { font-size:0.9rem; color:#584e40; line-height:1.55; margin:0 0 16px; text-decoration:none; }
        .doc-meta {
          font-family:'IBM Plex Mono',monospace; font-size:0.72rem; color:var(--sage);
          border-top:1px solid var(--line); padding-top:14px;
          display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap;
          text-decoration:none;
        }
        .doc-cta { color:var(--terracotta); font-weight:500; white-space:nowrap; }

        /* ---------- footer ---------- */
        footer.pc-footer { background:var(--ink); color:rgba(241,234,217,0.6); padding:70px 6vw 34px; }
        .footer-top { display:grid; grid-template-columns:1.3fr 1fr 1fr; gap:40px; padding-bottom:44px; border-bottom:1px solid rgba(241,234,217,0.14); }
        @media (max-width:760px){ .footer-top{ grid-template-columns:1fr; } }
        .footer-top h4 { font-family:'Fraunces',serif; color:var(--parchment); font-size:1.5rem; margin:0 0 14px; }
        .footer-top p { font-size:0.9rem; line-height:1.6; max-width:340px; }
        .footer-col-title { font-family:'IBM Plex Mono',monospace; font-size:0.7rem; letter-spacing:0.1em; text-transform:uppercase; color:var(--gold); margin-bottom:16px; }
        .footer-col p, .footer-col a { font-size:0.9rem; line-height:1.7; color:rgba(241,234,217,0.65); text-decoration:none; display:block; }
        .footer-bottom { display:flex; justify-content:space-between; flex-wrap:wrap; gap:12px; padding-top:26px; font-size:0.76rem; letter-spacing:0.03em; }

        .fade-note { font-size:0.78rem; color:#7a705f; margin-top:10px; }

        /* ---------- mobile: sections, stats, cards ---------- */
        @media (max-width:640px){
          section.block{ padding:64px 6vw; }
          h2.h-title{ font-size:2rem; margin-bottom:16px; }
          .lead-text{ font-size:0.95rem; }

          .stats-strip{ padding:36px 6vw; }
          .stat{ flex:1 1 45%; padding:0 0 0 16px; border-left:1px solid rgba(241,234,217,0.15); margin-bottom:20px; }
          .stat:nth-child(odd){ padding-left:0; border-left:none; }
          .stat-value{ font-size:1.8rem; }

          .about-wrap{ gap:36px; }
          .about-diagram{ padding:12px; }
          .khasra-chips{ gap:6px; }
          .khasra-chips span{ font-size:0.68rem; padding:5px 8px; }

          .loc-list li{ flex-direction:column; gap:6px; padding-bottom:16px; }
          .loc-list .li-label{ width:auto; }
          .map-card{ padding:26px; }

          .approval-card{ padding:24px; }
          .approval-card .ac-seal{ width:42px; height:42px; top:22px; right:22px; font-size:0.55rem; }
          .approval-card h3{ font-size:1.15rem; padding-right:52px; }

          .promoter-card{ padding:26px; }

          .doc-card{ padding:24px; }

          footer.pc-footer{ padding:56px 6vw 26px; }
          .footer-top{ gap:32px; padding-bottom:32px; }
          .footer-top h4{ font-size:1.3rem; }
          .footer-bottom{ flex-direction:column; gap:6px; }
        }
      `}</style>

      {/* NAV */}
      <nav className={`nav ${navSolid ? "solid" : ""}`}>
        <div className="nav-mark"><span className="dot" /> POOJA CITY</div>
        <div className="nav-links">
          <a href="#about">Overview</a>
          <a href="#location">Location</a>
          <a href="#approvals">Approvals</a>
          <a href="#promoters">Promoters</a>
          <a href="#documents">Documents</a>
        </div>
        <a className="nav-cta" href="#documents">RERA: PCGRERA090226002040</a>
        <button
          className={`nav-burger ${menuOpen ? "is-open" : ""}`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`}>
        <a href="#about" onClick={closeMenu}>Overview</a>
        <a href="#location" onClick={closeMenu}>Location</a>
        <a href="#approvals" onClick={closeMenu}>Approvals</a>
        <a href="#promoters" onClick={closeMenu}>Promoters</a>
        <a href="#documents" onClick={closeMenu}>Documents</a>
        <div className="mobile-menu-rera mono">RERA: PCGRERA090226002040</div>
      </div>

      {/* HERO */}
      <header className="hero">
        <PlotGrid />
        <div className="hero-inner">
          <div className="eyebrow">CG-RERA Registered · Reg. No. PCGRERA090226002040</div>
          <h1>Pooja City<br /><em>Commercial</em> Plotted Development</h1>
          <p className="lede">
            0.493 hectares of RERA-registered commercial plots at Lal Khadan, Torwa —
            fronting the 60 m Nehru Chowk–Dardighat Marg in Bilaspur, Chhattisgarh.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#documents">View official documents</a>
            <a className="btn btn-ghost" href="#location">See the location</a>
          </div>
          <div className="hero-rera">
            <div><span className="k">Registered</span><span className="v mono">09 Feb 2026</span></div>
            <div><span className="k">Valid till</span><span className="v mono">27 Dec 2030</span></div>
            <div><span className="k">Authority</span><span className="v mono">CG-RERA, Raipur</span></div>
          </div>
        </div>
      </header>

      {/* STATS */}
      <div className="stats-strip">
        <Stat value="0.493 Ha" label="Total land parcel" />
        <Stat value="0.325 Ha" label="Commercial plotting area" />
        <Stat value="60 m" label="Frontage road (ROW)" />
        <Stat value="5" label="Khasra parcels combined" />
      </div>

      {/* ABOUT */}
      <section className="block" id="about">
        <div className="about-wrap">
          <div className="reveal">
            <span className="kicker">01 — The Development</span>
            <h2 className="h-title">Five parcels,<br />one registered address.</h2>
            <p className="lead-text">
              Pooja City consolidates khasra parcels 1368/1, 1368/3, 1369/1, 1369/3 and
              1371/2 in village Torva into a single commercial-plotting layout, approved by
              the Joint Director of Town &amp; Country Planning, Bilaspur Regional, under
              letter no. CG/BSP/TNCP/PLC/2025/0024 dated 4 December 2025.
            </p>
            <p className="lead-text" style={{ marginTop: 16 }}>
              Of the 0.4930 hectare parcel, 0.324989 hectare is sanctioned for commercial
              (plotting) development, set back 30 metres from the mid-line of the adjoining
              60 m wide Nehru Chowk–Dardighat road.
            </p>
            <div className="khasra-chips">
              {KHASRAS.map((k) => <span key={k} className="mono">KH {k}</span>)}
            </div>
          </div>
          <div className="about-diagram reveal">
            <PlotGrid />
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className="block location-block" id="location">
        <div className="loc-grid">
          <div className="reveal">
            <span className="kicker">02 — Location &amp; Access</span>
            <h2 className="h-title">Torwa, Bilaspur —<br />on the Dardighat corridor.</h2>
            <ul className="loc-list">
              <li><span className="li-label">Site address</span><span className="li-value">Lal Khadan, Torwa, District Bilaspur, Chhattisgarh</span></li>
              <li><span className="li-label">Landmark</span><span className="li-value">Near Lal Khadan ROB, off Nehru Chowk</span></li>
              <li><span className="li-label">Frontage road</span><span className="li-value">Nehru Chowk–Dardighat Marg, proposed width 60.00 m</span></li>
              <li><span className="li-label">Revenue detail</span><span className="li-value">Halka No. 00037 · RI No. 01 · Tehsil &amp; District Bilaspur</span></li>
              <li><span className="li-label">Registered office</span><span className="li-value">Near Subhash Chandra Bose Garden, Dhan Mandi Road, Torwa, Bilaspur — 495004</span></li>
            </ul>
          </div>
          <div className="map-card reveal">
            <div className="mc-inner">
              <h3>Site reference</h3>
              <p style={{ fontSize: "0.92rem", lineHeight: 1.6, color: "rgba(241,234,217,0.75)" }}>
                Approved under the CG Nagar Tatha Gram Nivesh (Amendment &amp; Validation)
                Act, 2017 — Section 30(3), read with Rule 27 of the CG Bhoomi Vikas Niyam,
                1984. Development permission requires a 60 m building line and a further
                30 m setback along the frontage road.
              </p>
              <div className="pin">◆ 22.09° N · 82.14° E — Torva, Bilaspur (indicative)</div>
            </div>
          </div>
        </div>
      </section>

      {/* APPROVALS */}
      <section className="block" id="approvals">
        <span className="kicker">03 — Approvals &amp; Compliance</span>
        <h2 className="h-title">Registered, sanctioned,<br />on record.</h2>
        <p className="lead-text">
          Every plot at Pooja City sits behind two government approvals — a development
          permission from the Town &amp; Country Planning department, and a project
          registration from the Chhattisgarh Real Estate Regulatory Authority.
        </p>

        <div className="approval-grid">
          <div className="approval-card reveal">
            <div className="ac-seal">CG<br />RERA</div>
            <h3>RERA Registration Certificate</h3>
            <span className="ac-sub mono">FORM-C · Rule 6(1) · Reg. No. PCGRERA090226002040</span>
            <ul>
              <li>Granted under Section 5 of the Real Estate (Regulation &amp; Development) Act, 2016.</li>
              <li>Valid for 4 years, 10 months, 13 days — 9 Feb 2026 to 27 Dec 2030.</li>
              <li>Promoter must deposit 70% of realised amounts in a separate account for construction and land cost.</li>
              <li>Sale agreements and conveyance deeds to be executed as per Sections 13 &amp; 17.</li>
            </ul>
            <div className="ac-foot">
              <span>Issued by Registrar, CG-RERA, Raipur</span>
              <span>Dated 09 Feb 2026</span>
            </div>
          </div>

          <div className="approval-card reveal">
            <div className="ac-seal">TNCP<br />BSP</div>
            <h3>Development Permission</h3>
            <span className="ac-sub mono">Letter No. CG/BSP/TNCP/PLC/2025/0024</span>
            <ul>
              <li>Commercial plotting sanctioned on 0.324989 Ha of the 0.4930 Ha parcel.</li>
              <li>60 m building line and 30 m road-mid setback to be maintained.</li>
              <li>Plantation, rainwater harvesting, solar lighting (25% of open-area lighting) and fire-safety (NBC Part 4) norms apply.</li>
              <li>Permission is valid 3 years from issue, renewable annually up to 5 years; plots may be sold only after RERA registration.</li>
            </ul>
            <div className="ac-foot">
              <span>Joint Director, Town &amp; Country Planning, Bilaspur Regional</span>
              <span>Dated 04 Dec 2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* PROMOTERS */}
      <section className="block promoter-block" id="promoters">
        <span className="kicker">04 — Promoters</span>
        <h2 className="h-title">The developers on record.</h2>
        <p className="lead-text">As named in the RERA registration certificate and Annexure-13 of the project filing.</p>
        <div className="promoter-grid">
          <PromoterCard
            initials="MKS"
            name="Manoj Kumar Sidara"
            role="Promoter"
            father="Shri Chand Sidara"
            address="Near Subhash Chand Bose Garden, Dhan Mandi Road, Torwa, Bilaspur"
          />
          <PromoterCard
            initials="PRS"
            name="Prithvi Raj Sidara"
            role="Promoter"
            father="Shri Chand Sidara"
            address="Near Subhash Chand Bose Garden, Dhan Mandi Road, Torwa, Bilaspur"
          />
        </div>
        <p className="fade-note">PAN and Aadhaar details are filed with CG-RERA (Annexure-13) and withheld here for the promoters' privacy.</p>
      </section>

      {/* DOCUMENTS */}
      <section className="block" id="documents">
        <span className="kicker">05 — Documents</span>
        <h2 className="h-title">Official record, unredacted.</h2>
        <p className="lead-text">The three filings this page is built from — issued by CG-RERA and the Directorate of Town &amp; Country Planning.</p>
        <div className="doc-grid">
          <DocCard
            tag="Form-C"
            title="RERA Registration Certificate"
            desc="Chhattisgarh RERA's Form-C certificate registering Pooja City under the RERA Act, 2016, with validity and promoter conditions."
            meta="Reg. No. PCGRERA090226002040 · Raipur"
            href="/documents/rera-registration-certificate.pdf"
          />
          <DocCard
            tag="TNCP Approval"
            title="Town &amp; Country Planning Permission"
            desc="Development permission for commercial plotting, with the full 33-point condition schedule from the Bilaspur Regional TNCP office."
            meta="Letter No. CG/BSP/TNCP/PLC/2025/0024"
            href="/documents/tncp-development-permission.pdf"
          />
          <DocCard
            tag="Annexure-13"
            title="Promoter Details"
            desc="Statutory promoter-details annexure naming Manoj Kumar Sidara and Prithvi Raj Sidara as the project's promoters."
            meta="Annexure-13 · Photograph identification"
            href="/documents/promoter-details-annexure-13.pdf"
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="pc-footer">
        <div className="footer-top">
          <div>
            <h4>Pooja City</h4>
            <p>Commercial plotted development at Lal Khadan, Torwa, District Bilaspur, Chhattisgarh — registered with CG-RERA under Reg. No. PCGRERA090226002040.</p>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Registered Office</div>
            <p>Near Subhash Chandra Bose Garden,<br />Dhan Mandi Road, Torwa,<br />Bilaspur, Chhattisgarh — 495004</p>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Authorities</div>
            <p>CG-RERA, Raipur</p>
            <p>Joint Director, Town &amp; Country Planning,<br />Bilaspur Regional (C.G.)</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© Pooja City — Manoj Kumar Sidara &amp; Prithvi Raj Sidara, Promoters</span>
          <span className="mono">RERA Reg. PCGRERA090226002040</span>
        </div>
      </footer>
    </div>
  );
}