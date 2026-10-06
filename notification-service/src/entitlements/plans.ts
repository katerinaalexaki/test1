// Notification entitlements per plan.
export type Plan = 'essential' | 'premium' | 'enterprise';

// NOTIF-815: scheduled push is available on all plans (entitlement removed).
export const SCHEDULED_PUSH_PLANS: Plan[] = ['essential', 'premium', 'enterprise'];

// NOTIF-845: Enterprise tenants can set a per-audience cap up to 15.
export function maxCapForPlan(plan: Plan): number {
  return plan === 'enterprise' ? 15 : 10;
}
