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

There are now dozens of AI tools available, and the number grows every month. It can feel overwhelming, but here is the good news: you only need to understand a handful of major players to get started. Think of this lesson as your field guide -- a map of the terrain so you know where to go when you need something specific.

:::key
No single AI tool is "the best" at everything. Each model has distinct strengths. The most effective AI users keep two or three tools in their toolkit and reach for the right one depending on the task.
:::

---

## The Big Three Text Models

These are the general-purpose AI assistants you will use most often. All three are excellent, but they each have a different personality and set of strengths.

### ChatGPT (OpenAI)
- **Best for**: General tasks, creative writing, coding, image generation (DALL-E built in)
- **Models**: GPT-4o (fast + smart), GPT-4 (most capable), GPT-3.5 (fast, less capable)
- **Pricing**: Free tier available, Plus at $20/month
- **Standout**: Huge plugin ecosystem, custom GPTs, image generation

ChatGPT is the household name. It was the first AI chatbot to break into mainstream awareness, and it still has the largest ecosystem of third-party plugins and custom-built "GPTs" that extend its abilities. If you want one tool that does a little bit of everything -- including generating images on the fly -- ChatGPT is a strong default.

### Claude (Anthropic)
- **Best for**: Long documents, analysis, careful reasoning, coding
- **Models**: Claude 3.5 Sonnet (fast), Claude 3 Opus (most capable)
- **Pricing**: Free tier, Pro at $20/month
- **Standout**: 200K token context window, excellent at following complex instructions

Claude shines when you need to work with long, complex material. Its 200K token context window means you can paste an entire 150-page document and ask questions about it. It also tends to follow detailed, multi-step instructions more faithfully than its competitors, which makes it a favorite for professional work.

### Gemini (Google)
- **Best for**: Integration with Google Workspace, multimodal tasks
- **Models**: Gemini Pro, Gemini Ultra
- **Pricing**: Free tier, Advanced at $20/month
- **Standout**: Deep Google integration, strong at research tasks

If you live inside Google Workspace -- Gmail, Docs, Sheets, Calendar -- Gemini is the natural choice because it plugs directly into those tools. It is also particularly strong at multimodal tasks (working with images and text together) and research-style queries where you need grounded, cited answers.

:::example
Try sending the same prompt to all three: "Explain the pros and cons of remote work for a company with 50 employees, in a table format."

You will notice each model has a slightly different style. ChatGPT tends toward creative, conversational phrasing. Claude tends toward thorough, carefully structured output. Gemini tends to cite sources and emphasize factual grounding. Neither style is "better" -- it depends on what you need.
:::

---

## Specialized AI Tools

Beyond the big three text models, there is a rapidly growing ecosystem of tools built for specific tasks. You do not need all of these right now, but it helps to know they exist so you can reach for them when the moment is right.

| Category | Tools | Use Case |
|----------|-------|----------|
| **Image Generation** | Midjourney, DALL-E, Stable Diffusion | Creating images from text |
| **Video** | Runway, Sora, Kling | AI video generation |
| **Music** | Suno, Udio | AI music creation |
| **Code** | GitHub Copilot, Cursor, Claude Code | AI-assisted programming |
| **Search** | Perplexity, Google AI Overview | AI-enhanced search |
| **Writing** | Jasper, Copy.ai, Grammarly | Content and copywriting |
| **Voice** | ElevenLabs, Play.ht | Text-to-speech |

:::tip
If you are just starting out, ignore the specialized tools for now. Master one of the big three text models first. Once you are comfortable having productive AI conversations, the specialized tools will make much more sense -- and you will know which ones actually solve problems you have, rather than chasing shiny objects.
:::

---

## How to Choose

Here is a practical decision-making framework you can use right now:

1. **Try all three** major models with the same prompt -- you will notice different styles and can pick the one that resonates with your workflow
2. **Use Claude** for analysis, long documents, and careful reasoning
3. **Use ChatGPT** for creative tasks and when you need plugins or image generation
4. **Use Gemini** when you are already in the Google ecosystem and want tight integration
5. **Don't marry one tool** -- the landscape changes monthly, and today's underdog might be tomorrow's leader

