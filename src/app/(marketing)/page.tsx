import type { Metadata } from "next";
import CtaPhone from "@/components/sections/cta-phone";
import HeroSection from "@/components/sections/hero-section";
import ServicesCards from "@/components/sections/services-cards";
import Testimonials from "@/components/sections/testimonials";

export const metadata: Metadata = {
  title: "Liyen — Accompagnement numérique seniors en Guadeloupe",
  description:
    "Liyen accompagne les seniors de Guadeloupe dans l'utilisation du numérique : smartphone, démarches en ligne, visioconférence. À domicile et en groupe.",
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesCards />
      <Testimonials />
      <CtaPhone />
    </>
  );
}
