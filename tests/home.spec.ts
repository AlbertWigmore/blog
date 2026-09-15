import { expect, test } from "@playwright/test";

test("renders the home page", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Albert Wigmore's Blog");
  await expect(page.getByRole("heading", { name: "Posts" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "TILs" })).toBeVisible();
});

test("navigates from the homepage to the about page", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "About" }).click();

  await expect(page).toHaveURL(/\/about$/);
  await expect(page.getByRole("heading", { name: "About Me" })).toBeVisible();
});

test("navigates from the homepage to a post", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: /Starting a blog/ }).click();

  await expect(page).toHaveURL(/\/post\/20260829-starting$/);
  await expect(
    page.getByRole("heading", { name: "Starting a blog" }),
  ).toBeVisible();
});

test("navigates from the homepage to a TIL", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: /pbcopy/ }).click();

  await expect(page).toHaveURL(/\/til\/20260828-pbcopy$/);
  await expect(page.getByRole("heading", { name: "pbcopy" })).toBeVisible();
});
