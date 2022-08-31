import { json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { haeSähkönHinta } from "~/api.server";
import { laskeminen } from "~/laskeminen";
import { haeKulutus } from "~/api.server";
import React, { useState } from 'react';

export const loader = async () => {
  const sahkonhinta = await haeSähkönHinta();
  const kulutus = await haeKulutus();
  return json({ sahkonhinta, kulutus });
};

export default function Index() {
  const { sahkonhinta, kulutus } = useLoaderData();
  console.log(sahkonhinta, kulutus);
  console.log(laskeminen(sahkonhinta, kulutus[0].kWh));
  let navigate = useNavigate();

  function handleChange(event){
    navigate("/toiminnat/" + event.target.value, { replace: true })
    const [count, setCount] = useState(event.target.value);
  }

  return (
    <div>
      <div className="websiteDiv">
        <h1 className="tittle">Sähköhinta laskuri</h1>

        <input onChange={handleChange} className="input tabcontent" list="toiminnat" id="valitaToiminta" name="valitaToiminta" placeholder="Valitse toiminta!"/>
        <datalist id="toiminnat">
          <option value="Puhelimen lataus" onClick="kurssi(event, PuhelimenLataus)"/>
          <option value="Saunan lämmitys" onClick="kurssi(event, 'SaunanLammitys')"/>
          <option value="Leivän paahto" onClick="kurssi(event, 'LeivänPaahto')"/>
          <option value="Kahvin keitto" onClick="kurssi(event, 'KahvinKeitto')"/>
      </datalist>
      </div>
      
      <div className="result" >
        {kulutus.map((data) => {
          console.log(data.kWh);
          return (
            <div key={data.id}>{data.nimi} maksaa {laskeminen(sahkonhinta, kulutus[0].kWh)}€ tällä hetkellä.</div>
          );
        })}
      </div>


    </div>
    
  );
}
