import { extent } from "d3-array";
import * as scales from "d3-scale";

import { DataType } from "../components/charts/line-chart/types";

export type Scale = "linear" | "time";

export const generateScale = (
  type: Scale = "linear",
  data: DataType[],
  range: [number, number],
  nice?: boolean
) => {
  if (type === "time") {
    const [min = 0, max = 100] = extent(data as Date[]);
    return scales.scaleTime(range).domain([min, max]);
  }
  const [min = 0, max = 100] = extent(data as number[]);

  const scale = scales.scaleLinear(range).domain([min, max]);

  if (nice) return scale.nice();
  return scale;
};
