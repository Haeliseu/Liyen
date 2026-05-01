import { test, expect } from "@playwright/test";

test.describe("Accessibilité — éléments essentiels", () => {
  test("CTA téléphone présent sur l'accueil", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const headerTel = page.getByRole("link", { name: /Nous appeler/i }).first();
    await expect(headerTel).toBeVisible();
    await expect(headerTel).toHaveAttribute("href", /tel:/);

    // Au moins un lien tel: dans le main
    await expect(page.getByRole("main").locator("a[href^='tel:']").first()).toBeAttached();
  });

  test("toutes les images ont un alt ou aria-hidden", async ({ page }) => {
    await page.goto("/");
    const imgs = page.locator("img");
    const count = await imgs.count();
    for (let i = 0; i < count; i++) {
      const img = imgs.nth(i);
      const alt = await img.getAttribute("alt");
      const ariaHidden = await img.getAttribute("aria-hidden");
      expect(alt !== null || ariaHidden === "true").toBeTruthy();
    }
  });

  test("le titre H1 est présent sur chaque page", async ({ page }) => {
    for (const path of ["/", "/services", "/a-propos", "/institutions", "/contact"]) {
      await page.goto(path);
      await expect(page.getByRole("heading", { level: 1 })).toBeAttached();
    }
  });

  test("les liens de navigation sont focusables au clavier", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.keyboard.press("Tab");
    await expect(page.locator(":focus")).toBeAttached();
  });
});

test.describe("Accessibilité — viewport mobile (390px)", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("le H1 est visible après animation AOS", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const hero = page.getByRole("heading", { level: 1 });
    await hero.scrollIntoViewIfNeeded();
    await page.waitForTimeout(650);
    await expect(hero).toBeVisible();
  });

  test("les boutons CTA ont une taille cible suffisante (≥44px)", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await page.getByRole("button", { name: /Ouvrir le menu/i }).click();
    const telBtn = page.getByRole("navigation", { name: "Navigation mobile" })
      .getByRole("link", { name: /Nous appeler/i });
    await expect(telBtn).toBeVisible();
    const box = await telBtn.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.height).toBeGreaterThanOrEqual(44);
  });
});
