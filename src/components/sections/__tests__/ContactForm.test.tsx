import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ContactForm from "../contact-form";

describe("ContactForm — rendu initial", () => {
  it("affiche les champs nom, email, téléphone, message", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/votre nom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/téléphone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it("affiche le bouton d'envoi", () => {
    render(<ContactForm />);
    expect(screen.getByRole("button", { name: /Envoyer le message/i })).toBeInTheDocument();
  });
});

describe("ContactForm — validation côté client", () => {
  it("affiche les erreurs si on soumet le formulaire vide", async () => {
    render(<ContactForm />);
    await userEvent.click(screen.getByRole("button", { name: /Envoyer le message/i }));

    await waitFor(() => {
      expect(screen.getByText(/2 caractères minimum/i)).toBeInTheDocument();
      expect(screen.getByText(/email invalide/i)).toBeInTheDocument();
      expect(screen.getByText(/10 caractères/i)).toBeInTheDocument();
    });
  });

  it("marque les champs invalides avec aria-invalid", async () => {
    render(<ContactForm />);
    await userEvent.click(screen.getByRole("button", { name: /Envoyer le message/i }));

    await waitFor(() => {
      expect(screen.getByLabelText(/votre nom/i)).toHaveAttribute("aria-invalid", "true");
      expect(screen.getByLabelText(/email/i)).toHaveAttribute("aria-invalid", "true");
    });
  });

  it("n'affiche pas d'erreur si les champs requis sont valides", async () => {
    const mockFetch = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", mockFetch);

    render(<ContactForm />);
    await userEvent.type(screen.getByLabelText(/votre nom/i), "Marie Dupont");
    await userEvent.type(screen.getByLabelText(/email/i), "marie@exemple.fr");
    await userEvent.type(screen.getByLabelText(/message/i), "Bonjour, je voudrais en savoir plus.");
    await userEvent.click(screen.getByRole("button", { name: /Envoyer le message/i }));

    await waitFor(() => {
      expect(screen.queryByText(/2 caractères minimum/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/email invalide/i)).not.toBeInTheDocument();
    });

    vi.unstubAllGlobals();
  });
});

describe("ContactForm — état succès", () => {
  it("affiche le message de confirmation après envoi réussi", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));

    render(<ContactForm />);
    await userEvent.type(screen.getByLabelText(/votre nom/i), "Marie Dupont");
    await userEvent.type(screen.getByLabelText(/email/i), "marie@exemple.fr");
    await userEvent.type(screen.getByLabelText(/message/i), "Bonjour, je voudrais en savoir plus.");
    await userEvent.click(screen.getByRole("button", { name: /Envoyer le message/i }));

    await waitFor(() => {
      expect(screen.getByText(/Message envoyé/i)).toBeInTheDocument();
    });

    vi.unstubAllGlobals();
  });
});

describe("ContactForm — état erreur serveur", () => {
  it("affiche un message d'erreur si l'API échoue", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ error: "Erreur serveur" }),
      })
    );

    render(<ContactForm />);
    await userEvent.type(screen.getByLabelText(/votre nom/i), "Marie Dupont");
    await userEvent.type(screen.getByLabelText(/email/i), "marie@exemple.fr");
    await userEvent.type(screen.getByLabelText(/message/i), "Bonjour, je voudrais en savoir plus.");
    await userEvent.click(screen.getByRole("button", { name: /Envoyer le message/i }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(/Erreur serveur/i);
    });

    vi.unstubAllGlobals();
  });
});
