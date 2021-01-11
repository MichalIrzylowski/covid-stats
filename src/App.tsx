import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import { fetchPopulations } from "./store/reducers/actions";
import { Map } from "./components/map";

export const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all?fields=name;population")
      .then((res: any) => {
        const countriesData: Record<string, number> = {};
        res.data.forEach(({ name, population }: any) => {
          countriesData[name] = population;
        });

        dispatch(fetchPopulations.success(countriesData));
      })
      .catch((err) => dispatch(fetchPopulations.failure(err)));
  });

  return <Map width={1200} height={0} />;
};
