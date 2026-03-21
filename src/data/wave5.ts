import { Wave } from './curriculum-types';

export const wave5: Wave = {
  id: 'wave-5',
  number: 5,
  title: 'Data & Analysis',
  subtitle: 'Turn Data Into Decisions',
  description: 'Use AI to summarize reports, analyze data, spot trends, and create insights from numbers. Master document analysis, spreadsheet wizardry, and data-driven decision making.',
  color: '#ec4899',
  icon: 'chart',
  weekRange: 'Week 5-6',
  totalXP: 0,
  units: [
    {
      id: 'w5-u1',
      waveId: 'wave-5',
      title: 'Document & Report Analysis',
      description: 'Extract insights from long documents, compare reports, and create executive briefs',
      order: 1,
      lessons: [
        {
          id: 'w5-u1-l1',
          waveId: 'wave-5',
          unitId: 'w5-u1',
          title: 'Summarizing Reports & Documents',
          description: 'Compress pages into actionable insights using layered summary techniques.',
          duration: '12 min',
          difficulty: 'intermediate',
          xp: 25,
          order: 1,
          content: `# Summarizing Reports & Documents

AI can read a 50-page report and give you the key points in 30 seconds. But a lazy "summarize this" prompt gives you a lazy summary. Here's how to get genuinely useful output.

## The Layered Summary Approach

The best analysts don't ask for one summary — they ask for multiple layers, each serving a different purpose.

### Layer 1: Executive Summary
> "Summarize this document in 3 sentences. Focus on: the main finding, the most important recommendation, and the key risk. Audience: a busy CEO who has 30 seconds."

This is your elevator pitch version. Use it for emails, Slack updates, or quick briefings.

### Layer 2: Structured Summary
> "Provide a structured summary of this document:
> 1. Key findings (bullet points)
> 2. Important data points and statistics
> 3. Recommendations made
> 4. Risks or concerns raised
> 5. Action items or next steps
> Keep to one page."

This is your working document. It captures enough detail to make decisions without reading the full report.

### Layer 3: Critical Analysis
> "Analyze this document critically:
> - What are the strongest arguments?
> - What's missing or underrepresented?
> - Are the conclusions supported by the data presented?
> - What questions should I ask the author?
> - What biases might be present?"

This is where AI really shines. It can spot logical gaps and missing perspectives that you might miss after reading 50 pages.

## Handling Long Documents

For documents that exceed the context window (roughly 75,000+ words for most models):

1. **Section-by-section**: Summarize each chapter or section separately, then paste all summaries and ask AI to synthesize them into a unified overview
2. **Question-driven**: Instead of "summarize this," ask specific questions: "What does this report say about customer retention?" or "What are the financial projections?"
3. **Extract and focus**: "Find all mentions of [specific topic] and summarize only those sections"
4. **Table of contents first**: Paste the table of contents and ask which sections are most relevant to your question, then read only those

## Real-World Application

Imagine you receive a 40-page industry report. Here's the workflow:

1. Paste it to AI with the Layer 1 prompt — get the 3-sentence version in 10 seconds
2. If it's relevant, run the Layer 2 prompt — get the structured breakdown in 30 seconds
3. For important reports, run Layer 3 — get the critical analysis in 60 seconds
4. Total time: under 2 minutes instead of 2 hours

## Pro Tips

- **Set the audience**: "Summarize for a technical audience" produces very different output than "summarize for a non-technical stakeholder"
- **Specify format**: "Use bullet points" vs "Use a narrative paragraph" vs "Use a table"
- **Ask for what's missing**: The most valuable prompt is often "What does this report NOT address that it should?"
- **Compare versions**: If you get a summary that feels thin, ask "What important details did you leave out of this summary?"`,
          exercises: [
            {
              id: 'w5-u1-l1-e1',
              type: 'prompt-challenge',
              question: 'Find a long article or report (at least 2000 words) and use all 3 summary layers. Does the Layer 3 critical analysis reveal anything you didn\'t catch reading it yourself?',
              hint: 'Try a government report, industry whitepaper, or long news analysis. The critical analysis layer often catches gaps in reasoning that readers gloss over.',
              xpBonus: 20,
            },
            {
              id: 'w5-u1-l1-e2',
              type: 'quiz',
              question: 'Why is the "layered summary" approach better than just asking for a summary?',
              options: [
                'It uses fewer tokens',
                'Different audiences need different levels of detail',
                'AI can only summarize short documents',
                'It makes the AI run faster'
              ],
              correctAnswer: 1,
              xpBonus: 5,
            },
            {
              id: 'w5-u1-l1-e3',
              type: 'free-response',
              question: 'Describe a real document or report you deal with regularly at work. Which summary layer would be most useful for it, and who would you share it with?',
              hint: 'Think about weekly reports, client proposals, research papers, or policy documents. Consider who needs what level of detail.',
              xpBonus: 10,
            },
            {
              id: 'w5-u1-l1-e4',
              type: 'quiz',
              question: 'When a document exceeds the AI\'s context window, what is the BEST approach?',
              options: [
                'Give up and read it manually',
                'Just paste the first half',
                'Summarize sections separately, then synthesize the summaries',
                'Ask AI to use its internet connection to read it'
              ],
              correctAnswer: 2,
              xpBonus: 5,
            }
          ]
        },
        {
          id: 'w5-u1-l2',
          waveId: 'wave-5',
          unitId: 'w5-u1',
          title: 'Extracting Data from PDFs & Reports',
          description: 'Pull structured data out of unstructured documents.',
          duration: '12 min',
          difficulty: 'intermediate',
          xp: 25,
          order: 2,
          content: `# Extracting Data from PDFs & Reports

One of AI's superpowers is turning messy, unstructured documents into clean, usable data. Invoices, contracts, research papers, financial reports — AI can pull the numbers and facts you need.

## The Data Extraction Framework

### Step 1: Define What You Need
Before pasting a document, tell AI exactly what to extract:

> "From the following document, extract:
> - All dollar amounts and what they refer to
> - All dates and deadlines
> - All names and their roles/titles
> - Any percentage figures and their context
>
> Format the output as a table with columns: Data Point, Value, Context, Page/Section."

### Step 2: Paste and Extract
Upload the PDF (if the AI supports file uploads) or paste the text content. AI will scan the entire document and pull out the structured data.

### Step 3: Verify Critical Data
AI extraction is usually 95%+ accurate, but the 5% matters. Always verify:
- Dollar amounts (especially totals — check the math)
- Dates (AI sometimes confuses MM/DD and DD/MM formats)
- Names and titles (especially if multiple people are mentioned)

## Common Extraction Patterns

### Invoices and Receipts
> "Extract all line items from this invoice into a table with columns: Item, Quantity, Unit Price, Total. Also extract: invoice number, date, vendor name, total amount, tax amount, and payment terms."

### Contracts and Legal Documents
> "From this contract, extract:
> - Parties involved and their roles
> - Key dates (start, end, renewal, notice periods)
> - Financial terms (amounts, payment schedule, penalties)
> - Obligations for each party (what must each side do?)
> - Termination conditions
> - Any non-standard clauses that differ from a typical [contract type]"

### Research Papers
> "From this research paper, extract:
> - Research question / hypothesis
> - Methodology (study type, sample size, duration)
> - Key findings (with specific numbers)
> - Limitations acknowledged by the authors
> - Practical implications"

### Meeting Minutes
> "From these meeting notes, extract:
> - Attendees
> - Decisions made (with who decided)
> - Action items (with owner and deadline)
> - Open questions or unresolved issues
> - Next meeting date and agenda items"

## Batch Processing

If you have multiple similar documents (e.g., 10 invoices), establish the pattern once:

> "I'm going to paste several invoices one at a time. For each one, extract: vendor name, invoice date, total amount, and line items. Format as a table row I can paste into a spreadsheet."

Then paste each document and get consistent, structured output.

## Tips for Better Extraction
- **Be explicit about format**: "Output as CSV" or "Output as a markdown table" or "Output as JSON"
- **Handle ambiguity**: "If a value is unclear or could be interpreted multiple ways, flag it with [VERIFY]"
- **Set context**: "This is a commercial lease agreement for a retail space" helps AI understand domain-specific terms
- **Ask for confidence**: "Rate your confidence (high/medium/low) for each extracted value"`,
          exercises: [
            {
              id: 'w5-u1-l2-e1',
              type: 'prompt-challenge',
              question: 'Find a real invoice, receipt, or contract (or create a realistic one). Use the extraction framework to pull structured data. Verify the accuracy of at least 5 extracted data points.',
              hint: 'Start with a receipt from a recent purchase. Check every dollar amount and date against the original.',
              xpBonus: 20,
            },
            {
              id: 'w5-u1-l2-e2',
              type: 'quiz',
              question: 'When extracting data from documents with AI, why should you verify dates specifically?',
              options: [
                'AI cannot read dates',
                'AI sometimes confuses MM/DD and DD/MM formats',
                'Dates are always wrong in AI extractions',
                'AI adds random dates that aren\'t in the document'
              ],
              correctAnswer: 1,
              xpBonus: 5,
            },
            {
              id: 'w5-u1-l2-e3',
              type: 'free-response',
              question: 'What types of documents do you regularly need to extract data from at work? Write a custom extraction prompt for one of them, specifying exactly what fields to pull and what format to output.',
              hint: 'Think about invoices, timesheets, reports, emails, or forms. The more specific your extraction template, the more consistent your results will be.',
              xpBonus: 15,
            }
          ]
        },
        {
          id: 'w5-u1-l3',
          waveId: 'wave-5',
          unitId: 'w5-u1',
          title: 'Comparing Documents & Sources',
          description: 'Use AI to find differences, contradictions, and gaps across multiple documents.',
          duration: '10 min',
          difficulty: 'intermediate',
          xp: 20,
          order: 3,
          content: `# Comparing Documents & Sources

One document is information. Two documents are intelligence. AI excels at comparing texts to find agreements, contradictions, and gaps.

## Side-by-Side Comparison

### The Basic Compare Prompt
> "Compare these two documents on [topic]:
> - Where do they agree?
> - Where do they disagree or contradict each other?
> - What does Document A cover that Document B doesn't?
> - What does Document B cover that Document A doesn't?
> - Which is more thorough/credible?
>
> Document A: [paste]
> Document B: [paste]"

### Version Comparison
When comparing drafts or revisions:
> "Compare Version 1 and Version 2 of this document:
> - What was added in V2?
> - What was removed from V1?
> - What was changed (show before and after)?
> - Are there any changes that alter the meaning significantly?
> - Rate the overall improvement: better, worse, or lateral move?
>
> Version 1: [paste]
> Version 2: [paste]"

## Multi-Source Analysis

### Triangulating Information
> "I have information about [topic] from three different sources. Compare them and:
> 1. Identify claims all three agree on (likely reliable)
> 2. Identify claims only one source makes (needs verification)
> 3. Identify contradictions between sources
> 4. Assess overall: which source is most credible and why?
>
> Source 1 (Name/Type): [paste]
> Source 2 (Name/Type): [paste]
> Source 3 (Name/Type): [paste]"

### Competitor Analysis
> "Compare these two competitor products/services:
> - Feature comparison (table format)
> - Pricing differences
> - Target audience differences
> - Unique selling points of each
> - Weaknesses of each
> - Overall recommendation for [your specific use case]"

## Due Diligence Applications

### Proposal Comparison
> "I received proposals from three vendors. Compare them on:
> 1. Scope of work (what's included/excluded)
> 2. Pricing (total cost, payment terms, hidden costs)
> 3. Timeline (start date, milestones, completion)
> 4. Team/qualifications
> 5. Risk (what could go wrong with each?)
> 6. Value for money ranking
>
> Format as a comparison table, then give your recommendation."

### Contract Review
> "Compare this contract to a standard [contract type]. Flag:
> - Clauses that are missing
> - Terms that are unusually favorable to one party
> - Ambiguous language that could cause disputes
> - Anything I should negotiate before signing"

## Tips for Better Comparisons
- **Label your documents clearly** — "Q1 Report" vs "Q2 Report" or "Vendor A Proposal" vs "Vendor B Proposal"
- **Specify what matters** — "Focus the comparison on cost and timeline" if those are your decision criteria
- **Ask for a recommendation** — Don't just compare; ask AI to recommend based on your priorities
- **Check for missing context** — "What information would you need to make a better comparison?"`,
          exercises: [
            {
              id: 'w5-u1-l3-e1',
              type: 'prompt-challenge',
              question: 'Find two articles or reports on the same topic from different sources. Use the triangulation prompt to compare them. What contradictions or gaps does AI find?',
              hint: 'News articles work great for this — find two outlets covering the same story and compare their coverage, emphasis, and conclusions.',
              xpBonus: 20,
            },
            {
              id: 'w5-u1-l3-e2',
              type: 'quiz',
              question: 'When comparing three sources, a claim made by only one source should be:',
              options: [
                'Automatically trusted since it\'s unique insight',
                'Flagged for verification since other sources don\'t confirm it',
                'Ignored completely',
                'Given the most weight since it\'s original'
              ],
              correctAnswer: 1,
              xpBonus: 5,
            },
            {
              id: 'w5-u1-l3-e3',
              type: 'free-response',
              question: 'Describe a situation at work where comparing documents would save you time or improve a decision. What documents would you compare, and what would you look for?',
              hint: 'Think about vendor proposals, contract versions, policy updates, competitor analysis, or quarterly reports.',
              xpBonus: 10,
            }
          ]
        },
        {
          id: 'w5-u1-l4',
          waveId: 'wave-5',
          unitId: 'w5-u1',
          title: 'Creating Executive Briefs',
          description: 'Transform raw information into polished briefing documents.',
          duration: '10 min',
          difficulty: 'intermediate',
          xp: 25,
          order: 4,
          content: `# Creating Executive Briefs

An executive brief is a short, decision-focused document that distills complex information for busy stakeholders. AI can turn your raw notes and data into polished briefs in minutes.

## The Executive Brief Structure

Every good brief follows this pattern:

1. **Bottom Line Up Front (BLUF)** — The key message in 1-2 sentences
2. **Background** — Just enough context (2-3 sentences)
3. **Key Findings** — 3-5 bullet points with supporting data
4. **Options/Recommendations** — What should we do?
5. **Risks** — What could go wrong?
6. **Next Steps** — Specific actions with owners and deadlines

## The Brief-Writing Prompt

> "Create an executive brief from the following raw information:
> [paste notes, data, meeting minutes, research]
>
> Brief parameters:
> - Audience: [who will read this — CEO, board, client, team]
> - Decision needed: [what decision does this brief support?]
> - Length: [one page / two pages / 500 words]
> - Tone: [formal / conversational / urgent]
> - Format: Use BLUF structure (bottom line up front)
>
> Include specific numbers and data points. No fluff."

## Tailoring for Different Audiences

### For the CEO
> "Write this brief assuming the reader has 60 seconds. Lead with the recommendation. Use one number to support it. End with what you need from them."

### For Technical Stakeholders
> "Include methodology details, data sources, and confidence intervals. Use precise technical language."

### For External Clients
> "Professional and polished. Focus on outcomes and value. Avoid internal jargon. Include clear next steps with timelines."

### For the Board
> "Focus on strategic impact, financial implications, and competitive positioning. Include year-over-year comparisons."

## Turning Meeting Notes into Briefs

This is one of the highest-value AI workflows:

> "Here are my rough notes from a strategy meeting:
> [paste messy notes]
>
> Transform these into a clean executive brief with:
> 1. Meeting summary (2 sentences)
> 2. Decisions made
> 3. Key discussion points (organized by theme)
> 4. Action items (table: action, owner, deadline)
> 5. Open issues requiring follow-up"

## Iterating on Briefs

After the first draft, refine with:
- "Make it shorter — cut 30% without losing key points"
- "The audience pushes back on recommendations. Add a stronger data-backed argument for option B"
- "Add a risk section — what happens if we do nothing?"
- "Convert the recommendations into a decision matrix with pros/cons for each option"

## Brief Quality Checklist

Ask AI to evaluate its own brief:
> "Review this brief against these criteria:
> 1. Can I understand the recommendation in under 10 seconds?
> 2. Is every claim backed by data?
> 3. Are the next steps specific and actionable?
> 4. Would a skeptical reader find this convincing?
> 5. Is there anything that could be cut without losing value?"`,
          exercises: [
            {
              id: 'w5-u1-l4-e1',
              type: 'prompt-challenge',
              question: 'Take some raw notes (from a meeting, a research session, or even a brainstorm) and use the brief-writing prompt to create an executive brief. Then use the quality checklist prompt to evaluate it. What score does it get?',
              hint: 'The BLUF (Bottom Line Up Front) is the hardest part. If you can\'t state the key message in 1-2 sentences, the brief needs more focus.',
              xpBonus: 20,
            },
            {
              id: 'w5-u1-l4-e2',
              type: 'quiz',
              question: 'What does BLUF stand for in executive communication?',
              options: [
                'Basic Layout for Unified Formatting',
                'Bottom Line Up Front',
                'Brief Layout for Upper Functions',
                'Business Logic and Unified Framework'
              ],
              correctAnswer: 1,
              xpBonus: 5,
            },
            {
              id: 'w5-u1-l4-e3',
              type: 'matching',
              question: 'Which audience should receive a brief focused on "strategic impact, financial implications, and competitive positioning"?',
              options: ['The engineering team', 'The board of directors', 'A new intern', 'The social media manager'],
              correctAnswer: 1,
              xpBonus: 5,
            }
          ]
        }
      ]
    },
    {
      id: 'w5-u2',
      waveId: 'wave-5',
      title: 'Data-Driven Decisions',
      description: 'Analyze spreadsheets, spot trends, create dashboards, and visualize data with AI',
      order: 2,
      lessons: [
        {
          id: 'w5-u2-l1',
          waveId: 'wave-5',
          unitId: 'w5-u2',
          title: 'Spreadsheet Analysis with AI',
          description: 'Turn raw data into insights without being an Excel wizard.',
          duration: '12 min',
          difficulty: 'intermediate',
          xp: 25,
          order: 1,
          content: `# Spreadsheet Analysis with AI

You don't need to be an Excel guru. AI can analyze your data, write formulas, and explain what the numbers mean — all from a conversation.

## Getting Data Into AI

You can paste tabular data directly into AI in several formats:
- **CSV** (comma-separated values) — works everywhere
- **Markdown tables** — clean and readable
- **Tab-separated text** — copy directly from Excel or Google Sheets
- **Describe the data** — "I have a spreadsheet with columns: Date, Product, Units Sold, Revenue, Region"

For large datasets, paste a sample (20-50 rows) and describe the full dataset's size and scope.

## The Data Analysis Workflow

### Step 1: Describe and Explore
> "Here's my sales data for the last 12 months:
> [paste data]
>
> First, describe what you see in this data. What are the columns, how many rows, what's the date range, and are there any obvious data quality issues?"

### Step 2: Ask for Insights
> "Now analyze this data and tell me:
> 1. Overall trend (growing, declining, flat) with the growth rate
> 2. Best and worst performing months (and possible reasons)
> 3. Seasonal patterns or cyclical behavior
> 4. Average monthly revenue and standard deviation
> 5. The single most important insight a business owner should know"

### Step 3: Get Specific
> "Dig deeper into [the insight you found most interesting]:
> - Is this statistically significant or just noise?
> - What additional data would help confirm this pattern?
> - What action should I take based on this?"

## Formula Generation

AI is exceptional at writing spreadsheet formulas:

> "I have a Google Sheet with these columns: A=Date, B=Product Name, C=Quantity, D=Unit Price, E=Total, F=Region, G=Sales Rep
>
> Write formulas for:
> 1. Total revenue by region (SUMIFS)
> 2. Average order value per sales rep
> 3. Month-over-month growth percentage
> 4. Running total of revenue
> 5. Rank each sales rep by total revenue
>
> For each formula, explain what it does in plain English and which cell to put it in."

## Anomaly Detection

> "Review this data and identify any anomalies:
> [paste data]
>
> For each anomaly explain:
> - Why it stands out (statistically)
> - Whether it's a one-time outlier or the start of a trend
> - Possible causes
> - Whether to investigate further or ignore it"

## Data Cleaning Assistance

> "This data has quality issues. Identify and suggest fixes for:
> - Missing values (how many, which rows)
> - Inconsistent formatting (e.g., dates in different formats)
> - Duplicate entries
> - Outliers that might be data entry errors
> - Any logical inconsistencies (e.g., negative quantities)
>
> [paste messy data]"

## Important Caveat
Always double-check AI's math on critical calculations. AI occasionally makes arithmetic errors, especially with complex multi-step calculations. For board-level or financial reporting, verify every number.`,
          exercises: [
            {
              id: 'w5-u2-l1-e1',
              type: 'prompt-challenge',
              question: 'Create a small dataset (15-20 rows of sales data with columns: Date, Product, Units, Revenue, Region). Include one obvious outlier and one seasonal pattern. Paste it to AI and ask for a full analysis. Does AI catch both patterns?',
              hint: 'Make December revenue 3x normal for the seasonal pattern, and include one month with a negative value or zero as the outlier.',
              xpBonus: 20,
            },
            {
              id: 'w5-u2-l1-e2',
              type: 'prompt-challenge',
              question: 'Ask AI to generate 5 useful Excel/Google Sheets formulas for a spreadsheet you work with regularly. Test at least one formula in a real spreadsheet and confirm it works.',
              hint: 'Describe your columns in detail. AI excels at VLOOKUP, SUMIFS, INDEX/MATCH, and conditional formatting formulas.',
              xpBonus: 15,
            },
            {
              id: 'w5-u2-l1-e3',
              type: 'quiz',
              question: 'When analyzing a large dataset (10,000+ rows) with AI, what is the best approach?',
              options: [
                'Paste all 10,000 rows into the chat',
                'Paste a representative sample of 20-50 rows and describe the full dataset',
                'Only describe the data without showing any rows',
                'Convert it to a different format first'
              ],
              correctAnswer: 1,
              xpBonus: 5,
            }
          ]
        },
        {
          id: 'w5-u2-l2',
          waveId: 'wave-5',
          unitId: 'w5-u2',
          title: 'Trend Spotting & Forecasting',
          description: 'Identify patterns in your data and make data-informed predictions.',
          duration: '12 min',
          difficulty: 'intermediate',
          xp: 25,
          order: 2,
          content: `# Trend Spotting & Forecasting

AI helps you see the forest, not just the trees. It can identify trends that take humans hours to spot and project them forward.

## Trend Analysis Fundamentals

### The Comprehensive Trend Prompt
> "Analyze these monthly metrics and identify trends:
> [paste data]
>
> For each metric:
> 1. Direction (improving, declining, stable, volatile)
> 2. Rate of change (is it accelerating or decelerating?)
> 3. Inflection points (when did the trend change direction?)
> 4. Correlation with other metrics (do any move together?)
> 5. Projection for the next 3-6 months with confidence level"

### Seasonal Pattern Detection
> "Look at this 24-month data set:
> [paste data]
>
> Identify any seasonal patterns:
> - Which months consistently over/underperform?
> - Is there a yearly cycle?
> - How strong is the seasonal effect vs the overall trend?
> - What should I plan for given these patterns?"

## Forecasting with AI

### Simple Projection
> "Based on this 12-month revenue history:
> [paste data]
>
> Provide three forecasts for the next 6 months:
> 1. Conservative (assuming the worst-performing quarter repeats)
> 2. Most likely (based on the average trend)
> 3. Optimistic (assuming the best-performing quarter repeats)
>
> Show the numbers and explain your methodology for each."

### Scenario Modeling
> "Given this historical data:
> [paste data]
>
> Model these scenarios:
> - Scenario A: We increase marketing spend by 20%
> - Scenario B: A competitor enters our market and we lose 15% market share
> - Scenario C: We raise prices by 10%
>
> For each scenario, project revenue, costs, and profit for the next 4 quarters. State your assumptions clearly."

## Leading vs Lagging Indicators

> "For a [business type], help me identify:
>
> **Leading indicators** (predict future performance):
> - What early signals suggest revenue will go up or down?
>
> **Lagging indicators** (confirm what already happened):
> - What metrics tell me how we've been performing?
>
> For each indicator, explain: what it measures, how to track it, and what a change in this metric means for the business."

## Correlation Analysis

> "I'm tracking these metrics monthly:
> [paste data with multiple columns]
>
> Analyze the relationships between these metrics:
> 1. Which metrics are positively correlated (move together)?
> 2. Which are negatively correlated (move opposite)?
> 3. Which appear unrelated?
> 4. Are there any lagged correlations (X goes up, and Y follows 1-2 months later)?
>
> Warning: flag any correlations that might be coincidental rather than causal."

## The Forecasting Caveat

AI forecasting is based on pattern recognition from historical data. It cannot predict:
- Black swan events (pandemic, market crash)
- Competitor actions you don't know about
- Regulatory changes
- Viral moments or PR crises

Always present AI forecasts as **scenarios**, not predictions. The value is in exploring possibilities, not in having a crystal ball.`,
          exercises: [
            {
              id: 'w5-u2-l2-e1',
              type: 'prompt-challenge',
              question: 'Create 24 months of fake monthly revenue data with a clear upward trend and seasonal dips in January and July. Ask AI to identify the trend and seasonal pattern. Does it catch both?',
              hint: 'Start at $50K/month, grow 3% monthly, but drop 25% in January and 15% in July each year. See if AI identifies the growth rate and both seasonal dips.',
              xpBonus: 20,
            },
            {
              id: 'w5-u2-l2-e2',
              type: 'quiz',
              question: 'What is a "leading indicator" in business analytics?',
              options: [
                'A metric that confirms past performance',
                'A metric that predicts future performance',
                'The most important KPI in a dashboard',
                'The first metric you see on a report'
              ],
              correctAnswer: 1,
              xpBonus: 5,
            },
            {
              id: 'w5-u2-l2-e3',
              type: 'free-response',
              question: 'Think about your business or department. What are 2 leading indicators and 2 lagging indicators you should be tracking? Why?',
              hint: 'Leading: website traffic, pipeline deals, customer inquiries. Lagging: revenue, churn rate, profit margin. Leading indicators give you time to act.',
              xpBonus: 10,
            },
            {
              id: 'w5-u2-l2-e4',
              type: 'quiz',
              question: 'Why should AI forecasts be presented as "scenarios" rather than "predictions"?',
              options: [
                'Because AI math is always wrong',
                'Because AI cannot predict black swan events, competitor actions, or external disruptions',
                'Because scenarios sound more professional',
                'Because predictions require a paid AI subscription'
              ],
              correctAnswer: 1,
              xpBonus: 5,
            }
          ]
        },
        {
          id: 'w5-u2-l3',
          waveId: 'wave-5',
          unitId: 'w5-u2',
          title: 'Creating Dashboards & Reports',
          description: 'Design KPI dashboards and automated reporting workflows.',
          duration: '10 min',
          difficulty: 'intermediate',
          xp: 25,
          order: 3,
          content: `# Creating Dashboards & Reports with AI

A good dashboard turns data into decisions. AI can design your dashboards, choose the right metrics, and even generate the reports that go with them.

## KPI Selection

Before building a dashboard, you need the right metrics. Most businesses track too many things and the important signals get lost.

### The KPI Design Prompt
> "I run a [business type] with [X employees/revenue/customers]. We're currently focused on [key goal: growth / profitability / customer retention / etc.].
>
> Suggest the top 8-10 KPIs I should track, organized by:
> - **Financial** (2-3 KPIs): revenue, profitability, cash flow
> - **Customer** (2-3 KPIs): satisfaction, retention, acquisition
> - **Operational** (2-3 KPIs): efficiency, quality, speed
> - **Growth** (1-2 KPIs): expansion, market share
>
> For each KPI, provide:
> 1. Definition (what exactly does this measure?)
> 2. Formula (how to calculate it)
> 3. Target benchmark for my industry
> 4. Measurement frequency (daily/weekly/monthly)
> 5. Red/yellow/green thresholds"

## Dashboard Layout Design

> "Design a one-page executive dashboard layout for a [business type].
>
> Include:
> - Which metrics go in the top row (most critical, largest)
> - Which metrics go in supporting positions
> - Recommended chart type for each metric
> - Color scheme for status indicators
> - What time period each metric should show (rolling 7 days, MTD, QoQ)
>
> The audience is [who will look at this daily/weekly]."

## Automated Report Generation

This is one of the highest-ROI AI workflows. Instead of spending hours writing a weekly report, create a template and let AI fill it in.

### Weekly Report Template
> "Here's this week's raw data:
> [paste metrics]
>
> Generate a weekly report with these sections:
> 1. **Executive Summary** (3 bullet points: biggest win, biggest concern, key number)
> 2. **Metrics Update** (table with this week, last week, change %, status)
> 3. **Highlights** (what went well and why)
> 4. **Areas of Concern** (what needs attention, with context)
> 5. **Action Items** (specific next steps with owners)
> 6. **Outlook** (what to expect next week)
>
> Tone: professional but direct. No fluff. Under 500 words."

### Monthly Business Review
> "Generate a monthly business review from this data:
> [paste monthly metrics, plus 2-3 months of history for comparison]
>
> Include:
> 1. Month-over-month performance summary
> 2. Goal progress (vs targets set at beginning of quarter)
> 3. Trend analysis (are we accelerating or decelerating?)
> 4. Customer/market insights
> 5. Resource utilization
> 6. Risks and mitigation
> 7. Priorities for next month"

## Building a Reporting Cadence

| Frequency | Report Type | Audience | Time to Create with AI |
|-----------|-------------|----------|----------------------|
| Daily | Quick metrics snapshot | Team leads | 2 minutes |
| Weekly | Performance summary | Management | 10 minutes |
| Monthly | Business review | Leadership | 30 minutes |
| Quarterly | Strategic review | Board/Investors | 1-2 hours |

The key is consistency. Create your templates once, then paste fresh data each period. AI handles the analysis and narrative — you handle the judgment calls and decisions.

## Tips
- **Save your prompts**: Keep your reporting prompts in a document so they're consistent week to week
- **Include context**: "This week we launched a new product" helps AI explain anomalies
- **Ask for year-over-year**: Monthly comparisons miss seasonal effects; always include YoY where possible
- **Iterate the template**: After a few weeks, refine what sections your audience actually reads`,
          exercises: [
            {
              id: 'w5-u2-l3-e1',
              type: 'prompt-challenge',
              question: 'Use the KPI Design prompt for your business or a business you know well. Are the suggested KPIs actually the right ones? Remove any that don\'t matter and add any that are missing.',
              hint: 'Be specific about your business stage, industry, and current goals. A startup tracking "market share" is probably tracking the wrong thing.',
              xpBonus: 20,
            },
            {
              id: 'w5-u2-l3-e2',
              type: 'prompt-challenge',
              question: 'Create a sample weekly report using the template prompt with realistic (made-up) data. Could you send this to your boss as-is? What would you change?',
              hint: 'The executive summary and action items are the highest-value sections. If those are weak, the rest doesn\'t matter.',
              xpBonus: 15,
            },
            {
              id: 'w5-u2-l3-e3',
              type: 'quiz',
              question: 'What is the main advantage of creating a reporting template with AI?',
              options: [
                'It eliminates the need for data',
                'You can paste fresh data each period and get consistent analysis',
                'AI reports are always more accurate than human reports',
                'Templates are required by most companies'
              ],
              correctAnswer: 1,
              xpBonus: 5,
            }
          ]
        },
        {
          id: 'w5-u2-l4',
          waveId: 'wave-5',
          unitId: 'w5-u2',
          title: 'Data Visualization Prompts',
          description: 'Generate chart specifications and bring your data to life visually.',
          duration: '10 min',
          difficulty: 'intermediate',
          xp: 20,
          order: 4,
          content: `# Data Visualization Prompts

AI can't generate charts directly in most chat interfaces — but it can tell you exactly what to build, write the code to create it, and even generate chart specs you can paste into tools.

## Choosing the Right Chart Type

> "I want to visualize [describe your data and what story you want to tell]. What chart type should I use and why? Consider:
> - The data type (time series, categorical, proportional)
> - The audience (technical vs executive)
> - The message (comparison, trend, composition, distribution)"

### Quick Chart Reference
| You Want to Show... | Use This Chart |
|---|---|
| Trends over time | Line chart |
| Comparisons between items | Bar chart (horizontal for many items) |
| Parts of a whole | Pie chart (2-5 segments only) or stacked bar |
| Relationships between variables | Scatter plot |
| Distribution of values | Histogram or box plot |
| Geographic patterns | Map or heat map |
| Process flow | Sankey diagram or funnel |
| Multiple metrics at once | Dashboard with small multiples |

## Detailed Chart Specifications

> "Create a detailed specification for a chart showing [what]:
> - Chart type and rationale
> - X-axis: label, scale, range, tick marks
> - Y-axis: label, scale, range
> - Data series to include (with colors — suggest hex codes)
> - Title and subtitle
> - Key annotations to highlight (peaks, drops, milestones)
> - Legend placement
> - Recommended tool to create it (Excel, Google Sheets, Tableau, Chart.js)"

## Code-Based Visualizations

If you can run code, AI can generate publication-quality charts:

### Python (matplotlib/seaborn)
> "Write Python code using matplotlib to create a [chart type] from this data:
> [paste data]
>
> Requirements:
> - Clean, modern style (use seaborn or a custom theme)
> - Proper axis labels and title
> - Annotations on key data points
> - Color palette: [business professional / bold / minimal]
> - Save as PNG at 300 DPI"

### Google Sheets Chart Script
> "Write a Google Apps Script that creates a [chart type] in my Google Sheet.
> The data is in columns A through E, rows 2-50.
> Customize: title, axis labels, colors, and legend position."

### HTML/JavaScript (for web dashboards)
> "Write HTML and JavaScript using Chart.js to create an interactive [chart type].
> Data: [paste or describe]
> Features: tooltips on hover, responsive sizing, clean design."

## Data Storytelling

Charts are only half the equation. The story you tell with them matters more.

> "I have this chart showing [describe the chart and data]:
> Write a 3-paragraph data story that:
> 1. Opens with the most surprising or important finding
> 2. Provides context for why this matters
> 3. Ends with a clear recommendation or call to action
>
> Audience: [who is reading this]"

## Common Visualization Mistakes

Ask AI to audit your chart choices:
> "I'm planning to use a [chart type] to show [data]. Evaluate this choice:
> - Is this the right chart type?
> - What could go wrong or be misleading?
> - How could I improve the visualization?
> - What common mistakes should I avoid?"

Common pitfalls AI will catch:
- Pie charts with too many segments (use bar chart instead)
- Truncated Y-axis that exaggerates differences
- 3D charts that distort proportions
- Missing context (no title, no units, no time period)
- Color choices that are inaccessible to colorblind viewers`,
          exercises: [
            {
              id: 'w5-u2-l4-e1',
              type: 'prompt-challenge',
              question: 'Describe a dataset you work with and ask AI to recommend the best visualization approach. Then ask for a detailed chart specification. Does the recommendation make sense for your audience?',
              hint: 'Include details about who will see the chart (technical vs executive) — this changes everything about the recommendation.',
              xpBonus: 15,
            },
            {
              id: 'w5-u2-l4-e2',
              type: 'quiz',
              question: 'What chart type is best for showing how something changes over time?',
              options: ['Pie chart', 'Bar chart', 'Line chart', 'Scatter plot'],
              correctAnswer: 2,
              xpBonus: 5,
            },
            {
              id: 'w5-u2-l4-e3',
              type: 'quiz',
              question: 'Why should you avoid pie charts with more than 5 segments?',
              options: [
                'Pie charts can only hold 5 data points',
                'Too many segments make it impossible to compare sizes accurately',
                'Browsers crash with too many segments',
                'It\'s a legal requirement in data visualization'
              ],
              correctAnswer: 1,
              xpBonus: 5,
            },
            {
              id: 'w5-u2-l4-e4',
              type: 'free-response',
              question: 'Think about the last presentation or report you created. What chart or visualization would have made the data clearer? Describe the data, the audience, and the chart you would use.',
              hint: 'Consider whether you were showing a trend, a comparison, or a composition. Each has an ideal chart type.',
              xpBonus: 10,
            }
          ]
        }
      ]
    }
  ]
};

// Calculate totalXP
wave5.totalXP = wave5.units.reduce((sum, unit) =>
  sum + unit.lessons.reduce((lSum, lesson) =>
    lSum + lesson.xp + lesson.exercises.reduce((eSum, ex) => eSum + ex.xpBonus, 0), 0), 0);
