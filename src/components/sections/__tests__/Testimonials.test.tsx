import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Testimonials from "../testimonials";

describe("Testimonials", () => {
  it("affiche le titre de section", () => {
    render(<Testimonials />);
    expect(screen.getByRole("heading", { name: /Ils nous font confiance/i })).toBeInTheDocument();
  });

  it("affiche les noms des témoins", () => {
    render(<Testimonials />);
    expect(screen.getByText("Marie-Thérèse")).toBeInTheDocument();
    expect(screen.getByText("René")).toBeInTheDocument();
    expect(screen.getByText("Jacqueline")).toBeInTheDocument();
  });

  it("les étoiles ont un label accessible", () => {
    render(<Testimonials />);
    const stars = screen.getAllByRole("img", { name: /étoiles/i });
    expect(stars.length).toBeGreaterThanOrEqual(1);
  });
});
