/**
 * Generates a URL-friendly slug from a given string.
 * Handles accented characters (Spanish/Portuguese), removes special chars,
 * and normalizes whitespace to hyphens.
 */
export function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFD")                   // Decompose accented characters
    .replace(/[\u0300-\u036f]/g, "")    // Remove diacritical marks
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")      // Remove non-alphanumeric chars
    .replace(/[\s_]+/g, "-")            // Replace spaces/underscores with hyphens
    .replace(/-+/g, "-")               // Collapse consecutive hyphens
    .replace(/^-+|-+$/g, "");          // Trim leading/trailing hyphens
}