:::warning
The AI landscape moves fast. Models get updated, pricing changes, and entirely new tools launch every few weeks. Any specific comparison you read (including this one) has a shelf life. Build the habit of testing new models when they launch rather than assuming your current favorite is still the best. The skills you learn in this course transfer across every tool.
:::`,
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

These three concepts are the invisible machinery behind every AI interaction. You do not need to memorize the technical details, but understanding what they are -- and how they affect your results -- will make you a dramatically better AI user. Think of this lesson as learning the controls of a car before you start driving.

:::key
Tokens, context windows, and temperature are the three numbers that govern every AI conversation. Tokens determine cost and length. The context window determines how much the AI can "remember." Temperature determines how creative or precise the output is.
:::

---

## Tokens: The Currency of AI

A **token** is a piece of text -- roughly 3/4 of a word in English. The sentence "I love artificial intelligence" is about 5 tokens. Longer or more unusual words get split into multiple tokens, while short common words are often a single token.

Why tokens matter in practice:
- **Cost**: API pricing is per token (input + output). A lengthy conversation can cost real money if you are using the API directly.
- **Speed**: More tokens means slower responses. If you have ever noticed the AI taking longer on a complicated request, token count is usually the reason.
- **Limits**: Every model has a maximum token limit for a single interaction. Hit the ceiling, and the AI starts "forgetting" the start of your conversation.

Quick estimates to keep in your head:
- 1 token is roughly 4 characters in English
- 100 tokens is roughly 75 words
- 1,000 tokens is roughly 750 words (about 1.5 pages of a document)
- A typical back-and-forth conversation uses 2,000-5,000 tokens

:::example
Imagine you paste a 20-page contract into Claude and ask it to summarize the key terms. That contract is roughly 13,000 tokens of input. Claude's response might be another 500 tokens. Total: around 13,500 tokens consumed from the context window for that single exchange. If you then ask follow-up questions, each new message adds more tokens to the running total.
:::

---

## Context Window: AI's Working Memory

The **context window** is the total number of tokens the AI can "see" at once -- your entire conversation history (every message you sent and every response the AI gave) all has to fit inside this window.

| Model | Context Window |
|-------|---------------|
| GPT-3.5 | 16K tokens (~12K words) |
| GPT-4o | 128K tokens (~96K words) |
| Claude 3.5 | 200K tokens (~150K words) |
| Gemini 1.5 | Up to 1M tokens |

When you exceed the context window, the AI literally cannot see the beginning of your conversation anymore. It is like having a conversation where the other person gradually forgets everything you said earlier. You might reference something from your first message, and the AI will have no idea what you are talking about.

:::tip
Start new conversations for new topics. Do not let context get polluted with unrelated back-and-forth. If you have been going back and forth on a marketing email and then want to switch to a coding question, open a fresh chat. You will get better results because the AI is not distracted by irrelevant context, and you will conserve your token budget.
:::

---

## Temperature: Creativity vs Precision

**Temperature** controls the randomness of the AI's word choices. It is a number that typically ranges from 0.0 to 2.0, and it fundamentally changes the character of the output.

- **0.0**: Deterministic -- same input gives the same output every time. Best for facts, code, and data extraction where you want consistency.
- **0.7**: Balanced -- the default setting for most chat tools. Good for general use where you want helpful, varied responses.
- **1.0+**: Creative -- more varied and unexpected word choices. Good for brainstorming, creative fiction, generating alternative phrasings.
- **2.0**: Maximum randomness -- often produces incoherent or bizarre output. Rarely useful in practice.

Most chat interfaces (ChatGPT, Claude, Gemini) do not let you set temperature directly -- they use a sensible default behind the scenes. But if you use the API or tools like Cursor or the OpenAI Playground, you will see temperature as a setting you can adjust.

:::warning
Low temperature does not mean "more accurate." It means "more predictable." An AI can be consistently wrong at temperature 0.0 just as easily as it can be at 1.0. Temperature controls randomness in word selection, not factual accuracy. Always verify important claims regardless of the temperature setting.
:::`,
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

