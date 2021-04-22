import { ScaleLinear, ScaleTime } from "d3-scale";

import { Scale as ScaleType } from "@utils/generate-scale";

export type DateFormat = "%Y-%m-%d";

export type Scale =
  | ScaleTime<number, number, never>
  | ScaleLinear<number, number, never>;

export interface AxisProps {
  scale: Scale;
  scaleType?: ScaleType;
  dateFormat?: DateFormat;
  numberOfTicks?: number;
  title?: string;
  showBigTicks?: boolean;
}
