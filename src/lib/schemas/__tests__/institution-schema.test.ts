import { describe, expect, it } from "vitest";
import { institutionSchema } from "../institution-schema";

const valid = {
  institution: "CCAS de Pointe-à-Pitre",
  contact_name: "Jean Martin",
  role: "Directeur",
  email: "jean.martin@ccas-pap.fr",
  message: "Nous souhaitons mettre en place un partenariat pour nos bénéficiaires.",
};

describe("institutionSchema — cas valides", () => {
  it("accepte un payload complet valide", () => {
    expect(institutionSchema.safeParse(valid).success).toBe(true);
  });

  it("accepte sans téléphone (optionnel)", () => {
    expect(institutionSchema.safeParse({ ...valid, phone: undefined }).success).toBe(true);
  });

  it("accepte téléphone vide", () => {
    expect(institutionSchema.safeParse({ ...valid, phone: "" }).success).toBe(true);
  });
});

describe("institutionSchema — champ institution", () => {
  it("rejette un nom de structure trop court", () => {
    const r = institutionSchema.safeParse({ ...valid, institution: "A" });
    expect(r.success).toBe(false);
    if (!r.success) expect(r.error.flatten().fieldErrors.institution?.[0]).toMatch(/structure/);
  });
});

describe("institutionSchema — champ contact_name", () => {
  it("rejette un nom trop court", () => {
    const r = institutionSchema.safeParse({ ...valid, contact_name: "X" });
    expect(r.success).toBe(false);
    if (!r.success) expect(r.error.flatten().fieldErrors.contact_name?.[0]).toMatch(/nom/i);
  });
});

describe("institutionSchema — champ role", () => {
  it("rejette une fonction trop courte", () => {
    const r = institutionSchema.safeParse({ ...valid, role: "A" });
    expect(r.success).toBe(false);
    if (!r.success) expect(r.error.flatten().fieldErrors.role?.[0]).toMatch(/fonction/i);
  });
});

describe("institutionSchema — champ email", () => {
  it("rejette un email invalide", () => {
    const r = institutionSchema.safeParse({ ...valid, email: "pas-un-email" });
    expect(r.success).toBe(false);
    if (!r.success) expect(r.error.flatten().fieldErrors.email?.[0]).toMatch(/email invalide/i);
  });
});

describe("institutionSchema — champ message", () => {
  it("rejette un message trop court", () => {
    const r = institutionSchema.safeParse({ ...valid, message: "Court" });
    expect(r.success).toBe(false);
    if (!r.success) expect(r.error.flatten().fieldErrors.message?.[0]).toMatch(/10 caractères/);
  });

  it("rejette un message trop long", () => {
    const r = institutionSchema.safeParse({ ...valid, message: "A".repeat(2001) });
    expect(r.success).toBe(false);
  });
});
