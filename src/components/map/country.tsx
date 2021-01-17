import React from "react";

import css from "./map.module.scss";

export interface CountryProps {
  color: string;
  d: string;
  dataCountryStats: string;
  onClick?: (event: React.MouseEvent<SVGPathElement, MouseEvent>) => void;
}

export const Country: React.FC<CountryProps> = ({
  color,
  d,
  dataCountryStats,
  onClick,
}) => {
  return (
    <path
      className={css.country}
      d={d}
      data-country-stats={dataCountryStats}
      fill={color}
      onMouseEnter={onClick}
    />
  );
};
