import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "github" : "list",

  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "mobile-safari",
      use: { ...devices["iPhone 13"] },
    },
  ],

  webServer: {
    // Le build standalone nécessite de copier static/ et public/ manuellement
    command: [
      "cp -r .next/static .next/standalone/.next/static",
      "cp -r public .next/standalone/public",
      "node .next/standalone/server.js",
    ].join(" && "),
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 15_000,
  },
});
