/**
 * Format category/subcategory names from URL format to display format
 * Example: "smart-phones" -> "Smart Phones"
 */
export const formatCategoryName = (str: string, separator = "-"): string => {
  return str
    .split(separator)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

/**
 * Create product title for SEO
 * Format: "Product Name | Brand | Electrozone"
 */
export const createProductTitle = (productName: string, brand: string): string => {
  return `${productName} | ${brand} | Electrozone`;
};

/**
 * Create product description for SEO
 * Truncates description to optimal length for meta descriptions (~155 characters)
 */
export const createProductDescription = (
  productName: string,
  brand: string,
  description: string,
): string => {
  const baseText = `${productName} by ${brand}. `;
  const remainingLength = 155 - baseText.length - 3; // 3 for "..."

  if (description.length <= remainingLength) {
    return baseText + description;
  }

  return baseText + description.slice(0, remainingLength).trim() + "...";
};

/**
 * Create category page title
 * Format: "Category | Electrozone" or "Subcategory - Category | Electrozone"
 */
export const createCategoryTitle = (category: string, subcategory?: string): string => {
  const categoryName = formatCategoryName(category);

  if (subcategory) {
    const subcategoryName = formatCategoryName(subcategory);
    return `${subcategoryName} - ${categoryName} | Electrozone`;
  }

  return `${categoryName} | Electrozone`;
};

/**
 * Create category page description
 */
export const createCategoryDescription = (category: string, subcategory?: string): string => {
  const categoryName = formatCategoryName(category).toLowerCase();

  if (subcategory) {
    const subcategoryName = formatCategoryName(subcategory).toLowerCase();
    return `Shop the best ${subcategoryName} in ${categoryName}. Find top brands and deals at Electrozone.`;
  }

  return `Browse ${categoryName} products to find exactly what you're looking for at Electrozone.`;
};

/**
 * Create search page title
 */
export const createSearchTitle = (query: string, hasResults = true): string => {
  if (!query.trim()) {
    return "Search | Electrozone";
  }

  if (!hasResults) {
    return `No Results for "${query}" | Electrozone`;
  }

  return `"${query}" Search Results | Electrozone`;
};

/**
 * Create search page description
 */
export const createSearchDescription = (
  query: string,
  totalCount = 0,
  hasResults = true,
): string => {
  if (!query.trim()) {
    return "Search for electronics, gadgets, and more at Electrozone.";
  }

  if (!hasResults) {
    return `No products found for "${query}". Try adjusting your search terms to find great electronics at Electrozone.`;
  }

  return `Found ${totalCount.toLocaleString()} results for "${query}". Shop electronics with great deals at Electrozone.`;
};
