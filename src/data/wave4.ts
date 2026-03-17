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
      id: 'w4-u1',
      waveId: 'wave-4',
      title: 'Customer & Admin Operations',
      description: 'Streamline repetitive business tasks with AI',
      order: 1,
      lessons: [
        {
          id: 'w4-u1-l1',
          waveId: 'wave-4',
          unitId: 'w4-u1',
          title: 'Customer Service Automation',
          description: 'Handle support tickets faster with AI-powered workflows.',
          duration: '12 min',
          difficulty: 'intermediate',
          xp: 25,
          order: 1,
          content: `# Customer Service Automation

AI can transform how you handle customer support. Companies using AI for customer service report 30-50% faster resolution times and significantly more consistent quality across agents.

## Triage & Classification

The first step in any support workflow is sorting. AI does this instantly:

> "Classify these customer support tickets into categories (billing, technical, feature request, complaint, general inquiry) and priority levels (urgent, high, medium, low):
>
> 1. 'My payment was charged twice yesterday!'
> 2. 'How do I export my data to CSV?'
> 3. 'It would be great if you added dark mode'
> 4. 'Your app has been down for 3 hours and I'm losing business'
> 5. 'What are your business hours?'"

Why this matters: Proper triage means urgent issues get handled first, and tickets go to the right team member automatically.

## Response Templates

Templates aren't lazy — they're consistent. AI creates them fast:

> "Create 5 customer service response templates for a [business type] covering:
> 1. Acknowledging a complaint (empathetic, take ownership)
> 2. Explaining a delay (honest, with timeline)
> 3. Offering a refund/credit (clear process, no hoops)
> 4. Answering a common FAQ (helpful, with next steps)
> 5. Following up after issue resolution (checking in, asking for feedback)
>
> Tone: empathetic, professional, human-sounding. Include [Customer Name] and [Specific Issue] placeholders. Each template should be under 100 words."

## The Empathy Translator

Sometimes agents write technically correct but emotionally tone-deaf responses. AI fixes this:

> "Rewrite this customer service response to be more empathetic. The customer is frustrated because [situation]. Keep the same information but make the customer feel heard and valued:
>
> Original: 'Your refund has been processed. It will take 5-7 business days. Is there anything else?'
>
> Make it warmer without being over-the-top or fake."

## Escalation Decision Framework

> "Given this customer message, determine if it should be:
> A) Handled with a template response
> B) Needs a personalized response from a support agent
> C) Needs immediate escalation to a manager
>
> Message: [paste message]
>
> Explain your reasoning and suggest a response for options A or B."

## Building a Knowledge Base

Turn your support history into a self-service resource:

> "Based on these 20 customer support tickets [paste tickets], identify:
> 1. The top 10 most common questions
> 2. The pattern behind each (is it a UX issue? documentation gap? bug?)
> 3. A clear FAQ answer for each that could be posted on our help center
> 4. Three product/process improvements that would prevent these tickets entirely"

That last item is gold — AI doesn't just answer questions, it finds the root cause.

## The Sentiment Dashboard

> "Analyze these 15 customer messages and categorize each by:
> - Sentiment (positive, neutral, negative, furious)
> - Topic
> - Whether it mentions a competitor
> - Whether the customer is at risk of churning
>
> Summarize overall trends and flag the 3 most urgent issues."

## Pro Tips

1. **Never let AI respond to customers directly** without human review (at least initially)
2. **Use AI to draft, humans to send** — the best workflow for quality + speed
3. **Track which templates get the best satisfaction scores** and have AI improve the others
4. **Feed positive reviews into your marketing** — ask AI to turn 5-star reviews into testimonial snippets`,
          exercises: [
            {
              id: 'w4-u1-l1-e1',
              type: 'prompt-challenge',
              question: 'Create a set of 5 customer service templates for a business you know. Test them by asking AI to fill in the placeholders with a fictional scenario. Are they human-sounding or robotic?',
              hint: 'The biggest trap is templates that sound like templates. Read them aloud — would you feel good receiving this response?',
              xpBonus: 20,
            },
            {
              id: 'w4-u1-l1-e2',
              type: 'quiz',
              question: 'When should a customer message be escalated to a manager?',
              options: [
                'Always, to be safe',
                'When the customer uses ALL CAPS',
                'When it involves legal threats, safety issues, or repeated unresolved contacts',
                'Never — AI can handle everything'
              ],
              correctAnswer: 2,
              xpBonus: 5,
            },
            {
              id: 'w4-u1-l1-e3',
              type: 'free-response',
              question: 'What is the most common customer complaint in your business (or a business you know)? How could AI help resolve it faster while maintaining a human touch?',
              hint: 'Think about the complaint lifecycle: how long does it take to respond today? What would cutting that time in half look like?',
              xpBonus: 10,
            },
            {
              id: 'w4-u1-l1-e4',
              type: 'fill-blank',
              question: 'Companies using AI for customer service report _______% faster resolution times.',
              correctAnswer: '30-50',
              xpBonus: 5,
            }
          ]
        },
        {
          id: 'w4-u1-l2',
          waveId: 'wave-4',
          unitId: 'w4-u1',
          title: 'Data Entry & Extraction',
          description: 'Pull structured data from unstructured text instantly.',
          duration: '12 min',
          difficulty: 'intermediate',
          xp: 25,
          order: 2,
          content: `# Data Entry & Extraction

One of AI's genuine superpowers: turning messy, unstructured text into clean, structured data. Tasks that used to take an intern all day now take 30 seconds.

## Extracting Data from Text

The basic pattern — tell AI what fields you want and what format to use:

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
> If you're unsure about an extraction, add a confidence note.
>
> Document: [paste text]"

## Invoice Processing

> "Extract line items from this invoice text and format as a table:
> | Item | Quantity | Unit Price | Total |
>
> Also extract: Invoice number, date, vendor name, subtotal, tax, and grand total.
> Double-check that line items add up to the subtotal. Flag any discrepancies.
>
> Invoice: [paste invoice text]"

The "double-check the math" instruction is critical — AI sometimes misreads numbers.

## Business Card / Contact Parsing

> "Parse these business card details into a contact database format:
> [paste business card text or multiple cards]
>
> Format: CSV with columns: First Name, Last Name, Title, Company, Email, Phone, Address, LinkedIn URL
>
> If a card has multiple phone numbers, use the mobile number for the Phone column and note others in a Notes column."

## The Batch Processing Pattern

For processing many items at once, always provide an example first:

> "Process each entry below. For each one, extract: name, date, amount, and category.
>
> Example:
> Input: 'Paid $450 to ABC Plumbing on March 15 for bathroom repair'
> Output: Name: ABC Plumbing | Date: March 15 | Amount: $450 | Category: Home Repair
>
> Now process these entries:
> 1. 'Bought $89 of office supplies at Staples on Tuesday'
> 2. 'Monthly Spotify subscription $14.99 charged Jan 1'
> 3. 'Dinner with client Sarah at Olive Garden $127.50 on 3/10'
> 4. 'Paid quarterly insurance premium $2,400 to State Farm'
> 5. 'Gas station fill-up $62.18 Shell on Highway 101'"

## Cleaning Messy Data

Real-world data is never clean. AI handles the mess:

> "This spreadsheet data has inconsistencies. Standardize it:
> - Names: First Last format, proper capitalization
> - Phone numbers: (XXX) XXX-XXXX format
> - Addresses: Full format with ZIP code
> - Dates: YYYY-MM-DD format
> - Remove duplicates (keep the most complete entry)
>
> Data: [paste messy data]"

## Transforming Between Formats

> "Convert this data from [format A] to [format B]:
> - JSON to CSV
> - Email thread to structured table
> - Meeting notes to Jira tickets
> - Resume text to database fields
>
> [paste data]"

## Tips for Accurate Extraction

1. **Always specify the output format** (JSON, CSV, table, etc.) — ambiguity kills accuracy
2. **Provide one example** for complex extractions — AI learns your expectations
3. **Ask AI to flag uncertain extractions** with a confidence indicator
4. **Always verify extracted numbers** — AI occasionally misreads or transposes digits
5. **For critical data, ask AI to double-check itself**: "Review your extraction above. Did you miss anything or make any errors?"
6. **Chunk large datasets** — Process 20-50 items at a time, not 500`,
          exercises: [
            {
              id: 'w4-u1-l2-e1',
              type: 'prompt-challenge',
              question: 'Find a real receipt, invoice, or email with data in it. Use AI to extract all data into a structured JSON format. Check every field against the original — how accurate was the extraction?',
              hint: 'Try a receipt with at least 5 line items. Check the math on totals — that\'s where AI most commonly makes mistakes.',
              xpBonus: 20,
            },
            {
              id: 'w4-u1-l2-e2',
              type: 'prompt-challenge',
              question: 'Create a batch processing prompt that converts 5 informal expense descriptions into a structured expense report table with columns: Date, Vendor, Amount, Category, Payment Method.',
              hint: 'Make up realistic entries like "coffee meeting with client $12 at Starbucks." Always provide one example for AI to follow.',
              xpBonus: 15,
            },
            {
              id: 'w4-u1-l2-e3',
              type: 'quiz',
              question: 'Why should you always provide an example when using the batch processing pattern?',
              options: [
                'AI can\'t process data without an example',
                'It\'s required by the AI terms of service',
                'The example sets expectations for format and level of detail, reducing errors',
                'It makes the response faster'
              ],
              correctAnswer: 2,
              xpBonus: 5,
            },
            {
              id: 'w4-u1-l2-e4',
              type: 'fill-blank',
              question: 'When extracting critical data, you should ask AI to _______ itself to catch missed items or errors.',
              correctAnswer: 'double-check',
              xpBonus: 5,
            }
          ]
        },
        {
          id: 'w4-u1-l3',
          waveId: 'wave-4',
          unitId: 'w4-u1',
          title: 'Scheduling & Planning',
          description: 'Let AI handle the complexity of scheduling and project planning.',
          duration: '10 min',
          difficulty: 'beginner',
          xp: 20,
          order: 3,
          content: `# Scheduling & Planning

Scheduling is one of those tasks that feels simple but is secretly complex — multiple constraints, time zones, preferences, and conflicts. AI handles this complexity effortlessly.

## Drafting Scheduling Emails

> "Write a scheduling email to [person] to set up a [meeting type].
> My availability: [list times]
> Meeting duration: [X minutes]
> Meeting format: [Zoom/in-person/phone]
> Include a Calendly-style format showing 3 options with dates and times.
> Tone: professional but not stiff."

## Meeting Agenda Creation

Bad meetings have no agenda. Good meetings have an AI-generated one:

> "Create a meeting agenda for a [duration] [meeting type] with [attendees/roles].
> Goals: [what should be decided/accomplished by the end]
>
> Format:
> - Topic (time allocation in minutes)
> - Discussion lead
> - Expected outcome (decision, update, brainstorm)
>
> Include a 5-minute buffer for overrun and end with clear next steps."

## Time Zone Coordination

This is where AI genuinely shines — a task that's tedious for humans but trivial for AI:

> "I need to schedule a meeting with people in:
> - New York (ET)
> - London (GMT/BST)
> - Tokyo (JST)
> - San Francisco (PT)
>
> Find 3 time slots that are during business hours (9am-5pm) for as many participants as possible. If no time works for all, suggest the best compromise and identify who would need to flex."

## Weekly Planning

Turn your chaotic to-do list into an organized schedule:

> "Here are my tasks for this week with estimated time:
> [list tasks with time estimates]
>
> My available hours: [schedule with existing commitments]
> My energy pattern: [when you're most/least productive]
> Priorities: [what absolutely must get done]
>
> Create an optimized daily schedule that:
> - Puts deep work during high-energy times
> - Groups similar tasks together
> - Leaves buffer time between meetings
> - Includes breaks
> - Has a realistic buffer for overrun (tasks always take longer than expected)"

## Project Timeline Generation

> "Create a project timeline for [project description].
> Deliverables: [list of deliverables]
> Team: [number of people and roles]
> Start date: [date]
> Hard deadline: [date]
>
> Break it into phases with:
> - Task name and description
> - Dependencies (what must be done before this)
> - Estimated duration
> - Who's responsible
> - Milestones/checkpoints
>
> Flag any risks: where are the bottlenecks? What happens if [X] takes longer?"

## Sprint Planning

For teams using agile methodology:

> "Help me plan a 2-week sprint. Here's our backlog:
> [list of tasks with story points or complexity]
>
> Team capacity: [X story points per sprint]
> Carry-over from last sprint: [incomplete items]
> External dependencies: [items waiting on other teams]
>
> Suggest which items to include in the sprint. Balance quick wins with important-but-hard items. Flag any items that seem underestimated."

## Pro Tips

1. **Always include buffer time** — ask AI to add 20% padding to estimates
2. **State your energy patterns** — AI can optimize for when you do your best work
3. **Include constraints explicitly** — "I can't do calls before 10am" or "Fridays are no-meeting days"
4. **Ask for a Plan B** — "What if task X takes twice as long? Show me the adjusted timeline"
5. **Review AI timelines with your team** — AI estimates are starting points, not commitments`,
          exercises: [
            {
              id: 'w4-u1-l3-e1',
              type: 'prompt-challenge',
              question: 'Use the weekly planning prompt with your actual tasks and schedule for this week. Does the AI-generated schedule feel realistic? What would you change?',
              hint: 'Be honest about your energy patterns and realistic about task durations. Most people are sharpest 9am-12pm.',
              xpBonus: 15,
            },
            {
              id: 'w4-u1-l3-e2',
              type: 'free-response',
              question: 'What scheduling or planning tasks consume the most of your time each week? Estimate how many minutes per week you spend on each. Which ones could AI handle?',
              hint: 'Think about: finding available times, writing scheduling emails, creating agendas, coordinating across time zones, planning sprints.',
              xpBonus: 10,
            },
            {
              id: 'w4-u1-l3-e3',
              type: 'quiz',
              question: 'What should you always add to AI-generated project timelines?',
              options: [
                'More team members',
                'Buffer time (about 20% padding)',
                'Longer meeting durations',
                'Daily status reports'
              ],
              correctAnswer: 1,
              xpBonus: 5,
            },
            {
              id: 'w4-u1-l3-e4',
              type: 'prompt-challenge',
              question: 'Create a meeting agenda for a real upcoming meeting using the template above. Share it with the other attendees before the meeting and ask for feedback.',
              hint: 'Include time allocations for each topic and expected outcomes. A good agenda keeps meetings focused and on time.',
              xpBonus: 15,
            }
          ]
        },
        {
          id: 'w4-u1-l4',
          waveId: 'wave-4',
          unitId: 'w4-u1',
          title: 'Meeting Notes & Action Items',
          description: 'Turn rambling meetings into actionable summaries.',
          duration: '10 min',
          difficulty: 'beginner',
          xp: 20,
          order: 4,
          content: `# Meeting Notes & Action Items

Meetings are a goldmine of information buried under hours of conversation. AI extracts the gold and discards the small talk.

## The Meeting Summary Prompt

\`\`\`
Here are my raw notes from a [type] meeting on [date]:
[paste notes]

Attendees: [list]

Create a professional meeting summary with:
1. Meeting overview (1-2 sentences — what was the meeting about?)
2. Key decisions made (numbered, with who decided)
3. Action items (who is doing what, by when)
4. Open questions/parking lot items (things that need follow-up)
5. Next meeting date and proposed agenda items
\`\`\`

## From Transcript to Action

If you have a full transcript (from Otter.ai, Teams, Zoom, Fireflies, etc.):

> "This is a transcript from a 45-minute product planning meeting. Extract:
> - The top 3 priorities that were agreed on (with who championed each)
> - Any disagreements or unresolved issues (and between whom)
> - ALL action items with assigned owners and deadlines
> - Any deadlines or dates mentioned
> - Risks or concerns raised
>
> Ignore small talk, pleasantries, and off-topic tangents.
> Format the output so it could be pasted directly into Slack or email."

## The Follow-Up Email Generator

After summarizing, automatically draft the follow-up:

> "Based on this meeting summary [paste summary], write a follow-up email to all attendees that:
> - Thanks everyone for their time (briefly)
> - Lists the key decisions (so everyone's aligned)
> - Lists action items with owners and deadlines (bold the owner names)
> - Mentions the next meeting date
> - Asks attendees to flag anything that's missing or incorrect
>
> Tone: clear and efficient. Under 200 words."

## Quick Daily Standup Format

> "Convert these standup notes into a clean format:
> [raw notes from each team member]
>
> Format per person:
> **[Name]**
> - Done yesterday: (bullet points)
> - Doing today: (bullet points)
> - Blockers: (bullet points or 'None')
>
> At the end, add a 'Team Summary' section: overall velocity, shared blockers, and items that need cross-team coordination."

## Extracting Commitments

People make commitments in meetings that they (and everyone else) forget:

> "Read this meeting transcript and identify every commitment made by every person. A commitment is any statement where someone says they will do something or promises a deliverable. Format:
>
> | Person | Commitment | Context | Deadline (if mentioned) |
>
> Include implicit commitments too (e.g., 'I'll look into that' counts)."

## Building a Meeting Knowledge Base

Over time, meeting summaries become institutional memory:

> "Here are summaries from the last 4 weekly team meetings [paste summaries]. Identify:
> 1. Recurring topics (what keeps coming up?)
> 2. Action items that were assigned but never completed
> 3. Decisions that were made and then revisited (scope creep alert)
> 4. Trends in team concerns or blockers
> 5. Suggestions for improving the meeting format"

## Tips for Better Meeting Documentation

1. **Record meetings** (with permission) and use AI transcription tools
2. **Take rough notes during the meeting**, polish with AI after — don't try to write perfect notes live
3. **Share the AI-cleaned version with attendees** for correction within 24 hours
4. **Build a template once, reuse it for every meeting** of that type
5. **Track action items in a separate system** (Asana, Notion, Jira) — meeting notes get buried
6. **Review past meeting summaries before the next meeting** — AI can prep you in 2 minutes`,
          exercises: [
            {
              id: 'w4-u1-l4-e1',
              type: 'prompt-challenge',
              question: 'Create realistic fake meeting notes (messy, with tangents and side conversations) and use the meeting summary prompt to clean them up. Does the AI correctly identify ALL the action items?',
              hint: 'Include at least 3 decisions, 4 action items (some implicit), and 1 unresolved question in your fake notes. Test if AI catches the implicit commitments.',
              xpBonus: 20,
            },
            {
              id: 'w4-u1-l4-e2',
              type: 'free-response',
              question: 'Design a meeting notes template specific to your team or work context. What sections would you always include? What information do your stakeholders need after every meeting?',
              hint: 'Think about who reads your meeting notes and what they need to do with the information. Different audiences need different sections.',
              xpBonus: 10,
            },
            {
              id: 'w4-u1-l4-e3',
              type: 'quiz',
              question: 'What is an "implicit commitment" in a meeting context?',
              options: [
                'A formal written promise',
                'A statement like "I\'ll look into that" where someone casually agrees to do something',
                'A commitment that was explicitly assigned by the manager',
                'A task that was already in the project plan'
              ],
              correctAnswer: 1,
              xpBonus: 5,
            },
            {
              id: 'w4-u1-l4-e4',
              type: 'matching',
              question: 'Which AI technique is best for finding action items that were never completed?',
              options: [
                'The Meeting Summary Prompt',
                'The Follow-Up Email Generator',
                'Building a Meeting Knowledge Base (reviewing multiple meeting summaries)',
                'Quick Daily Standup Format'
              ],
              correctAnswer: 2,
              xpBonus: 5,
            }
          ]
        }
      ]
    },
    {
      id: 'w4-u2',
      waveId: 'wave-4',
      title: 'Strategy & Growth',
      description: 'AI-powered business intelligence, research, and strategic planning',
      order: 2,
      lessons: [
        {
          id: 'w4-u2-l1',
          waveId: 'wave-4',
          unitId: 'w4-u2',
          title: 'Market Research with AI',
          description: 'Conduct rapid market research using AI as your analyst.',
          duration: '12 min',
          difficulty: 'intermediate',
          xp: 25,
          order: 1,
          content: `# Market Research with AI

Hiring a market research firm costs $10K-50K and takes weeks. AI can give you a solid 80% of that insight in an afternoon. It won't replace a dedicated research team, but it gives you the foundation to make informed decisions fast.

## Industry Overview Prompt

> "Provide a comprehensive overview of the [industry] market:
> 1. Market size and growth rate (note if these are estimates)
> 2. Key players and their approximate market share
> 3. Major trends shaping the industry in the next 2-3 years
> 4. Customer segments and their distinct needs
> 5. Regulatory landscape and upcoming changes
> 6. Technology disruptions on the horizon
> 7. Barriers to entry for new competitors
>
> Flag any data points you're uncertain about. Distinguish between well-established facts and your best estimates."

That last instruction is crucial — it forces AI to be honest about what it knows vs. what it's guessing.

## Customer Persona Development

> "Create 3 detailed customer personas for a [business type] that [description].
> For each persona include:
> - **Demographics**: Age range, income bracket, location type, job title
> - **Psychographics**: Values, interests, daily frustrations, aspirations
> - **Buying behavior**: How they discover products, decision factors, budget range, buying cycle length
> - **A day-in-the-life scenario**: Walk through their typical day and where your product fits
> - **Objections they'd have**: Top 3 reasons they'd say no
> - **What makes them buy**: The trigger event or pain point that pushes them to act
> - **Where they hang out**: Online communities, social platforms, publications they read"

## Trend Analysis

> "Analyze the top 5 trends in [industry] and for each:
> 1. What's driving this trend (underlying forces)
> 2. Who's capitalizing on it already (examples)
> 3. How a [small/medium/large] business could take advantage
> 4. Potential risks or downsides
> 5. Timeline: is this happening now, in 1 year, or in 5 years?
>
> Rank the trends by relevance to a [your business type]."

## Pricing Research

> "Help me determine pricing for [product/service].
> - My costs: [breakdown]
> - Target market: [who]
> - Competitors charge: [if known]
> - Value delivered: [specific outcomes for the customer]
>
> Suggest 3 pricing strategies:
> 1. Penetration pricing (enter the market low)
> 2. Value-based pricing (price based on customer value)
> 3. Premium pricing (position as the high-end option)
>
> For each, provide: price point, positioning statement, ideal customer, risks, and projected margins."

## Important Caveat

AI market research is a **starting point**, not the final answer. AI data may be outdated or imprecise. Always:
- Verify market size numbers from industry reports (IBISWorld, Statista, CB Insights)
- Check competitor info on their actual websites (AI data may be months or years old)
- Validate customer assumptions with real customers (5 conversations beat 50 AI personas)
- Use AI research to form hypotheses, then test them with real data

Think of AI as your junior analyst — fast and helpful, but needs supervision.`,
          exercises: [
            {
              id: 'w4-u2-l1-e1',
              type: 'prompt-challenge',
              question: 'Run the Industry Overview prompt for an industry you know well. Score each of the 7 sections: what did AI get right, what did it get wrong, and what did it miss entirely?',
              hint: 'Your domain knowledge lets you evaluate AI output quality. This is exactly the "force multiplier" concept from Wave 1.',
              xpBonus: 20,
            },
            {
              id: 'w4-u2-l1-e2',
              type: 'prompt-challenge',
              question: 'Create 3 customer personas for a business you\'re familiar with. Show them to someone who actually sells to those customers — would they recognize these people as real?',
              hint: 'The more specific the business context you provide, the more realistic the personas. Vague input gives you generic "Marketing Mary" personas.',
              xpBonus: 20,
            },
            {
              id: 'w4-u2-l1-e3',
              type: 'quiz',
              question: 'What should you ALWAYS do with AI-generated market research?',
              options: [
                'Publish it directly in your business plan',
                'Verify key data points with authoritative sources before making decisions',
                'Trust it completely — AI has access to all data',
                'Ignore it — AI market research is never accurate'
              ],
              correctAnswer: 1,
              xpBonus: 5,
            },
            {
              id: 'w4-u2-l1-e4',
              type: 'fill-blank',
              question: 'Think of AI as your junior _______ — fast and helpful, but needs supervision.',
              correctAnswer: 'analyst',
              xpBonus: 5,
            }
          ]
        },
        {
          id: 'w4-u2-l2',
          waveId: 'wave-4',
          unitId: 'w4-u2',
          title: 'Competitive Analysis',
          description: 'Systematically analyze your competition with AI frameworks.',
          duration: '12 min',
          difficulty: 'intermediate',
          xp: 25,
          order: 2,
          content: `# Competitive Analysis with AI

Understanding your competition isn't optional — it's how you find your edge. AI helps you do it systematically instead of relying on gut feelings.

## The Competitor Deep Dive

> "Analyze [Competitor Name] as a competitor to my business [your business description]:
>
> Based on publicly available information:
> 1. **Product/Service offering**: What do they sell and to whom?
> 2. **Pricing model**: How do they charge? (tiers, subscriptions, one-time, etc.)
> 3. **Strengths**: What are they genuinely best at?
> 4. **Weaknesses**: Where do customers complain? Where do they fall short?
> 5. **Messaging**: What's their core value proposition? What words do they use?
> 6. **Customer sentiment**: What do reviews (G2, Trustpilot, App Store) suggest?
> 7. **Growth signals**: Are they hiring? Raising money? Launching new products?
> 8. **Opportunities for me**: Where could I differentiate or serve their unhappy customers?"

## Feature Comparison Matrix

> "Create a feature comparison table for these products: [list products]
> Categories to compare:
> - [Feature category 1]
> - [Feature category 2]
> - [Feature category 3]
> - Pricing (starting price, enterprise price)
> - Target audience
> - Key differentiator
> - Biggest weakness
>
> Use checkmarks, X marks, and 'partial' for feature availability. Include a 'Bottom Line' row summarizing each in one sentence."

## SWOT Analysis (Enhanced)

> "Conduct a SWOT analysis for [business/product]:
>
> Context: [business description, current situation, recent changes]
>
> For each quadrant, provide at least 5 specific, actionable points (not generic statements like 'strong brand'):
> - **Strengths** (internal advantages you can leverage)
> - **Weaknesses** (internal disadvantages you need to address)
> - **Opportunities** (external factors you can capitalize on)
> - **Threats** (external risks you need to watch)
>
> Then provide:
> - 3 SO strategies (use Strengths to capture Opportunities)
> - 3 WT strategies (address Weaknesses before Threats materialize)
> - 1 'Early Warning' indicator for each Threat — what signal would tell you it's happening?"

The SWOT + strategy + early warning combination is dramatically more useful than a standalone SWOT grid.

## Positioning Map

> "Create a competitive positioning analysis for [your product] vs [competitor 1], [competitor 2], [competitor 3].
>
> Map each on two axes:
> - X-axis: [dimension 1, e.g., Price — low to high]
> - Y-axis: [dimension 2, e.g., Complexity — simple to enterprise]
>
> For each quadrant of the map, describe:
> - What type of customer lives there
> - Which competitors serve that quadrant
> - Whether there's an underserved gap
>
> Recommend where I should position and why."

## Competitive Response Planning

> "If [competitor] launches [specific initiative — e.g., drops prices 20%, launches a new feature, gets acquired], what should our response be?
>
> Consider:
> - Immediate actions (first 48 hours)
> - Short-term response (1-4 weeks)
> - Strategic adjustment (1-6 months)
> - How to communicate this to our customers
> - What NOT to do (common overreactions)"

## Win/Loss Analysis

> "I recently lost a deal to [competitor]. Here's what the customer told us: [feedback].
> Analyze:
> 1. What was the real reason we lost? (separate stated reason from likely reason)
> 2. Is this a pattern we should worry about or a one-off?
> 3. What would we need to change to win this type of deal next time?
> 4. Should we change our product, our positioning, or our sales approach?"

## Pro Tips

1. **Update your competitive analysis quarterly** — markets change fast
2. **Set up Google Alerts** for competitor names and feed them to AI for analysis
3. **Read competitor reviews** — their 1-star and 2-star reviews are your opportunity list
4. **Don't just copy competitors** — understand their strategy so you can counter it
5. **Remember AI's limitations** — it may not have the latest info; always verify`,
          exercises: [
            {
              id: 'w4-u2-l2-e1',
              type: 'prompt-challenge',
              question: 'Run the enhanced SWOT analysis (with strategies and early warnings) on a business you know well. Are the AI-generated strategies actually viable? Would you act on any of them?',
              hint: 'Provide detailed context about the business for better results. Generic input = generic SWOT. Include recent events, market changes, and team capabilities.',
              xpBonus: 20,
            },
            {
              id: 'w4-u2-l2-e2',
              type: 'prompt-challenge',
              question: 'Create a feature comparison matrix for 3 products/services in a space you know. Verify at least 5 data points against the actual company websites. How accurate was AI?',
              hint: 'This is a great exercise in verifying AI output. Competitor features change constantly — AI data may be outdated.',
              xpBonus: 15,
            },
            {
              id: 'w4-u2-l2-e3',
              type: 'quiz',
              question: 'What makes the enhanced SWOT analysis more useful than a standard SWOT?',
              options: [
                'It has more quadrants',
                'It includes strategies that connect strengths to opportunities AND early warning indicators for threats',
                'It focuses only on competitors',
                'It uses AI instead of human judgment'
              ],
              correctAnswer: 1,
              xpBonus: 5,
            },
            {
              id: 'w4-u2-l2-e4',
              type: 'free-response',
              question: 'Think about your biggest competitor. What are 2 things they do better than you, and 2 things you do better than them? How would you verify this with real customer data?',
              hint: 'Be honest about competitor strengths — you can\'t counter what you don\'t acknowledge. Consider running a customer survey or checking review sites.',
              xpBonus: 10,
            }
          ]
        },
        {
          id: 'w4-u2-l3',
          waveId: 'wave-4',
          unitId: 'w4-u2',
          title: 'Financial Planning & Analysis',
          description: 'Use AI for budgets, projections, and financial decision-making.',
          duration: '12 min',
          difficulty: 'intermediate',
          xp: 25,
          order: 3,
          content: `# Financial Planning & Analysis

AI won't replace your accountant, but it will help you think through financial decisions faster and more thoroughly. Use it for modeling, scenario planning, and understanding your numbers.

## Revenue Projection Framework

> "Create a 12-month revenue projection for a [business type] with these assumptions:
> - Starting monthly revenue: $[X]
> - Pricing: $[X] per [unit/subscription/project]
> - Current customers: [X]
> - Monthly growth rate assumption: [X%]
> - Churn rate: [X%]
> - Key costs: [list fixed and variable costs]
>
> Format as a monthly table with columns:
> Month | New Customers | Lost Customers | Total Customers | Revenue | Fixed Costs | Variable Costs | Net Profit
>
> Below the table, calculate:
> - Break-even point (which month)
> - Year-end annual revenue
> - Average monthly profit margin
> - Cash needed to reach profitability"

## Scenario Planning

This is where AI truly excels — running multiple "what if" scenarios:

> "Using the revenue model above, show me 3 scenarios:
>
> **Optimistic**: Growth rate is [X%], churn drops to [X%], we add a new product line at $[X]
> **Realistic**: Current assumptions hold steady
> **Pessimistic**: Growth slows to [X%], churn increases to [X%], we lose our biggest client ($[X]/month)
>
> For each scenario, show:
> - 12-month revenue trajectory
> - Cash position each month
> - Break-even timeline
> - One action we should take NOW to prepare"

## Pricing Decision Analysis

> "I'm considering changing my pricing from $[current] to $[new]. Help me think through this:
>
> Current state:
> - [X] customers at $[current] = $[revenue]/month
> - Customer acquisition cost: $[X]
> - Average customer lifetime: [X months]
>
> Model the impact if:
> - We lose 10% of customers due to the price increase
> - We lose 20% of customers
> - We lose 0% (best case)
>
> For each scenario: what's the break-even point? How long until the new pricing generates more total revenue than the old?"

## Expense Analysis

> "Here are my business expenses for the last 3 months: [paste or list]
>
> Analyze them and:
> 1. Categorize each expense (operations, marketing, payroll, software, etc.)
> 2. Calculate what percentage each category is of total spending
> 3. Identify any expenses that seem high relative to industry benchmarks
> 4. Flag any duplicate or redundant expenses (e.g., multiple software tools doing the same thing)
> 5. Suggest 3 areas where I could cut costs without impacting quality"

## Investment/Purchase Decisions

> "Help me evaluate whether to [buy/lease/hire/build]:
>
> Option A: [description, costs, benefits]
> Option B: [description, costs, benefits]
> Option C: do nothing (status quo)
>
> For each option, analyze:
> - Total cost over [timeframe]
> - ROI (return on investment) calculation
> - Payback period
> - Risk factors
> - Hidden costs I might not be thinking of
>
> Recommend the best option and explain why."

## Unit Economics

> "Calculate the unit economics for my [business type]:
> - Average revenue per customer: $[X]
> - Customer acquisition cost: $[X] (marketing spend / new customers)
> - Average customer lifetime: [X months]
> - Monthly cost to serve each customer: $[X]
>
> Calculate:
> - Customer Lifetime Value (CLV)
> - CLV:CAC ratio (healthy is 3:1 or better)
> - Monthly recurring revenue needed to cover fixed costs of $[X]
> - Number of customers needed to break even"

## Important Disclaimers

1. **AI projections are models, not predictions** — they're only as good as your assumptions
2. **Always validate assumptions** against real data and industry benchmarks
3. **Use AI for exploration, not final numbers** — your accountant/CFO should review anything important
4. **AI doesn't know your specific tax situation** — don't use it for tax planning
5. **Garbage in, garbage out** — wrong assumptions produce confidently wrong projections`,
          exercises: [
            {
              id: 'w4-u2-l3-e1',
              type: 'prompt-challenge',
              question: 'Run a 3-scenario analysis (optimistic, realistic, pessimistic) for your business or a business you know well. Does the pessimistic scenario reveal any risks you hadn\'t considered?',
              hint: 'The pessimistic scenario is the most valuable. It forces you to think about: what if growth stalls? What if my biggest client leaves? What if costs increase 30%?',
              xpBonus: 25,
            },
            {
              id: 'w4-u2-l3-e2',
              type: 'quiz',
              question: 'What is a healthy Customer Lifetime Value to Customer Acquisition Cost (CLV:CAC) ratio?',
              options: ['1:1', '2:1', '3:1 or better', '10:1 or better'],
              correctAnswer: 2,
              xpBonus: 5,
            },
            {
              id: 'w4-u2-l3-e3',
              type: 'free-response',
              question: 'What financial question about your business have you been avoiding because the analysis feels overwhelming? Write it down as a specific prompt you could give to AI.',
              hint: 'Common examples: "Can I afford to hire someone?", "Should I raise my prices?", "What\'s my break-even point?" Turn these into the structured prompts from this lesson.',
              xpBonus: 10,
            },
            {
              id: 'w4-u2-l3-e4',
              type: 'fill-blank',
              question: 'AI projections are _______, not predictions — they are only as good as your assumptions.',
              correctAnswer: 'models',
              xpBonus: 5,
            }
          ]
        },
        {
          id: 'w4-u2-l4',
          waveId: 'wave-4',
          unitId: 'w4-u2',
          title: 'Hiring & HR Operations',
          description: 'Streamline recruiting, onboarding, and people operations with AI.',
          duration: '12 min',
          difficulty: 'intermediate',
          xp: 25,
          order: 4,
          content: `# Hiring & HR Operations

Hiring is one of the most high-stakes activities in any business. A bad hire costs 30-150% of their annual salary. AI helps you be more systematic, consistent, and thorough throughout the process.

## Writing Job Descriptions

Most job descriptions are terrible — they're either wishlists or copy-pasted from competitors. AI helps you write ones that attract the right people:

> "Write a job description for a [role] at [company type].
>
> About us: [2-3 sentences about your company, culture, mission]
> Role purpose: [why this role exists — what problem does this person solve?]
> Must-have skills: [non-negotiable requirements — keep this list SHORT]
> Nice-to-have: [bonus skills that aren't dealbreakers]
> Compensation: [range]
> Work arrangement: [remote/hybrid/onsite]
>
> Write it in a way that:
> - Clearly communicates what success looks like in the first 90 days
> - Focuses on outcomes, not just activities
> - Avoids gendered language or unnecessary requirements (no 'rock star' or '10 years required' for a mid-level role)
> - Makes someone excited to apply, not intimidated
> - Includes 3 reasons why someone would WANT this job"

## Screening Resumes

> "I'm hiring for [role]. Here are the key requirements:
> - [Requirement 1]
> - [Requirement 2]
> - [Requirement 3]
>
> Review this resume and provide:
> 1. Match score (1-10) for each requirement
> 2. Overall fit assessment
> 3. Strengths that stand out
> 4. Potential concerns or gaps
> 5. 3 specific questions to ask in the interview based on this resume
>
> Resume: [paste resume text]"

**Important ethical note**: Use AI as a screening assistant, not a decision-maker. AI can have biases from training data. Always have humans make final hiring decisions.

## Interview Question Generation

> "Generate interview questions for a [role] position. Include:
>
> **Technical/Skills (5 questions)**:
> - Questions that test [specific skill] with real-world scenarios
>
> **Behavioral (5 questions)**:
> - STAR format questions about [relevant competencies: leadership, conflict resolution, problem-solving]
>
> **Culture Fit (3 questions)**:
> - Questions that reveal [your values: teamwork, ownership, creativity, etc.]
>
> **Red Flag Detectors (3 questions)**:
> - Questions designed to surface concerning patterns like: blame-shifting, inability to learn from mistakes, or dishonesty
>
> For each question, provide: what a great answer sounds like and what a red flag answer sounds like."

## Interview Debrief

> "Our interview panel just met with a candidate for [role]. Here are each interviewer's notes:
>
> Interviewer 1 ([role]): [notes]
> Interviewer 2 ([role]): [notes]
> Interviewer 3 ([role]): [notes]
>
> Synthesize these perspectives:
> 1. Where did all interviewers agree (positively or negatively)?
> 2. Where did interviewers disagree? What might explain the difference?
> 3. What gaps in our assessment should we address in a follow-up?
> 4. Overall recommendation: strong hire, hire, borderline, or pass?
> 5. If we hire, what should the 90-day onboarding focus on?"

## Onboarding Plan

> "Create a 30-60-90 day onboarding plan for a new [role] at [company type].
>
> Week 1: Orientation & Setup
> - Tools to set up: [list]
> - People to meet: [list key relationships]
> - Required reading/training: [list]
>
> Week 2-4: Guided Ramp
> - First real task assignments
> - Shadow sessions with [team members]
> - Weekly check-in structure
>
> Month 2: Independent Contribution
> - Expected deliverables
> - Key metrics to hit
> - Growing responsibility areas
>
> Month 3: Full Speed
> - Performance expectations
> - Growth opportunities
> - 90-day review criteria
>
> Include a checklist the manager can use to track progress."

## Performance Review Assistance

> "Help me write a performance review for [name], who holds the [role] position.
>
> Their accomplishments this quarter: [list]
> Areas where they need improvement: [list]
> Their goals from last review: [list with status]
>
> Write a review that is:
> - Specific (reference actual work and outcomes)
> - Balanced (acknowledge strengths before discussing growth areas)
> - Forward-looking (include 2-3 goals for next quarter)
> - Fair (focus on behaviors and outcomes, not personality)
>
> Use the SBI framework (Situation, Behavior, Impact) for both positive and constructive feedback."

## Pro Tips

1. **Standardize your process** — AI helps you create consistent interview and evaluation rubrics
2. **Watch for bias** — AI can perpetuate biases; review all hiring outputs critically
3. **Document everything** — AI can help you maintain compliant records of hiring decisions
4. **Use AI for the process, not the judgment** — it's a tool to be more organized, not a replacement for human evaluation
5. **Protect candidate privacy** — don't paste identifiable information into public AI tools; use enterprise versions`,
          exercises: [
            {
              id: 'w4-u2-l4-e1',
              type: 'prompt-challenge',
              question: 'Write a job description for a role you need to fill (or wish you could fill) using the template above. Then ask AI to critique it: "Review this job description. Is it inclusive? Does it focus on outcomes? Would a great candidate be excited to apply?"',
              hint: 'The self-critique step often catches gendered language, unrealistic requirements, or uninspiring descriptions.',
              xpBonus: 20,
            },
            {
              id: 'w4-u2-l4-e2',
              type: 'quiz',
              question: 'How much does a bad hire typically cost a company?',
              options: [
                '10% of their annual salary',
                '30-150% of their annual salary',
                'Just the recruiting fees',
                'One month of salary'
              ],
              correctAnswer: 1,
              xpBonus: 5,
            },
            {
              id: 'w4-u2-l4-e3',
              type: 'prompt-challenge',
              question: 'Generate interview questions for a role you hire for (or have been interviewed for). Do the "red flag detector" questions actually reveal useful information? Would you use them?',
              hint: 'The best red flag questions are open-ended and don\'t have an obvious "right" answer. They reveal how someone thinks, not what they memorized.',
              xpBonus: 15,
            },
            {
              id: 'w4-u2-l4-e4',
              type: 'matching',
              question: 'What does the SBI framework stand for in performance reviews?',
              options: [
                'Strengths, Behaviors, Improvements',
                'Situation, Behavior, Impact',
                'Standards, Benchmarks, Indicators',
                'Skills, Background, Intelligence'
              ],
              correctAnswer: 1,
              xpBonus: 5,
            }
          ]
        }
      ]
    }
  ]
};

// Calculate totalXP
wave4.totalXP = wave4.units.reduce((sum, unit) =>
  sum + unit.lessons.reduce((lSum, lesson) =>
    lSum + lesson.xp + lesson.exercises.reduce((eSum, ex) => eSum + ex.xpBonus, 0), 0), 0);
