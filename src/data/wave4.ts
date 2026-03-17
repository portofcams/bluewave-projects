import { Wave } from './curriculum-types';

export const wave4: Wave = {
  id: 'wave-4',
  number: 4,
  title: 'AI for Business Operations',
  subtitle: 'Automate the Mundane',
  description: 'Apply AI to real business tasks: customer service, data extraction, market research, and strategic planning.',
  color: '#f59e0b',
  icon: '🏢',
  weekRange: 'Week 4-5',
  totalXP: 0,
  units: [
    {
      id: 'w4-u1', waveId: 'wave-4', title: 'Customer & Admin Operations', description: 'Streamline repetitive business tasks', order: 1,
      lessons: [
        {
          id: 'w4-u1-l1', waveId: 'wave-4', unitId: 'w4-u1', title: 'Customer Service Automation', description: 'Handle support tickets faster with AI assistance.',
          duration: '10 min', difficulty: 'intermediate', xp: 25, order: 1,
          content: `# Customer Service Automation

AI can transform how you handle customer support — from faster response times to consistent quality.

## Triage & Classification

> "Classify these customer support tickets into categories (billing, technical, feature request, complaint, general inquiry) and priority levels (urgent, high, medium, low):
>
> 1. 'My payment was charged twice yesterday!'
> 2. 'How do I export my data to CSV?'
> 3. 'It would be great if you added dark mode'
> 4. 'Your app has been down for 3 hours and I'm losing business'
> 5. 'What are your business hours?'"

## Response Templates

> "Create 5 customer service response templates for a [business type] covering:
> 1. Acknowledging a complaint
> 2. Explaining a delay
> 3. Offering a refund/credit
> 4. Answering a common FAQ
> 5. Following up after issue resolution
>
> Tone: empathetic, professional. Include [name] and [specific issue] placeholders."

## Escalation Decision Framework

> "Given this customer message, determine if it should be:
> A) Handled with a template response
> B) Needs a personalized response from a support agent
> C) Needs immediate escalation to a manager
>
> Message: [paste message]
>
> Explain your reasoning."

## Building a Knowledge Base
> "Based on these 20 customer support tickets [paste tickets], identify the top 10 most common questions. For each, write a clear FAQ answer that could be posted on our help center."

This single prompt can build your FAQ in minutes instead of weeks.`,
          exercises: [
            { id: 'w4-u1-l1-e1', type: 'prompt-challenge', question: 'Create a set of 5 customer service templates for a business you know. Test them by asking AI to fill in the placeholders with a fictional scenario.', hint: 'Think about the most common customer issues. Templates should be empathetic and solution-focused.', xpBonus: 20 },
            { id: 'w4-u1-l1-e2', type: 'quiz', question: 'When should a customer message be escalated to a manager?', options: ['Always, to be safe', 'When the customer uses CAPS LOCK', 'When it involves legal threats, safety issues, or the customer has already contacted support multiple times', 'Never — AI can handle everything'], correctAnswer: 2, xpBonus: 5 }
          ]
        },
        {
          id: 'w4-u1-l2', waveId: 'wave-4', unitId: 'w4-u1', title: 'Data Entry & Extraction', description: 'Pull structured data from unstructured text instantly.',
          duration: '10 min', difficulty: 'intermediate', xp: 25, order: 2,
          content: `# Data Entry & Extraction

One of AI's superpowers: turning messy, unstructured text into clean, structured data.

## Extracting Data from Text

> "Extract the following information from this email/document and format as JSON:
> - Company name
> - Contact person
> - Email address
> - Phone number
> - Requested service
> - Budget mentioned
> - Timeline
>
> If any field is not found, use 'N/A'.
>
> Document: [paste text]"

## Invoice Processing

> "Extract line items from this invoice text and format as a table:
> | Item | Quantity | Unit Price | Total |
>
> Also extract: Invoice number, date, vendor name, subtotal, tax, and grand total.
>
> Invoice: [paste invoice text]"

## Business Card / Contact Parsing

> "Parse these business card details into a contact database format:
> [paste business card text or multiple cards]
>
> Format: CSV with columns: First Name, Last Name, Title, Company, Email, Phone, Address"

## Batch Processing Pattern

For processing many items:

> "Process each entry below. For each one, extract: name, date, amount, and category.
>
> Example:
> Input: 'Paid $450 to ABC Plumbing on March 15 for bathroom repair'
> Output: Name: ABC Plumbing | Date: March 15 | Amount: $450 | Category: Home Repair
>
> Now process:
> 1. [entry]
> 2. [entry]
> ..."

## Tips
- Always specify the output format (JSON, CSV, table, etc.)
- Provide an example for complex extractions
- Ask AI to flag uncertain extractions with a confidence indicator
- Always verify extracted numbers — AI occasionally miscalculates`,
          exercises: [
            { id: 'w4-u1-l2-e1', type: 'prompt-challenge', question: 'Find a real receipt or invoice (or create a realistic one) and use AI to extract all data into a structured format. How accurate was the extraction?', hint: 'Try JSON or CSV format. Check every number against the original.', xpBonus: 20 },
            { id: 'w4-u1-l2-e2', type: 'prompt-challenge', question: 'Create a batch processing prompt that converts 5 informal expense descriptions into structured data: "Coffee meeting $12, Uber to client $34, Office supplies from Staples $89..."', hint: 'Define clear output columns: Date, Vendor, Amount, Category, Payment Method.', xpBonus: 15 }
          ]
        },
        {
          id: 'w4-u1-l3', waveId: 'wave-4', unitId: 'w4-u1', title: 'Scheduling & Calendar Management', description: 'Let AI handle the back-and-forth of scheduling.',
          duration: '8 min', difficulty: 'beginner', xp: 15, order: 3,
          content: `# Scheduling & Calendar Management

The back-and-forth of scheduling is a perfect task for AI assistance.

## Drafting Scheduling Emails

> "Write a scheduling email to [person] to set up a [meeting type].
> My availability: [list times]
> Meeting duration: [X minutes]
> Meeting format: [Zoom/in-person/phone]
> Include a Calendly-style format showing 3 options."

## Meeting Agenda Creation

> "Create a meeting agenda for a [duration] [meeting type] with [attendees].
> Goals: [what should be decided/accomplished]
> Format:
> - Topic (time allocation)
> - Discussion lead
> - Expected outcome"

## Time Zone Coordination

> "I need to schedule a meeting with people in:
> - New York (EST)
> - London (GMT)
> - Tokyo (JST)
> - San Francisco (PST)
>
> Find 3 time slots that are during business hours (9am-5pm) for as many participants as possible. If no time works for all, suggest the best compromise."

## Weekly Planning

> "Here are my tasks for this week:
> [list tasks with estimated time]
>
> My available hours: [schedule]
> My energy pattern: [when you're most productive]
>
> Create an optimized daily schedule that puts deep work during high-energy times and meetings/admin during low-energy times."

This is a great use of AI because it considers multiple constraints simultaneously — something humans find mentally taxing.`,
          exercises: [
            { id: 'w4-u1-l3-e1', type: 'prompt-challenge', question: 'Use the weekly planning prompt with your actual tasks and schedule for next week. Does the AI-generated schedule make sense?', hint: 'Be honest about your energy patterns. Most people are sharpest in the morning.', xpBonus: 15 },
            { id: 'w4-u1-l3-e2', type: 'free-response', question: 'What scheduling tasks consume the most of your time? How could AI reduce that time?', hint: 'Think about: finding available times, writing scheduling emails, creating agendas, coordinating across time zones.', xpBonus: 10 }
          ]
        }
      ]
    },
    {
      id: 'w4-u2', waveId: 'wave-4', title: 'Strategic Analysis', description: 'AI-powered business intelligence and strategy', order: 2,
      lessons: [
        {
          id: 'w4-u2-l1', waveId: 'wave-4', unitId: 'w4-u2', title: 'Market Research with AI', description: 'Conduct rapid market research using AI as your analyst.',
          duration: '12 min', difficulty: 'intermediate', xp: 25, order: 1,
          content: `# Market Research with AI

AI can compress weeks of research into hours. Here's how to use it as your market analyst.

## Industry Overview Prompt

> "Provide a comprehensive overview of the [industry] market:
> 1. Market size and growth rate
> 2. Key players and their market share
> 3. Major trends shaping the industry
> 4. Customer segments and their needs
> 5. Regulatory landscape
> 6. Technology disruptions on the horizon
>
> Note: Flag any data points you're uncertain about."

## Customer Persona Development

> "Create 3 detailed customer personas for a [business type] that [description].
> For each persona include:
> - Demographics (age, income, location, job)
> - Psychographics (values, interests, pain points)
> - Buying behavior (how they discover products, decision factors, budget)
> - A day-in-the-life scenario
> - Objections they'd have to our product
> - What would make them a champion/referral source"

## Competitive Positioning

> "I'm launching [product/service description]. My main competitors are [list competitors].
> Create a competitive positioning map analyzing:
> - Each competitor's strengths and weaknesses
> - Pricing strategies
> - Target audience differences
> - Feature gaps (opportunities for me)
> - Their messaging/positioning
> Suggest how I should position differently."

## Important Caveat
AI market research is a **starting point**, not the final answer. AI data may be outdated or imprecise. Always:
- Verify market size numbers from industry reports
- Check competitor info on their actual websites
- Validate customer assumptions with real customers
- Use AI research to form hypotheses, then test them`,
          exercises: [
            { id: 'w4-u2-l1-e1', type: 'prompt-challenge', question: 'Run the Industry Overview prompt for an industry you know well. Score the AI\'s accuracy: what did it get right vs wrong?', hint: 'Your domain knowledge lets you evaluate AI output quality. This is exactly the "force multiplier" concept from Wave 1.', xpBonus: 20 },
            { id: 'w4-u2-l1-e2', type: 'prompt-challenge', question: 'Create 3 customer personas for a business you\'re familiar with. Would your sales team recognize these people as real customers?', hint: 'The more specific the business context you provide, the more realistic the personas.', xpBonus: 20 }
          ]
        },
        {
          id: 'w4-u2-l2', waveId: 'wave-4', unitId: 'w4-u2', title: 'Competitor Analysis', description: 'Systematically analyze your competition with AI.',
          duration: '10 min', difficulty: 'intermediate', xp: 20, order: 2,
          content: `# Competitor Analysis with AI

Understanding your competition is critical. AI helps you do it systematically.

## The Competitor Deep Dive

> "Analyze [Competitor Name] as a competitor to my business [your business description]:
>
> Based on publicly available information:
> 1. **Product/Service offering**: What do they sell and to whom?
> 2. **Pricing model**: How do they charge?
> 3. **Strengths**: What are they best at?
> 4. **Weaknesses**: Where do they fall short?
> 5. **Messaging**: What's their core value proposition?
> 6. **Customer sentiment**: What do reviews suggest about satisfaction?
> 7. **Opportunities**: Where could I differentiate?"

## Feature Comparison Matrix

> "Create a feature comparison table for these products: [list products]
> Categories to compare:
> - [Feature category 1]
> - [Feature category 2]
> - [Feature category 3]
> - Pricing
> - Target audience
> - Key differentiator
>
> Use ✅, ❌, and ⚠️ (partial) for feature availability."

## SWOT Analysis

> "Conduct a SWOT analysis for [business/product]:
>
> Context: [business description, current situation]
>
> For each quadrant, provide at least 5 specific, actionable points (not generic statements):
> - **Strengths** (internal advantages)
> - **Weaknesses** (internal disadvantages)
> - **Opportunities** (external factors you can leverage)
> - **Threats** (external risks)
>
> Then provide: 3 strategies that use Strengths to capture Opportunities, and 3 strategies to address Weaknesses before Threats materialize."

The SWOT + strategy combination is much more useful than a standalone SWOT grid.`,
          exercises: [
            { id: 'w4-u2-l2-e1', type: 'prompt-challenge', question: 'Run a SWOT analysis (with the strategy extension) on a business you know well. Are the AI-generated strategies actually viable?', hint: 'Provide detailed context about the business for better results. Generic input = generic output.', xpBonus: 20 },
            { id: 'w4-u2-l2-e2', type: 'prompt-challenge', question: 'Create a feature comparison matrix for 3 products/services in the same space. Share the result with someone who knows the space — did AI get the comparisons right?', hint: 'This is a great exercise in verifying AI output. Competitor features change constantly.', xpBonus: 15 }
          ]
        },
        {
          id: 'w4-u2-l3', waveId: 'wave-4', unitId: 'w4-u2', title: 'Business Plan Drafting', description: 'Build a business plan framework with AI assistance.',
          duration: '12 min', difficulty: 'intermediate', xp: 25, order: 3,
          content: `# Business Plan Drafting with AI

AI won't write your business plan for you — but it will give you a massive head start.

## The Section-by-Section Approach

Don't ask AI to write the whole plan at once. Do it section by section.

### Executive Summary (write this LAST)
> "Write an executive summary for a [business type] that [description]. Key metrics: [revenue target, market size, funding needed]. Keep it under 300 words. Make it compelling enough that an investor reads the rest."

### Problem & Solution
> "Describe the problem that [your product/service] solves. Use the format:
> 1. The status quo (how things work now)
> 2. Why it's painful (with specific examples)
> 3. Our solution (how we fix it)
> 4. Why now (why this moment is right)
>
> Context: [your business details]"

### Financial Projections
> "Create a 3-year revenue projection framework for a [business type] with these assumptions:
> - Starting price: [X]
> - Initial customer count: [X]
> - Monthly growth rate: [X%]
> - Key costs: [list]
>
> Format as a table with monthly breakdown for Year 1 and quarterly for Years 2-3.
> Include: Revenue, COGS, Gross Margin, Operating Expenses, Net Profit."

### Go-to-Market Strategy
> "Design a go-to-market strategy for [product]. Include:
> 1. Launch phases (pre-launch, launch, post-launch)
> 2. Customer acquisition channels ranked by expected ROI
> 3. Pricing strategy with justification
> 4. First 90 days tactical plan
> 5. Key metrics to track"

## Remember
- AI provides frameworks; you provide the unique insights
- Always validate financial assumptions against industry benchmarks
- A business plan is a living document — iterate continuously`,
          exercises: [
            { id: 'w4-u2-l3-e1', type: 'prompt-challenge', question: 'Draft the "Problem & Solution" section for a real or hypothetical business idea using the template above. Does it clearly articulate why the solution is needed?', hint: 'The best problem statements make the reader nod and think "yes, that IS annoying."', xpBonus: 20 },
            { id: 'w4-u2-l3-e2', type: 'free-response', question: 'If you were to start a business tomorrow, what would it be? Write a 3-sentence pitch.', hint: 'Think about problems you personally experience or skills you have that others need.', xpBonus: 10 }
          ]
        }
      ]
    }
  ]
};

wave4.totalXP = wave4.units.reduce((sum, unit) =>
  sum + unit.lessons.reduce((lSum, lesson) =>
    lSum + lesson.xp + lesson.exercises.reduce((eSum, ex) => eSum + ex.xpBonus, 0), 0), 0);
