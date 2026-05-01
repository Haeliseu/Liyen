const testimonials = [
  {
    quote:
      "Grâce à Liyen, j'arrive maintenant à appeler ma fille en vidéo depuis La Réunion. C'est comme si elle était là avec moi.",
    name: "Marie-Thérèse",
    info: "74 ans, Pointe-à-Pitre",
  },
  {
    quote:
      "Je faisais des kilomètres pour mes démarches à la CAF. Maintenant je le fais depuis mon salon. Merci à l'équipe pour leur patience.",
    name: "René",
    info: "68 ans, Le Moule",
  },
  {
    quote:
      "J'avais peur de casser quelque chose en appuyant sur les mauvais boutons. Aujourd'hui je me sens à l'aise avec mon téléphone.",
    name: "Jacqueline",
    info: "71 ans, Basse-Terre",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-primary-light py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center" data-aos="fade-up">
          <h2 className="mb-4 text-3xl font-bold text-text md:text-4xl">Ils nous font confiance</h2>
          <p className="text-lg text-text-muted">
            Des seniors de toute la Guadeloupe qui ont repris confiance avec le numérique.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-2xl bg-surface p-6 shadow-sm"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Étoiles */}
              <div className="mb-4 flex gap-1" role="img" aria-label="5 étoiles sur 5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <svg
                    key={n}
                    className="h-5 w-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <blockquote className="grow">
                <p className="text-base italic text-text leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </blockquote>

              <figcaption className="mt-4 border-t border-border pt-4">
                <p className="font-semibold text-text">{t.name}</p>
                <p className="text-sm text-text-muted">{t.info}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
