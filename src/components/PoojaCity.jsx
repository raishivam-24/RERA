import React, { useEffect, useState } from "react";

/* ---------------------------------------------------------------
   POOJA CITY — Commercial Plotted Development, Torwa, Bilaspur
---------------------------------------------------------------- */

const KHASRAS = ["1368/1", "1368/3", "1369/1", "1369/3", "1371/2"];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
          }
        });
      },
      { threshold: 0.12 }
    );

    els.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);
}

/* ---------------------------------------------------------------
   PLOT GRID
---------------------------------------------------------------- */

function PlotGrid() {
  return (
    <svg
      viewBox="0 0 640 460"
      className="plot-grid"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="hatch"
          width="7"
          height="7"
          patternTransform="rotate(45)"
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="7"
            stroke="rgba(199,154,61,0.35)"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      {/* ROAD */}
      <rect
        x="0"
        y="0"
        width="640"
        height="70"
        fill="rgba(241,234,217,0.06)"
      />

      <line
        x1="0"
        y1="35"
        x2="640"
        y2="35"
        stroke="#C79A3D"
        strokeWidth="1.4"
        strokeDasharray="10 8"
      />

      <text
        x="16"
        y="22"
        className="svg-label"
      >
        NEHRU CHOWK — DARDIGHAT MARG · 60.00 M ROW
      </text>

      {/* SETBACK */}

      <line
        x1="0"
        y1="105"
        x2="640"
        y2="105"
        stroke="#7C9885"
        strokeWidth="1.2"
        strokeDasharray="3 5"
      />

      <text
        x="16"
        y="98"
        className="svg-label svg-label--sage"
      >
        30.00 M SETBACK FROM ROAD MID-LINE
      </text>

      {/* PARCELS */}

      {[
        {
          x: 30,
          y: 130,
          w: 220,
          h: 140,
          id: "1368/1",
        },
        {
          x: 270,
          y: 130,
          w: 150,
          h: 140,
          id: "1368/3",
        },
        {
          x: 440,
          y: 130,
          w: 170,
          h: 90,
          id: "1369/1",
        },
        {
          x: 30,
          y: 290,
          w: 260,
          h: 130,
          id: "1369/3",
        },
        {
          x: 310,
          y: 250,
          w: 300,
          h: 170,
          id: "1371/2",
        },
      ].map((p, i) => (
        <g
          key={p.id}
          className="parcel"
          style={{
            animationDelay: `${i * 120}ms`,
          }}
        >
          <rect
            x={p.x}
            y={p.y}
            width={p.w}
            height={p.h}
            fill="url(#hatch)"
            stroke="#C79A3D"
            strokeWidth="1.2"
          />

          <text
            x={p.x + p.w / 2}
            y={p.y + p.h / 2 - 4}
            textAnchor="middle"
            className="svg-parcel-id"
          >
            KH. {p.id}
          </text>

          <text
            x={p.x + p.w / 2}
            y={p.y + p.h / 2 + 14}
            textAnchor="middle"
            className="svg-parcel-sub"
          >
            VILLAGE TORVA
          </text>
        </g>
      ))}

      <text
        x="16"
        y="446"
        className="svg-label"
      >
        TOTAL AREA 0.4930 HA · COMMERCIAL PLOTTING 0.324989 HA
      </text>
    </svg>
  );
}

/* ---------------------------------------------------------------
   LOGO
---------------------------------------------------------------- */

function LogoMark({ size = 34 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
    >
      <rect
        x="1"
        y="1"
        width="62"
        height="62"
        rx="6"
        fill="#29483D"
        stroke="#C7A45A"
        strokeWidth="1.2"
      />

      <g transform="translate(32,33) rotate(45)">
        <rect
          x="-16"
          y="-16"
          width="32"
          height="32"
          fill="none"
          stroke="#C7A45A"
          strokeWidth="1.6"
        />

        <rect
          x="-16"
          y="-16"
          width="16"
          height="16"
          fill="#C8754C"
        />

        <line
          x1="-16"
          y1="0"
          x2="16"
          y2="0"
          stroke="#C7A45A"
          strokeWidth="1.1"
        />

        <line
          x1="0"
          y1="-16"
          x2="0"
          y2="16"
          stroke="#C7A45A"
          strokeWidth="1.1"
        />
      </g>
    </svg>
  );
}

