import React, { useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { setSelectedCountry } from "@store/reducers/selected-country/actions";

import { ChartSvg, ChartZoom } from "@components/chart-elements";

import data from "@maps/world-geojson.json";

import { Country } from "./country";

import css from "./map.module.scss";

const defaultMap = data;

interface MapProps {
  map?: any;
}

const countryNameAccessor = (d: any) => d.properties.NAME;
const todayCasesPerOneMillionAccessor = (d: any) => d.casesPerOneMillion;
const covidDataCountryAccessor = (d: any) => d.country;

const sphere: GeoSphere = { type: "Sphere" };

export const Map: React.FC<MapProps> = ({ map = defaultMap }) => {
  const { data: covidData, loading } = useSelector((state) => state.dailyData);
  const dispatch = useDispatch();
  const { setElement, dimensions } = useChartDimensions();

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
    () => geoEqualEarth().fitWidth(dimensions.width, sphere),
    [dimensions.width]
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

  const handleClick = useCallback(
    (e: React.MouseEvent<SVGPathElement, MouseEvent>) => {
      const dataJSON = e.currentTarget.getAttribute("data-country-stats");
      const countryData = dataJSON && JSON.parse(dataJSON);

      dispatch(setSelectedCountry(countryData));
    },
    [dispatch]
  );

  const countries = map.features.map((country: any) => {
    if (!covidData) return undefined;

    let countryName = countryNameAccessor(country);
    // TODO: make a function for every country that is not visible
    if (countryName === "United States of America") countryName = "USA";
    else if (countryName === "Libya") countryName = "Libyan Arab Jamahiriya";
    else if (countryName === "S. Sudan") countryName = "South Sudan";
    else if (countryName === "United Kingdom") countryName = "UK";
    else if (countryName === "Vatican")
      countryName = "Holy See (Vatican City State)";

    const countryData = covidData.find(
      (d) => covidDataCountryAccessor(d) === countryName
    );

    const color = countryData
      ? colorScale(todayCasesPerOneMillionAccessor(countryData))
      : "grey";

    return (
      <Country
        color={color as string}
        d={pathGenerator(country as GeoPermissibleObjects) as string}
        dataCountryStats={JSON.stringify(countryData)}
        key={countryName}
        onClick={handleClick}
      />
    );
  });

  if (!covidData || loading) return null;

  return (
    <div ref={setElement} className={css.wrapper}>
      <ChartSvg {...dimensions} height={y1}>
        <ChartZoom>
          <path className={css.earth} d={earthPath as string} />
          <path className={css.graticule} d={graticulePath as string} />
          {countries}
        </ChartZoom>
      </ChartSvg>
    </div>
  );
};
