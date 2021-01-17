import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import { DailyCountryData } from "@custom-types/daily-country-data";

import { fetchDailyCovidData } from "@store/reducers/daily-covid-data/actions";
import { setSelectedCountry } from "@store/reducers/selected-country/actions";

import { MapWrapper } from "@components/map-wrapper";

import css from "./app.module.scss";

export const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("https://disease.sh/v3/covid-19/countries")
      .then((res: { data: DailyCountryData[] }) => {
        dispatch(fetchDailyCovidData.success(res.data));

        const initialSelectedCountry = res.data.find(
          (country) => country.country === "USA"
        );
        if (initialSelectedCountry)
          dispatch(setSelectedCountry(initialSelectedCountry));
      })
      .catch((err) => dispatch(fetchDailyCovidData.failure(err)));
  });

  return (
    <div className={css.wrapper}>
      <h1>World covid stats</h1>
      <div className={css.grid}>
        <MapWrapper />
      </div>
    </div>
  );
};
