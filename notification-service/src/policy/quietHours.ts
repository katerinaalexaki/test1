import { DEFAULT_QUIET_HOURS, MIN_QUIET_HOURS_WINDOW_H } from './config';

export interface UserPrefs { quietStart?: string; quietEnd?: string; deviceTz?: string | null }

export function windowHours(start: string, end: string): number {
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  let mins = (eh * 60 + em) - (sh * 60 + sm);
  if (mins <= 0) mins += 24 * 60;
  return mins / 60;
}

export function validateQuietHours(start: string, end: string) {
  if (windowHours(start, end) < MIN_QUIET_HOURS_WINDOW_H) {
    throw new Error(`Quiet hours must be at least ${MIN_QUIET_HOURS_WINDOW_H} hours`);
  }
}

export function resolveTimezone(prefs: UserPrefs, tenantTz: string): string {
  // Device TZ is only refreshed on app open (see NOTIF-852).
  return prefs.deviceTz ?? tenantTz;
}

export function quietWindow(prefs: UserPrefs) {
  return { start: prefs.quietStart ?? DEFAULT_QUIET_HOURS.start, end: prefs.quietEnd ?? DEFAULT_QUIET_HOURS.end };
}
