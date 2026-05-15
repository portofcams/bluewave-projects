/**
 * Welcome Email Drip Sequence Templates
 *
 * 3-email welcome series triggered after signup:
 *   Email 1 (immediate):  Welcome + what you get
 *   Email 2 (day 3):      Start your first AI project
 *   Email 3 (day 7):      Upgrade to unlock all waves
 *
 * These templates are designed to be consumed by the backend
 * (ai.portofcams.com) which handles Resend delivery and scheduling.
 * The frontend triggers the sequence via POST after registration.
 */

const API_BASE = 'https://ai.portofcams.com/api/bluewave';

// ── Types ──────────────────────────────────────────────────────────

export interface WelcomeEmailTemplate {
  id: string;
  subject: string;
  delayDays: number;
  html: (name: string) => string;
  plainText: (name: string) => string;
}

// ── Shared styles ──────────────────────────────────────────────────

const emailWrapper = (content: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BlueWave Projects</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0e1a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <!-- Logo -->
    <div style="text-align: center; margin-bottom: 32px;">
      <a href="https://bluewaveprojects.com" style="text-decoration: none;">
        <span style="font-size: 24px; font-weight: bold; color: #0091cc;">BlueWave</span>
        <span style="font-size: 24px; font-weight: 300; color: #ffffff;">Projects</span>
      </a>
    </div>

    <!-- Content -->
    <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; padding: 40px 32px;">
      ${content}
    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.05);">
      <p style="color: rgba(255,255,255,0.2); font-size: 12px; margin: 0;">
        BlueWave Projects - AI Consulting, Custom Apps & AI School
      </p>
      <p style="color: rgba(255,255,255,0.15); font-size: 11px; margin: 8px 0 0 0;">
        <a href="https://bluewaveprojects.com" style="color: rgba(255,255,255,0.3); text-decoration: underline;">Visit our site</a>
        &nbsp;&middot;&nbsp;
        <a href="%unsubscribe_url%" style="color: rgba(255,255,255,0.3); text-decoration: underline;">Unsubscribe</a>
      </p>
    </div>
  </div>
</body>
</html>
`;

const ctaButton = (text: string, url: string) =>
  `<div style="text-align: center; margin: 28px 0;">
    <a href="${url}" style="display: inline-block; background: linear-gradient(135deg, #0091cc, #0ea5e9); color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px; padding: 14px 36px; border-radius: 50px;">
      ${text}
    </a>
  </div>`;

// ── Email 1: Welcome ──────────────────────────────────────────────

const email1Html = (name: string) => emailWrapper(`
  <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0 0 8px 0;">
    Welcome aboard, ${name}!
  </h1>
  <p style="color: rgba(255,255,255,0.5); font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
    You just joined BlueWave AI School. Here is what you have access to:
  </p>

  <div style="margin: 24px 0;">
    <div style="display: flex; align-items: flex-start; margin-bottom: 16px;">
      <span style="color: #0ea5e9; font-size: 20px; margin-right: 12px; line-height: 1;">&#10003;</span>
      <div>
        <p style="color: #ffffff; font-size: 15px; font-weight: 600; margin: 0;">Wave 1: AI Fundamentals (Free)</p>
        <p style="color: rgba(255,255,255,0.4); font-size: 14px; margin: 4px 0 0 0;">8 interactive lessons covering what AI really is, how LLMs work, and prompt engineering basics.</p>
      </div>
    </div>
    <div style="display: flex; align-items: flex-start; margin-bottom: 16px;">
      <span style="color: #0ea5e9; font-size: 20px; margin-right: 12px; line-height: 1;">&#10003;</span>
      <div>
        <p style="color: #ffffff; font-size: 15px; font-weight: 600; margin: 0;">XP & Streaks</p>
        <p style="color: rgba(255,255,255,0.4); font-size: 14px; margin: 4px 0 0 0;">Earn XP for every lesson and exercise. Build streaks by learning daily.</p>
      </div>
    </div>
    <div style="display: flex; align-items: flex-start; margin-bottom: 16px;">
      <span style="color: #0ea5e9; font-size: 20px; margin-right: 12px; line-height: 1;">&#10003;</span>
      <div>
        <p style="color: #ffffff; font-size: 15px; font-weight: 600; margin: 0;">Hands-on Exercises</p>
        <p style="color: rgba(255,255,255,0.4); font-size: 14px; margin: 4px 0 0 0;">Practice with real-world prompts and scenarios -- not just theory.</p>
      </div>
    </div>
    <div style="display: flex; align-items: flex-start;">
      <span style="color: #0ea5e9; font-size: 20px; margin-right: 12px; line-height: 1;">&#10003;</span>
      <div>
        <p style="color: #ffffff; font-size: 15px; font-weight: 600; margin: 0;">Progress Tracking</p>
        <p style="color: rgba(255,255,255,0.4); font-size: 14px; margin: 4px 0 0 0;">Your progress syncs across devices. Pick up right where you left off.</p>
      </div>
    </div>
  </div>

  ${ctaButton('Start Learning', 'https://bluewaveprojects.com/school')}

  <p style="color: rgba(255,255,255,0.3); font-size: 13px; text-align: center; margin: 0;">
    Questions? Just reply to this email.
  </p>
