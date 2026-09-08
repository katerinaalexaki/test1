// Maps changed files in a merged PR to the doc pages they likely affect.

const MAX_SUGGESTIONS_PER_PR = 5;

/** Path-prefix mapping: any doc under the same top-level prefix is a candidate. */
export function mapChangedFilesToPages(
  changedFiles: string[],
  pages: DocPage[],
): DocPage[] {
  const prefixes = new Set(changedFiles.map((f) => f.split("/")[0]));

  const candidates = pages.filter((page) =>
    page.sourceHints.some((hint) => prefixes.has(hint.split("/")[0])),
  );

  return candidates.slice(0, MAX_SUGGESTIONS_PER_PR);
}

export interface DocPage {
  path: string;
  sourceHints: string[];
}
