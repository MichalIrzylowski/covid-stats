import React, { useMemo } from "react";
import { area, line, CurveFactory } from "d3";

import { animated, useSpring } from "react-spring";

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
  const styles = useSpring({
    strokeDashoffset: 0,
    from: { strokeDashoffset: 1000 },
    config: { duration: 2000, tension: 100 },
    reset: true,
  });
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

  return (
    <animated.path
      strokeDashoffset={styles.strokeDashoffset}
      strokeDasharray="1000"
      fill="none"
      d={path as string}
      stroke={svgProps.stroke}
      strokeWidth={svgProps.strokeWidth}
    />
  );
};
