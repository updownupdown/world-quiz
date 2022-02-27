export function normalizeString(string: string) {
  return string
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

export function formatPopulationNumber(number: number) {
  const newNum = Math.round(number / 1000) * 1000;
  return newNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
