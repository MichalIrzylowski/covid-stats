import { combineChartDimensions } from "@utils/combine-chart-dimensions";

import { useElementSize } from "./use-element-size";

export const useChartDimensions = () => {
  const {
    element: setElement,
    size: { height, width },
  } = useElementSize();

  const dimensions = combineChartDimensions({ height, width });

  return { setElement, dimensions };
};
