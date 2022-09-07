import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import relativeTime from "dayjs/plugin/relativeTime";

export function formatDate(date: Date): string {
  dayjs.extend(advancedFormat);
  dayjs.extend(isToday);
  dayjs.extend(isYesterday);
  dayjs.extend(relativeTime);

  const d = dayjs(date);

  if (d.isToday()) return d.fromNow();
  else if (d.isYesterday()) return "Yesterday";
  else return d.format("MMM Do, YYYY");
}
