import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  memo,
} from "react";
import { combineChartDimensions } from "@utils/combine-chart-dimensions";

export type ChartSvgProps = ReturnType<typeof combineChartDimensions>;

const ChartSvgContext = createContext<SVGSVGElement | null>(null);
const SvgDimensions = createContext<ChartSvgProps | null>(null);

export const ChartSvg: React.FC<ChartSvgProps> = memo(
  ({ children, height, width, ...restProps }) => {
    const [svgRef, setSvgRef] = useState<SVGSVGElement | null>(null);
    const [svg, setSvg] = useState<SVGSVGElement | null>(null);

    useEffect(() => {
      setSvg(svgRef);
    }, [svgRef]);

    return (
      <svg ref={setSvgRef} height={height} width={width}>
        <ChartSvgContext.Provider value={svg}>
          <SvgDimensions.Provider value={{ height, width, ...restProps }}>
            {children}
          </SvgDimensions.Provider>
        </ChartSvgContext.Provider>
      </svg>
    );
  }
);

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

  return svgDimensions;
};
