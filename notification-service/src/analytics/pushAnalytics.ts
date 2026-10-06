// NOTIF-820 / NOTIF-847: push analytics entitlements.
import { Plan } from '../entitlements/plans';

// NOTIF-847: Essential gets BASIC analytics (delivered + opened per push).
export const PUSH_ANALYTICS_BASIC_PLANS: Plan[] = ['essential', 'premium', 'enterprise'];
// Full analytics: per-audience breakdown, opened-within-1h, CSV export.
export const PUSH_ANALYTICS_FULL_PLANS: Plan[] = ['premium', 'enterprise'];
