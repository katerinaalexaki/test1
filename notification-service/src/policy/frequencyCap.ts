import { DEFAULT_DAILY_PUSH_CAP, MIN_DAILY_PUSH_CAP, MAX_DAILY_PUSH_CAP } from './config';

export interface Audience { id: string; dailyPushCap?: number | null }

export function capForAudience(a: Audience): number {
  const cap = a.dailyPushCap ?? DEFAULT_DAILY_PUSH_CAP;
  if (cap < MIN_DAILY_PUSH_CAP || cap > MAX_DAILY_PUSH_CAP) {
    throw new Error(`daily_push_cap must be between ${MIN_DAILY_PUSH_CAP} and ${MAX_DAILY_PUSH_CAP}`);
  }
  return cap;
}

// Pushes above the cap are not delivered; the content still appears in the feed.
export function shouldDeliver(sentToday: number, cap: number): boolean {
  return sentToday < cap;
}
