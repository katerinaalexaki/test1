// Maps changed files in a merged PR to the doc pages they likely affect.

const MAX_SUGGESTIONS_PER_PR = 3;

const IGNORED_PATTERNS = [
  /\.test\.[tj]sx?$/,
  /\.spec\.[tj]sx?$/,
  /^config\//,
  /\.(json|ya?ml|toml|lock)$/,
];

/**
 * Content-graph-aware mapping. A changed file maps to a page only if the page
 * actually references a symbol, module or endpoint touched by the diff.
 */
export function mapChangedFilesToPages(
  changedFiles: string[],
  pages: DocPage[],
  diff: DiffSummary,
): DocPage[] {
  const relevant = changedFiles.filter(
    (f) => !IGNORED_PATTERNS.some((p) => p.test(f)),
  );
  if (relevant.length === 0) return [];

  const touched = new Set([
    ...diff.symbols,
    ...diff.exportedTypes,
    ...diff.endpoints,
  ]);

  const scored = pages
    .map((page) => ({
      page,
      overlap: page.references.filter((ref) => touched.has(ref)).length,
    }))
    .filter((c) => c.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap);

  return scored.slice(0, MAX_SUGGESTIONS_PER_PR).map((c) => c.page);
}

export interface DocPage {
  path: string;
  sourceHints: string[];
  references: string[];
}

export interface DiffSummary {
  symbols: string[];
  exportedTypes: string[];
  endpoints: string[];
}
