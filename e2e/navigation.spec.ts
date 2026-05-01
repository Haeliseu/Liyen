import { test, expect } from "@playwright/test";

const pages = [
  { path: "/", title: /Liyen/i },
  { path: "/services", title: /Services/i },
  { path: "/a-propos", title: /propos/i },
  { path: "/institutions", title: /Partenariats/i },
  { path: "/contact", title: /Contact/i },
];

test.describe("Navigation — toutes les pages se chargent", () => {
  for (const { path, title } of pages) {
    test(`${path} charge sans erreur`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (err) => errors.push(err.message));
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(page).toHaveTitle(title);
      expect(errors).toHaveLength(0);
    });
  }
});

test.describe("Navigation — liens du header", () => {
  test("tous les liens fonctionnent depuis l'accueil", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const mainNav = page.getByRole("navigation", { name: "Navigation principale" });

    await mainNav.getByRole("link", { name: "Services" }).click();
    await expect(page).toHaveURL("/services");

    await mainNav.getByRole("link", { name: /propos/i }).click();
    await expect(page).toHaveURL("/a-propos");

    await mainNav.getByRole("link", { name: "Institutions" }).click();
    await expect(page).toHaveURL("/institutions");

    await mainNav.getByRole("link", { name: "Contact" }).click();
    await expect(page).toHaveURL("/contact");

    await page.getByRole("banner").getByRole("link", { name: /Liyen — Accueil/i }).click();
    await expect(page).toHaveURL("/");
  });
});

test.describe("Navigation mobile — menu hamburger", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("ouvre et ferme le menu mobile", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const burger = page.getByRole("button", { name: /Ouvrir le menu/i });
    await expect(burger).toBeVisible();
    await burger.click();

    const mobileNav = page.getByRole("navigation", { name: "Navigation mobile" });
    await expect(mobileNav).toBeVisible();

    await mobileNav.getByRole("link", { name: "Services" }).click();
    await expect(page).toHaveURL("/services");
    await expect(page.getByRole("navigation", { name: "Navigation mobile" })).not.toBeVisible();
  });
});
