import { Wave } from './curriculum-types';

export const wave8: Wave = {
  id: 'wave-8',
  number: 8,
  title: 'AI Architect',
  subtitle: 'Master Level',
  description: 'Build an AI strategy for a real business, analyze ROI, choose the right tools, and complete a capstone project that demonstrates everything you\'ve learned.',
  color: '#ef4444',
  icon: 'flask',
  weekRange: 'Week 8-10',
  totalXP: 0,
  units: [
    {
      id: 'w8-u1',
      waveId: 'wave-8',
      title: 'AI Strategy',
      description: 'Build an AI roadmap, analyze ROI, and lead AI projects',
      order: 1,
      lessons: [
        {
          id: 'w8-u1-l1',
          waveId: 'wave-8',
          unitId: 'w8-u1',
          title: 'Building an AI Roadmap',
          description: 'How to plan and prioritize AI adoption for a business.',
          duration: '12 min',
          difficulty: 'advanced',
          xp: 30,
          order: 1,
          content: `# Building an AI Roadmap for Your Business

An AI roadmap transforms vague excitement about AI into a concrete plan with priorities, timelines, and measurable outcomes. Without a roadmap, AI adoption is random -- people try tools, get inconsistent results, and the whole effort fizzles. With a roadmap, you build momentum through quick wins and scale strategically.

:::key
The prioritization matrix -- plotting AI opportunities on Impact vs. Feasibility -- is the single most important tool in this lesson. High Impact + High Feasibility opportunities are your quick wins. Start there, prove value, and use that momentum to fund the bigger bets.
:::

## The AI Readiness Assessment

Before building a roadmap, assess where your organization stands:

### 1. Current State Audit
Ask these questions:
- What AI tools are people already using (officially or unofficially)?
- What are the biggest time sinks in each department?
- Where are the bottlenecks in our workflows?
- What data do we have that's underutilized?
- What's our team's comfort level with AI?

### 2. Opportunity Mapping
For each department, identify potential AI use cases:

> "For a [business type] with [X employees], list 15 potential AI use cases organized by department:
>
> **Sales**: lead scoring, email drafting, competitive intelligence, ...
> **Marketing**: content creation, audience analysis, campaign optimization, ...
> **Operations**: process automation, quality control, forecasting, ...
> **Customer Service**: ticket routing, chatbot, sentiment analysis, ...
> **Finance**: invoice processing, anomaly detection, reporting, ...
> **HR**: resume screening, onboarding, policy Q&A, ...
>
> For each use case, provide: estimated time savings per week, implementation difficulty (easy/medium/hard), and potential risk."

### 3. Prioritization Matrix

Score each opportunity on two axes:

**Impact** (1-5): How much value does this create?
- Time savings
- Revenue increase
- Error reduction
- Customer satisfaction improvement

**Feasibility** (1-5): How easy is this to implement?
- Data availability
- Tool maturity
- Team capability
- Risk level

Plot on a 2x2 matrix:
- **High Impact + High Feasibility** = Do first (Quick Wins)
- **High Impact + Low Feasibility** = Plan for (Strategic Bets)
- **Low Impact + High Feasibility** = Nice to have (Fill-in projects)
- **Low Impact + Low Feasibility** = Skip (Distractions)

---

## The Phased Roadmap

### Phase 1: Quick Wins (Month 1-2)
**Goal**: Demonstrate value and build momentum

Focus on:
- Individual productivity tools (AI writing assistants, meeting summarizers)
- Simple automations (email classification, data entry)
- One high-visibility win that leadership notices

**Success metrics**: Hours saved per person per week

### Phase 2: Team Workflows (Month 3-4)
**Goal**: Automate team-level processes

Focus on:
- Departmental workflows (marketing content pipeline, support ticket routing)
- Custom agents for specific roles (sales assistant, HR FAQ bot)
- Data analysis and reporting automation

**Success metrics**: Process completion time, error rates, team satisfaction

### Phase 3: Cross-Functional Integration (Month 5-6)
**Goal**: Connect AI across departments

Focus on:
- End-to-end workflows spanning multiple teams
- Centralized AI knowledge base
- Standardized prompts and templates across the org

**Success metrics**: Cross-team efficiency gains, data consistency

### Phase 4: Strategic AI (Month 7+)
**Goal**: AI as competitive advantage

Focus on:
- Customer-facing AI features
- Predictive analytics for business decisions
- AI-driven product or service innovation

**Success metrics**: Revenue impact, competitive differentiation, customer satisfaction

## Stakeholder Communication

Different audiences need different messages:

### For the CEO
> "AI can reduce operational costs by 20-30% in [department] within 6 months. Phase 1 costs $X/month in tools and delivers $Y in time savings. Here's the 4-phase roadmap with milestones."

### For Department Heads
> "Here's how AI will make your team faster. Phase 1 targets [specific pain point]. Your team will need to invest [X hours] in training. Expected benefit: [specific time savings]."

### For the Team
> "We're adopting AI tools to handle the tedious parts of your job so you can focus on the work that matters. You'll be trained on [tool] starting [date]. This isn't about replacing anyone — it's about making your work life better."

---

## Common Roadmap Mistakes

:::warning
The most common roadmap mistake is trying to AI-enable everything at once. If Phase 1 takes 6 months, you will lose organizational support long before you can show results. Start small, prove value fast, and expand from a position of demonstrated success.
:::

1. **Boiling the ocean**: Trying to AI-enable everything at once
2. **No quick wins**: If Phase 1 takes 6 months, you'll lose support
3. **Ignoring change management**: Tools don't adopt themselves — people need training and motivation
4. **No metrics**: If you can't measure impact, you can't prove value
5. **Technology-first thinking**: Start with the problem, not the tool`,
          exercises: [
            {
              id: 'w8-u1-l1-e1',
              type: 'prompt-challenge',
              question: 'Create an AI readiness assessment for your business (or a business you know). Conduct the Current State Audit (list existing AI usage, time sinks, bottlenecks), then identify 10 AI opportunities and plot them on the Impact vs Feasibility matrix. Which 3 should be Phase 1 quick wins?',
              hint: 'Be honest about the current state. Many businesses already have unofficial AI usage (employees using ChatGPT on their own). Discovering this is step one.',
              xpBonus: 25,
            },
            {
              id: 'w8-u1-l1-e2',
              type: 'quiz',
              question: 'In the AI prioritization matrix, which opportunities should you pursue first?',
              options: [
                'Low Impact + Low Feasibility (they\'re the cheapest)',
                'High Impact + Low Feasibility (they create the most value)',
                'High Impact + High Feasibility (quick wins that demonstrate value)',
                'Low Impact + High Feasibility (they\'re the easiest)'
              ],
              correctAnswer: 2,
              xpBonus: 5,
            },
            {
              id: 'w8-u1-l1-e3',
              type: 'free-response',
              question: 'Write a 3-paragraph AI roadmap pitch for a CEO. Cover: the problem (time/money being wasted), the solution (phased AI adoption), and the ask (budget and timeline for Phase 1). Include specific numbers.',
              hint: 'CEOs care about: revenue, costs, competitive advantage, and risk. Frame everything in terms of business outcomes, not technology features.',
              xpBonus: 15,
            }
          ]
        },
        {
          id: 'w8-u1-l2',
          waveId: 'wave-8',
          unitId: 'w8-u1',
          title: 'AI ROI Analysis',
          description: 'Calculate the real return on investment of AI initiatives.',
          duration: '12 min',
          difficulty: 'advanced',
          xp: 30,
          order: 2,
          content: `# AI ROI Analysis

"We should use AI" is an opinion. "AI will save us $4,200/month with a 3-month payback period" is a business case. This lesson teaches you to build the business case -- because in business, the person with numbers wins the argument.

:::key
ROI = (Value Created - Total Cost) / Total Cost x 100%. Simple formula, but the devil is in the details of calculating "value created" and "total cost." Most people overestimate value and underestimate cost. This lesson teaches you to be honest about both.
:::

## The AI ROI Formula

**ROI = (Value Created - Total Cost) / Total Cost x 100%**

Simple, but the devil is in the details of calculating "value created" and "total cost."

## Calculating Value Created

### 1. Time Savings (Most Common)

> **Formula**: Hours saved per week x Hourly cost of that labor x 52 weeks

**Example**: AI automates report generation
- Time saved: 5 hours/week
- Labor cost: $50/hour (fully loaded — salary + benefits + overhead)
- Annual value: 5 x $50 x 52 = **$13,000/year**

### 2. Error Reduction

> **Formula**: (Error rate before - Error rate after) x Cost per error x Volume

**Example**: AI reviews invoices for errors
- Previous error rate: 8% on 500 invoices/month
- AI-assisted error rate: 1% on 500 invoices/month
- Cost per error: $150 (time to fix + customer impact)
- Monthly savings: (40 - 5) errors x $150 = **$5,250/month = $63,000/year**

### 3. Revenue Increase

> **Formula**: Additional revenue attributable to AI-assisted process

**Example**: AI personalizes sales follow-ups
- Previous conversion rate: 5%
- AI-assisted conversion rate: 7%
- Leads per month: 200
- Average deal value: $5,000
- Monthly increase: (14 - 10) additional deals x $5,000 = **$20,000/month**

### 4. Faster Time-to-Action

> **Formula**: Value of responding faster

**Example**: AI classifies and routes support tickets instantly instead of a 2-hour delay
- Customer satisfaction improvement: 15% increase in CSAT scores
- Reduced churn: 2% improvement x $500 average customer value x 1,000 customers = **$10,000/year**

## Calculating Total Cost

### Direct Costs
- **AI tool subscriptions**: ChatGPT, Claude Pro, Jasper, etc. ($20-100/user/month)
- **API usage**: Token-based pricing for automated workflows ($50-500/month typical for SMB)
- **Automation platform**: Zapier, Make, n8n ($0-100/month)
- **Integrations**: Any connectors, middleware, or custom development

### Indirect Costs
- **Training time**: Hours spent learning tools x hourly rate
- **Setup time**: Building prompts, workflows, knowledge bases
- **Maintenance**: Ongoing prompt tuning, knowledge base updates, monitoring
- **Change management**: Communication, documentation, support

---

### Often-Missed Costs

:::warning
Verification time is the most commonly overlooked cost in AI initiatives. In the early months, humans will need to check AI output carefully. This verification time can eat up 30-50% of the time savings, making your actual ROI much lower than projected. Factor it in from the start and watch it decrease as the system proves itself.
:::

- **Verification time**: Humans checking AI output (especially early on)
- **Error recovery**: Cost of fixing AI mistakes
- **Opportunity cost**: What could the team be doing instead of AI setup?

## Building the Business Case

### Template

> **Project**: [Name of AI initiative]
>
> **Problem**: [Current pain point with specific numbers]
> We currently spend X hours/week on [task], costing $Y/month in labor. Error rate is Z%.
>
> **Solution**: [Proposed AI solution]
> Implement [tool/workflow] to automate [specific steps].
>
> **Investment Required**:
> - One-time setup: $[amount] ([X] hours of setup at $[rate])
> - Monthly recurring: $[amount] (tools: $[X] + API: $[Y] + maintenance: $[Z])
> - Year 1 total: $[amount]
>
> **Expected Return**:
> - Time savings: $[amount]/year
> - Error reduction: $[amount]/year
> - Revenue increase: $[amount]/year
> - Total Year 1 return: $[amount]
>
> **ROI**: [X]% with [Y]-month payback period
>
> **Risks**: [What could go wrong and mitigation]
>
> **Recommendation**: [Proceed / Pilot first / Need more data]

## Real-World ROI Examples

| AI Initiative | Monthly Cost | Monthly Savings | ROI | Payback |
|---|---|---|---|---|
| Email drafting assistant | $20 (ChatGPT Plus) | $500 (10 hrs saved) | 2,400% | Immediate |
| Support ticket routing | $150 (Zapier + API) | $2,000 (40 hrs saved) | 1,233% | 1 week |
| Content production pipeline | $300 (tools + API) | $3,000 (60 hrs saved) | 900% | 3 days |
| Custom sales agent | $500 (tools + API + setup amortized) | $5,000 (revenue increase) | 900% | 3 days |
| Full department automation | $2,000 (tools + API + maintenance) | $8,000 (160 hrs saved) | 300% | 1 month |

---

## The Honest Conversation

:::tip
Credibility comes from honest analysis, not AI hype. Being able to say "this AI initiative does not have good ROI" is more valuable than pitching every project as a slam dunk. The person who kills bad ideas early saves the organization more money than the person who launches everything and hopes for the best.
:::

Not every AI initiative has good ROI. Be willing to say:
- "This would save time but not enough to justify the setup cost"
- "The ROI is positive but the risk is too high for our current stage"
- "We should pilot this for 30 days before committing"

Credibility comes from honest analysis, not AI hype.`,
          exercises: [
            {
              id: 'w8-u1-l2-e1',
              type: 'prompt-challenge',
              question: 'Build a complete ROI analysis for an AI initiative at your business. Calculate: value created (using at least 2 of the 4 methods), total cost (direct + indirect), ROI percentage, and payback period. Use real numbers where possible.',
              hint: 'Start with the task that takes the most time. Calculate: current hours x hourly rate = cost of doing it manually. Then estimate AI tool costs. The difference is your potential savings.',
              xpBonus: 25,
            },
            {
              id: 'w8-u1-l2-e2',
              type: 'quiz',
              question: 'When calculating the "total cost" of an AI initiative, which cost is most commonly overlooked?',
              options: [
                'The AI subscription fee',
                'Verification time — humans checking AI output',
                'The cost of internet access',
                'The cost of the computer'
              ],
              correctAnswer: 1,
              xpBonus: 5,
            },
            {
              id: 'w8-u1-l2-e3',
              type: 'free-response',
              question: 'Think of an AI initiative that might NOT have good ROI at your business. Explain why: what are the costs, what are the risks, and why the time savings don\'t justify the investment? Being able to identify bad AI investments is as valuable as identifying good ones.',
              hint: 'AI initiatives with poor ROI often involve: high setup costs for low-volume tasks, tasks where verification takes as long as doing it manually, or tasks where errors have high consequences.',
              xpBonus: 15,
            }
          ]
        },
        {
          id: 'w8-u1-l3',
          waveId: 'wave-8',
          unitId: 'w8-u1',
          title: 'Choosing the Right AI Tools',
          description: 'A framework for evaluating and selecting AI tools for your needs.',
          duration: '10 min',
          difficulty: 'advanced',
          xp: 25,
          order: 3,
          content: `# Choosing the Right AI Tools

The AI tool market is overwhelming -- hundreds of tools, each promising to transform your business. New ones launch every week. Choosing based on marketing materials is a recipe for wasted money and shelfware. This lesson gives you a systematic framework for cutting through the noise and picking tools that actually fit.

:::key
The "Good Enough" Principle: don't spend weeks evaluating tools when a good-enough option exists today. The best tool is the one that solves your problem adequately, your team will actually use, you can afford, and you can switch away from later if needed. Perfect is the enemy of done.
:::

## The Tool Evaluation Framework

### Step 1: Define Requirements
Before looking at any tool, document what you need:

> "For [specific use case], I need a tool that can:
> 1. [Core capability 1] — MUST HAVE
> 2. [Core capability 2] — MUST HAVE
> 3. [Nice to have 1] — NICE TO HAVE
> 4. [Nice to have 2] — NICE TO HAVE
>
> Constraints:
> - Budget: $[X]/month maximum
> - Users: [X] people need access
> - Integration: Must connect with [existing tools]
> - Data: Must support [data type/volume]
> - Security: [compliance requirements, data residency, etc.]"

### Step 2: Categorize by Build vs Buy

| Approach | When to Use | Examples |
|---|---|---|
| **Use existing free tier** | Testing an idea, low volume | ChatGPT free, Claude free |
| **Buy a subscription** | Proven use case, need reliability | ChatGPT Plus, Claude Pro |
| **Buy a specialized tool** | Specific workflow needs | Jasper (content), Otter (meetings) |
| **Build with APIs** | Custom workflows, high volume | Claude API + automation platform |
| **Build custom** | Unique needs, competitive advantage | Custom agent on your own infrastructure |

Rule of thumb: Start with the cheapest option that works. Upgrade when you hit limits.

### Step 3: The Evaluation Scorecard

Rate each tool on these criteria (1-5):

| Criteria | Weight | Tool A | Tool B | Tool C |
|---|---|---|---|---|
| Core capability quality | 30% | | | |
| Ease of use | 20% | | | |
| Integration with existing tools | 15% | | | |
| Pricing at your volume | 15% | | | |
| Data security/privacy | 10% | | | |
| Vendor stability/reputation | 5% | | | |
| Community/support | 5% | | | |
| **Weighted Total** | | | | |

---

### Step 4: The Real-World Test

:::warning
Never buy based on demos or feature lists alone. Demos show best-case scenarios with cherry-picked data. Your data is messier, your use cases are more complex, and your team has different skills than the demo presenter. Always run your own test with your own data.
:::

Run a real test:

1. **Prepare 10 test cases** from your actual work
2. **Run them through each tool** being evaluated
3. **Score the outputs** (accuracy, quality, speed)
4. **Test edge cases** (unusual inputs, large files, complex requests)
5. **Calculate true cost** based on your actual usage patterns

## Common Tool Categories and Leaders

### General AI Assistants
- **Claude (Anthropic)**: Best for analysis, long documents, careful reasoning
- **ChatGPT (OpenAI)**: Best for creative tasks, plugins, image generation
- **Gemini (Google)**: Best for Google Workspace integration, research

### Content Creation
- **Jasper**: Enterprise content at scale
- **Copy.ai**: Marketing copy specialist
- **Writer.com**: Brand-consistent content with style guides

### Meeting & Communication
- **Otter.ai**: Meeting transcription and summarization
- **Fireflies.ai**: Meeting intelligence and action item extraction
- **Grammarly**: Writing assistance and tone adjustment

### Data & Analytics
- **Julius.ai**: Conversational data analysis
- **Obviously.ai**: No-code predictive analytics
- **Tableau (with AI)**: Visual analytics with AI-powered insights

### Automation
- **Zapier**: Simplest, most integrations
- **Make**: Most powerful visual builder
- **n8n**: Best self-hosted option

## Avoiding Vendor Lock-In

The AI landscape changes rapidly. Protect yourself:

1. **Export your data**: Can you get your data out if you switch tools?
2. **Portable prompts**: Keep your system prompts and templates in a separate document
3. **API abstraction**: If building custom, use an abstraction layer so you can swap AI providers
4. **Annual vs monthly**: Start monthly until you're sure, then switch to annual for savings
5. **Avoid proprietary formats**: Store data in standard formats (CSV, JSON, markdown)

## The "Good Enough" Principle

Don't spend weeks evaluating tools when a good-enough option exists today. The best tool is the one that:
- Solves your problem adequately
- Your team will actually use
- You can afford
- You can switch away from later if needed

Perfect is the enemy of done. Start with good enough and optimize later.`,
          exercises: [
            {
              id: 'w8-u1-l3-e1',
              type: 'prompt-challenge',
              question: 'Create a tool evaluation scorecard for a specific AI use case at your business. Define requirements (3 must-haves, 2 nice-to-haves), identify 3 candidate tools, and score each on the evaluation criteria. Which tool wins and why?',
              hint: 'Be specific about your use case. "AI for marketing" is too broad. "AI for generating weekly social media posts for our B2B SaaS product" is specific enough to evaluate properly.',
              xpBonus: 20,
            },
            {
              id: 'w8-u1-l3-e2',
              type: 'quiz',
              question: 'What is the most important step in evaluating an AI tool?',
              options: [
                'Reading the feature list on the website',
                'Watching the demo video',
                'Running real test cases from your actual work through each tool',
                'Checking how many users it has'
              ],
              correctAnswer: 2,
              xpBonus: 5,
            },
            {
              id: 'w8-u1-l3-e3',
              type: 'quiz',
              question: 'To avoid vendor lock-in with AI tools, which practice is MOST important?',
              options: [
                'Only use free tools',
                'Never store data in the cloud',
                'Keep your prompts, templates, and data portable so you can switch tools if needed',
                'Use every tool simultaneously'
              ],
              correctAnswer: 2,
              xpBonus: 5,
            }
          ]
        },
        {
          id: 'w8-u1-l4',
          waveId: 'wave-8',
          unitId: 'w8-u1',
          title: 'Managing AI Projects',
          description: 'How to lead AI initiatives from idea to production.',
          duration: '12 min',
          difficulty: 'advanced',
          xp: 30,
          order: 4,
          content: `# Managing AI Projects

AI projects fail at a high rate -- research suggests 50-85% of AI initiatives don't reach production. Not because the technology fails, but because the project management fails. Unclear goals, scope creep, insufficient training, and no maintenance plan are what kill AI projects. Here's how to be in the successful minority.

:::key
The pilot approach is non-negotiable. Never go straight to full deployment. Pick 3-5 willing users, set a 30-day time limit, define kill criteria, and measure everything. If the pilot fails, you invested $450 instead of $45,000. If it succeeds, you have data to justify scaling.
:::

## Why AI Projects Fail

### 1. Unclear Problem Definition
"Let's use AI for something" is not a project. "Let's reduce support ticket response time from 4 hours to 30 minutes using AI classification and drafting" is a project.

### 2. No Success Criteria
If you can't define what success looks like before you start, you'll never know if you've achieved it.

### 3. Scope Creep
"While we're at it, let's also add..." is the death of AI projects. AI is exciting and possibilities are endless — which is exactly why you need strict scope control.

### 4. Insufficient Training
Building a tool nobody uses is worse than building no tool at all. Budget 30% of project time for training and change management.

### 5. No Maintenance Plan
AI tools need ongoing care: prompt updates, knowledge base maintenance, model upgrades, performance monitoring. If nobody is responsible for this, quality degrades.

## The AI Project Lifecycle

### Stage 1: Discovery (1-2 weeks)
- Define the problem precisely
- Quantify the current cost/impact
- Identify stakeholders and users
- Set success criteria (specific, measurable)
- Assess feasibility

**Deliverable**: One-page project brief

### Stage 2: Prototype (1-2 weeks)
- Build a minimal version (one workflow, one prompt)
- Test with real data
- Get feedback from 2-3 users
- Measure against success criteria

**Deliverable**: Working prototype + initial results

### Stage 3: Iterate (2-4 weeks)
- Refine based on feedback
- Handle edge cases
- Add error handling and monitoring
- Expand test group
- Document everything

**Deliverable**: Production-ready solution + documentation

### Stage 4: Deploy (1 week)
- Train all users
- Set up monitoring and alerting
- Establish the maintenance schedule
- Go live with a fallback plan

**Deliverable**: Live solution + training complete

### Stage 5: Optimize (Ongoing)
- Monitor performance weekly
- Collect user feedback
- Optimize costs and quality
- Plan next iteration

**Deliverable**: Monthly performance report

## The Pilot Approach

Never go straight to full deployment. Always pilot first:

1. **Pick a small group**: 3-5 users who are willing to test and provide feedback
2. **Set a time limit**: "We'll pilot for 30 days and evaluate"
3. **Define kill criteria**: "If accuracy is below 80% or users rate it below 3/5, we stop"
4. **Measure everything**: Time saved, error rate, user satisfaction, cost
5. **Decide**: Scale, iterate, or stop

---

## Change Management for AI

:::tip
The biggest barrier to AI adoption is never the technology -- it is people. Frame AI adoption not as "we are adding AI" but as "we are eliminating the report you hate doing every Friday." When people see AI as solving their personal pain points rather than as a corporate initiative, adoption happens naturally.
:::

People resist change -- even good change. Here's how to manage the human side:

### Before Launch
- **Communicate the "why"**: Not "we're adding AI" but "we're eliminating the report you hate doing every Friday"
- **Address fears**: "This replaces the task, not the person. Your role evolves, it doesn't disappear"
- **Involve users early**: People support what they help create

### During Rollout
- **Training first, access second**: Don't give people a tool without teaching them how to use it
- **Designate champions**: Train power users who can help their peers
- **Quick wins first**: Start with the use case that delivers the most visible improvement

### After Launch
- **Celebrate results**: Share metrics publicly. "AI saved us 40 hours last month" builds momentum
- **Feedback loop**: Make it easy to report issues. Fix them fast
- **Iterate visibly**: When you improve the tool based on feedback, credit the person who gave the feedback

## The AI Project Charter Template

> **Project Name**: [Clear, specific name]
>
> **Problem Statement**: [What's broken, with numbers]
>
> **Proposed Solution**: [What AI will do, specifically]
>
> **Success Criteria**:
> 1. [Metric 1]: From [current] to [target]
> 2. [Metric 2]: From [current] to [target]
>
> **Scope** (IN):
> - [Specific thing 1]
> - [Specific thing 2]
>
> **Scope** (OUT):
> - [Explicitly excluded thing 1]
> - [Explicitly excluded thing 2]
>
> **Timeline**: [Stage dates]
>
> **Budget**: [Detailed breakdown]
>
> **Team**: [Who is responsible for what]
>
> **Risks**:
> - [Risk 1]: Mitigation: [plan]
> - [Risk 2]: Mitigation: [plan]
>
> **Kill Criteria**: We stop if [specific measurable condition]`,
          exercises: [
            {
              id: 'w8-u1-l4-e1',
              type: 'prompt-challenge',
              question: 'Fill out the complete AI Project Charter template for an AI initiative at your business. Be specific: include real metrics, real timelines, real budget numbers, and specific risks with mitigation plans. This should be a document you could present to your team.',
              hint: 'The kill criteria is the most important and most commonly skipped section. Defining when to stop prevents sunk cost fallacy from keeping a failing project alive.',
              xpBonus: 25,
            },
            {
              id: 'w8-u1-l4-e2',
              type: 'quiz',
              question: 'According to research, what percentage of AI initiatives fail to reach production?',
              options: [
                '5-10%',
                '20-30%',
                '50-85%',
                '95-100%'
              ],
              correctAnswer: 2,
              xpBonus: 5,
            },
            {
              id: 'w8-u1-l4-e3',
              type: 'quiz',
              question: 'What is a "kill criteria" in an AI project?',
              options: [
                'The criteria for choosing which AI model to use',
                'A specific measurable condition that triggers stopping the project if it\'s not working',
                'The deadline for the project',
                'The criteria for hiring team members'
              ],
              correctAnswer: 1,
              xpBonus: 5,
            },
            {
              id: 'w8-u1-l4-e4',
              type: 'free-response',
              question: 'Describe a change management plan for introducing AI to a team of 10 people. Cover: how you communicate the change, how you train the team, how you handle resistance, and how you measure adoption. Be specific and realistic.',
              hint: 'Resistance often comes from fear (job replacement), confusion (how to use it), or cynicism (it probably won\'t work). Address each type differently.',
              xpBonus: 15,
            }
          ]
        }
      ]
    },
    {
      id: 'w8-u2',
      waveId: 'wave-8',
      title: 'Capstone Projects',
      description: 'Design comprehensive AI systems and demonstrate mastery',
      order: 2,
      lessons: [
        {
          id: 'w8-u2-l1',
          waveId: 'wave-8',
          unitId: 'w8-u2',
          title: 'Design an AI System for a Real Business',
          description: 'Apply everything you\'ve learned to design a comprehensive AI solution.',
          duration: '20 min',
          difficulty: 'advanced',
          xp: 40,
          order: 1,
          content: `# Capstone Project: Design an AI System

This is your final project. Everything you have learned across all eight waves comes together here. You will design a comprehensive AI system for a real business -- combining strategy, tool selection, workflow design, agent creation, and ROI analysis into a document you could actually present to a leadership team.

:::key
Choose Scenario D (your own business) if at all possible. The capstone produces the most valuable output when it is based on real problems you actually face. You will walk away with a usable AI roadmap, not just a course assignment.
:::

## The Assignment

Choose one of the following business scenarios (or use your own business):

### Scenario A: The Growing E-Commerce Brand
A direct-to-consumer brand selling handmade skincare products. 15 employees, $2M annual revenue, growing 30% year-over-year. Pain points: drowning in customer emails, can't keep up with content creation, inventory forecasting is manual and often wrong.

### Scenario B: The Professional Services Firm
A 25-person consulting firm specializing in environmental compliance. Pain points: proposal writing takes 20+ hours per proposal, knowledge is trapped in individual consultants' heads, client reporting is manual and inconsistent.

### Scenario C: The Local Restaurant Group
A group of 4 restaurants with 60 total employees. Pain points: scheduling is a nightmare, customer feedback is ignored, menu optimization is based on gut feeling, marketing is inconsistent across locations.

### Scenario D: Your Own Business
Use your real business. This produces the most valuable output — you'll actually use what you create.

## What to Deliver

Your capstone project should include all of the following components:

### 1. AI Readiness Assessment (10%)
- Current state audit: What tools and processes exist today?
- Team capability assessment: What's the AI skill level?
- Data inventory: What data is available and where does it live?
- Gap analysis: What's missing?

### 2. Opportunity Map (15%)
- List 10+ AI use cases for this business
- Score each on Impact (1-5) and Feasibility (1-5)
- Plot on the prioritization matrix
- Select the top 3 for your roadmap

### 3. Phased Roadmap (15%)
- Phase 1: Quick wins (Month 1-2)
- Phase 2: Team workflows (Month 3-4)
- Phase 3: Integration (Month 5-6)
- Include specific milestones and success criteria for each phase

### 4. Detailed Design for Phase 1 (30%)
For your #1 priority initiative:
- **Agent design**: System prompt (using CRISP framework), knowledge base outline, tool list
- **Workflow design**: Trigger, steps, data flow, error handling, monitoring
- **Tool selection**: Evaluation scorecard with 2-3 options compared
- **Implementation plan**: Step-by-step build guide with timeline

### 5. ROI Analysis (15%)
- Value created (time savings, error reduction, revenue increase)
- Total cost (tools, setup, maintenance, training)
- ROI calculation and payback period
- Sensitivity analysis: What if costs are 50% higher? What if savings are 50% lower?

### 6. Risk Assessment & Mitigation (15%)
- Technical risks (AI accuracy, integration issues)
- People risks (adoption, resistance, skill gaps)
- Business risks (cost overrun, vendor dependency)
- Mitigation plan for each risk
- Kill criteria: When to stop

---

## Quality Standards

:::warning
The most common capstone mistake is being vague about numbers. "Significant time savings" is not a business case. "$4,200/month in labor savings with a 2-week payback period" is a business case. If you cannot attach a specific number to a claim, either research it or explicitly mark it as an estimate.
:::

Your project will be evaluated on:
- **Specificity**: Real numbers, real tools, real timelines (not "some AI tool" or "significant savings")
- **Feasibility**: Could a non-technical business owner actually implement this?
- **Completeness**: All 6 components addressed thoroughly
- **Critical thinking**: Risks acknowledged, limitations noted, honest ROI projections
- **Communication**: Clear enough for a business stakeholder to understand and act on

## How to Approach This

1. **Start with the business problem** — not the technology. What's broken? What hurts?
2. **Talk to people** (or imagine talking to them) — What do employees actually do all day? Where do they waste time?
3. **Be realistic** — A $2M business isn't going to spend $50K/year on AI tools. Scale your recommendations.
4. **Think end-to-end** — Don't just design the AI part. Design the human workflow around it.
5. **Include the failures** — Show that you've thought about what could go wrong.`,
          exercises: [
            {
              id: 'w8-u2-l1-e1',
              type: 'prompt-challenge',
              question: 'Complete sections 1-3 of the capstone project: AI Readiness Assessment, Opportunity Map (with 10+ use cases scored on impact and feasibility), and Phased Roadmap with milestones. Choose a scenario or use your own business.',
              hint: 'The opportunity map is the foundation. Spend real time thinking about use cases. For each one, be specific: "AI-powered email classification for customer support" not just "AI for support."',
              xpBonus: 30,
            },
            {
              id: 'w8-u2-l1-e2',
              type: 'prompt-challenge',
              question: 'Complete section 4: Detailed Design for Phase 1. Write a full system prompt (using CRISP), design the workflow with data flow, create a tool evaluation scorecard, and write the implementation plan.',
              hint: 'This should be actionable. If you handed this document to someone, could they actually build it? Include specific tool names, pricing, and step-by-step instructions.',
              xpBonus: 30,
            },
            {
              id: 'w8-u2-l1-e3',
              type: 'prompt-challenge',
              question: 'Complete sections 5-6: Full ROI analysis with real numbers (value created, costs, payback period, sensitivity analysis) and Risk Assessment with specific mitigation plans and kill criteria.',
              hint: 'The sensitivity analysis is crucial. What if your savings estimate is 50% too optimistic? Is the project still worth doing? That\'s the honest test.',
              xpBonus: 30,
            }
          ]
        },
        {
          id: 'w8-u2-l2',
          waveId: 'wave-8',
          unitId: 'w8-u2',
          title: 'Present Your AI Strategy',
          description: 'Communicate your AI plan to stakeholders effectively.',
          duration: '15 min',
          difficulty: 'advanced',
          xp: 35,
          order: 2,
          content: `# Present Your AI Strategy

Even the best AI plan fails if you can't communicate it effectively. You could design the perfect AI system, but if you cannot convince stakeholders to fund it, it stays on paper. This lesson teaches you to present your capstone project as a compelling business case that gets a "yes."

:::key
Lead with the problem, not the solution. Get heads nodding before you pitch anything. Nobody cares about "LLMs" or "RAG" -- they care about faster response times, lower costs, and happier customers. Frame everything in terms of business outcomes, never in terms of technology features.
:::

## The Executive Presentation Structure

### Slide 1: The Problem (30 seconds)
Open with the pain — specific, quantified, relatable.

> "Our support team spends 26 hours per week reading and routing emails. That's $67,600/year in labor just sorting messages — before anyone even starts helping customers."

**Rules**: One statistic. One sentence. Maximum impact.

### Slide 2: The Vision (60 seconds)
Paint the picture of the future state.

> "Imagine: every customer email is instantly classified, routed to the right team, and drafted with a personalized response — in under 30 seconds. Your team focuses on solving problems, not sorting inboxes."

**Rules**: Focus on outcomes, not technology. Nobody cares about "LLMs" or "RAG" — they care about faster response times and happier customers.

### Slide 3: The Plan (90 seconds)
Your phased roadmap, simplified.

> "Three phases over 6 months:
> 1. **Month 1-2**: Automate email classification and routing (saves 15 hrs/week)
> 2. **Month 3-4**: Add AI-drafted responses for review (saves another 10 hrs/week)
> 3. **Month 5-6**: Full customer support agent with knowledge base (saves 26 hrs/week total)"

**Rules**: Three phases max. Each with a clear deliverable and measurable outcome.

### Slide 4: The Numbers (60 seconds)
ROI, front and center.

> "Investment: $450/month in tools + 40 hours of setup
> Return: $5,600/month in time savings
> Payback period: Under 2 weeks
> Year 1 net savings: $62,000"

**Rules**: Show both cost and return. Include payback period. Be conservative — under-promise and over-deliver.

### Slide 5: The Risks (30 seconds)
Show that you've thought about what could go wrong.

> "Key risks and our mitigations:
> - AI accuracy could be low → 30-day pilot with human review before full deployment
> - Team might resist → Training program + champion users + gradual rollout
> - Costs could exceed estimates → Monthly cost cap + kill criteria"

**Rules**: 3 risks maximum. Each with a specific mitigation. This builds credibility.

### Slide 6: The Ask (30 seconds)
Be explicit about what you need.

> "I'm requesting:
> 1. Approval for a 30-day pilot ($450 for tools + 20 hours of my time)
> 2. Access to 3 team members for testing
> 3. A 15-minute review meeting at the end of the pilot to decide on full deployment"

**Rules**: Small ask first. Lower the barrier to "yes."

---

## Handling Objections

:::tip
Prepare responses for objections before the meeting, not during it. The five objections listed below cover 90% of what you will hear. Practice your responses until they feel natural. A confident, prepared answer to a tough question builds more credibility than any slide deck.
:::

### "AI will replace our team"
> "This replaces the sorting and drafting — the tedious parts. It frees the team to do what they're actually good at: solving complex problems and building relationships with customers. No headcount reduction planned."

### "How do we know it will work?"
> "That's exactly why I'm proposing a pilot, not a full deployment. We'll test for 30 days with clear metrics. If it doesn't meet our criteria, we stop — total risk is $450."

### "What about data privacy?"
> "Great question. We'll use [enterprise tool] that doesn't train on our data. Customer data stays within our systems. I've reviewed the privacy policy and compliance implications."

### "This sounds expensive"
> "The pilot costs $450 total. If it works as projected, the ROI is $62,000/year. If it doesn't work, we've invested $450 and learned something. The real cost is NOT doing this — $67,600/year in manual email sorting."

### "Can't we just hire someone?"
> "A full-time hire for this role costs $45,000-55,000/year plus benefits. AI does the same work for $5,400/year with no sick days, no onboarding time, and instant scalability. And the team member we'd hire can work on higher-value problems instead."

## Storytelling with Data

The best presentations don't just present data — they tell a story.

### Before/After Narrative
"Today, when a customer emails us, it sits in a shared inbox for an average of 4 hours. By the time someone reads it, classifies it, and starts working on it, the customer has already tweeted about our slow support.

After implementation: the email arrives, AI reads it in 2 seconds, classifies it as 'billing urgent,' routes it to the billing team, and drafts a response. The billing team sees a fully-drafted reply waiting for their review. Time from email to response: 12 minutes instead of 4 hours."

### The Day-in-the-Life
"Here's what Monday morning looks like for your support team right now: [describe the current pain]. Here's what it looks like after: [describe the improved workflow]."

## Presentation Tips

1. **Lead with the problem, not the solution** — Get heads nodding before you pitch
2. **Use their language** — "reduce customer churn" not "implement RAG-enhanced NLP pipeline"
3. **Show, don't tell** — Live demo beats slides every time
4. **Make the ask small** — "Let me pilot for 30 days" is easier to approve than "Let's transform our entire operation"
5. **Prepare for silence** — After the ask, stop talking. Let them process.`,
          exercises: [
            {
              id: 'w8-u2-l2-e1',
              type: 'prompt-challenge',
              question: 'Create a 6-slide executive presentation for your capstone project. Write the actual content for each slide (Problem, Vision, Plan, Numbers, Risks, Ask). Keep each slide to its time limit. Then prepare responses for at least 3 likely objections.',
              hint: 'Read each slide aloud and time yourself. If any slide takes longer than its time limit, cut words. Executives have short attention spans — respect their time.',
              xpBonus: 25,
            },
            {
              id: 'w8-u2-l2-e2',
              type: 'free-response',
              question: 'Write the "before and after" narrative for your AI initiative. Describe a specific person\'s workday before AI (with all the pain points) and after AI (with specific improvements). Make it vivid and human.',
              hint: 'Name the person. Describe their frustrations. Make the reader feel the pain. Then paint the better future. Stories are more persuasive than statistics.',
              xpBonus: 15,
            },
            {
              id: 'w8-u2-l2-e3',
              type: 'quiz',
              question: 'When presenting an AI strategy to executives, what should you lead with?',
              options: [
                'The technical architecture and AI model specifications',
                'The business problem and its cost in specific numbers',
                'A demo of the AI tool',
                'The AI vendor\'s marketing materials'
              ],
              correctAnswer: 1,
              xpBonus: 5,
            }
          ]
        },
        {
          id: 'w8-u2-l3',
          waveId: 'wave-8',
          unitId: 'w8-u2',
          title: 'Peer Review & Iteration',
          description: 'Give and receive feedback on AI strategies like a professional.',
          duration: '12 min',
          difficulty: 'advanced',
          xp: 30,
          order: 3,
          content: `# Peer Review & Iteration

The best AI strategies are pressure-tested by smart people asking hard questions. A plan that has never been challenged is a plan with hidden weaknesses. This lesson teaches you to give and receive constructive feedback on AI plans -- and to use that feedback to make your strategy bulletproof.

:::key
The self-review checklist is your first line of defense. Before asking anyone else to review your work, evaluate it yourself against the checklist. The two hardest questions: "Am I recommending AI because it is the best solution, or because this is an AI course?" and "Would I bet my own money on this ROI estimate?" Be brutally honest.
:::

## The Peer Review Framework

### What to Evaluate

When reviewing someone else's AI strategy (or asking others to review yours), assess these dimensions:

#### 1. Problem Clarity (Is the problem well-defined?)
- Is the problem specific and measurable?
- Is it clear why this problem matters?
- Are the current costs/impacts quantified?
- Could a skeptic agree this is a real problem?

#### 2. Solution Fit (Does AI actually solve this problem?)
- Is AI the right tool? (Could a spreadsheet or simple software solve this?)
- Are the chosen tools appropriate for the scale and complexity?
- Is the technical approach sound?
- Are there simpler alternatives that weren't considered?

#### 3. Feasibility (Can this actually be built?)
- Is the timeline realistic?
- Does the team have the skills (or a plan to acquire them)?
- Are the cost estimates realistic? (Not too optimistic, not padded)
- Are dependencies identified and manageable?

#### 4. Risk Awareness (What could go wrong?)
- Are the major risks identified?
- Are mitigation plans specific and actionable?
- Is there a kill criteria?
- Is there a rollback plan if things go wrong?

#### 5. ROI Honesty (Do the numbers add up?)
- Are the savings calculations realistic?
- Are costs comprehensive (including hidden costs)?
- Has sensitivity analysis been done?
- Would you invest your own money based on this analysis?

---

## How to Give Good Feedback

### The SBI Method (Situation, Behavior, Impact)

Instead of: "Your ROI analysis is bad"
Say: "In the ROI section [situation], you calculated time savings at $75/hour [behavior], but the role you're replacing is typically $35-40/hour fully loaded [impact: the ROI may be overstated by 2x]."

### The Three-Column Method

| What's Strong | What Could Be Better | Questions to Address |
|---|---|---|
| Problem definition is specific and compelling | Timeline feels aggressive — Phase 1 in 2 weeks may not allow for proper testing | What happens to the workflow if the AI model is updated and responses change? |
| Tool evaluation scorecard is thorough | Cost estimate doesn't include maintenance/monitoring time | Have you validated the 80% accuracy assumption with a real test? |
| Risk section is honest and well-thought-out | System prompt could be more specific about edge cases | What's the fallback if your automation platform has an outage? |

### Rules for Constructive Feedback
1. **Be specific** — "The ROI section needs work" is useless. "The time savings estimate assumes 100% adoption in week 1, which is unrealistic" is actionable.
2. **Lead with strengths** — People are more receptive to criticism when they feel their work is valued.
3. **Suggest, don't dictate** — "You might consider..." is better than "You should..."
4. **Ask questions** — "Have you thought about X?" invites discussion. "You forgot X" shuts it down.
5. **Focus on the plan, not the person** — "This section could be stronger" vs "You did this wrong."

## How to Receive Feedback

### The 3-Step Response

1. **Listen completely** — Don't interrupt. Don't defend. Just absorb.
2. **Ask clarifying questions** — "Can you tell me more about why you think the timeline is aggressive?"
3. **Categorize the feedback**:
   - **Accept**: The feedback is clearly right. Make the change.
   - **Consider**: The feedback has merit but you disagree partially. Think on it for 24 hours.
   - **Acknowledge**: The feedback reflects a difference of opinion. Thank them and explain your reasoning.

### What NOT to Do
- Don't explain every decision immediately — that's defending, not listening
- Don't dismiss feedback because the reviewer "doesn't understand"
- Don't take it personally — they're reviewing the plan, not judging you
- Don't change everything based on one person's opinion — look for patterns across reviewers

## Self-Review Checklist

Before asking for peer review, evaluate your own work:

- [ ] Could someone unfamiliar with this business understand my plan?
- [ ] Are all numbers backed by data or clearly marked as estimates?
- [ ] Have I considered at least 3 risks and mitigations?
- [ ] Is my timeline realistic if everything takes 50% longer than expected?
- [ ] Am I recommending AI because it's the best solution, or because this is an AI course?
- [ ] Would I bet my own money on this ROI estimate?
- [ ] Have I included what I'd do if this doesn't work?
- [ ] Is my presentation clear enough for a non-technical stakeholder?

---

## The Final Iteration

:::tip
Ask an AI to play the role of a skeptical CFO reviewing your plan. Prompt it to challenge every assumption, number, and timeline. This "AI stress test" catches weaknesses that self-review misses, and it prepares you for the real questions you will face when presenting to stakeholders.
:::

After receiving feedback, make one final pass through your capstone:

1. Address all "Accept" feedback
2. Reconsider all "Consider" feedback
3. Strengthen your weakest section
4. Proofread for consistency (do your numbers add up across sections?)
5. Add a "Limitations and Assumptions" section for full transparency`,
          exercises: [
            {
              id: 'w8-u2-l3-e1',
              type: 'prompt-challenge',
              question: 'Use the self-review checklist on your capstone project. For each item, honestly assess whether your project meets the criteria. Identify your 3 weakest areas and improve them. Share the before and after for at least one section.',
              hint: 'The hardest items on the checklist are: "Am I recommending AI because it\'s the best solution?" and "Would I bet my own money on this ROI?" Be brutally honest.',
              xpBonus: 25,
            },
            {
              id: 'w8-u2-l3-e2',
              type: 'prompt-challenge',
              question: 'Ask an AI to play the role of a skeptical CFO reviewing your capstone project. Give it your executive summary and ROI analysis, then ask it to poke holes. Address each critique with a revision or a reasoned defense.',
              hint: 'Prompt: "You are a skeptical CFO who has seen many failed technology initiatives. Review this AI proposal and challenge every assumption, number, and timeline. Be tough but fair." Then iterate based on the challenges.',
              xpBonus: 25,
            },
            {
              id: 'w8-u2-l3-e3',
              type: 'free-response',
              question: 'Reflect on your entire BlueWave learning journey. What was the most valuable skill you developed? What surprised you about AI? What would you do differently if you started over? How will you apply what you\'ve learned in the next 30 days?',
              hint: 'Be specific. "I\'ll use AI more" is vague. "I\'ll build the email classification workflow I designed in Wave 7 and pilot it with my support team by the end of the month" is actionable.',
              xpBonus: 20,
            },
            {
              id: 'w8-u2-l3-e4',
              type: 'quiz',
              question: 'When receiving critical feedback on your AI strategy, what is the best first response?',
              options: [
                'Immediately explain why the reviewer is wrong',
                'Change everything they suggested without question',
                'Listen completely, ask clarifying questions, then categorize the feedback before responding',
                'Ignore the feedback if you disagree'
              ],
              correctAnswer: 2,
              xpBonus: 5,
            }
          ]
        }
      ]
    }
  ]
};

// Calculate totalXP
wave8.totalXP = wave8.units.reduce((sum, unit) =>
  sum + unit.lessons.reduce((lSum, lesson) =>
    lSum + lesson.xp + lesson.exercises.reduce((eSum, ex) => eSum + ex.xpBonus, 0), 0), 0);
