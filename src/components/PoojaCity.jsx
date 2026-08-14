import React, { useEffect, useState } from "react";

/* ---------------------------------------------------------------
   POOJA CITY — Commercial Plotted Development, Torwa, Bilaspur
   Design tokens (light theme)
   Page       #F7F3E8   parchment page background
   Surface    #FFFFFF   card / panel white
   Surface-2  #EFE6D2   warm cream secondary panel
   Terracotta #B0552F   Chhattisgarh soil / brick — primary accent
   Gold       #C79A3D   seal / certificate accent — secondary
   Sage       #5F7C68   land / plantation / "verified" green
   Line       #E3DAC4   hairline
   Text-dark  #221D17   primary text
   Ink        #16262A   reserved for the logo mark only
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
  return (
    <svg viewBox="0 0 640 460" className="plot-grid" aria-hidden="true">
      <defs>
        <pattern id="hatch" width="7" height="7" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="7" stroke="rgba(199,154,61,0.35)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="640" height="70" fill="rgba(34,29,23,0.06)" />
      <line x1="0" y1="35" x2="640" y2="35" stroke="#C79A3D" strokeWidth="1.4" strokeDasharray="10 8" />
      <text x="16" y="22" className="svg-label">NEHRU CHOWK — DARDIGHAT MARG · 60.00 M ROW</text>
      <line x1="0" y1="105" x2="640" y2="105" stroke="#7C9885" strokeWidth="1.2" strokeDasharray="3 5" />
      <text x="16" y="98" className="svg-label svg-label--sage">30.00 M SETBACK FROM ROAD MID-LINE</text>
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

function LogoMark({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <rect x="1" y="1" width="62" height="62" rx="6" fill="#16262A" stroke="#C79A3D" strokeWidth="1.2" />
      <g transform="translate(32,33) rotate(45)">
        <rect x="-16" y="-16" width="32" height="32" fill="none" stroke="#C79A3D" strokeWidth="1.6" />
        <rect x="-16" y="-16" width="16" height="16" fill="#B0552F" />
        <line x1="-16" y1="0" x2="16" y2="0" stroke="#C79A3D" strokeWidth="1.1" />
        <line x1="0" y1="-16" x2="0" y2="16" stroke="#C79A3D" strokeWidth="1.1" />
      </g>
    </svg>
  );
}

/* ---------- small inline icons for certificate cards ---------- */
function IconInstitution() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
      <path d="M12 2 3 7v2h18V7l-9-5Z" fill="currentColor" />
      <path d="M5 10v9M9 10v9M15 10v9M19 10v9M3 21h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function IconPlan() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
      <path d="M3 4h13l5 5v11a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M16 4v5h5M7 13h10M7 17h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function IconId() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
      <rect x="2.5" y="5" width="19" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="8.5" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 16c.6-1.6 1.8-2.4 3-2.4s2.4.8 3 2.4M14.5 10h4M14.5 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
      <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M20 20l-4.8-4.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none">
      <path d="M4 12.5 9.5 18 20 6" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconClose() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* ---------- certificate card: thumbnail photo + click-to-view + info strip ---------- */
