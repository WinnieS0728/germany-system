import { timeFormat } from "d3";

type options = {
  type?: "%Y-%m-%d" | "%d/%m/%Y";
};

export function dateFormatter(d: Date | string, options?: options): string {
  if (!d) {
    return "";
  }
  const formatType = options?.type || "%Y-%m-%d";
  if (typeof d === "string") {
    return timeFormat(formatType)(new Date(d));
  } else {
    return timeFormat(formatType)(d as Date);
  }
}