import React from "react";

export function normalizeString(string: string) {
  return string
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}
