import { describe, expect, it } from "vitest";
import { contactSchema } from "../contact-schema";

const valid = {
  name: "Marie Dupont",
  email: "marie@exemple.fr",
  message: "Bonjour, je souhaite en savoir plus sur vos services.",
};

describe("contactSchema — cas valides", () => {
  it("accepte un payload minimal valide", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it("accepte un téléphone valide", () => {
    expect(contactSchema.safeParse({ ...valid, phone: "0690 00 00 00" }).success).toBe(true);
  });

  it("accepte un téléphone vide (champ optionnel)", () => {
    expect(contactSchema.safeParse({ ...valid, phone: "" }).success).toBe(true);
  });

  it("accepte un téléphone undefined", () => {
    expect(contactSchema.safeParse({ ...valid, phone: undefined }).success).toBe(true);
  });
});

describe("contactSchema — champ name", () => {
  it("rejette un nom trop court (< 2 caractères)", () => {
    const r = contactSchema.safeParse({ ...valid, name: "A" });
    expect(r.success).toBe(false);
    if (!r.success) expect(r.error.flatten().fieldErrors.name?.[0]).toMatch(/2 caractères/);
  });

  it("rejette un nom trop long (> 100 caractères)", () => {
    const r = contactSchema.safeParse({ ...valid, name: "A".repeat(101) });
    expect(r.success).toBe(false);
    if (!r.success) expect(r.error.flatten().fieldErrors.name?.[0]).toMatch(/trop long/);
  });
});

describe("contactSchema — champ email", () => {
  it("rejette un email sans @", () => {
    const r = contactSchema.safeParse({ ...valid, email: "pasunmail" });
    expect(r.success).toBe(false);
    if (!r.success) expect(r.error.flatten().fieldErrors.email?.[0]).toMatch(/email invalide/i);
  });

  it("rejette un email vide", () => {
    const r = contactSchema.safeParse({ ...valid, email: "" });
    expect(r.success).toBe(false);
  });
});

describe("contactSchema — champ phone", () => {
  it("rejette un numéro avec des lettres", () => {
    const r = contactSchema.safeParse({ ...valid, phone: "abc123" });
    expect(r.success).toBe(false);
    if (!r.success) expect(r.error.flatten().fieldErrors.phone?.[0]).toMatch(/invalide/i);
  });

  it("rejette un numéro trop long (> 20 caractères)", () => {
    const r = contactSchema.safeParse({ ...valid, phone: "0".repeat(21) });
    expect(r.success).toBe(false);
  });
});

describe("contactSchema — champ message", () => {
  it("rejette un message trop court (< 10 caractères)", () => {
    const r = contactSchema.safeParse({ ...valid, message: "Court" });
    expect(r.success).toBe(false);
    if (!r.success) expect(r.error.flatten().fieldErrors.message?.[0]).toMatch(/10 caractères/);
  });

  it("rejette un message trop long (> 2000 caractères)", () => {
    const r = contactSchema.safeParse({ ...valid, message: "A".repeat(2001) });
    expect(r.success).toBe(false);
    if (!r.success) expect(r.error.flatten().fieldErrors.message?.[0]).toMatch(/2000 caractères/);
  });
});
