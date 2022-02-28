import React, { useMemo } from "react";
import { regionList } from "../../data/countryData";
import { countryList } from "../../data/countryList";
import clsx from "clsx";
import "./List.scss";

interface Props {
  guessedCountries: string[];
  includeMinor: boolean;
  includeSmall: boolean;
}

export const List = ({
  guessedCountries,
  includeMinor,
  includeSmall,
}: Props) => {
  const guessedCountryList = useMemo(() => {
    return regionList.map((region) => {
      return (
        <div className="region" key={region}>
          <h3>{region}</h3>
          <ul>
            {countryList
              .sort(function (a, b) {
                if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                return 0;
              })
              .map((country) => {
                if (
                  country.region !== region ||
                  (country.minor && !includeMinor) ||
                  (country.small && !includeSmall)
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
