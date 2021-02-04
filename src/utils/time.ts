import { timeParse, timeFormat } from "d3-time-format";

export const timeParser = (timeFormat = "%x") => timeParse(timeFormat);
export const timeFormatter = (timeSpecifier = "%-b %-d") =>
  timeFormat(timeSpecifier);
