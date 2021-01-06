import React, { useMemo, useCallback } from "react";

import {
  geoEqualEarth,
  GeoSphere,
  geoPath,
  geoGraticule10,
  GeoPermissibleObjects,
} from "d3-geo";

import { useChartDimensions } from "../../hooks/use-chart-dimensions";

import data from "../../maps/world-geojson.json";

import "./map.css";

const countryNameAccessor = (d: any) => d.properties.NAME;
const countryIdAccessor = (d: any) => d.properties.ADM0_A3_IS;

const windowDimensions = {
  width: window.innerWidth,
  height: 0,
  boundedWidth: window.innerWidth * 0.9 + 20,
};

const sphere: GeoSphere = { type: "Sphere" };

export const Map: React.FC = () => {
  const projection = useMemo(
    () => geoEqualEarth().fitWidth(windowDimensions.boundedWidth, sphere),
    []
  );
  const pathGenerator = useMemo(() => geoPath(projection), [projection]);
  const [[x0, y0], [x1, y1]] = useMemo(() => pathGenerator.bounds(sphere), [
    pathGenerator,
  ]);
  const earthPath = useMemo(() => pathGenerator(sphere), [pathGenerator]);
  const graticulePath = useMemo(() => pathGenerator(geoGraticule10()), [
    pathGenerator,
  ]);

  windowDimensions.height = y1;
  const { setElement, dimensions } = useChartDimensions(windowDimensions);

  const handleCountryClick = useCallback((country) => {
    console.log(country);
    alert(countryNameAccessor(country));
  }, []);

  const countries = data.features.map((country) => (
    <path
      key={countryIdAccessor(country)}
      className="country"
      d={pathGenerator(country as GeoPermissibleObjects) as string}
      onClick={() => handleCountryClick(country)}
    />
  ));

  return (
    <div ref={setElement}>
      <svg
        width={dimensions.width}
        height={dimensions.height}
        className="map-wrapper"
      >
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
