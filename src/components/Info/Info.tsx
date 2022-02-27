import Flag from "react-world-flags";
import { countryList } from "../../data/countryData";
import { formatPopulationNumber } from "../../utils/utils";
import "./Info.scss";

interface Props {
  selectedCountry: string;
}

export const Info = ({ selectedCountry }: Props) => {
  const instructions = (
    <div className="instructions">
      <h3>Instructions</h3>
      <p>Find all the world's countries!</p>
      <p>Start by typing your guess in the input below.</p>
    </div>
  );

  const countryData = countryList.filter(
    (country) => country.code === selectedCountry
  )[0];

  return (
    <div className="info">
      {selectedCountry ? (
        <>
          <Flag code={countryData.code} />
          <h3>{countryData.name}</h3>
          <ul>
            <li>Capital: {countryData.capital}</li>
            <li>
              {countryData.subregion}, {countryData.region}
            </li>
            <li>
              Population: {formatPopulationNumber(countryData.population)}
            </li>
            <li>Country Code: {countryData.code}</li>
          </ul>
        </>
      ) : (
        instructions
      )}
    </div>
  );
};
