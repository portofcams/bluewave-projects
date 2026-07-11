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
      "BlueWave Projects went from empty repo to a multi-tenant production SaaS running a real Hawaii residential renovation in 9 weeks of solo work. Here are the four architecture decisions that mattered, told honestly.",
    date: "2026-05-11",
    readTime: "9 min",
    category: "Engineering",
    categoryColor: "text-wave-400",
    gradient: "from-wave-400 to-ocean-500",
    author: {
      name: "John C. Thomas",
      role: "Founder, BlueWave Projects",
    },
    content: `BlueWave Projects went from an empty repo to a multi-tenant SaaS running a real Hawaii residential renovation in 9 weeks. Solo. One backend, one Next.js frontend, one iOS app, ~600K lines of code, 580 commits, around 15 billion Claude tokens through Claude Code.

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
- **Week 9:** First real construction job (a Hawaii residential renovation) moved from spreadsheets to the portal end-to-end.

Tenant 1 (Ikena) is the source-of-truth dogfood — every feature I ship goes through a real job site before it ships to other tenants.

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
      "An honest breakdown of where 15B Claude tokens went in one focused sprint of solo SaaS-building with Claude Code, what they actually cost, and the operator math behind agent-augmented engineering.",
    date: "2026-05-11",
    readTime: "8 min",
    category: "Engineering",
    categoryColor: "text-wave-400",
    gradient: "from-ocean-500 to-wave-400",
    author: {
      name: "John C. Thomas",
      role: "Founder, BlueWave Projects",
    },
    content: `Over one focused sprint of solo SaaS building with Claude Code I processed approximately **15 billion Claude tokens** across the home Apple server — three Macs running Claude Code in rotation as one logical development environment. That number does most of its work as a headline. It's also worth pulling apart, because the breakdown tells you a lot about how agent-augmented engineering actually works — and whether it's worth the spend if you're considering the same workflow.

## The breakdown

From the logged sessions across the home Apple server:

| Bucket | Tokens | Share |
|---|---|---|
| Cache reads | 11.6B | 77% |
| Cache creation | 378M | 2.5% |
| Output (model-generated) | 38M | 0.25% |
| Direct input (uncached) | 158K | <0.001% |

These totals are aggregated across the home Apple server — three Macs running Claude Code in rotation as a single development environment. 15B is the conservative rolling headline; the real total floats between 15 and 19 billion depending on the active sprint week.

## What each bucket actually is

**Cache reads (11.6B).** This is the agent replaying recent context — the files in the active session, the running todo list, recent tool results. Every time Claude Code makes a tool call (read a file, run a grep, propose an edit) it re-reads the conversational state to stay coherent. Most of those tokens are the *same tokens* served back, billed at the Anthropic cache-read rate.

**Cache creation (378M).** New context being added to the cache as the session grows. Each new file Read, each new search result, each new system reminder bumps this up.

**Output (38M).** The actual model-generated tokens: code suggestions, edits, plans, reasoning, summaries. This is the bucket where "Claude wrote the code" literally lives.

**Direct input (158K).** Tokens that flowed in *without* a cache hit. Almost negligible — under one Pride and Prejudice's worth of text across the whole sprint of nonstop work. This is what most people imagine when they hear "input tokens." It's actually a rounding error.

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

Total: **about $7,000** across the home Apple server over the sprint.

I'm a Max plan subscriber — most of this is covered by a flat monthly fee. But the underlying compute economics are still worth understanding because they tell you what's possible.

## What that bought

Concrete deliverables shipped in the same sprint:

