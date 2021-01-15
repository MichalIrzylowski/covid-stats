import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import { DailyCountryData } from "@custom-types/daily-country-data";

import { fetchPopulations } from "./store/reducers/actions";
import { Map } from "./components/map";

export const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("https://disease.sh/v3/covid-19/countries")
      .then((res: { data: DailyCountryData[] }) => {
        dispatch(fetchPopulations.success(res.data));
      })
      .catch((err) => dispatch(fetchPopulations.failure(err)));
  });

  return <Map width={1200} height={0} />;
};
