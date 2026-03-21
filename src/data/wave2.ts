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

A prompt is your instruction to the AI. The difference between a mediocre and exceptional AI user comes down to prompt quality.

## The Five Principles

### 1. Clarity
Say exactly what you mean. AI can't read between the lines.

**Bad**: "Help with my project"
**Good**: "Help me outline a 5-page research paper on renewable energy adoption in Southeast Asia"

### 2. Context
Give the AI the background it needs.

**Bad**: "Write a response to this complaint"
**Good**: "I run a small online clothing store. A customer emailed saying their order arrived 5 days late and the wrong size. Write an apologetic response that offers a full refund and 20% discount on their next order."

### 3. Specificity
The more specific, the better.

**Bad**: "Make it better"
**Good**: "Rewrite this paragraph to be more concise (under 50 words), use active voice, and make the tone more authoritative"

### 4. Constraints
Boundaries actually help AI produce better output.

Examples of useful constraints:
- Word/character limits
- Tone (formal, casual, technical)
- Format (bullets, numbered list, table, paragraphs)
- Audience (beginners, experts, children, executives)
- What to include or exclude

### 5. Examples
Showing the AI what you want is often more effective than telling it.

"Format the output like this example:
**Product**: Widget Pro
**Price**: $29.99
**Key Feature**: Automated reporting"

## The Prompt Quality Formula

**Output Quality = (Clarity + Context + Specificity + Constraints) × Iteration**

Your first prompt rarely produces the perfect output. But a good first prompt gets you 80% there, and a quick follow-up gets you to 95%.`,
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

Every great prompt has four components. You don't always need all four, but knowing them lets you construct prompts like a pro.

## The RCTF Framework

### R — Role
Tell the AI who to be.

> "You are a senior marketing strategist with 15 years of experience in SaaS companies."

Why it works: Setting a role activates relevant knowledge patterns and sets the appropriate tone and expertise level.

### C — Context
Provide the background information.

> "My company sells project management software to small businesses (10-50 employees). We're launching a new feature: AI-powered task prioritization. Our main competitors are Asana and Monday.com."

### T — Task
State clearly what you want done.

> "Create a product launch email sequence of 3 emails. Email 1 should build anticipation, Email 2 should announce the feature, and Email 3 should drive trial sign-ups."

### F — Format
Specify the output structure.

> "For each email, provide: Subject line, Preview text, Body (under 200 words), CTA button text. Use a professional but friendly tone."

## Putting It Together

Here's a complete RCTF prompt:

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

## When to Use Each Component

| Component | Always needed? | When to skip |
|-----------|---------------|-------------|
| Role | Usually helpful | Simple factual questions |
| Context | Almost always | The task is self-contained |
| Task | Always | Never skip this |
| Format | Very helpful | When you're fine with any format |`,
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

This is one of the most powerful techniques in prompt engineering — and it's surprisingly simple.

## Zero-Shot Prompting
You give the AI a task with **no examples**.

> "Classify this customer review as positive, negative, or neutral: 'The product works fine but shipping was slow.'"

The AI uses its general training to figure out what you want. For simple tasks, this works well enough.

## One-Shot Prompting
You give **one example** before your actual request.

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
You give **multiple examples** (typically 2-5).

> "Classify customer reviews. Here are examples:
>
> Review: 'Absolutely love it! Best purchase ever.' → Positive
> Review: 'Completely broken on arrival. Want a refund.' → Negative
> Review: 'It's okay. Does what it says.' → Neutral
> Review: 'Great quality but overpriced.' → Mixed
>
> Now classify: 'The product works fine but shipping was slow.' →"

## Why Few-Shot Is So Powerful

1. **Pattern matching**: The AI learns exactly what format you want
2. **Edge cases**: Your examples can show how to handle tricky situations
3. **Consistency**: Output format stays consistent across many items
4. **Accuracy**: Studies show few-shot prompting can improve accuracy by 20-40%

## When to Use Each

