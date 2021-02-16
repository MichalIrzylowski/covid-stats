import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { DailyCountryData } from "@custom-types/daily-country-data";
import { CountryTimeline } from "@custom-types/country-timeline";

import { fetchDailyCovidData } from "@store/reducers/daily-covid-data/actions";
import { setSelectedCountry } from "@store/reducers/selected-country/actions";
import { fetchCountryCovidTimelineData } from "@store/reducers/country-timeline/actions";

import { Map } from "@components/map";
import { SelectedCountry } from "@components/selected-country";

import { LineChartSection } from "@custom-components/line-chart-section";

import css from "./covid.module.scss";

export const Covid: React.FC = () => {
  const dispatch = useDispatch();
  const country = useSelector((state) => state.selectedCountry?.country);

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
  }, []);

  useEffect(() => {
    if (!country) return;
    dispatch(fetchCountryCovidTimelineData.request());

    axios
      .get(`https://disease.sh/v3/covid-19/historical/${country}`)
      .then(({ data }: { data: CountryTimeline }) =>
        dispatch(fetchCountryCovidTimelineData.success(data))
      )
      .catch((err) => dispatch(fetchCountryCovidTimelineData.failure(err)));
  }, [country, dispatch]);

  return (
    <div className={css.wrapper}>
      <h1>World covid stats</h1>
      <div className={css.grid}>
        <Map />
        <SelectedCountry />
        <LineChartSection />
      </div>
    </div>
  );
};
