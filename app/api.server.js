import { readFile } from "node:fs/promises";

export const getData = async () => {
  const data = await readFile("data/data.json");
  return JSON.parse(data);
};



  