`);

const email1Plain = (name: string) => `Welcome aboard, ${name}!

You just joined BlueWave AI School. Here's what you have access to:

- Wave 1: AI Fundamentals (Free) - 8 interactive lessons covering what AI really is, how LLMs work, and prompt engineering basics.
- XP & Streaks - Earn XP for every lesson and exercise. Build streaks by learning daily.
- Hands-on Exercises - Practice with real-world prompts and scenarios.
- Progress Tracking - Your progress syncs across devices.

Start learning: https://bluewaveprojects.com/school

Questions? Just reply to this email.

-- BlueWave Projects`;

// ── Email 2: Start your first project (Day 3) ─────────────────────

const email2Html = (name: string) => emailWrapper(`
  <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0 0 8px 0;">
    Ready to build, ${name}?
  </h1>
  <p style="color: rgba(255,255,255,0.5); font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
    You have been learning for a few days now. Time to put those skills to work with your first AI project.
  </p>

  <div style="background: rgba(14,165,233,0.05); border: 1px solid rgba(14,165,233,0.15); border-radius: 12px; padding: 24px; margin: 24px 0;">
    <h2 style="color: #0ea5e9; font-size: 18px; font-weight: 700; margin: 0 0 12px 0;">
      Wave 1: Your First AI Project
    </h2>
    <p style="color: rgba(255,255,255,0.5); font-size: 14px; line-height: 1.6; margin: 0 0 16px 0;">
      In Wave 1, you will learn to craft effective prompts, understand how LLMs think, and build a simple AI workflow. By the end, you will have a real, working AI tool.
    </p>
    <p style="color: rgba(255,255,255,0.3); font-size: 13px; margin: 0;">
      Estimated time: 2-3 hours &middot; 8 lessons &middot; 12 exercises
    </p>
  </div>

  <h3 style="color: #ffffff; font-size: 16px; font-weight: 600; margin: 24px 0 12px 0;">
    3 things to try today:
  </h3>
  <ol style="color: rgba(255,255,255,0.5); font-size: 14px; line-height: 1.8; padding-left: 20px; margin: 0 0 24px 0;">
    <li>Complete the "Prompt Anatomy" lesson to understand what makes a great prompt</li>
    <li>Try the hands-on exercise to write your first structured prompt</li>
    <li>Experiment with the AI Sandbox to test your prompts in real-time</li>
  </ol>

  ${ctaButton('Continue Wave 1', 'https://bluewaveprojects.com/school')}

  <p style="color: rgba(255,255,255,0.3); font-size: 13px; text-align: center; margin: 0;">
    Having trouble? Reply to this email and we will help you out.
  </p>
`);

const email2Plain = (name: string) => `Ready to build, ${name}?

You've been learning for a few days now. Time to put those skills to work with your first AI project.

Wave 1: Your First AI Project
In Wave 1, you'll learn to craft effective prompts, understand how LLMs think, and build a simple AI workflow. By the end, you'll have a real, working AI tool.

Estimated time: 2-3 hours | 8 lessons | 12 exercises

3 things to try today:
1. Complete the "Prompt Anatomy" lesson to understand what makes a great prompt
2. Try the hands-on exercise to write your first structured prompt
3. Experiment with the AI Sandbox to test your prompts in real-time

Continue Wave 1: https://bluewaveprojects.com/school

Having trouble? Reply to this email and we'll help you out.

