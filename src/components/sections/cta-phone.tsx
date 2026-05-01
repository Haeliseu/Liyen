import Link from "next/link";

export default function CtaPhone() {
  return (
    <section className="bg-primary py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center" data-aos="fade-up">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Prêt à franchir le pas ?
          </h2>
          <p className="mb-8 text-lg text-white">
            Appelez-nous ou écrivez-nous — nous vous répondrons rapidement pour organiser une
            première séance sans engagement.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="tel:+590690000000"
              className="flex items-center gap-3 rounded-2xl bg-white px-8 py-4 text-xl font-bold text-primary shadow-lg transition-transform hover:scale-105"
            >
              <svg
                className="h-7 w-7"
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
              0690 00 00 00
            </a>
            <Link
              href="/contact"
              className="rounded-2xl border-2 border-white px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Envoyer un message
            </Link>
          </div>

          <p className="mt-6 text-sm text-white/90">
            Du lundi au vendredi, 8h – 18h · Intervention en Guadeloupe
          </p>
        </div>
      </div>
    </section>
  );
}
