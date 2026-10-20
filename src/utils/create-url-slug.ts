export function createUrlSlug(productName: string): string {
  return (
    productName
      // Convert to lowercase
      .toLowerCase()
      // Split accented letters into a base letter and an accent mark ("é" -> "e" + "´")
      .normalize("NFD")
      // Drop the accent marks
      .replace(/\p{M}/gu, "")
      // The Turkish dotless "ı" has no accent mark to drop
      .replace(/ı/g, "i")
      // Replace any non-alphanumeric characters with a hyphen
      .replace(/[^a-z0-9]+/g, "-")
      // Remove leading and trailing hyphens
      .replace(/^-+|-+$/g, "")
      // Replace multiple consecutive hyphens with a single hyphen
      .replace(/--+/g, "-")
  );
}

/**
 * Read the product id back out of a `<name>-p-<id>` slug. The id is taken from
 * the end, because the name part can contain "-p-" itself ("Lenovo P 15").
 */
export function getProductIdFromSlug(productSlug: string): number | null {
  const match = /-p-(\d+)$/.exec(productSlug);

  return match ? Number(match[1]) : null;
}
