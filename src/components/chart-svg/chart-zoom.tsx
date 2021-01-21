import React, { useState, useEffect } from "react";
import { select, zoom, ZoomBehavior } from "d3";

import { useChartSvg } from "./chart-svg";

interface Zoom {
  x?: number;
  y?: number;
  k?: number;
}

export const ChartZoom: React.FC = ({ children }) => {
  const svg = useChartSvg();
  const [{ x, y, k }, setTransform] = useState<Zoom>({});

  useEffect(() => {
    if (!svg) return;

    const svgElement = select(svg);
    console.log(svgElement);
    const zoomAction = zoom().on(
      "zoom",
      (event: ZoomBehavior<SVGElement, "wheel">) => {
        setTransform(event.transform as Zoom);
      }
    );

    svgElement.call(zoomAction as any);
  }, [svg]);

  const transform =
    x && y && k ? `translate(${x}, ${y}) scale(${k})` : undefined;

  return <g transform={transform}>{children}</g>;
};
