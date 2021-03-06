import React, { useMemo } from "react";
import { area, line, CurveFactory } from "d3";

import { animated, useSpring } from "react-spring";
import { useSvgDimensions } from "./chart-svg";

interface LineProps extends React.SVGProps<SVGPathElement> {
  type: "line" | "area";
  // TODO: find better way to type it
  data: any;
  xAccessor: (data: any) => any;
  yAccessor: (data: any) => any;
  y0Accessor?: (data: any) => any;
  curve?: CurveFactory;
}

export const Line: React.FC<LineProps> = ({
  type,
  curve,
  data,
  xAccessor,
  yAccessor,
  y0Accessor,
  ...svgProps
}) => {
  const dimensions = useSvgDimensions();
  const lineGenerator = useMemo(() => {
    if (type === "area") {
      if (!y0Accessor)
        throw new Error(
          'to use <Line /> as area you need to pass "y0Accessor"'
        );

      const pathGenerator = area()
        .x(xAccessor)
        .y(yAccessor)
        .y0(y0Accessor)
        .y1(yAccessor);

      if (curve) pathGenerator.curve(curve);
      return pathGenerator;
    }
    const pathGenerator = line().x(xAccessor).y(yAccessor);
    if (curve) pathGenerator.curve(curve);

    return pathGenerator;
  }, [curve, xAccessor, yAccessor, type, y0Accessor]);

  const path = lineGenerator(data);
  const lineWidth = (dimensions && dimensions.boundedWidth * 2) || 1000;

  const styles = useSpring({
    strokeDashoffset: 0,
    from: {
      strokeDashoffset: lineWidth,
    },
    config: { duration: 4000, tension: 100 },
    reset: true,
  });

  return (
    <animated.path
      strokeDashoffset={styles.strokeDashoffset}
      strokeDasharray={`${lineWidth} ${lineWidth}`}
      fill="none"
      d={path as string}
      stroke={svgProps.stroke}
      strokeWidth={svgProps.strokeWidth}
    />
  );
};
