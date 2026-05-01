import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CtaPhone from "../cta-phone";

describe("CtaPhone", () => {
  it("affiche le numéro de téléphone", () => {
    render(<CtaPhone />);
    expect(screen.getByText(/0690 00 00 00/)).toBeInTheDocument();
  });

  it("le lien téléphone a le bon href", () => {
    render(<CtaPhone />);
    const link = screen.getByRole("link", { name: /0690 00 00 00/ });
    expect(link).toHaveAttribute("href", "tel:+590690000000");
  });

  it("affiche le lien vers la page contact", () => {
    render(<CtaPhone />);
    const link = screen.getByRole("link", { name: /Envoyer un message/i });
    expect(link).toHaveAttribute("href", "/contact");
  });

  it("affiche les horaires", () => {
    render(<CtaPhone />);
    expect(screen.getByText(/lundi au vendredi/i)).toBeInTheDocument();
  });
});
