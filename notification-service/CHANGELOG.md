# Changelog — notification-service

## 26.9.0 — unreleased
- NOTIF-812: per-audience daily push cap (1–10, default 5). Replaces the fixed platform-wide cap of 3.
- NOTIF-814: personal quiet hours in the device time zone (default 20:00–08:00, min window 8h). Replaces fixed 21:00–08:00 tenant time.
- NOTIF-815: scheduled push available on all plans (was Premium only).
- NOTIF-818: Channel Admins with the Critical comms permission can send urgent pushes (bypass cap and quiet hours, reason required).
