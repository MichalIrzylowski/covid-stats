import React from "react";
import { useSvgDimensions } from "./chart-svg";

interface TitleProps {
  children: string;
}

export const Title: React.FC<TitleProps> = ({ children }) => {
  const dimensions = useSvgDimensions();

  return (
    <text
      textAnchor="middle"
      transform={`translate(${dimensions.width / 2}, 40)`}
    >
      {children}
    </text>
  );
};
