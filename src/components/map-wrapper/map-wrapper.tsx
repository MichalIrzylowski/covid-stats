import React from "react";

import { useElementSize } from "@hooks/use-element-size";
import { Map } from "@components/map";

import css from "./map-wrapper.module.scss";

export const MapWrapper = () => {
  const { element, size } = useElementSize();

  return (
    <div className={css["map-wrapper"]} ref={element}>
      <Map width={size.width} height={0} />
    </div>
  );
};
