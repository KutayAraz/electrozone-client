import { defineConfig, devices } from "@playwright/test";

// The test account and the API URL live in .env.e2e (see .env.e2e.example)
try {
  process.loadEnvFile(".env.e2e");
} catch {
  // No file: fall back to variables set in the shell
}

if (!process.env.E2E_EMAIL || !process.env.E2E_PASSWORD) {
  throw new Error("Set E2E_EMAIL and E2E_PASSWORD in .env.e2e (see .env.e2e.example)");
}

export default defineConfig({
  testDir: "./e2e",
  // The tests share one account, so they must not run at the same time
  workers: 1,
  use: {
    baseURL: "http://localhost:5173",
    trace: "retain-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  // Starts the frontend if it isn't running. The backend has to be started separately.
  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: true,
  },
});
