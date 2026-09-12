// Notification policy configuration — v3.2 (NOTIF-812)

// Per-audience daily cap for standard pushes.
export const DEFAULT_DAILY_PUSH_CAP = 5;
export const MIN_DAILY_PUSH_CAP = 1;
export const MAX_DAILY_PUSH_CAP = 10;

// Personal quiet hours (NOTIF-814). Evaluated in the device time zone,
// falling back to the tenant time zone when unknown.
export const DEFAULT_QUIET_HOURS = { start: '20:00', end: '08:00' };
export const MIN_QUIET_HOURS_WINDOW_H = 8;
export const MAX_HELD_PUSHES_RELEASED = 2;
