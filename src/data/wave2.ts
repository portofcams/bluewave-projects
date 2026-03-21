import { Wave } from './curriculum-types';

export const wave2: Wave = {
  id: 'wave-2',
  number: 2,
  title: 'Prompt Engineering',
  subtitle: 'Master the Art of Asking',
  description: 'Learn the science and art of crafting prompts that get exactly the output you want. This is the highest-leverage AI skill you can develop.',
  color: '#8b5cf6',
  icon: 'target',
  weekRange: 'Week 2-3',
  totalXP: 0,
  units: [
    {
      id: 'w2-u1',
      waveId: 'wave-2',
      title: 'Prompt Fundamentals',
      description: 'The building blocks of effective prompts',
      order: 1,
      lessons: [
        {
          id: 'w2-u1-l1', waveId: 'wave-2', unitId: 'w2-u1',
          title: 'What Makes a Good Prompt',
          description: 'The principles behind prompts that actually work.',
          duration: '10 min', difficulty: 'beginner', xp: 15, order: 1,
          content: `# What Makes a Good Prompt

A prompt is your instruction to the AI. Think of it like giving directions to a stranger in a new city -- the more precise and clear your directions, the faster they get where you want them to go. The difference between a mediocre and exceptional AI user almost always comes down to prompt quality.

:::key
The single biggest lever you have over AI output quality is your prompt. Better prompts do not require technical skills -- they require clear thinking.
:::

---

## The Five Principles

### 1. Clarity
Say exactly what you mean. AI cannot read between the lines, pick up on hints, or infer what you "really meant." If your prompt could be interpreted two different ways, the AI will pick whichever interpretation you did not want.

**Bad**: "Help with my project"
**Good**: "Help me outline a 5-page research paper on renewable energy adoption in Southeast Asia"

The bad prompt could mean literally anything -- a school essay, a home renovation, a software project. The good prompt tells the AI exactly what it is working on, how long it should be, and what the topic is.

### 2. Context
Give the AI the background it needs. You have all the context about your situation in your head. The AI has none of it. Bridge that gap.

**Bad**: "Write a response to this complaint"
**Good**: "I run a small online clothing store. A customer emailed saying their order arrived 5 days late and the wrong size. Write an apologetic response that offers a full refund and 20% discount on their next order."

:::example
Here is another context-rich prompt you can adapt:

"I am a freelance graphic designer pitching to a mid-size tech company. They asked me to send a brief capabilities overview. Write a one-page pitch that highlights brand identity, UI design, and packaging design experience. Tone should be confident but not salesy."
:::

### 3. Specificity
The more specific your prompt, the more useful the output. Vague prompts produce vague results -- every time.

**Bad**: "Make it better"
**Good**: "Rewrite this paragraph to be more concise (under 50 words), use active voice, and make the tone more authoritative"

Notice how the good prompt gives the AI three concrete targets: a word count, a voice style, and a tone. That turns a subjective task ("make it better") into an objective one the AI can actually deliver on.

### 4. Constraints
This is counterintuitive, but boundaries actually help AI produce better output. Without constraints, the AI has to guess at your preferences for length, tone, format, and scope. With constraints, it can focus its energy on the content itself.

Examples of useful constraints:
- Word/character limits
- Tone (formal, casual, technical)
- Format (bullets, numbered list, table, paragraphs)
- Audience (beginners, experts, children, executives)
- What to include or exclude

:::tip
A simple constraint like "keep it under 200 words" or "format as a table" can transform a rambling AI response into something you can actually use immediately. When in doubt, add a constraint.
:::

### 5. Examples
Showing the AI what you want is often more effective than telling it. When you provide an example, the AI pattern-matches against it and reproduces the structure, tone, and format automatically.

"Format the output like this example:
**Product**: Widget Pro
**Price**: $29.99
**Key Feature**: Automated reporting"

This is especially powerful for tasks where describing the format in words would take longer than just showing it.

---

## The Prompt Quality Formula

**Output Quality = (Clarity + Context + Specificity + Constraints) x Iteration**

:::warning
Do not give up after one prompt. The biggest mistake new AI users make is treating it as a one-shot tool. The real power comes from iterating -- send a prompt, review the output, then refine with a follow-up like "Good, but make it shorter and add specific numbers."
:::

Your first prompt rarely produces the perfect output. But a good first prompt gets you 80% there, and a quick follow-up gets you to 95%.

:::try
Right now, think of a task you did at work this week. Write a prompt for it using all five principles. Then compare it to how you would have asked a coworker to do the same thing. You will likely find the prompt version is more precise -- and that precision is exactly what makes AI useful.
:::`,
          exercises: [
            { id: 'w2-u1-l1-e1', type: 'quiz', question: 'Which principle states that giving AI boundaries actually improves output?', options: ['Clarity', 'Context', 'Constraints', 'Specificity'], correctAnswer: 2, xpBonus: 5 },
            { id: 'w2-u1-l1-e2', type: 'prompt-challenge', question: 'Take this bad prompt and rewrite it using all 5 principles: "Write something about marketing." Your improved prompt should specify: the format, audience, topic focus, length, and tone.', hint: 'Example start: "Write a 500-word blog post targeted at small business owners about..."', xpBonus: 15 },
            { id: 'w2-u1-l1-e3', type: 'free-response', question: 'Write the worst possible prompt you can think of, then rewrite it as the best possible prompt for the same task.', hint: 'Make the bad one vague, ambiguous, and context-free. Make the good one specific, contextual, and constrained.', xpBonus: 10 }
          ]
        },
        {
          id: 'w2-u1-l2', waveId: 'wave-2', unitId: 'w2-u1',
          title: 'Anatomy of a Prompt',
          description: 'The four components: Role, Context, Task, and Format.',
          duration: '12 min', difficulty: 'beginner', xp: 20, order: 2,
          content: `# The Anatomy of a Prompt

Every great prompt has four components. You do not always need all four, but knowing them gives you a reliable structure you can use for any task -- from writing emails to analyzing data to brainstorming product ideas.

:::key
The RCTF Framework (Role, Context, Task, Format) is the most practical prompt structure you can learn. Once it becomes second nature, you will never stare at a blank prompt box again.
:::

---

## The RCTF Framework

### R -- Role
Tell the AI who to be. This is not just a gimmick -- when you assign a role, the AI draws on knowledge patterns associated with that expertise. A "senior financial advisor" will mention tax implications that a generic response would skip entirely.

> "You are a senior marketing strategist with 15 years of experience in SaaS companies."

Why it works: Setting a role activates relevant knowledge patterns and sets the appropriate tone and expertise level. A "pediatric nurse" will explain things differently than a "medical researcher," even if the underlying information is the same.

### C -- Context
Provide the background information. This is where you fill in everything the AI needs to know about your specific situation. The more relevant context you provide, the less the AI has to guess -- and guessing is where things go wrong.

> "My company sells project management software to small businesses (10-50 employees). We're launching a new feature: AI-powered task prioritization. Our main competitors are Asana and Monday.com."

:::tip
A useful test: if a human expert would need to ask you clarifying questions before starting the task, that information belongs in your Context section. Anticipate those questions and answer them upfront.
:::

### T -- Task
State clearly what you want done. This is the one component you should never skip. Be explicit about the deliverable -- what exactly should the AI produce?

> "Create a product launch email sequence of 3 emails. Email 1 should build anticipation, Email 2 should announce the feature, and Email 3 should drive trial sign-ups."

### F -- Format
Specify the output structure. This is the difference between getting a wall of text you have to reformat and getting something you can copy-paste directly into your workflow.

> "For each email, provide: Subject line, Preview text, Body (under 200 words), CTA button text. Use a professional but friendly tone."

---

## Putting It Together

Here is a complete RCTF prompt. Notice how each section flows naturally into the next:

> **Role**: You are a senior marketing strategist specializing in SaaS product launches.
>
> **Context**: My company, TaskFlow, sells project management software to small businesses (10-50 employees). We're launching AI-powered task prioritization next month. Our main competitors are Asana and Monday.com, but they don't have this feature yet.
>
> **Task**: Create a 3-email launch sequence. Email 1: build anticipation (send 1 week before). Email 2: announce the feature (launch day). Email 3: drive trial sign-ups (3 days after launch).
>
> **Format**: For each email provide:
> - Subject line (under 50 characters)
> - Preview text (under 90 characters)
> - Body copy (under 200 words)
> - CTA button text
> - Tone: professional but energetic

:::example
Here is a completely different RCTF prompt to show how versatile this framework is:

**Role**: You are a personal finance coach who specializes in helping young professionals (ages 25-35) manage their money.

**Context**: I am 28, earn $65,000/year, have $12,000 in student loans at 5.5% interest, and currently save about $200/month. I have no retirement account yet.

**Task**: Create a 6-month financial action plan that balances debt payoff with starting retirement savings.

**Format**: Month-by-month breakdown in a table with columns for: Month, Action, Amount, and Why. End with a summary of where I will stand after 6 months.
:::

## When to Use Each Component

| Component | Always needed? | When to skip |
|-----------|---------------|-------------|
| Role | Usually helpful | Simple factual questions |
| Context | Almost always | The task is self-contained |
| Task | Always | Never skip this |
| Format | Very helpful | When you are fine with any format |

:::warning
The most common RCTF mistake is writing a strong Role and Context but leaving the Task vague. "Help me with marketing" is not a task. "Write 5 subject lines for our abandoned cart email" is a task. Be concrete about the deliverable.
:::`,
          exercises: [
            { id: 'w2-u1-l2-e1', type: 'quiz', question: 'In the RCTF framework, what does the "R" stand for?', options: ['Result', 'Role', 'Reference', 'Response'], correctAnswer: 1, xpBonus: 5 },
            { id: 'w2-u1-l2-e2', type: 'prompt-challenge', question: 'Using the RCTF framework, write a prompt asking AI to help you prepare for a job interview. Include all four components clearly labeled.', hint: 'Role: Interview coach. Context: your industry and the position. Task: create prep materials. Format: specify what deliverables you want.', xpBonus: 20 },
            { id: 'w2-u1-l2-e3', type: 'quiz', question: 'Which component should you NEVER skip in a prompt?', options: ['Role', 'Context', 'Task', 'Format'], correctAnswer: 2, xpBonus: 5 }
          ]
        },
        {
          id: 'w2-u1-l3', waveId: 'wave-2', unitId: 'w2-u1',
          title: 'Zero-Shot vs Few-Shot Prompting',
          description: 'How examples transform AI output quality.',
          duration: '10 min', difficulty: 'intermediate', xp: 25, order: 3,
          content: `# Zero-Shot vs Few-Shot Prompting

This is one of the most powerful techniques in prompt engineering -- and it is surprisingly simple. The core idea: instead of just telling the AI what to do, you **show** it what you want by providing examples. The difference in output quality can be dramatic.

:::key
Few-shot prompting is the technique of giving the AI examples of the input-output pattern you want before asking it to process your actual request. It is one of the highest-impact skills you can develop.
:::

---

## Zero-Shot Prompting
You give the AI a task with **no examples**. You are relying entirely on the AI's training to figure out what you want.

> "Classify this customer review as positive, negative, or neutral: 'The product works fine but shipping was slow.'"

The AI uses its general training to interpret the task. For simple, unambiguous requests, this works well enough. But the AI is guessing at your exact criteria, your preferred format, and how you want edge cases handled.

## One-Shot Prompting
You give **one example** before your actual request. This single example does a surprising amount of heavy lifting -- it shows the AI your expected format, your classification criteria, and the level of detail you want.

> "Classify customer reviews as positive, negative, or neutral.
>
> Example:
> Review: 'Absolutely love this product! Best purchase I've made all year.'
> Classification: Positive
>
> Now classify this:
> Review: 'The product works fine but shipping was slow.'
> Classification:"

## Few-Shot Prompting
You give **multiple examples** (typically 2-5). This is where things get really powerful, because your examples can cover different scenarios, edge cases, and nuances.

> "Classify customer reviews. Here are examples:
>
> Review: 'Absolutely love it! Best purchase ever.' --> Positive
> Review: 'Completely broken on arrival. Want a refund.' --> Negative
> Review: 'It's okay. Does what it says.' --> Neutral
> Review: 'Great quality but overpriced.' --> Mixed
>
> Now classify: 'The product works fine but shipping was slow.' -->"

Notice the fourth example introduces a "Mixed" category. Without that example, the AI might force every review into just three buckets. Your examples define the rules.

---

## Why Few-Shot Is So Powerful

1. **Pattern matching**: The AI learns exactly what format you want
2. **Edge cases**: Your examples can show how to handle tricky situations
3. **Consistency**: Output format stays consistent across many items
4. **Accuracy**: Studies show few-shot prompting can improve accuracy by 20-40%

:::example
Few-shot is not just for classification. Here is a prompt that teaches the AI a custom writing style:

"Rewrite product descriptions in our brand voice. Examples:

Original: 'This backpack has a 30L capacity and water-resistant fabric.'
Our voice: 'Thirty liters of adventure-ready storage, wrapped in fabric that laughs at rain.'

Original: 'These headphones feature 40-hour battery life and noise cancellation.'
Our voice: 'Forty hours of your favorite sounds, minus everything you do not want to hear.'

Now rewrite: 'This water bottle holds 24oz and keeps drinks cold for 12 hours.'"

The AI picks up the playful, punchy style from your examples -- something nearly impossible to achieve with a zero-shot description of "make it sound fun."
:::

## When to Use Each

| Technique | Best For |
|-----------|----------|
| Zero-shot | Simple, unambiguous tasks |
| One-shot | Tasks where format matters |
| Few-shot | Classification, formatting, complex patterns, batch processing |

:::tip
Few-shot prompting is especially valuable when you need to process many items the same way. Write your examples once, then feed in dozens or hundreds of items. The AI will handle them all consistently -- like a template that actually understands context.
:::

## Pro Tips
- Use diverse examples that cover different cases
- Include edge cases in your examples -- the tricky ones that define your criteria
- Keep examples concise but representative
- 3-5 examples is usually the sweet spot (more is not always better -- after about 5, you get diminishing returns and start eating into the context window)

:::warning
Choose your examples carefully. If all your few-shot examples are straightforward cases, the AI will struggle with edge cases. If you know certain inputs are tricky (mixed sentiment, ambiguous phrasing, unusual formatting), include at least one example that covers that scenario.
:::`,
          exercises: [
            { id: 'w2-u1-l3-e1', type: 'quiz', question: 'Few-shot prompting can improve accuracy by approximately:', options: ['1-5%', '5-10%', '20-40%', '80-100%'], correctAnswer: 2, xpBonus: 5 },
            { id: 'w2-u1-l3-e2', type: 'prompt-challenge', question: 'Create a few-shot prompt (3 examples) that teaches AI to convert informal meeting notes into professional action items. Test it with a real or made-up meeting note.', hint: 'Example format: "Meeting note: John said he\'d finish the report → Action: John to complete quarterly report by [date]"', xpBonus: 20 },
            { id: 'w2-u1-l3-e3', type: 'quiz', question: 'What is the recommended sweet spot for number of examples in few-shot prompting?', options: ['1-2', '3-5', '10-15', '20+'], correctAnswer: 1, xpBonus: 5 }
          ]
        }
      ]
    },
    {
      id: 'w2-u2',
      waveId: 'wave-2',
      title: 'Advanced Prompting',
      description: 'Techniques used by AI power users',
      order: 2,
      lessons: [
        {
          id: 'w2-u2-l1', waveId: 'wave-2', unitId: 'w2-u2',
          title: 'Chain of Thought Prompting',
          description: 'Make AI think step-by-step for dramatically better reasoning.',
          duration: '10 min', difficulty: 'intermediate', xp: 25, order: 1,
          content: `# Chain of Thought Prompting

Want AI to solve complex problems reliably? Four words can transform the quality of the output: "Think step by step." This simple technique dramatically improves reasoning on any task that involves multiple steps, calculations, or logical dependencies.

:::key
Chain of thought (CoT) prompting forces the AI to show its work rather than jumping straight to an answer. This single technique reduces reasoning errors more than almost any other prompting strategy.
:::

---

## The Problem

Without chain of thought, AI often takes shortcuts and jumps straight to an answer -- sometimes getting it wrong:

> **Prompt**: "If a store has a 25% off sale, and you have a 10% member discount applied after the sale price, how much do you pay for a $80 item?"
>
> **AI might say**: "$52" (wrong -- it might just subtract 35%)

The AI sees two percentages and a price, and it takes the fastest path to an answer. That shortcut leads to the wrong result because the discounts are sequential, not additive.

## The Fix

Add "Think step by step" or "Show your reasoning":

> "If a store has a 25% off sale, and you have a 10% member discount applied after the sale price, how much do you pay for an $80 item? Think step by step."

**AI response**:
> Step 1: Original price = $80
> Step 2: 25% sale discount = $80 x 0.25 = $20
> Step 3: Sale price = $80 - $20 = $60
> Step 4: 10% member discount on sale price = $60 x 0.10 = $6
> Step 5: Final price = $60 - $6 = **$54**

The correct answer is $54, not $52. And because the AI showed its work, you can verify each step yourself.

---

## Why It Works

Chain of thought forces the AI to:
1. Break the problem into sub-steps
2. Show intermediate results (which you can check)
3. Avoid shortcut errors
4. Handle multi-step logic correctly

:::tip
Chain of thought is not just for math. It works for any task where the AI needs to reason through multiple factors. Try it with "Should I take this job offer?" or "What is causing this bug in my code?" -- you will get much more thorough analysis.
:::

## Trigger Phrases

Any of these work:
- "Think step by step"
- "Walk me through your reasoning"
- "Show your work"
- "Break this down into steps"
- "Let's solve this systematically"
- "First, ... Then, ... Finally, ..."

## When to Use It

- Math and calculations
- Logic puzzles
- Complex analysis
- Decision-making with multiple factors
- Code debugging
- Any multi-step problem

:::warning
Chain of thought adds length to the output, which means it uses more tokens and takes longer to generate. For simple factual questions like "What is the capital of France?" it is unnecessary overhead. Save it for problems where reasoning actually matters.
:::

---

## Advanced: Structured Chain of Thought

For really complex problems, do not just say "think step by step" -- give the AI a specific reasoning structure to follow. This is like providing a worksheet instead of a blank page.

> "Analyze whether we should expand into the European market.
>
> Structure your analysis:
> 1. First, list the key factors to consider
> 2. For each factor, assess the opportunity and risk
> 3. Then weigh the factors against each other
> 4. Finally, give a recommendation with confidence level"

:::example
Here is a structured CoT prompt for debugging:

"My e-commerce checkout page is showing a blank screen after users click 'Place Order.' Debug this systematically:

1. List the most likely causes in order of probability
2. For each cause, describe what evidence would confirm or rule it out
3. Suggest the single fastest diagnostic step I should try first
4. If that step reveals the issue, provide the fix"

This structured approach prevents the AI from jumping to a single guess and instead produces a comprehensive diagnostic plan.
:::`,
          exercises: [
            { id: 'w2-u2-l1-e1', type: 'prompt-challenge', question: 'Ask AI this math problem with AND without chain of thought: "A restaurant bill is $156. You want to leave a 20% tip, then split the total equally among 4 people. How much does each person pay?" Compare the answers.', hint: 'Try the plain question first, then add "Think step by step." The answer should be $46.80.', xpBonus: 15 },
            { id: 'w2-u2-l1-e2', type: 'quiz', question: 'Chain of thought prompting is MOST useful for:', options: ['Simple factual questions', 'Creative writing', 'Multi-step reasoning problems', 'Translation tasks'], correctAnswer: 2, xpBonus: 5 },
            { id: 'w2-u2-l1-e3', type: 'free-response', question: 'Create a prompt that uses structured chain of thought to analyze a business decision you\'re facing (real or hypothetical). Include at least 4 reasoning steps.', hint: 'Think about a decision with multiple factors: cost, time, risk, potential reward, etc.', xpBonus: 15 }
          ]
        },
        {
          id: 'w2-u2-l2', waveId: 'wave-2', unitId: 'w2-u2',
          title: 'System Prompts & Personas',
          description: 'Create persistent AI behaviors with system-level instructions.',
          duration: '10 min', difficulty: 'intermediate', xp: 20, order: 2,
          content: `# System Prompts & Personas

System prompts are instructions that shape the AI's entire behavior for a conversation. Think of them as the "operating manual" you hand the AI before it starts working. Every message in the conversation is then filtered through these instructions.

:::key
A system prompt is a set of persistent instructions that govern how the AI behaves throughout an entire conversation. It is the most powerful way to customize AI behavior without writing code.
:::

---

## What Is a System Prompt?

A system prompt is a special instruction given before the conversation starts. It sets rules the AI follows throughout -- not just for one response, but for every response in the session. In the ChatGPT API, it is the "system" message. In Claude, it is the system prompt. In custom GPTs, it is the "Instructions" field. Most chat interfaces also let you set custom instructions that act as a system prompt.

The key difference from a regular prompt: a system prompt shapes the AI's personality and rules, while regular prompts give it specific tasks to perform.

## Creating Effective Personas

A well-crafted persona transforms a generic AI into a specialized assistant. Here are three examples that demonstrate different approaches:

### The Expert Consultant
> "You are a senior financial advisor with 20 years of experience helping small business owners. You explain complex financial concepts in simple terms. You always consider tax implications. When you don't know something, you say so and recommend consulting a CPA."

This persona works because it sets expertise level, communication style, a specific behavior rule (always consider taxes), and an honesty constraint (admit when unsure).

### The Strict Editor
> "You are a ruthless editor. Your job is to make writing shorter and clearer. Cut all fluff, jargon, and passive voice. Be direct in your feedback. If something is good, say so briefly. If something is bad, explain why and show the fix. Never add length -- only remove it."

### The Socratic Teacher
> "You are a patient teacher who uses the Socratic method. Never give direct answers. Instead, ask guiding questions that lead the student to discover the answer themselves. Start with what they already know and build from there."

:::example
Here is a persona for everyday use that many people find valuable:

"You are my executive assistant. You are organized, concise, and proactive. When I describe a problem, suggest concrete next steps rather than abstract advice. Format action items as a numbered checklist. If I give you a vague request, ask one clarifying question before proceeding -- never more than one. Keep all responses under 200 words unless I ask for detail."

Notice how specific the behavior rules are: concrete next steps, numbered checklists, exactly one clarifying question, 200-word limit. The more precise your rules, the more consistent the AI's behavior.
:::

---

## System Prompt Components

1. **Identity**: Who the AI is
2. **Expertise**: What they know
3. **Behavior rules**: How they should act
4. **Constraints**: What they should NOT do
5. **Output preferences**: Format, tone, length
6. **Edge cases**: What to do in unusual situations

:::tip
The most overlooked component is constraints -- telling the AI what NOT to do. Without constraints, the AI will default to being helpful in ways you might not want. "Never suggest I hire a consultant" or "Do not use bullet points" or "Never provide legal advice -- recommend a lawyer instead" are all powerful constraints that prevent frustrating outputs.
:::

## Pro Tips

- Keep system prompts focused -- do not try to cover every scenario
- Test your system prompts with adversarial inputs (try to break them)
- Include negative instructions ("Do not use jargon" or "Never apologize for your limitations")
- Specify the audience ("Explain to a non-technical audience")
- Iterate -- refine based on the outputs you get over multiple conversations

:::warning
A common pitfall: writing system prompts that contradict themselves. "Be concise" and "provide thorough explanations with examples" pull in opposite directions. If the AI seems confused or inconsistent, check your system prompt for conflicting instructions.
:::`,
          exercises: [
            { id: 'w2-u2-l2-e1', type: 'prompt-challenge', question: 'Create a system prompt for an AI persona that acts as a tough but fair code reviewer. It should: point out bugs, suggest improvements, praise good patterns, and refuse to just rewrite code for the user. Test it by asking it to review a simple function.', hint: 'Include identity, expertise area, behavior rules, and at least one constraint.', xpBonus: 20 },
            { id: 'w2-u2-l2-e2', type: 'quiz', question: 'What is the purpose of including "negative instructions" in a system prompt?', options: ['To confuse the AI', 'To explicitly state what the AI should NOT do', 'To make the prompt longer', 'To test the AI\'s limits'], correctAnswer: 1, xpBonus: 5 },
            { id: 'w2-u2-l2-e3', type: 'free-response', question: 'Design a system prompt for a persona that would be useful in your work or daily life. Include all 6 components listed in the lesson.', hint: 'Think about: a writing assistant for your industry, a study buddy, a meal planner, a project manager, etc.', xpBonus: 15 }
          ]
        },
        {
          id: 'w2-u2-l3', waveId: 'wave-2', unitId: 'w2-u2',
          title: 'Prompt Templates & Frameworks',
          description: 'Reusable prompt patterns you can use every day.',
          duration: '12 min', difficulty: 'intermediate', xp: 25, order: 3,
          content: `# Prompt Templates & Frameworks

Stop writing prompts from scratch every time. If you find yourself doing a similar task more than twice, you should have a template for it. The five templates below are battle-tested frameworks you can start using immediately -- and they will save you significant time.

:::key
Prompt templates are reusable prompt structures with placeholders you fill in for each use. They ensure consistent, high-quality output and eliminate the "blank page" problem when you sit down to work with AI.
:::

---

## Template 1: The Mega Prompt

This is your go-to for complex, high-stakes tasks where you need comprehensive output on the first try.

\`\`\`
ROLE: [Expert type with years of experience]
CONTEXT: [Background information]
TASK: [What you need done]
REQUIREMENTS:
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]
FORMAT: [How you want the output structured]
TONE: [Communication style]
CONSTRAINTS: [Limits and things to avoid]
\`\`\`

:::example
Filled-in Mega Prompt:

ROLE: Experienced copywriter specializing in e-commerce product descriptions
CONTEXT: I sell handmade leather wallets on Etsy. My target customer is men aged 30-50 who value craftsmanship. Average price point is $85.
TASK: Write a product description for our new "Voyager" bifold wallet made from Italian full-grain leather.
REQUIREMENTS: Mention the 10-year warranty, hand-stitched construction, and RFID blocking. Include 3 sensory details about the leather.
FORMAT: A headline (under 10 words), a 3-sentence hook paragraph, then 5 bullet points for features.
TONE: Confident craftsman, not salesy. Think workshop, not showroom.
CONSTRAINTS: Under 200 words total. No superlatives like "best" or "ultimate." No exclamation marks.
:::

---

## Template 2: Before/After Transformer

Use this whenever you need to transform existing content rather than create something new. It is perfect for rewriting, reformatting, and adapting content.

\`\`\`
Transform the following [content type] from [current state] to [desired state].

Current version:
[paste content]

Requirements for the new version:
- [Change 1]
- [Change 2]
- [Change 3]

Keep unchanged: [what should stay the same]
\`\`\`

The "Keep unchanged" line is critical -- without it, the AI might rewrite parts you were happy with.

## Template 3: Batch Processor

This template shines when you need to apply the same transformation to many items. Combine it with few-shot prompting for best results.

\`\`\`
Process each item below according to these rules:
[Rule 1]
[Rule 2]

Example:
Input: [example input]
Output: [example output]

Now process these items:
1. [item]
2. [item]
3. [item]
\`\`\`

:::tip
The Batch Processor is one of the biggest time-savers in your toolkit. Need to rewrite 20 product titles? Categorize 50 customer support tickets? Convert 30 meeting notes into action items? Write the template once with one good example, then paste in your items. What would take an hour of manual work takes two minutes.
:::

## Template 4: Critic/Improver

Use this to get honest, actionable feedback on anything you have written -- emails, reports, presentations, even code.

\`\`\`
Review the following [content type] and provide:
1. Three strengths
2. Three weaknesses
3. Specific, actionable improvements for each weakness
4. A revised version incorporating all improvements

[paste content]
\`\`\`

## Template 5: Decision Matrix

When you are stuck between options, this template forces a structured analysis that often reveals the right choice.

\`\`\`
Help me decide between these options: [list options]

For each option, analyze:
- Pros (at least 3)
- Cons (at least 3)
- Cost/effort estimate
- Risk level (low/medium/high)
- Best-case outcome
- Worst-case outcome

Then provide your recommendation with reasoning.
\`\`\`

---

## How to Build Your Own Templates

1. Notice when you repeat similar prompts
2. Identify the variable parts (the stuff that changes each time)
3. Create a template with [placeholders]
4. Save it somewhere accessible (notes app, Notion, a text file -- anywhere you can quickly grab it)
5. Iterate -- improve the template based on the results you get over time

:::warning
Do not over-engineer your templates. A template with 15 placeholders is harder to use than writing a prompt from scratch. Aim for 3-7 variable sections. If a template is getting unwieldy, split it into two simpler templates instead.
:::`,
          exercises: [
            { id: 'w2-u2-l3-e1', type: 'prompt-challenge', question: 'Use the "Critic/Improver" template to have AI review a piece of your own writing (email, report, or document). Did the AI find legitimate issues?', hint: 'Paste something you actually wrote. The AI should find both strengths and real areas for improvement.', xpBonus: 20 },
            { id: 'w2-u2-l3-e2', type: 'prompt-challenge', question: 'Use the "Decision Matrix" template to analyze a real decision you\'re facing (which software to buy, which project to start next, etc.).', hint: 'The more specific you are about the options and criteria, the more useful the analysis will be.', xpBonus: 15 },
            { id: 'w2-u2-l3-e3', type: 'free-response', question: 'Create your own prompt template for a task you do frequently. Include placeholders [like this] and at least one example of the template filled in.', hint: 'Think about recurring tasks: weekly reports, client communications, content creation, etc.', xpBonus: 15 }
          ]
        },
        {
          id: 'w2-u2-l4', waveId: 'wave-2', unitId: 'w2-u2',
          title: 'Common Prompt Mistakes',
          description: 'The top errors people make and how to fix them.',
          duration: '8 min', difficulty: 'intermediate', xp: 20, order: 4,
          content: `# Common Prompt Mistakes (And How to Fix Them)

Even experienced AI users make these errors regularly. The good news: once you learn to recognize them, they are easy to fix. Each mistake below includes a concrete example so you can spot the pattern in your own work.

:::key
Most bad AI outputs are not the AI's fault -- they are the result of a bad prompt. Fixing these eight common mistakes will immediately improve the quality of every AI interaction you have.
:::

---

## Mistake 1: Being Too Vague
**Bad**: "Help me with sales"
**Fix**: "Create a cold outreach email template for selling our B2B accounting software to CFOs at mid-size companies (100-500 employees)"

The vague version could produce anything from a sales training curriculum to a motivational speech. The specific version tells the AI the deliverable (email template), the product (B2B accounting software), the audience (CFOs), and the company size. No guesswork required.

## Mistake 2: Asking Multiple Unrelated Things
**Bad**: "Write me a blog post about AI, also fix this Python code, and what's the weather?"
**Fix**: One prompt per task. Or explicitly separate them: "I have 3 unrelated requests. Please address each separately."

When you bundle unrelated tasks, each one gets less attention. The AI tries to split its focus and often does a mediocre job on all three instead of a great job on one.

## Mistake 3: Not Specifying Format
**Bad**: "Give me marketing ideas"
**Fix**: "Give me 10 marketing ideas for a local bakery, formatted as a numbered list with a one-sentence explanation for each"

:::tip
Adding format specifications is the easiest high-impact improvement you can make to any prompt. Try adding one of these to your next prompt: "Format as a table," "Use bullet points," "Number each item," "Keep each point to one sentence." You will be surprised how much more usable the output becomes.
:::

## Mistake 4: Forgetting the Audience
**Bad**: "Explain machine learning"
**Fix**: "Explain machine learning to a small business owner who has no technical background, using everyday analogies"

The same topic explained to a PhD student, a ten-year-old, and a CEO should look completely different. When you do not specify an audience, the AI defaults to a generic middle ground that is often too technical for beginners and too basic for experts.

## Mistake 5: Not Iterating
Many people take the first output and give up if it is not perfect. This is like quitting a negotiation after the first offer.

**First prompt**: [Get initial output]
**Follow-up**: "Good start, but make it more concise and add specific dollar amounts"
**Follow-up**: "Perfect. Now adapt this for an email format instead of a report"

AI conversations are designed to be iterative. The first output is a draft, not a final product. Two or three follow-up prompts can take mediocre output and turn it into something genuinely excellent.

---

## Mistake 6: Overloading Context
Do not paste 50 pages and say "summarize this." The AI will produce a generic summary that misses what you actually care about. Instead:
- Break large documents into sections
- Tell the AI what to focus on ("summarize the financial projections, ignore the company history")
- Ask specific questions rather than open-ended ones

:::warning
Context overload also applies to system prompts. If you write a 2,000-word system prompt trying to cover every possible scenario, the AI will start ignoring or contradicting parts of it. Keep instructions focused and prioritized.
:::

## Mistake 7: Anthropomorphizing
**Bad**: "I hope you're having a good day! I was wondering if maybe you could possibly help me..."
**Fix**: Just state what you need directly.

You do not need to warm up the AI or soften your request. Small talk and hedging language add noise without improving output. Being direct is not rude -- it is efficient. That said, being respectful and clear is always a good practice.

## Mistake 8: Not Verifying
Taking AI output at face value without checking facts, calculations, or code. AI models can sound extremely confident while stating something completely wrong.

:::warning
Always verify anything you plan to act on -- especially numbers, dates, legal information, medical advice, and code that handles money or user data. The AI's confidence level has no correlation with its accuracy. A wrong answer stated confidently is more dangerous than an obviously uncertain one.
:::`,
          exercises: [
            { id: 'w2-u2-l4-e1', type: 'quiz', question: 'What is wrong with the prompt: "Help me with sales, fix my code, and plan my vacation"?', options: ['It\'s too short', 'It asks multiple unrelated things in one prompt', 'It doesn\'t specify a role', 'Nothing — it\'s fine'], correctAnswer: 1, xpBonus: 5 },
            { id: 'w2-u2-l4-e2', type: 'prompt-challenge', question: 'Find an AI conversation you\'ve had before (or create one with a vague prompt). Identify which mistakes from this lesson were present, and rewrite the prompt to fix them. Test both versions.', hint: 'Look for: vague language, missing format specs, no audience, no iteration.', xpBonus: 15 },
            { id: 'w2-u2-l4-e3', type: 'quiz', question: 'Why is not iterating considered a mistake?', options: ['AI always gets it right the first time', 'First outputs are always wrong', 'AI conversations are designed to be refined through follow-ups', 'Iteration wastes tokens'], correctAnswer: 2, xpBonus: 5 }
          ]
        },
        {
          id: 'w2-u2-l5', waveId: 'wave-2', unitId: 'w2-u2',
          title: 'Prompt Chaining & Multi-Step Workflows',
          description: 'Connect multiple prompts into powerful pipelines.',
          duration: '12 min', difficulty: 'advanced', xp: 30, order: 5,
          content: `# Prompt Chaining & Multi-Step Workflows

Single prompts are great for single tasks. But for anything complex -- creating a content strategy, building a business plan, analyzing a competitor, preparing a presentation -- chaining prompts together is where the real power lives. This is the technique that separates casual AI users from power users.

:::key
Prompt chaining means using the output of one prompt as the input for the next, building a pipeline where each step refines and builds on the previous one. It is how professionals use AI to tackle complex, multi-step projects.
:::

---

## What Is Prompt Chaining?

Prompt chaining means breaking a complex task into discrete steps, where each step's output feeds into the next step's input. Instead of asking the AI to do everything at once (which produces mediocre results), you guide it through a focused sequence where each step gets the AI's full attention.

Think of it like cooking: you would not throw all ingredients into a pot simultaneously. You prep, then saute, then simmer, then plate. Each step has a clear purpose and builds on the last.

## Example: Blog Post Pipeline

Here is a real five-step chain that produces publishable content:

### Step 1 -- Research
> "List the top 10 trends in remote work for 2025 based on your training data. For each trend, provide a one-sentence summary and why it matters."

### Step 2 -- Outline (uses Step 1 output)
> "Based on these trends, create a blog post outline targeting HR managers. Include an intro hook, 5 main sections (choose the most compelling trends), and a conclusion with action items."

### Step 3 -- Draft (uses Step 2 output)
> "Write the full blog post from this outline. Target 1,500 words. Tone: authoritative but accessible. Include a statistic or data point in each section."

### Step 4 -- Edit (uses Step 3 output)
> "Review this draft as a strict editor. Cut 20% of the word count while keeping all key points. Remove any fluff, cliches, or weak transitions."

### Step 5 -- SEO (uses Step 4 output)
> "Optimize this post for SEO. Add: a meta description (under 155 characters), 5 suggested keywords, alt text suggestions for 3 images, and internal linking opportunities."

Notice how each step has a single, clear objective. The AI is not trying to research AND write AND edit AND optimize all at once. It focuses on one task at a time.

---

## Why Chain Instead of One Big Prompt?

1. **Better quality**: Each step gets focused attention
2. **Easier debugging**: If Step 3 output is bad, you only redo Step 3
3. **Flexibility**: You can branch or modify any step without starting over
4. **Token efficiency**: Each step uses a fresh context window
5. **Human-in-the-loop**: You can review and adjust between steps

:::tip
The human-in-the-loop advantage is huge. After Step 2 (Outline), you can say "Actually, drop trend #3 and expand on trend #7" before the AI writes 1,500 words in the wrong direction. Course-correcting at the outline stage saves far more time than rewriting a full draft.
:::

## Chaining Patterns

| Pattern | Description | Example |
|---------|-------------|---------|
| **Linear** | Step 1 then 2 then 3 | Blog post pipeline |
| **Fan-out** | One input, multiple parallel outputs | Generate 5 variations of a headline |
| **Fan-in** | Multiple inputs, one synthesis | Combine research from multiple prompts into one report |
| **Loop** | Output feeds back as input | Iterative improvement until quality threshold met |

:::example
Here is a Fan-out/Fan-in chain for competitive analysis:

**Fan-out (3 parallel prompts)**:
- Prompt A: "Analyze Competitor X's pricing strategy and positioning"
- Prompt B: "Analyze Competitor Y's pricing strategy and positioning"
- Prompt C: "Analyze Competitor Z's pricing strategy and positioning"

**Fan-in (1 synthesis prompt)**:
- "Here are three competitive analyses. Compare all three competitors side by side. Identify gaps in the market where none of them are strong. Recommend our positioning strategy."

This pattern lets you gather focused intelligence on each competitor separately, then synthesize it into a strategic recommendation.
:::

---

## Building Your First Chain

1. Identify the end goal
2. Break it into 3-5 distinct sub-tasks
3. Write a prompt for each sub-task
4. Test each step independently
5. Connect them by passing outputs as inputs
6. Iterate on the weakest link

:::warning
The most common chaining mistake is making steps too dependent on exact wording from the previous step. If Step 3 only works when Step 2 produces output in a very specific format, the chain is fragile. Write each step so it can handle reasonable variations in its input. Adding a format specification to each step helps keep things consistent.
:::`,
          exercises: [
            { id: 'w2-u2-l5-e1', type: 'prompt-challenge', question: 'Build a 3-step prompt chain for creating a professional LinkedIn post: Step 1: Generate the core idea and key points. Step 2: Draft the post. Step 3: Optimize for engagement. Execute all three steps.', hint: 'Each step should explicitly reference the output of the previous step.', xpBonus: 25 },
            { id: 'w2-u2-l5-e2', type: 'quiz', question: 'What is the main advantage of prompt chaining over one massive prompt?', options: ['It\'s faster', 'Each step gets focused attention and you can debug individual steps', 'It uses fewer tokens', 'AI prefers shorter prompts'], correctAnswer: 1, xpBonus: 5 },
            { id: 'w2-u2-l5-e3', type: 'free-response', question: 'Design a 4-step prompt chain for a task relevant to your work. Write out each prompt (with placeholders for the previous step\'s output). What chaining pattern does it use?', hint: 'Think about multi-step tasks: creating a presentation, analyzing a competitor, planning an event, etc.', xpBonus: 20 }
          ]
        }
      ]
    }
  ]
};

wave2.totalXP = wave2.units.reduce((sum, unit) =>
  sum + unit.lessons.reduce((lSum, lesson) =>
    lSum + lesson.xp + lesson.exercises.reduce((eSum, ex) => eSum + ex.xpBonus, 0), 0), 0);
