import { readFile, writeFile } from "node:fs/promises";

export const haeKulutus = async () => {
  const laskeminen = await readFile("data/kulutus.json");
  return JSON.parse(laskeminen);
};

export const muokatutKilowatit = async (kilowatit) => {
  const kulutuksetJSON = await readFile("data/kulutus.json");
  const kulutukset = JSON.parse(kulutuksetJSON);
  const muokattuKwh = kulutus[kilowatit.index];
  };

  const muokattuKwhJSON = JSON.stringify(kulutukset, null, 2);
  await writeFile("data/kulutus.json", muokattuKwhJSON);


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