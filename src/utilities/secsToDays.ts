import { intervalToDuration } from "date-fns";

export default function secsToDays(seconds: number) {
  const duration = intervalToDuration({ start: 0, end: seconds * 1000 });
  const zeroPad = (num: number | undefined) => String(num).padStart(2, "0");
  return `${duration.days} days and ${zeroPad(duration.hours)} hrs`;
}
