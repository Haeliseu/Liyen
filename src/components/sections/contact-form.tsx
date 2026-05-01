"use client";

import { useState } from "react";
import { type ContactData, contactSchema } from "@/lib/schemas/contact-schema";

type FormState = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof ContactData, string>>>({});
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const raw = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      message: formData.get("message") as string,
    };

    const result = contactSchema.safeParse(raw);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactData, string>> = {};
      for (const [field, msgs] of Object.entries(result.error.flatten().fieldErrors)) {
        if (msgs?.[0]) fieldErrors[field as keyof ContactData] = msgs[0];
      }
      setErrors(fieldErrors);
      return;
    }

    setState("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      if (res.ok) {
        setState("success");
      } else {
        const data = await res.json();
        setErrorMessage(data.error ?? "Une erreur est survenue.");
        setState("error");
      }
    } catch {
      setErrorMessage("Impossible de contacter le serveur. Vérifiez votre connexion.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-secondary-light bg-secondary-light p-10 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-white">
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
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-text">Message envoyé !</h3>
        <p className="text-text-muted">
          Merci pour votre message. Nous vous répondrons dans les plus brefs délais.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {state === "error" && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {errorMessage}
        </div>
      )}

      <div>
        <label htmlFor="name" className="form-label">
          Votre nom{" "}
          <span className="text-primary" aria-hidden="true">
            *
          </span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          autoComplete="name"
          placeholder="Marie Dupont"
          className="form-input"
          required
          aria-describedby={errors.name ? "name-error" : undefined}
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <p id="name-error" role="alert" className="mt-1 text-sm text-red-600">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="form-label">
          Email{" "}
          <span className="text-primary" aria-hidden="true">
            *
          </span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          placeholder="marie@exemple.fr"
          className="form-input"
          required
          aria-describedby={errors.email ? "email-error" : undefined}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p id="email-error" role="alert" className="mt-1 text-sm text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="form-label">
          Téléphone <span className="text-text-muted text-sm font-normal">(facultatif)</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          autoComplete="tel"
          placeholder="0690 00 00 00"
          className="form-input"
          aria-describedby={errors.phone ? "phone-error" : undefined}
          aria-invalid={!!errors.phone}
        />
        {errors.phone && (
          <p id="phone-error" role="alert" className="mt-1 text-sm text-red-600">
            {errors.phone}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="form-label">
          Message{" "}
          <span className="text-primary" aria-hidden="true">
            *
          </span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Décrivez votre besoin…"
          className="form-input resize-none"
          required
          aria-describedby={errors.message ? "message-error" : undefined}
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <p id="message-error" role="alert" className="mt-1 text-sm text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={state === "loading"}
        className="btn btn-primary w-full disabled:opacity-60"
      >
        {state === "loading" ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="h-4 w-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Envoi en cours…
          </span>
        ) : (
          "Envoyer le message"
        )}
      </button>

      <p className="text-xs text-text-muted">
        Les champs marqués <span className="text-primary">*</span> sont obligatoires. Vos données ne
        seront pas transmises à des tiers.
      </p>
    </form>
  );
}
