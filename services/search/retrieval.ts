// Hybrid retrieval: BM25 + vector, fused with RRF, then reranked.
// Supersedes the weight-tuning approach described in ADR-003.

const RRF_K = 60;
const RERANK_CANDIDATES = 50;

export async function retrieve(
  query: string,
  workspaceId: string,
  path: "answer" | "instant",
): Promise<Result[]> {
  const [keyword, semantic] = await Promise.all([
    bm25Search(query, workspaceId),
    vectorSearch(query, workspaceId),
  ]);

  const fused = fuse(keyword, semantic).slice(0, RERANK_CANDIDATES);

  // Enabled on both paths. Hand-tuned per-workspace weights are dead code now.
  return rerank(query, fused);
}

function fuse(a: Result[], b: Result[]): Result[] {
  const scores = new Map<string, number>();
  a.forEach((r, i) => scores.set(r.id, (scores.get(r.id) ?? 0) + 1 / (RRF_K + i + 1)));
  b.forEach((r, i) => scores.set(r.id, (scores.get(r.id) ?? 0) + 1 / (RRF_K + i + 1)));
  return [...scores.entries()].sort((x, y) => y[1] - x[1]).map(([id, score]) => ({ id, score }));
}

declare function bm25Search(q: string, w: string): Promise<Result[]>;
declare function vectorSearch(q: string, w: string): Promise<Result[]>;
declare function rerank(q: string, r: Result[]): Promise<Result[]>;

export interface Result {
  id: string;
  score: number;
}
