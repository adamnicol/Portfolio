import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function formatDate(date: Date): string {
  return dayjs(date).format("MMM D, YYYY");
}

export function formatRelative(date: Date): string {
  return dayjs(date).fromNow();
}
