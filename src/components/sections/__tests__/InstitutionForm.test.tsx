import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import InstitutionForm from "../institution-form";

const fillValid = async () => {
  await userEvent.type(screen.getByLabelText(/Nom de la structure/i), "CCAS de Pointe-à-Pitre");
  await userEvent.type(screen.getByLabelText(/Votre nom/i), "Jean Martin");
  await userEvent.type(screen.getByLabelText(/Fonction/i), "Directeur");
  await userEvent.type(screen.getByLabelText(/Email professionnel/i), "jean@ccas.fr");
  await userEvent.type(
    screen.getByLabelText(/Votre projet/i),
    "Nous souhaitons mettre en place un partenariat pour nos bénéficiaires seniors."
  );
};

describe("InstitutionForm — rendu initial", () => {
  it("affiche tous les champs du formulaire", () => {
    render(<InstitutionForm />);
    expect(screen.getByLabelText(/Nom de la structure/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Votre nom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Fonction/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email professionnel/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Téléphone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Votre projet/i)).toBeInTheDocument();
  });

  it("affiche le bouton d'envoi", () => {
    render(<InstitutionForm />);
    expect(screen.getByRole("button", { name: /Envoyer la demande/i })).toBeInTheDocument();
  });
});

describe("InstitutionForm — validation côté client", () => {
  it("affiche les erreurs si on soumet vide", async () => {
    render(<InstitutionForm />);
    await userEvent.click(screen.getByRole("button", { name: /Envoyer la demande/i }));

    await waitFor(() => {
      expect(screen.getByText(/Veuillez indiquer le nom de votre structure/i)).toBeInTheDocument();
      expect(screen.getByText(/email invalide/i)).toBeInTheDocument();
    });
  });
});

describe("InstitutionForm — état succès", () => {
  it("affiche la confirmation après envoi réussi", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));

    render(<InstitutionForm />);
    await fillValid();
    await userEvent.click(screen.getByRole("button", { name: /Envoyer la demande/i }));

    await waitFor(() => {
      expect(screen.getByText(/Demande envoyée/i)).toBeInTheDocument();
    });

    vi.unstubAllGlobals();
  });
});

describe("InstitutionForm — état erreur serveur", () => {
  it("affiche un message d'erreur si l'API répond en erreur", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ error: "Erreur serveur" }),
      })
    );

    render(<InstitutionForm />);
    await fillValid();
    await userEvent.click(screen.getByRole("button", { name: /Envoyer la demande/i }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(/Erreur serveur/i);
    });

    vi.unstubAllGlobals();
  });
});
