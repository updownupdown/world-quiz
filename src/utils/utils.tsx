import { useState, useEffect } from "react";

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

export type ValueOf<T> = T[keyof T];

export function shuffle(array: string[]) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export function animateProgressBar() {
  const animatedItems = document.getElementsByClassName("animate-on-guess")!;

  for (let el of animatedItems) {
    el.classList.add("animate");

    setTimeout(() => {
      el.classList.remove("animate");
    }, 1000);
  }
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<{
    width: undefined | number;
    height: undefined | number;
  }>({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}
