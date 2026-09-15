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
