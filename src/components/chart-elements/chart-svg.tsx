import React, { createContext, useContext, useRef } from "react";
import { combineChartDimensions } from "@utils/combine-chart-dimensions";

export type ChartSvgProps = ReturnType<typeof combineChartDimensions>;

const ChartSvgContext = createContext<SVGSVGElement | null>(null);
const SvgDimensions = createContext<ChartSvgProps | null>(null);

export const ChartSvg: React.FC<ChartSvgProps> = ({
  children,
  height,
  width,
  ...restProps
}) => {
  const ref = useRef<SVGSVGElement>(null);

  return (
    <svg ref={ref} height={height} width={width}>
      <ChartSvgContext.Provider value={ref.current}>
        <SvgDimensions.Provider value={{ height, width, ...restProps }}>
          {children}
        </SvgDimensions.Provider>
      </ChartSvgContext.Provider>
    </svg>
  );
};

export const useChartSvg = () => {
  const chartContext = useContext(ChartSvgContext);

  if (!chartContext && chartContext !== null)
    throw new Error("It has to be used inside <ChartSvg /> component");

  return chartContext;
};

export const useSvgDimensions = () => {
  const svgDimensions = useContext(SvgDimensions);

  if (!svgDimensions && svgDimensions !== null)
    throw new Error("It has to be used inside <ChartSvg /> component");

  return svgDimensions as ChartSvgProps;
};