Time to get hands-on. Reading about AI is useful, but actually *using* it is where the learning happens. This lesson walks you through your first structured AI conversation and shows you, concretely, how the quality of your input determines the quality of your output.

:::key
The single most important skill in working with AI is learning how to communicate clearly with it. This is not about memorizing magic words -- it is about the same skills that make you a good communicator with humans: being specific, giving context, and stating what you actually want.
:::

---

## The Anatomy of a Good First Message

Your first message sets the tone for the entire conversation. A vague opening leads to a vague response, and then you spend five messages trying to steer the AI toward what you actually wanted. A clear opening gets you 80% of the way there on the first try.

Bad first message:
> "Help me"

Good first message:
> "I'm a small business owner who runs a bakery. I need help writing a professional email to a supplier who delivered damaged goods. The tone should be firm but polite."

The difference? **Context** (who you are and the situation), **specificity** (the exact task), and **constraints** (the tone). Those three ingredients transform AI from a frustrating guessing game into a genuinely useful assistant.

---

## Exercise: The Three-Prompt Challenge

This exercise makes the point better than any explanation could. Try these three prompts with any AI tool and pay close attention to how the output quality changes with each version:

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

:::example
Here is what typically happens:

**Prompt 1** produces a generic, lifeless email addressed to no one in particular, about nothing specific. You would never send it.

**Prompt 2** produces something recognizably useful -- it mentions Sarah, it mentions web design -- but the tone might be off, the length might be wrong, and the content is still fairly generic.

**Prompt 3** produces something you could copy, paste, and send with minimal editing. The 30 extra seconds you spent writing a better prompt saved you 10 minutes of rewriting.
:::

## What This Teaches You

The quality of AI output is directly proportional to the quality of your input. This is the number one rule of working with AI, and it applies to every model, every task, and every use case. We will build on this principle throughout the entire course, but burn it into your memory now: **garbage in, garbage out. Clarity in, clarity out.**

---

## Conversation Tips

These five habits will immediately improve every AI interaction you have:

1. **Be specific** -- Do not make the AI guess what you want. "Write a 200-word product description for a waterproof hiking boot" beats "Write about a product."
2. **Give context** -- Who are you? Who is the audience? What is the situation? The AI cannot read your mind, so paint the picture.
3. **Set constraints** -- Word count, tone, format, audience level. Constraints are not limiting -- they are *focusing*. They help the AI narrow in on exactly what you need.
4. **Iterate** -- Your first result is rarely your final result. Say "Make it more formal" or "Add a bullet point about pricing" or "Shorten the second paragraph." Treat the AI like a collaborator, not a vending machine.
5. **Say what you DON'T want** -- "Don't use jargon" or "Avoid cliches" or "No bullet points, use flowing paragraphs instead." Negative constraints are surprisingly powerful.

