"use client";

/**
 * KbTicker — live calibration knowledge base stats banner.
 * DEBUG MODE: hardcoded stats + red background to confirm render.
 * Restore live fetch + correct styling once confirmed visible.
 * @keyframes kb-ticker defined in globals.css
 */

const MONO = "'Share Tech Mono', monospace";

const REPEAT = 16; // 8 * 2 for the seamless loop

export default function KbTicker() {
  return (
    <div
      style={{
        width: "100%",
        background: "red", // DEBUG — remove once confirmed visible
        overflow: "hidden",
        height: 28,
        display: "flex",
        alignItems: "center",
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
          background: "linear-gradient(to right, red, transparent)", // DEBUG
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
          background: "linear-gradient(to left, red, transparent)", // DEBUG
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          display: "inline-block",
          whiteSpace: "nowrap",
          animation: "kb-ticker 90s linear infinite",
          willChange: "transform",
        }}
      >
        <span
          style={{
            fontFamily: MONO,
            fontSize: 11,
            letterSpacing: "0.1em",
            color: "#ffffff",
          }}
        >
          {Array.from({ length: REPEAT }, (_, i) => (
            <span key={i}>
              {"// CALIBRATION KNOWLEDGE BASE · 343 ENTRIES · 32 CATEGORIES · 12 ENGINE FAMILIES · "}
              <span style={{ color: "#FFD700" }}>UPDATED LIVE</span>
              {" · "}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}
