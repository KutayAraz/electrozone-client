import { expect, request, test } from "@playwright/test";

import { createUrlSlug } from "../src/utils/create-url-slug";

const apiUrl = process.env.E2E_API_URL ?? "http://localhost:3000/api";
const credentials = { email: process.env.E2E_EMAIL!, password: process.env.E2E_PASSWORD! };

interface Product {
  id: number;
  productName: string;
  stock: number;
  category: string;
  subcategory: string;
}

interface Cart {
  cartItems: { id: number; productName: string }[];
}

/**
 * Makes sure the account cart is not empty: with an empty one, checking out only the
 * guest cart would look the same as checking out a merged cart. Returns the account
 * cart's product names, and an in-stock product outside it for the guest to add.
 */
const prepareAccount = async () => {
  const api = await request.newContext({ baseURL: `${apiUrl}/` });

  try {
    await expect(await api.post("auth/login", { data: credentials })).toBeOK();

    const products: Product[] = await (await api.get("product/best-sellers")).json();
    const inStock = products.filter((product) => product.stock > 0);

    let cart: Cart = await (await api.get("cart/user")).json();
    if (cart.cartItems.length === 0) {
      await expect(
        await api.post("cart/user/item", { data: { productId: inStock[0].id, quantity: 1 } }),
      ).toBeOK();
      cart = await (await api.get("cart/user")).json();
    }

    const accountProductIds = new Set(cart.cartItems.map((item) => item.id));
    const guestProduct = inStock.find((product) => !accountProductIds.has(product.id));
    if (!guestProduct) throw new Error("No in-stock best seller outside the account cart");

    return { accountProducts: cart.cartItems.map((item) => item.productName), guestProduct };
  } finally {
    await api.dispose();
  }
};

test("a guest who logs in at checkout checks out only their guest cart", async ({ page }) => {
  const { accountProducts, guestProduct } = await prepareAccount();
  const { productName, category, subcategory, id } = guestProduct;

  // As a guest, add a product to the cart from its page
  await page.goto(`/category/${category}/${subcategory}/${createUrlSlug(productName)}-p-${id}`);

  // A first-time visitor is told the store is a demo
  await page.getByRole("button", { name: "Got it, start browsing" }).click();
  await expect(page.getByRole("dialog", { name: "Demo store notice" })).toBeHidden();

  await page.getByRole("button", { name: "Add to Cart" }).first().click();
  await expect(page.getByText("Product has been added to your cart")).toBeVisible();

  // Checking out as a guest leads to the login page
  await page.getByRole("link", { name: /basket/i }).click();
  await page.getByRole("button", { name: "Proceed to Checkout" }).click();
  await expect(page).toHaveURL("/auth/login");

  const loginForm = page.locator("form");
  await loginForm.getByLabel("Email").fill(credentials.email);
  await loginForm.getByLabel("Password").fill(credentials.password);
  await loginForm.getByRole("button", { name: "Login" }).click();

  // The checkout holds the guest's product and none of the account cart's products
  await expect(page).toHaveURL("/checkout");
  await expect(page.getByRole("heading", { name: productName, exact: true })).toBeVisible();
  for (const accountProduct of accountProducts) {
    await expect(page.getByRole("heading", { name: accountProduct, exact: true })).toHaveCount(0);
  }

  // Leave nothing behind: the guest cart would otherwise stay in the database
  await expect(await page.request.delete(`${apiUrl}/cart/session/clear`)).toBeOK();
});
