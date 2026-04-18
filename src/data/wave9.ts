import { Wave } from './curriculum-types';

export const wave9: Wave = {
  id: 'wave-9',
  number: 9,
  title: 'RAG & Evals — Ship the Stack',
  subtitle: 'Build a Production RAG System Over Your Own Docs',
  description: 'Six modules. Ingest your own documents, build through each step, and ship a RAG system measurably better than a naive baseline. The track that teaches RAG by making you build it.',
  color: '#14b8a6',
  icon: 'stack',
  weekRange: 'Week 9-12',
  totalXP: 0,
  units: [
    {
      id: 'w9-u1',
      waveId: 'wave-9',
      title: 'Module 1 — Baseline RAG',
      description: 'Ship the stupidest working RAG and feel where it breaks.',
      order: 1,
      lessons: [
        {
          id: 'w9-u1-l1',
          waveId: 'wave-9',
          unitId: 'w9-u1',
          title: 'Why We Start Dumb',
          description: 'Why your first RAG should be the simplest thing that barely works, and why that is the whole point.',
          duration: '7 min',
          difficulty: 'intermediate',
          xp: 25,
          order: 1,
          content: `# Why We Start Dumb

This track has one job. By the end of the six modules, you ship a Retrieval-Augmented Generation system over your own documents that is measurably better than the one you build in Module 1. The baseline has to exist before anything else, because it is the number you are going to beat.

So Module 1 is deliberately unimpressive.

:::key
RAG (Retrieval-Augmented Generation) is a pattern where an LLM answers questions by first retrieving relevant passages from your documents, then generating an answer grounded in what was retrieved. It is how you get accurate answers from a model about information the model was not trained on.
:::

## The Naive Version

Fixed-size chunks. One embedding model. Cosine top-k. Stuff everything into a Claude prompt and ask it to cite sources. No reranker. No query rewriter. No evaluation harness. No caching. Nothing that would make a good demo.

You will watch this RAG give a confidently wrong answer before the hour is out. That is the lesson. Every later module is motivated by one of the failures you see here. Skip the baseline and you will spend the rest of the track adding techniques without knowing which problem each one solves.

:::warning
The baseline will be wrong a lot. That is by design. If your baseline is already "good enough," you will never feel the forces that motivate chunking strategies, rerankers, query rewriting, and proper evals. The track falls apart without a crappy starting point.
:::

## What You Will Ship By the End

By Module 6, you will have:

- A working RAG pipeline over your own corpus
- Documented retrieval metrics (Recall@5, MRR, judge score) for five different configurations
- An evaluation harness that regression-tests future changes
- A cost log showing every dollar spent, per call
- A deployment running behind a reverse proxy with observability

Module 1 will have: a pipeline that answers some questions correctly. That is it.

## What Makes This Track Different

Most AI courses teach RAG as a recipe. You read about chunking, embeddings, and rerankers, then you are supposed to believe they matter.

This track teaches RAG as a failure investigation. You build the simplest thing, run it against a boss challenge designed to break it, and feel the failures. Then you add each technique — chunking strategy, hybrid search, reranking, query transformation, evals — because a specific failure forced you to.

:::tip
Reading about a technique and building the technique are not the same learning event. The reading tells you what exists. Building tells you when to reach for it. This track skips the first and insists on the second.
:::

## What You Need Before You Start

- Comfort reading Python and running it locally
- A corpus of your own documents you actually want to query (anything .md or .txt to start)
- API keys for Anthropic (generation) and either Voyage or OpenAI (embeddings)
- An hour. Just one, to get the baseline running.

:::key
The build environment for this track lives in a separate repository: [github.com/portofcams/bluewave-school](https://github.com/portofcams/bluewave-school). You clone it locally, run the pipeline against your own documents, and progress through modules by passing automated ship gates. Each lesson here walks you through what to build; the repo is where you actually build it.
:::

## The Boss Challenge

At the end of Module 1, your baseline will face a boss challenge: ten adversarial questions designed to break the naive pipeline. Cross-chunk synthesis. Definitional drift. Multi-hop reasoning. Needle-in-haystack. Negation.

Your baseline should score below fifty percent on the boss. That number becomes the scoreboard every future module has to beat.

Ready to build the worst RAG you will ever be proud of?`,
          exercises: [
            {
              id: 'w9-u1-l1-e1',
              type: 'quiz',
              question: 'What does RAG stand for, and what is the core idea?',
              options: [
                'Retrieval-Augmented Generation — the model retrieves relevant passages before answering',
                'Recursive Agent Generation — the model loops on itself until it is confident',
                'Rapid Answer Generator — a wrapper that caches LLM responses',
                'Retrieval-Adjacent Generation — the model answers from training data only',
              ],
              correctAnswer: 0,
              xpBonus: 5,
            },
            {
              id: 'w9-u1-l1-e2',
              type: 'quiz',
              question: 'Why is the Module 1 RAG deliberately unimpressive?',
              options: [
                'To save on API costs while the operator learns',
                'Because the author has not finished writing the better version',
                'So every later technique is motivated by a specific failure the operator feels firsthand',
                'To avoid overwhelming beginners with too many concepts at once',
              ],
              correctAnswer: 2,
              xpBonus: 5,
            },
            {
              id: 'w9-u1-l1-e3',
              type: 'free-response',
              question: 'Pick a topic you know well — your job, a hobby, a field you have read deeply in. If you built a RAG over documents in that topic, what are two questions where the baseline would probably get the right answer, and two where it would probably fail?',
              hint: 'Think about where the answer lives in one obvious place (baseline-friendly) versus where it requires synthesizing across multiple sources or understanding jargon drift (baseline-hostile).',
              xpBonus: 10,
            },
          ],
        },
        {
          id: 'w9-u1-l2',
          waveId: 'wave-9',
          unitId: 'w9-u1',
          title: 'The Four Moves',
          description: 'Every RAG pipeline does the same four things. Here is what each one looks like at its simplest.',
          duration: '12 min',
          difficulty: 'intermediate',
          xp: 30,
          order: 2,
          content: `# The Four Moves

Every RAG pipeline, no matter how sophisticated, does the same four things. Ingest. Retrieve. Generate. Log. Module 1 does each in its simplest form.

## Ingest

Read files off disk. For Module 1, only \`.md\` and \`.txt\`. PDFs, DOCX, HTML are more annoying and deferred to Module 2. The question at ingest time is: how do you cut the documents into pieces?

We cut on character count. 1800 characters per chunk, 200 characters of overlap between neighbours. Why character count and not tokens? Because token-aware chunking needs a tokenizer that matches your embedding model, and Module 1 would rather not take that dependency yet. Why 1800 and 200? Because they work. They are also wrong for roughly a third of the questions you will ask.

:::key
Fixed-size chunking is the simplest thing that works. Chunks might slice a sentence in half. A fact might land at the boundary between two chunks. That is fine for Module 1. Module 2 meets semantic and hierarchical chunking and shows you the price fixed-size charges.
:::

Each chunk gets an id of the form \`source/slug#n\` — the filename, then a chunk index. The id matters because the model is going to be asked to cite sources by id, and the ship gate is going to grade on whether the cited id appears in the top-k retrieved chunks.

## Embed

For each chunk, call an embedding model and get back a vector of floats. Module 1 defaults to Voyage's \`voyage-3\`. OpenAI's \`text-embedding-3-small\` is the fallback if you only have an OpenAI key.

Which one is better? It depends on your corpus. That is the whole content of Module 2 — you will compare them against each other on your own documents and see the delta.

For now: one embedding model, one provider, one corpus. Write the vectors and the chunk text into a vector database keyed by chunk id. The track uses Chroma, which runs locally out of the box.

:::tip
Embedding models turn text into points in high-dimensional space. Chunks about similar ideas land close together. A question gets embedded the same way as the chunks, and retrieval is just "which chunks are closest to the question?" If you remember this one mental model, every embedding decision later in the track makes sense.
:::

## Retrieve

When a question comes in, embed it the same way you embedded the chunks. Ask the vector database for the top five nearest neighbours by cosine similarity. That is it. No reranking. No hybrid with BM25. No query rewriting. Five chunks come out, five chunks go into the prompt.

This is the step that will bite you first. Watch for it on your own corpus — when the right chunk is in position 6 instead of 5, the answer falls apart. When the chunk embedding looks more like a lexically similar-but-wrong chunk than the right one, the answer falls apart. Modules 3 and 4 exist to make that happen less often.

## Generate

Build a prompt that looks roughly like this:

\`\`\`
System: You are a careful technical assistant answering from a provided corpus.
Use only the numbered sources. Cite sources inline by id.
If the sources do not contain the answer, say so.

User:
Question: <the question>

Sources:
[1] id=source-a
<chunk text>

[2] id=source-b
<chunk text>
...
\`\`\`

Send this to Claude Sonnet 4.6. Read the response. Done.

No decomposition. No agentic loops. No iterative retrieval. One turn. This is called a "stuff" prompt because you stuff all the retrieved chunks in at once. It works when chunks fit in context and when the right chunk is in the retrieved set. When either of those assumptions fails, the answer is wrong or empty.

:::example
A stuff prompt passing five retrieved chunks to Claude Sonnet 4.6 with the citation rule above typically costs a fraction of a cent per query at Module 1 corpus sizes. You can run the full boss challenge (ten questions) for less than five cents. That is cheap enough that the baseline is not something you have to protect — run it as often as you want while you build.
:::

## Log Cost

Every embed call, every query embedding, every generation writes one line to a \`costs.jsonl\` file. Tokens in, tokens out, dollars spent. The RAG works without this; you need it anyway.

The reason: when Module 2 asks you to compare three embedding providers across five hundred documents, you want the cost answer to be a \`tail\` of a log file, not a guess. Same for Module 6's cost dashboard. Start logging now, read the log later.

:::warning
It is tempting to skip cost logging because the baseline is cheap. Do not skip it. Module 2 and Module 3 run the same pipeline many times with different configurations, and without a log you will lose track of what each run cost. The discipline matters more than the number.
:::

## That Is The Whole Pipeline

Four moves. Ingest, retrieve, generate, log. If you understand each at the sketch level above, you understand every RAG system on the planet — the production ones just have smarter versions of each move.

Next lesson: the build task. You run it.`,
          exercises: [
            {
              id: 'w9-u1-l2-e1',
              type: 'quiz',
              question: 'Which of these is NOT one of the four moves of a RAG pipeline?',
              options: [
                'Ingest (chunk and embed documents)',
                'Retrieve (top-k by similarity)',
                'Fine-tune (update the LLM weights on your corpus)',
                'Generate (stuff retrieved chunks into an LLM prompt)',
              ],
              correctAnswer: 2,
              xpBonus: 5,
            },
            {
              id: 'w9-u1-l2-e2',
              type: 'quiz',
              question: 'Why does Module 1 chunk by character count instead of token count?',
              options: [
                'Character-based chunking produces better answers',
                'Token chunking is a deprecated approach',
                'Character count avoids needing a tokenizer that matches the embedding model',
                'Token chunking does not work with Chroma',
              ],
              correctAnswer: 2,
              xpBonus: 5,
            },
            {
              id: 'w9-u1-l2-e3',
              type: 'quiz',
              question: 'What does a "stuff prompt" do?',
              options: [
                'Sends every document in the corpus to the LLM at once',
                'Puts all retrieved chunks into the prompt in a single turn, no iteration',
                'Fills the prompt with random text to avoid caching',
                'Packs the prompt with tool-use examples for better grounding',
              ],
              correctAnswer: 1,
              xpBonus: 5,
            },
            {
              id: 'w9-u1-l2-e4',
              type: 'free-response',
              question: 'The baseline retrieves top-5 chunks and stuffs them all. Describe one realistic scenario where this approach produces a wrong answer, even though the right information exists somewhere in the corpus.',
              hint: 'Think about what could push the correct chunk to rank 6 or lower, or what could cause the LLM to ignore the correct chunk even when it is included.',
              xpBonus: 10,
            },
          ],
        },
        {
          id: 'w9-u1-l3',
          waveId: 'wave-9',
          unitId: 'w9-u1',
          title: 'Build It Yourself',
          description: 'Clone the repo, run the pipeline, pass the ship gate.',
          duration: '30 min',
          difficulty: 'intermediate',
          xp: 40,
          order: 3,
          content: `# Build It Yourself

The reading is over. Now you build.

The build environment for this track lives in [github.com/portofcams/bluewave-school](https://github.com/portofcams/bluewave-school) — a separate repository with the FastAPI backend, the baseline RAG primitives, the seed corpus, and the automated ship gate. You clone it, set up a local environment, and run it against the fixtures.

:::key
Why a separate repo? Because the build environment is a real Python app with a real RAG pipeline — Chroma, embeddings, Claude calls. It does not belong inside a Next.js marketing/school site. The repo is the thing you actually run; these lessons are the thing you actually read.
:::

## What You Will Do

Five commands. If your environment is ready, this takes twenty minutes end to end.

### 1. Clone

\`\`\`bash
git clone git@github.com:portofcams/bluewave-school.git
cd bluewave-school
\`\`\`

### 2. Add Your Keys

\`\`\`bash
cp .env.example .env
\`\`\`

Edit \`.env\` and fill in:

- \`ANTHROPIC_API_KEY\` — your Anthropic key for Claude Sonnet 4.6
- \`VOYAGE_API_KEY\` OR \`OPENAI_API_KEY\` — at least one embedding provider
- \`ADMIN_PASSWORD\` — any string; this gates the /ask and /corpus pages

### 3. Set Up

\`\`\`bash
scripts/setup.sh
\`\`\`

This creates a Python 3.12 virtualenv, installs all dependencies (\`chromadb\`, \`anthropic\`, \`voyageai\`, \`fastapi\`, etc.), and runs \`npm install\` for the Astro frontend.

### 4. Ingest the Seed Corpus

\`\`\`bash
scripts/seed-ingest.sh
\`\`\`

This ingests the bundled demo corpus — a handful of markdown files covering Anthropic docs, stack docs, and Hawaii prevailing wage rules. You will query against this first, before switching to your own documents.

### 5. Run the Ship Gate

\`\`\`bash
scripts/ship-gate.sh
\`\`\`

This runs the Module 1 ship gate against five fixture questions. You should see five PASS lines. If any fail, read the error carefully — the gate is loud on purpose.

:::tip
If the ship gate fails with "No embedding provider configured," your \`.env\` is not loaded. Check that \`source .env\` or \`set -a; source .env; set +a\` runs before the script — the provided scripts handle this automatically.
:::

## Browse It

Start the dev server:

\`\`\`bash
scripts/dev.sh
\`\`\`

The FastAPI app comes up on port 8010, the Astro frontend on port 4321.

- Open [http://localhost:4321/login](http://localhost:4321/login) and enter the \`ADMIN_PASSWORD\` you set
- Navigate to \`/ask\` and ask: *"What is the default TTL for prompt caching in the Anthropic API?"*
- Inspect the answer, the cited sources, and the metrics (retrieval_ms, generation_ms, cost_usd)

You just ran a full RAG pipeline end to end. Congratulations — this is the worst version of it you will ever ship.

## Ingest Your Own Corpus

The seed corpus is a demo. Your own documents are the real thing.

\`\`\`bash
python -m app.rag.cli ingest /path/to/your/docs --corpus mine
\`\`\`

Then query against \`corpus=mine\` in the /ask page or via CLI:

\`\`\`bash
python -m app.rag.cli ask "your question here" --corpus mine
\`\`\`

## The Boss Challenge

Once the ship gate passes and you have ingested your own corpus, run the boss challenge:

\`\`\`bash
python content/module-1-baseline/ship-gate.py \\
  --learner-module reference.module_1 \\
  --fixtures content/module-1-baseline/fixtures-boss.jsonl
\`\`\`

The boss has ten adversarial questions across five categories: cross-chunk synthesis, definitional drift, multi-hop, needle-in-haystack, and negation. Baseline RAG typically scores between 30% and 50%. Write down your number. It is the scoreboard.

:::warning
Do not skip the boss challenge. The score is the only thing that makes future modules honest. When Module 3 claims reranking improves retrieval, you check it against the exact same boss on the exact same corpus. No baseline number, no comparison, no learning.
:::

## If You Get Stuck

- Ship gate output is the first thing to read — errors are structured
- The \`data/costs.jsonl\` file shows every API call and its cost
- Open a GitHub issue on the bluewave-school repo with the ship-gate output pasted in

## You Are Done With Module 1

Once your ship gate passes 5/5 and you have recorded a boss-challenge baseline, Module 1 is complete. Module 2 starts with: "your chunking is wrong in three specific ways."`,
          exercises: [
            {
              id: 'w9-u1-l3-e1',
              type: 'quiz',
              question: 'Why is the build environment in a separate repository instead of embedded in the school?',
              options: [
                'Because the FastAPI + Chroma + Claude stack does not belong inside a Next.js marketing site',
                'Because the author wanted more GitHub repos',
                'Because the school cannot access private repos',
                'Because Python cannot run in a browser',
              ],
              correctAnswer: 0,
              xpBonus: 5,
            },
            {
              id: 'w9-u1-l3-e2',
              type: 'quiz',
              question: 'What does the Module 1 ship gate check?',
              options: [
                'That the RAG gives perfect answers on every question',
                'That the learner has paid for the course',
                'That the pipeline returns the expected shape, non-empty sources, and at least one correct source id per fixture',
                'That the cost per query is below a threshold',
              ],
              correctAnswer: 2,
              xpBonus: 5,
            },
            {
              id: 'w9-u1-l3-e3',
              type: 'free-response',
              question: 'After running the boss challenge against your own corpus, record your score and pick one of the ten questions the baseline got wrong. What category of failure was it (cross-chunk / drift / multi-hop / needle / negation) and why did the baseline fail?',
              hint: 'Be specific. "Retrieval was bad" is not enough — was the right chunk missing from top-k, was it present but the LLM ignored it, did the query embed to the wrong region?',
              xpBonus: 15,
            },
          ],
        },
        {
          id: 'w9-u1-l4',
          waveId: 'wave-9',
          unitId: 'w9-u1',
          title: 'What the Next Five Modules Unlock',
          description: 'A preview of Modules 2 through 6 — and the specific failure each one is designed to solve.',
          duration: '5 min',
          difficulty: 'intermediate',
          xp: 20,
          order: 4,
          content: `# What the Next Five Modules Unlock

You have a working baseline. It passes the ship gate. It probably failed 50-70% of the boss challenge. Each of the remaining five modules takes aim at a specific failure category and teaches the technique that fixes it.

:::key
Modules 2 through 6 are rolling out in the build environment. This lesson previews each one so you know what is coming. Check the repository and the school for new lessons as each module ships.
:::

## Module 2 — Embeddings and Chunking Strategy

**The failure it solves:** definitional drift and cross-chunk synthesis.

When your baseline fails because the corpus says "context caching" but the question asked about "prompt caching," that is an embeddings problem. When an answer spans two chunks that fixed-size chunking put far apart, that is a chunking problem. Module 2 makes you compare:

- Voyage vs. OpenAI embeddings on your corpus
- Fixed-size vs. semantic vs. hierarchical chunking
- Retrieval-metric deltas across all combinations

Ship gate: a documented comparison across three configurations, with a clear winner.

## Module 3 — Hybrid Search and Reranking

**The failure it solves:** needle-in-haystack.

Pure vector retrieval ranks ten lexically similar chunks roughly equal. When the right one is at rank 6, your stuff prompt never sees it. Module 3 adds:

- BM25 keyword retrieval alongside vector retrieval
- Reciprocal Rank Fusion (RRF) to combine the two
- A cross-encoder reranker (Cohere Rerank 3) to reshuffle the top 20 into the top 5 you actually send

Ship gate: measurable Recall@5 improvement over Module 1 on your own corpus.

## Module 4 — Query Transformation

**The failure it solves:** multi-hop questions.

"Which chapter governs public works solicitations on HIePRO?" requires retrieving what HIePRO is, then retrieving the chapter number. Baseline RAG cannot do two hops. Module 4 teaches:

- HyDE (Hypothetical Document Embeddings)
- Multi-query rewriting
- Question decomposition

Ship gate: a query transformer with A/B comparison against the raw-question baseline.

## Module 5 — Evaluation Framework

**The failure it solves:** you have no idea if changes help.

Up through Module 4, you have been eyeballing whether your RAG got better. That does not scale. Module 5 builds:

- Retrieval metrics (Recall@k, MRR, nDCG)
- LLM-as-judge for answer quality, using Claude Haiku 4.5 as the cheap judge
- A regression harness that compares runs across module configurations

Ship gate: a 30-question eval set scored across every prior module's configuration. You can finally answer "is Module 3 actually better than Module 1 on my corpus?"

## Module 6 — Production Concerns

**The failure it solves:** "it works on my laptop."

Module 6 takes your best RAG and makes it production-shaped:

- Prompt caching (Anthropic's \`cache_control\`) to cut costs
- Structured logging for observability
- Cost dashboards — reading the JSONL log you have been writing since Module 1
- Prompt versioning so you can A/B test prompt changes
- Failure-mode handling for empty retrievals, rate limits, and timeouts
- Deploy behind a reverse proxy

Ship gate: a production-deployed RAG with cost dashboards and prompt versioning, measurably better than Module 1 by at least 25% on your boss challenge.

## Where the Track Ends

By the end of Module 6, you will have:

- Six configurations of the same pipeline, all measured against the same boss
- Documented cost and latency for each
- A deployed production instance
- A completion artifact (a signed PDF plus a \`/verify/<hash>\` URL) describing what you built

The completion artifact is portfolio-grade. It says "I built a RAG system, here is how it performs on my corpus, here is what I learned at each module." That is the output.

:::tip
The single biggest predictor of whether someone finishes this track is whether they finished Module 1 within 48 hours of starting. The momentum from shipping a working baseline carries through. Starting and stopping between modules burns energy. If you have done Module 1, do Module 2 this week.
:::

Go ship.`,
          exercises: [
            {
              id: 'w9-u1-l4-e1',
              type: 'quiz',
              question: 'Which module solves "the right chunk is in position 6, so my top-5 retrieval misses it"?',
              options: [
                'Module 2 (Embeddings and Chunking)',
                'Module 3 (Hybrid Search and Reranking)',
                'Module 4 (Query Transformation)',
                'Module 5 (Evaluation)',
              ],
              correctAnswer: 1,
              xpBonus: 5,
            },
            {
              id: 'w9-u1-l4-e2',
              type: 'quiz',
              question: 'Which module is the one that finally lets you quantitatively compare configurations against the same corpus?',
              options: [
                'Module 2',
                'Module 3',
                'Module 4',
                'Module 5',
              ],
              correctAnswer: 3,
              xpBonus: 5,
            },
            {
              id: 'w9-u1-l4-e3',
              type: 'free-response',
              question: 'Looking at your own boss-challenge score from Module 1, which of the next five modules seems most likely to deliver the biggest lift against your specific failure pattern, and why?',
              hint: 'Revisit the question categories your baseline failed most often on (drift, multi-hop, needle, negation, cross-chunk). Each category maps to a specific module.',
              xpBonus: 15,
            },
          ],
        },
      ],
    },
  ],
};
