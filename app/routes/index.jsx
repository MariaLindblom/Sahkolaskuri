export default function Index() {
  return (
    <div className="websiteDiv">
      <h1 className="tittleShdow">Sähköhinta laskuri</h1>
      <h1 className="tittle">Sähköhinta laskuri</h1>
      

      <input list="toiminnat" id="valitaToiminta" name="valitaToiminta" placeholder="Valitse toiminta!"/>
      <datalist id="toiminnat">
        <option value="Puhelimen lataus"/>
        <option value="Saunan lämmitys"/>
        <option value="Leivän paahto"/>
        <option value="Kahvin keitto"/>
      </datalist>
    </div>
  );
}
