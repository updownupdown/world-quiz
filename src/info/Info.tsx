import React from "react";
import Flag from "react-world-flags";
import "./Info.scss";
import { countryList } from "../globe/countryData";

interface Props {
  selectedCountry: string;
}

export const Info = ({ selectedCountry }: Props) => {
  if (!selectedCountry) return <p>No country selected</p>;

  const countryData = countryList.filter(
    (country) => country.code === selectedCountry
  )[0];

  return (
    <div className="info">
      <Flag code={countryData.code} />
      <h3>{countryData.name}</h3>
      <ul>
        <li>Code: {countryData.code}</li>
        <li>Capital: {countryData.capital}</li>
        <li>Continent: {countryData.continent}</li>
        <li>Region: {countryData.region}</li>
        <li>Subregion: {countryData.subregion}</li>
        <li>Population: {countryData.population}</li>
      </ul>
    </div>
  );
};
