import { test, expect } from "@playwright/test";

test.describe("Formulaire de contact", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
    await page.waitForLoadState("networkidle");
  });

  test("affiche tous les champs requis", async ({ page }) => {
    await expect(page.getByLabel("Votre nom")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel(/Téléphone/i)).toBeVisible();
    await expect(page.getByLabel("Message")).toBeVisible();
    await expect(page.getByRole("button", { name: /Envoyer le message/i })).toBeVisible();
  });

  test("affiche les erreurs Zod si soumis vide", async ({ page }) => {
    await page.getByRole("button", { name: /Envoyer le message/i }).click();

    await expect(page.getByText(/Veuillez indiquer votre nom/i)).toBeVisible();
    await expect(page.getByText(/Adresse email invalide/i)).toBeVisible();
    await expect(page.getByText(/Votre message doit contenir/i)).toBeVisible();
  });

  test("affiche une erreur si email invalide", async ({ page }) => {
    await page.getByLabel("Votre nom").fill("Marie");
    await page.getByLabel("Email").fill("pas-un-email");
    await page.getByLabel("Message").fill("Bonjour, je voudrais un renseignement.");
    await page.getByRole("button", { name: /Envoyer le message/i }).click();

    await expect(page.getByText(/Adresse email invalide/i)).toBeVisible();
    await expect(page.getByText(/Veuillez indiquer votre nom/i)).not.toBeVisible();
  });

  test("les champs aria-invalid passent à true après erreur", async ({ page }) => {
    await page.getByRole("button", { name: /Envoyer le message/i }).click();

    await expect(page.getByText(/Veuillez indiquer votre nom/i)).toBeVisible();
    await expect(page.getByLabel("Votre nom")).toHaveAttribute("aria-invalid", "true");
    await expect(page.getByLabel("Message")).toHaveAttribute("aria-invalid", "true");
  });
});

test.describe("Formulaire de contact — mobile", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("formulaire complet utilisable sur mobile", async ({ page }) => {
    await page.goto("/contact");
    await page.waitForLoadState("networkidle");

    await page.getByLabel("Votre nom").fill("Jean Dupont");
    await page.getByLabel("Email").fill("jean@exemple.fr");
    await page.getByLabel("Message").fill("Je souhaite plus d'informations sur vos services.");

    const submitBtn = page.getByRole("button", { name: /Envoyer le message/i });
    await submitBtn.scrollIntoViewIfNeeded();
    await expect(submitBtn).toBeInViewport();
    await expect(submitBtn).toBeEnabled();
  });
});
