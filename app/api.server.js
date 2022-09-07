import { readFile,writeFile } from "node:fs/promises";
import { syncBuiltinESMExports } from "node:module";

export const haeKulutus = async () => {
  const laskeminen = await readFile("data/kulutus.json");
  return JSON.parse(laskeminen);
};

export const muokattuKwh = async (rivi) => {
  const kulutusJSON = await readFile("data/kulutus.json");
  const kulutus = JSON.parse(kulutusJSON);
  const indexOfMuokkaus = kulutus.findIndex(kulutusRivi => kulutusRivi.id === rivi.id);
  const muokattavaKwh = kulutus[indexOfMuokkaus];

  kulutus[indexOfMuokkaus] = {
    ...muokattavaKwh,
    kWh: Number(rivi.kWh),
  };

  const muokattuKwhJSON = JSON.stringify(kulutus, null, 2);
  await writeFile("data/kulutus.json", muokattuKwhJSON);
}

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
