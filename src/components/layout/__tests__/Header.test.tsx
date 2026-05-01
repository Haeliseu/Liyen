import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Header from "../header";

// next/navigation mock
vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

describe("Header — rendu desktop", () => {
  it("affiche le logo", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: /liyen/i })).toBeInTheDocument();
  });

  it("affiche les liens de navigation", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: "Services" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "À propos" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument();
  });

  it("affiche le CTA téléphone", () => {
    render(<Header />);
    const telLinks = screen.getAllByRole("link", { name: /Nous appeler/i });
    expect(telLinks.length).toBeGreaterThanOrEqual(1);
    expect(telLinks[0]).toHaveAttribute("href", "tel:+590690000000");
  });
});

describe("Header — menu mobile", () => {
  it("le menu mobile est fermé par défaut", () => {
    render(<Header />);
    expect(
      screen.queryByRole("navigation", { name: /Navigation mobile/i })
    ).not.toBeInTheDocument();
  });

  it("ouvre le menu mobile au clic sur le bouton hamburger", async () => {
    render(<Header />);
    const btn = screen.getByRole("button", { name: /Ouvrir le menu/i });
    await userEvent.click(btn);
    expect(screen.getByRole("navigation", { name: /Navigation mobile/i })).toBeInTheDocument();
  });

  it("le bouton indique aria-expanded=true quand le menu est ouvert", async () => {
    render(<Header />);
    const btn = screen.getByRole("button", { name: /Ouvrir le menu/i });
    await userEvent.click(btn);
    expect(btn).toHaveAttribute("aria-expanded", "true");
  });

  it("ferme le menu au second clic", async () => {
    render(<Header />);
    const btn = screen.getByRole("button", { name: /Ouvrir le menu/i });
    await userEvent.click(btn);
    await userEvent.click(screen.getByRole("button", { name: /Fermer le menu/i }));
    expect(
      screen.queryByRole("navigation", { name: /Navigation mobile/i })
    ).not.toBeInTheDocument();
  });
});
