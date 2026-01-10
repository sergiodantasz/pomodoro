const MS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = 3600;
const MS_PER_MINUTE = SECONDS_PER_MINUTE * MS_PER_SECOND;

export function formatTime(timeMs: number): string {
  const totalSeconds = Math.floor(timeMs / MS_PER_SECOND);
  const hours = Math.floor(totalSeconds / SECONDS_PER_HOUR);
  const minutes = Math.floor(
    (totalSeconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE
  );
  const seconds = totalSeconds % SECONDS_PER_MINUTE;
  const formatTwoDigits = (value: number): string =>
    value.toString().padStart(2, "0");
  if (hours === 0) {
    return `${minutes}:${formatTwoDigits(seconds)}`;
  }
  return `${hours}:${formatTwoDigits(minutes)}:${formatTwoDigits(seconds)}`;
}

export function minToMs(minutes: number): number {
  return minutes * MS_PER_MINUTE;
}
