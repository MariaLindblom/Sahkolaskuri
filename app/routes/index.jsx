export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Sähköhinta laskuri</h1>

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