/* ---------------------------------------------------------------
   STAT
---------------------------------------------------------------- */

function Stat({ value, label }) {
  return (
    <div className="stat reveal">
      <div className="stat-value">
        {value}
      </div>

      <div className="stat-label">
        {label}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   PDF PREVIEW

   Google viewer is used because many mobile browsers do not
   render PDFs correctly inside a normal iframe and instead show
   an "Open" button.
---------------------------------------------------------------- */

function PdfPreview({ href, title }) {
  const [viewerUrl, setViewerUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const fullUrl =
        window.location.origin + href;

      const googleViewer =
        `https://docs.google.com/gview?embedded=1&url=${encodeURIComponent(
          fullUrl
        )}`;

      setViewerUrl(googleViewer);
    }
  }, [href]);

  return (
    <div className="pdf-preview">
      {viewerUrl ? (
        <iframe
          src={viewerUrl}
          title={`${title} PDF preview`}
          className="pdf-preview-frame"
          loading="lazy"
        />
      ) : (
        <div className="pdf-loading">
          Loading PDF...
        </div>
      )}

      <div className="pdf-overlay" />
    </div>
  );
}

/* ---------------------------------------------------------------
   DOCUMENT CARD
---------------------------------------------------------------- */

function DocCard({
  tag,
  title,
  desc,
  meta,
  href,
}) {
  return (
    <article className="doc-card reveal">

      {/* PDF PREVIEW */}

      <div className="doc-preview">

        <PdfPreview
          href={href}
          title={title}
        />

        <div className="verified-badge">
          ✓ Verified
        </div>

      </div>

      {/* CONTENT */}

      <div className="doc-content">

        <div className="doc-card-top">

          <div className="doc-tag">
            {tag}
          </div>

          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="doc-icon"
            aria-label={`Open ${title}`}
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
            >
              <path
                d="M12 3v12m0 0l-4.5-4.5M12 15l4.5-4.5M4 19h16"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

        </div>

        <h3>
          {title}
        </h3>

        <p>
          {desc}
        </p>

        <div className="doc-meta">

          <span>
            {meta}
          </span>

          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="doc-cta"
          >
            View PDF →
          </a>

        </div>

      </div>

    </article>
  );
}

/* ---------------------------------------------------------------
   PROMOTER
---------------------------------------------------------------- */

function PromoterCard({
  initials,
  name,
  father,
  address,
  role,
}) {
  return (
    <div className="promoter-card reveal">

      <div className="avatar">
        {initials}
      </div>

      <h3>
        {name}
      </h3>

      <p className="promoter-role">
        {role}
      </p>

      <dl>

        <dt>
          Father's name
        </dt>

        <dd>
          {father}
        </dd>

        <dt>
          Address
        </dt>

        <dd>
          {address}
        </dd>

      </dl>

    </div>
  );
}

/* ---------------------------------------------------------------
   MAIN COMPONENT
---------------------------------------------------------------- */

