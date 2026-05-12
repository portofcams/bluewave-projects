"use client";

import { useEffect } from "react";
import { resume } from "@/data/resume";

const stageColor: Record<string, string> = {
  "live-production": "#059669",
  "saas-shipping": "#0284c7",
  "saas-subscription": "#005f85",
  "ios-shipped": "#ea580c",
  "shipped-portfolio": "#64748b",
};

const stageLabel: Record<string, string> = {
  "live-production": "Live in production",
  "saas-shipping": "SaaS · signup open",
  "saas-subscription": "Subscription",
  "ios-shipped": "iOS shipped",
  "shipped-portfolio": "Portfolio",
};

export default function WorkPrintPage() {
  useEffect(() => {
    const t = setTimeout(() => {
      if (typeof window !== "undefined" && !window.location.hash.includes("noprint")) {
        window.print();
      }
    }, 600);
    return () => clearTimeout(t);
  }, []);

  const { identity, engineer, velocity, stack, products, ai_evidence, remote_fit, experience, education } = resume;

  return (
    <>
      <style>{`
        @page { size: letter; margin: 0.4in; }
        @media print {
          .no-print { display: none !important; }
          body { background: #fff !important; }
          .page-break { page-break-before: always; }
        }
        body { background: #f3f4f6; }
        .doc {
          color: #0f172a;
          font-family: "SF Pro Display", "Inter", system-ui, sans-serif;
          font-size: 9pt;
          line-height: 1.42;
        }
        .doc h1 { font-size: 22pt; font-weight: 700; letter-spacing: -0.02em; margin: 0; color: #fff; }
        .doc h2 { font-size: 8.5pt; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #0f172a; margin: 0 0 5pt 0; padding-bottom: 3pt; border-bottom: 1pt solid #cbd5e1; }
        .doc h3 { font-size: 10pt; font-weight: 700; color: #0f172a; margin: 0; }
        .doc h4 { font-size: 8pt; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #475569; margin: 0 0 3pt 0; }
        .doc p { margin: 0; }
        .doc .muted { color: #4b5563; }
        .doc .accent { color: #0284c7; }
        .doc .section { margin-bottom: 10pt; }
        .doc .header-bar {
          background: linear-gradient(135deg, #0284c7, #005f85);
          color: #fff;
          padding: 12pt 14pt;
          border-radius: 4pt;
          margin-bottom: 10pt;
        }
        .doc .header-bar p { color: rgba(255,255,255,0.92); }
        .doc .header-meta { font-size: 8pt; opacity: 0.9; }
        .doc .stat-row { display: grid; grid-template-columns: repeat(6, 1fr); gap: 6pt; margin-top: 9pt; }
        .doc .stat { background: rgba(255,255,255,0.12); border-radius: 3pt; padding: 4pt 5pt; }
        .doc .stat .v { font-size: 11pt; font-weight: 700; line-height: 1; }
        .doc .stat .l { font-size: 6.5pt; letter-spacing: 0.1em; text-transform: uppercase; opacity: 0.88; margin-top: 2pt; }
        .doc .product { border: 0.6pt solid #e5e7eb; border-radius: 3pt; padding: 6pt 8pt; background: #fff; break-inside: avoid; }
        .doc .product-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 6pt; margin-bottom: 3pt; }
        .doc .stage-pill { display: inline-block; font-size: 6.5pt; padding: 0.5pt 5pt; border-radius: 999pt; border: 0.6pt solid currentColor; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 600; }
        .doc .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 7pt; }
        .doc .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 7pt; }
        .doc ul { margin: 2pt 0 0 0; padding-left: 12pt; }
        .doc li { margin-bottom: 1pt; }
        .doc .stack-card { border: 0.6pt solid #e5e7eb; border-radius: 3pt; padding: 5pt 7pt; background: #fff; break-inside: avoid; }
        .doc .stack-card ul { margin: 2pt 0 0 0; padding-left: 0; list-style: none; }
        .doc .stack-card li { font-size: 8pt; color: #1f2937; margin-bottom: 0.5pt; }
        .doc .evidence { border-left: 2pt solid #0284c7; padding: 3pt 0 3pt 7pt; margin-bottom: 5pt; background: #f8fafc; }
      `}</style>

      <div className="no-print" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "#0f172a", color: "#fff", padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 13 }}>
          Engineering résumé — print view (Cmd+P → Save as PDF)
        </span>
        <span style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => window.print()}
            style={{ background: "linear-gradient(135deg, #0091cc, #0ea5e9)", color: "#fff", padding: "6px 14px", borderRadius: 999, border: 0, fontSize: 13, fontWeight: 500, cursor: "pointer" }}
          >
            Print / Save as PDF
          </button>
          <a href="/work" style={{ color: "rgba(255,255,255,0.7)", padding: "6px 14px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.2)", fontSize: 13, textDecoration: "none" }}>
            Back to web
          </a>
        </span>
      </div>

      <div style={{ padding: "60px 20px 40px", display: "flex", justifyContent: "center" }}>
        <div className="doc" style={{ width: "8.5in", background: "#fff", padding: "0.4in", boxShadow: "0 10px 40px rgba(0,0,0,0.18)" }}>
          {/* Header */}
          <div className="header-bar">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 14 }}>
              <div style={{ flex: 1 }}>
                <h1>{identity.full_name}</h1>
                <p style={{ marginTop: 3, fontSize: "10.5pt", fontWeight: 500 }}>{engineer.headline}</p>
                <p style={{ marginTop: 6, fontSize: "8.5pt", opacity: 0.92, lineHeight: 1.5 }}>{engineer.pitch}</p>
              </div>
              <div style={{ textAlign: "right", fontSize: "8pt", lineHeight: 1.5, opacity: 0.92, minWidth: "1.7in" }}>
                <div style={{ fontWeight: 600 }}>{identity.email}</div>
                <div>{identity.phone}</div>
                <div className="header-meta">{engineer.location}</div>
                <div className="header-meta" style={{ marginTop: 4 }}>{engineer.availability}</div>
                <div style={{ marginTop: 6, fontSize: "7.5pt" }}>
                  {identity.links.map((l) => (
                    <div key={l.url}>{l.url.replace(/^https?:\/\//, "")}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className="stat-row">
              {velocity.map((v) => (
                <div className="stat" key={v.label}>
                  <div className="v">{v.value}</div>
                  <div className="l">{v.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* What I ship */}
          <div className="section">
            <h2>What I ship · 12+ live or shipping products</h2>
            <div className="grid-2">
              {products.map((p) => (
                <div className="product" key={p.name}>
                  <div className="product-head">
                    <div>
                      <h3>{p.name}</h3>
                      <div className="muted" style={{ fontSize: "7.5pt" }}>{p.domain}</div>
                    </div>
                    <span className="stage-pill" style={{ color: stageColor[p.stage] }}>
                      {stageLabel[p.stage]}
                    </span>
                  </div>
                  <p style={{ fontSize: "8pt", color: "#1f2937", marginTop: 3, lineHeight: 1.4 }}>{p.summary}</p>
                  <div style={{ marginTop: 4, paddingTop: 3, borderTop: "0.4pt solid #e5e7eb", fontSize: "7.5pt", color: "#475569" }}>
                    <div><strong style={{ color: "#0f172a" }}>Stack:</strong> {p.stack}</div>
                    <div><strong style={{ color: "#0f172a" }}>Role:</strong> {p.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="page-break" />

          {/* AI in production */}
          <div className="section">
            <h2>AI in production · what &apos;LLM-in-loop&apos; actually means</h2>
            {ai_evidence.map((e, i) => (
              <div className="evidence" key={i}>
                <p style={{ fontSize: "8.5pt", color: "#1f2937", lineHeight: 1.45 }}>{e}</p>
              </div>
            ))}
          </div>

          {/* Stack */}
          <div className="section">
            <h2>Stack · production-fluent</h2>
            <div className="grid-3">
              {stack.map((g) => (
                <div className="stack-card" key={g.group}>
                  <h4 style={{ color: "#0284c7" }}>{g.group}</h4>
                  <ul>
                    {g.items.map((t) => (
                      <li key={t}>· {t}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Why hire */}
          <div className="section">
            <h2>Why a remote SaaS / AI company hires me</h2>
            <div className="grid-2">
              {remote_fit.map((r) => (
                <div key={r.title} style={{ marginBottom: 5 }}>
                  <h4 style={{ color: "#0f172a", letterSpacing: 0.08 }}>{r.title}</h4>
                  <p style={{ fontSize: "8pt", color: "#334155", lineHeight: 1.4 }}>{r.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Background */}
          <div className="section">
            <h2>Operations background · before code</h2>
            <p style={{ fontSize: "8pt", color: "#475569", marginBottom: 5 }}>
              Maritime captain → design-build operator → SaaS founder. Software is the third career; the first two taught me how to ship. Full operator résumé at bluewaveprojects.com/captain.
            </p>
            <div className="grid-2">
              {experience.slice(0, 4).map((role) => (
                <div key={role.company} style={{ borderLeft: `2pt solid ${stageColor["saas-shipping"]}`, paddingLeft: 7, marginBottom: 5 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 6 }}>
                    <h3 style={{ fontSize: "9pt" }}>{role.title}</h3>
                    <span className="muted" style={{ fontSize: "7.5pt" }}>{role.start} — {role.end}</span>
                  </div>
                  <p style={{ fontSize: "7.5pt", color: "#0284c7", fontWeight: 600 }}>{role.company} · {role.location}</p>
                  <p style={{ fontSize: "7.5pt", color: "#1f2937", marginTop: 2, lineHeight: 1.4 }}>{role.bullets[0]}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="section">
            <h2>Education</h2>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
              <div>
                <h3>{education.school}</h3>
                <p style={{ fontSize: "8pt", color: "#475569" }}>{education.degree}</p>
              </div>
              <div className="muted" style={{ fontSize: "7.5pt", whiteSpace: "nowrap" }}>{education.school_location} · {education.period}</div>
            </div>
          </div>

          <div style={{ marginTop: 12, paddingTop: 8, borderTop: "0.6pt solid #e5e7eb", fontSize: "7pt", color: "#9ca3af", textAlign: "center", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            bluewaveprojects.com/work · {identity.email} · {identity.phone}
          </div>
        </div>
      </div>
    </>
  );
}
