// Notification entitlements per plan.
export type Plan = 'essential' | 'premium' | 'enterprise';

// NOTIF-815: scheduled push is available on all plans (entitlement removed).
export const SCHEDULED_PUSH_PLANS: Plan[] = ['essential', 'premium', 'enterprise'];
