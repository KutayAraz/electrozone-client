const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

/**
 * Format a price for display. Accepts numbers or the decimal strings the API returns.
 * Example: "4897" -> "$4,897.00"
 */
export const formatPrice = (value: number | string): string => priceFormatter.format(Number(value));