:::tip
If you are not happy with an AI response, resist the urge to start over. Instead, tell the AI what is wrong: "The tone is too casual -- make it sound like a Fortune 500 company." Iterating on a response is faster and produces better results than re-prompting from scratch, because the AI learns from the feedback within the conversation.
:::`,
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

AI is powerful, but it comes with real risks that you need to understand before you start relying on it. This is not a scare-tactic lesson -- it is a practical one. Being an effective AI user means knowing where the boundaries are so you can work confidently *within* them, rather than stumbling into trouble.

:::key
The most dangerous AI user is the one who trusts AI blindly. The most effective AI user is the one who knows exactly where AI is strong, where it is weak, and how to verify the difference.
:::

---

## Known Limitations

### 1. Hallucinations

This is the big one. AI will sometimes state things that are completely, verifiably false -- and it will do so with the same confident tone it uses when it is right. It does not "know" when it is wrong because it is not looking up facts. It is generating statistically likely text, and sometimes the statistically likely response happens to be fiction.

**Real examples of hallucinations that caused real problems:**
- Citing academic papers that do not exist (complete with fabricated authors, titles, and journal names)
- Making up court case precedents (this got a New York lawyer sanctioned by a judge in 2023 -- a cautionary tale that made national news)
- Providing code that looks syntactically correct but contains subtle logical errors
- Fabricating statistics and attributing them to real organizations

:::warning
Hallucinations are not rare edge cases. They happen regularly, especially when you ask about niche topics, request specific citations, or push the AI outside its strongest domains. The AI will never say "I made that up." It will present fiction with the same polish as fact. Your job is to verify.
:::

**Defense**: Always verify facts, especially for anything you will publish, share publicly, or act on. Cross-check citations, run code before shipping it, and double-check statistics against primary sources.

---

### 2. Training Data Cutoff

Most models have a knowledge cutoff date -- a point after which they have no information. They do not know about events, discoveries, product launches, or news that happened after their training data was collected. The AI will not tell you "I don't know about that because it happened after my cutoff." It will either say nothing or, worse, hallucinate an answer that sounds plausible.

**Defense**: For current events or recent information, use AI search tools like Perplexity that can access the web in real time, or pair AI with manual verification against up-to-date sources.

### 3. Bias

AI reflects biases present in its training data, because its training data is a mirror of the internet -- and the internet is not neutral. This can manifest in subtle but meaningful ways:

- **Gender stereotypes**: Assuming doctors are male, nurses are female, engineers are male, teachers are female
- **Cultural bias**: Defaulting to Western or American perspectives when asked about global topics
- **Representation gaps**: Performing worse for underrepresented groups, languages, or dialects

**Defense**: Be aware that bias exists in every model. Review outputs critically, especially when the AI is writing about people. You can explicitly ask for diverse perspectives: "Consider this from a non-Western point of view" or "Avoid gender assumptions."

:::example
If you ask an AI to "describe a typical CEO," the response will overwhelmingly skew toward describing a middle-aged white man in a suit -- because that is the pattern most heavily represented in the training data. This does not reflect reality, and it reinforces stereotypes if you use the output uncritically. A better prompt: "Describe a CEO -- do not default to any particular gender, age, or ethnicity."
:::

---

## Ethical Guidelines

These are not abstract principles. They are practical rules that will keep you out of trouble and help you build good habits from the start.

### DO:
- Disclose AI use when appropriate (especially in academic or professional settings where transparency matters)
- Verify important claims before acting on them
- Use AI to augment your work, not replace your judgment
- Protect sensitive data -- do not paste passwords, Social Security numbers, private medical records, or confidential business information into public AI tools

### DON'T:
- Submit AI-generated work as entirely your own in contexts where that is dishonest (school assignments, work deliverables with explicit policies, etc.)
- Use AI to generate misinformation, deepfakes, or deceptive content
- Blindly trust AI for medical, legal, or financial advice -- always consult a qualified professional
- Share other people's private information with AI tools without their knowledge and consent

:::tip
A good rule of thumb: if you would not want your boss, your professor, or a reporter to know you used AI for a particular task, that is a signal to think carefully about whether you should be using it -- or at least to disclose that you did. Transparency builds trust. Secrecy erodes it.
:::

---

## The Copyright Question

AI-generated content occupies a legal gray area that is evolving rapidly. Here is where things stand as of early 2026:

- You generally cannot copyright purely AI-generated content (the U.S. Copyright Office has ruled that copyright requires human authorship)
- Using AI as a tool in your creative process is generally fine -- the human creative decisions you make on top of AI output can be protected
- Multiple lawsuits are working through the courts regarding whether AI training on copyrighted material constitutes fair use
- The law is evolving rapidly across different countries -- stay informed, especially if you work in creative industries

The practical takeaway: use AI as a starting point and a collaborator, not as a replacement for your own creative input. The more of your own judgment, editing, and original thinking you layer on top, the stronger your position -- both legally and ethically.`,
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

Not every problem needs AI. In fact, one of the most important skills you will develop is the ability to quickly judge whether AI is the right tool for a given task -- or whether you are better off doing it yourself. This lesson gives you a practical framework you can apply in seconds.

:::key
AI is a force multiplier, not a replacement for judgment. It makes you 2-10x faster at tasks you already know how to do. It is weakest when you rely on it for tasks you cannot evaluate yourself. Knowing when NOT to use AI is just as important as knowing when to use it.
:::

---

## The AI Decision Matrix

