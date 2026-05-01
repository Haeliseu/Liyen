import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://liyen.fr";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Liyen — Accompagnement numérique seniors en Guadeloupe",
    template: "%s | Liyen",
  },
  description:
    "Liyen accompagne les seniors de Guadeloupe dans l'utilisation du numérique : smartphone, démarches en ligne, visioconférence. À domicile et en groupe.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Liyen",
    title: "Liyen — Accompagnement numérique seniors en Guadeloupe",
    description:
      "Liyen accompagne les seniors de Guadeloupe dans l'utilisation du numérique : smartphone, démarches en ligne, visioconférence. À domicile et en groupe.",
    url: BASE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Liyen — Accompagnement numérique seniors en Guadeloupe",
    description:
      "Liyen accompagne les seniors de Guadeloupe dans l'utilisation du numérique : smartphone, démarches en ligne, visioconférence. À domicile et en groupe.",
  },
  alternates: {
    canonical: BASE_URL,
  },
};

const UMAMI_URL = process.env.NEXT_PUBLIC_UMAMI_URL;
const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable} data-scroll-behavior="smooth">
      <body className="bg-background font-inter text-base text-text antialiased">
        <div className="flex min-h-screen flex-col">{children}</div>
        {/* Umami Analytics — sans cookies, RGPD-compatible */}
        {UMAMI_URL && UMAMI_WEBSITE_ID && (
          <script defer src={`${UMAMI_URL}/script.js`} data-website-id={UMAMI_WEBSITE_ID} />
        )}
      </body>
    </html>
  );
}
