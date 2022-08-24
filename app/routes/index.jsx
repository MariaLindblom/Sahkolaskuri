import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { data } from "~/api.server";
import { getData } from "~/api.server";

export const loader = async () => {
  const data = await getData();
  return json(data);
};

export default function Index() {
  const data = useLoaderData();
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
        {data.map((data) => (
          <div key={data.id}>{data.name} maksaa {data.price} tällä hetkellä.</div>
        ))}
      </div>

    </div>
    
    
  );
}
