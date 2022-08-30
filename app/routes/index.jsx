import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { haeSähkönHinta } from "~/api.server";
import { laskeminen } from "~/laskeminen";
import { haeKulutus } from "~/api.server";

export const loader = async () => {
  const sahkonhinta = await haeSähkönHinta();
  const kulutus = await haeKulutus();
  return json({ sahkonhinta, kulutus });
};

export default function Index() {
  const { sahkonhinta, kulutus } = useLoaderData();
  console.log(sahkonhinta, kulutus);
  console.log(laskeminen(sahkonhinta, kulutus[0].kWh));
  return (
    <div>
      <div className="websiteDiv">
        <h1 className="tittle">Sähköhinta laskuri</h1>

        <input className="input" list="toiminnat" id="valitaToiminta" name="valitaToiminta" placeholder="Valitse toiminta!"/>
        <datalist id="toiminnat">
          <option value="Puhelimen lataus"/>
          <option value="Saunan lämmitys"/>
          <option value="Leivän paahto"/>
          <option value="Kahvin keitto"/>
      </datalist>
      </div>
      
      <div className="result">
        {kulutus.map((data) => {
          console.log(data.kWh);
          return (
            <div key={data.id}>{data.nimi} maksaa {sahkonhinta}€ tällä hetkellä.</div>
          );
        })}
      </div>

    </div>
    
  );
}
