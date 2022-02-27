import { useMemo } from "react";
import { countryList } from "../../data/countryData";
import clsx from "clsx";
import "./List.scss";

interface Props {
  guessedCountries: string[];
}

export const List = ({ guessedCountries }: Props) => {
  const guessedCountryList = useMemo(() => {
    const list = countryList.map((country) => {
      const isGuessed = guessedCountries.includes(country.code);

      return (
        <li
          key={country.code}
          className={clsx("guess", isGuessed && "guess--guessed")}
        >
          {country.name}
        </li>
      );
    });

    return <ul>{list}</ul>;
  }, [guessedCountries]);

  return <div className="list">{guessedCountryList}</div>;
};
