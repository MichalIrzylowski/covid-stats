import React, { createContext, useState, useEffect, useContext } from "react";

const ChartSvgContext = createContext<SVGSVGElement | null>(null);

interface ChartSvgProps {
  height: number;
  width: number;
}

export const ChartSvg: React.FC<ChartSvgProps> = ({
  children,
  height,
  width,
}) => {
  const [svgRef, setSvgRef] = useState<SVGSVGElement | null>(null);
  const [svg, setSvg] = useState<SVGSVGElement | null>(null);

  useEffect(() => {
    setSvg(svgRef);
  }, [svgRef]);

  return (
    <svg ref={setSvgRef} height={height} width={width}>
      <ChartSvgContext.Provider value={svg}>
        {children}
      </ChartSvgContext.Provider>
    </svg>
  );
};

export const useChartSvg = () => {
  const chartContext = useContext(ChartSvgContext);

  if (!chartContext && chartContext !== null)
    throw new Error("It has to be used inside <ChartSvg /> component");

  return useContext(ChartSvgContext);
};