export default function PoojaCity() {

  useReveal();

  const [navSolid, setNavSolid] =
    useState(false);

  const [menuOpen, setMenuOpen] =
    useState(false);

  /* NAV SCROLL */

  useEffect(() => {

    const onScroll = () => {
      setNavSolid(window.scrollY > 40);
    };

    window.addEventListener(
      "scroll",
      onScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        onScroll
      );
    };

  }, []);

  /* BODY LOCK */

  useEffect(() => {

    document.body.style.overflow =
      menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };

  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (

    <div className="pc-root">

      <style>{`

        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,500;9..144,600;9..144,700&family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');


        /* =====================================================
           GLOBAL
        ===================================================== */

        .pc-root {

          --ink:#29483D;
          --ink2:#365B4E;

          --terracotta:#C8754C;
          --gold:#B4934B;

          --parchment:#FBF8F1;
          --sage:#7F9B8A;

          --line:#E6DDCF;
          --text:#2C302B;

          font-family:
            'Space Grotesk',
            sans-serif;

          background:#FBF9F4;

          color:var(--text);

          width:100%;

          overflow-x:hidden;
        }


        .pc-root * {
          box-sizing:border-box;
        }


        html {
          scroll-behavior:smooth;
        }


        body {
          margin:0;
          padding:0;
        }


        .mono {
          font-family:
            'IBM Plex Mono',
            monospace;

          letter-spacing:.03em;
        }


        .display {
          font-family:
            'Fraunces',
            serif;
        }


        /* =====================================================
           NAV
        ===================================================== */

        .nav {

          position:fixed;

          top:0;
          left:0;
          right:0;

          z-index:100;

          display:flex;

          align-items:center;

          justify-content:space-between;

          gap:20px;

          padding:
            18px 6vw;

          background:transparent;

          transition:
            background .3s ease,
            padding .3s ease,
            box-shadow .3s ease;
        }


        .nav.solid {

          background:
            rgba(41,72,61,.97);

          padding:
            12px 6vw;

          box-shadow:
            0 6px 24px
            rgba(0,0,0,.15);

          backdrop-filter:
            blur(8px);
        }


        .nav-mark {

          display:flex;

          align-items:center;

          gap:10px;

          color:
            var(--parchment);

          font-family:
            'Fraunces',
            serif;

          font-weight:600;

          font-size:1.15rem;

          white-space:nowrap;
        }


        .nav-links {

          display:flex;

          gap:28px;

          align-items:center;
        }


        .nav-links a {

          color:
            rgba(251,248,241,.78);

          text-decoration:none;

          font-size:.82rem;

          letter-spacing:.08em;

          text-transform:uppercase;

          transition:
            color .2s ease;
        }


        .nav-links a:hover {
          color:var(--gold);
        }


        .nav-cta {

          border:
            1px solid var(--gold);

          color:
            var(--gold);

          padding:
            8px 16px;

          font-size:.76rem;

          letter-spacing:.06em;

          text-transform:uppercase;

          text-decoration:none;

          transition:
            all .2s ease;

          white-space:nowrap;
        }


        .nav-cta:hover {

          background:
            var(--gold);

          color:
            var(--ink);
        }


        .nav-burger {

          display:none;

          width:34px;
          height:24px;

          position:relative;

          background:none;

          border:none;

          padding:0;

          cursor:pointer;
        }


        .nav-burger span {

          position:absolute;

          left:0;
          right:0;

          height:2px;

          background:
            var(--parchment);

          transition:
            transform .25s ease,
            top .25s ease;
        }


        .nav-burger span:first-child {
          top:3px;
        }


        .nav-burger span:last-child {
          top:18px;
        }


        .nav-burger.is-open
        span:first-child {

          top:10px;

          transform:
            rotate(45deg);
        }


        .nav-burger.is-open
        span:last-child {

          top:10px;

          transform:
            rotate(-45deg);
        }


        /* =====================================================
           MOBILE MENU
        ===================================================== */

        .mobile-menu {

          position:fixed;

          inset:0;

          z-index:90;

          background:
            var(--ink);

          display:flex;

          flex-direction:column;

          align-items:flex-start;

          justify-content:center;

          gap:6px;

          padding:
            0 8vw;

          opacity:0;

          pointer-events:none;

          transform:
            translateY(-8px);

          transition:
            opacity .28s ease,
            transform .28s ease;
        }


        .mobile-menu.is-open {

          opacity:1;

          pointer-events:auto;

          transform:
            translateY(0);
        }


        .mobile-menu a {

          font-family:
            'Fraunces',
            serif;

          font-size:2rem;

          color:
            var(--parchment);

          text-decoration:none;

          padding:12px 0;

          border-bottom:
            1px solid
            rgba(251,248,241,.12);

          width:100%;
        }


        .mobile-menu-mark {
          margin-bottom:24px;
        }


        .mobile-menu-rera {

          margin-top:24px;

          color:
            var(--gold);

          font-size:.8rem;

          letter-spacing:.04em;
        }


        /* =====================================================
           HERO
        ===================================================== */

        .hero {

          position:relative;

          min-height:100vh;

          background:
            var(--ink);

          display:flex;

          flex-direction:column;

          justify-content:center;

          padding:
            120px 6vw 80px;

          overflow:hidden;

          background-image:

            linear-gradient(
              180deg,
              rgba(41,72,61,.56),
              rgba(41,72,61,.94)
            ),

            url('/images/pooja-city-hero-background.svg');

          background-size:
            cover,
            cover;

          background-position:
            center,
            center;

          background-repeat:
            no-repeat,
            no-repeat;
        }


        .hero-inner {

          position:relative;

          z-index:2;

          max-width:760px;
        }


        .eyebrow {

          display:inline-flex;

          align-items:center;

          gap:10px;

          color:
            var(--gold);

          font-size:.75rem;

          letter-spacing:.18em;

          text-transform:uppercase;

          border:
            1px solid
            rgba(180,147,75,.55);

          padding:
            7px 14px;

          margin-bottom:28px;
        }


        .eyebrow::before {

          content:'';

          width:6px;

          height:6px;

          background:
            var(--gold);

          border-radius:50%;
        }


        .hero h1 {

          font-family:
            'Fraunces',
            serif;

          font-weight:600;

          font-size:
            clamp(
              3rem,
              8vw,
              6.4rem
            );

          line-height:.96;

          color:
            var(--parchment);

          margin:
            0 0 22px;
        }


        .hero h1 em {

          font-style:italic;

          color:
            #D18A62;

          font-weight:500;
        }


        .hero p.lede {

          color:
            rgba(251,248,241,.75);

          font-size:1.15rem;

          max-width:520px;

          line-height:1.6;

          margin:
            0 0 40px;
        }


        .hero-actions {

          display:flex;

          gap:16px;

          flex-wrap:wrap;

          margin-bottom:56px;
        }


        .btn {

          font-family:
            'Space Grotesk',
            sans-serif;

          font-weight:600;

          font-size:.9rem;

          padding:
            15px 28px;

          text-decoration:none;

          letter-spacing:.02em;

          cursor:pointer;

          border:
            1px solid transparent;

          transition:
            all .22s ease;

          display:inline-flex;

          align-items:center;

          justify-content:center;

          gap:10px;
        }


        .btn-primary {

          background:
            var(--terracotta);

          color:
            var(--parchment);
        }


        .btn-primary:hover {

          background:
            #D58760;

          transform:
            translateY(-2px);
        }


        .btn-ghost {

          border-color:
            rgba(251,248,241,.35);

          color:
            var(--parchment);
        }


        .btn-ghost:hover {

          border-color:
            var(--gold);

          color:
            var(--gold);
        }


        .hero-rera {

          display:flex;

          gap:36px;

          flex-wrap:wrap;

          border-top:
            1px solid
            rgba(251,248,241,.18);

          padding-top:24px;
        }


        .hero-rera div span {
          display:block;
        }


        .hero-rera .k {

          color:
            rgba(251,248,241,.5);

          font-size:.68rem;

          letter-spacing:.14em;

          text-transform:uppercase;

          margin-bottom:6px;
        }


        .hero-rera .v {

          color:
            var(--gold);

          font-size:.95rem;
        }


        .plot-grid {

          position:absolute;

          right:-4%;

          top:50%;

          transform:
            translateY(-50%);

          width:56%;

          max-width:640px;

          opacity:.9;

          z-index:1;
        }


        .parcel {

          opacity:0;

          animation:
            fadeIn .8s ease forwards;
        }


        @keyframes fadeIn {
          to
