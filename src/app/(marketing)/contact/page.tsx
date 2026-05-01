import type { Metadata } from "next";
import ContactForm from "@/components/sections/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Liyen pour organiser une première séance d'accompagnement numérique en Guadeloupe. Appelez-nous ou envoyez-nous un message.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Coordonnées */}
          <div>
            <h1 className="mb-4 text-4xl font-bold text-text md:text-5xl">Contactez-nous</h1>
            <p className="mb-8 text-lg text-text-muted">
              Une question ? Envie de prendre rendez-vous ? Nous vous répondons dans la journée.
            </p>

            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+590690000000"
                  className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-primary hover:bg-primary-light"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
                    <svg
                      className="h-6 w-6"
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
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
                      Téléphone
                    </p>
                    <p className="text-lg font-bold text-text">0690 00 00 00</p>
                    <p className="text-sm text-text-muted">Lun – Ven, 8h – 18h</p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@liyen.fr"
                  className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-primary hover:bg-primary-light"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
                      Email
                    </p>
                    <p className="text-base font-semibold text-text">contact@liyen.fr</p>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
                  <svg
                    className="h-6 w-6"
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
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
                    Zone d'intervention
                  </p>
                  <p className="text-base font-semibold text-text">Guadeloupe (971)</p>
                  <p className="text-sm text-text-muted">
                    Déplacements à domicile partout sur l'île
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Formulaire connecté */}
          <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
            <h2 className="mb-6 text-2xl font-bold text-text">Envoyer un message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