### GREAT for AI
These are the tasks where AI consistently saves time and delivers quality results with minimal oversight:

- **Drafting**: First drafts of emails, reports, blog posts, social media content. The AI gets you 80% of the way there; you polish the last 20%.
- **Brainstorming**: Generating ideas, alternatives, perspectives you had not considered. AI is tireless and never runs out of suggestions.
- **Summarizing**: Condensing long documents, meeting notes, or articles into key points. Paste in a 30-page PDF and get a one-page summary in seconds.
- **Explaining**: Breaking down complex topics into simple terms. "Explain blockchain to someone who has never heard of it" is a prompt AI handles brilliantly.
- **Reformatting**: Converting data between formats -- CSV to JSON, bullet points to paragraphs, raw notes to polished tables.
- **Research starting points**: Getting an overview of a topic before you dive into primary sources. Think of it as a smarter, more conversational Wikipedia.
- **Repetitive text tasks**: Form letters, email templates, variations of the same message for different audiences.
- **Code scaffolding**: Boilerplate code, common patterns, starter templates. AI can generate a working React component or API endpoint in seconds.

:::example
A real-world example of AI at its best: you need to send a slightly different follow-up email to 12 clients, each referencing their specific project. Without AI, that is an hour of tedious copy-paste-edit work. With AI, you write one prompt -- "Here are 12 clients and their projects. Write a personalized follow-up email for each" -- and you have drafts for all 12 in under a minute. You review, tweak, and send.
:::

---

### OKAY for AI (with verification)
These tasks benefit from AI, but the output must be checked by a human before you act on it:

- Factual research (always verify against primary sources)
- Technical documentation (have a domain expert review)
- Data analysis (check the math -- AI can make calculation errors)
- Translation (have a native speaker review for nuance)
- Legal/medical information (always consult a qualified professional before acting)

### NOT for AI
These are tasks where AI should not be your primary tool:

- **Final decisions**: AI can inform your decision, but the decision itself must be yours. You are the one accountable for the outcome.
- **Sensitive data processing**: Do not paste passwords, private health information, financial account details, or confidential business data into public AI tools.
- **Emotional support replacement**: AI can offer comforting words, but it cannot truly empathize. It does not understand grief, fear, or joy -- it generates patterns that look like empathy.
- **Real-time information**: Stock prices, live sports scores, breaking news, weather alerts. AI models do not have real-time access to the world.
- **Anything requiring accountability**: If someone could get hurt -- physically, financially, legally -- a qualified human needs to be in the loop.

:::warning
The most common mistake new AI users make is using AI for tasks that fall in the "NOT for AI" category without realizing it. If you are using AI to draft a legal contract, write medical advice, or make a financial decision, stop and ask: "If this output is wrong, what is the worst that could happen?" If the answer involves real harm, bring in a qualified human.
:::

---

## The 10-Second Test

Before reaching for AI, run through these four questions. It takes about ten seconds and will save you from the most common pitfalls:

1. **Would a wrong answer cause harm?** If yes, verify everything the AI produces -- or skip AI entirely.
2. **Does it need to be current?** If yes, pair AI with real-time sources (Perplexity, Google, live APIs).
3. **Is this sensitive data?** If yes, use only enterprise or private AI tools that do not train on your data.
4. **Am I replacing my judgment?** If yes, step back. AI should inform your thinking, not substitute for it.

:::tip
Print or bookmark this 10-second test. Run it before every AI interaction for the first two weeks. After that, it will become second nature -- you will instinctively know whether a task is a good fit for AI without even thinking about it.
:::

---

## The Sweet Spot

The best AI users are not the ones who use it for everything. They are the ones who know **exactly when** to reach for it and exactly when to put it down.

Here is the pattern that separates beginners from power users: beginners either avoid AI entirely (missing out on massive time savings) or use it for everything (running into quality and trust issues). Power users have a finely tuned sense for which tasks fall in the "great for AI" category -- and they use AI aggressively for those while keeping their own judgment firmly in control for everything else.

That sense is exactly what you are building right now. By the end of this course, choosing when to use AI will feel as natural as choosing when to use a calculator.`,
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
