// ADV-2088 - LinkedIn token expiry reminder (release 2026.8)
// LinkedIn access tokens expire after 60 days. Remind employees at day 50.

export const LINKEDIN_TOKEN_LIFETIME_DAYS = 60;
export const LINKEDIN_REMINDER_DAY = 50;

export type FailedShareReason = 'TOKEN_EXPIRED' | 'NETWORK_ERROR' | 'RATE_LIMITED';

export async function runDailyTokenReminderJob(deps: {
  findConnectionsAtAge: (network: 'linkedin', ageDays: number) => Promise<{ userId: string }[]>;
  notifyInApp: (userId: string, message: string, deepLink: string) => Promise<void>;
  sendEmail: (userId: string, template: string) => Promise<void>;
}) {
  const expiring = await deps.findConnectionsAtAge('linkedin', LINKEDIN_REMINDER_DAY);
  for (const { userId } of expiring) {
    await deps.notifyInApp(
      userId,
      'Your LinkedIn connection expires in 10 days - reconnect now',
      'sociabble://profile/networks/linkedin/reconnect'
    );
    await deps.sendEmail(userId, 'linkedin-reconnect-reminder');
  }
}
