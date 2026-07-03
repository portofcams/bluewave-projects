import type { Metadata } from "next";
import ChatWidget from "./ChatWidget";

const SITE = "https://bluewaveprojects.com";
const HUB_PATH = "/demos/ai-front-desk";
const BOOKING_LINK = "https://calendar.app.google/pceDoVP8SLCR9JS39";

export const metadata: Metadata = {
  title: "AI Front Desk — a live sample, Ikena Design & Build",
  description:
    "Try a live AI front desk built by Ikena Design & Build — answers questions, qualifies a request, and books a real hold, in a couple of exchanges. Sample business shown; the same pattern works for any small business.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: `${SITE}${HUB_PATH}` },
};

export default function AiFrontDeskDemo() {
  return (
    <div className="frontdesk-root">
      <style>{`
        .frontdesk-root {
          min-height: 100vh;
          background: linear-gradient(180deg, #0b0d0c 0%, #131615 100%);
          color: #f4f2ee;
          font-family: 'Inter', Arial, sans-serif;
          padding: 48px 20px 64px;
        }
        .frontdesk-wrap { max-width: 640px; margin: 0 auto; }
        .frontdesk-eyebrow {
          font-size: 10px; font-weight: 600; letter-spacing: .18em; text-transform: uppercase;
          color: #a1c5c4; margin-bottom: 14px;
        }
        .frontdesk-h1 {
          font-family: Georgia, 'Times New Roman', serif; font-weight: 300; font-size: 34px;
          line-height: 1.2; color: #fff; margin: 0 0 16px;
        }
        .frontdesk-lede { font-size: 16px; line-height: 1.7; color: #cfcdc7; margin: 0 0 12px; }
        .frontdesk-lede a { color: #a1c5c4; text-decoration: underline; text-underline-offset: 2px; }
        .frontdesk-note {
          font-size: 13px; line-height: 1.6; color: #8a8780; margin: 0 0 32px;
          border-left: 2px solid #2a2d2b; padding-left: 14px;
        }
        .frontdesk-widget {
          border: 1px solid #2a2d2b; border-radius: 4px; background: #101312;
          overflow: hidden; margin-bottom: 28px;
        }
        .frontdesk-window {
          min-height: 260px; max-height: 420px; overflow-y: auto; padding: 20px;
          display: flex; flex-direction: column; gap: 10px;
        }
        .frontdesk-empty { font-size: 14px; color: #6a6860; padding: 20px 4px; }
        .frontdesk-bubble {
          max-width: 80%; padding: 10px 14px; border-radius: 3px; font-size: 14.5px; line-height: 1.6;
        }
        .frontdesk-user { align-self: flex-end; background: #a1c5c4; color: #0b0d0c; }
        .frontdesk-assistant { align-self: flex-start; background: #1c201e; color: #f4f2ee; border: 1px solid #2a2d2b; }
        .frontdesk-typing { color: #6a6860; font-style: italic; }
        .frontdesk-error { font-size: 13px; color: #d9a679; padding: 8px 4px; line-height: 1.6; }
        .frontdesk-input-row { display: flex; border-top: 1px solid #2a2d2b; }
        .frontdesk-input {
          flex: 1; background: transparent; border: none; padding: 14px 16px; color: #f4f2ee;
          font-size: 14.5px; font-family: inherit; outline: none;
        }
        .frontdesk-input::placeholder { color: #55584f; }
        .frontdesk-send {
          background: #a1c5c4; color: #0b0d0c; border: none; padding: 0 22px; font-weight: 600;
          font-size: 13px; cursor: pointer; letter-spacing: .02em;
        }
        .frontdesk-send:disabled { opacity: .4; cursor: default; }
        .frontdesk-footer { font-size: 13px; color: #8a8780; line-height: 1.7; }
        .frontdesk-footer a { color: #a1c5c4; text-decoration: underline; text-underline-offset: 2px; }
        .frontdesk-brand {
          font-family: Georgia, 'Times New Roman', serif; font-size: 13px; letter-spacing: .2em;
          text-transform: uppercase; color: #6a6860; margin-top: 48px;
        }
      `}</style>
      <div className="frontdesk-wrap">
        <p className="frontdesk-eyebrow">Ikena Design &amp; Build — live sample</p>
        <h1 className="frontdesk-h1">An AI front desk that actually books the appointment.</h1>
        <p className="frontdesk-lede">
          This is the exact assistant logic — not a mockup — running for{" "}
          <strong>Kai Charters, a sample Oʻahu boat charter</strong>: it answers questions, qualifies what
          you need, checks a real calendar, and places a real hold. The business details below are made up
          for the demo. The pattern underneath — catch the inquiry, ask the right questions, check
          availability, confirm — is the same one that would get built around your actual services,
          whether that&rsquo;s booking a consultation, scheduling a fitting, or taking a reservation.
        </p>
        <p className="frontdesk-note">
          Sample business, real logic. Try: &ldquo;got a sunset cruise for 2 this weekend?&rdquo; or ask
          about pricing, what to bring, or cancellation — then try booking it.
        </p>

        <ChatWidget />

        <p className="frontdesk-footer">
          Built by <a href="https://ikenagroup.com">Ikena Design &amp; Build</a> — a studio that builds
          booking and AI systems for operators across Hawaii and Alaska. More of the build history,
          including live products like <a href="https://portofcams.com">Port of Cams</a>,{" "}
          <a href="https://binnacleai.com">Binnacle AI</a>, and{" "}
          <a href="https://probuildcalc.com">ProBuildCalc</a>, is at{" "}
          <a href="https://bluewaveprojects.com">bluewaveprojects.com</a>. One free working session to look
          at what this would take for your business — no obligation.{" "}
          <a href={BOOKING_LINK}>Grab a time here</a>.
        </p>
        <p className="frontdesk-brand">BLUEWAVE PROJECTS</p>
      </div>
    </div>
  );
}
