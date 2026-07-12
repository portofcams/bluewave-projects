import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { DemoTracking } from "@/components/DemoTracking";

// UNLISTED + NOINDEX, like everything under /demos — shared by hand.
export const metadata: Metadata = {
  title: "Clearspar Heli — Native iOS + watchOS (Product Concept)",
  description:
    "A heli-ski operation in two native SwiftUI apps — the guest's trip companion and the crew's ops board, with Apple Watch companions — built on one rule: nothing on screen is ever faked. Captured live from the sixth TestFlight build, sample data throughout.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

const IMG = "/demos/clearspar-heli-ios";

type Screen = {
  img: string;
  side: "left" | "right";
  accent: "ice" | "dawn";
  eyebrow: string;
  title: string;
  body: string; // trusted inline HTML, authored here
};

const SCREENS: Screen[] = [
  {
    img: "guest-trip",
    side: "right",
    accent: "dawn",
    eyebrow: "GUEST · YOUR TRIP",
    title: "The trip, in the guest's pocket",
    body:
      "Itinerary, guide, aircraft, zone, and an honest <b>Checked in safe</b> — capped with an <em>informational companion only — not a safety-of-life system</em> disclaimer, because it isn't one. The guest sees their own trip and nothing else; access is enforced on the server, not hidden in the app.",
  },
  {
    img: "board",
    side: "left",
    accent: "ice",
    eyebrow: "OPS · THE DAY'S BOARD",
    title: "Everything the crew needs, before wheels-up",
    body:
      "Group, guide, aircraft, and the full guest manifest — medical flags surfaced up front (<span class='flag'>bee-sting allergy — EpiPen carried</span>, <span class='flag'>Type-1 diabetic</span>), weights, gear, total load. The red <span class='crit'>CHECK-IN OVERDUE · 2,804 min</span> is a real caution, shown at full strength — never softened to look tidy.",
  },
  {
    img: "fuel",
    side: "right",
    accent: "ice",
    eyebrow: "OPS · FUEL & ENDURANCE",
    title: "Numbers you can stake a flight on",
    body:
      "Red sits at the actual <span class='mono'>14 CFR 135.209(b)</span> 20-minute VFR reserve — cited in the app, not a color picked for drama. Amber is labeled outright as <em>a display heuristic, not a regulatory limit</em>. And where the operation hasn't entered fuel, it reads <b>Fuel not reported</b> — not a fabricated gauge.",
  },
  {
    img: "map",
    side: "left",
    accent: "ice",
    eyebrow: "OPS · FLIGHT FOLLOWING",
    title: "The fleet on the mountain",
    body:
      "MapKit satellite terrain over Thompson Pass, the helicopters and a snowcat tracked by tail number. The feed is badged <b>Sim feed (sample)</b>, and a fix-age legend (<span class='dot g'></span>&lt;2m <span class='dot a'></span>2–5m <span class='dot r'></span>&gt;5m) means a stale position reads as stale, not as truth.",
  },
  {
    img: "conditions",
    side: "right",
    accent: "ice",
    eyebrow: "OPS · CONDITIONS GATE",
    title: "Unknown is never green",
    body:
      "The weather-minima gate reads <b>UNKNOWN</b> until an operator sets thresholds — it will not fake a go. Observations show <span class='mono'>—</span> when nothing's been fetched, and the avalanche hazard is operator-entered, timestamped, and explicitly <em>never an outside authority's rating</em>.",
  },
  {
    img: "guest-login",
    side: "left",
    accent: "dawn",
    eyebrow: "GUEST · ACCESS",
    title: "Accounts, not sign-ups",
    body:
      "Guests sign in with the account their operator provisioned; staff use the separate Field app. Even the sign-in screen can reach the live <b>About &amp; connection</b> readout — real reachability, version, and which backend it's pointed at — so a tester who can't log in can still file a useful report.",
  },
];

const BUILT: [string, string][] = [
  ["Native, end to end", "Two SwiftUI apps plus watchOS companions — iOS 17, no cross-platform runtime, no third-party UI SDKs. Live Activities, Home Screen widgets, Face ID, EventKit, MapKit, all Apple-native."],
  ["A watch that can't lie", "The Apple Watch app carries no networking of its own. A wrist check-in relays through the phone and only turns green on the server's real 2xx — never an optimistic guess."],
  ["Honest by construction", "Missing data says <b>not set</b>. A stale fix says stale. A gate with no minima says UNKNOWN. The one rule the whole platform is built around: nothing on screen is faked."],
  ["Shipped, not staged", "Six TestFlight builds across both apps in a single run — widgets, watch apps, flight-following, fuel, accessibility, real icons — each archived, validated, and delivered."],
];

const CSS = `
.cs-wrap{--ground:#090d12;--surface:#111a23;--line:#243441;--ink:#e9eff5;--dim:#94a5b4;--faint:#5d6e7d;
  --ice:#79d1e8;--aurora:#6fcf9a;--dawn:#e7b478;--amber:#e2ad70;--red:#e67f76;
  --mono:ui-monospace,"SF Mono","JetBrains Mono",Menlo,Consolas,monospace;
  background:var(--ground);color:var(--ink);line-height:1.62;-webkit-font-smoothing:antialiased;
  background-image:radial-gradient(120% 60% at 50% -6%,rgba(111,207,154,.10),transparent 55%),radial-gradient(80% 44% at 82% 3%,rgba(121,209,232,.10),transparent 60%);}
.cs-wrap *{box-sizing:border-box}
.cs-wrap .in{max-width:1080px;margin:0 auto;padding:0 28px}
.cs-wrap .mono{font-family:var(--mono)}
.cs-wrap em{font-style:normal;color:var(--dawn);font-family:var(--mono);font-size:.94em}
.cs-wrap b{font-weight:650;color:#fff}
.cs-wrap .hero{padding:120px 0 40px;text-align:center}
.cs-wrap .icons{display:flex;gap:20px;justify-content:center;margin-bottom:30px}
.cs-wrap .icons img{width:74px;height:74px;border-radius:18px;border:1px solid var(--line);box-shadow:0 12px 34px rgba(0,0,0,.55)}
.cs-wrap .kicker{font-family:var(--mono);font-size:12px;letter-spacing:.3em;text-transform:uppercase;color:var(--ice);margin-bottom:20px}
.cs-wrap h1{font-size:clamp(2.5rem,6.4vw,4.4rem);line-height:1.03;letter-spacing:-.03em;font-weight:800;margin:0;text-wrap:balance;background:linear-gradient(180deg,#fff,#b9c8d6);-webkit-background-clip:text;background-clip:text;color:transparent}
.cs-wrap .lede{max-width:40ch;margin:20px auto 0;color:var(--dim);font-size:1.16rem;text-wrap:balance}
.cs-wrap .rule{max-width:1080px;margin:60px auto 0;height:1px;background:linear-gradient(90deg,transparent,var(--line) 20%,var(--line) 80%,transparent)}
.cs-wrap .band{padding:76px 0 6px}
.cs-wrap .band .eyebrow{font-family:var(--mono);font-size:12px;letter-spacing:.28em;text-transform:uppercase}
.cs-wrap .eyebrow--ice{color:var(--ice)}
.cs-wrap .eyebrow--dawn{color:var(--dawn)}
.cs-wrap .band h2{font-size:clamp(1.8rem,3.6vw,2.6rem);letter-spacing:-.02em;margin:.5rem 0 .4rem;font-weight:750}
.cs-wrap .band p{max-width:56ch;color:var(--dim);margin:0;font-size:1.05rem}
.cs-wrap .rows{display:flex;flex-direction:column;gap:10px;padding-top:26px}
.cs-wrap .row{display:grid;grid-template-columns:minmax(0,300px) minmax(0,1fr);gap:clamp(28px,5vw,64px);align-items:center;padding:28px 0}
.cs-wrap .row--right{grid-template-columns:minmax(0,1fr) minmax(0,300px)}
.cs-wrap .device{justify-self:center;width:100%;max-width:300px;border-radius:34px;padding:8px;background:linear-gradient(160deg,#1b2732,#0d141b);border:1px solid var(--line);box-shadow:0 30px 70px -24px rgba(0,0,0,.85),inset 0 1px 0 rgba(255,255,255,.05)}
.cs-wrap .device img{display:block;width:100%;border-radius:27px}
.cs-wrap .cap h3{font-size:1.5rem;letter-spacing:-.015em;margin:.5rem 0 .55rem;font-weight:700;text-wrap:balance}
.cs-wrap .cap p{color:var(--dim);margin:0;font-size:1.04rem;max-width:44ch}
.cs-wrap .cap .eyebrow{font-family:var(--mono);font-size:11.5px;letter-spacing:.26em;text-transform:uppercase}
.cs-wrap .flag{color:var(--amber);font-family:var(--mono);font-size:.92em}
.cs-wrap .crit{color:var(--red);font-family:var(--mono);font-size:.92em;font-weight:600}
.cs-wrap .dot{display:inline-block;width:.6em;height:.6em;border-radius:50%;margin:0 .1em 0 .5em}
.cs-wrap .dot.g{background:var(--aurora)}.cs-wrap .dot.a{background:var(--amber)}.cs-wrap .dot.r{background:var(--red)}
.cs-wrap .built{margin:66px 0 0;padding:52px 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);background:linear-gradient(180deg,rgba(121,209,232,.035),transparent)}
.cs-wrap .built .eyebrow{font-family:var(--mono);font-size:12px;letter-spacing:.28em;text-transform:uppercase;color:var(--ice);margin-bottom:24px}
.cs-wrap .grid{display:grid;grid-template-columns:repeat(2,1fr);gap:26px 40px}
.cs-wrap .brick h4{margin:0 0 .35rem;font-size:1.05rem;font-weight:680;color:#fff}
.cs-wrap .brick p{margin:0;color:var(--dim);font-size:.98rem}
.cs-wrap .foot{padding:24px 0 72px;color:var(--faint);font-family:var(--mono);font-size:12px;display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap}
.cs-wrap .foot .l{color:var(--dim)}
@media (max-width:760px){
  .cs-wrap .row,.cs-wrap .row--right{grid-template-columns:1fr;gap:22px;padding:16px 0}
  .cs-wrap .cap{order:2}.cs-wrap .device{order:1}
  .cs-wrap .grid{grid-template-columns:1fr}
  .cs-wrap .hero{padding:96px 0 24px}
}
`;

function Device({ img, alt }: { img: string; alt: string }) {
  return (
    <div className="device">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img loading="lazy" src={`${IMG}/${img}.jpg`} alt={alt} />
    </div>
  );
}

export default function ClearsparHeliIosPage() {
  return (
    <main className="min-h-screen bg-[#090d12]">
      <Nav />
      <DemoTracking demo="clearspar-heli-ios" />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="cs-wrap">
        <header className="hero">
          <div className="in">
            <div className="icons">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${IMG}/icon-guest.png`} alt="Clearspar Heli guest app icon" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${IMG}/icon-field.png`} alt="Clearspar Field ops app icon" />
            </div>
            <div className="kicker">Native iOS · watchOS · heli-ski operations</div>
            <h1>Clearspar Heli</h1>
            <p className="lede">
              A helicopter-skiing operation in two native apps — the guest&apos;s trip companion and the crew&apos;s ops board — built on one rule: <b>nothing on screen is ever faked.</b>
            </p>
          </div>
          <div className="rule" />
        </header>

        <div className="in">
          <section className="band">
            <div className="eyebrow eyebrow--dawn">The guest side</div>
            <h2>What the skier carries</h2>
            <p>A light, calm companion for the person on the trip — their day, their guide, their check-in status — honest about exactly what it is and isn&apos;t.</p>
          </section>
          <div className="rows">
            {SCREENS.filter((s) => s.accent === "dawn").map((s) => (
              <div key={s.img} className={`row row--${s.side}`}>
                {s.side === "left" && <Device img={s.img} alt={s.title} />}
                <div className="cap">
                  <div className={`eyebrow eyebrow--${s.accent}`}>{s.eyebrow}</div>
                  <h3>{s.title}</h3>
                  <p dangerouslySetInnerHTML={{ __html: s.body }} />
                </div>
                {s.side === "right" && <Device img={s.img} alt={s.title} />}
              </div>
            ))}
          </div>

          <section className="band">
            <div className="eyebrow eyebrow--ice">The ops side</div>
            <h2>What the crew runs on</h2>
            <p>A dark, dense companion for the people responsible for the aircraft and the day. Every board here is assembled from the operation&apos;s real feed — and every gap is shown as a gap.</p>
          </section>
          <div className="rows">
            {SCREENS.filter((s) => s.accent === "ice").map((s) => (
              <div key={s.img} className={`row row--${s.side}`}>
                {s.side === "left" && <Device img={s.img} alt={s.title} />}
                <div className="cap">
                  <div className={`eyebrow eyebrow--${s.accent}`}>{s.eyebrow}</div>
                  <h3>{s.title}</h3>
                  <p dangerouslySetInnerHTML={{ __html: s.body }} />
                </div>
                {s.side === "right" && <Device img={s.img} alt={s.title} />}
              </div>
            ))}
          </div>
        </div>

        <section className="built">
          <div className="in">
            <div className="eyebrow">How it&apos;s built</div>
            <div className="grid">
              {BUILT.map(([t, b]) => (
                <div key={t} className="brick">
                  <h4>{t}</h4>
                  <p dangerouslySetInnerHTML={{ __html: b }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="in">
          <div className="foot">
            <span className="l">Clearspar Heli — native SwiftUI · watchOS · live FastAPI backend</span>
            <span>Captured from build 6 · sample data throughout</span>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
