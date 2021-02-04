import { ScaleLinear } from "d3-scale";

import { timeFormatter } from "@utils/time";

export type Scale = ScaleLinear<any, any, any>;

export interface AxisProps {
  scale: Scale;
  timeFormatter?: ReturnType<typeof timeFormatter>;
}
