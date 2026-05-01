"use client";

import { useState } from "react";
import { type InstitutionData, institutionSchema } from "@/lib/schemas/institution-schema";

type FormState = "idle" | "loading" | "success" | "error";

export default function InstitutionForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof InstitutionData, string>>>({});
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const raw = {
      institution: formData.get("institution") as string,
      contact_name: formData.get("contact_name") as string,
      role: formData.get("role") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      message: formData.get("message") as string,
    };

    const result = institutionSchema.safeParse(raw);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof InstitutionData, string>> = {};
      for (const [field, msgs] of Object.entries(result.error.flatten().fieldErrors)) {
        if (msgs?.[0]) fieldErrors[field as keyof InstitutionData] = msgs[0];
      }
      setErrors(fieldErrors);
      return;
    }

    setState("loading");
    try {
      const res = await fetch("/api/institutions", {
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
        <h3 className="text-xl font-bold text-text">Demande envoyée !</h3>
        <p className="text-text-muted">
          Merci pour votre intérêt. Nous vous contacterons rapidement pour discuter de votre projet.
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

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="institution" className="form-label">
            Nom de la structure{" "}
            <span className="text-primary" aria-hidden="true">
              *
            </span>
          </label>
          <input
            type="text"
            id="institution"
            name="institution"
            placeholder="CCAS de Pointe-à-Pitre"
            className="form-input"
            required
            aria-describedby={errors.institution ? "institution-error" : undefined}
            aria-invalid={!!errors.institution}
          />
          {errors.institution && (
            <p id="institution-error" role="alert" className="mt-1 text-sm text-red-600">
              {errors.institution}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact_name" className="form-label">
            Votre nom{" "}
            <span className="text-primary" aria-hidden="true">
              *
            </span>
          </label>
          <input
            type="text"
            id="contact_name"
            name="contact_name"
            autoComplete="name"
            placeholder="Jean Martin"
            className="form-input"
            required
            aria-describedby={errors.contact_name ? "contact-name-error" : undefined}
            aria-invalid={!!errors.contact_name}
          />
          {errors.contact_name && (
            <p id="contact-name-error" role="alert" className="mt-1 text-sm text-red-600">
              {errors.contact_name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="role" className="form-label">
            Fonction{" "}
            <span className="text-primary" aria-hidden="true">
              *
            </span>
          </label>
          <input
            type="text"
            id="role"
            name="role"
            placeholder="Directeur, Travailleur social…"
            className="form-input"
            required
            aria-describedby={errors.role ? "role-error" : undefined}
            aria-invalid={!!errors.role}
          />
          {errors.role && (
            <p id="role-error" role="alert" className="mt-1 text-sm text-red-600">
              {errors.role}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="form-label">
            Email professionnel{" "}
            <span className="text-primary" aria-hidden="true">
              *
            </span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            placeholder="contact@structure.fr"
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
            placeholder="0590 00 00 00"
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
      </div>

      <div>
        <label htmlFor="message" className="form-label">
          Votre projet{" "}
          <span className="text-primary" aria-hidden="true">
            *
          </span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Décrivez votre structure, le public concerné, et ce que vous souhaitez mettre en place…"
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
          "Envoyer la demande"
        )}
      </button>

      <p className="text-xs text-text-muted">
        Les champs marqués <span className="text-primary">*</span> sont obligatoires. Vos données ne
        seront pas transmises à des tiers.
      </p>
    </form>
  );
}