-- BlueWave Projects`;

// ── Email 3: Upgrade (Day 7) ──────────────────────────────────────

const email3Html = (name: string) => emailWrapper(`
  <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0 0 8px 0;">
    Unlock the full journey, ${name}
  </h1>
  <p style="color: rgba(255,255,255,0.5); font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
    You have completed Wave 1 (or you are close). The real power is in Waves 2 through 8, where you go from prompting to building real AI-powered apps and automations.
  </p>

  <div style="margin: 24px 0;">
    <div style="display: grid; gap: 12px;">
      <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; padding: 16px;">
        <p style="color: #0ea5e9; font-size: 13px; font-weight: 700; margin: 0;">Wave 2-3</p>
        <p style="color: rgba(255,255,255,0.5); font-size: 14px; margin: 4px 0 0 0;">Advanced prompting, chain-of-thought, and multi-step AI workflows</p>
      </div>
      <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; padding: 16px;">
        <p style="color: #f97316; font-size: 13px; font-weight: 700; margin: 0;">Wave 4-5</p>
        <p style="color: rgba(255,255,255,0.5); font-size: 14px; margin: 4px 0 0 0;">AI agents, function calling, and building tools that think</p>
      </div>
      <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; padding: 16px;">
        <p style="color: #a855f7; font-size: 13px; font-weight: 700; margin: 0;">Wave 6-8</p>
        <p style="color: rgba(255,255,255,0.5); font-size: 14px; margin: 4px 0 0 0;">Production AI systems, fine-tuning, RAG, and deploying AI at scale</p>
      </div>
    </div>
  </div>

  <div style="background: linear-gradient(135deg, rgba(0,145,204,0.1), rgba(14,165,233,0.05)); border: 1px solid rgba(0,145,204,0.2); border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0;">
    <p style="color: #ffffff; font-size: 20px; font-weight: 700; margin: 0;">
      BlueWave School Pro
    </p>
    <p style="color: rgba(255,255,255,0.5); font-size: 14px; margin: 8px 0 4px 0;">
      All 9 waves &middot; 60+ lessons &middot; Certificates &middot; Priority support
    </p>
    <p style="color: #0ea5e9; font-size: 28px; font-weight: 700; margin: 12px 0;">
      $19/mo
    </p>
    <p style="color: rgba(255,255,255,0.3); font-size: 13px; margin: 0 0 16px 0;">
      Cancel anytime. 7-day free trial.
    </p>
  </div>

  ${ctaButton('Upgrade to Pro', 'https://bluewaveprojects.com/school#pricing')}

  <p style="color: rgba(255,255,255,0.3); font-size: 13px; text-align: center; margin: 0;">
    Not ready to upgrade? No worries -- Wave 1 is yours forever.
  </p>
`);

const email3Plain = (name: string) => `Unlock the full journey, ${name}

You've completed Wave 1 (or you're close). The real power is in Waves 2-8, where you go from prompting to building real AI-powered apps and automations.

Wave 2-3: Advanced prompting, chain-of-thought, and multi-step AI workflows
Wave 4-5: AI agents, function calling, and building tools that think
Wave 6-8: Production AI systems, fine-tuning, RAG, and deploying AI at scale

BlueWave School Pro
All 9 waves | 60+ lessons | Certificates | Priority support
$19/mo - Cancel anytime. 7-day free trial.

Upgrade: https://bluewaveprojects.com/school#pricing

Not ready to upgrade? No worries -- Wave 1 is yours forever.

-- BlueWave Projects`;

// ── Template registry ─────────────────────────────────────────────

export const welcomeEmails: WelcomeEmailTemplate[] = [
  {
    id: 'welcome-1',
    subject: 'Welcome to BlueWave AI School!',
    delayDays: 0,
    html: email1Html,
    plainText: email1Plain,
  },
  {
    id: 'welcome-2',
    subject: 'Start your first AI project',
    delayDays: 3,
    html: email2Html,
    plainText: email2Plain,
  },
  {
    id: 'welcome-3',
    subject: 'Unlock all 9 waves of AI mastery',
    delayDays: 7,
    html: email3Html,
    plainText: email3Plain,
  },
];

// ── Trigger welcome sequence ──────────────────────────────────────

/**
 * Triggers the welcome drip sequence on the backend.
 * Called after successful registration.
 * The backend handles scheduling emails 2 and 3 for days 3 and 7.
 */
export async function triggerWelcomeSequence(
  email: string,
  name: string,
  token?: string
): Promise<{ success: boolean; error?: string }> {
  // Backend endpoint /email/welcome-sequence is not implemented (only
  // /emails/enqueue + /emails/process exist). Until the drip orchestrator
  // is built, no-op so every signup doesn't fire a 404 + console warning.
  // Re-enable when the backend route lands.
  void email; void name; void token;
  return { success: false, error: 'not-implemented' };

  // eslint-disable-next-line no-unreachable
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE}/email/welcome-sequence`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ email, name }),
    });

    if (!res.ok) {
      // Non-critical: don't block signup if email trigger fails
      console.warn('Welcome sequence trigger failed:', res.status);
      return { success: false, error: `HTTP ${res.status}` };
    }

    return { success: true };
  } catch (err) {
    // Network error: silently fail, don't block the user
    console.warn('Welcome sequence trigger error:', err);
    return { success: false, error: 'Network error' };
  }
}
