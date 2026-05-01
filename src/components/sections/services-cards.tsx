import Link from "next/link";

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
      "Appels, SMS, photos, applications utiles — maîtrisez votre appareil en toute confiance.",
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
      "Ameli, impôts, Caf, retraite… Simplifiez vos démarches administratives depuis chez vous.",
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
    description: "WhatsApp, FaceTime, Zoom — restez proche de vos proches, même à distance.",
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
      "Séances à domicile ou en petit groupe, à votre rythme, avec pédagogie et patience.",
  },
];

export default function ServicesCards() {
  return (
    <section className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center" data-aos="fade-up">
          <h2 className="mb-4 text-3xl font-bold text-text md:text-4xl">
            Ce que nous faisons pour vous
          </h2>
          <p className="text-lg text-text-muted">
            Des accompagnements concrets, adaptés à vos besoins réels.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group rounded-2xl border border-border bg-background p-6 transition-shadow hover:shadow-md"
              data-aos="fade-up"
              data-aos-delay={index * 75}
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
              <h3 className="mb-2 text-base font-semibold text-text">{service.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center" data-aos="fade-up">
          <Link href="/services" className="btn btn-secondary">
            Voir tous les services
          </Link>
        </div>
      </div>
    </section>
  );
}
