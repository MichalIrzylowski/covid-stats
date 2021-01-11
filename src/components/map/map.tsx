import React, { useMemo, useEffect, useState } from "react";
import axios from "axios";
import {
  geoEqualEarth,
  GeoSphere,
  geoPath,
  geoGraticule10,
  GeoPermissibleObjects,
} from "d3-geo";

import { extent } from "d3-array";
import { scaleLinear } from "d3-scale";

import { useChartDimensions } from "../../hooks/use-chart-dimensions";
import { Dimensions } from "../../utils/combine-chart-dimensions";

import data from "../../maps/world-geojson.json";

import "./map.css";

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
  const [covidData, setData] = useState<any>();

  useEffect(() => {
    axios.get("https://disease.sh/v3/covid-19/countries").then((res: any) => {
      setData(res.data);
    });
  }, []);

  const minAndMaxCases = useMemo(
    () =>
      covidData ? extent(covidData.map(todayCasesPerOneMillionAccessor)) : [],
    [covidData]
  );

  const colorScale = useMemo(
    () =>
      scaleLinear()
        .domain(minAndMaxCases as any)
        .range(["white", "red", "black"] as any),
    [minAndMaxCases]
  );

  console.log(minAndMaxCases);

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

  const countries = map.features.map((country: any) => {
    if (!covidData) return undefined;

    const countryData = covidData.find(
      (d: any) => covidDataCountryAccessor(d) === countryNameAccessor(country)
    );

    const color = countryData
      ? colorScale(todayCasesPerOneMillionAccessor(countryData) as number)
      : "grey";

    return (
      <path
        key={countryNameAccessor(country)}
        className="country"
        d={pathGenerator(country as GeoPermissibleObjects) as string}
        fill={color as string}
      />
    );
  });

  if (!covidData) return null;

  return (
    <div ref={setElement}>
      <svg width={dimensions.width} height={y1 + 40} className="map-wrapper">
        <g
          style={{
            transform: `translate(${dimensions.marginLeft}px, ${dimensions.marginTop}px)`,
          }}
        >
          <path className="earth" d={earthPath as string} />
          <path className="graticule" d={graticulePath as string} />
          {countries}
        </g>
      </svg>
    </div>
  );
};
