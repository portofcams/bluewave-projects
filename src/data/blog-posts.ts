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

If you're still scoping renovations by hand because the tools you tried felt wrong, [start a free trial](/signup) and try the RoomPlan → scope flow on your next walk-through. The whole loop, from boots on site to scope in the client's inbox, is under 20 minutes.`,
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

Want to try it? [Start a free trial](/signup). The Hawaii GET handling is on every plan, including the free Solo tier.`,
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

[Start a free trial](/signup) — the scope generator runs 5 times a month on the free Solo tier, unlimited on Pro. If you've got an iPhone with LiDAR and a site walk on your calendar this week, you have what you need to try it.

The first one will feel weird. By the third one, you won't go back to hand-writing.`,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(currentSlug: string, count: number = 3): BlogPost[] {
  return blogPosts.filter((post) => post.slug !== currentSlug).slice(0, count);
}