| Technique | Best For |
|-----------|----------|
| Zero-shot | Simple, unambiguous tasks |
| One-shot | Tasks where format matters |
| Few-shot | Classification, formatting, complex patterns, batch processing |

## Pro Tips
- Use diverse examples that cover different cases
- Include edge cases in your examples
- Keep examples concise but representative
- 3-5 examples is usually the sweet spot (more isn't always better)`,
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

Want AI to solve complex problems? Tell it to think step by step. This simple technique dramatically improves reasoning.

## The Problem

Without chain of thought, AI often jumps to answers:

> **Prompt**: "If a store has a 25% off sale, and you have a 10% member discount applied after the sale price, how much do you pay for a $80 item?"
>
> **AI might say**: "$52" (wrong — it might just subtract 35%)

## The Fix

Add "Think step by step" or "Show your reasoning":

> "If a store has a 25% off sale, and you have a 10% member discount applied after the sale price, how much do you pay for an $80 item? Think step by step."

**AI response**:
> Step 1: Original price = $80
> Step 2: 25% sale discount = $80 × 0.25 = $20
> Step 3: Sale price = $80 - $20 = $60
> Step 4: 10% member discount on sale price = $60 × 0.10 = $6
> Step 5: Final price = $60 - $6 = **$54**

## Why It Works

Chain of thought forces the AI to:
1. Break the problem into sub-steps
2. Show intermediate results (which you can check)
3. Avoid shortcut errors
4. Handle multi-step logic correctly

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

## Advanced: Structured Chain of Thought

For really complex problems, give the AI a reasoning structure:

> "Analyze whether we should expand into the European market.
>
> Structure your analysis:
> 1. First, list the key factors to consider
> 2. For each factor, assess the opportunity and risk
> 3. Then weigh the factors against each other
> 4. Finally, give a recommendation with confidence level"`,
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

System prompts are instructions that shape the AI's entire behavior for a conversation. They're the "personality settings" of the AI.

## What Is a System Prompt?

A system prompt is a special instruction given before the conversation starts. It sets rules the AI follows throughout. In the ChatGPT API, it's the "system" message. In Claude, it's the system prompt. In custom GPTs, it's the "Instructions" field.

## Creating Effective Personas

### The Expert Consultant
> "You are a senior financial advisor with 20 years of experience helping small business owners. You explain complex financial concepts in simple terms. You always consider tax implications. When you don't know something, you say so and recommend consulting a CPA."

### The Strict Editor
> "You are a ruthless editor. Your job is to make writing shorter and clearer. Cut all fluff, jargon, and passive voice. Be direct in your feedback. If something is good, say so briefly. If something is bad, explain why and show the fix. Never add length — only remove it."

### The Socratic Teacher
> "You are a patient teacher who uses the Socratic method. Never give direct answers. Instead, ask guiding questions that lead the student to discover the answer themselves. Start with what they already know and build from there."

## System Prompt Components

1. **Identity**: Who the AI is
2. **Expertise**: What they know
3. **Behavior rules**: How they should act
4. **Constraints**: What they should NOT do
5. **Output preferences**: Format, tone, length
6. **Edge cases**: What to do in unusual situations

## Pro Tips

- Keep system prompts focused — don't try to cover every scenario
- Test your system prompts with adversarial inputs
- Include negative instructions ("Don't use jargon")
- Specify the audience ("Explain to a non-technical audience")
- Iterate — refine based on the outputs you get`,
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

Stop writing prompts from scratch. Use templates. Here are battle-tested frameworks you can use immediately.

## Template 1: The Mega Prompt

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

## Template 2: Before/After Transformer

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

## Template 3: Batch Processor

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

## Template 4: Critic/Improver

\`\`\`
Review the following [content type] and provide:
1. Three strengths
2. Three weaknesses
3. Specific, actionable improvements for each weakness
4. A revised version incorporating all improvements

[paste content]
\`\`\`

## Template 5: Decision Matrix

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

## How to Build Your Own Templates

1. Notice when you repeat similar prompts
2. Identify the variable parts (the stuff that changes)
3. Create a template with [placeholders]
4. Save it somewhere accessible (notes app, Notion, etc.)
5. Iterate — improve the template based on results`,
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

Even experienced AI users make these errors. Learn to spot and fix them.

## Mistake 1: Being Too Vague
**Bad**: "Help me with sales"
**Fix**: "Create a cold outreach email template for selling our B2B accounting software to CFOs at mid-size companies (100-500 employees)"

## Mistake 2: Asking Multiple Unrelated Things
**Bad**: "Write me a blog post about AI, also fix this Python code, and what's the weather?"
**Fix**: One prompt per task. Or explicitly separate them: "I have 3 unrelated requests. Please address each separately."

## Mistake 3: Not Specifying Format
**Bad**: "Give me marketing ideas"
**Fix**: "Give me 10 marketing ideas for a local bakery, formatted as a numbered list with a one-sentence explanation for each"

## Mistake 4: Forgetting the Audience
**Bad**: "Explain machine learning"
**Fix**: "Explain machine learning to a small business owner who has no technical background, using everyday analogies"

## Mistake 5: Not Iterating
Many people take the first output and give up if it's not perfect. AI conversations are iterative.

**First prompt**: [Get initial output]
**Follow-up**: "Good start, but make it more concise and add specific dollar amounts"
**Follow-up**: "Perfect. Now adapt this for an email format instead of a report"

## Mistake 6: Overloading Context
Don't paste 50 pages and say "summarize this." Instead:
- Break large documents into sections
- Tell the AI what to focus on
- Ask specific questions rather than open-ended ones

## Mistake 7: Anthropomorphizing
**Bad**: "I hope you're having a good day! I was wondering if maybe you could possibly help me..."
**Fix**: Just state what you need. The AI doesn't have feelings and politeness tokens cost money (though being respectful is fine).

## Mistake 8: Not Verifying
Taking AI output at face value without checking facts, calculations, or code. Always verify anything you'll act on.`,
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

Single prompts are great. But chaining prompts together? That's where the real power is.

## What Is Prompt Chaining?

Prompt chaining means using the output of one prompt as the input for the next. Each step builds on the previous one.

## Example: Blog Post Pipeline

### Step 1 — Research
> "List the top 10 trends in remote work for 2025 based on your training data. For each trend, provide a one-sentence summary and why it matters."

### Step 2 — Outline (uses Step 1 output)
> "Based on these trends, create a blog post outline targeting HR managers. Include an intro hook, 5 main sections (choose the most compelling trends), and a conclusion with action items."

### Step 3 — Draft (uses Step 2 output)
> "Write the full blog post from this outline. Target 1,500 words. Tone: authoritative but accessible. Include a statistic or data point in each section."

### Step 4 — Edit (uses Step 3 output)
> "Review this draft as a strict editor. Cut 20% of the word count while keeping all key points. Remove any fluff, clichés, or weak transitions."

### Step 5 — SEO (uses Step 4 output)
> "Optimize this post for SEO. Add: a meta description (under 155 characters), 5 suggested keywords, alt text suggestions for 3 images, and internal linking opportunities."

## Why Chain Instead of One Big Prompt?

1. **Better quality**: Each step gets focused attention
2. **Easier debugging**: If Step 3 output is bad, you only redo Step 3
3. **Flexibility**: You can branch or modify any step
4. **Token efficiency**: Each step uses a fresh context window
5. **Human-in-the-loop**: You can review and adjust between steps

## Chaining Patterns

| Pattern | Description | Example |
|---------|-------------|---------|
| **Linear** | Step 1 → 2 → 3 | Blog post pipeline |
| **Fan-out** | One input → multiple parallel outputs | Generate 5 variations |
| **Fan-in** | Multiple inputs → one synthesis | Combine research from multiple prompts |
| **Loop** | Output feeds back as input | Iterative improvement until quality threshold met |

## Building Your First Chain

1. Identify the end goal
2. Break it into 3-5 distinct sub-tasks
3. Write a prompt for each sub-task
4. Test each step independently
5. Connect them by passing outputs as inputs
6. Iterate on the weakest link`,
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
