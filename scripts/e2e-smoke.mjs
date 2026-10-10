import { chromium } from "playwright";

const BASE = "http://localhost:3000";
const email = `harker${Date.now()}@midnight.com`;
const password = "dracula1897";
const reviewText =
  "A masterwork of the dark — the curse of the Montanelli brood never let me sleep.";

const log = (m) => console.log("  • " + m);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
page.on("console", (m) => {
  if (m.type() === "error") errors.push("console: " + m.text());
});

try {
  // 1. Register
  log("Registering new account…");
  await page.goto(`${BASE}/register`, { waitUntil: "networkidle" });
  await page.fill("#name", "Jonathan Harker");
  await page.fill("#email", email);
  await page.fill("#password", password);
  await page.getByRole("button", { name: "Create account" }).click();
  await page.waitForURL(`${BASE}/`, { timeout: 15000 });
  log("Signed in and redirected to home.");

  // Verify the user menu is present (signed-in state).
  await page
    .waitForSelector('button[aria-label*="menu"], [role="menu"]', {
      timeout: 10000,
    })
    .catch(() => {});
  const headerHasName = await page
    .getByText("Jonathan", { exact: false })
    .first()
    .isVisible()
    .catch(() => false);
  log(`Header shows the user: ${headerHasName ? "yes" : "no (checking menu)"}`);

  // 2. Open a book
  log("Opening The Castle of Otranto…");
  await page.goto(`${BASE}/books/1`, { waitUntil: "networkidle" });
  await page.waitForSelector('button[aria-label="Add to favourites"]', {
    timeout: 10000,
  });

  // 3. Favourite it
  log("Adding to favourites…");
  await page.click('button[aria-label="Add to favourites"]');
  await page.waitForSelector('button[aria-label="Remove from favourites"]', {
    timeout: 10000,
  });
  log("Favourited (heart is now active).");

  // 4. Leave a review
  log("Writing a 5-star review…");
  await page.click('button[aria-label="5 stars"]');
  await page.fill('textarea[name="text"]', reviewText);
  await page.getByRole("button", { name: "Publish review" }).click();

  // Wait for the review to render in the list.
  await page.waitForSelector(`text=${reviewText}`, { timeout: 15000 });
  log("Review published and visible.");

  // 5. Verify the average rating updated.
  const hasRating = await page
    .getByText(/5\.0 · 1 review/)
    .first()
    .isVisible()
    .catch(() => false);
  log(`Rating aggregate shows "5.0 · 1 review": ${hasRating ? "yes" : "no"}`);

  await page.screenshot({ path: "/tmp/e2e-book.png", fullPage: true });

  // 6. Verify the account page lists the favourite + review.
  log("Checking the account page…");
  await page.goto(`${BASE}/account`, { waitUntil: "networkidle" });
  const favOnAccount = await page
    .getByText("The Castle of Otranto")
    .first()
    .isVisible()
    .catch(() => false);

  // Switch to the Reviews tab (Favourites is the default).
  await page.getByRole("tab", { name: /Reviews/ }).click();
  await page.waitForTimeout(400);
  const reviewOnAccount = await page
    .getByText(reviewText)
    .first()
    .isVisible()
    .catch(() => false);
  log(`Favourite on account page: ${favOnAccount ? "yes" : "no"}`);
  log(`Review on account page: ${reviewOnAccount ? "yes" : "no"}`);

  const realErrors = errors.filter(
    (e) => !e.includes("Download the React DevTools"),
  );
  console.log("\n=== RESULT ===");
  console.log(
    realErrors.length === 0
      ? "✅ No page errors."
      : "❌ Page errors:\n" + realErrors.join("\n"),
  );
  console.log(
    favOnAccount && reviewOnAccount && hasRating
      ? "✅ E2E SMOKE TEST PASSED"
      : "⚠️ E2E completed but some checks were false — inspect /tmp/e2e-book.png",
  );
} catch (err) {
  console.error("\n❌ E2E FAILED:", err.message);
  await page.screenshot({ path: "/tmp/e2e-fail.png", fullPage: true });
  process.exitCode = 1;
} finally {
  await browser.close();
}
