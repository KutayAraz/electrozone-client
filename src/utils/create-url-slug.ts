export function createUrlSlug(productName: string): string {
    return productName
        // Convert to lowercase
        .toLowerCase()
        // Replace any non-alphanumeric characters with a hyphen
        .replace(/[^a-z0-9]+/g, '-')
        // Remove leading and trailing hyphens
        .replace(/^-+|-+$/g, '')
        // Replace multiple consecutive hyphens with a single hyphen
        .replace(/--+/g, '-');
}