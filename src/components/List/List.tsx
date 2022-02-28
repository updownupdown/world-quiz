import React, { useMemo } from "react";
import { regionList } from "../../data/countryData";
import { countryList } from "../../data/countryList";
import clsx from "clsx";
import "./List.scss";

interface Props {
  guessedCountries: string[];
  includeMinor: boolean;
}

export const List = ({ guessedCountries, includeMinor }: Props) => {
  const guessedCountryList = useMemo(() => {
    return regionList.map((region) => {
      return (
        <div className="region" key={region}>
          <h3>{region}</h3>
          <ul>
            {countryList.map((country) => {
              if (
                country.region !== region ||
                (country.minor && !includeMinor)
              ) {
                return <React.Fragment key={country.code}></React.Fragment>;
              }

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
  }, [guessedCountries, includeMinor]);

  return <div className="list">{guessedCountryList}</div>;
};
