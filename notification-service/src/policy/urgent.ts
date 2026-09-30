// NOTIF-818: urgent push permissions.
export type Role = 'global_admin' | 'channel_admin' | 'content_manager' | 'user';

export interface Sender { role: Role; permissions: string[] }

export function canSendUrgent(s: Sender): boolean {
  if (s.role === 'global_admin') return true;
  return s.role === 'channel_admin' && s.permissions.includes('critical_comms');
}

// Urgent pushes bypass the frequency cap and quiet hours.
// A reason (min 10 chars) is mandatory and written to the audit log.
export function validateReason(reason: string) {
  if (!reason || reason.trim().length < 10) throw new Error('Urgent push requires a reason (min 10 characters)');
}

// NOTIF-841: four-eyes control on urgent pushes from Channel Admins.
// Channel Admin urgent push -> PENDING_APPROVAL. Any Global Admin approves/rejects.
// No decision within 15 min -> sent as a STANDARD push (respects cap + quiet hours).
// Global Admins' own urgent pushes are sent immediately.
export const URGENT_APPROVAL_TIMEOUT_MIN = 15;
export const URGENT_PUSH_REQUIRES_APPROVAL_DEFAULT = true; // tenant setting, ON by default

export type UrgentStatus = 'SENT' | 'PENDING_APPROVAL' | 'REJECTED' | 'DOWNGRADED_TO_STANDARD';

export function initialUrgentStatus(s: Sender, tenantRequiresApproval = URGENT_PUSH_REQUIRES_APPROVAL_DEFAULT): UrgentStatus {
  if (s.role === 'global_admin') return 'SENT';
  return tenantRequiresApproval ? 'PENDING_APPROVAL' : 'SENT';
}

export function onApprovalTimeout(): UrgentStatus {
  return 'DOWNGRADED_TO_STANDARD';
}
