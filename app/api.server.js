import { readFile } from "node:fs/promises";

export const getData = async () => {
  const data = await readFile("data/data.json");
  return JSON.parse(data);
};

export const laskemiseen = async () => {
  const laskeminen = await readFile("data/kulutus.json");
  return JSON.parse(laskeminen);
};

export const haeSähkönHinta = async () => {
  const page = await fetch("https://sahko.tk/");
  const content = await page.text();
  const pricesTodayJSON = content.match(
    /(?<=function prices_today\(\){var t= )(.*)(?=;\$)/
  )[0];

  const pricesToday = JSON.parse(pricesTodayJSON);
  const now = Number(pricesToday.now);

  return now;
}