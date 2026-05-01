import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background py-16 md:py-24 lg:py-32">
      {/* Fond décoratif */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary-light opacity-60 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-secondary-light opacity-40 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-light px-4 py-2 text-sm font-medium text-primary"
            data-aos="fade-up"
          >
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
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Guadeloupe
          </div>

          <h1
            className="mb-6 text-4xl font-bold leading-tight text-text md:text-5xl"
            data-aos="fade-up"
            data-aos-delay="50"
          >
            Le numérique, <span className="text-primary">simplement</span> à votre portée
          </h1>

          <p
            className="mb-8 text-lg text-text-muted md:text-xl"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Liyen accompagne les seniors de Guadeloupe dans l'utilisation du smartphone, des
            démarches en ligne et de la visioconférence — à votre rythme, chez vous ou en groupe.
          </p>

          <div
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            <a href="tel:+590690000000" className="btn btn-primary text-lg px-8 py-4">
              <svg
                className="mr-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Nous appeler
            </a>
            <Link href="/services" className="btn btn-secondary text-lg px-8 py-4">
              Découvrir nos services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
