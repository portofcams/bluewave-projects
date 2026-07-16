import type { Metadata } from "next";
import Script from "next/script";
import { PostHogProvider } from "@/components/PostHogProvider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bluewaveprojects.com"),
  title: "BlueWave Projects — AI consulting & software for Hawai'i operators · Honolulu",
  description:
    "Honolulu AI consulting studio. We build software for Hawai'i operators — STR compliance, harbor management, USCG, permits, and custom apps. Twenty production apps live. Subscribe, hire, or learn.",
  keywords: [
    "AI consulting Hawaii",
    "AI consulting Honolulu",
    "Hawaii software studio",
    "AI software Hawaii",
    "Hawaii operator software",
    "STR compliance software Hawaii",
    "harbor management software Hawaii",
    "Hawaii permit software",
    "custom AI apps Honolulu",
    "BlueWave Projects",
  ],
  alternates: {
    canonical: "https://bluewaveprojects.com",
  },
  openGraph: {
    title: "BlueWave Projects — AI consulting & software for Hawai'i operators",
    description:
      "Honolulu AI consulting studio. Twenty production apps for Hawai'i operators — STR, harbors, USCG, permits. Subscribe, hire, or learn.",
    url: "https://bluewaveprojects.com",
    siteName: "BlueWave Projects",
    type: "website",
    images: [{ url: "/og-default.png", width: 1200, height: 630, type: "image/png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BlueWave Projects — AI consulting & software for Hawai'i operators",
    description:
      "Honolulu AI consulting studio. Twenty apps for Hawaii operators — STR, harbors, USCG, permits.",
    images: ["/og-default.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <body className="font-sans">
        <PostHogProvider>{children}</PostHogProvider>
        {/* Two structured-data blocks: the product (SoftwareApplication)
            and the company behind it (LocalBusiness, Honolulu). Google
            uses LocalBusiness for the Hawaii local pack + maps; the
            SoftwareApplication block sets product context for the
            Search Console listing. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://bluewaveprojects.com/#business",
              name: "BlueWave Projects",
              description:
                "Honolulu-based AI software studio. AI consulting, custom applications, APIs, and the BlueWave AI School — built on Anthropic Claude.",
              url: "https://bluewaveprojects.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "440 Lewers St, Suite 603",
                addressLocality: "Honolulu",
                addressRegion: "HI",
                postalCode: "96815",
                addressCountry: "US",
              },
              email: "hello@bluewaveprojects.com",
              geo: {
                "@type": "GeoCoordinates",
                latitude: 21.3099,
                longitude: -157.8581,
              },
              areaServed: [
                { "@type": "State", name: "Hawaii" },
                { "@type": "City", name: "Honolulu" },
                { "@type": "City", name: "Kailua" },
                { "@type": "City", name: "Kahala" },
                { "@type": "City", name: "Kona" },
              ],
              founder: {
                "@type": "Person",
                name: "John Thomas",
                jobTitle: "Founder, Ikena Design & Build",
              },
              sameAs: ["https://ikenagroup.com"],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "BlueWave Projects",
              url: "https://bluewaveprojects.com",
              applicationCategory: "BusinessApplication",
              applicationSubCategory: "Construction Management",
              operatingSystem: "Web",
              description:
                "Multi-tenant project management for design-build contractors. AI scope generator, RoomPlan blueprint editor, client-shareable timelines, and off-market deal flow.",
              offers: [
                {
                  "@type": "Offer",
                  name: "Solo",
                  price: "0",
                  priceCurrency: "USD",
                  description: "Free trial — one project, full features",
                },
                {
                  "@type": "Offer",
                  name: "Pro",
                  price: "99",
                  priceCurrency: "USD",
                  priceSpecification: {
                    "@type": "UnitPriceSpecification",
                    price: "99",
                    priceCurrency: "USD",
                    unitText: "MONTH",
                  },
                  description: "Unlimited projects, client portal, team invites",
                },
              ],
              creator: {
                "@type": "Organization",
                name: "Ikena Design & Build",
                url: "https://ikenagroup.com",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Honolulu",
                  addressRegion: "HI",
                  addressCountry: "US",
                },
              },
              audience: {
                "@type": "Audience",
                audienceType: "Design-build contractors, renovation companies, custom home builders",
              },
            }),
          }}
        />
      </body>
      <Script
        defer
        src="/tracker.js"
        data-site="bluewaveprojects"
        strategy="afterInteractive"
      />
      {/* Google Analytics 4 — property "BlueWave Projects" in Ikena Group account.
          Anonymized IP, no advertising features. Complements PostHog (product
          analytics) and the first-party /tracker.js. */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-KSXSSCF8YP"
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-KSXSSCF8YP',{anonymize_ip:true});`}
      </Script>
    </html>
  );
}
