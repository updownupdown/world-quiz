import { normalizeString, shuffle } from "../utils/utils";
import { countryList } from "./countryList";

// Number of countries
export const countryNum = countryList.length;

// Generate simplified country name list for user input matching
const countryNamesWithMinors: string[] = [];
const countryNamesWithoutMinors: string[] = [];

countryList.forEach((country) => {
  countryNamesWithMinors.push(normalizeString(country.name));
  if (!country.minor) {
    countryNamesWithoutMinors.push(normalizeString(country.name));
  }
});

export const countryNames = {
  withMinors: countryNamesWithMinors,
  withoutMinors: countryNamesWithoutMinors,
};

// Generate list of regions for list categories
const regions: string[] = [];
countryList.forEach((country) => {
  regions.push(country.region);
});
export const regionList = [...new Set(regions)];

export function getCountryByName(name: string) {
  return countryList.filter(
    (country) => normalizeString(country.name) === name
  )[0];
}

export function getCountryByCode(code: string) {
  return countryList.filter((country) => country.code === code)[0];
}

// Get random list of countries
export function getRandomCountryList(includeMinor: boolean, limit: number) {
  let countries: string[] = [];

  countryList.forEach((country) => {
    if (includeMinor || !country.minor) countries.push(country.code);
  });

  shuffle(countries);

  if (limit !== 0) {
    countries = countries.slice(0, limit);
  }

  return countries;
}
