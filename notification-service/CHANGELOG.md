# Changelog — notification-service

## 26.9.2 — 30 Sept 2026 (hotfix train, mobile 3.2.1)
- NOTIF-838: minimum personal quiet hours lowered from 8h to 6h.
- NOTIF-841: urgent pushes from Channel Admins require Global Admin approval (15 min timeout, then sent as standard). Tenant setting ON by default.
- ADV-389: smart push fallback send time 10:00 → 12:30 local.

## 26.9.0 — 22 Sept 2026
- NOTIF-812: per-audience daily push cap (1–10, default 5). Replaces the fixed platform-wide cap of 3.
- NOTIF-814: personal quiet hours in the device time zone (default 20:00–08:00, min window 8h). Replaces fixed 21:00–08:00 tenant time.
- NOTIF-815: scheduled push available on all plans (was Premium only).
- NOTIF-818: Channel Admins with the Critical comms permission can send urgent pushes (bypass cap and quiet hours, reason required).
- NOTIF-833: urgent pushes no longer count toward the daily cap.
- NOTIF-836: users in several audiences get the lowest cap.
- NOTIF-820: push analytics (Premium, Enterprise) with CSV export.
- ADV-377: advocacy smart push replaces the 10:00 digest (fallback 10:00 local when - NOTIF-836: users in several audiences get the lowest cap.lt;10 data points).
