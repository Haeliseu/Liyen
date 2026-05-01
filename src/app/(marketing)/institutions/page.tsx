import type { Metadata } from "next";
import InstitutionForm from "@/components/sections/institution-form";

export const metadata: Metadata = {
  title: "Partenariats institutionnels",
  description:
    "Liyen s'associe aux CCAS, France Services, médecins et résidences pour seniors en Guadeloupe. Ateliers numériques, interventions en groupe et offres sur mesure.",
  alternates: { canonical: "/institutions" },
  openGraph: { url: "/institutions" },
};

const partners = [
  {
    label: "CCAS",
    description:
      "Centres communaux d'action sociale — interventions en groupe, ateliers thématiques, suivi individualisé.",
  },
  {
    label: "France Services",
    description:
      "Points d'accueil de proximité — accompagnement aux démarches en ligne sur place ou à domicile.",
  },
  {
    label: "Médecins & maisons de santé",
    description:
      "Aide à la prise en main des outils de santé numérique : Ameli, Mon Espace Santé, téléconsultation.",
  },
  {
    label: "EHPAD & résidences",
    description:
      "Ateliers réguliers en résidence pour maintenir le lien social et familial via le numérique.",
  },
];

const offerings = [
  {
    title: "Ateliers collectifs",
    description:
      "Sessions de 2h pour des groupes de 4 à 8 personnes. Thèmes au choix : smartphone, visioconférence, démarches en ligne.",
  },
  {
    title: "Accompagnements individuels",
    description:
      "Séances à domicile pour les personnes à mobilité réduite ou qui nécessitent un suivi personnalisé.",
  },
  {
    title: "Formation des aidants",
    description:
      "Sensibilisation de vos équipes pour qu'elles puissent relayer les bonnes pratiques numériques auprès des bénéficiaires.",
  },
  {
    title: "Offre sur mesure",
    description:
      "Vous avez un projet spécifique ? Nous construisons ensemble un programme adapté à votre structure et votre public.",
  },
];

export default function InstitutionsPage() {
  return (
    <>
      {/* En-tête */}
      <section className="bg-background py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-4 text-4xl font-bold text-text md:text-5xl">
              Partenariats institutionnels
            </h1>
            <p className="text-lg text-text-muted">
              Ensemble, touchons les seniors qui en ont le plus besoin. Liyen s'intègre dans votre
              offre de services existante.
            </p>
          </div>
        </div>
      </section>

      {/* Partenaires */}
      <section className="bg-surface py-8 pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-8 text-2xl font-bold text-text">Nos partenaires</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {partners.map((p) => (
              <div key={p.label} className="rounded-2xl border border-border bg-background p-6">
                <div className="mb-3 inline-flex rounded-xl bg-secondary-light px-3 py-1 text-sm font-semibold text-secondary">
                  {p.label}
                </div>
                <p className="text-sm text-text-muted leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offres */}
      <section className="bg-background py-12 pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-8 text-2xl font-bold text-text">Ce que nous proposons</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {offerings.map((o) => (
              <div
                key={o.title}
                className="flex gap-4 rounded-2xl border border-border bg-surface p-6"
              >
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
                  <svg
                    className="h-4 w-4"
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
                </div>
                <div>
                  <h3 className="font-semibold text-text">{o.title}</h3>
                  <p className="mt-1 text-sm text-text-muted leading-relaxed">{o.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulaire institution */}
      <section className="bg-surface py-12 pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl">
            <div className="mb-8 text-center">
              <h2 className="mb-3 text-3xl font-bold text-text">Discutons de votre projet</h2>
              <p className="text-text-muted">
                Remplissez ce formulaire et nous vous contacterons sous 48h pour étudier ensemble ce
                que nous pouvons mettre en place.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-6 md:p-8">
              <InstitutionForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
