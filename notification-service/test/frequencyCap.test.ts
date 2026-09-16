import { effectiveCap, countsTowardCap } from '../src/policy/frequencyCap';

test('lowest cap wins across audiences (NOTIF-836)', () => {
  expect(effectiveCap([{ id: 'a', dailyPushCap: 2 }, { id: 'b', dailyPushCap: 7 }])).toBe(2);
});

test('urgent push does not consume the cap (NOTIF-833)', () => {
  expect(countsTowardCap({ urgency: 'urgent' })).toBe(false);
});
