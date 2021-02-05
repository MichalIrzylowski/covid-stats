import {
  combineChartDimensions,
  Dimensions,
} from "@utils/combine-chart-dimensions";

import { useElementSize } from "./use-element-size";

export const useChartDimensions = (
  margins?: Pick<
    Dimensions,
    "marginBottom" | "marginLeft" | "marginRight" | "marginTop"
  >
) => {
  const {
    element: setElement,
    size: { height, width },
  } = useElementSize();

  const dimensions = combineChartDimensions({ ...margins, height, width });

  return { setElement, dimensions };
};
