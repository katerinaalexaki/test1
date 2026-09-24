// Smart Scheduling - GA scope (release 2026.9, ADV-2140)

// Supported networks for Share smartly and campaign mode.
export const SCHEDULING_NETWORKS = ['linkedin', 'x', 'facebook', 'instagram', 'threads'] as const;
export const MAX_SCHEDULED_NETWORKS = 5;

// Per-user queue cap.
export const MAX_QUEUE_SIZE = 30;

// Employees can self-schedule with Share smartly; no admin confirmation step.
export const EMPLOYEE_SELF_SCHEDULING = true;

// Gamification points are awarded when the post is published, not when it is queued.
export const POINTS_AWARDED_ON: 'published' | 'queued' = 'published';

// Smart Scheduling is included in Pro and Enterprise (ADV-2231).
// The legacy 'advocacy_scheduler' add-on entitlement is no longer checked.
export const SCHEDULING_TIERS = ['pro', 'enterprise'] as const;
