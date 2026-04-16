"use client";

/**
 * KbTicker — live calibration knowledge base stats banner.
 * Client component: renders immediately with static fallback text,
 * then upgrades to live Supabase data on mount.
 * Never returns null — always visible regardless of fetch outcome.
 * @keyframes kb-ticker defined in globals.css
 */

import { useEffect, useState } from "react";

const MONO = "'Share Tech Mono', monospace";

const FALLBACK =
  "// CALIBRATION KNOWLEDGE BASE · GEN5 LT1 · LT4 · LT5 · LT2 · L83 · L86 · 6L80E · HPTuners VCM Suite · UPDATED LIVE · ";

function buildSegment(total: number, cats: number, families: number) {
  return (
    `// CALIBRATION KNOWLEDGE BASE · ${total} ENTRIES · ` +
    `${cats} CATEGORIES · ${families} ENGINE FAMILIES · UPDATED LIVE · `
  );
}

export default function KbTicker() {
  const [segment, setSegment] = useState(FALLBACK);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return;

    fetch(`${url}/rest/v1/calibration_knowledge?select=category,engine_family`, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        Accept: "application/json",
      },
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((rows) => {
        if (!Array.isArray(rows) || rows.length === 0) return;
        const total    = rows.length;
        const cats     = new Set(rows.map((r: any) => r.category)).size;
        const families = new Set(rows.map((r: any) => r.engine_family).filter(Boolean)).size;
        setSegment(buildSegment(total, cats, families));
      })
      .catch(() => {/* keep fallback */});
  }, []);

  const half = Array(8).fill(segment).join("");

  return (
    <div
      style={{
        width: "100%",
        background: "#080a0e",
        overflow: "hidden",
        height: 28,
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid rgba(0,220,255,0.1)",
        position: "relative",
        zIndex: 50,
      }}
    >
      {/* Left fade */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0, top: 0, bottom: 0, width: 48,
          background: "linear-gradient(to right, #080a0e, transparent)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      {/* Right fade */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: 0, top: 0, bottom: 0, width: 48,
          background: "linear-gradient(to left, #080a0e, transparent)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          display: "inline-block",
          whiteSpace: "nowrap",
          animation: "kb-ticker 60s linear infinite",
          willChange: "transform",
        }}
      >
        <span
          style={{
            fontFamily: MONO,
            fontSize: 10,
            letterSpacing: "0.1em",
            color: "rgba(0,220,255,0.65)",
          }}
        >
          {half}{half}
        </span>
      </div>
    </div>
  );
}
