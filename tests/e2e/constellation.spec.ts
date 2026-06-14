import { test, expect } from "@playwright/test";

test.describe("WiVViW Constellation smoke", () => {
  test("homepage loads", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: /explore|sign in|enter dashboard/i }).first()).toBeVisible();
  });

  test("dashboard and galaxy browse", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(
      page.getByRole("heading", { name: /your brand workspace/i })
    ).toBeVisible();
    await page.goto("/dashboard/galaxy");
    await expect(page.getByText(/constellation|galaxy/i).first()).toBeVisible();
  });

  test("engine pages render", async ({ page }) => {
    await page.goto("/dashboard/engines/dranb");
    await expect(page.getByText(/dRANb/i).first()).toBeVisible();
    await page.goto("/dashboard/engines/brandl");
    await expect(page.getByText(/brandL/i).first()).toBeVisible();
  });
});
