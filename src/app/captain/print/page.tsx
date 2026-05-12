"use client";

import { useEffect } from "react";
import { resume } from "@/data/resume";

const trackLabel: Record<string, string> = {
  saas: "SaaS · Code",
  build: "Design · Build",
  maritime: "Maritime",
  snow: "Mountain Ops",
};

const trackAccent: Record<string, string> = {
  saas: "#0284c7",
  build: "#ea580c",
  maritime: "#005f85",
  snow: "#7dd3fc",
};

export default function CaptainPrintPage() {
  useEffect(() => {
    // Auto-open the print dialog the first time the page loads so the user
    // lands straight on "Save as PDF". Skip on subsequent renders so editing
    // doesn't trigger it.
    const t = setTimeout(() => {
      if (typeof window !== "undefined" && !window.location.hash.includes("noprint")) {
        window.print();
      }
    }, 600);
    return () => clearTimeout(t);
  }, []);

  const {
    identity,
    callings,
    experience,
    vessels,
    certifications,
    awaiting_mmc,
    education,
    highlights,
  } = resume;

  const certByGroup = (g: string) => certifications.filter((c) => c.group === g);

  return (
    <>
      <style>{`
        @page { size: letter; margin: 0.45in; }
        /* Force browsers to preserve background colors when printing
           (and when "Save as PDF" — same engine). Without this,
           Chrome strips the blue header bar and the stat tiles. */
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }
        @media print {
          .no-print { display: none !important; }
          body { background: #fff !important; }
          .page-break { page-break-before: always; }
        }
        body { background: #f3f4f6; }
        .resume-doc {
          color: #111827;
          font-family: "SF Pro Display", "Inter", system-ui, sans-serif;
          font-size: 9.5pt;
          line-height: 1.45;
        }
        .resume-doc h1 { font-size: 22pt; font-weight: 700; letter-spacing: -0.02em; margin: 0; }
        .resume-doc h2 { font-size: 9pt; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #1f2937; margin: 0 0 6pt 0; border-bottom: 1pt solid #d1d5db; padding-bottom: 3pt; }
        .resume-doc h3 { font-size: 10.5pt; font-weight: 700; color: #0f172a; margin: 0; }
        .resume-doc h4 { font-size: 8.5pt; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #475569; margin: 0 0 4pt 0; }
        .resume-doc p { margin: 0; }
        .resume-doc ul { margin: 3pt 0 0 0; padding-left: 12pt; }
        .resume-doc li { margin-bottom: 1.5pt; }
        .resume-doc .muted { color: #4b5563; }
        .resume-doc .accent { color: #0284c7; }
        .resume-doc .pill {
          display: inline-block;
          font-size: 7.5pt;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 1pt 6pt;
          border-radius: 999pt;
          border: 0.6pt solid currentColor;
          margin-bottom: 3pt;
        }
        .resume-doc .chip {
          display: inline-block;
          font-size: 8.5pt;
          padding: 1.5pt 7pt;
          border-radius: 999pt;
          border: 0.6pt solid #cbd5e1;
          background: #fff;
          margin: 0 3pt 3pt 0;
          color: #1f2937;
        }
        .resume-doc .role { margin-bottom: 9pt; }
        .resume-doc .header-bar {
          /* Solid color — gradients render unreliably in Chrome's
             print pipeline even with print-color-adjust set. */
          background: #0284c7;
          color: #fff;
          padding: 14pt 16pt;
          border-radius: 4pt;
          margin-bottom: 12pt;
        }
        .resume-doc .header-bar .tagline { opacity: 0.85; font-style: italic; font-size: 9pt; margin-top: 6pt; }
        .resume-doc .header-bar .meta { opacity: 0.92; font-size: 8.5pt; margin-top: 8pt; }
        .resume-doc .stat-row { display: flex; gap: 14pt; margin-top: 9pt; }
        .resume-doc .stat { flex: 1; text-align: center; padding: 6pt; background: rgba(255,255,255,0.12); border-radius: 3pt; }
        .resume-doc .stat .v { font-size: 12pt; font-weight: 700; }
        .resume-doc .stat .l { font-size: 7pt; letter-spacing: 0.14em; text-transform: uppercase; opacity: 0.85; }
        .resume-doc .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10pt; }
        .resume-doc .grid-3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 8pt; }
        .resume-doc .vessel { border: 0.6pt solid #e5e7eb; border-radius: 3pt; padding: 6pt 8pt; background: #fff; break-inside: avoid; }
        .resume-doc .vessel-name { font-weight: 700; font-size: 9.5pt; color: #0f172a; }
        .resume-doc .vessel-spec { font-size: 7.5pt; color: #6b7280; }
        .resume-doc .vessel-line { font-size: 8pt; color: #374151; margin-top: 2pt; }
        .resume-doc .section { margin-bottom: 11pt; }
        .resume-doc .role-head { display: flex; justify-content: space-between; align-items: baseline; gap: 8pt; }
        .resume-doc .role-dates { font-size: 8pt; color: #6b7280; white-space: nowrap; }
        .resume-doc .role-sub { font-size: 8.5pt; color: #334155; margin-top: 1pt; }
      `}</style>

      <div className="no-print" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "#0f172a", color: "#fff", padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 13 }}>
          Resume print view — use Cmd+P (or click) to save as PDF
        </span>
        <span style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => window.print()}
            style={{ background: "linear-gradient(135deg, #0091cc, #0ea5e9)", color: "#fff", padding: "6px 14px", borderRadius: 999, border: 0, fontSize: 13, fontWeight: 500, cursor: "pointer" }}
          >
            Print / Save as PDF
          </button>
          <a
            href="/captain"
            style={{ color: "rgba(255,255,255,0.7)", padding: "6px 14px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.2)", fontSize: 13, textDecoration: "none" }}
          >
            Back to web view
          </a>
        </span>
      </div>

      <div style={{ padding: "60px 20px 40px", display: "flex", justifyContent: "center" }} className="print:!p-0">
        <div
          className="resume-doc"
          style={{
            width: "8.5in",
            background: "#fff",
            padding: "0.45in",
            boxShadow: "0 10px 40px rgba(0,0,0,0.18)",
          }}
        >
          {/* Header */}
          <div className="header-bar">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
              <div>
                <h1 style={{ color: "#fff" }}>{identity.full_name}</h1>
                <p style={{ marginTop: 4, fontSize: "10.5pt", fontWeight: 500, opacity: 0.95 }}>
                  {identity.headline}
                </p>
                <p className="tagline">&ldquo;{identity.tagline}&rdquo;</p>
              </div>
              <div style={{ textAlign: "right", fontSize: "8.5pt", lineHeight: 1.5, opacity: 0.92 }}>
                <div>{identity.email}</div>
                <div>{identity.phone}</div>
                {identity.addresses.map((a) => (
                  <div key={a.label} style={{ opacity: 0.85 }}>{a.line}</div>
                ))}
              </div>
            </div>
            <div className="stat-row">
              {highlights.map((h) => (
                <div className="stat" key={h.label}>
                  <div className="v">{h.value}</div>
                  <div className="l">{h.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="section">
            <h2>Summary</h2>
            <p>{identity.summary}</p>
          </div>

          {/* Three callings */}
          <div className="section">
            <h2>Three callings</h2>
            <div className="grid-3">
              {callings.map((c) => (
                <div key={c.title} style={{ border: `0.7pt solid ${trackAccent[c.track]}40`, borderRadius: 3, padding: "6pt 8pt", background: `${trackAccent[c.track]}08` }}>
                  <div style={{ fontSize: "7.5pt", letterSpacing: "0.16em", textTransform: "uppercase", color: trackAccent[c.track], fontWeight: 600 }}>{c.label}</div>
                  <div style={{ fontWeight: 700, fontSize: "11pt", color: "#0f172a", margin: "2pt 0 3pt 0" }}>{c.title}</div>
                  <div style={{ fontSize: "8pt", color: "#374151", lineHeight: 1.4 }}>{c.detail}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="section">
            <h2>Professional experience</h2>
            {experience.map((role, i) => (
              <div className="role" key={`${role.company}-${i}`}>
                <div className="role-head">
                  <div>
                    <span className="pill" style={{ color: trackAccent[role.track] }}>
                      {trackLabel[role.track]}
                    </span>
                    <h3>{role.title}</h3>
                    <div className="role-sub">
                      <span style={{ color: trackAccent[role.track], fontWeight: 600 }}>{role.company}</span>
                      <span className="muted"> · {role.location}</span>
                    </div>
                  </div>
                  <div className="role-dates">{role.start} — {role.end}</div>
                </div>
                <ul>
                  {role.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="page-break" />

          {/* Vessels */}
          <div className="section">
            <h2>Vessels captained</h2>
            <div className="grid-2">
              {vessels.map((v) => (
                <div className="vessel" key={v.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span className="vessel-name">{v.name}</span>
                    <span className="vessel-spec">{v.period}</span>
                  </div>
                  <div className="vessel-spec" style={{ color: trackAccent.maritime }}>{v.classification}</div>
                  <div className="vessel-line">
                    {v.gross_tons ? `${v.gross_tons} GT · ` : ""}{v.length_ft}′{v.hp ? ` · ${v.hp} hp` : ""}
                  </div>
                  <div className="vessel-line muted">
                    <strong style={{ color: "#0f172a" }}>Waters:</strong> {v.waters}
                  </div>
                  <div className="vessel-line muted">
                    <strong style={{ color: "#0f172a" }}>Duty:</strong> {v.duty} · <strong style={{ color: "#0f172a" }}>Position:</strong> {v.position}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="section">
            <h2>Certifications & IDs</h2>
            <CertGroup title="USCG licenses & ratings" items={certByGroup("license")} />
            <CertGroup title="STCW" items={certByGroup("stcw")} />
            <CertGroup title="Safety & rescue" items={certByGroup("safety")} />
            <CertGroup title="Firefighting" items={certByGroup("fire")} />
            <CertGroup title="Identification" items={certByGroup("id")} />

            <div style={{ marginTop: 8 }}>
              <h4>Awaiting return on filed MMC</h4>
              <div>
                {awaiting_mmc.map((c) => (
                  <span className="chip" key={c} style={{ borderColor: "#f59e0b", color: "#92400e", background: "#fef3c7" }}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="section">
            <h2>Education</h2>
            <div className="grid-2">
              <div>
                <h3>{education.school}</h3>
                <div className="muted">{education.school_location} · {education.period}</div>
                <p style={{ marginTop: 3 }}>{education.degree}</p>
              </div>
              <div>
                <h4>Activities</h4>
                <ul style={{ paddingLeft: 12 }}>
                  {education.activities.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 14, paddingTop: 10, borderTop: "0.6pt solid #e5e7eb", fontSize: "7.5pt", color: "#9ca3af", textAlign: "center", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            bluewaveprojects.com/captain · ikenagroup.com · Generated from a single editable source file
          </div>
        </div>
      </div>
    </>
  );
}

function CertGroup({ title, items }: { title: string; items: { name: string }[] }) {
  if (items.length === 0) return null;
  return (
    <div style={{ marginBottom: 5 }}>
      <h4>{title}</h4>
      <div>
        {items.map((c) => (
          <span className="chip" key={c.name}>{c.name}</span>
        ))}
      </div>
    </div>
  );
}
