import { json } from "@remix-run/node";
import { useLoaderData, useNavigate, Link } from "@remix-run/react";
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
  let navigate = useNavigate();
  
  function handleChange(event){
    setToiminta(event.target.value)
  }
  
  const [toiminta, setToiminta] = useState('');
  return (
    <div className="center">
      <div className="websiteDiv">
        <h1 className="tittle">Sähköhinta laskuri</h1>
        <Link to="/admin" className="hallintaSivuPainike">Hallintasivu</Link>

        <select onChange={handleChange} value={toiminta} className="input tabcontent" id="valitaToiminta" name="valitaToiminta">
          <option value="" className="toimintaSelect" disabled>Valitse toiminta!</option>
          {kulutus.map(kulutusRivi =>
            <option className="toimintaSelect" key={kulutusRivi.id} value={kulutusRivi.id}>{kulutusRivi.nimi}</option>
            )}
        </select>
      </div>
     
      <div className="result">
        {toiminta && <Tulos toiminnanId={toiminta}/>}
      </div>

    </div>


);
function Tulos({toiminnanId}){
  const { kulutus } = useLoaderData();
  const kulutusRivi = kulutus.find(kulutusRivi => kulutusRivi.id === toiminnanId);
  return <div>{kulutusRivi.nimi} maksaa {laskeminen(sahkonhinta, kulutusRivi.kWh)}€ tällä hetkellä.</div>

  return kulutus.map((data) => {
    if (toiminnanId === data.id) {
      return (
        <div>{data.nimi} maksaa {laskeminen(sahkonhinta, data.kWh)}€ tällä hetkellä.</div>
      );
    }
    return null;
  });

}


}