function CertCard({ icon, thumb, title, badge, authority, statusLabel, statusValue, href }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="cert-card reveal">
        <button type="button" className="cert-thumb" onClick={() => setOpen(true)} aria-label={`View ${title}`}>
          <iframe
    src={`${href}#page=1&view=FitH`}
    title={`${title} preview`}
  />
          <span className="cert-verified"><IconCheck /> Verified</span>
          <span className="cert-overlay">
            <IconSearch />
            Click to View
          </span>
        </button>
        <div className="cert-info">
          <div className="cert-icon">{icon}</div>
          <div className="cert-text">
            <h3>{title}</h3>
            <span className="cert-badge mono">{badge}</span>
            <p className="cert-authority">{authority}</p>
            <p className="cert-status mono">
              {statusLabel}: <strong>{statusValue}</strong>
            </p>
          </div>
        </div>
        <div className="cert-actions">
          <a className="btn btn-ghost btn-small" href={href} target="_blank" rel="noreferrer">Open full document</a>
          <a className="btn btn-ghost btn-small" href={href} download>Download PDF</a>
        </div>
      </div>

      {open && (
        <div className="pdf-modal" role="dialog" aria-modal="true" onClick={() => setOpen(false)}>
          <div className="pdf-modal-inner" onClick={(e) => e.stopPropagation()}>
            <div className="pdf-modal-head">
              <span>{title}</span>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close">
                <IconClose />
              </button>
            </div>
            <iframe src={`${href}#view=FitH`} title={title} />
            <div className="pdf-modal-foot">
              <a className="btn btn-primary btn-small" href={href} target="_blank" rel="noreferrer">Open in new tab</a>
              <a className="btn btn-ghost btn-small" href={href} download>Download PDF</a>
            </div>
          </div>
        </div>
      )}
    </>
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
          --ink:#16262A; --terracotta:#B0552F; --gold:#C79A3D;
          --parchment:#F7F3E8; --surface:#FFFFFF; --surface2:#EFE6D2;
          --sage:#5F7C68; --line:#E3DAC4; --text:#221D17;
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
        .nav.solid { background:rgba(255,255,255,0.92); padding:12px 6vw; box-shadow:0 6px 24px rgba(34,29,23,0.08); backdrop-filter:blur(6px); border-bottom:1px solid var(--line); }
        .nav-mark { display:flex; align-items:center; gap:10px; color:var(--text); font-family:'Fraunces',serif; font-weight:600; font-size:1.15rem; }
        .nav-mark .dot { width:9px; height:9px; background:var(--gold); border-radius:1px; transform:rotate(45deg); flex:none; }
        .nav-links { display:flex; gap:28px; }
        .nav-links a { color:rgba(34,29,23,0.75); text-decoration:none; font-size:0.82rem; letter-spacing:0.08em; text-transform:uppercase; transition:color .2s; }
        .nav-links a:hover { color:var(--gold); }
        .nav-cta { border:1px solid var(--terracotta); color:var(--terracotta); padding:8px 16px; font-size:0.78rem; letter-spacing:0.08em; text-transform:uppercase; text-decoration:none; transition:all .2s; }
        .nav-cta:hover { background:var(--gold); color:var(--ink); }
        .nav-burger { display:none; width:30px; height:20px; position:relative; background:none; border:none; padding:0; cursor:pointer; flex:none; }
        .nav-burger span { position:absolute; left:0; right:0; height:1.6px; background:var(--text); transition:transform .25s ease, opacity .25s ease, top .25s ease; }
        .nav-burger span:first-child { top:2px; }
        .nav-burger span:last-child { top:16px; }
        .nav-burger.is-open span:first-child { top:9px; transform:rotate(45deg); }
        .nav-burger.is-open span:last-child { top:9px; transform:rotate(-45deg); }

        .mobile-menu {
          position:fixed; inset:0; z-index:49; background:var(--surface);
          display:flex; flex-direction:column; align-items:flex-start; justify-content:center;
          gap:6px; padding:0 8vw;
          opacity:0; pointer-events:none; transform:translateY(-8px);
          transition:opacity .28s ease, transform .28s ease;
        }
        .mobile-menu.is-open { opacity:1; pointer-events:auto; transform:translateY(0); }
        .mobile-menu a {
          font-family:'Fraunces',serif; font-size:2rem; color:var(--text); text-decoration:none;
          padding:12px 0; border-bottom:1px solid rgba(34,29,23,0.12); width:100%;
        }
        .mobile-menu-rera { margin-top:24px; color:var(--terracotta); font-size:0.8rem; letter-spacing:0.04em; }
        .mobile-menu-mark { margin-bottom:24px; }

        @media (max-width:760px){
          .nav-links{ display:none; }
          .nav-cta{ display:none; }
          .nav-burger{ display:block; }
        }

        /* ---------- hero ---------- */
        .hero {
          position:relative; min-height:100vh; background:var(--surface);
          display:flex; flex-direction:column; justify-content:center;
          padding:120px 6vw 80px; overflow:hidden;
          background-image:
            repeating-linear-gradient(0deg, rgba(34,29,23,0.045) 0 1px, transparent 1px 64px),
            repeating-linear-gradient(90deg, rgba(34,29,23,0.045) 0 1px, transparent 1px 64px);
          border-bottom:1px solid var(--line);
        }
        .hero-inner { position:relative; z-index:2; max-width:760px; }
        .eyebrow {
          display:inline-flex; align-items:center; gap:10px;
          color:var(--terracotta); font-size:0.75rem; letter-spacing:0.18em; text-transform:uppercase;
          border:1px solid rgba(176,85,47,0.4); background:rgba(176,85,47,0.05); padding:7px 14px; margin-bottom:28px;
        }
        .eyebrow::before { content:''; width:6px; height:6px; background:var(--terracotta); border-radius:50%; }
        .hero h1 {
          font-family:'Fraunces', serif; font-weight:600; font-optical-sizing:auto;
          font-size:clamp(3rem, 8vw, 6.4rem); line-height:0.96; color:var(--text); margin:0 0 22px;
          letter-spacing:-0.01em;
        }
        .hero h1 em { font-style:italic; color:var(--terracotta); font-weight:500; }
        .hero p.lede { color:rgba(34,29,23,0.68); font-size:1.15rem; max-width:520px; line-height:1.6; margin:0 0 40px; }
        .hero-actions { display:flex; gap:16px; flex-wrap:wrap; margin-bottom:56px; }
        .btn {
          font-family:'Space Grotesk',sans-serif; font-weight:600; font-size:0.9rem;
          padding:15px 28px; text-decoration:none; letter-spacing:0.02em; cursor:pointer;
          border:1px solid transparent; transition:all .22s ease; display:inline-flex; align-items:center; gap:10px;
        }
        .btn-primary { background:var(--terracotta); color:var(--parchment); }
        .btn-primary:hover { background:#c66539; transform:translateY(-2px); }
        .btn-ghost { border-color:rgba(34,29,23,0.28); color:var(--text); }
        .btn-ghost:hover { border-color:var(--terracotta); color:var(--terracotta); }

        .hero-rera { display:flex; gap:36px; flex-wrap:wrap; border-top:1px solid rgba(34,29,23,0.18); padding-top:24px; }
        .hero-rera div span { display:block; }
        .hero-rera .k { color:rgba(34,29,23,0.5); font-size:0.68rem; letter-spacing:0.14em; text-transform:uppercase; margin-bottom:6px; }
        .hero-rera .v { color:var(--terracotta); font-size:0.95rem; }

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
        .svg-label { fill:rgba(34,29,23,0.55); font-family:'IBM Plex Mono',monospace; font-size:9.5px; letter-spacing:0.08em; }
        .svg-label--sage { fill:#93b39c; }
        .svg-parcel-id { fill:var(--terracotta); font-family:'IBM Plex Mono',monospace; font-size:12px; letter-spacing:0.05em; }
        .svg-parcel-sub { fill:rgba(34,29,23,0.4); font-family:'IBM Plex Mono',monospace; font-size:8px; letter-spacing:0.12em; }

/* =========================================================
   RERA FEATURE DOCUMENT
========================================================= */

.rera-section {
  padding: 80px 6vw;
  background: var(--parchment);
  border-bottom: 1px solid var(--line);
}

.rera-container {
  max-width: 1080px;
  margin: 0 auto;
}

.rera-heading {
  margin-bottom: 34px;
}

.rera-heading .h-title {
  margin-bottom: 14px;
}

/* CARD */

.rera-card {
  width: min(100%, 920px);
  margin: 0 auto;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 20px;
  overflow: hidden;
  box-shadow:
    0 2px 5px rgba(34,29,23,0.05),
    0 18px 40px rgba(34,29,23,0.08);
}

/* PDF AREA */

.rera-preview {
  position: relative;
  height: 560px;
  background: #3d3d3d;
  overflow: hidden;
}

/* TOP DARK BAR */

.rera-preview-top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  z-index: 5;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;

  padding: 0 18px;

  background: #3d3d3d;
}

/* PDF */

.rera-pdf {
  position: absolute;
  top: 70px;
  left: 0;

  width: 100%;
  height: calc(100% - 70px);

  border: 0;
  display: block;
  background: #fff;
}

/* DOWNLOAD */

.rera-download {
  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #fff;
  text-decoration: none;

  font-size: 28px;
  line-height: 1;

  border-radius: 8px;

  transition:
    background .2s ease,
    transform .2s ease;
}

.rera-download:hover {
  background: rgba(255,255,255,.12);
  transform: translateY(-1px);
}

/* VERIFIED */

.rera-verified {
  display: inline-flex;
  align-items: center;
  gap: 6px;

  padding: 8px 14px;

  border-radius: 999px;

  background: var(--sage);
  color: #fff;

  font-size: .78rem;
  font-weight: 600;

  box-shadow:
    0 4px 12px rgba(95,124,104,.3);
}

/* INFORMATION */

.rera-info {
  display: flex;
  gap: 16px;
  padding: 26px 28px 12px;
  align-items: flex-start;
}

.rera-icon {
  flex: none;

  width: 42px;
  height: 42px;

  border-radius: 11px;

  background: rgba(176,85,47,.1);
  color: var(--terracotta);

  display: flex;
  align-items: center;
  justify-content: center;
}

.rera-details h3 {
  font-family: 'Fraunces', serif;
  font-size: 1.35rem;
  color: var(--text);

  margin: 0 0 9px;
  line-height: 1.25;
}

/* ACTIONS */

.rera-actions {
  display: flex;
  gap: 12px;

  padding: 18px 28px 28px;
}

.rera-actions .btn {
  flex: 1;
  justify-content: center;
}

/* MOBILE */

@media (max-width: 700px) {

  .rera-section {
    padding: 55px 5vw;
  }

  .rera-heading {
    margin-bottom: 24px;
  }

  .rera-card {
    border-radius: 16px;
  }

  .rera-preview {
    height: 500px;
  }

  .rera-preview-top {
    height: 62px;
    padding: 0 12px;
  }

  .rera-pdf {
    top: 62px;
    height: calc(100% - 62px);
  }

  .rera-info {
    padding: 22px 18px 8px;
  }

  .rera-details h3 {
    font-size: 1.12rem;
  }

  .rera-actions {
    padding: 16px 18px 20px;
    flex-direction: column;
  }

  .rera-actions .btn {
    width: 100%;
  }

}
        /* ---------- reveal ---------- */
        .reveal { opacity:0; transform:translateY(22px); transition:opacity .7s ease, transform .7s ease; }
        .reveal.is-in { opacity:1; transform:translateY(0); }

        /* ---------- section shell ---------- */
        section.block { padding:110px 6vw; position:relative; }
        .kicker { font-family:'IBM Plex Mono',monospace; font-size:0.75rem; letter-spacing:0.16em; text-transform:uppercase; color:var(--terracotta); margin-bottom:14px; display:block; }
        h2.h-title { font-family:'Fraunces',serif; font-weight:600; font-size:clamp(2rem,4vw,3rem); margin:0 0 20px; letter-spacing:-0.01em; }
        .lead-text { font-size:1.05rem; line-height:1.75; color:#463c31; max-width:640px; }

        /* ---------- stats strip ---------- */
        .stats-strip { background:var(--surface2); padding:56px 6vw; display:flex; flex-wrap:wrap; gap:0; border-bottom:1px solid var(--line); }
        .stat { flex:1 1 200px; padding:0 32px; border-left:1px solid rgba(34,29,23,0.15); }
        .stat:first-child { border-left:none; padding-left:0; }
        .stat-value { font-family:'Fraunces',serif; font-weight:600; font-size:2.6rem; color:var(--terracotta); line-height:1; }
        .stat-label { color:rgba(34,29,23,0.6); font-size:0.78rem; letter-spacing:0.06em; text-transform:uppercase; margin-top:10px; }
        @media (max-width:760px){ .stat{ border-left:none; border-top:1px solid rgba(34,29,23,0.15); padding:20px 0 0; margin-top:20px; } }

        /* ---------- about / grid diagram section ---------- */
        .about-wrap { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }
        @media (max-width:900px){ .about-wrap{ grid-template-columns:1fr; } }
        .about-diagram { background:var(--surface); border:1px solid var(--line); padding:20px; position:relative; }
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
        .map-card { background:var(--surface2); border:1px solid var(--line); color:var(--text); position:relative; overflow:hidden; }
        .map-card::after { content:''; position:absolute; inset:0; background-image:repeating-linear-gradient(0deg, rgba(199,154,61,0.06) 0 1px, transparent 1px 40px), repeating-linear-gradient(90deg, rgba(199,154,61,0.06) 0 1px, transparent 1px 40px); pointer-events:none; }
        .map-embed { width:100%; height:260px; position:relative; border-bottom:1px solid var(--line); }
        .map-embed iframe { width:100%; height:100%; border:0; display:block; filter:grayscale(15%) contrast(1.02) saturate(0.9); }
        .map-card .mc-inner { position:relative; z-index:1; padding:32px 40px 40px; }
        .map-card h3 { font-family:'Fraunces',serif; font-size:1.5rem; margin:0 0 12px; }
        .map-card .pin {
          display:inline-flex; align-items:center; gap:8px; color:var(--terracotta);
          font-family:'IBM Plex Mono',monospace; font-size:0.8rem; margin-top:20px;
          text-decoration:none; border-bottom:1px solid rgba(176,85,47,0.35); padding-bottom:2px;
          transition:border-color .2s;
        }
        .map-card .pin:hover { border-color:var(--terracotta); }

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
        .promoter-block { background:var(--surface2); border-top:1px solid var(--line); border-bottom:1px solid var(--line); }
        .promoter-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:28px; margin-top:48px; }
        @media (max-width:760px){ .promoter-grid{ grid-template-columns:1fr; } }
        .promoter-card { background:#fff; border:1px solid var(--line); padding:36px; }
        .avatar { width:56px; height:56px; border:1.4px solid var(--gold); color:var(--gold); font-family:'Fraunces',serif; font-size:1.2rem; display:flex; align-items:center; justify-content:center; margin-bottom:20px; }
        .promoter-card h3 { font-family:'Fraunces',serif; color:var(--text); font-size:1.3rem; margin:0 0 4px; }
        .promoter-role { color:var(--terracotta); font-size:0.78rem; letter-spacing:0.08em; text-transform:uppercase; margin:0 0 20px; }
        .promoter-card dl { margin:0; display:flex; flex-direction:column; gap:14px; }
        .promoter-card dt { font-family:'IBM Plex Mono',monospace; font-size:0.68rem; letter-spacing:0.1em; text-transform:uppercase; color:rgba(34,29,23,0.45); margin-bottom:4px; }
        .promoter-card dd { margin:0; color:rgba(34,29,23,0.85); font-size:0.92rem; line-height:1.5; }

        /* ---------- certificate cards (document photo + verified + click to view) ---------- */
        .cert-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:28px; margin-top:48px; }
        @media (max-width:980px){ .cert-grid{ grid-template-columns:1fr 1fr; } }
        @media (max-width:700px){ .cert-grid{ grid-template-columns:1fr; } }

        .cert-card {
          background:#fff; border:1px solid var(--line); border-radius:18px; overflow:hidden;
          display:flex; flex-direction:column;
          box-shadow:0 1px 3px rgba(22,38,42,0.05);
          transition:transform .25s ease, box-shadow .25s ease, border-color .25s ease;
        }
        .cert-card:hover { transform:translateY(-5px); box-shadow:0 18px 34px rgba(22,38,42,0.12); border-color:rgba(176,85,47,0.35); }

        .cert-thumb {
          position:relative; display:block; width:100%; aspect-ratio:4/3; overflow:hidden;
          border:0; padding:0; cursor:pointer; background:var(--surface2);
        }
        .cert-thumb iframe {
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
  pointer-events: none;
  background: #EFE6D2;
}
        .cert-thumb:hover img { transform:scale(1.045); filter:saturate(1) contrast(1.02) brightness(0.94); }

        .cert-verified {
          position:absolute; top:12px; right:12px; z-index:2;
          display:inline-flex; align-items:center; gap:5px;
          background:var(--sage); color:#fff; font-size:0.7rem; font-weight:600;
          padding:6px 11px 6px 8px; border-radius:999px; letter-spacing:0.02em;
          box-shadow:0 4px 10px rgba(95,124,104,0.35);
        }
        .cert-verified svg { flex:none; }

        .cert-overlay {
          position:absolute; inset:0; z-index:1;
          display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px;
          background:rgba(22,38,42,0.42); color:#fff;
          font-family:'Space Grotesk',sans-serif; font-weight:600; font-size:0.86rem; letter-spacing:0.03em;
          opacity:0; transition:opacity .25s ease;
        }
        .cert-thumb:hover .cert-overlay, .cert-thumb:focus-visible .cert-overlay { opacity:1; }
        .cert-overlay svg { width:26px; height:26px; }

        .cert-info { display:flex; gap:14px; padding:20px 22px 6px; align-items:flex-start; }
        .cert-icon {
          flex:none; width:38px; height:38px; border-radius:10px;
          background:rgba(176,85,47,0.1); color:var(--terracotta);
          display:flex; align-items:center; justify-content:center;
        }
        .cert-text h3 { font-family:'Fraunces',serif; font-size:1.08rem; color:var(--text); margin:0 0 8px; line-height:1.25; }
        .cert-badge {
          display:inline-block; font-size:0.68rem; color:var(--terracotta);
          background:rgba(199,154,61,0.14); border:1px solid rgba(199,154,61,0.4);
          padding:4px 9px; border-radius:999px; margin-bottom:10px;
        }
        .cert-authority { font-size:0.82rem; color:#6b6153; margin:0 0 6px; line-height:1.45; }
        .cert-status { font-size:0.72rem; color:var(--sage); letter-spacing:0.04em; text-transform:uppercase; }
        .cert-status strong { color:#3f5c48; }

        .cert-actions { display:flex; gap:10px; padding:16px 22px 22px; margin-top:auto; }
        .cert-actions .btn-small { flex:1; justify-content:center; }

        .btn-small { padding:10px 16px; font-size:0.76rem; }

        /* ---------- pdf modal ---------- */
        .pdf-modal {
          position:fixed; inset:0; z-index:100; background:rgba(22,38,42,0.72);
          display:flex; align-items:center; justify-content:center; padding:24px;
          backdrop-filter:blur(3px);
        }
        .pdf-modal-inner {
          background:#fff; width:min(880px, 100%); max-height:92vh; border-radius:14px;
          display:flex; flex-direction:column; overflow:hidden; box-shadow:0 30px 60px rgba(0,0,0,0.35);
        }
        .pdf-modal-head {
          display:flex; align-items:center; justify-content:space-between;
          padding:16px 20px; border-bottom:1px solid var(--line);
          font-family:'Fraunces',serif; font-size:1.05rem; color:var(--text);
        }
        .pdf-modal-head button { background:none; border:none; cursor:pointer; color:var(--text); padding:4px; display:flex; }
        .pdf-modal-inner iframe { width:100%; flex:1; min-height:60vh; border:0; background:var(--surface2); }
        .pdf-modal-foot { display:flex; gap:12px; padding:16px 20px; border-top:1px solid var(--line); }

        /* ---------- footer ---------- */
        footer.pc-footer { background:var(--surface2); color:rgba(34,29,23,0.6); padding:70px 6vw 34px; border-top:1px solid var(--line); }
        .footer-top { display:grid; grid-template-columns:1.3fr 1fr 1fr; gap:40px; padding-bottom:44px; border-bottom:1px solid rgba(34,29,23,0.14); }
        @media (max-width:760px){ .footer-top{ grid-template-columns:1fr; } }
        .footer-top h4 { font-family:'Fraunces',serif; color:var(--text); font-size:1.5rem; margin:0; }
        .footer-mark { display:flex; align-items:center; gap:12px; margin-bottom:14px; }
        .footer-top p { font-size:0.9rem; line-height:1.6; max-width:340px; }
        .footer-col-title { font-family:'IBM Plex Mono',monospace; font-size:0.7rem; letter-spacing:0.1em; text-transform:uppercase; color:var(--terracotta); margin-bottom:16px; }
        .footer-col p, .footer-col a { font-size:0.9rem; line-height:1.7; color:rgba(34,29,23,0.65); text-decoration:none; display:block; }
        .footer-bottom { display:flex; justify-content:space-between; flex-wrap:wrap; gap:12px; padding-top:26px; font-size:0.76rem; letter-spacing:0.03em; }

        .fade-note { font-size:0.78rem; color:#7a705f; margin-top:10px; }

        /* ---------- mobile ---------- */
        @media (max-width:640px){
          section.block{ padding:64px 6vw; }
          h2.h-title{ font-size:2rem; margin-bottom:16px; }
          .lead-text{ font-size:0.95rem; }

          .stats-strip{ padding:36px 6vw; }
          .stat{ flex:1 1 45%; padding:0 0 0 16px; border-left:1px solid rgba(34,29,23,0.15); margin-bottom:20px; }
          .stat:nth-child(odd){ padding-left:0; border-left:none; }
          .stat-value{ font-size:1.8rem; }

          .about-wrap{ gap:36px; }
          .about-diagram{ padding:12px; }
          .khasra-chips{ gap:6px; }
          .khasra-chips span{ font-size:0.68rem; padding:5px 8px; }

          .loc-list li{ flex-direction:column; gap:6px; padding-bottom:16px; }
          .loc-list .li-label{ width:auto; }
          .map-card .mc-inner{ padding:24px; }
          .map-embed{ height:200px; }

          .approval-card{ padding:24px; }
          .approval-card .ac-seal{ width:42px; height:42px; top:22px; right:22px; font-size:0.55rem; }
          .approval-card h3{ font-size:1.15rem; padding-right:52px; }

          .promoter-card{ padding:26px; }

          .cert-grid{ gap:20px; }
          .cert-info{ padding:18px 18px 4px; }
          .cert-actions{ padding:14px 18px 18px; flex-direction:column; }
          .pdf-modal{ padding:0; }
          .pdf-modal-inner{ width:100%; height:100%; max-height:100%; border-radius:0; }
          .pdf-modal-foot{ flex-direction:column; }

          footer.pc-footer{ padding:56px 6vw 26px; }
          .footer-top{ gap:32px; padding-bottom:32px; }
          .footer-top h4{ font-size:1.3rem; }
          .footer-bottom{ flex-direction:column; gap:6px; }
        }
      `}</style>

      {/* NAV */}
      <nav className={`nav ${navSolid ? "solid" : ""}`}>
        <div className="nav-mark"><LogoMark size={30} /> POOJA CITY</div>
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
        <div className="mobile-menu-mark"><LogoMark size={40} /></div>
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
{/* RERA DOCUMENT — BELOW HERO */}
<section className="rera-section">
  <div className="rera-container">

    <div className="rera-heading">
      <span className="kicker">Official Document</span>
      <h2 className="h-title">RERA Registration Certificate</h2>
      <p className="lead-text">
        View the official registration certificate issued by the
        Chhattisgarh Real Estate Regulatory Authority.
      </p>
    </div>

    <div className="rera-card">

      {/* PDF PREVIEW HEADER */}
      <div className="rera-preview">

        <div className="rera-preview-top">

          <a
            href="/documents/rera-registration-certificate.pdf"
            target="_blank"
            rel="noreferrer"
            className="rera-download"
            aria-label="Download RERA PDF"
          >
            ↓
          </a>

          <span className="rera-verified">
            ✓ Verified
          </span>

        </div>

        {/* ACTUAL PDF */}
        <iframe
          src="/documents/rera-registration-certificate.pdf#page=1"
          title="RERA Registration Certificate"
          className="rera-pdf"
        />

      </div>

      {/* DOCUMENT INFORMATION */}
      <div className="rera-info">

        <div className="rera-icon">
          <IconInstitution />
        </div>

        <div className="rera-details">

          <h3>RERA Registration Certificate</h3>

          <span className="cert-badge mono">
            PCGRERA090226002040
          </span>

          <p className="cert-authority">
            Chhattisgarh Real Estate Regulatory Authority,
            Raipur
          </p>

          <p className="cert-status mono">
            REGISTERED:
            <strong> 09 FEB 2026</strong>
          </p>

        </div>

      </div>

      {/* ACTION BUTTONS */}
      <div className="rera-actions">

        <a
          className="btn btn-ghost btn-small"
          href="/documents/rera-registration-certificate.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Open full document
        </a>

        <a
          className="btn btn-ghost btn-small"
          href="/documents/rera-registration-certificate.pdf"
          download
        >
          Download PDF
        </a>

      </div>

    </div>

  </div>
</section>

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
            <div className="map-embed">
              <iframe
                title="Pooja City site location"
                src="https://www.google.com/maps?q=Lal+Khadan,+Torwa,+Bilaspur,+Chhattisgarh+495004&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="mc-inner">
              <h3>Site reference</h3>
              <p style={{ fontSize: "0.92rem", lineHeight: 1.6, color: "rgba(34,29,23,0.72)" }}>
                Approved under the CG Nagar Tatha Gram Nivesh (Amendment &amp; Validation)
                Act, 2017 — Section 30(3), read with Rule 27 of the CG Bhoomi Vikas Niyam,
                1984. Development permission requires a 60 m building line and a further
                30 m setback along the frontage road.
              </p>
              <a
                className="pin"
                href="https://www.google.com/maps/search/?api=1&query=Lal+Khadan,+Torwa,+Bilaspur,+Chhattisgarh+495004"
                target="_blank"
                rel="noreferrer"
              >
                ◆ Open Lal Khadan, Torwa in Google Maps →
              </a>
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
        <p className="lead-text">
          The three filings this page is built from — tap any certificate to view the
          full scanned document, or download it for your records.
        </p>
        <div className="cert-grid">
          <CertCard
            icon={<IconInstitution />}
            thumb="/thumbs/rera-cert.jpg"
            title="RERA Registration Certificate"
            badge="PCGRERA090226002040"
            authority="Chhattisgarh Real Estate Regulatory Authority, Raipur"
            statusLabel="Registered"
            statusValue="09 Feb 2026"
            href="/documents/rera-registration-certificate.pdf"
            
          />
          <CertCard
            icon={<IconPlan />}
            thumb="/thumbs/tncp-permission.jpg"
            title="Town &amp; Country Planning Permission"
            badge="CG/BSP/TNCP/PLC/2025/0024"
            authority="Joint Director, Town &amp; Country Planning, Bilaspur Regional"
            statusLabel="Issued"
            statusValue="04 Dec 2025"
            href="/documents/tncp-development-permission.pdf"
          />
          <CertCard
            icon={<IconId />}
            thumb="/thumbs/promoter-annexure.jpg"
            title="Promoter Details — Annexure 13"
            badge="Annexure-13"
            authority="Manoj Kumar Sidara &amp; Prithvi Raj Sidara"
            statusLabel="Filed with"
            statusValue="CG-RERA"
            href="/documents/promoter-details-annexure-13.pdf"
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="pc-footer">
        <div className="footer-top">
          <div>
            <div className="footer-mark"><LogoMark size={38} /><h4>Pooja City</h4></div>
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