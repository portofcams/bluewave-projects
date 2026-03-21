import { Wave } from './curriculum-types';

export const wave1: Wave = {
  id: 'wave-1',
  number: 1,
  title: 'AI Foundations',
  subtitle: 'Your AI Journey Begins',
  description: 'Understand what AI is, how it works, and the landscape of tools available to you. Build a solid mental model before diving into hands-on work.',
  color: '#0ea5e9',
  icon: 'brain',
  weekRange: 'Week 1-2',
  totalXP: 0,
  units: [
    {
      id: 'w1-u1',
      waveId: 'wave-1',
      title: 'Understanding AI',
      description: 'The big picture of artificial intelligence',
      order: 1,
      lessons: [
        {
          id: 'w1-u1-l1',
          waveId: 'wave-1',
          unitId: 'w1-u1',
          title: 'What is Artificial Intelligence?',
          description: 'A clear, jargon-free introduction to AI and why it matters right now.',
          duration: '8 min',
          difficulty: 'beginner',
          xp: 15,
          order: 1,
          content: `# What is Artificial Intelligence?

Artificial Intelligence (AI) is software that can perform tasks that normally require human intelligence — things like understanding language, recognizing images, making decisions, and generating new content.

But here's the thing most people get wrong: AI isn't new. It's been around since the 1950s. What *is* new is how shockingly useful it's become — practically overnight.

:::key
AI is not a sentient being. It's a tool — like a calculator for language. It doesn't "think" or "want" anything. It predicts the most likely helpful response based on patterns in data.
:::

## A Brief Timeline

- **1950s**: Alan Turing asks "Can machines think?" — the Turing Test is born
- **1960s-80s**: Expert systems — rules-based AI that could answer narrow questions
- **1990s-2000s**: Machine learning takes off — AI learns from data instead of rules
- **2010s**: Deep learning revolution — neural networks with many layers
- **2020s**: Large Language Models (ChatGPT, Claude, Gemini) — AI that truly converses

Notice the pattern: each era built on the last. We didn't jump from nothing to ChatGPT. It took 70 years of compounding breakthroughs.

---

## The AI You Use Today

Modern AI isn't a sentient robot. It's a **prediction engine**. When you type a message to ChatGPT or Claude, the AI is predicting the most helpful next words based on patterns it learned from enormous amounts of text.

Think of it like autocomplete on steroids. Your phone suggests the next word; AI suggests the next *paragraph* — and it's remarkably good at it.

:::example
You type: "Write me a professional email declining a meeting"

The AI doesn't *understand* what a meeting is or why you're declining. It has seen millions of polite decline emails in its training data, so it predicts what a helpful decline email looks like — word by word, sentence by sentence.

The result? A perfectly professional email in 3 seconds that would have taken you 10 minutes to write.
:::

## Why Now?

Three things converged at the same time, creating a perfect storm:

1. **Data** — The internet created trillions of pages of text to learn from
2. **Compute** — GPUs became powerful enough to train massive models
3. **Algorithms** — The Transformer architecture (2017) was a breakthrough

Without *all three*, none of this works. Remove the data, and the AI has nothing to learn from. Remove the compute, and training takes centuries. Remove the algorithm, and the AI can't make sense of what it reads.

:::tip
You don't need to understand how AI works internally to use it well. But knowing it's a prediction engine helps you write better prompts. If you give it vague input, it predicts vague output. Give it specific input, and it predicts specific, useful output. You'll master this in Wave 2.
:::

---

## Key Takeaway

AI is a tool, not magic. It has incredible strengths (speed, consistency, breadth of knowledge) and real limitations (it can be wrong, it can't truly "understand," it reflects biases in training data). Throughout this course, you'll learn to leverage the strengths and guard against the weaknesses.

:::warning
AI can sound extremely confident while being completely wrong. This is called **hallucination** — and it's the single most important limitation to understand. Never blindly trust AI output for facts, citations, or numbers. Always verify. We'll cover this in depth in Lesson 6.
:::`,
          exercises: [
            {
              id: 'w1-u1-l1-e1',
              type: 'quiz',
              question: 'What is the best way to think about modern AI like ChatGPT or Claude?',
              options: [
                'A sentient being that understands everything',
                'A very advanced prediction engine trained on text patterns',
                'A simple database that looks up answers',
                'A rule-based system with if/then statements'
              ],
              correctAnswer: 1,
              xpBonus: 5,
            },
            {
              id: 'w1-u1-l1-e2',
              type: 'quiz',
              question: 'Which breakthrough in 2017 enabled the current generation of AI?',
              options: [
                'The invention of GPUs',
                'The Turing Test',
                'The Transformer architecture',
                'The creation of Wikipedia'
              ],
              correctAnswer: 2,
              xpBonus: 5,
            },
            {
              id: 'w1-u1-l1-e3',
              type: 'free-response',
              question: 'In your own words, explain to a friend what AI is and isn\'t. Keep it to 2-3 sentences.',
              hint: 'Focus on the "prediction engine" concept and mention at least one limitation.',
              xpBonus: 10,
            }
          ]
        },
        {
          id: 'w1-u1-l2',
          waveId: 'wave-1',
          unitId: 'w1-u1',
          title: 'How Large Language Models Work',
          description: 'Peek under the hood of ChatGPT and Claude — no PhD required.',
          duration: '12 min',
          difficulty: 'beginner',
          xp: 20,
          order: 2,
          content: `# How Large Language Models Work

You don't need to be a data scientist to understand LLMs. Here's the simplified version — and once you get this, everything else in this course makes more sense.

## Training: Reading the Internet

An LLM is trained by reading billions of pages of text — books, websites, articles, code, conversations. During training, it learns **patterns**: what words tend to follow other words, how sentences are structured, what facts are commonly stated.

It doesn't memorize pages verbatim. Instead, it builds a statistical model of language — a compressed understanding of how humans communicate.

:::key
Think of training like this: imagine reading every book, every Wikipedia article, every forum post ever written. You wouldn't memorize them word-for-word, but you'd develop an incredibly rich sense of how language works, what topics relate to each other, and what good writing looks like. That's what the AI has — but at superhuman scale.
:::

---

## The Transformer Architecture

The key innovation is called **attention**. When processing your prompt, the model pays "attention" to which words relate to other words.

:::example
In the sentence "The cat sat on the mat because **it** was tired," the model learns that "it" refers to "the cat," not "the mat."

This seems obvious to you, but for a computer to figure this out automatically — across millions of sentences — was a massive breakthrough.
:::

This ability to track relationships across long passages is what makes modern AI so capable. Before Transformers (2017), AI could barely handle a single paragraph. Now it can reason across 100,000+ words.

---

## How It Generates Responses

When you send a message, the AI follows these steps:

1. **Tokenizes** your input (breaks it into pieces called tokens)
2. **Processes** the tokens through dozens of layers of the neural network
3. **Predicts** the most likely next token
4. **Repeats** — generating one token at a time until the response is complete

Each token generation considers the entire conversation so far. That's why AI can stay on topic across long chats.

:::tip
The AI generates its response **one word at a time**, from left to right. When you see it "typing" in ChatGPT, that's not a display trick — it's literally deciding each word as it goes. This is why the beginning of a response influences the rest. If the AI starts down a wrong path, the rest of the answer follows that path. You can fix this by saying "Wait, let's reconsider" and it will start fresh.
:::

---

## Important Mental Model

The AI doesn't "know" things the way you do. It has learned statistical associations. When it says "Paris is the capital of France," it's not recalling a fact from memory — it's producing the tokens that most naturally follow the pattern of the conversation.

:::warning
This is why AI can be **confidently wrong** (called hallucination). The statistically likely response isn't always the correct one. The AI has no way to flag "I'm not sure about this" — it just produces whatever tokens are most probable. Always verify facts, especially numbers, dates, and citations.
:::

## Parameters and Model Size

| Model | Parameters | Context Window | Released |
|-------|-----------|---------------|----------|
| GPT-3.5 | 175 billion | 16K tokens | 2022 |
| GPT-4 | ~1.7 trillion | 128K tokens | 2023 |
| Claude 3.5 | Undisclosed | 200K tokens | 2024 |
| Gemini 1.5 | Undisclosed | 1M tokens | 2024 |

**Parameters** are the "knobs" the model adjusts during training. More parameters generally means more capability, but also more cost to run.

:::tip
You don't need to memorize these numbers. The key insight: models are getting bigger, faster, and cheaper every 6-12 months. Whatever limitations you hit today will likely be gone within a year. Focus on learning the *skills* of working with AI — those transfer across every model upgrade.
:::`,
          exercises: [
            {
              id: 'w1-u1-l2-e1',
              type: 'quiz',
              question: 'What is a "token" in the context of LLMs?',
              options: [
                'A piece of text (word or word fragment) the model processes',
                'A cryptocurrency used to pay for AI',
                'A security credential',
                'A type of neural network layer'
              ],
              correctAnswer: 0,
              xpBonus: 5,
            },
            {
              id: 'w1-u1-l2-e2',
              type: 'quiz',
              question: 'Why do AI models sometimes "hallucinate" (state incorrect things confidently)?',
              options: [
                'They are trying to deceive users',
                'The statistically likely response isn\'t always factually correct',
                'They run out of memory',
                'They can only access information from 2020'
              ],
              correctAnswer: 1,
              xpBonus: 5,
            },
            {
              id: 'w1-u1-l2-e3',
              type: 'prompt-challenge',
              question: 'Ask an AI to explain how it generates text, then compare its answer to what you learned in this lesson. Did it get anything wrong or oversimplified?',
              hint: 'Pay attention to whether it claims to "understand" or "think" — those are simplifications.',
              xpBonus: 15,
            }
          ]
        },
        {
          id: 'w1-u1-l3',
          waveId: 'wave-1',
          unitId: 'w1-u1',
          title: 'The AI Tool Landscape',
          description: 'ChatGPT vs Claude vs Gemini — what\'s different and when to use each.',
          duration: '10 min',
          difficulty: 'beginner',
          xp: 15,
          order: 3,
          content: `# The AI Tool Landscape

There are now dozens of AI tools, but a few dominate. Here's your field guide.

## The Big Three Text Models

### ChatGPT (OpenAI)
- **Best for**: General tasks, creative writing, coding, image generation (DALL-E built in)
- **Models**: GPT-4o (fast + smart), GPT-4 (most capable), GPT-3.5 (fast, less capable)
- **Pricing**: Free tier available, Plus at $20/month
- **Standout**: Huge plugin ecosystem, custom GPTs, image generation

### Claude (Anthropic)
- **Best for**: Long documents, analysis, careful reasoning, coding
- **Models**: Claude 3.5 Sonnet (fast), Claude 3 Opus (most capable)
- **Pricing**: Free tier, Pro at $20/month
- **Standout**: 200K token context window, excellent at following complex instructions

### Gemini (Google)
- **Best for**: Integration with Google Workspace, multimodal tasks
- **Models**: Gemini Pro, Gemini Ultra
- **Pricing**: Free tier, Advanced at $20/month
- **Standout**: Deep Google integration, strong at research tasks

## Specialized AI Tools

| Category | Tools | Use Case |
|----------|-------|----------|
| **Image Generation** | Midjourney, DALL-E, Stable Diffusion | Creating images from text |
| **Video** | Runway, Sora, Kling | AI video generation |
| **Music** | Suno, Udio | AI music creation |
| **Code** | GitHub Copilot, Cursor, Claude Code | AI-assisted programming |
| **Search** | Perplexity, Google AI Overview | AI-enhanced search |
| **Writing** | Jasper, Copy.ai, Grammarly | Content and copywriting |
| **Voice** | ElevenLabs, Play.ht | Text-to-speech |

## How to Choose

1. **Try all three** major models with the same prompt — you'll notice different styles
2. **Use Claude** for analysis, long documents, and careful reasoning
3. **Use ChatGPT** for creative tasks and when you need plugins/image gen
4. **Use Gemini** when you're already in the Google ecosystem
5. **Don't marry one tool** — the landscape changes monthly`,
          exercises: [
            {
              id: 'w1-u1-l3-e1',
              type: 'quiz',
              question: 'Which AI model is known for having the largest context window (ability to process long documents)?',
              options: ['ChatGPT', 'Claude', 'Gemini', 'Midjourney'],
              correctAnswer: 1,
              xpBonus: 5,
            },
            {
              id: 'w1-u1-l3-e2',
              type: 'prompt-challenge',
              question: 'Take this prompt and send it to two different AI tools: "Explain quantum computing to a 10-year-old in exactly 3 sentences." Compare the responses. Which felt more natural?',
              hint: 'Notice differences in tone, accuracy, and how well each followed the constraints.',
              xpBonus: 15,
            },
            {
              id: 'w1-u1-l3-e3',
              type: 'matching',
              question: 'Which category does Midjourney belong to?',
              options: ['Text Generation', 'Image Generation', 'Code Assistance', 'Voice Synthesis'],
              correctAnswer: 1,
              xpBonus: 5,
            }
          ]
        }
      ]
    },
    {
      id: 'w1-u2',
      waveId: 'wave-1',
      title: 'Core Concepts',
      description: 'The technical vocabulary you need to speak AI fluently',
      order: 2,
      lessons: [
        {
          id: 'w1-u2-l1',
          waveId: 'wave-1',
          unitId: 'w1-u2',
          title: 'Tokens, Context Windows & Temperature',
          description: 'The three numbers that control everything about AI behavior.',
          duration: '10 min',
          difficulty: 'beginner',
          xp: 20,
          order: 1,
          content: `# Tokens, Context Windows & Temperature

These three concepts control how AI works. Understanding them makes you a dramatically better AI user.

## Tokens: The Currency of AI

A **token** is a piece of text — roughly 3/4 of a word in English. The sentence "I love artificial intelligence" is about 5 tokens.

Why tokens matter:
- **Cost**: API pricing is per token (input + output)
- **Speed**: More tokens = slower responses
- **Limits**: Every model has a maximum token limit

Quick estimates:
- 1 token ≈ 4 characters in English
- 100 tokens ≈ 75 words
- 1,000 tokens ≈ 750 words (about 1.5 pages)

## Context Window: AI's Working Memory

The **context window** is the total number of tokens the AI can "see" at once — your prompt plus its response combined.

| Model | Context Window |
|-------|---------------|
| GPT-3.5 | 16K tokens (~12K words) |
| GPT-4o | 128K tokens (~96K words) |
| Claude 3.5 | 200K tokens (~150K words) |
| Gemini 1.5 | Up to 1M tokens |

When you exceed the context window, the AI literally can't see the beginning of your conversation anymore. It's like having a conversation where the other person forgets what you said 20 minutes ago.

**Pro tip**: Start new conversations for new topics. Don't let context get polluted.

## Temperature: Creativity vs Precision

**Temperature** controls randomness in responses (0.0 to 2.0):
- **0.0**: Deterministic — same input gives same output. Best for facts, code, data.
- **0.7**: Balanced — the default for most tools. Good for general use.
- **1.0+**: Creative — more varied and unexpected. Good for brainstorming, fiction.
- **2.0**: Maximum chaos — often incoherent.

Most chat interfaces don't let you set temperature directly, but API users and developers should know this.`,
          exercises: [
            {
              id: 'w1-u2-l1-e1',
              type: 'quiz',
              question: 'Approximately how many words can fit in Claude\'s 200K token context window?',
              options: ['15,000 words', '50,000 words', '150,000 words', '500,000 words'],
              correctAnswer: 2,
              xpBonus: 5,
            },
            {
              id: 'w1-u2-l1-e2',
              type: 'quiz',
              question: 'What temperature setting would you use for generating a creative short story?',
              options: ['0.0', '0.3', '0.7-1.0', '2.0'],
              correctAnswer: 2,
              xpBonus: 5,
            },
            {
              id: 'w1-u2-l1-e3',
              type: 'fill-blank',
              question: 'When you exceed the context window, the AI loses the ability to see the _______ of your conversation.',
              correctAnswer: 'beginning',
              xpBonus: 5,
            }
          ]
        },
        {
          id: 'w1-u2-l2',
          waveId: 'wave-1',
          unitId: 'w1-u2',
          title: 'Your First AI Conversation',
          description: 'Hands-on: have a structured conversation and analyze what works.',
          duration: '15 min',
          difficulty: 'beginner',
          xp: 25,
          order: 2,
          content: `# Your First AI Conversation

Time to get hands-on. This lesson is about having a real conversation with AI and learning from it.

## The Anatomy of a Good First Message

Bad first message:
> "Help me"

Good first message:
> "I'm a small business owner who runs a bakery. I need help writing a professional email to a supplier who delivered damaged goods. The tone should be firm but polite."

The difference? **Context, specificity, and constraints**.

## Exercise: The Three-Prompt Challenge

Try these three prompts with any AI tool and observe the difference in quality:

### Prompt 1: Vague
> "Write an email"

### Prompt 2: Specific
> "Write a professional email to a client named Sarah, thanking her for choosing our web design agency and outlining the next steps in our project timeline."

### Prompt 3: Detailed
> "Write a professional email to a client named Sarah, thanking her for choosing our web design agency. Include:
> - A warm but professional tone
> - Mention the project: redesigning her restaurant website
> - Outline 3 next steps with approximate timelines
> - End with a clear call to action
> - Keep it under 200 words"

## What You'll Notice

- Prompt 1 produces generic garbage
- Prompt 2 produces something usable
- Prompt 3 produces something you could send as-is

**The lesson**: The quality of AI output is directly proportional to the quality of your input. This is the #1 rule of working with AI.

## Conversation Tips

1. **Be specific** — Don't make the AI guess what you want
2. **Give context** — Who are you? What's the situation?
3. **Set constraints** — Word count, tone, format, audience
4. **Iterate** — "Make it more formal" or "Add a bullet point about pricing"
5. **Say what you DON'T want** — "Don't use jargon" or "No emojis"`,
          exercises: [
            {
              id: 'w1-u2-l2-e1',
              type: 'prompt-challenge',
              question: 'Send all three versions of the email prompt (vague, specific, detailed) to an AI tool. Rate each output 1-10 for usefulness. What pattern do you notice?',
              hint: 'The detailed prompt should score significantly higher. Note how much time the extra 30 seconds of writing a better prompt saves you in editing.',
              xpBonus: 20,
            },
            {
              id: 'w1-u2-l2-e2',
              type: 'free-response',
              question: 'Write a detailed prompt asking AI to help you with something from your real life or work. Include: context about who you are, the specific task, at least 2 constraints, and the desired format.',
              hint: 'Think about an email you need to write, a document you need to draft, or a problem you need to solve.',
              xpBonus: 15,
            }
          ]
        },
        {
          id: 'w1-u2-l3',
          waveId: 'wave-1',
          unitId: 'w1-u2',
          title: 'AI Ethics & Limitations',
          description: 'What AI gets wrong, where it\'s biased, and how to use it responsibly.',
          duration: '10 min',
          difficulty: 'beginner',
          xp: 20,
          order: 3,
          content: `# AI Ethics & Limitations

AI is powerful, but it comes with real risks. Being an effective AI user means knowing the boundaries.

## Known Limitations

### 1. Hallucinations
AI confidently states things that are completely false. It doesn't "know" when it's wrong because it's generating statistically likely text, not looking up facts.

**Real examples of hallucinations:**
- Citing academic papers that don't exist
- Making up court case precedents (this got a lawyer sanctioned)
- Providing incorrect code that looks correct
- Fabricating statistics

**Defense**: Always verify facts, especially for anything you'll publish or act on.

### 2. Training Data Cutoff
Most models have a knowledge cutoff date. They don't know about events after their training data was collected.

**Defense**: For current events or recent information, use AI search tools (Perplexity) or verify with up-to-date sources.

### 3. Bias
AI reflects biases in its training data. This can manifest as:
- Gender stereotypes (assuming doctors are male, nurses are female)
- Cultural bias (defaulting to Western/American perspectives)
- Representation gaps (performing worse for underrepresented groups)

**Defense**: Be aware, review outputs critically, and explicitly ask for diverse perspectives.

## Ethical Guidelines

### DO:
- Disclose AI use when appropriate (especially in academic or professional settings)
- Verify important claims before acting on them
- Use AI to augment your work, not replace your judgment
- Protect sensitive data — don't paste passwords, SSNs, or private medical info

### DON'T:
- Submit AI-generated work as entirely your own in contexts where that's dishonest
- Use AI to generate misinformation or deceptive content
- Blindly trust AI for medical, legal, or financial advice
- Share others' private information with AI tools

## The Copyright Question
AI-generated content occupies a legal gray area. Currently:
- You generally can't copyright purely AI-generated content
- Using AI as a tool in your creative process is fine
- The law is evolving rapidly — stay informed`,
          exercises: [
            {
              id: 'w1-u2-l3-e1',
              type: 'quiz',
              question: 'A lawyer was sanctioned for using AI because:',
              options: [
                'AI is illegal to use in legal work',
                'The AI fabricated court case citations that didn\'t exist',
                'The AI gave incorrect legal advice',
                'Using AI violated attorney-client privilege'
              ],
              correctAnswer: 1,
              xpBonus: 5,
            },
            {
              id: 'w1-u2-l3-e2',
              type: 'prompt-challenge',
              question: 'Ask AI: "Who won the Nobel Prize in Literature last year?" and then verify the answer with a web search. Was the AI correct?',
              hint: 'This tests the training data cutoff. The AI may give an outdated or fabricated answer.',
              xpBonus: 10,
            },
            {
              id: 'w1-u2-l3-e3',
              type: 'quiz',
              question: 'Which is the BEST practice when using AI for work?',
              options: [
                'Trust all AI outputs without verification',
                'Never use AI for anything important',
                'Use AI to augment your work and verify important claims',
                'Only use AI for creative writing'
              ],
              correctAnswer: 2,
              xpBonus: 5,
            }
          ]
        },
        {
          id: 'w1-u2-l4',
          waveId: 'wave-1',
          unitId: 'w1-u2',
          title: 'When to Use AI (And When Not To)',
          description: 'A decision framework for knowing when AI is the right tool.',
          duration: '8 min',
          difficulty: 'beginner',
          xp: 15,
          order: 4,
          content: `# When to Use AI (And When Not To)

Not every problem needs AI. Here's a practical framework.

## The AI Decision Matrix

### GREAT for AI ✅
- **Drafting**: First drafts of emails, reports, content
- **Brainstorming**: Generating ideas, alternatives, perspectives
- **Summarizing**: Condensing long documents into key points
- **Explaining**: Breaking down complex topics into simple terms
- **Reformatting**: Converting data between formats
- **Research starting points**: Getting an overview before deep diving
- **Repetitive text tasks**: Form letters, templates, variations
- **Code scaffolding**: Boilerplate code, common patterns

### OKAY for AI (with verification) ⚠️
- Factual research (always verify)
- Technical documentation
- Data analysis (check the math)
- Translation (have a native speaker review)
- Legal/medical information (always consult a professional)

### NOT for AI ❌
- **Final decisions**: AI can inform, not decide
- **Sensitive data processing**: Don't paste passwords, private health info, or financial details into public AI tools
- **Emotional support replacement**: AI can't truly empathize
- **Real-time information**: Stock prices, live events, breaking news
- **Anything requiring accountability**: If someone could get hurt, a human needs to be in the loop

## The 10-Second Test

Before using AI, ask yourself:
1. **Would a wrong answer cause harm?** If yes, verify everything.
2. **Does it need to be current?** If yes, use AI + real-time sources.
3. **Is this sensitive data?** If yes, use enterprise/private AI tools only.
4. **Am I replacing my judgment?** If yes, step back.

## The Sweet Spot

AI is best as a **force multiplier** — it makes you 2-10x faster at tasks you already know how to do. It's weakest when you're relying on it for tasks you can't evaluate yourself.

The best AI users aren't the ones who use it for everything. They're the ones who know **exactly when** to reach for it.`,
          exercises: [
            {
              id: 'w1-u2-l4-e1',
              type: 'quiz',
              question: 'Which task is AI BEST suited for?',
              options: [
                'Making a final hiring decision',
                'Drafting a first version of a marketing email',
                'Providing real-time stock prices',
                'Diagnosing a medical condition'
              ],
              correctAnswer: 1,
              xpBonus: 5,
            },
            {
              id: 'w1-u2-l4-e2',
              type: 'free-response',
              question: 'List 5 tasks from your daily work or life where AI could save you time. For each one, rate it Green (great for AI), Yellow (okay with verification), or Red (not for AI).',
              hint: 'Think about emails, research, scheduling, content creation, data entry, etc.',
              xpBonus: 15,
            }
          ]
        }
      ]
    }
  ]
};

// Calculate totalXP
wave1.totalXP = wave1.units.reduce((sum, unit) =>
  sum + unit.lessons.reduce((lSum, lesson) =>
    lSum + lesson.xp + lesson.exercises.reduce((eSum, ex) => eSum + ex.xpBonus, 0), 0), 0);
