import { Wave } from './curriculum-types';

export const wave3: Wave = {
  id: 'wave-3',
  number: 3,
  title: 'AI for Email & Writing',
  subtitle: 'Write Faster, Write Better',
  description: 'Use AI to draft, edit, and polish any kind of written communication. From emails to blog posts to SOPs.',
  color: '#10b981',
  icon: 'edit',
  weekRange: 'Week 3-4',
  totalXP: 0,
  units: [
    {
      id: 'w3-u1',
      waveId: 'wave-3',
      title: 'Professional Communication',
      description: 'AI-powered email and business writing',
      order: 1,
      lessons: [
        {
          id: 'w3-u1-l1',
          waveId: 'wave-3',
          unitId: 'w3-u1',
          title: 'Drafting Professional Emails',
          description: 'Generate polished emails in seconds using a proven formula.',
          duration: '10 min',
          difficulty: 'beginner',
          xp: 20,
          order: 1,
          content: `# Drafting Professional Emails with AI

Email is the #1 use case for AI in business. The average professional sends 40 emails per day and spends 28% of their workweek on email. That is a staggering amount of time spent typing, re-reading, second-guessing tone, and hitting send. AI can cut that time in half -- and often produce better output than what you would write under pressure.

:::key
The Email Prompt Formula is the single most useful template you will learn in this entire course. Master this one pattern and you will use it every single day.
:::

---

## The Email Prompt Formula

\`\`\`
Write a [type] email to [recipient/role].
Context: [situation]
Goal: [what you want to achieve]
Tone: [formal/friendly/urgent/etc.]
Length: [short/medium/detailed]
Include: [specific points to cover]
Avoid: [things to leave out]
\`\`\`

Every field matters. Skip one and the output quality drops noticeably. Let's break down why.

## Why Each Field Matters

- **Type**: "follow-up," "introduction," "apology," "request" -- this sets the structural template. An apology email has a completely different shape than a request email.
- **Recipient/Role**: "my CEO" vs "a new client" produces very different language. AI adjusts formality, vocabulary, and assumptions based on who is reading.
- **Context**: The situation background the AI needs to write intelligently. Without context, you get generic fluff. With context, you get something that sounds like you actually wrote it.
- **Goal**: What action you want the reader to take after reading. This is the most overlooked field -- and the most important.
- **Tone**: The emotional register -- this one parameter changes everything about the email
- **Length**: Prevents AI from writing 500-word novels when you need 3 sentences
- **Include/Avoid**: Your guardrails for content

---

## Example: Difficult Client Email

> Write a professional email to a client who has been unresponsive for 2 weeks.
> Context: They owe us feedback on the website mockups we sent. The project deadline is in 10 days.
> Goal: Get them to respond and approve the mockups without damaging the relationship.
> Tone: Warm but with gentle urgency.
> Length: Under 150 words.
> Include: Reference the mockups, mention the deadline, offer to hop on a quick call.
> Avoid: Blame, passive aggression, or making them feel bad.

:::tip
Always specify what to avoid. AI defaults to corporate-speak and safe, watered-down language unless you explicitly tell it not to. Adding "Avoid: jargon, passive voice, and filler phrases" can transform the output from robotic to genuinely human-sounding.
:::

## Pro Tips

1. **Always specify what to avoid** -- AI defaults to corporate-speak unless you tell it not to
2. **Include the recipient's name** when you have it -- personalization matters
3. **State the goal explicitly** -- "get them to reply within 24 hours" is better than "follow up"
4. **Ask for subject line options** -- add "Also provide 3 subject line options" to any email prompt

---

## The Iteration Loop

Your first draft is rarely perfect. Use these follow-up prompts:
1. "Make it shorter" or "Make it more formal"
2. "Change the opening to be less generic"
3. "Add a specific mention of [project/event/detail]"
4. "Remove the last paragraph and end with a clear call to action"

:::try
Try this right now: take a real email you need to send today. Fill in the formula, generate a draft, then iterate once. Time how long the entire process takes compared to writing from scratch. Most people find it takes under 3 minutes total.
:::

The fastest email workflow: Generate, tweak once, personalize one detail, send.`,
          exercises: [
            {
              id: 'w3-u1-l1-e1',
              type: 'prompt-challenge',
              question: 'Use the email formula to draft a real email you need to send this week. Rate how close to "sendable" the first draft is (1-10).',
              hint: 'Pick a real email from your to-do list. The more specific context you give, the better the output.',
              xpBonus: 20,
            },
            {
              id: 'w3-u1-l1-e2',
              type: 'quiz',
              question: 'Which field in the email prompt formula has the biggest impact on the language and structure of the output?',
              options: [
                'Length',
                'Type (follow-up, introduction, apology, etc.)',
                'Avoid',
                'Context'
              ],
              correctAnswer: 1,
              xpBonus: 5,
            },
            {
              id: 'w3-u1-l1-e3',
              type: 'prompt-challenge',
              question: 'Ask AI to write 3 different versions of the same email in different tones: formal, friendly, and urgent. Compare the openings, closings, and overall feel.',
              hint: 'Use the same context but change only the tone parameter each time. Notice how dramatically the word choice shifts.',
              xpBonus: 15,
            },
            {
              id: 'w3-u1-l1-e4',
              type: 'fill-blank',
              question: 'The average professional spends _______ percent of their workweek on email.',
              correctAnswer: '28',
              xpBonus: 5,
            }
          ]
        },
        {
          id: 'w3-u1-l2',
          waveId: 'wave-3',
          unitId: 'w3-u1',
          title: 'Follow-Ups That Get Replies',
          description: 'Master the art of the follow-up email with AI assistance.',
          duration: '10 min',
          difficulty: 'beginner',
          xp: 20,
          order: 2,
          content: `# Follow-Ups That Get Replies

80% of sales require 5 follow-ups, but 44% of people give up after just one. That means almost half of all potential deals die because someone stopped reaching out too soon. Follow-up emails are where deals are won or lost -- and AI makes them effortless.

:::key
Every follow-up must add something new. If your follow-up email could be replaced by the word "bump," it is not a follow-up -- it is noise. New value is what earns a reply.
:::

## Why Most Follow-Ups Fail

The typical follow-up says: "Just checking in!" or "Wanted to circle back on this."

These fail because they:
- Add zero new value
- Put the burden on the reader
- Sound desperate or robotic
- Give no reason to reply NOW

Think about your own inbox. When you see "just wanted to circle back," do you feel compelled to respond? Of course not. Nobody does. The email that gets a reply is the one that makes the reader think, "Oh, that is actually useful."

---

## The Value-Add Follow-Up Formula

\`\`\`
Write a follow-up email to [person] regarding [topic].
Previous interaction: [what happened last time]
Time since last contact: [how long]
New value to add: [new info, resource, insight, or offer]
Desired next step: [specific action you want]
Tone: [helpful, not pushy]
\`\`\`

## The Follow-Up Sequence

Smart follow-ups escalate in strategy, not desperation:

### Follow-Up #1 (2-3 days after): The Gentle Reminder
> "Write a brief follow-up referencing our conversation about [topic] on [date]. Add a relevant article or insight about their industry. End with the same ask, reworded."

### Follow-Up #2 (1 week after): The New Angle
> "Write a follow-up that approaches [topic] from a different angle. Instead of repeating my original pitch, focus on a specific problem they mentioned: [problem]. Include a case study or example of how we solved a similar problem."

### Follow-Up #3 (2 weeks after): The Easy Out
> "Write a final follow-up that's extremely short (under 50 words). Give them an easy way to say yes OR no. Something like 'If the timing isn't right, totally understand -- just let me know and I won't follow up again.'"

:::tip
Paradoxically, giving people permission to say no increases response rates. When someone reads "just let me know either way," it removes the pressure and guilt. They are far more likely to respond -- and often the response is positive.
:::

---

## Pro Tips

1. **Reference something specific** from your last interaction -- proves you are paying attention
2. **Change the subject line** on each follow-up -- a new subject line gets a fresh look
3. **Shorter is better** -- each follow-up should be shorter than the last
4. **Provide an exit** -- giving people permission to say no increases response rates
5. **Time your sends** -- Tuesday through Thursday, 9-11am gets the highest open rates

## The "Bump" Email

Sometimes all you need is the simplest follow-up possible:

> "Write a 1-2 sentence email that bumps my previous message to the top of [person]'s inbox. Reference the original topic without repeating everything. Make it feel natural, not automated."

:::warning
Never send more than 3-4 follow-ups to the same person on the same topic. Past that point, you are not being persistent -- you are being a nuisance. Know when to move on and revisit later with a completely different approach.
:::

This works because busy people often intend to reply but forget. A bump gives them the nudge.`,
          exercises: [
            {
              id: 'w3-u1-l2-e1',
              type: 'prompt-challenge',
              question: 'Write a 3-email follow-up sequence for a real situation: someone you emailed who never replied. Use the escalating strategy (gentle reminder, new angle, easy out).',
              hint: 'Give AI the full context of the original email and what you were asking for. Each follow-up should feel different, not repetitive.',
              xpBonus: 20,
            },
            {
              id: 'w3-u1-l2-e2',
              type: 'quiz',
              question: 'What percentage of sales require 5 or more follow-ups?',
              options: ['30%', '50%', '65%', '80%'],
              correctAnswer: 3,
              xpBonus: 5,
            },
            {
              id: 'w3-u1-l2-e3',
              type: 'matching',
              question: 'Which follow-up strategy matches "Follow-Up #3" in the sequence?',
              options: [
                'Add a relevant article or industry insight',
                'Give them permission to say no with a short message',
                'Repeat the original pitch with more detail',
                'Send the same email again'
              ],
              correctAnswer: 1,
              xpBonus: 5,
            },
            {
              id: 'w3-u1-l2-e4',
              type: 'free-response',
              question: 'Think of a time you gave up on a follow-up too early. What new value could you have added in a second or third email to re-engage the person?',
              hint: 'Consider: a relevant article, a case study, a simplified version of your ask, or a different angle on the same problem.',
              xpBonus: 10,
            }
          ]
        },
        {
          id: 'w3-u1-l3',
          waveId: 'wave-3',
          unitId: 'w3-u1',
          title: 'Cold Outreach That Works',
          description: 'Write cold emails that actually get opened and replied to.',
          duration: '12 min',
          difficulty: 'intermediate',
          xp: 25,
          order: 3,
          content: `# Cold Outreach That Works

Cold email has a bad reputation because 99% of cold emails are terrible. They are long, self-centered, and obviously sent to thousands of people at once. AI can put you in the 1% that gets replies -- but only if you feed it the right framework.

:::key
The secret to cold email is not volume -- it is specificity. One deeply personalized email outperforms a hundred generic blasts. AI helps you personalize at scale without spending 30 minutes per email.
:::

## Why Cold Emails Fail

Most cold emails commit these sins:
- **All about the sender**: "We are a leading provider of..."
- **Too long**: Nobody reads a 400-word email from a stranger
- **No personalization**: Obvious mass blast
- **Vague ask**: "Would love to connect sometime"
- **No proof**: Claims without evidence

---

## The AIDA Cold Email Framework

\`\`\`
Write a cold email using the AIDA framework:
Recipient: [name, title, company]
Research: [something specific about them -- recent news, blog post, company milestone]
My offer: [what I do and who I help]
Proof: [specific result I've achieved for similar companies]
Ask: [one clear, low-commitment next step]
Length: Under 100 words
Tone: Conversational, peer-to-peer (not salesy)
\`\`\`

### AIDA Breakdown:
- **A**ttention: Personalized opening that proves you did research
- **I**nterest: Connect their situation to a problem you solve
- **D**esire: Brief proof that you can deliver results
- **A**ction: One specific, easy next step

:::example
Subject: Quick thought on [Company]'s expansion

Hi Sarah,

Saw the announcement about [Company] expanding into the Midwest -- congrats! When [Similar Company] did the same move last year, they struggled with local supplier onboarding until we helped them cut the process from 6 weeks to 10 days.

Would a 15-minute call be worth it to see if we could help you avoid the same bottleneck?

Best,
[Name]

Notice: 67 words. Specific. One clear ask. References their actual situation.
:::

---

## Personalization at Scale

The trick to cold outreach is making each email feel custom without spending 30 minutes per email:

> "I'm reaching out to [number] prospects who are all [role] at [company type]. Here's what I know about each:
> 1. [Name] -- [one specific detail]
> 2. [Name] -- [one specific detail]
> 3. [Name] -- [one specific detail]
>
> Write a personalized cold email for each using the AIDA framework. My offer: [description]. Keep each under 80 words."

## Subject Lines That Get Opened

> "Generate 10 cold email subject lines for [context]. Requirements:
> - Under 6 words each
> - No spam trigger words (free, guaranteed, act now)
> - At least 3 should include the recipient's company name
> - Mix curiosity-based and value-based approaches"

Top-performing subject line patterns:
- "[Name], quick question about [specific thing]"
- "Idea for [Company]'s [specific initiative]"
- "[Mutual connection] suggested I reach out"
- "[Competitor] is doing this -- are you?"

:::warning
Ethical cold outreach matters. Only email people who could genuinely benefit from your offer. Always include an easy way to opt out. Never misrepresent who you are or fabricate mutual connections. Follow CAN-SPAM and GDPR regulations. Quality over quantity -- 10 great emails beat 1,000 spam blasts every time.
:::`,
          exercises: [
            {
              id: 'w3-u1-l3-e1',
              type: 'prompt-challenge',
              question: 'Write a cold email to a real person or company you would genuinely like to work with. Use the AIDA framework and keep it under 100 words. Would you actually send it?',
              hint: 'Do 2 minutes of real research on the person first. Find a recent LinkedIn post, company announcement, or blog post to reference.',
              xpBonus: 20,
            },
            {
              id: 'w3-u1-l3-e2',
              type: 'quiz',
              question: 'What is the ideal length for a cold email?',
              options: [
                'Under 50 words',
                'Under 100 words',
                '200-300 words',
                'As long as needed to explain your full offering'
              ],
              correctAnswer: 1,
              xpBonus: 5,
            },
            {
              id: 'w3-u1-l3-e3',
              type: 'quiz',
              question: 'What does the "A" in AIDA stand for in the cold email framework?',
              options: ['Action', 'Audience', 'Attention', 'Authority'],
              correctAnswer: 2,
              xpBonus: 5,
            },
            {
              id: 'w3-u1-l3-e4',
              type: 'free-response',
              question: 'Analyze a cold email you recently received. What did it do wrong according to the principles in this lesson? Rewrite it in 2-3 sentences using the AIDA framework.',
              hint: 'Check your spam folder or promotions tab for examples. Most cold emails violate multiple principles from this lesson.',
              xpBonus: 15,
            }
          ]
        },
        {
          id: 'w3-u1-l4',
          waveId: 'wave-3',
          unitId: 'w3-u1',
          title: 'Difficult Conversations & Bad News',
          description: 'Handle tough emails with empathy and clarity using AI.',
          duration: '10 min',
          difficulty: 'intermediate',
          xp: 20,
          order: 4,
          content: `# Difficult Conversations & Bad News

The hardest emails to write are the ones with bad news. Rejecting a proposal, announcing a delay, addressing poor performance, raising prices -- these emails sit in your drafts folder for hours (or days) because the stakes feel high and the words feel impossible. AI helps you find the right words when emotions are high and the stakes matter.

:::key
AI eliminates the procrastination problem. Instead of agonizing over a blank screen, you get a thoughtful first draft in seconds. Then you refine. The hardest part -- starting -- is no longer hard.
:::

## Why Difficult Emails Are Hard

When writing tough emails, people tend to:
- **Overexplain**: Writing 500 words to avoid the point
- **Under-explain**: Being so blunt it feels cold
- **Delay**: Procrastinating because the email feels impossible
- **Soften too much**: Burying the message so deep it gets missed

---

## The Difficult Email Template

\`\`\`
Write a [type of bad news] email.
Recipient: [who and your relationship to them]
The situation: [what happened, honestly]
The decision/news: [the bad news, clearly stated]
What I want them to feel: [understood, respected, etc.]
What comes next: [any alternatives, next steps, or support offered]
Tone: [direct but compassionate / firm but fair / etc.]
Constraints: [things to avoid saying]
\`\`\`

## Common Difficult Email Scenarios

### Turning Down a Proposal or Vendor
> "Write an email declining a vendor proposal. Context: They provided a thorough proposal but their pricing is 40% above our budget and their timeline doesn't work. I want to leave the door open for future work. Be respectful of the effort they put into the proposal."

### Letting a Client Know About a Delay
> "Write an email informing a client that their project will be delivered 2 weeks late. Context: A key team member had a family emergency. The client is expecting delivery next Friday. Include: honest reason (without oversharing personal details), new timeline, what we're doing to prevent further delays, and a small goodwill gesture (discount on next invoice)."

### Addressing Poor Performance
> "Write an email to a team member about missed deadlines. Context: They've missed 3 deadlines in the past month. I want to be supportive but clear that this needs to change. Include: specific examples, impact on the team, offer to discuss root causes, and clear expectations going forward. Avoid: shaming language, threats, or assumptions about their personal life."

### Raising Your Prices
> "Write an email to existing clients announcing a price increase. Context: Prices are going up 15% starting next quarter due to increased costs and expanded services. Include: advance notice (60 days), explanation of added value, grandfather option for annual contracts, and appreciation for their loyalty."

---

## The Empathy-Clarity Balance

:::tip
The best difficult emails follow a five-part structure: Acknowledge, State, Explain, Offer, Close. Memorize this sequence and you will never struggle with bad-news emails again.
:::

1. **Acknowledge** their perspective or effort
2. **State** the news directly (don't bury it)
3. **Explain** briefly (one reason, not five excuses)
4. **Offer** a path forward or alternative
5. **Close** with respect and openness

## Pro Tips

- **Write it, then sleep on it** -- AI gives you a draft fast, but let it sit before sending
- **Read it from their perspective** -- ask AI: "How would the recipient feel reading this?"
- **Ask for a softer AND a more direct version** -- the right tone is usually in between
- **Never send bad news on a Friday afternoon** -- give people time to process and respond
- **Pick up the phone for the really big stuff** -- some news is too important for email; use AI to draft talking points instead

:::warning
After drafting a difficult email, always run it through this gut check: "If I received this email, would I feel respected?" If the answer is not a clear yes, revise until it is. Tone matters more than words in bad-news communication.
:::`,
          exercises: [
            {
              id: 'w3-u1-l4-e1',
              type: 'prompt-challenge',
              question: 'Pick one of the four scenarios above (vendor rejection, delay notification, performance issue, price increase) and draft it for a real or realistic situation. Then ask AI: "Read this from the recipient\'s perspective. How would they feel? What would you change?"',
              hint: 'The self-critique step is powerful. AI is surprisingly good at predicting emotional reactions to email language.',
              xpBonus: 20,
            },
            {
              id: 'w3-u1-l4-e2',
              type: 'quiz',
              question: 'What is the recommended structure for delivering bad news in an email?',
              options: [
                'Bad news first, then explanation, then apology',
                'Long explanation first, then bury the bad news at the end',
                'Acknowledge, state the news directly, explain briefly, offer a path forward, close with respect',
                'Apologize profusely, blame external factors, promise it won\'t happen again'
              ],
              correctAnswer: 2,
              xpBonus: 5,
            },
            {
              id: 'w3-u1-l4-e3',
              type: 'matching',
              question: 'Which type of difficult email would benefit most from a "goodwill gesture" like a discount?',
              options: [
                'Turning down a vendor proposal',
                'Informing a client about a project delay',
                'Addressing poor performance with a team member',
                'Announcing a company holiday'
              ],
              correctAnswer: 1,
              xpBonus: 5,
            },
            {
              id: 'w3-u1-l4-e4',
              type: 'free-response',
              question: 'Think of a difficult email you\'ve been putting off. What makes it hard to write? How would you fill in the Difficult Email Template for this situation?',
              hint: 'Just filling in the template fields is often enough to break the procrastination. You don\'t have to send it -- just draft it.',
              xpBonus: 10,
            }
          ]
        }
      ]
    },
    {
      id: 'w3-u2',
      waveId: 'wave-3',
      title: 'Content Creation',
      description: 'Create blog posts, social content, marketing copy, and documentation',
      order: 2,
      lessons: [
        {
          id: 'w3-u2-l1',
          waveId: 'wave-3',
          unitId: 'w3-u2',
          title: 'Blog Posts & Articles',
          description: 'From outline to published post with AI assistance.',
          duration: '12 min',
          difficulty: 'intermediate',
          xp: 25,
          order: 1,
          content: `# Blog Posts & Articles with AI

AI won't replace good writers, but it will make good writers 5x faster. The average blog post takes 4 hours to write. With this workflow, you will do it in under 45 minutes -- and the output will be more structured and polished than what most people produce from scratch.

:::key
Never ask AI to "write a blog post about X." That single-prompt approach produces generic, forgettable content every time. Instead, use a multi-step chain where each step builds on the last. The quality difference is enormous.
:::

## The Blog Post Chain

### Step 1: Topic & Angle
> "I want to write about [topic] for [audience]. Give me 5 unique angles that haven't been overdone. For each, provide a working title and a one-sentence hook."

Why: The angle is everything. "How to use AI" is boring. "I replaced my $5K/month marketing team with AI for 30 days -- here's what happened" is clickable.

### Step 2: Outline
> "Create a detailed outline for the article '[title]'. Include: H2 and H3 headings, key points under each section, where to include examples/data, estimated word count per section. Total target: [X] words."

Why: Structure prevents rambling. A solid outline means the draft practically writes itself.

### Step 3: First Draft
> "Write the full article from this outline. Style guidelines: [tone, voice, reading level]. Include transitions between sections. Start with a hook that [describes hook type]. Write in second person (you/your)."

### Step 4: Human Review
This is YOUR step. Read the draft critically:
- Is the voice authentic to you/your brand?
- Are the examples relevant to YOUR audience?
- Is anything factually wrong?
- Does it flow naturally or feel robotic?
- Would you actually read this?

### Step 5: Polish
> "Review this article for: weak openings in any section, passive voice, unnecessary adverbs, sentences over 25 words, and repetitive phrasing. Fix each issue and explain what you changed."

---

## Key Principles

:::warning
Never publish raw AI output. It will lack your unique perspective, contain potential inaccuracies, and read like every other AI-generated article on the internet. AI writes the skeleton -- you add the soul, the stories, and the opinions that make it worth reading.
:::

1. **Never publish raw AI output** -- always add your unique perspective and real experiences
2. **Use AI for structure, you provide the insight** -- AI writes the skeleton, you add the soul
3. **Add personal anecdotes** the AI can't generate -- "When I started my bakery..." makes it yours
4. **Fact-check everything** -- AI confidently makes up statistics and citations
5. **Your voice matters** -- edit until it sounds like you, not like a robot

---

## SEO Optimization

After your post is written:
> "Optimize this blog post for SEO. The target keyword is '[keyword]'. Add: meta title (under 60 chars), meta description (under 155 chars), suggest 3 internal link opportunities, recommend image alt texts, and ensure the keyword appears naturally 3-5 times."

## The Repurposing Multiplier

One great blog post can become:
- 5-7 social media posts
- An email newsletter
- A video script
- A podcast talking points outline
- An infographic outline

:::tip
Ask AI to repurpose your article into all five formats in a single prompt. One hour of writing becomes a full week of content across every channel. This is the highest-leverage content strategy available to small teams.
:::

Ask AI to do each conversion -- one hour of writing becomes a week of content.`,
          exercises: [
            {
              id: 'w3-u2-l1-e1',
              type: 'prompt-challenge',
              question: 'Run the full 5-step blog post chain on a topic you care about. Time yourself. How long did the entire process take from idea to polished draft?',
              hint: 'Most people can go from idea to polished 1000-word draft in under 45 minutes. Compare that to your usual process.',
              xpBonus: 25,
            },
            {
              id: 'w3-u2-l1-e2',
              type: 'quiz',
              question: 'Which step in the blog post chain is explicitly for the HUMAN, not the AI?',
              options: ['Topic & Angle', 'Outline', 'First Draft', 'Human Review'],
              correctAnswer: 3,
              xpBonus: 5,
            },
            {
              id: 'w3-u2-l1-e3',
              type: 'fill-blank',
              question: 'The key principle is: use AI for _______, you provide the insight.',
              correctAnswer: 'structure',
              xpBonus: 5,
            },
            {
              id: 'w3-u2-l1-e4',
              type: 'free-response',
              question: 'What topics could you write about where your personal experience gives you an edge that AI can\'t replicate? List 3 topics and explain what unique angle you\'d bring to each.',
              hint: 'Think about problems you\'ve solved, mistakes you\'ve made, or processes you\'ve developed. That lived experience is your competitive advantage over pure AI content.',
              xpBonus: 10,
            }
          ]
        },
        {
          id: 'w3-u2-l2',
          waveId: 'wave-3',
          unitId: 'w3-u2',
          title: 'Social Media Content',
          description: 'Create engaging posts for any platform in minutes.',
          duration: '10 min',
          difficulty: 'beginner',
          xp: 20,
          order: 2,
          content: `# Social Media Content with AI

Each platform speaks a different language. LinkedIn is professional and long-form. Twitter is punchy and opinionated. Instagram is visual and story-driven. AI can fluently speak all of them -- if you give it the right instructions. The key is treating each platform as its own medium, not blasting the same message everywhere.

:::key
The 4:1:1 rule is your content ratio compass. For every 4 educational or valuable posts, include 1 promotional post and 1 engagement post (question, poll, or conversation starter). This ratio keeps your audience engaged without feeling sold to.
:::

## Platform-Specific Prompts

### LinkedIn
> "Write a LinkedIn post about [topic]. Style: professional thought leadership. Structure: hook line (stops the scroll), 3-4 short paragraphs (1-2 sentences each), key takeaway, question to drive engagement. Use line breaks for readability. No hashtags in the body, add 3-5 relevant hashtags at the end."

LinkedIn best practices:
- First line must hook -- it's all people see before "...see more"
- Short paragraphs (1-2 sentences) with line breaks
- Personal stories outperform generic advice 3:1
- Posts between 1,200-1,500 characters perform best

### Twitter/X
> "Write a Twitter thread (5-7 tweets) about [topic]. Tweet 1 should be a hook that stops the scroll. Each tweet should be under 280 characters. Number each tweet. End with a summary tweet and CTA. Make it punchy and opinionated."

Twitter best practices:
- Thread openers should create curiosity or make a bold claim
- Each tweet should stand alone AND connect to the next
- Use "1/" formatting so people know it's a thread
- End with "Follow me for more [topic]" or a link

### Instagram
> "Write an Instagram caption about [topic]. Structure: attention-grabbing first line (shows in preview), story or insight (3-4 sentences), call to action, 20-30 relevant hashtags grouped at the end."

---

## Content Calendar Generation

Stop wondering "what should I post today?" Let AI plan your whole month:

> "Create a 2-week social media content calendar for a [business type] on [platforms]. Include:
> - Post date and platform
> - Content theme/topic
> - Post format (text, image prompt, video idea, carousel)
> - Draft caption
> - Best posting time
> Mix educational, promotional, and engagement content in a 4:1:1 ratio."

:::tip
Batch-create your content calendar once per month. Sit down for one focused session, generate two weeks of posts, then schedule them all. This single workflow eliminates the daily "what should I post?" anxiety that kills consistency.
:::

---

## Repurposing Content

This is the ultimate productivity hack. One piece of content becomes five:

> "I have this blog post: [paste post]. Turn it into:
> 1. A LinkedIn post (professional angle)
> 2. A Twitter thread (5 tweets)
> 3. An Instagram caption (storytelling angle)
> 4. Three email subject lines linking to the post
> 5. A 60-second video script summarizing the key points"

This single prompt can create a week's worth of content from one piece.

## The Engagement Booster

Low engagement? AI can help diagnose and fix it:

> "Here are my last 5 social media posts and their engagement metrics: [paste posts with likes/comments]. Analyze what worked and what didn't. Identify patterns. Then rewrite my worst-performing post using the style and structure of my best-performing one."

## Pro Tips

1. **Add your hot take** -- AI writes safe, consensus content. Your opinion is what makes it engaging.
2. **Include a story** -- Posts with personal anecdotes get 2-3x more engagement
3. **End with a question** -- Engagement breeds more engagement
4. **Batch create** -- Use AI to create a full week of content in one sitting
5. **A/B test** -- Ask AI for 3 versions of the same post and see which performs best

:::warning
AI-generated social media content that goes out without your personal touch is obvious to audiences. Always inject at least one personal opinion, observation, or story before posting. The human element is what stops the scroll.
:::`,
          exercises: [
            {
              id: 'w3-u2-l2-e1',
              type: 'prompt-challenge',
              question: 'Use the "Repurposing Content" prompt with a real piece of content (article, email, presentation). Generate posts for 3 different platforms. Does the tone and format actually match each platform?',
              hint: 'Notice how AI adapts the same message for different platforms and audiences. LinkedIn should feel professional, Twitter should feel punchy.',
              xpBonus: 20,
            },
            {
              id: 'w3-u2-l2-e2',
              type: 'prompt-challenge',
              question: 'Generate a 1-week content calendar for a business you know (yours or a local one). Are the suggestions specific enough to actually use?',
              hint: 'Give specific context about the business, target audience, and goals. Generic input produces a generic calendar.',
              xpBonus: 15,
            },
            {
              id: 'w3-u2-l2-e3',
              type: 'quiz',
              question: 'What is the recommended content mix ratio for social media (educational : promotional : engagement)?',
              options: ['1:1:1', '2:2:1', '4:1:1', '1:4:1'],
              correctAnswer: 2,
              xpBonus: 5,
            },
            {
              id: 'w3-u2-l2-e4',
              type: 'matching',
              question: 'Which platform is best suited for "professional thought leadership" posts?',
              options: ['Twitter/X', 'LinkedIn', 'Instagram', 'TikTok'],
              correctAnswer: 1,
              xpBonus: 5,
            }
          ]
        },
        {
          id: 'w3-u2-l3',
          waveId: 'wave-3',
          unitId: 'w3-u2',
          title: 'Marketing Copy & Persuasion',
          description: 'Write landing pages, ads, and sales copy that converts.',
          duration: '12 min',
          difficulty: 'intermediate',
          xp: 25,
          order: 3,
          content: `# Marketing Copy & Persuasion

Great marketing copy is the difference between a business that grows and one that stalls. The right headline can 10x your conversion rate. The wrong one means nobody even reads your offer. AI can help you write copy that converts -- if you understand the frameworks that drive persuasion.

:::key
The PAS framework (Problem-Agitate-Solve) is the most reliable copywriting structure in existence. It works because it mirrors the natural decision-making process: recognize a problem, feel the urgency, then welcome the solution.
:::

## The PAS Framework (Problem-Agitate-Solve)

\`\`\`
Write marketing copy using the PAS framework:
Product/Service: [what you're selling]
Target audience: [who you're talking to]
Problem: [the pain point they experience]
Agitate: [make the problem feel urgent/painful]
Solve: [how your product fixes it]
Format: [landing page hero section / ad copy / email / etc.]
Length: [word count]
CTA: [what you want them to do]
\`\`\`

### Example:

**Problem**: Small business owners spend 10+ hours/week on bookkeeping.
**Agitate**: That's 520 hours a year you could spend growing your business. Instead, you're hunched over spreadsheets at midnight, praying the numbers add up before tax season.
**Solve**: QuickBooks AI handles your books in 30 minutes/week. Automatically categorizes expenses, generates reports, and flags issues before they become problems.

---

## Landing Page Copy

> "Write landing page copy for [product/service]. Include:
> - Hero headline (under 10 words, benefit-focused)
> - Subheadline (1 sentence expanding on the headline)
> - 3 feature sections with headlines and 2-sentence descriptions
> - Social proof section (format for testimonials)
> - FAQ section (5 common objections, turned into questions with answers)
> - Final CTA section with urgency
>
> Target audience: [who]. Main benefit: [what]. Key differentiator: [why you, not competitors]."

## Ad Copy Variations

> "Write 5 variations of ad copy for [product] targeting [audience] on [platform].
> Each variation should:
> - Use a different hook (curiosity, fear, desire, social proof, urgency)
> - Be under [character limit] characters
> - Include a clear CTA
> - Feel native to the platform (not like an ad)
>
> Then rank them by likely click-through rate and explain why."

## The Power of Specificity

:::example
Weak copy: "Save time on your marketing."
Strong copy: "Create 30 days of social media content in 47 minutes."

The difference is specificity. The second version is credible because it is precise. Specific numbers feel real. Round numbers feel made up. "47 minutes" is more believable than "under an hour."
:::

Always push AI for concrete numbers and details:
> "Rewrite this copy to be more specific. Replace vague claims with concrete numbers, timeframes, or examples. If you need to make up realistic numbers, flag them so I can verify."

---

## Headlines That Convert

> "Generate 20 headline options for [product/context]. Mix these proven formulas:
> - How to [achieve desire] without [common objection]
> - [Number] ways to [achieve result] in [timeframe]
> - The [adjective] guide to [topic] for [audience]
> - Stop [pain point]. Start [desired outcome].
> - What [authority/number] of [people] know about [topic]"

## Email Marketing

> "Write a 3-email welcome sequence for new subscribers to [business/newsletter]:
> Email 1 (immediate): Welcome + deliver the lead magnet + set expectations
> Email 2 (Day 2): Share your best content/resource + build credibility
> Email 3 (Day 4): Soft pitch for [product/service] + testimonial
>
> Tone: [friendly/professional/casual]. Brand voice: [describe]."

## Pro Tips

1. **Benefits over features** -- "Save 10 hours/week" beats "AI-powered automation engine"
2. **One CTA per piece** -- Multiple calls to action reduce conversions
3. **Use their language** -- Mine customer reviews for exact phrases your audience uses
4. **Test everything** -- AI can generate 10 versions; pick the one that resonates
5. **Read it aloud** -- If it sounds awkward spoken, it reads awkward too

:::tip
The fastest way to improve any piece of marketing copy: ask AI to "rewrite this using words from actual customer reviews." Customer language always outperforms marketing speak because it sounds like a real person talking to a real person.
:::`,
          exercises: [
            {
              id: 'w3-u2-l3-e1',
              type: 'prompt-challenge',
              question: 'Write PAS (Problem-Agitate-Solve) copy for a product or service you know well. Does the "Agitate" section actually make you feel the urgency of the problem?',
              hint: 'The agitate step is where most people are too soft. Push AI to make the problem feel painful and urgent -- that\'s what drives action.',
              xpBonus: 20,
            },
            {
              id: 'w3-u2-l3-e2',
              type: 'quiz',
              question: 'Which headline is more likely to convert and why?',
              options: [
                '"Save time on marketing" -- broad appeal to everyone',
                '"Create 30 days of content in 47 minutes" -- specific and concrete',
                '"The best marketing tool ever made" -- superlative grabs attention',
                '"Marketing solutions for businesses" -- professional and safe'
              ],
              correctAnswer: 1,
              xpBonus: 5,
            },
            {
              id: 'w3-u2-l3-e3',
              type: 'prompt-challenge',
              question: 'Generate 10 headlines for a real product using the headline formulas from this lesson. Pick your top 3 and explain why they would work.',
              hint: 'The best headlines combine specificity with curiosity or a clear benefit. Avoid vague, generic headlines.',
              xpBonus: 15,
            },
            {
              id: 'w3-u2-l3-e4',
              type: 'fill-blank',
              question: 'PAS stands for Problem, _______, Solve.',
              correctAnswer: 'Agitate',
              xpBonus: 5,
            }
          ]
        },
        {
          id: 'w3-u2-l4',
          waveId: 'wave-3',
          unitId: 'w3-u2',
          title: 'SOPs & Documentation',
          description: 'Create clear processes and internal documentation fast.',
          duration: '10 min',
          difficulty: 'intermediate',
          xp: 20,
          order: 4,
          content: `# SOPs & Documentation with AI

Standard Operating Procedures and documentation are the backbone of any scalable business. They are also incredibly tedious to write -- which is exactly why most companies don't have them. The knowledge lives in people's heads, and when those people leave, take vacation, or just forget, everything falls apart. AI changes that equation completely.

:::key
Good documentation is the difference between a business that depends on specific people and a business that runs as a system. AI cuts documentation time from hours to minutes, eliminating the main reason most teams never document anything.
:::

## Why Documentation Matters

- New hires ramp up 3x faster with good SOPs
- You can delegate tasks you currently do yourself
- Knowledge doesn't walk out the door when someone leaves
- Consistent quality across your team
- You can finally take a vacation without everything falling apart

---

## The SOP Generator Prompt

\`\`\`
Create a Standard Operating Procedure for: [process name]

Context: [who performs this, how often, what tools are used]

Include:
1. Purpose/Overview (2-3 sentences)
2. Scope (who this applies to)
3. Prerequisites (what's needed before starting)
4. Step-by-step instructions (numbered, with sub-steps where needed)
5. Common mistakes and how to avoid them
6. Troubleshooting guide (if X happens, do Y)
7. Quality checklist (verify these before marking complete)
8. Version history placeholder

Format: Clear numbered steps. Each step should start with an action verb.
Include [SCREENSHOT] placeholders where visual guidance would help.
Write it so someone with no prior knowledge could follow it on day one.
\`\`\`

## Documentation Types

### Process Documentation
> "Document the process of [task] from start to finish. Write it so someone with no prior knowledge could follow it successfully on their first try. Include the 'why' behind each step, not just the 'what.' Assume the reader has basic computer skills but no domain knowledge."

### Technical Documentation
> "Write technical documentation for this [API/function/system]. Include: overview (what it does in plain English), setup instructions (every step), configuration options (with defaults and examples), usage examples (3 common scenarios), error handling (what can go wrong and how to fix it), and FAQ (5 questions a new user would ask)."

### Onboarding Guide
> "Create an onboarding guide for a new [role] at a [company type]. Week 1-4 breakdown. Include: tools to set up (with links), people to meet (and why), processes to learn (in order of priority), goals for each week, and a 'you'll know you're ramped up when...' checklist."

### Runbooks for Recurring Tasks
> "Create a runbook for [recurring task, e.g., monthly reporting, weekly newsletter]. Include:
> - When to do it (exact day/time)
> - Tools needed (with login info placeholders)
> - Step-by-step process
> - What 'done' looks like
> - Who to notify when complete
> - Common variations (e.g., 'if it's end of quarter, also do X')"

---

## The Interview-to-SOP Method

The fastest way to document a process that lives in someone's head:

1. Record yourself (or a colleague) doing the task while narrating
2. Transcribe the recording (use Otter.ai, Whisper, etc.)
3. Feed the transcript to AI:

> "Here's a transcript of someone performing [task name]. Convert this into a clean, step-by-step SOP. Organize the rambling narration into logical sections. Fill in any gaps you notice with clarifying questions at the end."

:::tip
The Interview-to-SOP method is the fastest path from "it's all in my head" to "anyone can do this." Record yourself doing the task once, and AI turns your stream-of-consciousness walkthrough into a polished, repeatable procedure. This single technique can document your entire business in a week.
:::

## Tips for Great Documentation

1. **Tell AI the reader's skill level** -- "for a non-technical person" vs "for a senior developer"
2. **Ask for the 'why'** -- Steps without context are hard to follow when something goes wrong
3. **Include screenshots/image placeholders** -- A picture is worth a thousand words in documentation
4. **Have the actual process performer review it** -- They'll catch what AI and you both missed
5. **Add version dates and owners** -- Documentation rots fast; someone needs to maintain it
6. **Test it with a new person** -- The real test is whether someone can follow it cold

:::warning
Documentation has a shelf life. If you write an SOP today and nobody updates it for a year, it becomes actively dangerous -- people follow outdated steps and get wrong results. Every SOP needs an owner and a review schedule. Set a calendar reminder to review each document quarterly.
:::`,
          exercises: [
            {
              id: 'w3-u2-l4-e1',
              type: 'prompt-challenge',
              question: 'Create an SOP for a process you do regularly at work (or at home). Then ask someone else to read it and tell you where they\'d get stuck. Fix those spots.',
              hint: 'Pick something you do at least weekly. The test of a good SOP is whether someone new can follow it without asking you a single question.',
              xpBonus: 20,
            },
            {
              id: 'w3-u2-l4-e2',
              type: 'free-response',
              question: 'What are 3 processes at your work that desperately need documentation? For each one, who currently holds that knowledge in their head?',
              hint: 'Usually the answer to "why hasn\'t this been documented?" is "no time." AI cuts documentation time from hours to minutes.',
              xpBonus: 10,
            },
            {
              id: 'w3-u2-l4-e3',
              type: 'quiz',
              question: 'What is the "Interview-to-SOP Method"?',
              options: [
                'Interviewing candidates about their documentation skills',
                'Recording someone performing a task, transcribing it, then using AI to convert it into an SOP',
                'Having AI interview you about your processes',
                'Reading existing SOPs and summarizing them'
              ],
              correctAnswer: 1,
              xpBonus: 5,
            },
            {
              id: 'w3-u2-l4-e4',
              type: 'matching',
              question: 'Which document type is best for a task performed every Monday at 9am?',
              options: [
                'Onboarding Guide',
                'Technical Documentation',
                'Runbook',
                'Process Documentation'
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
wave3.totalXP = wave3.units.reduce((sum, unit) =>
  sum + unit.lessons.reduce((lSum, lesson) =>
    lSum + lesson.xp + lesson.exercises.reduce((eSum, ex) => eSum + ex.xpBonus, 0), 0), 0);
