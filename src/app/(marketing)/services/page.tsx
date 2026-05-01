import type { Metadata } from "next";
import CtaPhone from "@/components/sections/cta-phone";

export const metadata: Metadata = {
  title: "Nos services",
  description:
    "Accompagnement smartphone, démarches en ligne, visioconférence et formations personnalisées pour les seniors en Guadeloupe. À domicile ou en groupe.",
  alternates: { canonical: "/services" },
  openGraph: { url: "/services" },
};

const services = [
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
      />
    ),
    title: "Smartphone & tablette",
    description:
      "Vous venez d'acquérir un smartphone ou une tablette et vous ne savez pas par où commencer ? Nous vous accompagnons pas à pas : passer des appels, envoyer des messages, prendre des photos, installer des applications utiles et sécuriser votre appareil.",
    details: [
      "Prise en main de l'appareil",
      "Applications essentielles",
      "Sécurité et vie privée",
      "Partage de photos en famille",
    ],
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    ),
    title: "Démarches en ligne",
    description:
      "Plus besoin de vous déplacer pour vos démarches administratives. Nous vous apprenons à utiliser les services en ligne essentiels en toute sécurité, à votre domicile ou en point d'accueil.",
    details: ["Ameli & Carte Vitale", "Impôts.gouv.fr", "Caf et retraite", "France Connect"],
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15 10l4.553-2.069A1 1 0 0121 8.876V15.12a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    ),
    title: "Visioconférence",
    description:
      "La distance ne doit pas vous isoler de vos proches. Nous vous apprenons à utiliser les outils de visioconférence pour voir et entendre vos enfants, petits-enfants ou amis, où qu'ils soient.",
    details: ["WhatsApp & FaceTime", "Zoom & Teams", "Google Meet", "Appels de groupe"],
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    ),
    title: "Formation personnalisée",
    description:
      "Chaque personne est différente. Nos séances s'adaptent entièrement à votre rythme et à votre niveau. Pas de jugement, pas de précipitation — juste un accompagnement bienveillant à votre mesure.",
    details: [
      "Séances à domicile (1h30)",
      "Ateliers en groupe (4 pers. max)",
      "Support en créole disponible",
      "Fiches récapitulatives offertes",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* En-tête */}
      <section className="bg-background py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-4 text-4xl font-bold text-text md:text-5xl">Nos services</h1>
            <p className="text-lg text-text-muted">
              Un accompagnement sur-mesure, à votre rythme, chez vous ou en groupe. Pas de jargon,
              pas de précipitation.
            </p>
          </div>
        </div>
      </section>

      {/* Cartes détaillées */}
      <section className="bg-surface py-8 pb-16 md:pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 md:grid-cols-2">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-2xl border border-border bg-background p-8"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    {service.icon}
                  </svg>
                </div>
                <h2 className="mb-3 text-xl font-bold text-text">{service.title}</h2>
                <p className="mb-5 text-text-muted leading-relaxed">{service.description}</p>
                <ul className="space-y-2">
                  {service.details.map((detail) => (
                    <li key={detail} className="flex items-center gap-2 text-sm text-text">
                      <svg
                        className="h-4 w-4 shrink-0 text-secondary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Note tarifs */}
          <div className="mx-auto mt-12 max-w-2xl rounded-2xl bg-primary-light p-6 text-center">
            <p className="font-semibold text-text">
              Première séance de découverte offerte et sans engagement.
            </p>
            <p className="mt-1 text-sm text-text-muted">
              Tarifs adaptés à chaque situation. Possibilité de financement via les CCAS ou France
              Services.
            </p>
          </div>
        </div>
      </section>

      <CtaPhone />
    </>
  );
}
