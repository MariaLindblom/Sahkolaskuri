import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { haeSähkönHinta } from "~/api.server";
import { getData } from "~/api.server";
import { laskeminen } from "~/laskeminen";
import { kulutus } from "~/api.server";

export const loader = async () => {
  const data = await getData();
  const sahkonhinta = await haeSähkönHinta();
  return json({ data, sahkonhinta });
};

export default function Index() {
  const { data, sahkonhinta } = useLoaderData();
  console.log(sahkonhinta);
  laskeminen
  console.log(laskeminen(sahkonhinta, kulutus));
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
        {data.map((data) => {
          
          return (
            <div key={data.id}>{data.name} maksaa {data.price} tällä hetkellä.</div>
          );
        })}
      </div>

    </div>
    
  );
}
