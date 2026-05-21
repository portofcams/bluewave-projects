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
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(currentSlug: string, count: number = 3): BlogPost[] {
  return blogPosts.filter((post) => post.slug !== currentSlug).slice(0, count);
}
