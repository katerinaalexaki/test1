// ADV-2244 - Cancel queued posts when compliance approval is revoked (hotfix 2026.9.2)

export type QueuedShareStatus = 'HELD_AWAITING_APPROVAL' | 'SCHEDULED' | 'PUBLISHED' | 'CANCELLED_REVOKED';

export async function onApprovalRevoked(
  itemId: string,
  deps: {
    findQueuedShares: (itemId: string) => Promise<{ id: string; userId: string; status: QueuedShareStatus }[]>;
    updateStatus: (shareId: string, status: QueuedShareStatus) => Promise<void>;
    notifyInApp: (userId: string, message: string) => Promise<void>;
    audit: (event: string, payload: Record<string, string>) => Promise<void>;
  }
) {
  const shares = await deps.findQueuedShares(itemId);
  for (const share of shares) {
    if (share.status !== 'SCHEDULED' && share.status !== 'HELD_AWAITING_APPROVAL') continue;
    await deps.updateStatus(share.id, 'CANCELLED_REVOKED');
    await deps.notifyInApp(
      share.userId,
      'A scheduled post was cancelled because the content is no longer approved'
    );
    await deps.audit('scheduling.share.cancelled_revoked', { shareId: share.id, itemId });
  }
  // If approval is granted again, posts are NOT re-queued automatically.
}