- **BlueWave Projects** — multi-tenant SaaS, 15+ tables, full auth, signup, billing scaffolding, ~9 ops tools
- **Ikena Portal** — tenant zero, exercised in production on a real Hawaii residential renovation end-to-end
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
  {
    id: "8",
    slug: "hawaii-tmk-system-decoded",
    title: "The Hawaii TMK system, decoded — how to read a Tax Map Key and find any parcel in the state",
    excerpt:
      "Every property in Hawaii has a TMK — a Tax Map Key that uniquely identifies the parcel across all four counties. It looks like a phone number but reads like a coordinate. Here's what every digit means and how to use it.",
    date: "2026-05-15",
    readTime: "6 min",
    category: "Hawaii Real Estate",
    categoryColor: "text-wave-400",
    gradient: "from-wave-400 to-ocean-500",
    author: {
      name: "John C. Thomas",
      role: "Founder, BlueWave Projects",
    },
    content: `Every property in Hawaii has a TMK — a Tax Map Key — that uniquely identifies the parcel across all four counties. If you've been searching for a home in Honolulu, watching permit activity on Maui, or trying to look up an off-market lot on the Big Island, you've seen TMKs written in a dozen formats and probably wondered what the digits actually mean.

This post decodes the system. After 6 minutes you'll be able to:

- Read any Hawaii TMK and know which island, zone, section, plat, and parcel it points to
- Convert between the three common formats you'll see on title work, permit filings, and public records
- Find any parcel's TMK from just an address, using the right tool for each county
- Use a TMK to look up zoning, lava zone, ownership history, lot size, and adjacent owners

If you're doing any property work in Hawaii — buying, selling, building, investing, watching permits, planning a remodel — the TMK is the single most important identifier you'll touch. The MLS number is temporary. The TMK is permanent.

## What a TMK actually is

A Tax Map Key is a hierarchical identifier assigned by the county to every taxable parcel in Hawaii. It works like a coordinate system: each number narrows down where in the state the parcel sits.

The full format is **Z-S-S-PPP-PPP-CCCC**, where:

- **Z** — the island (1 character, 1 digit)
- **S** — the zone within the island (1 character, 1 digit)
- **S** — the section within the zone (1 character, 1 digit)
- **PPP** — the plat (3 digits, often the subdivision)
- **PPP** — the parcel within the plat (3 digits)
- **CCCC** — the CPR (Condominium Property Regime) suffix (4 digits, only if the parcel is a condo unit)

A typical TMK on Oahu looks like this:

> **1-3-9-051-068**

That decodes to:

- \`1\` — Oahu
- \`3\` — Zone 3 (Diamond Head / Kapahulu area)
- \`9\` — Section 9
- \`051\` — Plat 51 (a specific neighborhood subdivision)
- \`068\` — Parcel 68 within that plat

A condo unit at the same plat-parcel would add a CPR suffix:

> **1-3-9-051-068-0042**

Where \`0042\` is the specific unit within the condominium.

## The four counties and their first digits

Hawaii has four counties, and each gets a single-digit code at the start of every TMK in their jurisdiction:

| First digit | County | Islands covered |
|---|---|---|
| **1** | Honolulu | Oahu (plus Northwestern Hawaiian Islands) |
| **2** | Maui | Maui, Molokai, Lanai, Kahoolawe |
| **3** | Hawaii | Hawaii Island (the Big Island) |
| **4** | Kauai | Kauai, Niihau |

So a TMK starting with **3** is on the Big Island. A TMK starting with **2** could be on Maui, Molokai, or Lanai — the zone digit tells you which.

## Common formats you'll see (and how to translate between them)

The same TMK gets written different ways depending on the source. Title work uses one format, the state ArcGIS uses another, permit filings use a third. They're all the same number with different separators.

**Format 1 — dashes:**
> 1-3-9-051-068

Used by: title companies, real estate listings, most casual references.

**Format 2 — no separators (10 or 14 digits):**
> 1390510680000

Used by: state and county ArcGIS systems, automated property data exports. The first 9 digits are island/zone/section/plat/parcel; the trailing 4 digits are the CPR (zeros if no condo unit).

**Format 3 — with CPR explicit:**
> 1-3-9-051-068-0000

Used by: county tax assessor records, formal recorded documents. Always includes the CPR suffix even when zero.

**Conversion is mechanical** — just strip or add the separators. The underlying number doesn't change.

## How to find a TMK from just an address

The fastest tool depends on which county the property is in. Each county has its own ArcGIS portal and tax-assessment search:

- **Oahu (Honolulu County):** the qPublic search on the City and County of Honolulu Real Property Assessment Division site, or the Hawaii statewide ArcGIS at geodata.hawaii.gov which covers all four islands.
- **Maui County:** the Maui Property Tax search and the Maui County GIS portal.
- **Hawaii Island (Big Island):** the Hawaii County Real Property Tax search and the Hawaii County GIS portal.
- **Kauai:** the Kauai Real Property Tax search and the Kauai County GIS portal.

If you want one tool that covers all four islands without bouncing between four county websites, the [BlueWave Projects address lookup](https://addressapi.portofcams.com) does statewide parcel lookups from a single address bar. Free to use, no signup, no credit card. Built on the same parcel-mirror we use for [Property Brief](https://bluewaveprojects.com/property-brief) and [the Aloha Off-Market Network](https://bluewaveprojects.com/aloha).

## What a TMK unlocks once you have it

A TMK is the key to every public dataset on a parcel:

- **Ownership history** — current owner, prior owners, date and price of every recorded sale
- **Zoning** — what can be built on the lot (R-5, R-7.5, A-1, AG-1, A-2, P-1, MX-T, WD, etc.)
- **Lava zone** (Big Island only — 1 is highest risk, 9 is lowest)
- **Flood zone** (FEMA designations A, AE, X, etc.)
- **Lot size** — in square feet and acres
- **Building footprint** — in square feet, for Honolulu County specifically
- **Permit history** — every building permit filed on the parcel, going back about 20 years on Oahu
- **Adjacent parcels** — the TMKs of the lots that share a property line
- **Tax assessment** — current assessed value, and the historical assessment trail

If you're doing investor research, every one of those data points sits behind the TMK. If you don't have the TMK, you can't query for any of it. The TMK is the literal primary key.

## A practical example

Type any Honolulu address into [the lookup tool](https://addressapi.portofcams.com) and within a second you get the parcel card:

- TMK (e.g., 1-3-9-051-068 — Oahu, Zone 3, Section 9, Plat 51, Parcel 68)
- Owner of record
- Last sale date and price
- Lot size in square feet
- Zoning code
- Lava zone (Zone 9 if Oahu — Oahu is structurally outside the active flow paths)
- Adjacent parcel TMKs
- Recent permit activity

That parcel card is what every other tool in the Hawaii property data stack builds on. The MLS listing is the marketing veneer; the TMK card is the ground truth.

## Why this matters if you're investing, building, or buying

If you're an out-of-state buyer or investor, the TMK is what protects you from surprises. The MLS listing tells you what the seller's agent wants you to know. The TMK lookup tells you everything the public record knows — including things sellers might not volunteer (zoning that limits future buildout, permit work that was started but never finalized, easements that show on the survey but not the listing).

If you're a contractor or developer, the TMK is the work-product identifier you'll use for every permit filing, every change order, every dispute. Get comfortable reading them at a glance.

If you're a homeowner considering improvements, knowing your own TMK and what it tells you about your zoning and lot constraints saves you the cost of pulling a useless permit.

## The Property Brief connection

[Property Brief](https://bluewaveprojects.com/property-brief) is our weekly subscription that turns your TMK into a recurring report — every Wednesday morning, you get permits filed near your parcel, sales that closed nearby, comps for your block, ownership changes, market shifts.

If you've ever lost track of what's happening on your block, or wanted to know what your home would actually sell for this week without calling an agent, that's what Property Brief is for. $15/month, first one free, cancel anytime.

[See a sample brief](https://bluewaveprojects.com/property-brief-sample.html) — we use the Aloha Tower District as the demo address. A real public Hawaii landmark, no client data.

## Quick reference card

| What | Answer |
|---|---|
| First digit = county | 1=Honolulu (Oahu) · 2=Maui · 3=Hawaii Island · 4=Kauai |
| Format used on title work | Z-S-S-PPP-PPP (with dashes) |
| Format used in databases | ZSSSPPPPPP0000 (10 digits + 4-digit CPR) |
| Where to look up TMK from address | County ArcGIS portal, or addressapi.portofcams.com (all four counties, one search bar) |
| What unlocks once you have the TMK | Ownership, zoning, permits, comps, lava zone, flood zone, lot size, adjacent parcels |

The TMK system isn't elegant, but it's complete. Every parcel in the state has one, and once you can read the digits the rest of the Hawaii property data world opens up. The work we do at BlueWave Projects — Property Brief, Aloha Network, the lookup tool, the 3D map at maps.ikenagroup.com — all rests on the TMK foundation. Knowing how to read one is the first move.`,
  },
  {
    id: "9",
    slug: "buildertrend-procore-vs-hawaii-operators",
    title: "Why Buildertrend, Procore, and CoConstruct miss the mark for Hawaii operators (and what we built instead)",
    excerpt:
      "The big-name construction-management platforms were built for multi-region GCs running hundreds of jobs. Hawaii operators run different math — Hawaii GET, sub deductions at the 0.5% wholesale rate, TMK-aware permits, single-county jurisdictions. Here's the honest gap analysis.",
    date: "2026-05-15",
    readTime: "8 min",
    category: "Hawaii Operators",
    categoryColor: "text-wave-400",
    gradient: "from-wave-400 to-ocean-500",
    author: {
      name: "John C. Thomas",
      role: "Founder, BlueWave Projects",
    },
    content: `If you run a residential renovation or design-build practice in Hawaii and you've ever tried to use Buildertrend, Procore, or CoConstruct, you've already hit the same wall most Hawaii operators hit: the tools were built for someone else.

This isn't a takedown. All three are well-engineered products with billions in funding behind them. They work great for what they were built for — multi-region GCs running hundreds of concurrent jobs at scale, with national subcontractor networks and standardized contract structures. That's not the Hawaii operator's job.

This post lays out the specific gaps between national construction-tech and Hawaii reality, with concrete examples. Then explains what BlueWave Projects (specifically the Ikena platform under our umbrella) does differently.

If you're a Hawaii operator currently paying $400-$800/month for Buildertrend or Procore and finding yourself routing around half the features, this post is for you.

## Gap 1 — Hawaii GET (and the 0.5% wholesale rate)

Hawaii's General Excise Tax (GET) is the single biggest plumbing difference between Hawaii contracting and the Lower 48. It's not a sales tax. It's a gross-receipts tax. And it cascades up the contracting chain in a specific way that requires tax-aware invoicing.

Quick version: on Oahu, contractors collect GET at 4.712% on every invoice they send (4.5% effective rate grossed up to 4.712% on the face). That 4.712% gets baked into every line item or shown as a separate fee. When a licensed prime contractor pays a licensed subcontractor, the prime can claim a **0.5% wholesale rate** on the sub-invoice portion (HRS §237-13(3)(B)). The sub still pays full GET on what they received from the prime; the prime just doesn't have to gross-up that portion of the project value again.

What this means in software terms:
- Every invoice needs to know whether its line items are subject to gross-up
- Every change order needs to inherit the project's GET configuration
- Every sub-payment needs to be tagged with the sub's GET number and whether the wholesale rate applies
- Reporting needs to roll up GET-payable separately from gross revenue

**What national tools do with this:** Nothing. Buildertrend treats GET as a generic line item you add manually. Procore lets you configure custom tax rates but doesn't model the cascade or the wholesale-rate logic. CoConstruct has no Hawaii-specific tax handling at all.

**What we built:** Every Ikena tenant has GET configuration baked into project setup. Invoice lines auto-gross-up. Sub deductions auto-claim the wholesale rate when the sub is licensed and the project qualifies. Year-end reporting rolls up GET-payable cleanly. None of this requires the operator to remember any of it.

## Gap 2 — Single-county permits + TMK awareness

Hawaii has four counties — Honolulu, Maui, Hawaii Island, Kauai — and each runs its own permit system, its own GIS, its own building code amendments on top of the state code, and its own filing portal.

A Hawaii operator generally works in one county. A national tool assumes you work in many, and most of its multi-jurisdictional plumbing is irrelevant overhead. Worse: none of the national tools index Hawaii's TMK system, so you can't search by parcel, can't see adjacent permits, can't tie permit filings to specific lots in the way Hawaii's actual data system works.

**What this means in software terms:**
- Project records keyed by TMK, not just street address
- Permit search wired into the county-specific permit feed (Honolulu DPP, Maui MIPS, Hawaii County, Kauai)
- Adjacent-parcel data surfaced when relevant (e.g., "your neighbor just pulled a $400K renovation permit — heads-up for noise complaints when you start your job")
- Zoning code awareness (R-5 vs R-7.5 vs A-1 vs P-1 vs the conservation district rules) so quotes can flag constraints upfront

**What national tools do with this:** Generic permit tracking. You enter the permit number manually. The platform doesn't know what jurisdiction you're in, doesn't index adjacent activity, doesn't help you remember which DPP form goes with which job.

**What we built:** Every project in Ikena Portal is keyed by TMK. The parcel browser (built on hawaii-as-code, our statewide parcel mirror) is one click away from any project page. Adjacent permit and ownership data surfaces automatically. We don't have a "national-jurisdiction" mode because we don't need one.

## Gap 3 — Hawaii sub network reality

National tools assume you have a network of vetted subs you've worked with for years. Buildertrend has a "Connected Subs" feature that's essentially their version of a Slack roster.

Hawaii's sub network is different in three ways:
1. It's smaller — fewer subs per trade, often family-run, often the same handful across multiple GCs
2. Pricing is more relational — "what we charged you last year + 4%" rather than "submit a bid for this specific scope"
3. The 0.5% wholesale GET cascade means the sub's licensing status materially affects YOUR tax math, not just your liability profile

What this means in software terms:
- Sub profiles need a Hawaii GET number field (not just a generic Tax ID)
- Sub licensing verification against DCCA records, periodic re-check
- Pricing history that surfaces the relational pattern (sub X has done 3 prior jobs for you at $45/hr; the new one quotes $48/hr; is that fair?)
- Approval workflow that doesn't pretend you need 3 competitive bids on a $5K bathroom waterproofing job

**What national tools do with this:** Generic sub directory. You can attach files. You can rate them 1-5 stars. There's no Hawaii GET handling, no DCCA integration, no pricing-history overlay.

**What we built:** Sub directory with Hawaii GET fields built in. Each sub has a current-licensing check against DCCA's public lookup. Each invoice from a sub auto-routes the wholesale-rate logic. Pricing history is visible on every new quote so you can quickly sanity-check.

## Gap 4 — Client portal expectations

Hawaii homeowners (especially the high-end Kahala / Diamond Head / Hawaii Loa Ridge clientele) are sophisticated buyers. They expect a polished portal. They've seen your competitors' portals. The Buildertrend default theme — bright orange CTAs, generic stock photos, "Welcome to YourCompany!" — clashes with the aesthetic of someone spending $2M on a custom home.

This is partly a Buildertrend problem and partly a customization-cost problem. National tools let you customize the portal, but it costs extra. You're paying $400/mo for the platform AND $200/mo for the white-label add-on AND another $100/mo for the customer-facing app.

**What we built:** White-label client portal included in Ikena Web ($79/mo, all tiers). Custom subdomain (e.g., progress.your-firm.com), your branding, your typography, your photography. No platform-watermark anywhere. The client never sees BlueWave or Ikena branding — only yours.

## Gap 5 — Pricing structure (the elephant)

Let's just put it in a table:

| Platform | Starting price | Per-seat fee | White-label | iOS scanner | Hawaii tax handling |
|---|---|---|---|---|---|
| Buildertrend | $399/mo (Core) | Yes, per user | $200/mo add-on | No native | No |
| Procore | $375/mo + per-active-user | Yes, $375/user/mo for some seats | Custom | No native | No |
| CoConstruct | $349/mo + per-user | Yes | Included higher tier | No native | No |
| **Ikena Web** | **$79/mo** | **No per-seat fee** | **Included** | n/a | **Yes** |
| **Ikena Suite** | **$99/mo** | **No per-seat fee** | **Included** | **Yes (ProBuildCalc)** | **Yes** |

If you're a small Hawaii operator doing 4-8 active projects, the national tools cost 4-5x what Ikena does AND require workarounds for the GET / sub / TMK issues above.

If you're a 20+ project shop doing $5M+ in annual volume, your math is closer to break-even on raw monthly fees — but you're still paying the cost in workarounds and in time spent re-entering data that the national tools don't index correctly.

## What we don't do well (the honest other side)

Ikena isn't perfect for every Hawaii operator. Specifically:
- We don't have the deep accounting integrations (QuickBooks Pro / Sage 50) that Procore has. Our invoicing exports clean CSVs that import into QuickBooks; that's the limit today.
- We don't have a full bid-management workflow with competitive sub-bidding. We have sub directory + invoicing, not a formal bid-solicitation engine.
- We don't have the deep BIM / Revit integrations of Procore. If you work with architects who deliver Revit models and you need full coordination, Procore is still the right tool.
- We're a small team. Support is fast (you'll get me, John, on most replies) but we don't have a 24/7 enterprise support desk.

If those three things are make-or-break for your operation, Procore is probably the right pick.

If you're a Hawaii operator doing $500K-$10M/year with 4-30 concurrent projects, and you want a tool that speaks your local context fluently, Ikena is the right pick.

## How to try it

Two paths:

1. **Free trial:** [Start a 14-day free trial of Ikena Suite](https://bluewaveprojects.com/pricing) — full platform, no credit card required.
2. **20-minute walkthrough:** [Book a Zoom](https://bluewaveprojects.com/booking?topic=ikena-walkthrough) where I'll show you the platform with your specific use case in mind (your typical project type, your sub network, your invoicing pattern).

Either way, the founding-Hawaii pricing locks in at the rate you sign up at, for the life of your subscription. The national tools price-bump 8-12% annually; ours doesn't.

## The bigger picture

Construction software was built in the boom of 2017-2022 by founders who were mostly in Texas, California, or East Coast metros. Their assumptions baked in: multi-state operations, national sub networks, generic tax handling, large team sizes.

Hawaii operators — the ones doing the actual hard work of building in a state that's its own micro-market — got served the same software as everyone else, with workarounds piled on top.

We built Ikena because the workaround pile got too tall on our own jobs. We use it as tenant zero. Every feature ships on a real Hawaii job before it reaches paying tenants. That's the only way a product like this stays calibrated to the actual work.

If you're building in Hawaii and you've felt the same friction, the door's open.`,
  },
  {
    id: "10",
    slug: "aloha-network-founding-members-open",
    title: "The Aloha Off-Market Network — founding-member seats open for Hawaii real-estate operators",
    excerpt:
      "We just opened the founding-member tier of the Aloha Off-Market Network — a closed-loop pocket-listing exchange for Hawaii agents and investors, backed by a mirror of every parcel in the state. Ten seats, free for life, in exchange for one off-market listing per quarter.",
    date: "2026-05-15",
    readTime: "5 min",
    category: "Hawaii Real Estate",
    categoryColor: "text-wave-400",
    gradient: "from-lava-500 to-amber-400",
    author: {
      name: "John C. Thomas",
      role: "Founder, BlueWave Projects",
    },
    content: `We're opening the founding-member tier of the Aloha Off-Market Network today.

If you're a Hawaii real-estate agent, investor, or builder who works with off-market deals — pocket listings, estate situations, pre-MLS introductions, the quiet half of the market — this is built for you. Ten founding seats, no fee, locked in for life, in exchange for one pocket listing per quarter.

This post lays out what the network actually is, why we built it, who it's for, and how to join.

## What the network actually is

The Aloha Off-Market Network is three things stacked on top of each other:

**One — a parcel-data foundation.** Over the last two years we've mirrored every parcel in Hawaii. All four counties, statewide TMK schema, 384,262 parcels total. Plus 239,458 Honolulu building footprints with real heights, 204,775 address points across all four islands. Every parcel has its TMK, owner of record, last sale, lot size, zoning, lava zone, flood zone, building footprint, and adjacent-owner data indexed. That data layer powers everything we build on top.

**Two — a private pocket-listing feed.** Founding members post pocket listings into a closed feed visible only to other members. Each listing shows what you'd want to share with your six closest colleagues: address or neighborhood, approximate price, property type, the buyer fit you're looking for, why it's off-market. You choose whether other agents can DM you directly or whether we relay leads anonymously.

**Three — territory-aware permit + ownership alerts.** Each member flags the neighborhoods or zones they care about. The network watches county permit feeds + recording filings + adjacent-parcel ownership in real-time and surfaces anomalies — new permits in your zone, sudden teardowns, ownership changes that telegraph an upcoming sale. Builder tier ($499/month) gets the full alert engine; founding members get it included.

## Why we built it

The honest version: we built the data layer for our own software studio (Property Brief, hawaii-as-code, the lookup tool at addressapi.portofcams.com — all run on the same parcel mirror). And we watched what the Hawaii real-estate community already does informally: small groups of agents share pocket listings amongst each other via text message, email, casual happy hours, the inside-the-rolodex circuit.

That circuit works, but it's small. The agents who are in it benefit from asymmetric information. The agents outside it pay the cost — slower deal flow, less off-market access, more dependence on MLS.

We thought: what if you formalized the rolodex without ruining what makes it work? Smaller than MLS. Larger than six people. Curated, not crawled. Permission-based, not aggregated.

That's the founding-member tier. Ten people who all share + all see. Closed loop. No public posting, no scraping, no algorithm.

## Who it's for (and who it's not)

**It's for:**
- Hawaii real-estate agents who handle 8+ transactions per year and routinely see off-market opportunities
- Investor-builders who want territory-specific permit + ownership intel
- Brokers running small shops who can't afford enterprise PropTech but want better data than zillow.com
- Pacific-region agents servicing Hawaii from a base elsewhere (LA, Bay Area, Seattle) who need the local data layer

**It's not for:**
- High-volume cold-call wholesalers (the network's value depends on relationship density; volume-first operators dilute it)
- Out-of-state investors who don't have an in-Hawaii agent partner (Hawaii rules + the actual logistics of viewing properties make pure-remote investing tough)
- Anyone looking for full MLS access at a discount (this isn't that — MLS membership is its own thing and we don't replace it)

## What founding members get

The founding-member tier is the entry that pays itself back fastest. Locked in for life of the network, no fee:

- Full access to the closed pocket-listing feed
- Adjacent-owner lookups on any Hawaii parcel
- Permit anomaly alerts on territories you flag
- Free [Property Brief](https://bluewaveprojects.com/property-brief) subscription on the address of your choice (weekly digest)
- First access to every new feature we ship
- Direct line to the operator (me — John) for feedback + feature requests

The one ask in return: bring one pocket listing per quarter. Could be a referral, a tip, a "my client is quietly thinking about selling, here's the situation" — anything you'd normally share with a colleague. Three a year. That's it.

## What the paid tiers look like

For agents and operators who don't fit the founding-member profile, two paid tiers:

- **Watcher — $99/month.** Read-only access to the network. Parcel browser, adjacent-owner tool, saved-parcel watchlist. No pocket-listing posting, no permit alerts.
- **Builder — $499/month.** All of Watcher plus the permit anomaly alerts, distressed-property signals, and a weekly market brief. For active investors and builders who use territory-level data to make decisions.

The founding-member tier won't reopen. Once the ten seats fill, that's it — the tier closes permanently. New members can join Watcher or Builder, but the founding-pricing-for-life isn't available anymore.

## How to apply

Two options:

1. **If you're already in our network:** reply to whoever forwarded you this post or DM @lastfrontierevents on Twitter — we'll get you set up the same week.
2. **If you found us cold:** email portofcams@gmail.com with a 2-3 sentence note about your work, your territory, and a recent transaction you closed. Founding seats are hand-picked; we're looking for ten people whose listings will benefit the rest of the network.

The application doesn't need to be polished — just real. We're trying to assemble a working group, not run a startup pitch competition.

## The bigger picture

Hawaii's real-estate market is asymmetric. The same six high-quality agents in Kahala, Diamond Head, Hawaii Loa Ridge, Black Point, and Hawaii Kai see the off-market flow that the other 400 agents on Oahu don't. Same in the cruise-and-vacation rental belt across Maui. Same on the Big Island for cattle-ranch and agricultural-zone deals.

The asymmetry is fine for the inside group. It's expensive for everyone else.

We built the network because the data layer was sitting there — we already had every parcel mirrored — and the closing piece was just a closed, trustworthy feed where small groups of operators could share without burning their seller relationships.

If you've felt the asymmetry and want to be on the inside of the next version of it, the ten seats are first-come-first-served.

[Apply at bluewaveprojects.com/aloha](https://bluewaveprojects.com/aloha) or just reply to this post.`,
  },
  {
    id: "11",
    slug: "transactional-email-said-sent-delivered-nothing",
    title: "Our transactional email said it sent for weeks — and delivered nothing",
    excerpt:
      "Every welcome email, billing receipt, and form notification reported success while silently bouncing. The cause: sending from an unverified apex domain instead of a verified subdomain — plus an API that returns the rejection as a value you have to check. A post-mortem.",
    date: "2026-06-02",
    readTime: "7 min",
    category: "Engineering",
    categoryColor: "text-wave-400",
    gradient: "from-lava-500 to-amber-400",
    author: {
      name: "John C. Thomas",
      role: "Founder, BlueWave Projects",
    },
    content: `Here is a failure mode that is almost worse than an outage: software that reports success while doing nothing.

For a few weeks, one of our products sent transactional email that never arrived. Welcome emails, billing receipts, form notifications — the API returned success every single time, the logs were clean, and not one message reached an inbox. We only caught it because someone asked, "hey, did that test email come through?" It had not. None of them had.

This is the post-mortem, because the root cause is a trap any team on a modern email API can fall into.

## The symptom

The endpoint that sends a notification returned HTTP 200. The send helper wrapped the provider call in a try/catch, did not throw, and returned an ok response. Everything downstream saw success — the dashboard logged the event, the user got a friendly "message received" screen, and the email went nowhere.

A silent failure is worse than a loud one. A 500 gets investigated within the hour. A cheerful 200 that does nothing can run for weeks.

## The root cause: an unverified sender domain

We send through Resend, but the lesson generalizes to SES, Postmark, SendGrid — any provider that verifies sending domains. To send from an address, the provider has to have verified that you own its domain. We had verified a subdomain dedicated to sending, mail.ourdomain.com. But an environment variable pointed the from address at the bare apex, crew@ourdomain.com.

The provider had no verification record for the apex, so it rejected every send with a 403: the ourdomain.com domain is not verified.

Here is the part that turned a one-line config typo into a weeks-long silent outage: the provider returned the rejection as a value, not an exception. Modern SDKs increasingly hand back an object shaped like data-or-error instead of throwing. Our code awaited the send and returned success without ever inspecting the error field. A thrown error would have hit our catch and shown up in the logs. A returned error sailed straight through.

So: unverified domain, provider returns an error object, code ignores the error object, success response, silent failure across every email path in the product.

## Why "it worked in dev" did not save us

In development, sends are a no-op — no API key, or a dry-run flag. Nobody ever saw a real rejection locally. The first real send happened in production, where the failure was invisible by construction. The gap between "the code ran" and "the mail arrived" was exactly the gap we had no test for.

## The fix, in two parts

First, point the sender at the verified domain. One environment change moved from to crew@mail.ourdomain.com. We proved it with a direct API call before trusting anything: sending from the apex returned a 403, sending from the verified subdomain returned a real message id. That five-minute check is the entire difference between "I think it works" and "it works."

Second, stop ignoring the provider's error value. The send helper now inspects the returned error and treats it the same as a thrown one — it logs, surfaces, and on the paths that matter, fails loudly instead of returning a cheerful 200. We also hardened the code's default from address, which used to point at a domain we did not even control; now the fallback is the verified sending domain, so a missing variable degrades to "still works" instead of "silently 403s."

## Send from a subdomain on purpose

There is a second lesson hiding in the first. People reach for the clean apex address because it looks nicer in a from-line. For sending, a dedicated subdomain like mail.brand.com is the better practice, not a downgrade:

- It isolates your sending reputation from your root domain. If a campaign ever gets you flagged, it does not poison the domain your customers type into a browser.
- The provider's required DNS records — the DKIM key and a return-path — live on dedicated subdomains and do not collide with your apex's existing SPF or inbound mail routing.
- DMARC still aligns. The DKIM signature is signed as your root domain under relaxed alignment, so mail from the subdomain passes.

The apex is not a spam-filter win. Alignment, sender reputation, and engagement are what land you in the inbox. Send from the subdomain and keep the apex clean.

## What I would tell another team

1. A 200 is not a delivery. Verify the outcome, not the call. For email, that means at least one real send to a real inbox through the verified domain after every change to the sender or its domain.
2. Check the value, not just the exception. If your SDK returns an error field instead of throwing, an unchecked error is a silent failure waiting to happen. Give returned errors the same weight as thrown ones.
3. Make the fallback safe. Hardcoded defaults should point at infrastructure you actually control. A default that 403s is a landmine for the day someone forgets the variable.
4. Test the gap your dev environment hides. If sends are mocked locally, your only real test is in production — so build that test deliberately instead of discovering it by accident.

The bug was a one-line config mistake. The damage was multiplied by an API shape that fails by returning instead of throwing, and a code path that trusted the call instead of the outcome. We run a lot of small products on a small team, and the discipline that came out of this — verify the outcome, never the 200 — is now wired into every send path we ship.

If you want the kind of team that finds the silent failures before your customers do, [come say hello](https://bluewaveprojects.com/booking).`,
  },
  {
    id: "12",
    slug: "next-public-env-vars-docker-build-time-trap",
    title: "Why your NEXT_PUBLIC_ env var is undefined in production — the Docker build-time trap",
    excerpt:
      "You added a value to your env file, rebuilt the container, and it is still undefined in the browser. NEXT_PUBLIC_ variables are inlined at build time, but docker-compose env_file is runtime-only. Here is the fix, and how to confirm it took.",
    date: "2026-06-02",
    readTime: "6 min",
    category: "Engineering",
    categoryColor: "text-wave-400",
    gradient: "from-wave-400 to-ocean-500",
    author: {
      name: "John C. Thomas",
      role: "Founder, BlueWave Projects",
    },
    content: `You added an analytics ID to your production environment, rebuilt the container, deployed, and opened the site. The analytics script is not loading. You check the env file on the server — the value is right there. You check the browser — the variable is undefined. You rebuild again. Still undefined.

This one cost us an afternoon, so here is the explanation and the fix.

## The two kinds of environment variable

Next.js has two completely different lifecycles for environment variables, and the trap is not knowing which one you are dealing with.

Server-only variables — database URLs, API secrets, anything without the NEXT_PUBLIC_ prefix — are read at runtime. The running server process looks them up when a request comes in. Change the value, restart the process, done.

Public variables — anything prefixed NEXT_PUBLIC_ — are different. Next.js inlines them into the JavaScript bundle at build time. During the build, the compiler finds every reference to a NEXT_PUBLIC_ variable and replaces it with the string value as it existed at build time. By the time the code reaches the browser there is no variable lookup left — just a baked-in literal. If the value was not present when the build ran, the literal that got baked in is undefined, and it stays undefined until the next build.

## Why Docker makes this bite

Here is the exact sequence that burned us. Our production app runs in Docker, and docker-compose injects environment through env_file. That works perfectly for server-only variables, because env_file is a runtime mechanism — the values are present in the container's environment when the server process starts.

But env_file does nothing at build time. When the image was built, the Next.js build ran inside the Docker builder stage, where the env_file values were not present. So every NEXT_PUBLIC_ reference got inlined as undefined. Adding the value to the env file and restarting the container could never fix it, because the variable had already been frozen into the bundle during the build — and the build had not seen it.

We added the ID, rebuilt, and it baked in undefined again. The rebuild reran the build inside the same builder stage, which still could not see a runtime-only env_file. The fix had to reach the build stage, not the run stage.

## The fix: pass public vars as build args

A public variable has to be present during the build. In Docker that means a build argument, not a runtime env file. Three small changes:

1. In the Dockerfile builder stage, before the build step, declare a build ARG for the variable and promote it to an ENV so the build can read it.
2. In docker-compose, under the service build section, pass the value through as a build arg, substituting it from the host environment.
3. Provide that value to compose's substitution. Compose reads substitution values from a file named .env in the same directory — note this is compose's own .env, not your app's .env.production. Put the variable there. If your deploy excludes .env from its file sync, the value survives across deploys, which is what you want.

Now the build runs with the variable present, inlines the real value, and the browser gets the correct string.

## How to confirm it actually took

Because the value is baked into the bundle, you can verify the fix without opening browser devtools: fetch the deployed page and search the served HTML or the referenced script chunk for the value. If your ID appears in the bundle, the build saw it. If you find undefined where the ID should be, the build still did not get it. This is the same "grep the bundle, not the health check" habit that catches a lot of deploy lies.

## The one-sentence version

Server variables are read at runtime; NEXT_PUBLIC_ variables are frozen into the bundle at build time — so in Docker they must arrive as build args, and adding them to a runtime env file and rebuilding will silently bake in undefined.

We hit this wiring an analytics property into a production marketing build. It is a five-minute fix once you understand the lifecycle, and an afternoon of rebuilding in circles if you do not.

If your team is shipping Next.js on Docker and these are the edges you would rather someone had already hit for you, [we are around](https://bluewaveprojects.com/booking).`,
  },
  {
    id: "13",
    slug: "a-green-health-check-is-not-a-deploy",
    title: "A green health check is not a deploy — grep the bundle",
    excerpt:
      "A deploy can report success and ship nothing — green pipeline, healthy container, missing feature. The ten-second habit that catches it: grep the live production bundle for a string you just shipped (a literal, not a function name).",
    date: "2026-06-02",
    readTime: "5 min",
    category: "Engineering",
    categoryColor: "text-wave-400",
    gradient: "from-emerald-500 to-teal-400",
    author: {
      name: "John C. Thomas",
      role: "Founder, BlueWave Projects",
    },
    content: `A deploy reported success. The health check was green. The feature was not there.

This has happened to us more than once across a dozen products, and it is one of the most disorienting bugs to chase, because every signal you normally trust is lying to you. The pipeline says deployed. The container is healthy. The site loads. And the change you just shipped is simply absent.

Here is why it happens and the one habit that catches it every time.

## Why a green deploy can ship nothing

A deploy is a chain: build the artifact, move it to the server, restart the thing that serves it. A successful deploy only means the chain did not error — not that the new code is now serving traffic. The gap shows up in a few predictable ways:

- The build cache served you stale output. An incremental build decided nothing changed and reused an old artifact, so your edit never made it into the bundle.
- The wrong directory got shipped. The build wrote to one path; the deploy copied from another. Both succeed; they just disagree about which files matter.
- The container did not actually restart. Compose found a running container it considered current and left it alone, so the old image kept serving.
- A CDN or edge cache is in front. The origin updated; the edge is still handing out yesterday's copy.

In every one of these, the health check passes because it only asks "are you up?" — not "are you the version I just built?"

## The habit: grep the live bundle for a string you just shipped

After every deploy, fetch the actual production asset and search it for a string that only exists in the change you just made. A new button label. A new route. A new constant. If the string is there, the new code is live. If it is not, the deploy lied, and you know it in ten seconds instead of after a confused customer email.

The discipline sounds trivial. It is the single highest-leverage ten seconds in our deploy process.

## The minified-name gotcha

One refinement we learned the expensive way: grep for string literals, not function or variable names.

Production bundlers minify. A function named handleCheckoutSubmit becomes a single letter. A component named AlarmPanel becomes something unrecognizable. If you grep the production bundle for the function name, you will not find it — and you will wrongly conclude the deploy failed when it actually succeeded.

But string literals survive minification. A user-facing label, a color hex, an object key that gets serialized, a URL path — those are still in the bundle verbatim. So pick your grep target deliberately: the new UI text you added, not the function that renders it. We once burned real time "confirming" a deploy had failed because we grepped for a function name that had been minified away. The feature was live the whole time.

## What this looks like in practice

For a static site, fetch the page and its referenced script chunks and grep across them. For an API, hit the new endpoint and assert the new shape. For a server-rendered app, request the page and grep the HTML for the new literal. The mechanism varies; the principle does not — assert the new thing exists in what production is actually serving, using a token that survives the build.

## What I would tell another team

1. A green pipeline means "no errors," not "new code is live." Those are different claims. Verify the second one.
2. Grep production for a string literal you just added — UI text, a path, a hex color. Not a function name; those get minified.
3. Make it the last step of every deploy, automated if you can. The cost is ten seconds; the alternative is finding out from a customer.
4. When the grep fails, suspect the boring causes first: build cache, wrong output directory, container not recreated, edge cache.

We ship from a small team across a lot of surfaces. "Verify the artifact, not the pipeline" is one of the handful of habits that lets us move fast without shipping ghosts.

If you want a team that treats "it deployed" as a hypothesis to test rather than a fact to trust, [say hello](https://bluewaveprojects.com/booking).`,
  },
  {
    id: "14",
    slug: "shipping-from-many-hands-into-one-repo-git-worktrees",
    title: "Shipping from many hands (and AI agents) into one repo without collisions",
    excerpt:
      "Two people — or two AI agents — building against the same main branch is a recipe for collisions. Isolated git worktrees, fast-forward-only merges, and commit-by-name make parallel work safe instead of destructive.",
    date: "2026-06-02",
    readTime: "7 min",
    category: "Engineering",
    categoryColor: "text-wave-400",
    gradient: "from-wave-400 to-ocean-500",
    author: {
      name: "John C. Thomas",
      role: "Founder, BlueWave Projects",
    },
    content: `We routinely have more than one worker shipping into the same repository at the same time — sometimes two people, increasingly two or more AI coding agents running in parallel, each building a different feature against the same main branch. That is a recipe for collisions: two workers editing near each other, half-finished work landing on main, force-pushes clobbering commits. Here is the workflow that keeps it clean.

## The problem with everyone sharing one working copy

The naive setup is one checkout of the repo, and whoever is working switches branches in it. The moment two workers share that single working directory you get chaos: switching branches stomps on uncommitted work, one agent's edit lands in another's commit, and "who changed this file" becomes unanswerable.

The fix is isolation at the filesystem level, not just the branch level.

## Git worktrees: one repo, many isolated working copies

Git worktrees let a single repository have multiple working directories checked out at once, each on its own branch, sharing one object store. Each worker — human or agent — gets a worktree created off the latest origin/main. They edit, build, and commit entirely inside their own directory. Nobody is switching branches under anybody else. Nobody's uncommitted work is at risk from someone else's checkout.

Created fresh off origin/main, a worktree is a clean room: the worker sees exactly main plus their own changes, nothing else in flight.

## Fast-forward-only integration

The second half of the discipline is how work gets back to main. We push each worktree's branch to main as a fast-forward only. If main has moved since the worktree was created, the push is rejected, and the worker rebases onto the new main and tries again. No merge commits papering over divergence, no force-pushes overwriting someone else's work. Main only ever moves forward, one clean commit chain.

This matters most with parallel agents. An agent that blindly merges or force-pushes can silently erase a commit another agent just landed. Fast-forward-only makes that impossible: the push simply fails, and the agent has to reconcile with reality first.

## Commit by name, never "add everything"

The third rule: commit specific files by name, never a blanket "stage everything." When multiple workers share a repo's history — and especially when an environment has unrelated uncommitted changes lying around (a half-done config, a generated file, another worker's experiment) — staging everything sweeps up things that should not be in your commit. Naming the files you actually changed keeps each commit tight and attributable, and keeps you from accidentally shipping someone else's work-in-progress.

## Why this works for AI agents specifically

The same properties that help a human team are the ones that make parallel AI agents safe:

- Isolation means an agent cannot see or trip over another agent's half-written files.
- Fast-forward-only means an agent physically cannot clobber a landed commit; it must reconcile first.
- Commit-by-name means an agent's commit contains only what it intended, even in a messy working environment.

An agent does not get tired, but it also does not have a human's instinct for "wait, that file is not mine." The workflow has to enforce what instinct would. Worktrees plus fast-forward-only plus commit-by-name encode that instinct as rules the tooling enforces.

## The one cost

Worktrees are not free: each is a full working directory on disk, and for some toolchains each needs its own dependency install. For a heavy dependency tree that is real disk and setup time. We treat worktrees as disposable — create off main, do the work, push, remove. The cleanup matters; orphaned worktrees pile up fast when you create one per feature.

## What I would tell another team

1. Give every parallel worker its own worktree off the latest main. Isolation beats coordination.
2. Integrate fast-forward-only. If the push is rejected, that is the system protecting a commit you would otherwise have erased.
3. Commit named files, not everything. Tight commits survive a messy shared environment.
4. Treat worktrees as disposable and clean them up.

We run this every day with a mix of human and agent contributors against shared main branches. It is the difference between parallelism that compounds and parallelism that corrupts.

If you are figuring out how to let AI agents ship real code into a real repo without stepping on each other, [we have opinions](https://bluewaveprojects.com/booking).`,
  },
  {
    id: "15",
    slug: "pruning-thin-pages-for-seo-without-losing-content",
    title: "Pruning 13,000 pages for SEO without losing content",
    excerpt:
      "A directory that auto-generates a page per tag quietly accumulates hundreds of thin pages that tax your crawl budget. How we pulled about 900 pages out of the index with noindex and sitemap pruning — without deleting any real content.",
    date: "2026-06-02",
    readTime: "7 min",
    category: "Engineering",
    categoryColor: "text-wave-400",
    gradient: "from-emerald-500 to-sky-400",
    author: {
      name: "John C. Thomas",
      role: "Founder, BlueWave Projects",
    },
    content: `One of our products is a webcam directory with roughly 13,000 pages. Google was crawling it, but a large slice of those pages were doing nothing for us — thin tag pages with one camera on them, auto-generated code pages, near-empty aggregations. They were not ranking, and worse, they were spending crawl budget that should have gone to the pages that could rank. Here is how we pulled about 900 pages out of the index without deleting a single piece of real content.

## Thin pages are a tax, not just dead weight

Search engines allocate a finite crawl budget per site. Every low-value URL a crawler spends time on is a high-value URL it visits less often. A directory that auto-generates a page for every tag, every category, every cross-section quickly accumulates hundreds of pages that each have almost nothing on them — a single listing, a heading, a footer. Individually harmless. In aggregate, they dilute the site's perceived quality and waste the crawler's time.

In our case the offenders were specific and identifiable:
- Tag pages with exactly one item (a tag that only ever applied to one thing)
- Auto-generated pages keyed off junk codes that no human would ever search
- Category aggregations that duplicated content already on better pages

About 474 of them. None worth indexing. All worth keeping accessible — some users do land on them — just not worth a slot in the index.

## noindex, not delete

The instinct is to delete thin pages. That is usually wrong. Deleting breaks any inbound links, loses pages that occasionally serve a user, and throws away content you might consolidate later. The right tool is almost always noindex.

A noindex directive tells search engines "you may crawl this, but do not put it in the index." The page still works for the human who lands on it from a direct link; it just stops competing for and diluting your search presence. We added noindex to the thin pages programmatically — the same template that generated them learned to mark the low-value ones.

The rule we encoded: a tag page with fewer than a threshold of real items, or matching a junk-code pattern, gets noindex. Everything above the threshold stays indexable. The logic lives in one place so it stays consistent as the directory grows.

## Drop the noindexed pages from the sitemap too

A sitemap is a list of pages you are explicitly asking the search engine to index. Listing a noindexed page in your sitemap sends two contradictory signals: please index this, and do not index this. Pick one. We pruned the sitemap to match the noindex logic — if a page is noindexed, it is not in the sitemap. The sitemap went from 13,974 URLs to 13,108, and every remaining URL is one we actually want ranked.

A subtle implementation note: your sitemap generator and your noindex logic have to agree, or you reintroduce the contradiction. We made the sitemap compute the same "is this indexable" check the pages use, so the two can never drift apart.

## What we did NOT touch

The content pages themselves — the actual thing people search for — were healthy and stayed fully indexable. This was not a content cull. It was removing the auto-generated chaff around good content so the good content gets the crawler's attention. The distinction matters: prune the aggregations and junk, never the pages that answer a real query.

## Reading the results in Search Console

After a prune like this, expect the noindex bucket in Search Console's coverage report to RISE — that is the intended outcome, not a regression. The number you want to watch fall over the following weeks is "Crawled — currently not indexed," which is the engine's way of saying "I spent budget here and decided it was not worth indexing." Move those pages to an explicit noindex and out of the sitemap, and the crawler stops wasting visits on them and reallocates to the pages that earn their place.

## What I would tell another team

1. Thin auto-generated pages are a crawl-budget tax. Audit how many your templates silently produce.
2. noindex, do not delete. Keep the page working for direct visitors; just pull it from the index race.
3. Make your sitemap and your noindex logic compute the same indexability check, so they can never contradict each other.
4. Expect the noindex count to rise and "crawled not indexed" to fall. That is the prune working.

The whole change was a few lines of template logic plus a sitemap that respects them. No content lost, about 900 low-value pages out of the index, and the crawler pointed at what matters.

If your site auto-generates more pages than you can name, [we can help you find the chaff](https://bluewaveprojects.com/booking).`,
  },
  {
    id: "16",
    slug: "recurring-events-wreck-your-sitemap",
    title: "Recurring events wreck your sitemap — the canonical-date dedup fix",
    excerpt:
      "A single weekly event, modeled naively, becomes dozens of near-identical URLs that Google flags as duplicates. How we collapsed 532 recurring-event URLs to 98 with canonical dates — losing no events.",
    date: "2026-06-02",
    readTime: "6 min",
    category: "Engineering",
    categoryColor: "text-wave-400",
    gradient: "from-lava-500 to-amber-400",
    author: {
      name: "John C. Thomas",
      role: "Founder, BlueWave Projects",
    },
    content: `If you run an events site, recurring events are a quiet SEO landmine. A single weekly trivia night, encoded naively, can become dozens of near-identical URLs that Google flags as duplicate or low-value — and they drag the rest of your site down with them. We had 532 of these on one product. Here is how the cleanup worked.

## How recurring events explode your URL space

An event has a date. A recurring event has many dates. The naive model generates one URL per occurrence: the same trivia night, the same description, the same venue, at a different dated URL every single week, forever into the future and the past.

To a search crawler these look like dozens of pages that are 95 percent identical — same title, same body, same everything except a date. That is the textbook definition of duplicate content. Multiply across every recurring event on the site and you have hundreds of near-dupes competing with each other and diluting the authority of your genuinely unique pages.

On the product in question, this produced 532 occurrence URLs where a few dozen distinct events would have been the honest count.

## The symptom in Search Console

The tell was a spike in "Excluded by noindex" and duplicate-content signals in Google Search Console. Google was finding all these occurrence pages, recognizing they were substantially the same, and declining to index most of them — while still spending crawl budget discovering them. The site looked, to Google, like it was padding its page count with reruns.

## The fix: a canonical page per event, dated views deduped

The model we moved to: each distinct event has ONE canonical page. Individual dated occurrences either do not get their own indexable URL at all, or they point a canonical link back to the single event page. The recurring schedule lives on the canonical page (every Tuesday, 7pm) instead of being exploded into one page per Tuesday.

We kept a canonical dated view where it genuinely helps a user — someone linking to a specific night — but those views declare the main event page as their canonical, so search engines consolidate all the signal onto one URL instead of splitting it across fifty.

The sitemap result: the recurring-event URLs collapsed from 532 to 98 — the actual number of distinct, indexable events plus the handful of dated views worth surfacing. Every remaining URL is something a person would actually search for.

## Where the dedup has to live

An important detail: the dedup belongs in the sitemap-generation and canonical logic, and ideally upstream in how occurrences are stored, not bolted on as an afterthought. If your scraper or importer creates a row per occurrence, the explosion starts at the data layer and every downstream surface inherits it. Collapsing recurring events to one event plus a recurrence rule at ingest is the cleanest fix; canonical tags are the safety net when you cannot change ingest.

## What I would tell another team

1. Model recurring events as one event plus a recurrence rule, not one row per occurrence. The data shape drives the URL shape.
2. If you must expose dated occurrence URLs, point their canonical at the single event page so search engines consolidate the signal.
3. Keep occurrence URLs out of the sitemap unless they are individually worth ranking. The sitemap is a request to index, not a dump of every row.
4. Watch "Excluded by noindex" and duplicate flags in Search Console — a recurring-event explosion shows up there first.

The change took an events site from looking like a duplicate-content farm to looking like what it is: a few dozen real events, each with one clean page. 532 to 98, no events lost.

If your events calendar is quietly generating reruns Google hates, [we have done this cleanup before](https://bluewaveprojects.com/booking).`,
  },
  {
    id: "17",
    slug: "why-your-4242-test-card-fails-in-production-stripe",
    title: "Why your 4242 test card 'fails' in production — the Stripe live-key QA trap",
    excerpt:
      "You push checkout to production, run the 4242 test card to confirm it works, and it declines. Nothing is broken — test cards only work with test keys. How to actually QA a live payment funnel.",
    date: "2026-06-02",
    readTime: "5 min",
    category: "Engineering",
    categoryColor: "text-wave-400",
    gradient: "from-wave-400 to-glacier-300",
    author: {
      name: "John C. Thomas",
      role: "Founder, BlueWave Projects",
    },
    content: `Here is a five-minute lesson that has confused more than one capable engineer on our projects: you push your payment integration to production, run the famous 4242 4242 4242 4242 test card to make sure checkout works, and it gets declined. Nothing is broken. You are just holding the wrong key.

## Test cards only work with test keys

Stripe, and most payment processors, run two completely separate environments: test mode and live mode. They have different API keys — a test secret key and a live secret key — and the two environments do not talk to each other. Test mode has fake money, fake payouts, and a set of magic card numbers like 4242 4242 4242 4242 that always succeed, 4000 0000 0000 0002 that always declines, and so on.

Those magic numbers only work against a test-mode key. The moment your production environment is configured with a live secret key — which it must be, to take real money — the 4242 card is just an invalid card number to the live network. It declines, correctly. Your integration is fine; you asked the real payment network to charge a card that does not exist.

## Why this trips people up

The confusion comes from the fact that everything else looks identical. Same checkout page, same API calls, same code path. The only difference is which key the environment loaded, and keys are invisible — they live in environment variables you do not look at while clicking through a checkout. So you test the way you always tested in development, with 4242, and in production it fails, and the natural conclusion is "my deploy broke checkout." It did not. A test card met a live key.

## How to actually QA a live payment funnel

You have a few honest options, in rough order of preference:

1. Verify everything up to the charge. Confirm the live integration creates a valid checkout session with the right amount and currency, the correct success and cancel URLs, a registered and reachable webhook endpoint, and that an unsigned webhook is rejected. All of that can be checked on live keys without charging anything. This catches the overwhelming majority of integration bugs.

2. Make one real charge with a real card, then refund it. The only way to truly exercise the live charge-to-webhook-to-fulfillment path is a real card. Charge the smallest real amount, confirm the webhook fires and your system grants what it should, then refund. It costs a few cents in fees and buys total confidence.

3. Run test keys in a staging copy. If you have a staging environment, point it at test keys and run the full 4242 flow there, so the only thing different in production is the key, not the code.

What you should not do is conclude that a 4242 decline on live keys means your checkout is broken. It means your QA method assumed test mode.

## The webhook half nobody tests

While we are here: the charge is only half the funnel. The half that actually grants the customer what they paid for is the webhook — the processor calling your server to say this payment completed. A checkout that creates a session but whose webhook handler is misconfigured will take the money and deliver nothing. Test the webhook explicitly: confirm it is registered for the right events, that a properly signed event grants access, and that an unsigned or tampered event is rejected. On live keys you can verify the registration and the signature-rejection without a real charge.

## What I would tell another team

1. 4242 is a test-mode card. On live keys it declines, and that is correct, not a bug.
2. Verify the whole live funnel except the charge itself with no money moving: session creation, amounts, URLs, webhook registration, signature rejection.
3. For full confidence, make one real minimal charge and refund it. A few cents buys certainty the test card can never give you on live keys.
4. Test the webhook, not just the checkout. The webhook is what delivers the thing; a silent webhook failure takes money and ships nothing.

Payments are the one place where "looks like it works" is most expensive to get wrong. Knowing exactly why the test card declines in production is the difference between a five-minute shrug and an afternoon chasing a bug that was never there.

If you want a team that has wired real payment funnels and knows where the traps are, [reach out](https://bluewaveprojects.com/booking).`,
  },
  {
    id: "18",
    slug: "keep-memory-dashboard-and-reality-in-sync",
    title: "Keep your task tracker, your notes, and reality in sync — or pay for it twice",
    excerpt:
      "On a small team the most expensive bug is the work you do twice because your notes, your task tracker, and reality disagreed. The three-way sync discipline — and why it gets load-bearing once AI agents are in the loop.",
    date: "2026-06-02",
    readTime: "6 min",
    category: "Engineering",
    categoryColor: "text-wave-400",
    gradient: "from-ocean-500 to-wave-400",
    author: {
      name: "John C. Thomas",
      role: "Founder, BlueWave Projects",
    },
    content: `On a small team shipping a lot of products, the most expensive bug is not in the code. It is the work you do twice because three different sources disagreed about whether it was already done.

We track work in three places, and so does almost everyone:
- Notes — the running context of what is being worked on, what is blocked, what is next. For us this is a set of memory files; for you it might be a doc, a wiki, the descriptions in an issue tracker.
- A task tracker — the dashboard or board with the explicit list of to-dos and their statuses.
- Reality — what is actually built, deployed, and live right now.

When those three drift apart, you pay for it. Repeatedly.

## How the drift happens

Drift is the default, not the exception. You finish a feature and ship it (reality moves) but forget to close the ticket (tracker stale) and never update your notes (notes stale). Now two of your three sources say the work is undone. The next time you — or a teammate, or an AI agent — sit down and read the tracker or the notes, you re-suggest work that is already live. Best case you waste ten minutes verifying. Worst case you redo it, or you tell a customer something false because a note claimed a thing shipped that never did.

We have been burned in both directions: a note that said a feature was deployed when it was not, so we nearly sent someone to a dead link; and a tracker full of pending items that were all long since done, so a fresh session kept proposing finished work.

## The discipline: log as you go, and trust reality over notes

Three rules keep the sources honest.

1. Log at completion, not at the end of the day. The moment a task is genuinely done — deployed, verified — close the ticket, update the notes, and record what changed. Batching it for later is how drift creeps in, because later you have forgotten the details and you skip half of them. Update all three sources in the same breath as finishing the work.

2. Reality is the tiebreaker. When a note and the tracker and your memory disagree, do not guess — go look. Is the endpoint live? Is the commit on the main branch? Is the string in the production bundle? Reality is the only source that cannot lie to you, and checking it is cheap. Our rule: never tell someone to do something without first checking whether it is already done.

3. Distrust stale optimism. A note that says done, written by a past self or a past session, is a claim, not a fact — especially if it is the only source that says so. The most dangerous artifact in any system is a confident status update that nobody verified. Treat unverified done markers as hypotheses until reality confirms them.

## Why this gets worse with AI agents

When the people doing the work include AI agents running across sessions, the drift problem sharpens. An agent starts fresh each session with no memory except what is written down. If the notes are stale, the agent confidently acts on stale information — re-suggesting done work, or worse, "fixing" something that was deliberately the way it was. The three-way sync stops being good hygiene and becomes load-bearing: the written record IS the agent's reality, so the written record has to match the actual reality or the agent operates on fiction.

The fix is the same, just enforced harder: log at completion, make reality the tiebreaker, and verify before you trust any done.

## What I would tell another team

1. Update notes, tracker, and reality in the same motion you finish the work. Drift is a batching problem.
2. When sources disagree, check reality. It is the only one that cannot be wrong.
3. Treat any unverified done as a hypothesis, no matter how confident it sounds.
4. If AI agents are in your loop, your written record is their reality — keep it true or they will act on the lie.

None of this is glamorous. It is the operational discipline that separates a small team that moves fast from a small team that keeps stepping on its own footprints. The cost of keeping the three in sync is a few seconds per task. The cost of letting them drift is doing the work twice and occasionally being confidently wrong.

If you want a team that keeps its records honest enough to move fast safely, [come talk to us](https://bluewaveprojects.com/booking).`,
  },
  {
    id: "19",
    slug: "ai-that-reads-a-sea-service-letter",
    title: "AI that reads a sea-service letter — turning a messy PDF into structured vessel time",
    excerpt:
      "A sea-service letter is one of the messiest documents in the maritime world — and the gate to every USCG license upgrade. How we built layout-aware document AI that turns an unstructured PDF into structured, validated sea time, with the human kept on the judgment.",
    date: "2026-06-02",
    readTime: "6 min",
    category: "Engineering",
    categoryColor: "text-wave-400",
    gradient: "from-emerald-500 to-teal-400",
    author: {
      name: "John C. Thomas",
      role: "Founder, BlueWave Projects",
    },
    content: `A sea-service letter is one of the messiest documents in the maritime world. It is how a mariner proves the time they have spent aboard a vessel — and it is the gate to every USCG license and endorsement upgrade. It is also, almost always, an unstructured mess: a PDF or a phone photo of a letter on a company's letterhead, every operator formatting it differently, the vessel name buried in a paragraph, the tonnage written three ways, the dates in whatever style the office manager preferred.

Mariners hate entering this by hand. We built AI that reads it for them. Here is how, and why it is harder than it looks.

## Why this is not a solved problem

"Extract fields from a document" sounds like solved territory — and for a structured form, it is. A sea-service letter is the opposite of a form. There is no fixed layout. One operator writes "M/V Pacific Hunter, 1,600 GRT, served as Master from 03/2022 to 11/2023, coastwise." The next writes a three-paragraph narrative with the vessel, tonnage, route, and days scattered through it. The next sends a slightly rotated scan where the tonnage is inside a header logo.

The fields a mariner actually needs out of it are specific and consequential:
- Vessel name and official number
- Gross tonnage, and which measurement system
- Propulsion and horsepower
- Capacity served — Master, Mate, AB, OS, and so on
- Route and waters — inland, near-coastal, oceans
- Start and end dates, and the number of days that count toward sea time

Get the tonnage or the days wrong and you can misadvise someone about an endorsement they are not actually eligible for yet. The cost of a confident wrong answer here is real.

## The approach: vision in, structured data out

The pipeline is short, but every stage earns its place. The document is normalized — a photo de-skewed and made legible, a PDF rendered. Then a vision-capable model reads the whole document with layout awareness, so the tonnage in a header and the dates in a paragraph are both in play — not as flat OCR text.

The model is not asked to summarize the letter. It is given a strict schema — vessel, tonnage, capacity, route, start date, end date, computed days — and required to return data conforming to it, with a field left explicitly empty when the letter genuinely does not state it. That last part matters: the system has to be willing to say "the letter does not specify horsepower" instead of inventing a plausible number. An invented field is worse than a missing one.

Finally, the extracted values are validated against what is mechanically checkable — dates in order, days consistent with the range, tonnage within plausible bounds — and anything that fails is flagged for the human rather than silently accepted.

## The human stays in the loop, on purpose

We do not auto-submit anything. The extraction is a draft the mariner reviews. The win is not "the AI did it"; the win is that the mariner goes from a blank form and a drawer full of letters to a pre-filled draft they correct in a minute instead of transcribing for twenty. The model does the tedious reading; the human does the judgment.

This is the same philosophy we apply everywhere we put a model in production: the AI shows up where a human is otherwise stuck doing transcription, and a deterministic layer checks its work. The model is fast and tireless and occasionally wrong; the validation and the human review are what make it trustworthy.

## What I would tell another team building document AI

1. If the documents are unstructured and operator-specific, layout-aware vision beats raw OCR plus regex. The information is in the layout as much as the text.
2. Force a schema and allow explicit empties. A model that can say "not stated" is worth far more than one that always fills every field.
3. Validate what is mechanically checkable. Dates, ranges, and bounds catch the confident-but-wrong extractions before a human sees them.
4. Keep the human on the judgment, not the typing. The value is in deleting transcription, not decisions.

If you have a pile of messy real-world documents you wish were structured data, [we have built this before](https://bluewaveprojects.com/booking).`,
  },
  {
    id: "20",
    slug: "a-browser-webgl-radar-arpa-trainer",
    title: "We built a full radar/ARPA trainer in the browser — WebGL, no install",
    excerpt:
      "Every mariner working toward a radar endorsement has to learn to read a scope. We built a full WebGL radar and ARPA training simulator that runs in a browser tab — no install — with real relative-motion geometry, CPA/TCPA, trial maneuvers, and the IMO instruments.",
    date: "2026-06-02",
    readTime: "7 min",
    category: "Engineering",
    categoryColor: "text-wave-400",
    gradient: "from-wave-400 to-ocean-500",
    author: {
      name: "John C. Thomas",
      role: "Founder, BlueWave Projects",
    },
    content: `Every mariner working toward a radar endorsement has to learn to read a radar display — to take the blips on a Plan Position Indicator, plot their motion, and work out whether the ship three miles off the bow is going to pass safely or put you on a collision course. Traditionally you learn this in a classroom simulator or on a real bridge. We built one that runs in a browser tab.

No install, no license dongle, no scheduled lab time. Open a URL and you are looking at a live radar scope. Here is what went into it and why the browser was the right call.

## What it actually is

It is a WebGL radar and ARPA (Automatic Radar Plotting Aid) training simulator. On screen: a Plan Position Indicator with a rotating sweep, your own ship at center, and traffic moving around you in real time. You can place targets, set their course and speed, and then practice the actual skills the exam tests:

- Reading relative motion versus true motion
- Working out CPA and TCPA — the closest point of approach and the time until it
- Running a trial maneuver — "if I turn 20 degrees right, does that target clear?" — before committing
- Using the bridge instruments — electronic bearing lines, variable range markers, guard zones
- Applying the Rules of the Road to what the scope is telling you

It is not a toy animation of a radar. The geometry is real: the relative-motion vectors, the CPA math, the way a target's trail behaves under true versus relative motion are all computed the way an actual ARPA computes them.

## Why the browser

The obvious objection is that serious simulators are native applications. For training, the browser wins for one specific reason: access. A mariner studying for an endorsement does not want to install software, manage a license, or book lab time. They want to practice on a phone on a crew-change flight, or on a laptop at the galley table. The lowest-friction path to "practice the skill ten more times" is a URL.

The browser also means every update is instant — no app-store review, no version anyone has to update. We ship an improvement and the next person to open the scope has it.

## The hard part: a radar scope in WebGL

A radar PPI is a genuinely demanding thing to render. The sweep rotates and paints returns that then fade; sea clutter and rain have to look and behave plausibly; targets leave trails whose shape encodes their motion; and all of it has to stay smooth while the simulation computes target geometry every frame.

We render the scope in WebGL with custom shaders — the sweep, the afterglow, the clutter are GPU work, not DOM elements. The simulation layer — target motion, CPA/TCPA solutions, the ARPA tracking, the collision-rules logic — runs alongside and drives what the shaders draw. Keeping the graphics on the GPU is what lets the whole thing hold a smooth frame rate on a phone, which is exactly where a studying mariner often is.

## Depth is the moat

The easy 80 percent of a radar sim is a rotating line and some dots. The 20 percent that makes it a training tool is the domain depth: the IMO-spec instruments behaving correctly, the collision-rules logic giving the right guidance for a given encounter, the trial maneuver actually solving the geometry, the guard zones alarming when they should. That depth is where most "radar simulators" stop and where a real trainer has to keep going. It is also the part you cannot fake — a mariner will spot a wrong CPA instantly.

## What I would tell another team

1. For training tools, access beats fidelity. A slightly simpler simulator everyone can open beats a perfect one nobody installs.
2. Put the heavy visuals on the GPU. Custom shaders are what let a demanding real-time display run smoothly on the device the user actually has — often a phone.
3. The domain depth is the product. Anyone can render a sweep; the value is in the instruments and the rules being correct.
4. Ship to a URL so every improvement reaches every user immediately.

If you have a hard skill that people currently learn from a textbook and you suspect they would learn it faster by doing it, [that is the kind of thing we build](https://bluewaveprojects.com/booking).`,
  },
  {
    id: "23",
    slug: "ai-tools-for-hawaii-str-hosts",
    title: "AI tools every Hawaii short-term rental host should be using in 2026",
    excerpt:
      "STR compliance in Hawaii is a moving target — county rules, TAT/GET deadlines, inspection checklists. Here's how Hawaii hosts are using AI to stay compliant and cut the paperwork in half.",
    date: "2026-06-16",
    readTime: "7 min",
    category: "Hawaii Operators",
    categoryColor: "text-wave-400",
    gradient: "from-wave-400 to-ocean-500",
    author: {
      name: "John C. Thomas",
      role: "Founder, BlueWave Projects",
    },
    content: `Running a short-term rental in Hawaii is not like running one anywhere else. You are navigating a patchwork of county ordinances (Oahu's Bill 41, Maui's strict hosted/unhosted split, the Big Island's zoning overlays), state TAT and GET obligations, and the ever-present risk of a complaint-driven inspection shutting you down before your peak season. The paperwork alone is a part-time job.

This is exactly the kind of problem AI is good at. Not the AI that writes you a generic email — the kind that knows your county's rules, tracks your deadlines, and turns a 45-minute compliance checklist into a 5-minute confirmation.

Here is what Hawaii hosts are actually using in 2026, and where the real gains are.

## 1. Automated compliance checklists tied to your county

Every county has different requirements. Oahu's Residential A zoning has hosted-only rules. Maui's STR permit requires annual renewal with a county inspector sign-off. Kauai has hard caps on non-hosted units in certain zones.

An AI tool connected to your permit data and county ordinance database can generate a compliance checklist for *your specific property* — not a generic national template. It knows your zoning classification, flags what's expiring, and surfaces the county-specific documentation you need before an inspection.

The difference between a generic checklist and a property-specific one is the difference between "check your permits are current" and "your Maui STR permit (STR-XXXX) expires in 34 days — here is the renewal link and the 7 documents the county requires."

## 2. TAT and GET deadline tracking

Hawaii's Transient Accommodations Tax and General Excise Tax filings are monthly or quarterly depending on your revenue. Missing a filing costs 5% per month in penalties plus 8% annual interest. Most STR hosts on the continent don't deal with anything equivalent — they file once a year and forget it.

AI-driven calendar tools can pull your booking revenue from Airbnb or VRBO, calculate your expected TAT and GET liability, and send you a reminder 10 days before the filing deadline with the exact numbers. No spreadsheet. No "I think it's due sometime this month."

## 3. Guest communication that actually handles Hawaii-specific questions

Guests booking a Hawaii STR have questions that a Phoenix host never gets: ocean entry conditions, lava zone disclosures (mandatory in certain Big Island areas), hurricane season considerations, reef-safe sunscreen requirements on county beaches. Generic AI chat tools give generic answers.

A tool trained on your property's specifics — your ocean entry, your nearest beach access, your local rules — can handle these automatically and correctly. The lava zone disclosure question gets the right zone designation, not a hallucinated one.

## 4. Scope and pricing for turnovers

The Hawaii rental market has a tight labor pool for cleaning and turnover crews. AI scope tools let you define a standard turnover checklist, adjust it by guest count and stay length, and send it to your cleaner with the right level of detail every time — no phone tag, no "same as last time" miscommunications.

For hosts with multiple units, this is where AI saves the most time: generating per-unit turnover briefs automatically after each checkout, pre-loaded with the details your crew needs (number of guests, check-in time for the next party, any owner notes from the booking).

## 5. Review response — at scale, in the right tone for your property

Hawaii's hospitality culture has a specific register. A canned "Thanks for your review!" response reads as mainland corporate to a guest who just spent a week in Kailua. AI tools that understand your property's voice — the story of the house, the neighborhood, the aloha spirit of the stay — can generate first drafts of review responses that sound like they came from a host who cares, not a software company.

The real unlock is speed: a host managing 3+ units who responds to every review within 24 hours sees measurably better search placement on both Airbnb and VRBO. AI makes that achievable without it becoming a daily 45-minute task.

## Where we fit

We built Ikena specifically for Hawaii operators who are drowning in compliance paperwork and vendor coordination. It's not a national STR tool with a Hawaii checkbox — it's built around Hawaii's actual regulatory structure, the DCCA permit workflows, county-specific deadlines, and the unique operational realities of running a property in a place where the rules, the labor market, and the guests are all distinctly local.

If your STR compliance workflow still runs on a spreadsheet and calendar reminders, [talk to us](https://bluewaveprojects.com/booking). The software should handle the paperwork so you can focus on the part of hosting that actually matters.`,
  },
  {
    id: "24",
    slug: "automating-dcca-permit-tracking-hawaii",
    title: "Automating DCCA permit tracking in Hawaii: what's possible in 2026",
    excerpt:
      "Hawaii's DCCA permit process is notoriously manual. Here's how contractors and property managers are using AI to track applications, catch expiration dates, and stop losing jobs to permit delays.",
    date: "2026-06-16",
    readTime: "6 min",
    category: "Hawaii Operators",
    categoryColor: "text-ocean-400",
    gradient: "from-ocean-500 to-wave-400",
    author: {
      name: "John C. Thomas",
      role: "Founder, BlueWave Projects",
    },
    content: `Hawaii's Department of Commerce and Consumer Affairs handles licensing, permits, and professional registrations for contractors, electricians, plumbers, engineers, and dozens of other trades working in the state. If you work in construction or property management in Hawaii, you deal with DCCA constantly — and if you've dealt with it for more than a year, you know it is not fast.

The DCCA online portal exists. It works. But it does not send you reminders when a permit is about to expire, it does not aggregate your active applications across projects, and it does not tell you what documentation gap is holding up an approval. For a solo contractor managing 6 active jobs, that's a lot of manual checking.

Here is what's actually possible now with AI-assisted permit tracking.

## The core problem: expiration dates across multiple permits and licenses

A licensed Hawaii general contractor typically holds: a C license from DCCA, a liability insurance certificate on file with the county, a bond, and a workers' comp policy — each with its own renewal date. Add in project-specific building permits (from the county DPP, not DCCA), electrical permits, plumbing permits, and grading permits, and a 3-job pipeline has 20+ documents with 20+ expiration dates.

Missing a single one can stop a job. If your C license lapses during a project, you cannot legally bill for the work you did. If your building permit expires before the county inspection, you need a new permit and a new fee.

AI tools built around your permit portfolio can:
- Pull renewal dates from uploaded documents and set rolling reminders at 90/60/30 days
- Flag permit chains where a downstream permit depends on an upstream one (you can't get your electrical final until the building inspection clears)
- Generate the renewal document checklist for each license type automatically

## Status tracking without manual portal checks

The DCCA portal updates in real time when application status changes, but it won't notify you. An AI-assisted scraper layer (within DCCA's terms, checking your own applications) can surface status changes to a dashboard you actually check — your phone or your project management tool — rather than requiring a daily portal visit.

For a multi-project contractor, the difference is meaningful: instead of checking 6 project portals every morning, you get a single summary of what changed overnight and what needs action today.

## Document package generation for submissions

The DCCA and county DPP have standard document requirements for each permit type. An AI tool that knows those requirements can generate a checklist tailored to your project type — new construction versus renovation versus addition, residential versus commercial — and flag missing documents before you submit, not after the counter rejects your package.

Rejection-and-resubmission is the most expensive part of the Hawaii permit process. Every rejection adds 2-6 weeks. A pre-submission check that catches 80% of common errors pays for itself on the first project.

## The contractor-specific angle: license verification for subs

If you're a GC managing subcontractors, you're on the hook if a sub's DCCA license lapses mid-project. An AI tool can run a verification check on every sub's license at project start and flag expirations before the work starts — not after the county inspector shows up and asks to see credentials.

## What we built

PermitPaddler is our Hawaii permit tracking tool. It handles the document intake, the expiration reminders, the county-specific checklists, and the sub-verification workflow for Hawaii contractors and property managers. It's not a generic permit tracker — it knows Hawaii's specific license types, the DPP permit categories, and the DCCA renewal requirements for the trades that work here.

If permit tracking is still happening in a shared Google Sheet, [that conversation is worth having](https://bluewaveprojects.com/booking).`,
  },
  {
    id: "25",
    slug: "ai-for-hawaii-harbor-managers",
    title: "How AI helps Hawaii harbor managers cut through the paperwork",
    excerpt:
      "Hawaii's small boat harbors are some of the most active in the Pacific — and some of the most understaffed. Here's how AI tools are helping harbor managers handle slip assignments, vessel compliance, and tenant communications without growing headcount.",
    date: "2026-06-16",
    readTime: "6 min",
    category: "Hawaii Operators",
    categoryColor: "text-wave-400",
    gradient: "from-wave-400 to-ocean-600",
    author: {
      name: "John C. Thomas",
      role: "Founder, BlueWave Projects",
    },
    content: `Hawaii's small boat harbors — Ala Wai, Keehi, Ko Olina, Kaneohe, Haleiwa, Nawiliwili, Maalaea, Lahaina, Hilo, Honokohau — are managed by DLNR's Division of Boating and Ocean Recreation (DOBOR). The state manages the slips; individual harbor offices handle the day-to-day: tenant check-ins, vessel documentation, transient assignments, maintenance requests, compliance tracking.

Most harbor offices run with a staff of 2-4 people managing hundreds of slips, thousands of annual transient calls, and a documentation load that hasn't changed much in decades. The mismatch between that headcount and that workload is where AI can actually help — not by replacing the harbor staff, but by handling the repetitive documentation work so they can focus on the operational decisions only a human can make.

Here's where the real gains are.

## Slip assignment and waitlist management

Hawaii's state harbors have long waitlists. Ala Wai has a multi-year wait for certain slip sizes. Managing that waitlist — tracking positions, notifying applicants when a slip opens, matching vessel beam and LOA to available berths — is a manual process that ties up hours every week.

An AI tool can maintain the waitlist database, automatically score incoming slips against waiting vessels by size match, and draft the notification letters for harbor staff to review and send. The decision of who gets the slip stays with the harbor manager. The paperwork generating that decision doesn't have to.

## Vessel documentation compliance

Every vessel in a state slip needs a current DLNR registration (or USCG documentation for federal vessels), current insurance, and current safety equipment certification. For a 200-slip harbor, tracking 200 vessels' document expiration dates is a spreadsheet job that falls behind constantly.

AI-assisted compliance tracking pulls the document inventory into a single dashboard, flags what's expiring in the next 30/60/90 days, and generates the compliance notice letters automatically. Harbor staff review the flagged list and confirm which letters to send — the system handles the generation and the tracking.

## Transient vessel check-in

Transient slips are a significant revenue source and a constant operational demand. Boats call ahead, boats show up without calling, boats arrive at 0200 from a passage. Processing a transient check-in — slip assignment, fee collection, safety briefing acknowledgment, registration verification — takes time that compounds when multiple boats arrive together.

A digital check-in flow with AI-assisted document capture (photograph the registration, extract the vessel name and numbers, pre-fill the slip assignment form) cuts the processing time per vessel significantly. It also creates a searchable record of every transient that came through — useful when DLNR asks for occupancy reports.

## Maintenance request routing and prioritization

Tenant maintenance requests come by phone, by email, by someone walking into the office. Tracking them, routing them to the right crew, and following up when they're not resolved is a coordination job. An AI dispatch layer can categorize incoming requests (structural, electrical, water, access), assign priority based on safety impact, and create work orders that track from submission to completion — without harbor staff having to manually update a whiteboard.

## What we built

Binnacle Harbor is our harbor management platform for exactly this context: Hawaii and Alaska small boat harbors with the specific operational realities of DLNR/DOBOR compliance, Pacific weather windows, and fishing fleet schedules that don't follow a 9-5 calendar.

If your harbor office is still running on spreadsheets and phone logs, [let's talk about what the alternative looks like](https://bluewaveprojects.com/booking).`,
  },
  {
    id: "26",
    slug: "ai-for-hawaii-maritime-charter-operators",
    title: "AI tools for Hawaii fishing charter and tour operators: the practical guide",
    excerpt:
      "Running a charter out of Hawaii means USCG compliance, DLNR licensing, booking management, and guest communications all at once. Here's how AI is cutting the admin load for Hawaii's maritime operators.",
    date: "2026-06-16",
    readTime: "7 min",
    category: "Hawaii Operators",
    categoryColor: "text-ocean-400",
    gradient: "from-ocean-400 to-wave-500",
    author: {
      name: "John C. Thomas",
      role: "Founder, BlueWave Projects",
    },
    content: `Running a charter operation out of a Hawaii harbor is one of the more operationally complex small businesses in the state. You're holding a USCG Certificate of Inspection for your vessel, a DLNR commercial use permit for state waters, a State of Hawaii business license, county business registration, and — if you're fishing — federal HMS permits from NOAA and a Hawaii commercial marine license. That's before you've booked a single trip.

The booking side adds another layer: guest communications, waivers, payment processing, weather-dependent rescheduling, crew scheduling, and the operational calls that happen every morning before a trip goes out. Most operators I know are running this off a combination of phone calls, text threads, and whatever booking platform they found first.

AI doesn't eliminate any of those compliance obligations. But it can handle the documentation and communication work that surrounds them, so the captain can focus on actually running the operation.

Here's where it makes the most difference.

## USCG COI compliance tracking

Your Certificate of Inspection specifies exactly what your vessel is certified to do: passenger count, operating area, route restrictions, safety equipment requirements. It expires. The annual USCG inspection requires documentation that your required equipment is current — EPIRBs in test date, flares not expired, life raft repacked on schedule.

An AI compliance tracker loaded with your COI terms knows your inspection cadence, tracks equipment expiration dates, and surfaces what needs to be renewed or replaced before an inspection — not after. For a 6-pack charter with a tight margin, a failed inspection is a cancelled week of trips. The cost of tracking is low; the cost of missing it is not.

## Pre-trip documentation and waiver management

Every commercial passenger vessel trip should have a float plan logged, a passenger manifest, and signed liability waivers. For a busy summer operator running 5 trips a week, that's 20+ manifest/waiver sets a month. Managing them manually means paper, a scanner, and a folder nobody looks at until there's a problem.

A digital pre-trip flow — guests complete their waiver online before arrival, the manifest auto-generates from the reservation, the float plan gets filed to a set recipient automatically — cuts the dock-side paperwork to near zero and creates a searchable record if USCG asks.

## Weather-dependent rescheduling communications

Hawaii's weather patterns are specific: trades stacking swells on the north shores in winter, summer Kona winds creating flat water on the west side, channel crossings between islands that have a narrow workable window. A captain knows these patterns; communicating them to mainland guests who booked 3 months ago and are showing up tomorrow is a constant communication job.

AI-assisted messaging can handle the rescheduling flow: pull tomorrow's marine forecast from NOAA, evaluate it against your operating parameters, draft the reschedule or proceed communication to affected guests, and push it for captain review before sending. The captain decides whether to go; the system handles telling the guests.

## Booking and crew scheduling integration

Crew scheduling for charter operations has its own complexity: captains with specific vessel certifications, mates with first aid requirements, guides with species-specific knowledge. When a trip books, the right crew needs to be available and notified — not texted individually from the captain's personal phone.

An AI scheduling layer can match trip bookings against crew availability, send automated crew assignments, and flag conflicts (two trips same morning, captain scheduled on the wrong vessel) before they become day-of problems.

## The compliance record that NOAA and DLNR want to see

Federal HMS permit holders are required to keep logbooks of their catch — species, weight, disposition. DLNR wants commercial marine license holders to maintain trip logs. Most operators keep these accurately in the moment and then struggle to produce organized records when an audit comes.

A simple AI-assisted trip log — captain enters species and weights after each trip, system maintains the structured record, annual reports generate automatically — turns a compliance burden into a 2-minute post-trip entry.

## What we built

Binnacle.ai is our maritime operations platform for exactly this type of operator: USCG-compliant vessel operations, Hawaii and Alaska waters, with the specific regulatory stack that commercial charter operators deal with. If your compliance workflow is still a filing cabinet and a phone, [let's talk](https://bluewaveprojects.com/booking).`,
  },
  {
    id: "27",
    slug: "sunrise-sunset-bug-honest-aurora-forecast",
    title: "The sunrise/sunset bug that almost broke an honest aurora forecast",
    excerpt:
      "Building a live 'will I see the aurora tonight' panel meant asking our solar-math a question it had never been asked before: is it dark RIGHT NOW. That question surfaced a real bug — at extreme longitudes, a day's computed sunset can come out numerically before its sunrise — sitting latent in code that had shipped fine for months.",
    date: "2026-07-10",
    readTime: "7 min",
    category: "Engineering",
    categoryColor: "text-wave-400",
    gradient: "from-wave-400 to-glacier-300",
    author: {
      name: "John C. Thomas",
      role: "Founder, BlueWave Projects",
    },
    content: `We build a portfolio of working sample sites — real geography, real live public data, honestly labeled — to show prospective clients what we build instead of just telling them. The newest one is a Fairbanks, Alaska aurora-tour sample, and its whole reason for existing is a single honest sentence most tourism sites won't print: a geomagnetic storm being active does not mean you can see it. It also has to be dark, and the sky has to be clear.

Building that gate meant asking our own sunrise/sunset math a question it had never been asked before — and that question found a real bug that had been sitting quietly in shipped code for months.

## The gate: darker than "the sun is down"

Most demos in the portfolio compute sunrise, sunset, and daylight length for a location — Homer, Valdez, Waikiki — and just display them. Nobody ever asks the code "is it dark right now, yes or no." It's a label, not a decision.

The aurora demo needed a decision. And plain sunset is the wrong bar for it: Fairbanks sits at 64.8°N, and for weeks around the summer solstice the sun sets and still leaves the sky bright with civil and nautical twilight. So "sunset" would tell a visitor in July that it's dark when it plainly is not. The honest threshold is nautical twilight — the sun 12° below the horizon, the point a bright aurora actually becomes visible — which is a stricter, later bar than plain sunset.

Once I computed that properly, Fairbanks doesn't clear nautical twilight again until roughly August 18, and loses it again around April 25. That's a real, live-computed number, and it happens to land almost exactly on the season the University of Alaska Fairbanks Geophysical Institute itself publishes — "roughly August 21 to April 21." An independent authority agreeing with our math to within a few days is about as good a proof-of-correctness as you get without a lab.

Getting there exposed the bug.

## The bug: sunset computing before sunrise

The sunrise/sunset routine (the standard NOAA solar-position algorithm) takes a date and a longitude and returns "minutes since UTC midnight" for that day's sunrise and that day's sunset. For most of the portfolio's locations — Homer, Valdez, both a few hours from Greenwich — those two numbers land in the order you'd expect: sunrise, then later that same day, sunset.

Fairbanks is 9-and-change hours west of Greenwich, and that's far enough for the arithmetic to stop matching intuition. Run the algorithm for July 10 and you get:

- **sunrise** → 11:36 UTC
- **sunset** → 08:15 UTC

Sunset computing as an earlier clock time than sunrise, on the same calendar day. Converted to Fairbanks local time (UTC−8 in summer), that's a 3:36 AM sunrise and a 12:15 AM sunset — the tail end of the previous night spilling fifteen minutes past midnight, landing on "today" by the UTC calendar even though a Fairbanks resident would call it "last night."

The algorithm isn't wrong. It faithfully computes "this UTC day's sunrise" and "this UTC day's sunset" as two independent values. The bug is in assuming those two values describe one contiguous day-night cycle you can compare directly. Far enough from Greenwich, they don't.

This had been sitting in the codebase, unnoticed, because nothing had ever needed to compare "now" against those two numbers. Every prior demo just formatted them as strings and printed them. The first time any code asked a real either/or question — is the current instant before this, or after that — was the first time the bug had a chance to bite.

## The fix: stop comparing labels, start comparing time

The fix doesn't patch the two-number comparison; it removes it. Instead of asking "is now between this day's sunrise and this day's sunset," the code now builds a small window of actual events — sunrise and sunset for today, yesterday, and tomorrow — as real timestamps, sorts them, and asks one question: was the most recent event before now a sunset, or a sunrise?

That framing can't wrap, because it never assumes which calendar day an event "belongs" to. It just orders things in time, the way a person would if you handed them a list of clock-outs and clock-ins and asked whether someone is currently on shift.

I verified it the boring way before trusting it: wrote the same algorithm in Python, ran it across a full year at Fairbanks' coordinates, and printed out the actual event sequence in local time for both midsummer and midwinter. Midsummer showed the real, short summer "night" — sunset just after local midnight, sunrise a little over three hours later, a dark window most people don't realize Fairbanks even has in July. Midwinter showed the mirror image: sunrise mid-morning, sunset mid-afternoon, dark most of the day. Only after the numbers matched what I already knew to be true about Fairbanks did the fix go into the actual page.

## What I'd tell another team

1. **A function that's never been asked a boolean question can hide a bug indefinitely.** "Format this timestamp" and "is this timestamp before that one" are different claims about the same data — the second one is where the assumptions get tested.
2. **Don't compare two computed values unless you know they live on the same number line.** If either one is anchored to a boundary that can shift under the input (a calendar day, a timezone, a fiscal quarter), compare via a small window of real timestamps instead of two bare values.
3. **The edge case that "can't happen" usually just hasn't been asked yet.** This code shipped clean across three prior demos. It took a fourth one, asking a slightly harder question of the same math, to find what was already there.
4. **Cross-validate against a source you didn't write.** Our computed darkness window matching a real research institute's published season, independently, was worth more than any unit test I could have written myself.
5. **The honest answer is a feature, not a bug report.** "Too bright to see it right now" reads like a broken demo until you know it's correct — and it's the whole reason the panel is worth building. A live data feed that only ever says what's flattering isn't a live data feed, it's marketing copy with extra steps.

You can see the panel itself — Kp index, aurora probability, sky conditions, and the darkness gate, all live — on [the aurora demo](https://bluewaveprojects.com/demos/aurora-fairbanks), one of 25 working builds on [our sample portfolio](https://bluewaveprojects.com/demos). If you want a team that chases down the "that can't happen" case instead of shipping around it, [say hello](https://bluewaveprojects.com/booking).`,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(currentSlug: string, count: number = 3): BlogPost[] {
  return blogPosts.filter((post) => post.slug !== currentSlug).slice(0, count);
}
