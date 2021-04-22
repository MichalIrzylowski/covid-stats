import React from "react";
import { ScaleTime, ScaleLinear } from "d3-scale";

import { DefaultDataObject } from "@components/charts/line-chart/types";

type Scale =
  | ScaleTime<number, number, never>
  | ScaleLinear<number, number, never>;

interface DotsProps {
  data: DefaultDataObject[];
  xScale: Scale;
  yScale: Scale;
}

export const Dots = ({ data, xScale, yScale }: DotsProps) => (
  <>
    {data.map((datum) => (
      <circle
        r={4}
        cx={xScale(datum.x as number | Date)}
        cy={yScale(datum.y as number | Date)}
        fill="white"
        strokeWidth={1}
        stroke="#9980FA"
      />
    ))}
  </>
);
