import { useMemo } from "react";
import { countryList, regionList } from "../../data/countryData";
import clsx from "clsx";
import "./List.scss";

interface Props {
  guessedCountries: string[];
}

export const List = ({ guessedCountries }: Props) => {
  const guessedCountryList = useMemo(() => {
    return regionList.map((region) => {
      return (
        <div className="region" key={region}>
          <h3>{region}</h3>
          <ul>
            {countryList.map((country) => {
              if (country.region !== region) return;
              const isGuessed = guessedCountries.includes(country.code);

              return (
                <li
                  key={country.code}
                  className={clsx(isGuessed ? "guessed" : "not-guessed")}
                >
                  {country.name}
                </li>
              );
            })}
          </ul>
        </div>
      );
    });
  }, [guessedCountries]);

  return <div className="list">{guessedCountryList}</div>;
};
