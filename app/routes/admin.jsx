import { json } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { haeKulutus, muokatutKilowatit } from "~/api.server";

export const action = async ({ request }) => {
    const formData = await request.formData();
    const values = Object.fromEntries(formData);
    muokatutKilowatit(values);
    return null;
};

export const loader = async () => {
    const kulutukset = await haeKulutus();
    return json(kulutukset);
};

export default function Admin() {
    const kulutukset = useLoaderData();

    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4"}}>
            <Link to="/">Etusivu</Link>
            <h1>Hallintasivu</h1>
            {haeKulutus.map((kWh, index) => (
                <div key={index}>
                    <Form method="post">
                        <label>
                            Kilowattitunnit: <input name="kwh" defaultValue={kulutus.kWh} />
                        </label>
                        <input typeof="hidden" name="index" value={index} />
                        <button>Tallenna</button>
                        </Form>
                    </div>
            ))}
        </div>
    );
}