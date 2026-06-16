import { test, expect } from "@playwright/test";

test("home loads", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /constellation/i })).toBeVisible();
  await expect(page.getByText(/WiVViW/i).first()).toBeVisible();
});

test("auth pages load", async ({ page }) => {
  await page.goto("/login");
  await expect(page.getByRole("heading", { name: /sign in/i })).toBeVisible();

  await page.goto("/signup");
  await expect(page.getByRole("heading", { name: /create account/i })).toBeVisible();

  await page.goto("/auth/confirm");
  await expect(page.getByRole("heading", { name: "Confirm your email" })).toBeVisible();
});

test("health endpoint responds", async ({ request }) => {
  const r = await request.get("/api/health");
  expect(r.ok()).toBeTruthy();
  const j = (await r.json()) as { ok?: boolean };
  expect(j.ok).toBeTruthy();
});
