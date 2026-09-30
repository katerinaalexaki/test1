// ADV-377: advocacy smart push — one push per ambassador per day at best engagement time.
export const MAX_ADVOCACY_PUSHES_PER_DAY = 1;
export const MIN_DATA_POINTS = 10;
export const FALLBACK_SEND_TIME = '12:30'; // ADV-389: was 10:00

export function sendTime(hourlyOpenRates: Record<string, number>, dataPoints: number): string {
  if (dataPoints < MIN_DATA_POINTS) return FALLBACK_SEND_TIME;
  return Object.entries(hourlyOpenRates).sort((a, b) => b[1] - a[1])[0][0];
}
