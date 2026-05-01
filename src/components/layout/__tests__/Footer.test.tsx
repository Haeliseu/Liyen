import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Footer from "../footer";

describe("Footer", () => {
  it("affiche le nom de l'entreprise", () => {
    render(<Footer />);
    expect(screen.getByText(/Liyen/)).toBeInTheDocument();
  });

  it("affiche le lien téléphone", () => {
    render(<Footer />);
    const telLink = screen.getByRole("link", { name: /0690 00 00 00/i });
    expect(telLink).toHaveAttribute("href", "tel:+590690000000");
  });

  it("contient les liens de navigation", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "Services" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument();
  });
});
