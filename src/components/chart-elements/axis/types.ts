import { ScaleLinear, ScaleTime } from "d3-scale";

import { timeFormatter } from "@utils/time";

export type Scale =
  | ScaleTime<number, number, never>
  | ScaleLinear<number, number, never>;

export interface AxisProps {
  scale: Scale;
  timeFormatter?: ReturnType<typeof timeFormatter>;
  numberOfTicks?: number;
  title?: string;
  showBigTicks?: boolean;
}
