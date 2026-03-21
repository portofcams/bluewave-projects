import { Wave } from './curriculum-types';

export const wave7: Wave = {
  id: 'wave-7',
  number: 7,
  title: 'Advanced Workflows',
  subtitle: 'Automate Everything',
  description: 'Connect AI to real business tools using automation platforms like n8n, Zapier, and Make. Build multi-step AI pipelines that run on autopilot.',
  color: '#6366f1',
  icon: 'zap',
  weekRange: 'Week 7-8',
  totalXP: 0,
  units: [
    {
      id: 'w7-u1',
      waveId: 'wave-7',
      title: 'Automation Foundations',
      description: 'Learn the basics of workflow automation and how AI fits in',
      order: 1,
      lessons: [
        {
          id: 'w7-u1-l1',
          waveId: 'wave-7',
          unitId: 'w7-u1',
          title: 'Introduction to Workflow Automation',
          description: 'What automation is, why it matters, and the landscape of tools.',
          duration: '10 min',
          difficulty: 'intermediate',
          xp: 20,
          order: 1,
          content: `# Introduction to Workflow Automation

You've learned to use AI for individual tasks. Now it's time to connect AI to your business systems so work happens automatically -- without you copying and pasting between tools. This is where AI goes from "interesting toy" to "business infrastructure."

:::key
The combination of automation + AI is where the real business value lives. Traditional automation moves data from point A to point B. AI-powered automation actually understands the data, makes decisions about it, and takes intelligent action. That is the difference between forwarding all emails and intelligently routing them by urgency and topic.
:::

## What is Workflow Automation?

Workflow automation connects different apps and services so that actions in one tool trigger actions in another — without manual intervention.

**Before automation:**
1. Customer fills out a form on your website
2. You check the form submissions (whenever you remember)
3. You copy the info into your CRM
4. You send a welcome email
5. You add a task to follow up in 3 days
6. You notify your sales rep on Slack

**After automation:**
1. Customer fills out a form → everything else happens automatically in seconds

That's 5 manual steps eliminated. Multiply by 50 leads per week and you've reclaimed hours.

## The Automation Landscape

### Zapier
- **Best for**: Simple automations between popular apps
- **Pricing**: Free tier (5 Zaps), paid from $20/month
- **Strengths**: 6,000+ app integrations, very user-friendly
- **AI features**: Built-in AI actions for text processing, classification, summarization

### Make (formerly Integromat)
- **Best for**: Complex workflows with branching logic
- **Pricing**: Free tier (1,000 operations), paid from $9/month
- **Strengths**: Visual workflow builder, powerful data transformation
- **AI features**: HTTP modules to connect to any AI API

### n8n
- **Best for**: Self-hosted automation with full control
- **Pricing**: Free (self-hosted), cloud from $20/month
- **Strengths**: Open source, no vendor lock-in, unlimited workflows
- **AI features**: Native AI nodes for Claude, GPT, local models

### Microsoft Power Automate
- **Best for**: Microsoft 365 ecosystem
- **Pricing**: Included with some M365 plans
- **Strengths**: Deep integration with Outlook, Teams, SharePoint
- **AI features**: AI Builder for document processing and text analysis

## Core Concepts

### Triggers
The event that starts a workflow:
- New email received
- Form submission
- Scheduled time (every Monday at 9am)
- Database record created
- Webhook called by another service

### Actions
What happens after the trigger:
- Send an email
- Create a record in a database
- Post a message to Slack
- Call an AI model to process text
- Update a spreadsheet

### Filters & Conditions
Logic that controls the flow:
- IF the email is from a VIP customer → route to the priority queue
- IF the form response mentions "urgent" → send immediately, ELSE batch for daily digest
- IF the AI classification is "complaint" → escalate to manager

### Data Mapping
Connecting the output of one step to the input of the next:
- Trigger: New form submission → Output: name, email, message
- Action 1: AI summarization → Input: message → Output: summary
- Action 2: Send email → Input: name, email, summary

---

## Where AI Fits In

AI transforms automations from simple "move data from A to B" into intelligent workflows:

| Without AI | With AI |
|---|---|
| Forward all support emails to the team | Classify emails by urgency and topic, route to the right person |
| Save form data to a spreadsheet | Analyze form responses, score leads, draft personalized follow-ups |
| Send the same welcome email to everyone | Generate personalized welcome emails based on what the customer said |
| Alert on every social media mention | Analyze sentiment first, only alert on negative mentions |

The combination of automation + AI is where the real business value lives.

:::tip
Start by mapping one manual workflow you do weekly. List every step, every tool you touch, and the time each step takes. That map becomes your automation blueprint. Most people discover they spend 30-60 minutes per week on workflows that could run in seconds.
:::`,
          exercises: [
            {
              id: 'w7-u1-l1-e1',
              type: 'free-response',
              question: 'Map out a manual workflow you do weekly. List every step, every tool you touch, and the time each step takes. Then describe how automation + AI could handle it. How much time would you save per week?',
              hint: 'Think about your Monday morning routine, weekly reporting, customer follow-ups, or content publishing. Be specific about each tool you touch (email, spreadsheet, CRM, etc.).',
              xpBonus: 15,
            },
            {
              id: 'w7-u1-l1-e2',
              type: 'quiz',
              question: 'What is a "trigger" in workflow automation?',
              options: [
                'A button you click to start the workflow manually',
                'The event that automatically starts a workflow',
                'The final step that sends a notification',
                'A condition that stops the workflow'
              ],
              correctAnswer: 1,
              xpBonus: 5,
            },
            {
              id: 'w7-u1-l1-e3',
              type: 'matching',
              question: 'Which automation platform is best for self-hosted workflows with full control?',
              options: ['Zapier', 'Make', 'n8n', 'Power Automate'],
              correctAnswer: 2,
              xpBonus: 5,
            }
          ]
        },
        {
          id: 'w7-u1-l2',
          waveId: 'wave-7',
          unitId: 'w7-u1',
          title: 'Connecting AI to Workflows',
          description: 'How to add AI processing steps to your automations.',
          duration: '12 min',
          difficulty: 'intermediate',
          xp: 25,
          order: 2,
          content: `# Connecting AI to Workflows

This is where the magic happens: adding AI as a step in your automated workflows. Instead of just moving data between apps, your workflow now *thinks*. It reads an email and understands whether it is urgent. It scores a lead and decides which follow-up sequence to trigger. It summarizes a document and routes it to the right person.

:::key
There are five core AI workflow patterns -- Classify and Route, Enrich and Store, Generate and Review, Monitor and Alert, and Transform and Deliver. Every AI automation you will ever build is a variation of one of these five patterns. Learn them and you can design a workflow for any business process.
:::

## Method 1: Built-In AI Actions

Most automation platforms now have native AI capabilities:

### Zapier AI Actions
Zapier has built-in AI steps you can drop into any Zap:
- **AI Text**: Generate, summarize, classify, or transform text
- **AI Formatter**: Clean and restructure data
- **AI Chatbot**: Create a simple AI chatbot for your workflow

**Example workflow:**
1. Trigger: New email in Gmail
2. AI Text: "Classify this email as: sales inquiry, support request, spam, or other"
3. Filter: IF classification = "sales inquiry"
4. Action: Create a lead in HubSpot with the email content
5. AI Text: "Draft a personalized response acknowledging their interest"
6. Action: Create a draft reply in Gmail

### Make AI Modules
Make offers AI modules and HTTP modules for connecting to AI APIs:
- OpenAI module (ChatGPT, GPT-4)
- HTTP module (connect to Claude API, any AI service)
- Text aggregation and parsing modules

### n8n AI Nodes
n8n has dedicated AI nodes:
- AI Agent node (builds full agents with tools)
- Chat Model nodes (Claude, GPT, Ollama for local models)
- Memory nodes (for agent persistence)
- Tool nodes (calculator, code, web search)

## Method 2: API Integration

For more control, call AI APIs directly:

### The Basic API Call Structure
Every AI API call follows this pattern:

1. **Endpoint**: Where to send the request (e.g., \`https://api.anthropic.com/v1/messages\`)
2. **Authentication**: Your API key in the headers
3. **Model**: Which AI model to use
4. **System prompt**: Instructions for this specific task
5. **User message**: The data you want processed
6. **Parameters**: Temperature, max tokens, etc.

---

### Cost Management

:::warning
API calls cost money, and costs can spiral quickly if you are not careful. A workflow that processes 1,000 items per day using GPT-4 can cost hundreds of dollars per month. Use cheaper models for simple tasks and reserve expensive models for complex reasoning.
:::

API calls cost money. Be smart:
- Use cheaper models (Claude Haiku, GPT-3.5) for simple tasks like classification
- Use powerful models (Claude Sonnet/Opus, GPT-4) only for complex reasoning
- Set max_tokens to limit response length (and cost)
- Cache repeated queries when possible

## Common AI Workflow Patterns

### Pattern 1: Classify and Route
> Trigger → AI classifies the input → Route to different paths based on classification

**Use case**: Email triage, support ticket routing, lead scoring

### Pattern 2: Enrich and Store
> Trigger → AI enriches the data with analysis/summary → Store in database/CRM

**Use case**: Adding AI analysis to form submissions, enriching customer profiles

### Pattern 3: Generate and Review
> Trigger → AI generates content → Human reviews → Publish/send

**Use case**: Social media posts, email drafts, report generation

### Pattern 4: Monitor and Alert
> Scheduled trigger → AI analyzes data → IF concerning → Send alert

**Use case**: Brand monitoring, KPI anomaly detection, competitor tracking

### Pattern 5: Transform and Deliver
> Trigger → AI transforms data into a new format → Deliver to destination

**Use case**: Meeting notes to action items, raw data to report, feedback to insights

## Your First AI Workflow

Here's a simple workflow you can build in any platform:

**The "Smart Email Digest"**
1. **Trigger**: Every day at 6 PM
2. **Action**: Get all unread emails from today
3. **AI Step**: "For each email, provide: sender, subject, one-sentence summary, and urgency (low/medium/high)"
4. **AI Step**: "Organize these into a daily digest, with high-urgency items first"
5. **Action**: Send the digest to yourself via Slack or email

This takes 10 minutes to build and saves you 20+ minutes of email scanning every day.

:::try
Build the Smart Email Digest workflow this week. It is the simplest AI automation with the most immediate payoff. You will use it every single day, and it will prove to you (and your team) that AI automation actually works.
:::`,
          exercises: [
            {
              id: 'w7-u1-l2-e1',
              type: 'prompt-challenge',
              question: 'Design a "Classify and Route" workflow for your business. Define: the trigger (what incoming data?), the AI classification categories (at least 4), and the action for each category. Be specific about which tools you would connect.',
              hint: 'Example: incoming support emails classified as billing/technical/feature-request/complaint, each routed to a different team or Slack channel with AI-generated summary.',
              xpBonus: 20,
            },
            {
              id: 'w7-u1-l2-e2',
              type: 'quiz',
              question: 'Why should you use cheaper AI models (like Claude Haiku) for simple classification tasks?',
              options: [
                'Cheaper models are always more accurate',
                'Simple tasks don\'t need powerful reasoning, so cheaper models save money without sacrificing quality',
                'Expensive models can\'t do classification',
                'It\'s required by the automation platform'
              ],
              correctAnswer: 1,
              xpBonus: 5,
            },
            {
              id: 'w7-u1-l2-e3',
              type: 'quiz',
              question: 'In the "Generate and Review" pattern, why is the human review step important?',
              options: [
                'AI cannot generate text without human input',
                'It\'s legally required for all AI-generated content',
                'AI-generated content may contain errors or inappropriate tone, so human review catches issues before publishing',
                'Human review makes the AI model better at future generations'
              ],
              correctAnswer: 2,
              xpBonus: 5,
            }
          ]
        },
        {
          id: 'w7-u1-l3',
          waveId: 'wave-7',
          unitId: 'w7-u1',
          title: 'Triggers, Actions & Data Flow',
          description: 'Master the mechanics of building reliable automations.',
          duration: '12 min',
          difficulty: 'intermediate',
          xp: 25,
          order: 3,
          content: `# Triggers, Actions & Data Flow

Understanding how data flows through an automation is the key to building workflows that actually work. If the previous lessons were about the "what" and "why" of automation, this lesson is about the "how." Master data flow and you can build any workflow on any platform.

:::key
Every step in a workflow produces output data. The next step can use that data as input. This is called data mapping, and it is the single most important concept in automation. Get data mapping wrong and your workflow produces garbage. Get it right and everything clicks together seamlessly.
:::

## Trigger Types Deep Dive

### Instant Triggers (Webhooks)
Fire the moment an event happens:
- New form submission
- New email received
- Stripe payment processed
- Slack message posted

**Advantage**: Real-time response
**Use when**: Speed matters (customer-facing workflows)

### Scheduled Triggers (Polling)
Run on a timer:
- Every 15 minutes: check for new leads
- Daily at 9 AM: generate the morning report
- Weekly on Monday: compile the weekly metrics
- Monthly on the 1st: run the month-end analysis

**Advantage**: Predictable, controlled execution
**Use when**: Batch processing is fine (reports, digests, monitoring)

### Manual Triggers
Started by a human action:
- Click a button in Slack
- Fill out a form
- Send a specific email command

**Advantage**: Human controls when it runs
**Use when**: The workflow needs human judgment to start

## Data Mapping Mastery

Every step in a workflow produces output data. The next step can use that data as input. This is called **data mapping**.

### Example: Lead Processing Workflow
\`\`\`
Step 1 - Trigger: New Typeform submission
  Output: {name: "Sarah Chen", email: "sarah@company.com",
           company: "TechCorp", message: "Interested in enterprise plan"}

Step 2 - AI Classification
  Input: Step 1's message field
  Prompt: "Classify this lead: hot/warm/cold based on..."
  Output: {classification: "hot", reasoning: "Explicitly mentioned enterprise plan"}

Step 3 - CRM Creation
  Input: name from Step 1, email from Step 1,
         classification from Step 2
  Output: {crm_id: "lead_123", created: true}

Step 4 - AI Email Draft
  Input: name from Step 1, company from Step 1,
         classification from Step 2
  Prompt: "Draft a follow-up email for a hot lead..."
  Output: {email_draft: "Hi Sarah, thanks for your interest..."}

Step 5 - Send Email
  Input: email from Step 1, email_draft from Step 4
  Output: {sent: true, message_id: "msg_456"}
\`\`\`

Notice how each step can reference data from ANY previous step, not just the one immediately before it.

---

## Error Handling

:::warning
What happens when a step fails? If you do not plan for failure, your workflow will silently drop data, send broken emails, or create duplicate records. Every production workflow needs error handling -- it is not optional, it is foundational.
:::

### Common Failure Points
- **API rate limits**: Too many requests too fast
- **Invalid data**: Missing required fields, wrong format
- **Service outages**: The connected app is temporarily down
- **AI errors**: Model returns unexpected format or hallucinated data

### Error Handling Strategies

**Retry logic**: If a step fails, try again (with a delay):
- Attempt 1: Immediate
- Attempt 2: Wait 1 minute
- Attempt 3: Wait 5 minutes
- If all fail: Send alert to admin

**Fallback paths**: If the primary action fails, do something else:
- If AI classification fails → default to "unclassified" and route to human review
- If CRM creation fails → save to a Google Sheet as backup
- If email send fails → queue for manual sending

**Validation steps**: Check data before using it:
- Is the email address valid format?
- Is the required field non-empty?
- Did the AI return a valid classification (not something off-list)?

## Conditional Logic (Branching)

Real workflows aren't linear. They branch based on conditions:

### IF/ELSE Branching
\`\`\`
IF lead_score >= 80 → Hot lead path (immediate call)
ELSE IF lead_score >= 50 → Warm lead path (email sequence)
ELSE → Cold lead path (nurture campaign)
\`\`\`

### Switch/Router
For multiple paths:
\`\`\`
SWITCH on email_category:
  "billing" → Route to finance team
  "technical" → Route to support team
  "sales" → Route to sales team
  "other" → Route to general inbox
\`\`\`

### Parallel Paths
Some actions can happen simultaneously:
\`\`\`
Trigger: New customer signup
  → Path A: Send welcome email (immediate)
  → Path B: Create CRM record (immediate)
  → Path C: Schedule onboarding call for tomorrow (immediate)
  → Path D: Add to newsletter list (immediate)
All four happen at once.
\`\`\`

## Performance Tips

- **Minimize AI calls**: Each API call takes time and money. Batch when possible.
- **Use caching**: If you classify the same type of data repeatedly, cache results.
- **Set timeouts**: Don't let a stuck step block the entire workflow.
- **Log everything**: Store inputs, outputs, and errors for debugging.
- **Start simple**: Build the core workflow first, add branches and error handling later.`,
          exercises: [
            {
              id: 'w7-u1-l3-e1',
              type: 'prompt-challenge',
              question: 'Design a complete data flow diagram for a workflow. Include: trigger, at least 3 action steps (one must be AI), data mapping between each step (what data passes from where to where), and error handling for 2 potential failure points.',
              hint: 'Use the lead processing example as a template. Map out exactly which fields each step produces and which fields each subsequent step consumes.',
              xpBonus: 20,
            },
            {
              id: 'w7-u1-l3-e2',
              type: 'quiz',
              question: 'What should happen when an AI classification step fails in an automated workflow?',
              options: [
                'The entire workflow should stop immediately',
                'Retry once and then delete the data',
                'Use a fallback path — like defaulting to "unclassified" and routing to human review',
                'Ignore the error and continue to the next step'
              ],
              correctAnswer: 2,
              xpBonus: 5,
            },
            {
              id: 'w7-u1-l3-e3',
              type: 'quiz',
              question: 'What is the difference between instant triggers and scheduled triggers?',
              options: [
                'Instant triggers are faster; scheduled triggers are more accurate',
                'Instant triggers fire immediately when an event happens; scheduled triggers run on a timer',
                'Instant triggers are free; scheduled triggers cost extra',
                'There is no practical difference'
              ],
              correctAnswer: 1,
              xpBonus: 5,
            }
          ]
        },
        {
          id: 'w7-u1-l4',
          waveId: 'wave-7',
          unitId: 'w7-u1',
          title: 'Building Your First Automation',
          description: 'Hands-on walkthrough: build a real AI-powered workflow.',
          duration: '15 min',
          difficulty: 'intermediate',
          xp: 30,
          order: 4,
          content: `# Building Your First Automation

Time to get hands-on. We'll walk through building a practical AI-powered automation that you can adapt for your own business. This is the lesson where theory becomes practice.

:::key
The Smart Lead Processor is a template you can adapt for virtually any "receive input, analyze it with AI, take action" workflow. Build it once for leads, then clone it for support tickets, job applications, customer feedback, or expense reports. The pattern is always the same -- only the prompts and destinations change.
:::

## The "Smart Lead Processor" Workflow

This automation takes new form submissions, uses AI to analyze and score them, creates CRM records, and drafts personalized follow-ups.

### What You'll Build
1. **Trigger**: New form submission (Typeform, Google Forms, or any form tool)
2. **AI Step 1**: Classify and score the lead
3. **AI Step 2**: Draft a personalized response
4. **Action**: Create a record in your CRM / Google Sheet
5. **Action**: Send the drafted email (or queue for human review)
6. **Action**: Notify your team on Slack

### Step-by-Step in Zapier

**Step 1: Set Up the Trigger**
- Choose your form tool (Typeform, Google Forms, Jotform, etc.)
- Select trigger: "New Form Submission"
- Connect your account and test with a sample submission

**Step 2: AI Classification**
Add a Zapier AI action:
- Action: "AI Text"
- Prompt:
\`\`\`
Analyze this form submission and provide:

1. Lead Score (1-100): Based on buying intent, company size, and urgency
2. Category: hot-lead, warm-lead, cold-lead, or not-a-lead
3. Key interests: What products/services are they interested in?
4. Recommended next step: What should our sales team do?
5. One-sentence summary: For the CRM notes field

Form data:
Name: {{name}}
Company: {{company}}
Email: {{email}}
Message: {{message}}
Budget: {{budget}}

Respond in JSON format.
\`\`\`

**Step 3: AI Email Draft**
Add another AI action:
- Prompt:
\`\`\`
Draft a personalized follow-up email to this lead:

Name: {{name}}
Company: {{company}}
Their message: {{message}}
Lead category: {{classification from Step 2}}

Rules:
- If hot-lead: Enthusiastic, mention scheduling a call this week
- If warm-lead: Helpful, share a relevant case study link
- If cold-lead: Soft touch, offer a free resource

Tone: Professional but warm. Under 150 words.
Sign off as: [Your Name], [Your Title]
\`\`\`

**Step 4: Create CRM Record**
- Tool: HubSpot / Salesforce / Google Sheets
- Map fields: name, email, company, lead score, category, summary

**Step 5: Send or Queue Email**
- For hot leads: Send immediately via Gmail
- For warm/cold leads: Create a draft in Gmail for human review

**Step 6: Team Notification**
- Post to Slack: "New {{category}} lead: {{name}} from {{company}}. Score: {{score}}. Summary: {{summary}}"

### Step-by-Step in n8n

The same workflow in n8n uses:
1. **Webhook node** or **Form Trigger** node
2. **AI Agent node** with Claude/GPT for classification
3. **AI Agent node** for email drafting
4. **Google Sheets node** or **CRM node** for record creation
5. **Gmail node** for email
6. **Slack node** for notification

The visual workflow builder lets you see the entire flow and debug each step.

---

## Testing Your Automation

:::tip
Test with edge cases, not just happy paths. Submit a form with missing fields, unusual characters, or a language the AI might struggle with. The bugs you find during testing are the ones that would have embarrassed you in production.
:::

### Test Checklist
- [ ] Submit a test form with a hot lead profile → Does it get classified correctly?
- [ ] Submit a test form with minimal information → Does it handle missing data gracefully?
- [ ] Submit a test form in a different language → Does AI still classify correctly?
- [ ] Check the CRM record → Are all fields populated correctly?
- [ ] Read the drafted email → Is it personalized and appropriate?
- [ ] Check Slack → Did the notification arrive with correct info?

### Common Issues and Fixes

| Issue | Cause | Fix |
|---|---|---|
| AI returns wrong format | Prompt too vague | Add "Respond ONLY in JSON format: {score: number, category: string, ...}" |
| Empty fields in CRM | Data mapping error | Check that each CRM field maps to the correct step output |
| Email sounds generic | Not enough personalization data | Include more form fields in the email drafting prompt |
| Workflow runs slowly | Too many AI calls | Combine classification and email draft into one AI call |
| Duplicate records | Trigger fires multiple times | Add a deduplication check (search CRM before creating) |

## Adapting This Template

This lead processor template can be adapted for:
- **Support ticket routing**: Classify tickets instead of leads
- **Content moderation**: Classify user-generated content
- **Job applications**: Score and route resumes
- **Customer feedback**: Analyze and route feedback to the right team
- **Expense reports**: Extract data from receipts and categorize expenses`,
          exercises: [
            {
              id: 'w7-u1-l4-e1',
              type: 'prompt-challenge',
              question: 'Build (or detailed plan) an AI-powered automation workflow for your business. Document: the trigger, each step with the specific tool and AI prompt, data mapping between steps, and how you would test it. If you have access to Zapier, Make, or n8n — actually build it!',
              hint: 'Start with the simplest version that works. You can always add branches, error handling, and additional steps later. The Smart Lead Processor template is a great starting point.',
              xpBonus: 25,
            },
            {
              id: 'w7-u1-l4-e2',
              type: 'quiz',
              question: 'When an AI step in a workflow returns data in the wrong format, what is the best fix?',
              options: [
                'Switch to a different AI model',
                'Make the prompt more specific about the expected output format (e.g., "Respond ONLY in JSON format")',
                'Add more steps to the workflow',
                'Remove the AI step and do it manually'
              ],
              correctAnswer: 1,
              xpBonus: 5,
            },
            {
              id: 'w7-u1-l4-e3',
              type: 'free-response',
              question: 'List 3 workflows at your company that could benefit from an AI classification step. For each one, define: what data is being classified, what categories you would use, and what action happens for each category.',
              hint: 'Think about any process where someone reads something and decides what to do with it. That decision step is a classification task AI can automate.',
              xpBonus: 15,
            }
          ]
        }
      ]
    },
    {
      id: 'w7-u2',
      waveId: 'wave-7',
      title: 'Production Workflows',
      description: 'Build reliable, monitored, multi-step AI pipelines for real business use',
      order: 2,
      lessons: [
        {
          id: 'w7-u2-l1',
          waveId: 'wave-7',
          unitId: 'w7-u2',
          title: 'Multi-Step AI Pipelines',
          description: 'Chain multiple AI steps together for complex processing.',
          duration: '12 min',
          difficulty: 'advanced',
          xp: 30,
          order: 1,
          content: `# Multi-Step AI Pipelines

Simple automations use one AI step. Powerful automations chain multiple AI steps together, where the output of one feeds the input of the next -- like an assembly line of AI workers, each specializing in one task and passing their work to the next station.

:::key
The main advantage of multi-step pipelines over single AI calls: separation of concerns, quality checks, model optimization, and debuggability. When something goes wrong in a pipeline, you know exactly which step failed. When something goes wrong in a single massive prompt, good luck figuring out where.
:::

## Why Multi-Step?

Single AI calls have limits. They can hallucinate, produce inconsistent formats, or miss nuance. Multi-step pipelines address these problems:

1. **Separation of concerns**: Each step does one thing well
2. **Quality checks**: One AI step can verify another's work
3. **Specialization**: Different prompts (or models) optimized for each task
4. **Debuggability**: If something goes wrong, you know exactly which step failed

## Pipeline Architecture

### The Content Production Pipeline

**Step 1: Research (Claude Sonnet)**
> "Research the topic '[topic]' and provide: 5 key points, 3 statistics with sources, 2 expert quotes, and the current state of the debate."

**Step 2: Outline (Claude Sonnet)**
> "Given this research: [Step 1 output], create a blog post outline with: a compelling headline, introduction hook, 5 main sections with subheadings, and a conclusion."

**Step 3: Draft (Claude Sonnet)**
> "Write a 1,500-word blog post following this outline: [Step 2 output]. Use the research: [Step 1 output]. Tone: conversational but authoritative. Include data points to support each section."

**Step 4: Edit (Claude Haiku — cheaper, faster)**
> "Review this draft for: grammar, clarity, factual consistency, tone, and engagement. Suggest 5 specific improvements. Flag any claims that need source verification."

**Step 5: SEO Optimize (Claude Haiku)**
> "Optimize this article for SEO. Add: meta title (under 60 chars), meta description (under 160 chars), suggested URL slug, 5 internal link opportunities, and alt text for 3 suggested images."

**Step 6: Human Review**
The final draft is sent to a human editor for approval before publishing.

Total time: ~3 minutes of AI processing, ~10 minutes of human review.
Without the pipeline: 4-6 hours of writing.

### The Customer Intelligence Pipeline

**Step 1: Gather** — Collect customer feedback from multiple sources (reviews, tickets, surveys)
**Step 2: Clean** — AI normalizes format, removes duplicates, fixes typos
**Step 3: Classify** — AI categorizes each piece of feedback (product, service, pricing, UX)
**Step 4: Sentiment** — AI scores sentiment (positive/negative/neutral) and urgency
**Step 5: Aggregate** — AI groups by theme and generates a summary report
**Step 6: Recommend** — AI suggests the top 3 actions based on the analysis
**Step 7: Deliver** — Report sent to stakeholders via email/Slack

---

## Choosing the Right Model for Each Step

:::tip
A pipeline using cheaper models for 3 steps and premium models for 2 steps costs 60-70% less than using premium for all 5 steps -- often with minimal quality difference. Classification and verification are simple tasks that do not need expensive reasoning power. Save the premium models for creative writing and complex analysis.
:::

Not every step needs your most powerful (and expensive) model:

| Task Type | Recommended Model | Why |
|---|---|---|
| Classification | Claude Haiku / GPT-3.5 | Simple, fast, cheap — perfect for yes/no or category tasks |
| Data extraction | Claude Haiku / GPT-3.5 | Structured extraction doesn't need deep reasoning |
| Creative writing | Claude Sonnet / GPT-4 | Needs nuance, voice, creativity |
| Complex reasoning | Claude Opus / GPT-4 | Multi-step logic, analysis, strategy |
| Code generation | Claude Sonnet / GPT-4 | Needs accuracy and understanding of context |
| Verification | Claude Haiku / GPT-3.5 | Checking work is simpler than creating it |

**Cost optimization**: A pipeline using Haiku for 3 steps and Sonnet for 2 steps costs 60-70% less than using Sonnet for all 5 steps — with minimal quality difference.

## Building Pipelines in Practice

### In Zapier
Chain multiple "AI Text" actions, passing output from each step as input to the next.

### In n8n
Use multiple AI Agent nodes connected in sequence. n8n's visual builder makes the data flow clear.

### In Make
Use multiple HTTP modules calling the AI API, with JSON parsing between steps.

### Key Principles
1. **Test each step independently** before connecting them
2. **Validate the output format** of each step before passing to the next
3. **Add logging** so you can debug failures
4. **Set timeouts** — if one step hangs, it shouldn't block everything
5. **Build incrementally** — start with 2 steps, add more as you validate`,
          exercises: [
            {
              id: 'w7-u2-l1-e1',
              type: 'prompt-challenge',
              question: 'Design a 4-step AI pipeline for a real business process. For each step, specify: the AI model to use (and why), the prompt, the expected output format, and what happens if the step fails. Include at least one quality-check step.',
              hint: 'Start with a process you know well: content creation, customer feedback analysis, or report generation. The key is that each step\'s output feeds the next step\'s input.',
              xpBonus: 25,
            },
            {
              id: 'w7-u2-l1-e2',
              type: 'quiz',
              question: 'Why should you use cheaper AI models for classification and verification steps?',
              options: [
                'Cheaper models are more accurate at classification',
                'These tasks don\'t require deep reasoning, so cheaper models deliver similar quality at lower cost',
                'Expensive models can\'t do classification',
                'It\'s required by the AI providers'
              ],
              correctAnswer: 1,
              xpBonus: 5,
            },
            {
              id: 'w7-u2-l1-e3',
              type: 'quiz',
              question: 'What is the main advantage of a multi-step AI pipeline over a single AI call?',
              options: [
                'It\'s always faster than one call',
                'It uses less total compute',
                'Each step specializes in one task, enabling quality checks and easier debugging',
                'It\'s required by automation platforms'
              ],
              correctAnswer: 2,
              xpBonus: 5,
            }
          ]
        },
        {
          id: 'w7-u2-l2',
          waveId: 'wave-7',
          unitId: 'w7-u2',
          title: 'Error Handling & Reliability',
          description: 'Build workflows that handle failures gracefully.',
          duration: '10 min',
          difficulty: 'advanced',
          xp: 25,
          order: 2,
          content: `# Error Handling & Reliability

Production workflows need to handle the real world -- where APIs go down, data is messy, and AI sometimes returns nonsense. This lesson covers how to build workflows that recover gracefully instead of failing silently and losing data.

:::key
There are three types of failures -- transient (temporary issues that fix themselves), data (invalid input), and AI (unexpected output). Each type requires a different handling strategy. The dead letter queue ensures no data is ever silently lost, even when all recovery attempts fail.
:::

## The Three Types of Failures

### 1. Transient Failures
Temporary issues that fix themselves:
- API rate limit hit (too many requests)
- Network timeout
- Service temporarily unavailable

**Solution**: Retry with exponential backoff
- Attempt 1: Wait 1 second, retry
- Attempt 2: Wait 5 seconds, retry
- Attempt 3: Wait 30 seconds, retry
- Give up after 3 attempts and alert

### 2. Data Failures
The input data is invalid or unexpected:
- Missing required fields
- Wrong data format (text where a number was expected)
- Unexpected characters or encoding

**Solution**: Validate before processing
\`\`\`
IF email field is empty → Skip this record, log "Missing email"
IF amount is not a number → Flag for human review
IF text contains > 100,000 characters → Truncate with warning
\`\`\`

### 3. AI Failures
The AI returns something unexpected:
- Hallucinated data
- Wrong output format (prose instead of JSON)
- Refused to answer (safety filter triggered)
- Irrelevant response

**Solution**: Validate AI output
\`\`\`
IF AI response is not valid JSON → Retry with stricter prompt
IF classification not in allowed list → Default to "other"
IF confidence score < 50% → Route to human review
IF response is empty → Retry once, then flag
\`\`\`

## Building Robust Error Handling

### The Guard Pattern
Before every AI step, add a validation step:

\`\`\`
Step 1: Receive data
Step 2: GUARD - Validate required fields exist
  ↳ IF invalid → Log error, send alert, stop
Step 3: AI Classification
Step 4: GUARD - Validate AI returned expected format
  ↳ IF invalid → Retry with stricter prompt
  ↳ IF still invalid → Route to human review
Step 5: Continue workflow
\`\`\`

### The Dead Letter Queue
When a record fails all attempts at processing, don't lose it:
1. Save the failed record to a "dead letter" spreadsheet or database
2. Include: the original data, which step failed, the error message, timestamp
3. Review and reprocess dead letters weekly

This ensures no data is ever silently lost.

---

### Idempotency

:::warning
If a workflow runs twice with the same input -- which happens with retries -- it should produce the same result without duplicates. Without idempotency, a retry can create duplicate CRM records, send duplicate emails, or charge a customer twice. Design every action to be safe to repeat.
:::

**How to achieve this:**
- Check if a record already exists before creating it
- Use unique IDs to detect duplicate processing
- Design actions that are safe to repeat (update instead of insert)

## Alerting and Notifications

Your workflow should tell you when something goes wrong:

### Alert Levels

| Level | When | Action |
|---|---|---|
| **Info** | Workflow completed successfully | Log only (no notification) |
| **Warning** | A retry was needed but succeeded | Log + daily digest |
| **Error** | A step failed but workflow continued via fallback | Log + immediate Slack notification |
| **Critical** | Workflow stopped entirely | Log + immediate Slack + email + SMS |

### What to Include in Alerts
- Which workflow failed
- Which step failed
- The input data that caused the failure
- The error message
- How many times this error has occurred recently
- Suggested fix (if known)

## Monitoring Dashboard

For production workflows, track these metrics:
- **Success rate**: % of runs that complete without errors
- **Average execution time**: Is the workflow getting slower?
- **Error frequency by step**: Which step fails most often?
- **Retry rate**: How often are retries needed?
- **AI cost per run**: Are you staying within budget?
- **Dead letter queue size**: Are unprocessed records piling up?

Most automation platforms have built-in monitoring. For custom solutions, log to a Google Sheet or a simple dashboard.`,
          exercises: [
            {
              id: 'w7-u2-l2-e1',
              type: 'free-response',
              question: 'Take the workflow you designed earlier and add error handling. For each step, describe: what could go wrong, how you would detect it, and what the fallback action is. Include a dead letter queue strategy.',
              hint: 'Think about: What if the form data is incomplete? What if AI returns garbage? What if the CRM API is down? Each failure needs a specific recovery plan.',
              xpBonus: 15,
            },
            {
              id: 'w7-u2-l2-e2',
              type: 'quiz',
              question: 'What is a "dead letter queue" in workflow automation?',
              options: [
                'A list of emails that failed to send',
                'A storage area for records that failed all processing attempts, preserving them for later review',
                'A queue of customers who stopped responding',
                'A backup copy of the entire workflow'
              ],
              correctAnswer: 1,
              xpBonus: 5,
            },
            {
              id: 'w7-u2-l2-e3',
              type: 'quiz',
              question: 'What does "idempotency" mean in workflow design?',
              options: [
                'The workflow runs as fast as possible',
                'The workflow uses the minimum number of steps',
                'Running the workflow twice with the same input produces the same result without creating duplicates',
                'The workflow can handle multiple languages'
              ],
              correctAnswer: 2,
              xpBonus: 5,
            }
          ]
        },
        {
          id: 'w7-u2-l3',
          waveId: 'wave-7',
          unitId: 'w7-u2',
          title: 'Monitoring & Optimization',
          description: 'Track performance, optimize costs, and keep workflows healthy.',
          duration: '10 min',
          difficulty: 'advanced',
          xp: 25,
          order: 3,
          content: `# Monitoring & Optimization

A workflow in production is like a car -- it needs regular maintenance, fuel efficiency checks, and dashboards to tell you when something is off. Ignore it long enough and something will break at the worst possible time.

:::key
The three pillars of workflow health are performance (is it fast enough?), reliability (is it working consistently?), and cost (are we staying within budget?). Track all three. A workflow that is fast and reliable but costs 10x what you expected is not healthy.
:::

## What to Monitor

### Performance Metrics
- **Execution time**: How long does each run take? Is it getting slower?
- **Throughput**: How many records are processed per hour/day?
- **Queue depth**: Are records backing up faster than they're processed?
- **Latency**: Time between trigger and final action completing

### Reliability Metrics
- **Success rate**: Target 98%+ for production workflows
- **Error rate by step**: Identify your weakest link
- **Retry rate**: High retry rates signal an underlying issue
- **Mean time to recovery**: When something breaks, how fast do you fix it?

### Cost Metrics
- **AI API cost per run**: Track this closely — it can spiral
- **Total monthly automation cost**: Platform fees + API costs + compute
- **Cost per outcome**: How much does it cost to process one lead/ticket/report?

## Cost Optimization Strategies

### 1. Right-Size Your Models
Don't use GPT-4 for a task GPT-3.5 handles fine. Audit each AI step:

> "For each AI step in my workflow, evaluate:
> - Does this task require complex reasoning? (If no → use cheaper model)
> - Is the output quality noticeably different between models? (Test both)
> - What's the cost difference? (Usually 10-20x between tiers)"

### 2. Reduce Token Usage
- **Shorter prompts**: Cut unnecessary instructions
- **Set max_tokens**: Don't let AI write 1,000 tokens when you need 100
- **Structured output**: Request JSON instead of prose (usually shorter)
- **Pre-filter**: Don't send irrelevant data to AI (clean the input first)

### 3. Batch Processing
Instead of making one AI call per record, batch records together:
- **Before**: 100 support tickets → 100 AI API calls
- **After**: 100 tickets batched into groups of 10 → 10 AI calls (each classifying 10 tickets at once)

Batching can reduce costs by 80%+ for classification tasks.

### 4. Caching
If you frequently classify the same type of data, cache the results:
- First time: AI classifies "I need to reset my password" → "account-access"
- Next time someone says something similar: Check cache first

---

### 5. Conditional AI Usage
Not every record needs AI processing:
\`\`\`
IF email subject contains "unsubscribe" → Route to unsubscribe handler (no AI needed)
IF message length < 10 characters → Flag as "too short" (no AI needed)
ELSE → Send to AI for classification
\`\`\`

## Workflow Maintenance Schedule

### Weekly (15 minutes)
- Check error logs — any new failure patterns?
- Review the dead letter queue — anything stuck?
- Spot-check 5 outputs — is quality still good?

### Monthly (1 hour)
- Review cost trends — any unexpected spikes?
- Check AI model updates — are there new, cheaper options?
- Test edge cases — run your test suite again
- Update knowledge/prompts if business rules changed

### Quarterly (2-3 hours)
- Full audit — is this workflow still needed? Still the best approach?
- Benchmark against alternatives — has a better tool/method emerged?
- Cost-benefit analysis — is the ROI still positive?
- Plan improvements for next quarter

:::tip
Set up a monthly "cost per outcome" review. Divide your total automation cost by the number of items processed. If cost per outcome is rising, something is wrong -- either volume dropped, prompts got longer, or you are using the wrong model for a task. This single metric catches most optimization opportunities.
:::

## Scaling Workflows

When a workflow is working well and you want to process more:

### Horizontal Scaling
Run multiple instances of the same workflow in parallel. Most automation platforms handle this automatically.

### Rate Limit Management
AI APIs have rate limits. When scaling:
- Add queuing to avoid hitting limits
- Spread processing across time windows
- Use multiple API keys if needed (check provider terms)

### Performance Optimization
- Remove unnecessary steps
- Combine steps where possible (one AI call instead of two)
- Use webhooks instead of polling where available
- Process only changed/new data, not the entire dataset`,
          exercises: [
            {
              id: 'w7-u2-l3-e1',
              type: 'prompt-challenge',
              question: 'Calculate the monthly cost of an AI workflow you\'ve designed. Estimate: number of runs per month, tokens per AI call (input + output), model pricing, and platform fees. Then propose 3 optimization strategies to reduce cost by 50%.',
              hint: 'Claude Haiku: ~$0.25/million input tokens. Claude Sonnet: ~$3/million input tokens. A typical classification prompt is 500-1000 tokens. Do the math for your volume.',
              xpBonus: 20,
            },
            {
              id: 'w7-u2-l3-e2',
              type: 'quiz',
              question: 'What is the most effective way to reduce AI API costs for classification workflows?',
              options: [
                'Use the most expensive model for better accuracy',
                'Batch multiple records into a single AI call instead of one call per record',
                'Run the workflow less frequently',
                'Shorten the data being classified'
              ],
              correctAnswer: 1,
              xpBonus: 5,
            },
            {
              id: 'w7-u2-l3-e3',
              type: 'free-response',
              question: 'Create a maintenance checklist for one of your AI workflows. Include: what to check weekly, monthly, and quarterly. What specific metrics would trigger an alert?',
              hint: 'Think about: error rate spikes, cost increases, response quality degradation, and changes in input data patterns.',
              xpBonus: 10,
            }
          ]
        },
        {
          id: 'w7-u2-l4',
          waveId: 'wave-7',
          unitId: 'w7-u2',
          title: 'Real Business Automation Examples',
          description: 'Complete workflow blueprints for common business needs.',
          duration: '12 min',
          difficulty: 'advanced',
          xp: 25,
          order: 4,
          content: `# Real Business Automation Examples

Here are five complete, production-ready workflow blueprints. Each one solves a real business problem and can be built in a weekend. These are not theoretical designs -- they are patterns that businesses are running right now.

:::key
Pick the blueprint that solves your biggest time waste, has the clearest ROI, has the lowest risk if AI makes a mistake, and uses tools you already have. Starting with low-risk, high-impact automations builds confidence and momentum for bigger projects later.
:::

## Blueprint 1: The Customer Feedback Loop

**Problem**: Customer feedback is scattered across email, social media, support tickets, and review sites. Nobody reads all of it systematically.

**Workflow**:
1. **Triggers** (multiple):
   - New support ticket created
   - New Google review received
   - New social media mention
   - Weekly survey responses
2. **AI: Normalize** — Convert all feedback to a standard format: source, date, customer name, feedback text
3. **AI: Classify** — Category (product, service, pricing, UX, other) + Sentiment (positive, negative, neutral) + Urgency (low, medium, high)
4. **Route**: High urgency negative → immediate Slack alert to manager. Others → batch for weekly report.
5. **AI: Weekly Summary** — Every Friday, compile all feedback into a report: top themes, sentiment trends, recommended actions
6. **Deliver**: Email the report to leadership, post highlights to Slack

**ROI**: Replaces 3-4 hours/week of manual review. Catches urgent issues in real-time instead of days later.

## Blueprint 2: The Automated Content Engine

**Problem**: Creating consistent content for blog, social media, and email newsletter takes 10+ hours per week.

**Workflow**:
1. **Trigger**: Manually input a topic or keyword
2. **AI: Research** — Search the web, find trending angles, competitor content
3. **AI: Blog Draft** — Write a 1,200-word article based on research
4. **AI: Social Posts** — Generate 5 social media posts from the article (LinkedIn, Twitter, Instagram)
5. **AI: Email Snippet** — Write a newsletter blurb linking to the article
6. **AI: SEO** — Generate meta tags, alt text, suggested internal links
7. **Human Review**: All content goes to a Google Doc for approval
8. **Publish**: Approved content is scheduled via Buffer/Hootsuite and email tool

**ROI**: Reduces content creation from 10 hours to 2 hours per week. Maintains consistent publishing schedule.

---

## Blueprint 3: The Intelligent Onboarding System

**Problem**: New customer onboarding requires multiple manual emails, setup steps, and check-ins.

**Workflow**:
1. **Trigger**: New customer record created in CRM
2. **AI: Personalize** — Based on customer's industry, size, and stated goals, customize the onboarding path
3. **Day 0**: Send personalized welcome email with customized setup guide
4. **Day 1**: AI checks if the customer has logged in → if not, send a "need help?" email
5. **Day 3**: AI generates a personalized tips email based on what features they've used (and haven't)
6. **Day 7**: AI drafts a check-in email asking about their experience
7. **Day 14**: AI analyzes their usage data and sends "you're using X well, have you tried Y?"
8. **Day 30**: AI generates an onboarding report for the account manager: usage summary, engagement score, risk factors

**ROI**: Eliminates 30-60 minutes per customer onboarding. Increases activation rates through timely, personalized communication.

## Blueprint 4: The Financial Operations Assistant

**Problem**: Monthly financial close requires gathering data from multiple sources, reconciling, and generating reports.

**Workflow**:
1. **Trigger**: 1st of every month at 6 AM
2. **Gather**: Pull data from Stripe (revenue), payroll system (expenses), bank account (transactions)
3. **AI: Reconcile** — Compare expected vs actual transactions, flag discrepancies
4. **AI: Categorize** — Auto-categorize any uncategorized transactions
5. **AI: Generate Report** — Create a monthly financial summary: revenue, expenses, profit, MoM changes, anomalies
6. **AI: Forecast** — Project next month's numbers based on trends
7. **Human Review**: CFO/accountant reviews the report
8. **Archive**: Save report to Google Drive with consistent naming

**ROI**: Reduces monthly close process from 2 days to 2 hours. Catches reconciliation issues automatically.

## Blueprint 5: The Competitive Intelligence Dashboard

**Problem**: Staying on top of competitor moves requires constant manual monitoring.

**Workflow**:
1. **Trigger**: Daily at 7 AM
2. **AI: Search** — Monitor news, social media, job postings, and product updates for each competitor
3. **AI: Analyze** — For each finding: summarize, assess impact (high/medium/low), classify (product launch, hire, pricing change, partnership)
4. **AI: Compare** — How does this affect our competitive position?
5. **Store**: Add to a running competitive intelligence database
6. **Daily Brief**: AI generates a 3-bullet daily intelligence brief
7. **Monthly Report**: AI compiles the month's intelligence into a strategic briefing

**ROI**: Replaces hours of manual research per week. Ensures no important competitor move is missed.

---

:::tip
Start with Blueprint 1 (Customer Feedback Loop) or Blueprint 2 (Automated Content Engine) if you are not sure which to pick. They have the clearest ROI, the lowest risk, and they produce visible results that build organizational support for more ambitious automations.
:::

## How to Choose Your First Automation

Pick the blueprint that:
1. **Solves your biggest time waste** — Where do you spend the most time on repetitive work?
2. **Has the clearest ROI** — Time saved × hourly value > automation cost?
3. **Has the lowest risk** — What happens if the AI makes a mistake? If it's low-stakes, start there.
4. **Uses tools you already have** — Don't buy new software just for the automation.`,
          exercises: [
            {
              id: 'w7-u2-l4-e1',
              type: 'prompt-challenge',
              question: 'Choose one of the 5 blueprints (or design your own) and create a complete implementation plan. Include: specific tools for each step, estimated setup time, estimated monthly cost, expected ROI, and a testing plan with 5 test scenarios.',
              hint: 'Be realistic about cost. Calculate: platform subscription + AI API costs (based on volume) + your setup time. Compare against the time/money you currently spend on this task.',
              xpBonus: 25,
            },
            {
              id: 'w7-u2-l4-e2',
              type: 'free-response',
              question: 'Which of the 5 blueprints would create the most value for your business? Explain why, including how much time you currently spend on that task and what the ideal outcome looks like.',
              hint: 'Think about both time savings and quality improvements. Sometimes the biggest value isn\'t time saved but consistency and comprehensiveness (e.g., never missing competitor news).',
              xpBonus: 10,
            },
            {
              id: 'w7-u2-l4-e3',
              type: 'quiz',
              question: 'When choosing your first automation to build, which criteria is MOST important?',
              options: [
                'It uses the most advanced AI model available',
                'It has the most steps',
                'It solves your biggest time waste with clear ROI and low risk if the AI makes a mistake',
                'It impresses your coworkers'
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
wave7.totalXP = wave7.units.reduce((sum, unit) =>
  sum + unit.lessons.reduce((lSum, lesson) =>
    lSum + lesson.xp + lesson.exercises.reduce((eSum, ex) => eSum + ex.xpBonus, 0), 0), 0);
