// 02_Website/Marketing Website/tuneview-web/app/changelog/data.ts
//
// Public changelog. Written for tuners, not developers.
// User-visible changes land in `userFacing`; infrastructure / security
// work lives under `behindTheScenes` so it's visible but not front-page.
//
// NOTE: This file is duplicated from 06_App/Frontend/app/changelog/data.ts.
// Planned consolidation into a shared package; keep them in sync manually
// until that lands.

export type ChangelogTag = "Security" | "Infrastructure" | "Product" | "AI";

export type ChangelogItem = {
  title: string;
  tags: ChangelogTag[];
  // string → rendered as a paragraph; string[] → rendered as bullets.
  description: string | string[];
};

export type ChangelogEntry = {
  version: string;
  date: string;          // ISO "YYYY-MM-DD"
  summary?: string;      // one-line release lede
  userFacing: ChangelogItem[];
  behindTheScenes: ChangelogItem[];
};

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: "0.3.1",
    date: "2026-04-20",
    summary:
      "Marketing site tells the story better. Backend research layer gets a second brain — region-locked DB lookups that stay quiet until we feed them.",
    userFacing: [
      {
        title: "Demo section actually shows the product",
        tags: ["Product"],
        description: [
          "The homepage demo used to gesture at what TuneView does.",
          "Now it shows a real B-/81 module card with the penalty breakdown — the thing you'll actually see after a scan.",
          "Cut the floating score-weighting button and the stale scores panel. One clear artifact beats three half-explained ones.",
        ],
      },
      {
        title: "How It Works reads like it was written for a tuner",
        tags: ["Product"],
        description: [
          "Trust chips, tighter step captions, no dev-speak.",
          "If you land on the page cold, you should now understand the pipeline in under ten seconds.",
        ],
      },
      {
        title: "Pricing flags Dragy as coming soon",
        tags: ["Product"],
        description:
          "Dragy integration is on the roadmap but not live. The DIY tier now says so explicitly instead of implying it ships today.",
      },
      {
        title: "Site type is readable again",
        tags: ["Product"],
        description: [
          "Sweep across the marketing site bumped small-type sizes up a notch.",
          "Nothing changed structurally — things just stop straining your eyes.",
        ],
      },
    ],
    behindTheScenes: [
      {
        title: "Research intelligence gets a DB-backed query layer",
        tags: ["AI", "Infrastructure"],
        description: [
          "The pipeline now merges two research sources: the existing rule-based matcher and a new region-locked layer that queries structured patterns from a SQLite knowledge DB.",
          "Region-locking means a pattern only counts if your log actually has the operating region (idle / low pedal / part throttle / WOT) it was derived from.",
          "The DB is optional — if it's not populated, the pipeline falls back to rule-based only. Silent fail-open, by design.",
        ],
      },
      {
        title: "End-of-session protocol codified in CLAUDE.md",
        tags: ["Infrastructure"],
        description:
          "Claude now drafts a changelog entry before every session close instead of waiting to be asked. This entry is the first one it produced on its own.",
      },
    ],
  },
  {
    version: "0.3.0",
    date: "2026-04-19",
    summary:
      "Log upload accepts real HPT files. Fuel-pressure analysis finally works on Gen 5 DI. Adding a vehicle actually flows into the upload. Three silent failures, three fixes.",
    userFacing: [
      {
        title: "Log upload accepts real HPTuners logs",
        tags: ["Product"],
        description: [
          "Upload validator was rejecting every real VCM Scanner CSV.",
          "It was checking the wrong row for column headers — failing before it ever looked at the data.",
          "Fixed. Real HPTuners logs go through.",
        ],
      },
      {
        title: "Fuel pressure analysis works on Gen 5 DI",
        tags: ["Product"],
        description: [
          "Gen 5 DI engines report fuel rail pressure in MPa.",
          "The unit detector only knew kPa and psi.",
          "Every Gen 5 DI log was silently falling through and producing no fuel-pressure results — even WOT pulls that clearly showed pump capacity limits.",
          "Fixed. The module now detects sustained HPFP capacity events — the thing that matters when your pump is at its limit.",
        ],
      },
      {
        title: "Vehicle picker actually sees your builds",
        tags: ["Product"],
        description: [
          "Adding a vehicle from the dashboard used to do nothing for the upload flow.",
          "Saved vehicle went one place; the upload's picker looked somewhere else.",
          "Fixed. Add a vehicle — it shows in your upload picker, and your case rows bind to the right build.",
        ],
      },
      {
        title: "Changelog page live",
        tags: ["Product"],
        description: [
          "app.tuneview.io/changelog",
          "tuneview.io/changelog",
          "No signup, no gating.",
        ],
      },
    ],
    behindTheScenes: [
      {
        title: "Log format recognition consolidated",
        tags: ["Infrastructure"],
        description: [
          "Two of the user-facing bugs above traced to the same cause.",
          "Two separate parts of the code each had their own answer to \"is this an HPT log\" — and they'd drifted apart.",
          "Collapsed to one. A standing rule prevents it from creeping back in.",
        ],
      },
      {
        title: "Region-aware fuel-pressure analytics",
        tags: ["Infrastructure"],
        description: [
          "Errors stratified by operating region: idle / light cruise / moderate load.",
          "Steady vs transient flow separated — a commanded pressure ramp no longer inflates error stats.",
          "Duration-based filtering: one-off noise doesn't count; sustained drops under load do.",
          "When a sustained event fires, the module recommends checking pump duty cycle and inlet vacuum.",
        ],
      },
      {
        title: "Legacy prototype cleanup",
        tags: ["Infrastructure"],
        description: [
          "Removed a dead internal API endpoint from an earlier experimental phase.",
          "Archived the old prototype directory after lifting its useful analytics.",
          "Workbench clearer.",
        ],
      },
    ],
  },
  {
    version: "0.2.0",
    date: "2026-04-19",
    summary:
      "Research companion goes live. Your log now gets matched against known field patterns — not just analyzed in isolation.",
    userFacing: [
      {
        title: "Research companion",
        tags: ["AI", "Product"],
        description:
          "Every analysis now runs through a research layer that matches your log against known Gen 5 patterns — light-load torque-model mismatches, post-change airflow instability, DI rail pressure tracking limits, cold-start flare signatures, TCC strategy conflicts, and a handful more. The layer is region-aware: it only fires a pattern if your log actually contains the operating window it applies to (low-pedal, part-throttle, idle, WOT). Cross-module correlations are surfaced as families — when spark_control + torque_model + throttle_driver_demand all move together, you get a single 'torque/airflow delivery' finding with a recommended focus region instead of three separate flags. The system also remembers confirmed fixes over time; a family that's been resolved before gets a small confidence boost on future matching logs.",
      },
      {
        title: "Password reset flow",
        tags: ["Product"],
        description:
          "The sign-in screen now has a 'Forgot password?' link that sends a reset email. If you get locked out, you recover yourself.",
      },
      {
        title: "api.tuneview.io",
        tags: ["Infrastructure"],
        description:
          "The backend now responds at api.tuneview.io instead of a generic Railway URL. No change in how the app works — but if you ever poke at network requests, everything's on one clean domain now.",
      },
    ],
    behindTheScenes: [
      {
        title: "Backend architecture consolidation",
        tags: ["Infrastructure"],
        description:
          "All Python code now lives under a single app/ package. The prior dual-layout (duplicate modules at repo root and under app/) is gone. 20 root-level dev artifacts cleared out, 5 superseded duplicates deleted, 6 services migrated into app/services/ and app/parsers/. Net effect: next time something needs changing in the pipeline, there's one place to look.",
      },
      {
        title: "Frontend structure cleanup",
        tags: ["Infrastructure"],
        description:
          "The upload page went from 1990 lines to 345 by extracting types, helpers, styles, and eight subcomponents into lib/upload/ and components/upload/. Dashboard got the same treatment: 635 → 480. Nothing changed visually. Everything got easier to change without breaking.",
      },
      {
        title: "Silent analysis bug caught and fixed",
        tags: ["AI"],
        description:
          "The kb_entry_performance view — which powers the trust-weighted ordering on KB suggestions — was silently producing zero success rates because its internal outcome-string comparisons (`'worked'` / `'did_not_work'`) never matched the real values the system actually stores (`'improved'` / `'worse'`). Been broken since it shipped. Fixed in the same migration that added the KB-entry foreign key to recommendation_feedback.",
      },
      {
        title: "Feedback flagging function fixed",
        tags: ["AI", "Security"],
        description:
          "The flag_low_trust_user routine — called after every feedback submission to catch bad-faith users — was silently no-opping in production because it was querying an admin-gated view as a service role. Rewrote it to call a dedicated SECURITY DEFINER RPC instead. It actually runs now.",
      },
      {
        title: "Security hardening",
        tags: ["Security"],
        description:
          "Seven of nine SECURITY DEFINER view advisor warnings cleared. Two more remain by design — they back admin-aggregation views that legitimately need elevated privileges. Listed as a separate item to tackle when there's an admin-bypass design.",
      },
      {
        title: "Recommendation feedback table finalized",
        tags: ["AI", "Infrastructure"],
        description:
          "Added a kb_entry_id foreign key so feedback can finally be attributed to the specific knowledge-base entry that drove a recommendation. Row-level security aligned to the Path 1 identity model. Once feedback data starts flowing, the trust-weighted KB sort will have a real signal to operate on.",
      },
    ],
  },
  {
    version: "0.1.0",
    date: "2026-04-18",
    summary:
      "Foundational beta. Upload a log, get a report, save it, come back to it.",
    userFacing: [
      {
        title: "Anonymous upload claim flow",
        tags: ["Product"],
        description:
          "Drop a log without signing up. The report is yours for 30 days via a claim token stored in your browser. Create an account anytime to save it permanently across devices.",
      },
      {
        title: "Unified app navigation",
        tags: ["Product"],
        description:
          "Dashboard, upload, verify, add-vehicle, and case detail pages now share a single top navigation. Signed-in state shows Dashboard / Upload / Add Vehicle links plus your email and a Sign Out button. Signed-out state shows a single Sign In CTA.",
      },
      {
        title: "Email confirmation lands on your dashboard",
        tags: ["Product"],
        description:
          "New account flow used to drop confirmed users on the anonymous upload page. Now you confirm your email and land directly on your authed dashboard — the 'you're in' moment the flow was missing.",
      },
      {
        title: "Case links route correctly",
        tags: ["Product"],
        description:
          "Clicking a row in the dashboard case history used to try to open a URL on the marketing site that didn't exist, so it 404'd. Now it routes to the full SSR case detail page: grade, safety, confidence, primary issue, metrics grid, module results sorted by severity, and priority-ranked revision steps.",
      },
    ],
    behindTheScenes: [
      {
        title: "User identity standardized across the platform (RLS Path 1)",
        tags: ["Security", "Infrastructure"],
        description:
          "Row-level security across 23 tables now resolves the current user's ID through a single current_app_user_id() helper. Legacy users whose auth.users.id and public.users.id diverged (from older auth flows) were reconciled, so they can see and write their own data again without any workarounds.",
      },
      {
        title: "Add-vehicle write path repaired",
        tags: ["Security"],
        description:
          "The vehicles table insert was broken by the Path 1 migration — it was writing auth.uid() into a column foreign-keyed to public.users.id. Repaired via the current_app_user_id() RPC plus a null-guard for legacy linkage edge cases.",
      },
      {
        title: "Dead API routes removed",
        tags: ["Infrastructure"],
        description:
          "Five Next.js API routes that tried to read from hardcoded Windows absolute paths (left over from an earlier dev pattern) were returning empty stubs in production, had zero frontend callers, and were adding 578 lines of noise. Deleted. Route count 14 → 9.",
      },
    ],
  },
];
