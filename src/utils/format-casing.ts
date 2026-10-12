export const formatString = (inputString: string, delimiter: string): string => {
  return inputString
    .split(delimiter)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Words that plain capitalization gets wrong, e.g. "tvs" -> "TVs"
const CATEGORY_WORD_OVERRIDES: Record<string, string> = {
  tvs: "TVs",
  pcs: "PCs",
  and: "&",
};

/**
 * Format a category/subcategory slug for display. Accepts "-" or "_" separators,
 * since URLs and API data use both.
 * Example: "tvs-and-soundbars" -> "TVs & Soundbars"
 */
export const formatCategoryName = (slug: string): string => {
  return slug
    .split(/[-_]/)
    .filter(Boolean)
    .map((word) => {
      const lower = word.toLowerCase();
      return CATEGORY_WORD_OVERRIDES[lower] ?? lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
};
