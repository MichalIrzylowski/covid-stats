import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  geoEqualEarth,
  GeoSphere,
  geoPath,
  geoGraticule10,
  GeoPermissibleObjects,
} from "d3-geo";
import { extent } from "d3-array";
import { scaleLinear } from "d3-scale";

import { useChartDimensions } from "@hooks/use-chart-dimensions";
import { Dimensions } from "@utils/combine-chart-dimensions";

import data from "@maps/world-geojson.json";

import css from "./map.module.scss";

const defaultMap = data;

interface MapProps extends Dimensions {
  map?: any;
}

const countryNameAccessor = (d: any) => d.properties.NAME;
// const countryIdAccessor = (d: any) => d.properties.ADM0_A3_IS;
const todayCasesPerOneMillionAccessor = (d: any) => d.casesPerOneMillion;
const covidDataCountryAccessor = (d: any) => d.country;

const sphere: GeoSphere = { type: "Sphere" };

export const Map: React.FC<MapProps> = ({
  map = defaultMap,
  boundedWidth,
  ...chartDimensions
}) => {
  const { data: covidData, loading } = useSelector((state) => state.dailyData);

  const minAndMaxCases = useMemo(
    () =>
      covidData ? extent(covidData.map(todayCasesPerOneMillionAccessor)) : [],
    [covidData]
  );

  const colorScale = useMemo(
    () =>
      scaleLinear()
        .domain(minAndMaxCases)
        .range(["white", "red", "black"] as any),
    [minAndMaxCases]
  );

  const projection = useMemo(
    () => geoEqualEarth().fitWidth(chartDimensions.width - 80, sphere),
    [chartDimensions.width]
  );
  const pathGenerator = useMemo(() => geoPath(projection), [projection]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [[x0, y0], [x1, y1]] = useMemo(() => pathGenerator.bounds(sphere), [
    pathGenerator,
  ]);
  const earthPath = useMemo(() => pathGenerator(sphere), [pathGenerator]);
  const graticulePath = useMemo(() => pathGenerator(geoGraticule10()), [
    pathGenerator,
  ]);
  const { setElement, dimensions } = useChartDimensions(chartDimensions);

  const handleClick = (e: React.MouseEvent<SVGPathElement, MouseEvent>) => {
    const dataJSON = e.currentTarget.getAttribute("data-country-stats");
    const countryData = dataJSON && JSON.parse(dataJSON);

    console.log(countryData);
  };

  const countries = map.features.map((country: any) => {
    if (!covidData) return undefined;

    let countryName = countryNameAccessor(country);
    if (countryName === "United States of America") countryName = "USA";
    else if (countryName === "Libya") countryName = "Libyan Arab Jamahiriya";
    else if (countryName === "S. Sudan") countryName = "South Sudan";
    else if (countryName === "United Kingdom") countryName = "UK";

    const countryData = covidData.find(
      (d) => covidDataCountryAccessor(d) === countryName
    );

    const color = countryData
      ? colorScale(todayCasesPerOneMillionAccessor(countryData))
      : "grey";

    return (
      <path
        key={countryName}
        className={css.country}
        d={pathGenerator(country as GeoPermissibleObjects) as string}
        fill={color as string}
        data-country-stats={JSON.stringify(countryData)}
        onMouseEnter={handleClick}
      />
    );
  });

  if (!covidData || loading) return null;

  return (
    <div ref={setElement} className={css.wrapper}>
      <svg width={dimensions.width} height={y1 + 40}>
        <g
          style={{
            transform: `translate(${dimensions.marginLeft}px, ${dimensions.marginTop}px)`,
          }}
        >
          <path className={css.earth} d={earthPath as string} />
          <path className={css.graticule} d={graticulePath as string} />
          {countries}
        </g>
      </svg>
    </div>
  );
};
