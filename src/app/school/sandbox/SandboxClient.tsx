'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════ */

interface PromptTemplate {
  id: string;
  title: string;
  category: string;
  description: string;
  template: string;
  variables: { key: string; label: string; placeholder: string }[];
}

interface Challenge {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  instruction: string;
  badPrompt: string;
  hint: string;
  expertVersion: string;
}

/* ═══════════════════════════════════════════════════════════
   DATA — TEMPLATES
   ═══════════════════════════════════════════════════════════ */

const TEMPLATES: PromptTemplate[] = [
  {
    id: 'customer-email',
    title: 'Customer Email Response',
    category: 'Communication',
    description: 'Generate a professional reply to a customer inquiry or complaint.',
    template: `You are a {{role}} at {{company}}.

A customer named {{customer_name}} has reached out with the following message:
"{{customer_message}}"

Write a professional, empathetic email response that:
- Acknowledges their concern
- Provides a clear resolution or next steps
- Maintains a {{tone}} tone
- Keeps the response under 200 words`,
    variables: [
      { key: 'role', label: 'Your Role', placeholder: 'Customer Support Manager' },
      { key: 'company', label: 'Company Name', placeholder: 'BlueWave Tech' },
      { key: 'customer_name', label: 'Customer Name', placeholder: 'Sarah' },
      { key: 'customer_message', label: 'Customer Message', placeholder: 'I ordered a product 2 weeks ago and it still hasn\'t arrived...' },
      { key: 'tone', label: 'Tone', placeholder: 'warm and professional' },
    ],
  },
  {
    id: 'blog-outline',
    title: 'Blog Post Outline',
    category: 'Content',
    description: 'Create a structured blog post outline with SEO considerations.',
    template: `You are an experienced content strategist specializing in {{niche}}.

Create a detailed blog post outline for the topic: "{{topic}}"

Target audience: {{audience}}
Target word count: {{word_count}} words
Primary keyword: {{keyword}}

Include:
1. An attention-grabbing title (with the keyword)
2. Meta description (under 160 characters)
3. Introduction hook
4. 5-7 main sections with subpoints
5. A conclusion with a call to action
6. 3 internal linking opportunities`,
    variables: [
      { key: 'niche', label: 'Niche/Industry', placeholder: 'digital marketing' },
      { key: 'topic', label: 'Blog Topic', placeholder: 'How to Use AI for Small Business Growth' },
      { key: 'audience', label: 'Target Audience', placeholder: 'Small business owners aged 30-55' },
      { key: 'word_count', label: 'Word Count', placeholder: '1500' },
      { key: 'keyword', label: 'Primary Keyword', placeholder: 'AI for small business' },
    ],
  },
  {
    id: 'code-explainer',
    title: 'Code Explainer',
    category: 'Technical',
    description: 'Paste code and get a clear, structured explanation.',
    template: `You are a senior software engineer and technical educator.

Explain the following {{language}} code to someone with a {{skill_level}} understanding of programming:

\`\`\`{{language}}
{{code}}
\`\`\`

Your explanation should include:
1. **Purpose**: What does this code do overall?
2. **Step-by-step breakdown**: Walk through each significant section
3. **Key concepts**: Explain any important patterns or techniques used
4. **Potential improvements**: Suggest 1-2 ways the code could be improved
5. **Common pitfalls**: Note any gotchas a beginner might encounter`,
    variables: [
      { key: 'language', label: 'Programming Language', placeholder: 'JavaScript' },
      { key: 'skill_level', label: 'Skill Level', placeholder: 'beginner' },
      { key: 'code', label: 'Paste Your Code', placeholder: 'function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}' },
    ],
  },
  {
    id: 'meeting-summary',
    title: 'Meeting Summary',
    category: 'Productivity',
    description: 'Turn meeting notes or a transcript into structured action items.',
    template: `You are an executive assistant skilled at distilling meetings into actionable summaries.

Here are the notes/transcript from a {{meeting_type}} meeting:
"{{transcript}}"

Attendees: {{attendees}}

Create a structured meeting summary with:
1. **Meeting Overview** (2-3 sentences)
2. **Key Decisions Made** (bullet points)
3. **Action Items** (who, what, by when)
4. **Open Questions** (unresolved items)
5. **Next Steps** (follow-up meeting date/topics if mentioned)

Format for easy scanning. Use clear, concise language.`,
    variables: [
      { key: 'meeting_type', label: 'Meeting Type', placeholder: 'weekly team standup' },
      { key: 'transcript', label: 'Notes/Transcript', placeholder: 'John mentioned the new feature is 80% done. Maria said design review is needed before launch. Tom raised concerns about the deployment timeline...' },
      { key: 'attendees', label: 'Attendees', placeholder: 'John (Engineering), Maria (Design), Tom (DevOps)' },
    ],
  },
  {
    id: 'product-description',
    title: 'Product Description',
    category: 'Marketing',
    description: 'Turn product features into compelling marketing copy.',
    template: `You are a conversion-focused copywriter specializing in {{industry}}.

Write a compelling product description for: {{product_name}}

Key features:
{{features}}

Target customer: {{target_customer}}
Price point: {{price}}
Unique selling proposition: {{usp}}

Requirements:
- Lead with the primary benefit, not the feature
- Include sensory or emotional language
- Address the customer's main pain point
- End with a strong call to action
- Keep it under 150 words
- Format: headline + 2-3 short paragraphs`,
    variables: [
      { key: 'industry', label: 'Industry', placeholder: 'home fitness' },
      { key: 'product_name', label: 'Product Name', placeholder: 'AquaFit Resistance Bands Set' },
      { key: 'features', label: 'Key Features (one per line)', placeholder: '- 5 resistance levels\n- Latex-free material\n- Includes door anchor\n- Travel pouch included' },
      { key: 'target_customer', label: 'Target Customer', placeholder: 'Busy professionals who want to work out at home' },
      { key: 'price', label: 'Price Point', placeholder: '$29.99' },
      { key: 'usp', label: 'Unique Selling Point', placeholder: 'Only latex-free set with 5 levels at this price' },
    ],
  },
  {
    id: 'social-media',
    title: 'Social Media Post Series',
    category: 'Marketing',
    description: 'Generate a week of social media posts from a single topic.',
    template: `You are a social media strategist for a {{brand_type}} brand.

Create a 5-post social media series about: "{{topic}}"

Platform: {{platform}}
Brand voice: {{voice}}
Goal: {{goal}}

For each post include:
1. The post copy (within {{platform}} character limits)
2. Suggested image/visual description
3. 3-5 relevant hashtags
4. Best time to post
5. Engagement hook (question, poll, or CTA)

Make each post unique in angle — don't repeat the same message.`,
    variables: [
      { key: 'brand_type', label: 'Brand Type', placeholder: 'SaaS startup' },
      { key: 'topic', label: 'Topic', placeholder: 'Launching our new AI feature' },
      { key: 'platform', label: 'Platform', placeholder: 'LinkedIn' },
      { key: 'voice', label: 'Brand Voice', placeholder: 'Authoritative but approachable' },
      { key: 'goal', label: 'Campaign Goal', placeholder: 'Drive sign-ups for free trial' },
    ],
  },
  {
    id: 'data-analysis',
    title: 'Data Analysis Request',
    category: 'Technical',
    description: 'Structure a prompt for data analysis tasks.',
    template: `You are a data analyst with expertise in {{domain}}.

I have a dataset containing: {{dataset_description}}

I need you to:
{{analysis_goal}}

Please provide:
1. **Approach**: Outline your analysis methodology
2. **Key Metrics**: What metrics should I calculate?
3. **Visualization Recommendations**: What charts/graphs would best represent the findings?
4. **Code**: Write {{language}} code to perform this analysis
5. **Interpretation Guide**: How should I interpret the results?

Assumptions to state: any data quality issues to watch for.
Output format: {{output_format}}`,
    variables: [
      { key: 'domain', label: 'Domain', placeholder: 'e-commerce analytics' },
      { key: 'dataset_description', label: 'Dataset Description', placeholder: '12 months of sales transactions with date, product, quantity, revenue, and customer ID' },
      { key: 'analysis_goal', label: 'Analysis Goal', placeholder: 'Identify top-performing products and seasonal trends' },
      { key: 'language', label: 'Code Language', placeholder: 'Python (pandas + matplotlib)' },
      { key: 'output_format', label: 'Output Format', placeholder: 'Executive summary with charts' },
    ],
  },
  {
    id: 'sop-creator',
    title: 'SOP / Process Document',
    category: 'Productivity',
    description: 'Create a standard operating procedure from a rough process description.',
    template: `You are an operations consultant who creates clear, actionable SOPs.

Create a Standard Operating Procedure for: "{{process_name}}"

Current rough process:
{{rough_process}}

Department: {{department}}
Frequency: {{frequency}}
Tools used: {{tools}}

The SOP should include:
1. **Purpose & Scope**
2. **Prerequisites** (what's needed before starting)
3. **Step-by-step Instructions** (numbered, with screenshots placeholders)
4. **Decision Points** (if X then Y scenarios)
5. **Quality Checklist** (verification steps)
6. **Troubleshooting** (common issues and fixes)
7. **Revision History** (template)

Write for someone doing this task for the first time.`,
    variables: [
      { key: 'process_name', label: 'Process Name', placeholder: 'New Employee Onboarding' },
      { key: 'rough_process', label: 'Rough Process Description', placeholder: 'We send them a welcome email, set up accounts, schedule orientation meetings, assign a buddy...' },
      { key: 'department', label: 'Department', placeholder: 'Human Resources' },
      { key: 'frequency', label: 'How Often', placeholder: '2-3 times per month' },
      { key: 'tools', label: 'Tools/Systems Used', placeholder: 'Google Workspace, Slack, BambooHR' },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════
   DATA — CHALLENGES
   ═══════════════════════════════════════════════════════════ */

const CHALLENGES: Challenge[] = [
  {
    id: 'vague-to-specific',
    title: 'Vague to Specific',
    difficulty: 'Easy',
    instruction: 'This prompt is too vague. Rewrite it to be specific, with a clear role, context, and output format.',
    badPrompt: 'Write me something about marketing.',
    hint: 'Think about: Who is the AI? What specific marketing topic? Who is the audience? What format do you want?',
    expertVersion: `You are a B2B marketing strategist with 10 years of experience in SaaS.

Write a 500-word guide on creating an effective email drip campaign for a new SaaS product launch.

Target audience: Marketing managers at mid-size companies (50-200 employees).

Include:
- Recommended number of emails in the sequence
- Timing between each email
- Subject line best practices
- One example email outline

Tone: Professional but conversational.
Format: Numbered steps with bullet points under each.`,
  },
  {
    id: 'add-constraints',
    title: 'Add Constraints',
    difficulty: 'Easy',
    instruction: 'This prompt will give rambling, unfocused output. Add constraints to get a tight, useful response.',
    badPrompt: 'Explain how to start a business.',
    hint: 'Add: word limit, specific business type, target audience skill level, desired format (checklist? timeline?), and what to exclude.',
    expertVersion: `You are a startup advisor who has helped launch 50+ small businesses.

Create a 10-step checklist for launching an online service business (consulting, coaching, or freelancing) with less than $500 in startup capital.

Constraints:
- Each step should be 1-2 sentences max
- Focus on the first 30 days only
- Assume the reader has a marketable skill but zero business experience
- Do NOT cover: physical products, venture capital, or hiring employees
- Include estimated time and cost for each step

Format: Numbered checklist with time/cost in parentheses after each step.`,
  },
  {
    id: 'chain-of-prompts',
    title: 'Chain of Prompts',
    difficulty: 'Medium',
    instruction: 'This single massive prompt tries to do too much at once. Break it into a chain of 3-4 focused prompts that build on each other.',
    badPrompt: 'Research the electric vehicle market, analyze the top 5 competitors, create a SWOT analysis for a new EV startup, write a business plan executive summary, and design a go-to-market strategy with a 12-month timeline and budget.',
    hint: 'Each prompt in the chain should have one clear job. The output of prompt 1 becomes input for prompt 2, and so on. Think: Research -> Analyze -> Strategize -> Plan.',
    expertVersion: `**Prompt 1 — Research:**
"You are a market research analyst. Provide a concise overview of the current EV market: market size, growth rate, key trends, and the top 5 competitors with their market share and main differentiators. Format as a briefing document, under 400 words."

**Prompt 2 — Analysis (feed in Prompt 1 output):**
"Based on this market research: [paste output]. Create a SWOT analysis for a new EV startup entering this market. Focus on realistic opportunities for a company with $10M seed funding. Format as a 2x2 grid with 4-5 bullet points per quadrant."

**Prompt 3 — Strategy (feed in Prompts 1+2):**
"Given this market overview and SWOT analysis: [paste outputs]. Write a 300-word executive summary for a business plan targeting the [specific niche] segment. Include: value proposition, target customer, revenue model, and key milestones for Year 1."

**Prompt 4 — Go-to-Market (feed in all above):**
"Based on this business plan: [paste output]. Create a 12-month go-to-market timeline with monthly milestones, key activities, and estimated budget allocation across marketing, sales, and product development. Format as a table."`,
  },
  {
    id: 'output-formatting',
    title: 'Control the Output',
    difficulty: 'Medium',
    instruction: 'This prompt gives no guidance on output format. Rewrite it so the AI returns exactly the structure you need.',
    badPrompt: 'Compare React and Vue for building a web app.',
    hint: 'Specify: comparison criteria, format (table? pros/cons?), depth per point, who the recommendation is for, and what "winning" looks like.',
    expertVersion: `You are a senior frontend architect advising a team of 5 developers (intermediate skill level) choosing a framework for a mid-size B2B dashboard application.

Compare React and Vue across these exact criteria:
1. Learning curve (for a team that knows vanilla JS)
2. Ecosystem & third-party libraries
3. Performance for data-heavy dashboards
4. Hiring pool & community size
5. Long-term maintenance burden

Format your response as:
| Criteria | React | Vue | Winner |
(Use a markdown table with 1-2 sentence explanations in each cell)

After the table, provide:
- **Recommendation**: One framework with a 2-sentence justification
- **Caveat**: One scenario where you'd pick the other instead`,
  },
  {
    id: 'role-context-task',
    title: 'The RCT Framework',
    difficulty: 'Easy',
    instruction: 'Apply the Role-Context-Task framework to transform this bare prompt into something powerful.',
    badPrompt: 'Help me write a cover letter.',
    hint: 'Role: Who should the AI be? Context: What job, what background do you have? Task: What specific output with what constraints?',
    expertVersion: `**Role:** You are a career coach who has helped 200+ candidates land jobs at Fortune 500 companies. You specialize in making career changers stand out.

**Context:** I'm a former high school teacher (8 years) transitioning into corporate L&D (Learning & Development). I'm applying for a "Training Program Manager" role at Salesforce. My strengths are curriculum design, public speaking, and managing 150+ students. I have a new L&D certification from ATD.

**Task:** Write a cover letter (under 300 words) that:
- Opens with a compelling hook (not "I'm writing to apply...")
- Translates my teaching experience into corporate L&D language
- Addresses the career change directly as a strength
- Includes one specific, quantified achievement from teaching
- Ends with a confident call to action

Tone: Confident and warm, not generic or desperate.`,
  },
  {
    id: 'few-shot-examples',
    title: 'Few-Shot Prompting',
    difficulty: 'Hard',
    instruction: 'This prompt asks for a creative task but gives the AI no examples of what "good" looks like. Add 2-3 few-shot examples to guide the style and quality.',
    badPrompt: 'Write taglines for my coffee shop.',
    hint: 'Give 2-3 example taglines you like (from any brand), explain what makes them good, then ask the AI to generate in that style for your specific brand.',
    expertVersion: `You are a brand copywriter specializing in food & beverage.

I need 10 taglines for "Drift Coffee" — a surf-themed coffee shop in Santa Cruz, CA. We serve specialty pour-over coffee and fresh pastries. Our vibe is laid-back, ocean-inspired, premium but not pretentious.

Here are taglines I love from other brands (and why):
1. "Just Do It" (Nike) — 3 words, action-oriented, universal
2. "Think Different" (Apple) — challenges the norm, aspirational
3. "The Happiest Place on Earth" (Disney) — emotional, paints a picture

Notice the pattern: short (2-6 words), emotionally resonant, memorable.

Now generate 10 taglines for Drift Coffee that:
- Are 2-6 words each
- Connect coffee + ocean/surf culture
- Feel premium but approachable
- Could work on a cup, a sign, and an Instagram bio
- Avoid cliches like "wake up" or "rise and grind"

Format: Numbered list, tagline in bold, then a 1-sentence explanation of why it works.`,
  },
];

/* ═══════════════════════════════════════════════════════════
   TABS
   ═══════════════════════════════════════════════════════════ */

type Tab = 'templates' | 'builder' | 'challenges';

const TABS: { key: Tab; label: string; icon: React.ReactNode }[] = [
  {
    key: 'templates',
    label: 'Templates',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
  {
    key: 'builder',
    label: 'Builder',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  },
  {
    key: 'challenges',
    label: 'Challenges',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

/* ═══════════════════════════════════════════════════════════
   UTILITY — CLIPBOARD
   ═══════════════════════════════════════════════════════════ */

function useCopyToClipboard() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copy = useCallback(async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      /* fallback for older browsers */
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  }, []);

  return { copiedId, copy };
}

/* ═══════════════════════════════════════════════════════════
   COPY BUTTON COMPONENT
   ═══════════════════════════════════════════════════════════ */

function CopyButton({ text, id, copiedId, onCopy, className = '' }: {
  text: string;
  id: string;
  copiedId: string | null;
  onCopy: (text: string, id: string) => void;
  className?: string;
}) {
  const isCopied = copiedId === id;
  return (
    <button
      onClick={() => onCopy(text, id)}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
        isCopied
          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
          : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white/90'
      } ${className}`}
    >
      {isCopied ? (
        <>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy
        </>
      )}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════
   TEMPLATES TAB
   ═══════════════════════════════════════════════════════════ */

function TemplatesTab() {
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null);
  const [variableValues, setVariableValues] = useState<Record<string, string>>({});
  const { copiedId, copy } = useCopyToClipboard();

  function fillTemplate(template: PromptTemplate, values: Record<string, string>): string {
    let result = template.template;
    for (const v of template.variables) {
      const val = values[v.key] || v.placeholder;
      result = result.replace(new RegExp(`\\{\\{${v.key}\\}\\}`, 'g'), val);
    }
    return result;
  }

  if (selectedTemplate) {
    const filled = fillTemplate(selectedTemplate, variableValues);
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
        <button
          onClick={() => { setSelectedTemplate(null); setVariableValues({}); }}
          className="flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition mb-6"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Templates
        </button>

        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white">{selectedTemplate.title}</h3>
            <span className="text-xs font-medium text-cyan-400/80 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-2 py-0.5">
              {selectedTemplate.category}
            </span>
          </div>
        </div>

        <p className="text-white/60 text-sm mb-6">{selectedTemplate.description}</p>

        {/* Variable inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {selectedTemplate.variables.map((v) => (
            <div key={v.key} className={v.key === 'code' || v.key === 'transcript' || v.key === 'rough_process' || v.key === 'features' || v.key === 'customer_message' ? 'md:col-span-2' : ''}>
              <label className="block text-sm font-medium text-white/70 mb-1.5">{v.label}</label>
              {(v.key === 'code' || v.key === 'transcript' || v.key === 'rough_process' || v.key === 'features' || v.key === 'customer_message') ? (
                <textarea
                  value={variableValues[v.key] || ''}
                  onChange={(e) => setVariableValues({ ...variableValues, [v.key]: e.target.value })}
                  placeholder={v.placeholder}
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/90 text-sm placeholder:text-white/30 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition resize-y"
                />
              ) : (
                <input
                  type="text"
                  value={variableValues[v.key] || ''}
                  onChange={(e) => setVariableValues({ ...variableValues, [v.key]: e.target.value })}
                  placeholder={v.placeholder}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/90 text-sm placeholder:text-white/30 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition"
                />
              )}
            </div>
          ))}
        </div>

        {/* Preview */}
        <div className="relative">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-white/60">Generated Prompt</h4>
            <CopyButton text={filled} id={`template-${selectedTemplate.id}`} copiedId={copiedId} onCopy={copy} />
          </div>
          <pre className="bg-white/5 border border-white/10 rounded-lg p-4 text-sm text-white/80 whitespace-pre-wrap font-mono leading-relaxed overflow-x-auto max-h-[500px] overflow-y-auto">
            {filled}
          </pre>
        </div>
      </motion.div>
    );
  }

  /* Template grid */
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <p className="text-white/60 text-sm mb-6">
        Pre-built prompt templates you can study, customize, and copy. Fill in the blanks to generate a tailored prompt.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TEMPLATES.map((t, i) => (
          <motion.button
            key={t.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.25 }}
            onClick={() => setSelectedTemplate(t)}
            className="text-left bg-white/[0.03] border border-white/10 rounded-xl p-4 hover:bg-white/[0.06] hover:border-cyan-500/30 transition-all duration-200 group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-cyan-400/70 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-2 py-0.5">
                {t.category}
              </span>
              <svg className="w-4 h-4 text-white/20 group-hover:text-cyan-400/60 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="font-semibold text-white/90 mb-1">{t.title}</h3>
            <p className="text-sm text-white/50 line-clamp-2">{t.description}</p>
            <p className="text-xs text-white/30 mt-2">{t.variables.length} variable{t.variables.length !== 1 ? 's' : ''}</p>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   BUILDER TAB
   ═══════════════════════════════════════════════════════════ */

const ROLES = [
  'a helpful assistant',
  'a senior software engineer',
  'a marketing strategist',
  'a data analyst',
  'a creative copywriter',
  'an executive coach',
  'a legal advisor',
  'a financial analyst',
  'a UX researcher',
  'a project manager',
  'a customer success manager',
  'a technical writer',
];

const FORMATS = [
  'Bullet points',
  'Numbered list',
  'Short paragraph',
  'Detailed report',
  'Table/comparison',
  'Step-by-step guide',
  'Code with comments',
  'Email format',
  'JSON structured data',
  'Executive summary',
];

const TONES = [
  'Professional',
  'Casual',
  'Technical',
  'Friendly',
  'Formal',
  'Persuasive',
  'Empathetic',
  'Direct',
];

interface PromptScore {
  total: number;
  maxScore: number;
  checks: { label: string; passed: boolean; tip: string }[];
}

function scorePrompt(role: string, task: string, context: string, format: string, tone: string): PromptScore {
  const assembled = assemblePrompt(role, task, context, format, tone);
  const checks = [
    {
      label: 'Has a role',
      passed: role !== '' && role !== 'a helpful assistant',
      tip: 'Assign a specific role (e.g. "senior data scientist") for more expert responses.',
    },
    {
      label: 'Task is specific',
      passed: task.length > 20,
      tip: 'Be more specific about what you need. Short tasks produce vague outputs.',
    },
    {
      label: 'Includes context',
      passed: context.length > 10,
      tip: 'Add background info. Context helps the AI understand your situation.',
    },
    {
      label: 'Specifies format',
      passed: format !== '',
      tip: 'Tell the AI how to structure its response (bullets, table, etc.).',
    },
    {
      label: 'Sets a tone',
      passed: tone !== '',
      tip: 'Define the tone to match your audience (professional, casual, etc.).',
    },
    {
      label: 'Sufficient length',
      passed: assembled.length > 100,
      tip: 'Good prompts are usually 100+ characters. Add more detail for better results.',
    },
    {
      label: 'Has constraints',
      passed: /\b(under|less than|maximum|at most|no more than|limit|within|between)\b/i.test(assembled),
      tip: 'Add constraints like word limits or scope boundaries to keep output focused.',
    },
  ];

  const passed = checks.filter((c) => c.passed).length;
  return { total: passed, maxScore: checks.length, checks };
}

function assemblePrompt(role: string, task: string, context: string, format: string, tone: string): string {
  const parts: string[] = [];
  if (role) parts.push(`You are ${role}.`);
  if (context) parts.push(`\nContext:\n${context}`);
  if (task) parts.push(`\nTask:\n${task}`);
  const constraints: string[] = [];
  if (format) constraints.push(`Format your response as: ${format}`);
  if (tone) constraints.push(`Tone: ${tone}`);
  if (constraints.length) parts.push(`\n${constraints.join('\n')}`);
  return parts.join('\n');
}

function BuilderTab() {
  const [role, setRole] = useState('');
  const [customRole, setCustomRole] = useState('');
  const [task, setTask] = useState('');
  const [context, setContext] = useState('');
  const [format, setFormat] = useState('');
  const [tone, setTone] = useState('');
  const { copiedId, copy } = useCopyToClipboard();

  const effectiveRole = role === '__custom' ? customRole : role;
  const assembled = assemblePrompt(effectiveRole, task, context, format, tone);
  const score = scorePrompt(effectiveRole, task, context, format, tone);
  const scoreColor = score.total <= 2 ? 'text-red-400' : score.total <= 4 ? 'text-amber-400' : 'text-green-400';
  const scoreBg = score.total <= 2 ? 'bg-red-500/10 border-red-500/20' : score.total <= 4 ? 'bg-amber-500/10 border-amber-500/20' : 'bg-green-500/10 border-green-500/20';

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <p className="text-white/60 text-sm mb-6">
        Build a well-structured prompt step by step. The prompt score gives you real-time feedback on quality.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Inputs */}
        <div className="space-y-5">
          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">Role &mdash; &ldquo;You are...&rdquo;</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/90 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition appearance-none"
            >
              <option value="">Select a role...</option>
              {ROLES.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
              <option value="__custom">Custom role...</option>
            </select>
            {role === '__custom' && (
              <input
                type="text"
                value={customRole}
                onChange={(e) => setCustomRole(e.target.value)}
                placeholder="e.g., a senior data scientist at a health tech startup"
                className="w-full mt-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/90 text-sm placeholder:text-white/30 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition"
              />
            )}
          </div>

          {/* Task */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">Task &mdash; &ldquo;I need you to...&rdquo;</label>
            <textarea
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Describe what you want the AI to do. Be specific about the deliverable."
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/90 text-sm placeholder:text-white/30 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition resize-y"
            />
          </div>

          {/* Context */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">Context &mdash; &ldquo;Here&rsquo;s the background...&rdquo;</label>
            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Provide relevant background information, data, or constraints."
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/90 text-sm placeholder:text-white/30 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition resize-y"
            />
          </div>

          {/* Format + Tone */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">Format</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/90 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition appearance-none"
              >
                <option value="">Select format...</option>
                {FORMATS.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">Tone</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/90 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition appearance-none"
              >
                <option value="">Select tone...</option>
                {TONES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Right: Preview + Score */}
        <div className="space-y-5">
          {/* Prompt Score */}
          <div className={`border rounded-xl p-4 ${scoreBg}`}>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-white/80">Prompt Score</h4>
              <span className={`text-2xl font-bold ${scoreColor}`}>{score.total}/{score.maxScore}</span>
            </div>
            <div className="space-y-1.5">
              {score.checks.map((check) => (
                <div key={check.label} className="flex items-start gap-2 text-sm">
                  <span className={`mt-0.5 flex-shrink-0 ${check.passed ? 'text-green-400' : 'text-white/25'}`}>
                    {check.passed ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                    )}
                  </span>
                  <div>
                    <span className={check.passed ? 'text-white/70' : 'text-white/40'}>{check.label}</span>
                    {!check.passed && (
                      <p className="text-white/30 text-xs mt-0.5">{check.tip}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Generated Prompt */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-white/60">Your Prompt</h4>
              <CopyButton
                text={assembled}
                id="builder-prompt"
                copiedId={copiedId}
                onCopy={copy}
              />
            </div>
            <pre className="bg-white/5 border border-white/10 rounded-lg p-4 text-sm text-white/80 whitespace-pre-wrap font-mono leading-relaxed min-h-[200px] max-h-[400px] overflow-y-auto">
              {assembled || 'Your prompt will appear here as you fill in the fields...'}
            </pre>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   CHALLENGES TAB
   ═══════════════════════════════════════════════════════════ */

function ChallengesTab() {
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [userAttempt, setUserAttempt] = useState('');
  const [showExpert, setShowExpert] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const { copiedId, copy } = useCopyToClipboard();

  const difficultyColor: Record<string, string> = {
    Easy: 'text-green-400 bg-green-500/10 border-green-500/20',
    Medium: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    Hard: 'text-red-400 bg-red-500/10 border-red-500/20',
  };

  if (activeChallenge) {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
        <button
          onClick={() => { setActiveChallenge(null); setUserAttempt(''); setShowExpert(false); setShowHint(false); }}
          className="flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition mb-6"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Challenges
        </button>

        <div className="flex items-start gap-3 mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white">{activeChallenge.title}</h3>
            <span className={`text-xs font-medium border rounded-full px-2 py-0.5 ${difficultyColor[activeChallenge.difficulty]}`}>
              {activeChallenge.difficulty}
            </span>
          </div>
        </div>

        <p className="text-white/70 text-sm mb-6">{activeChallenge.instruction}</p>

        {/* Bad prompt */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-red-400/80">The Bad Prompt</h4>
            <CopyButton text={activeChallenge.badPrompt} id={`bad-${activeChallenge.id}`} copiedId={copiedId} onCopy={copy} />
          </div>
          <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4 text-sm text-white/70 font-mono">
            {activeChallenge.badPrompt}
          </div>
        </div>

        {/* Hint */}
        <div className="mb-6">
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-sm text-cyan-400/70 hover:text-cyan-400 transition flex items-center gap-1.5"
          >
            <svg className={`w-4 h-4 transition-transform ${showHint ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            {showHint ? 'Hide hint' : 'Show hint'}
          </button>
          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="mt-2 bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-3 text-sm text-cyan-300/80">
                  {activeChallenge.hint}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User attempt */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-white/70 mb-2">Your Improved Prompt</label>
          <textarea
            value={userAttempt}
            onChange={(e) => setUserAttempt(e.target.value)}
            placeholder="Write your improved version here..."
            rows={8}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white/90 text-sm placeholder:text-white/30 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition resize-y font-mono"
          />
          {userAttempt && (
            <div className="flex justify-end mt-2">
              <CopyButton text={userAttempt} id={`attempt-${activeChallenge.id}`} copiedId={copiedId} onCopy={copy} />
            </div>
          )}
        </div>

        {/* Reveal expert */}
        <div>
          <button
            onClick={() => setShowExpert(!showExpert)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              showExpert
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white/90'
            }`}
          >
            {showExpert ? 'Hide Expert Version' : 'Reveal Expert Version'}
          </button>

          <AnimatePresence>
            {showExpert && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-green-400/80">Expert Version</h4>
                    <CopyButton text={activeChallenge.expertVersion} id={`expert-${activeChallenge.id}`} copiedId={copiedId} onCopy={copy} />
                  </div>
                  <pre className="bg-green-500/5 border border-green-500/20 rounded-lg p-4 text-sm text-white/80 whitespace-pre-wrap font-mono leading-relaxed max-h-[500px] overflow-y-auto">
                    {activeChallenge.expertVersion}
                  </pre>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  }

  /* Challenge list */
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <p className="text-white/60 text-sm mb-6">
        Practice transforming bad prompts into great ones. Write your version, then reveal the expert answer.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CHALLENGES.map((c, i) => (
          <motion.button
            key={c.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.25 }}
            onClick={() => setActiveChallenge(c)}
            className="text-left bg-white/[0.03] border border-white/10 rounded-xl p-4 hover:bg-white/[0.06] hover:border-cyan-500/30 transition-all duration-200 group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-medium border rounded-full px-2 py-0.5 ${difficultyColor[c.difficulty]}`}>
                {c.difficulty}
              </span>
              <svg className="w-4 h-4 text-white/20 group-hover:text-cyan-400/60 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="font-semibold text-white/90 mb-1">{c.title}</h3>
            <p className="text-sm text-white/50 line-clamp-2">{c.instruction}</p>
            <p className="text-xs text-white/30 mt-3 font-mono truncate">&ldquo;{c.badPrompt}&rdquo;</p>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════ */

export default function SandboxClient() {
  const [activeTab, setActiveTab] = useState<Tab>('templates');

  return (
    <div className="min-h-screen bg-[#0a0f1a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Back link */}
        <Link
          href="/school/learn"
          className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition mb-8"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to AI School
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Prompt Playground
          </h1>
          <p className="text-white/60 text-lg max-w-2xl">
            Practice writing effective AI prompts. Study templates, build prompts step by step, and test your skills with challenges.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-white/5 rounded-xl border border-white/10 mb-8 w-fit">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.key
                  ? 'bg-cyan-500/20 text-cyan-400 shadow-sm'
                  : 'text-white/50 hover:text-white/80 hover:bg-white/5'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'templates' && <TemplatesTab />}
            {activeTab === 'builder' && <BuilderTab />}
            {activeTab === 'challenges' && <ChallengesTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
