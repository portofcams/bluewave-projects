export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  categoryColor: string;
  gradient: string;
  author: {
    name: string;
    role: string;
  };
}

// 2026-05-10: Cleared all 22 prior AI-agency posts (now 410'd at the
// edge via public functions/blog/[slug].ts). New contractor-focused
// posts ship here. Each one targets a real long-tail search query
// where a working GC would land — building topical authority for the
// contractor-SaaS positioning.

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "roomplan-vs-matterport-vs-polycam-for-contractors",
    title: "RoomPlan vs Matterport vs Polycam: which one belongs in your contractor's toolkit?",
    excerpt:
      "Three LiDAR-era scanning tools, three different jobs. A working design-build contractor breaks down what each one is actually good for on a job site — and where each one breaks.",
    date: "2026-05-10",
    readTime: "8 min",
    category: "Tools",
    categoryColor: "text-ocean-400",
    gradient: "from-ocean-500 to-wave-400",
    author: {
      name: "John Thomas",
      role: "Founder, Ikena Design & Build",
    },
    content: `If you're a contractor in 2026 trying to figure out which 3D scanning tool to put in your truck, you've probably stumbled into the same alphabet soup I did: RoomPlan, Matterport, Polycam, Canvas, NavVis, Leica, Trimble. The marketing makes them all sound interchangeable. They aren't. I've used most of them on real job sites and the differences are big enough that picking wrong wastes hours per project.

Here's how each one actually performs in the field.

## RoomPlan (Apple, iOS 16+)

**What it is:** A free API Apple ships with iOS that turns a 30-second walkthrough into a parametric 3D model — walls, doors, windows, furniture, all as labeled objects, not just a mesh.

**What it's great at:**
- Speed. From "open the app" to "have a usable model" is under a minute for a typical room.
- Parametric output. You get individual wall objects with positions, rotations, and dimensions — not a triangulated blob. That means you can edit them, generate a blueprint from them, and feed them into a scope generator.
- Free. No subscription. No watermark. No per-scan fee.
- Multi-room stitching (iOS 17+). Walk between rooms and it builds the merged floor plan.

**Where it breaks:**
- Outdoors and large open spaces — LiDAR range tops out around 5m, and the algorithm wants walls to anchor on.
- Furniture-heavy rooms. It'll detect a sofa but won't tell you what kind, and it'll sometimes call a kitchen island "Storage."
- Tall ceilings (above ~3.5m / 12ft). The eye-level scan position leaves the top of the wall guessed.
- Multi-floor properties. It treats each floor as a separate scan; merging them is on you.

**Verdict:** This is the daily driver for renovation scopes. If you walk a kitchen, a bathroom, or a bedroom-sized space, RoomPlan gives you everything you need to send a phase-by-phase scope of work in under 10 minutes total. We built our scope generator around it because the parametric output is exactly what a scoping tool wants to ingest.

## Matterport (Pro2, Axis, or LiDAR-Pro phone)

**What it is:** A 3D walkthrough platform — capture, hosting, embed-on-your-website, virtual tour. The Pro2 camera is a $4,000 tripod-mounted unit; the phone app uses LiDAR.

**What it's great at:**
- Marketing assets. A Matterport tour is a real estate or contractor's sales tool — you embed it on your portfolio page and it sells the work.
- Measurement accuracy on high-end hardware. The Pro2 is sub-1% on a 20-foot run.
- Cloud hosting handled for you. Share a link, anyone can walk the space in a browser.

**Where it breaks:**
- Cost. The hardware is $4K and the cloud hosting is $69-$309/month per active model count. For a contractor scoping a project, that math doesn't pencil.
- Output format. You get a tour, not a parametric model. You can extract a floor plan but it's a static export, not something a scope generator can edit.
- Workflow time. A full Pro2 capture of a 2,500 sqft house is 45-90 minutes. RoomPlan is 10-15 minutes for the same.

**Verdict:** Matterport is a great marketing layer once a job is done — embed the finished space in your portfolio, send the tour to the next prospect. It is the wrong tool for scoping. Use it after the work, not before.

## Polycam

**What it is:** A photogrammetry + LiDAR app for iOS and Android (Android is photogrammetry only). Captures meshes, point clouds, and rough room layouts.

**What it's great at:**
- Object capture. Single objects — a piece of furniture, a fixture, a stair detail — come out crisp.
- Android support (which Apple's RoomPlan doesn't have).
- Mesh export to Blender, SketchUp, Revit. Designers like it because they can pull the mesh into their CAD workflow.

**Where it breaks:**
- Room scans are messier than RoomPlan. Polycam's room mode is photogrammetry-driven and the walls come out slightly off (a few cm) and not parametric — you can't edit individual walls cleanly.
- Doors and windows aren't called out as separate objects.
- Pricing tiers. Free version watermarks; the contractor tier is $39/month.

**Verdict:** Polycam is the right tool for capturing a specific feature you need to replicate (a built-in cabinet, an existing trim profile, a stair stringer). It is the wrong tool for whole-room scoping if you have an iPhone with LiDAR — RoomPlan is free, faster, and produces output a scope generator can actually use.

## What about Canvas, NavVis, Leica, Trimble?

These are higher-end scanning platforms ($5K-$50K hardware) used in commercial construction, BIM workflows, and large-scale renovation by firms with full-time scan operators. If you're running a 5-50 person design-build shop, you're not their customer — yet. We may add NavVis-tier ingest support in BlueWave Projects later, but it's not the right starting point.

## The contractor's stack we actually use

For our own jobs (renovations, additions, custom homes in Honolulu) the workflow is:

1. **First site walk → RoomPlan.** Capture the rooms, get a parametric model in the cloud within minutes.
2. **Specific details → Polycam.** Existing trim, a stair detail, an antique fixture worth replicating.
3. **Final marketing → Matterport.** Once the work is done, capture the finished space for the portfolio.

Each tool does one job well. Don't try to make one of them do all three.

## Where BlueWave Projects fits

We ingest RoomPlan parametric output directly. Drop the scan into your BlueWave tenant, the [scope generator](/scope) reads it, asks two clarifying questions, and writes a phase-by-phase scope of work in 60 seconds. The model lives in your project room — clients see it on a public timeline link, your crew sees it in the blueprint editor.

If you're still scoping renovations by hand because the tools you tried felt wrong, [book a demo](/booking) and try the RoomPlan → scope flow on your next walk-through. The whole loop, from boots on site to scope in the client's inbox, is under 20 minutes.`,
  },
  {
    id: "2",
    slug: "hawaii-get-tax-for-contractors-237-13-3-b",
    title: "Hawaii GET tax for contractors: how the §237-13(3)(B) sub-deduction actually works",
    excerpt:
      "Every Hawaii GC who hires subs is leaving money on the table if they don't understand §237-13(3)(B). A plain-English breakdown of the sub-deduction, what counts, what doesn't, and how to track it.",
    date: "2026-05-09",
    readTime: "6 min",
    category: "Hawaii compliance",
    categoryColor: "text-lava-500",
    gradient: "from-lava-500 to-amber-400",
    author: {
      name: "John Thomas",
      role: "Founder, Ikena Design & Build",
    },
    content: `If you're running a Hawaii general contracting business and you've ever felt like your GET (General Excise Tax) bill was unreasonably large, this article is for you. There's a deduction in §237-13(3)(B) of the Hawaii Revised Statutes that lets you back out payments to subcontractors before the tax hits — but only if you handle it correctly.

I learned this the hard way. Here's the plain-English version.

## What is GET?

Hawaii's General Excise Tax is the state's equivalent of a sales tax — except it taxes the SELLER on gross revenue, not the buyer on the price. The rate is 4.0% statewide, plus a 0.5% Honolulu county surcharge for work on Oahu. Total: 4.5% on Oahu, 4.0% on the neighbor islands.

Critically, it's a gross tax. If you invoice a client $100,000 for a job, you owe GET on $100,000 — not on your profit, not on your net. This is brutal for general contractors who pay 60-80% of their invoice straight back out to subs.

## Enter §237-13(3)(B)

The statute lets a GC deduct the amount paid to subcontractors from the gross income subject to GET, IF the subs also paid GET on the same money. The intent is to avoid taxing the same dollar twice as it moves through the contracting chain.

In practice:
- You invoice the client $100,000.
- You pay 6 different subs a total of $60,000.
- All 6 subs file GET on their $60,000 portion.
- You file GET on $100,000 - $60,000 = $40,000.

Without the deduction: $100,000 × 4.5% = **$4,500 owed**.
With the deduction: $40,000 × 4.5% = **$1,800 owed**.

That's $2,700 saved on a $100K job. On a year of 10 jobs, you're looking at $27K — real money.

## What counts as a deductible sub payment?

The sub must:

1. Have a valid Hawaii GET license.
2. File and pay GET on the payment they received from you.
3. Have performed the work as a subcontractor on your project (not as a material supplier — that's a different deduction).

If any of those conditions fails, you can't deduct the payment. If you deduct and the state audits and the sub didn't actually pay their GET, you're on the hook for the back-tax plus penalties.

## What doesn't count

- **Material purchases.** Lumber, drywall, cabinets — those are §237-13(3)(C) "wholesale to retail" deductions, not §237-13(3)(B). Different rules, different paperwork.
- **Employees.** Paying your own W-2 employees isn't a sub deduction. They're inside your gross.
- **Subs without GET licenses.** Some side-hustle contractors operate without a license. You can pay them, but you can't deduct the payment.
- **Subs out of state.** A California fabricator who ships you a custom cabinet doesn't file Hawaii GET — so you can't deduct that payment either.

## How to track it for the auditor

The state will ask you for sub records during any GET audit. What you need to keep, per sub, per project:

- **Sub's name, GET license number, and address.** All three.
- **Project name + address.** Tie the payment to the job.
- **Invoice number + date + amount paid.**
- **Method of payment** (check number, ACH ref, etc.).
- **A signed copy of the sub's W-9 + GET license.** Get this BEFORE the first payment.

If you can produce this on demand for any payment, your deduction stands. If you can't, expect the deduction to be denied and a penalty assessed.

## The Act 50 PTET wrinkle (post-2024)

Act 50 of the 2023 legislative session created a pass-through entity tax election that affects how S-corp and LLC contractors handle GET on a federal vs state level. The short version: electing PTET can offset some of your federal income tax liability, but it doesn't change your GET obligation. Don't confuse the two.

If you're operating as an S-corp or multi-member LLC and you haven't talked to a Hawaii CPA about PTET, you should. It's worth the appointment.

## How BlueWave Projects handles this

We built the sub deduction directly into the BlueWave Projects invoice + sub tracking flow. When you log a sub payment, the system:

- Captures the sub's GET license number and W-9 reference.
- Tags the payment as §237-13(3)(B) eligible.
- Generates a year-end summary report you (or your CPA) hand to the state auditor.

The GET deduction is computed automatically on every invoice. You see your post-deduction GET liability before you hit "send." It's the kind of thing that should have been baked into contractor software a decade ago — we built it because we needed it for our own jobs.

Want to try it? [Book a demo](/booking). Hawaii tax handling is wired in on every plan.`,
  },
  {
    id: "3",
    slug: "scope-a-renovation-in-60-seconds",
    title: "How to scope a renovation in 60 seconds (and why your hand-written estimate keeps losing jobs)",
    excerpt:
      "The five-step AI workflow we use to turn a site walk into a phase-by-phase scope of work in under a minute. With real numbers from real Honolulu renovations.",
    date: "2026-05-08",
    readTime: "5 min",
    category: "Workflow",
    categoryColor: "text-emerald-400",
    gradient: "from-emerald-500 to-teal-400",
    author: {
      name: "John Thomas",
      role: "Founder, Ikena Design & Build",
    },
    content: `The first thing I noticed when I started running renovation jobs was that the bidding process was killing us. Every prospect wanted a "rough estimate" the same day. Hand-writing one took 2-4 hours per project. Half the time we'd quote, never hear back, and the time was just gone.

So I built the loop into software. Here's what the 60-second version looks like.

## The five steps

**1. RoomPlan walk (10-15 minutes on site).**
Open the iOS scanner, walk the rooms in scope. The output is a parametric 3D model — walls, doors, windows, furniture, all labeled and dimensioned. Free, no subscription, no watermark.

**2. Notes drop (30 seconds).**
On the same iPhone, tap a few notes: "client wants quartz counters, slate floor, paint everything off-white, keep existing cabinets." Maybe attach 2-3 close-up photos of conditions worth flagging.

**3. Upload (10 seconds).**
The scan + notes + photos sync to your BlueWave project room.

**4. AI scope generation (60 seconds).**
The scope generator reads the RoomPlan model, the notes, and the photos. It writes a phase-by-phase scope of work: demo, framing changes, electrical, plumbing, drywall + paint, finish. Each phase has a labor range, a materials range, and a contingency. Hawaii GET gross-up is computed. The whole document is ~500-1500 words.

**5. Review + send (5 minutes).**
The scope opens in an editor in your tenant. You scan it for anything wrong — typos, line items you'd remove, ranges you'd tighten — and edit in place. When it looks right, hit "send as lead" and a draft email goes to the prospect with the scope attached as a PDF, the scan as a 3D viewer link, and a Calendly link to book the site visit.

Total elapsed time from boots on site to scope in the client's inbox: under 20 minutes for most jobs.

## Why hand-writing loses

When a prospect calls four GCs the same week, the one who responds first usually wins — not the one with the cheapest quote. Speed beats price more often than people admit.

If you hand-write your scopes, the typical cycle is:
- Site visit Monday.
- 3-4 hours that night writing the scope.
- Tuesday morning send it.
- Client already met with two other GCs.

If you generate it in 60 seconds:
- Site visit Monday morning.
- Scope in their inbox Monday at lunch.
- You're the first response and the most detailed one.

I've watched our close rate go from ~15% to ~40% on the prospects where we hit the 60-second loop. Same prospects, same prices, just earlier.

## What the scope actually looks like

A real example (numbers obscured for client privacy) from a recent Oahu condo refinish:

> **Phase 1 — Demo + protection** ($X,XXX labor, $X,XXX materials)
> Remove existing flooring (slate + carpet, ~480 sqft). Protect cabinetry, fixtures, and HVAC vents. Disposal via on-site bin.
>
> **Phase 2 — Subfloor prep** ($XXX labor, $XXX materials)
> Self-leveler over existing slab (~480 sqft). Verify flatness <1/8" over 10ft.
>
> **Phase 3 — Flooring install** ($X,XXX labor, $X,XXX materials)
> White oak engineered, 6" wide plank, glue-down. Schluter trim at transitions. Furniture float through 72 hours.
>
> ... and so on for 6-8 phases.

Each phase has the labor hours assumed, the materials line items, and a 10-15% contingency. Hawaii §237-13(3)(B) GET deduction tracking is set up automatically.

## What it can't do

The scope generator can't:
- Replace a structural engineer when something needs one.
- See into walls. It'll flag "possible mechanical chase here" but a real on-site inspection is still required.
- Price subs you haven't given it. If you've never told it what your tile setter charges, it'll use Honolulu averages.
- Negotiate scope with the client. The first version is a starting point; the conversation happens after.

It can:
- Get you to a defensible first scope 50× faster than hand-writing.
- Keep the format consistent across every prospect so you stop reinventing the document.
- Compute the Hawaii GET correctly every time so you stop accidentally underbidding.

## Try the loop on your next site walk

[Book a demo](/booking) — we'll walk you through the scope generator on a real site of yours and set up your tenant on the call. If you've got an iPhone with LiDAR and a site walk on your calendar this week, you have what you need to try it.

The first one will feel weird. By the third one, you won't go back to hand-writing.`,
  },
  {
    id: "4",
    slug: "multi-tenant-saas-9-weeks-claude-code",
    title: "Shipping a multi-tenant SaaS in 9 weeks with Claude Code: 3 decisions I'd make again, and 1 I wouldn't",
    excerpt:
      "BlueWave Projects went from empty repo to a multi-tenant production SaaS running a real $139K construction job in 9 weeks of solo work. Here are the four architecture decisions that mattered, told honestly.",
    date: "2026-05-11",
    readTime: "9 min",
    category: "Engineering",
    categoryColor: "text-wave-400",
    gradient: "from-wave-400 to-ocean-500",
    author: {
      name: "John C. Thomas",
      role: "Founder, BlueWave Projects",
    },
    content: `BlueWave Projects went from an empty repo to a multi-tenant SaaS running a real $139,165 Honolulu renovation in 9 weeks. Solo. One backend, one Next.js frontend, one iOS app, ~600K lines of code, 580 commits, around 15 billion Claude tokens through Claude Code.

I'm going to skip the cheerleading and just describe the four architecture decisions that mattered — three I'd make again, and one I'm already paying for.

## 1. Would do again: tenant_id on every row, scoped at every router

The cliché advice for multi-tenancy is "schema-per-tenant for isolation, shared schema for cost." I went the other way: **single schema, tenant_id as the first column on every business table, scoping enforced in a FastAPI dependency** that every router uses.

Fifteen-plus tables: \`leads\`, \`projects\`, \`scans\`, \`blueprints\`, \`invoices\`, \`subs\`, \`time_entries\`, \`daily_logs\`, \`selections\`, \`change_orders\`, \`documents\`, \`property_brief_subscribers\`, \`aloha_subscribers\`, \`tenant_users\`, \`tenant_invites\`. Each one starts with \`tenant_id uuid not null\`. The dependency injects a verified \`tenant_id\` into every endpoint and every query goes through a thin builder that requires it.

Why I'd do it again:
- Postgres handles cross-tenant analytics natively (no fan-out).
- Adding a new tenant is one INSERT, not a schema migration.
- The cost ceiling is shared. Tenant 1 (Ikena, a real GC) paid for the whole infrastructure while tenant N gets onboarded.
- Verified end-to-end: I have a fixture test that creates two tenants, runs every endpoint twice (once per tenant), and asserts isolation across 14 endpoints. Zero leaks.

## 2. Would do again: marketing on Cloudflare Pages, product on a single $5 Vultr box

Two completely different deployment surfaces:

**Marketing (bluewaveprojects.com)** — Next.js 16 with \`output: "export"\`, served from Cloudflare Pages. Static HTML at the edge, free traffic, zero ops.

**Product (portal.ikenagroup.com + ai.portofcams.com)** — FastAPI + Postgres + Docker on a single $5/mo Vultr instance, fronted by Nginx Proxy Manager. Eight containers including the API, db, e-sign, n8n, uptime monitor, and a metrics server. SSL is auto-renewed via Cloudflare proxy.

Total monthly infra bill for 12+ live products and a multi-tenant SaaS: less than $50 including domains.

Why I'd do it again: every additional dollar spent on infra before paying customers is dead weight. Edge-static for marketing buys you global perf for free. One box for the product means one place to look when something breaks.

## 3. Would do again: deterministic plumbing, AI in the loop only where humans wait

The AI scope generator gets all the press, but most of the code in BlueWave Projects is boring deterministic plumbing. Invoices are computed, not generated. Change orders are math, not prose. Time clock-out is a transaction, not an LLM call.

The AI only shows up where a human is waiting for *creative* work: a scope of work, a draft daily log narrative, a property brief summary. Everywhere else, traditional code wins on cost, latency, and correctness.

Specific places I use Claude in production:
- **Scope generator** — RoomPlan scan + photos + address → phase-by-phase scope. ~3K input tokens, ~1.5K output, 8-15s latency, ~$0.04 per call.
- **Property Brief weekly digest** — neighborhood narrative from raw GIS data. ~5K input, ~800 output, ~$0.02.
- **Change-order rationale draft** — line items + math is deterministic, the *explanation* is Claude.

Everything else is pydantic models and SQL.

## 4. Would reconsider: app-level tenant filtering instead of database row-level security

This is the one I'd change. I enforce tenant isolation in the application layer (a FastAPI dependency + a query builder). A more defensive design would push isolation down to the database via Postgres' Row-Level Security policies, where every \`SELECT\` is forced to include \`tenant_id = current_setting('app.tenant_id')\` whether the application asks for it or not.

What I have works because every router goes through the dependency. What I should have is a system where a future me writes a sloppy router and the database refuses to leak. RLS is the seatbelt; I'm currently driving without one because I'm the only driver.

It's on the migration list. Not urgent, but it's the architectural decision I'm least proud of.

## What 9 weeks actually looked like

A boring chronology:
- **Week 1-2:** Auth, tenant scaffolding, base routers, contractor portal skeleton.
- **Week 3-4:** Invoice + change-order workflows, public client share links, PDF generation.
- **Week 5:** AI scope generator end-to-end (RoomPlan → Claude → JSON → DB → PDF → client email).
- **Week 6:** Multi-tenant migration (every router rescoped, signup flow, sample-lead seed). Phase 1.5.
- **Week 7:** Property Brief + Aloha Network subscription products.
- **Week 8:** Security audit (CORS hardening, secret rotation, public PII endpoints locked).
- **Week 9:** First real construction job ($139K Puuikena Drive) moved from spreadsheets to the portal end-to-end.

Tenant 1 (Ikena) is currently running a live design-build practice on top of it. The system has moved $1M+ of construction work since launch. Every feature I ship goes through a real job site before it ships to other tenants.

That's the whole story. Solo, agent-augmented, regulated industry, deterministic plumbing with AI in the loop where it earns its cost. The next 9 weeks are about cohort N and that RLS migration I owe future-me.`,
  },
  {
    id: "5",
    slug: "llm-in-the-loop-scope-generation",
    title: "LLM-in-the-loop scope generation: prompt caching, structured outputs, and the deterministic fallback ladder",
    excerpt:
      "How the BlueWave Projects scope generator turns a RoomPlan scan and a few photos into a phase-by-phase scope of work in 60 seconds — and what it falls back to when the model gets squirrelly.",
    date: "2026-05-11",
    readTime: "11 min",
    category: "Engineering",
    categoryColor: "text-wave-400",
    gradient: "from-wave-400 to-glacier-300",
    author: {
      name: "John C. Thomas",
      role: "Founder, BlueWave Projects",
    },
    content: `The AI scope generator in BlueWave Projects is the single most-used feature in the product. A contractor opens an iPhone, walks a room, drops the scan into the portal with a couple of photos and a note, and gets back a phase-by-phase scope of work — labor, materials, contingency, tax gross-up — in about 60 seconds.

Under the hood it's the most over-engineered feature in the whole system. Most of that work is *not* the LLM call. It's the deterministic rails around the LLM call. Here's the full pipeline, told without marketing.

## The input: parametric RoomPlan, not pixels

iOS' RoomPlan returns a parametric JSON of the captured room — walls, openings, fixtures, objects, with positions and dimensions. **Not** a point cloud. **Not** a mesh. A structured tree of named primitives. That structure is the only reason scope generation is possible at AI-affordable cost.

The iOS app uploads:
- The RoomPlan JSON (10-50 KB)
- 2-5 photos (compressed to ~150 KB each)
- A short text note from the contractor ("master bath gut, keep tub, lengthen vanity")
- The address (for tax jurisdiction lookup)

The server flattens RoomPlan into a text fixture: "Room: 12' 4\" × 9' 8\", 92 sqft. Wall A: window opening 4' 2\" × 3' 0\" centered. Door: 2' 8\" interior, north wall." Photos get described by Claude with vision in a single pre-pass and the descriptions are cached.

## Prompt design: pinned context, fluid tail

The full system prompt is around 8K tokens and pinned with \`cache_control: ephemeral\`. It contains:

1. **Role + constraints** — "You are a Hawaii design-build contractor's scope generator. Output JSON conforming to the schema below. Do not produce prose. Do not invent line items not derivable from inputs."
2. **The schema** — phase enum, line-item structure, required ranges (labor low/high, material low/high, contingency %), tax gross-up rules.
3. **Worked examples** — 4 fully-completed scopes from prior accepted jobs. These are the gold reference for tone, granularity, and pricing realism.
4. **The tenant's pricing context** — most recent 20 accepted line-item prices from this tenant, anonymized to category. This is the per-tenant signal that makes the output feel like *yours*.
5. **The active scan + photos + note** — this is the only part that changes per call.

That structure means parts 1-4 (≈ 7.8K tokens) hit the cache on every call. Only the last ~300-500 tokens cost full input rates. At Claude API pricing today that brings the per-call input cost down by roughly 90%.

## Structured outputs: Pydantic schemas, not regex

Every scope call uses Anthropic's tool-use / structured-output mode with a Pydantic v2 schema. The model gets a tool definition that exactly matches the schema:

\`\`\`python
class LineItem(BaseModel):
    phase: Phase  # enum: demo | framing | electrical | plumbing | finish
    description: str
    labor_low: float
    labor_high: float
    material_low: float
    material_high: float
    contingency_pct: float

class Scope(BaseModel):
    summary: str
    phases: list[Phase]
    items: list[LineItem]
    tax_gross_up_pct: float
\`\`\`

The model can't return malformed JSON. It can't omit required fields. It can't return a phase that isn't in the enum. Pydantic validates on receipt, raises on mismatch, and the retry loop knows what to send back to the model.

This is the single biggest cost saving in the pipeline. Before structured outputs we lost ~8% of calls to bad JSON. Now it's effectively zero.

## The deterministic fallback ladder

The first version of the scope generator was "call Claude, return the result." It was 95% magic and 5% disaster. The disasters were the part that got the bug reports.

Now there's a four-rung ladder:

**Rung 1: Schema validation.** Output passes Pydantic? Ship.

**Rung 2: Retry with the validation error.** Pydantic raised on field X? Send the error back to Claude with "fix this field, leave the rest alone" and try again. Maximum two retries.

**Rung 3: Retry with a smaller context.** The model can flake when the prompt is at the edge of its attention. Truncate the worked examples from 4 to 2, retry once.

**Rung 4: Template + narrative inserts.** If three model attempts have failed, fall back to a deterministic phase-skeleton (demo, framing, electrical, plumbing, finish) with template ranges *for this tenant's pricing context* and ask Claude only for the human-readable summary and per-phase rationale. Ranges come from data; prose comes from the model. Worst-case scope still ships.

In production we hit rung 1 on ~94% of calls, rung 2 on ~5%, rung 3 on <1%, and rung 4 on virtually nothing. The ladder exists so the failure mode is "less personalized scope," never "no scope, sorry, try again."

## Multi-tenant prompt isolation

Every call is scoped to a tenant. The tenant's pricing context is fetched fresh per call, the tenant_id is in the system prompt, and the output is written to a tenant-scoped table. There is no single shared cache key that could leak one tenant's pricing into another tenant's output. The cache key is \`(system_prompt_version, tenant_id)\`, not just \`system_prompt_version\`.

This sounds paranoid. It's necessary. Hawaii has fewer than 5,000 active GCs. If two competitors land on the same tenant on the same shared cache, it would be a *small* number of people who get hurt — but it would be a problem you'd never recover from.

## Cost + latency numbers in production

Today's averages over the last 1,000 calls:

- Input: ~8,400 tokens (95% cache reads)
- Output: ~1,400 tokens
- Latency p50: 9.4s · p99: 18.6s
- Cost per call: about $0.045 (Claude Sonnet pricing, ranges by month)
- Cache hit rate on the static blocks: 98.7%

A contractor's time billed at $120/hr would value an 8-minute saving at $16. The scope generator runs at ~$0.04. The economics are obscene in our favor and we sell the feature on time-saved, not cost-of-token.

## What I'd tell another engineer building this

1. **Pin the system prompt with cache_control.** It's the single line that makes the economics work.
2. **Use structured outputs from day one.** Don't write a JSON parser. Don't write a JSON repair function. The schema is the contract.
3. **Build the deterministic ladder before you scale.** The day one model-only path is fine for a demo. It is not fine for a paying customer's first scope.
4. **Tenant-scope the cache key.** Especially in regulated industries.
5. **Measure rung-1-hit-rate weekly.** A drop is your earliest signal that the model has shifted under you. It's a much better canary than user complaints.

The scope generator looks like magic on a 60-second demo. Most of what makes it work is the unmagical machinery on either side of the Claude call.`,
  },
  {
    id: "6",
    slug: "token-economics-15-billion-claude-tokens",
    title: "Token economics: what 15 billion Claude tokens actually cost, and what they bought",
    excerpt:
      "An honest breakdown of where 15B Claude tokens went in 60 days of solo SaaS-building with Claude Code, what they actually cost, and the operator math behind agent-augmented engineering.",
    date: "2026-05-11",
    readTime: "8 min",
    category: "Engineering",
    categoryColor: "text-wave-400",
    gradient: "from-ocean-500 to-wave-400",
    author: {
      name: "John C. Thomas",
      role: "Founder, BlueWave Projects",
    },
    content: `Over 60 days of solo SaaS building with Claude Code I processed approximately **15 billion Claude tokens** across a single Mac. That number does most of its work as a headline. It's also worth pulling apart, because the breakdown tells you a lot about how agent-augmented engineering actually works — and whether it's worth the spend if you're considering the same workflow.

## The breakdown

From the logged sessions on the primary Mac:

| Bucket | Tokens | Share |
|---|---|---|
| Cache reads | 11.6B | 77% |
| Cache creation | 378M | 2.5% |
| Output (model-generated) | 38M | 0.25% |
| Direct input (uncached) | 158K | <0.001% |

The other 20% is from secondary Macs (I work across three) and isn't in the single-machine total. Across the whole sprint the real total is closer to 18-19B tokens. We'll use 15B as the conservative headline.

## What each bucket actually is

**Cache reads (11.6B).** This is the agent replaying recent context — the files in the active session, the running todo list, recent tool results. Every time Claude Code makes a tool call (read a file, run a grep, propose an edit) it re-reads the conversational state to stay coherent. Most of those tokens are the *same tokens* served back, billed at the Anthropic cache-read rate.

**Cache creation (378M).** New context being added to the cache as the session grows. Each new file Read, each new search result, each new system reminder bumps this up.

**Output (38M).** The actual model-generated tokens: code suggestions, edits, plans, reasoning, summaries. This is the bucket where "Claude wrote the code" literally lives.

**Direct input (158K).** Tokens that flowed in *without* a cache hit. Almost negligible — under one Pride and Prejudice's worth of text across 60 days of nonstop work. This is what most people imagine when they hear "input tokens." It's actually a rounding error.

## Rough cost math

Anthropic's pricing for Claude Sonnet today, at Anthropic API rates:

- Input: $3 / Mtok
- Cache writes: $3.75 / Mtok (1.25× input)
- Cache reads: $0.30 / Mtok (10× cheaper than fresh input)
- Output: $15 / Mtok

Plug in the numbers above:

- 11.6B cache reads × $0.30/Mtok = **$3,480**
- 378M cache writes × $3.75/Mtok = **$1,418**
- 38M output × $15/Mtok = **$570**
- 158K direct input × $3/Mtok ≈ **$0.47**

Total: **about $5,470** in 60 days on the primary Mac. Add the other Macs and call it roughly $7K across the sprint.

I'm a Max plan subscriber — most of this is covered by a flat monthly fee. But the underlying compute economics are still worth understanding because they tell you what's possible.

## What that bought

Concrete deliverables shipped in the same 60 days:

- **BlueWave Projects** — multi-tenant SaaS, 15+ tables, full auth, signup, billing scaffolding, ~9 ops tools
- **Ikena Portal** — production tenant running a real $139K renovation end-to-end
- **Hawaii 3D Map / hawaii-as-code** — 384K parcels, 239K buildings, 204K addresses, encoded as TypeScript and rendered as a 3D map
- **Property Brief** — subscription product, signup flow, weekly cron, transactional email
- **Aloha Off-Market Network** — three-tier subscription product, signup
- **Hawaii Property Lookup** — 4-island address autocomplete + parcel card
- **ProBuildCalc iOS** — multi-room stitching, photo evidence pinning, time-lapse compare, AI design overlay
- **Marketing site** — multi-page Next.js with portfolio + case studies + résumé surfaces
- **Captain résumé page + Hire page** — two structured résumés
- The relaunch of ProtestTracker

Roughly **600K lines of code** across **10+ active git repos**, **580+ commits**.

The conventional alternative — building this with a small engineering team — costs in the neighborhood of $200K per senior engineer per year fully loaded. Even at four engineers running flat-out for two months it's $130K in salary alone, not counting management overhead, hiring time, onboarding, and the inevitable team-shape friction. Tokens are not a tax. They're the cheapest part of the stack by an order of magnitude.

## The operator lesson

The hiring conversations I'd want to have with someone evaluating this résumé go through one specific door: I have a *visceral* sense of what production AI costs and what it doesn't. I've seen the bill. I've watched the cache-hit rate drop by 12 points overnight when a system prompt was edited wrong. I've reduced p99 by 4 seconds by moving one section above the cache-control marker.

That's the difference between an engineer who *uses* AI and an engineer who *runs* AI in production. The latter has done the cost-modeling, owns the latency, and knows when to spend $0.05 on a Claude call versus when a deterministic regex would do the job for $0.

If you're shipping AI features at any scale, that intuition isn't optional. It's also one of the few things you can't fake on a résumé.

## What 15B tokens doesn't tell you

A few honest disclaimers:

- **Not every token is doing useful work.** Cache reads are 77% of the total. They're cheap, but they're also where the wastage lives. A poorly-structured prompt repeats 50K tokens of irrelevant context on every tool call.
- **More tokens ≠ better outcomes.** Some of my most productive sessions were 200K-token, four-hour focused builds. Some of my least productive were two-hour wandering sessions that burned 800K tokens and shipped one bug fix.
- **The platform does some of the work.** Claude Code's own context management is doing a lot for me. The token volume isn't all my optimization — much of it is Anthropic's tooling.

But the headline survives. **15 billion tokens** is what a high-tempo solo SaaS sprint looks like in 2026. Anyone hiring AI engineers in a regulated vertical should be calibrated against that number — and asking candidates to show theirs.`,
  },
  {
    id: "7",
    slug: "hawaii-as-code-data-as-source-code",
    title: "Hawaii-as-code: why I put a state's worth of parcels in Git instead of a database",
    excerpt:
      "Every TMK parcel, every building footprint, every address in Hawaiʻi lives as TypeScript modules in a single Git repository. The whole geospatial corpus diffs in PRs and renders as a 3D map. Here's why I built it that way.",
    date: "2026-05-11",
    readTime: "9 min",
    category: "Engineering",
    categoryColor: "text-wave-400",
    gradient: "from-emerald-500 to-sky-400",
    author: {
      name: "John C. Thomas",
      role: "Founder, BlueWave Projects",
    },
    content: `Most production geospatial systems live in a database. PostGIS on Postgres, a normalized schema, a tile server in front of it, an API for the apps, a cache for the reads, and an ETL job that keeps everything in sync with the upstream sources.

That's a reasonable architecture for a typical city or county dataset that updates daily and grows continuously. It is also a *lot of plumbing* for a problem that, in our case, doesn't actually call for it.

Hawaii-as-code is the alternative I built: every TMK parcel, every building footprint, and every address in Hawaiʻi is encoded as TypeScript modules and committed to a single Git repo. **384,262 statewide parcels. 239,458 Honolulu building footprints with real heights. 204,775 address points. Four islands.** All of it sits in one repository under \`portofcams/hawaii-as-code\`. The 3D map at maps.ikenagroup.com is the static-export rendering of the same source files.

This post is about why that architecture is the right call for *this* shape of dataset, and the specific tradeoffs that come with it.

## The problem

Hawaii's authoritative geospatial data is scattered across half a dozen sources:

- **State ArcGIS portal** — statewide TMK parcels, the lowest common denominator
- **Honolulu DPP REST** — building footprints with permit history
- **Hawaii County GIS** — Big Island parcels with the deepest county schema
- **Maui County** — separate REST endpoint with different field names
- **Kauai County** — yet another schema
- **OSM Overpass** — building heights and address points where the counties don't publish them
- **qPublic / TaxNetUSA** — ownership records, scraped weekly

Every Hawaii-aware product the studio ships (Property Brief, Aloha Network, AI scope generator, ProBuildCalc, Hawaii Property Lookup) needs subsets of this data, fresh, fast, and consistent across products. The conventional architecture would mean: ingest from six sources nightly, normalize into a single schema, serve through one API, cache aggressively, and version the schema as the upstream sources drift.

That's roughly $500/mo of infra and ~2,000 lines of glue code per product that imports it.

## The alternative: commit the data

The dataset is finite. The whole compressed corpus — every parcel, building, and address in Hawaiʻi — is well under a gigabyte. It changes on a weekly cadence, not minutely. There are no joins that require SQL-level optimization for this scale.

So I treated it like source code, not like data.

**One file per island per layer.** Directory tree:

\`\`\`
parcels/
  oahu.ts
  maui.ts
  hawaii.ts
  kauai.ts
buildings/
  honolulu.ts
  hilo.ts
addresses/
  oahu.ts
  ...
\`\`\`

Each file exports a typed array of records. **Every record has the same TypeScript shape** regardless of which county it came from — normalization happens at ingest time, not at read time.

**One scraper per source.** Every Saturday, a cron job hits all six upstream endpoints in parallel, normalizes the responses, and writes the result back to the repo as fresh TypeScript modules. The scraper commits the change with a structured message: \`refresh: oahu parcels (+47 / -12 / ~204)\`.

**Diffs are the audit trail.** Because the data is text, every weekly refresh shows up as a Git diff. Forty new parcels were added in Kailua? You can see them in a PR. A building height changed from 28' to 32'? Visible in the diff. No ETL black box where "the data refreshed, no idea what changed."

## Three superpowers that flow from this

**1. The same source feeds every product without API drift.**

Property Brief, the scope generator, ProBuildCalc, and the lookup tool all do \`import { oahuParcels } from "hawaii-as-code/parcels/oahu"\`. There is no API between products. No versioning headaches when one product needs a field that another doesn't. No "tile server is down, app is broken" outages. The data layer is a compile-time dependency. If it compiles, it works.

**2. Static export becomes the 3D map.**

The 3D map at maps.ikenagroup.com is *just* the TypeScript compiled into a Three.js scene at build time. Buildings are extruded from the footprint arrays to their real heights. Parcels are rendered as clickable polygons. There's no map server, no runtime API for the map itself. Cloudflare Pages serves the whole experience as static assets. Page weight: about 18 MB across the four islands; load time on a good connection: ~2 seconds for the first paint with progressive enhancement.

**3. The codebase is the data ops team.**

When a new field needs to be added — say, "is this parcel in a special management area?" — I edit the scraper, push, and the next Saturday refresh fills the field in. The whole "data engineering" surface is the same code surface as the application. There's no separate team, no separate vocabulary, no separate deploy pipeline. Claude Code edits the scrapers the same way it edits the React components.

## The honest tradeoffs

This architecture is *not* right for every dataset. The specific shape that makes it work here:

- **Finite.** The whole state's data fits in memory at runtime. This pattern wouldn't survive moving to the contiguous US.
- **Stable cadence.** Weekly updates, not real-time. If the underlying data changed minute-to-minute, the Git commits would be noise.
- **Public.** Everything in the repo is sourced from government data feeds that are public records. No PII, no commercial scraping problems.
- **Multi-source normalization is the actual work.** If the dataset came from one clean upstream API, you'd just hit the API. The value is in the unified shape across six different schemas.

Things that *don't* work:

- **Search at scale.** Find "all parcels over 5 acres in Kaneohe Bay" is a linear scan in this architecture. For the products that need that query, the same data is *also* loaded into Postgres on the server side, which is the workhorse. Hawaii-as-code is the source of truth; the database is a derived index.
- **Append-only history.** Git keeps everything forever, which is great until you realize you don't want to ship 2 years of weekly diffs to the browser. Production builds load only the latest snapshot.
- **Bandwidth.** The TypeScript files compress well but they're still bigger than a binary protocol. For the 3D map, this is fine. For a high-frequency mobile read, you'd want a binary format on top.

## When to steal this pattern

Specifically when:
- The dataset is small enough to ship to the client or compile to a static artifact (under a few GB compressed).
- The cadence is daily-or-slower.
- You have multiple sources that need unification.
- You're running multiple products on top of the same data and care about consistency.
- You want diffs to be reviewable instead of opaque.

For Hawaii — finite, slow-changing, multi-source, multi-product — this architecture is the right call. For the contiguous US it isn't. For a real-time logistics feed it isn't. For PII-bearing customer data it absolutely isn't.

But if your dataset *does* fit, treating geospatial data like source code instead of like database rows is one of the cleanest architectural moves I've made in 12+ shipped products. The whole "data ops" team is a Saturday cron job and a PR review.`,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(currentSlug: string, count: number = 3): BlogPost[] {
  return blogPosts.filter((post) => post.slug !== currentSlug).slice(0, count);
}
