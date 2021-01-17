import React from "react";
import { useSelector } from "react-redux";
import { DateTime } from "luxon";

import css from "./selected-country.module.scss";

export const SelectedCountry: React.FC = () => {
  const countryData = useSelector((state) => state.selectedCountry);

  if (!countryData) return null;

  const updateDate = DateTime.fromMillis(countryData.updated).setLocale(
    "en-GB"
  );

  return (
    <div className={css["selected-country"]}>
      <h2>Selected country: {countryData.country}</h2>
      <ul>
        <li>
          Update date: {updateDate.day} {updateDate.monthLong} {updateDate.year}
        </li>
        <li>Total cases: {countryData.cases}</li>
        <li>Today cases: {countryData.todayCases}</li>
        <li>Total deaths: {countryData.deaths}</li>
        <li>Today deaths: {countryData.todayDeaths}</li>
        <li>Total recovered: {countryData.recovered}</li>
        <li>Today recovered: {countryData.todayRecovered}</li>
        <li>
          Still sick:{" "}
          {countryData.cases - countryData.deaths - countryData.recovered}
        </li>
      </ul>
    </div>
  );
};
