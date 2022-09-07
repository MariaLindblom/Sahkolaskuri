import { json } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { haeKulutus, muokattuKwh } from "~/api.server";

export const action = async ({ request }) => {
    const formData = await request.formData();
    const values = Object.fromEntries(formData);
    await muokattuKwh(values);

    return null;
};

export const loader = async () => {
    const kulutus = await haeKulutus();
    return json(kulutus);
};

export default function Admin() {
    const kulutus = useLoaderData();

    return (
        <div style={{ fontFamily: "Goblin-one, helvetica", lineHeight: "1.4" }}>
            <Link to="/">Etusivu</Link>
            <h1>Hallintasivu</h1>
            {kulutus.map((kulutusRivi, index) => (
                <div key={index}>
                    <Form method="post">
                        <label>
                            Toiminnon nimi: {kulutusRivi.nimi}
                        </label>
                        <label>
                            Kilowattitunnit: <input name="kWh"  defaultValue={kulutusRivi.kWh} />
                        </label>
                        <input type="hidden" name="id" value={kulutusRivi.id} />
                        <button>Tallenna</button>
                    </Form>
                </div>
            ))}
        </div>
    );
};
