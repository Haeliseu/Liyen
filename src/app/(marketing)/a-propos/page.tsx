import type { Metadata } from "next";
import CtaPhone from "@/components/sections/cta-phone";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Découvrez l'histoire et la mission de Liyen : accompagnement numérique pensé pour les seniors de Guadeloupe, avec patience et bienveillance.",
  alternates: { canonical: "/a-propos" },
  openGraph: { url: "/a-propos" },
};

const values = [
  {
    title: "Patience",
    description:
      "Nous prenons le temps qu'il faut. Pas de jugement, pas de précipitation — chaque personne avance à son propre rythme.",
  },
  {
    title: "Bienveillance",
    description:
      "Nos intervenants sont formés à l'accompagnement des seniors. L'écoute et le respect sont au cœur de chaque séance.",
  },
  {
    title: "Proximité",
    description:
      "Nous intervenons à domicile, en Guadeloupe. Pas besoin de se déplacer — nous venons à vous.",
  },
  {
    title: "Clarté",
    description:
      "Pas de jargon informatique. Nous expliquons avec des mots simples, des analogies du quotidien et des fiches récapitulatives.",
  },
];

export default function AProposPage() {
  return (
    <>
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Histoire */}
            <div>
              <h1 className="mb-6 text-4xl font-bold text-text md:text-5xl">Notre histoire</h1>
              <div className="space-y-4 text-lg text-text-muted leading-relaxed">
                <p>
                  Liyen est né d'un constat simple : en Guadeloupe comme partout, la numérisation
                  des services du quotidien avance vite. Trop vite pour beaucoup de seniors, qui se
                  retrouvent isolés face à des écrans qu'ils n'ont jamais apprivoisés.
                </p>
                <p>
                  Prendre rendez-vous en ligne, renouveler son ordonnance sur Ameli, voir ses
                  petits-enfants en vidéo depuis La Réunion — ces gestes simples peuvent sembler
                  insurmontables quand personne n'est là pour montrer comment faire, sans se moquer,
                  sans aller trop vite.
                </p>
                <p>
                  C'est pour combler ce manque que nous avons créé Liyen. <em>Liyen</em>, c'est le
                  mot créole pour <em>lien</em> — parce que le numérique doit créer du lien, pas de
                  l'exclusion.
                </p>
              </div>
            </div>

            {/* Valeurs */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-text">Nos valeurs</h2>
              <div className="space-y-4">
                {values.map((v) => (
                  <div key={v.title} className="flex gap-4">
                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary-light text-secondary">
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
                      <h3 className="font-semibold text-text">{v.title}</h3>
                      <p className="text-sm text-text-muted leading-relaxed">{v.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mission */}
          <div className="mt-16 rounded-2xl bg-primary-light p-8 md:p-10">
            <h2 className="mb-4 text-2xl font-bold text-text">Notre mission</h2>
            <p className="text-lg text-text-muted leading-relaxed">
              Rendre le numérique accessible à tous les seniors de Guadeloupe, quelle que soit leur
              situation — à domicile, en résidence ou via les structures d'accueil de proximité. Un
              accompagnement humain, patient et sur-mesure, pour que personne ne soit laissé de
              côté.
            </p>
          </div>
        </div>
      </section>

      <CtaPhone />
    </>
  );
}
