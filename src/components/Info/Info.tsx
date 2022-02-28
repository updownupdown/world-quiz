import Flag from "react-world-flags";
import { countryList } from "../../data/countryList";
import { formatPopulationNumber } from "../../utils/utils";
import { QuizModes, Quizzes } from "../Options/Options";
import "./Info.scss";

interface Props {
  selectedCountry: string;
  quizMode: QuizModes | undefined;
}

export const Info = ({ selectedCountry, quizMode }: Props) => {
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
          <h3>{quizMode === Quizzes.GuessByFlag ? "???" : countryData.name}</h3>
          <ul>
            <li className="capital">
              Capital:{" "}
              {quizMode === Quizzes.TypeCapital ? "???" : countryData.capital}
            </li>
            <li>
              {countryData.subregion}, {countryData.region} ({countryData.code})
            </li>
            <li>
              Population: {formatPopulationNumber(countryData.population)}
            </li>
          </ul>
        </>
      ) : (
        instructions
      )}
    </div>
  );
};
