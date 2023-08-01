import { timeFormat } from "d3";

export function dateFormatter(d: Date | string): string {
  if (typeof d === "string") {
    return timeFormat("%Y-%m-%d")(new Date(d));
  } else {
    return timeFormat("%Y-%m-%d")(d as Date);
  }
}
