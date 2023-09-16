import { NextApiRequest, NextApiResponse } from "next";
import { sendResponseToKeap } from "../../Functions/functions";

const keapToken = process.env.KEAP_TOKEN;

export default async function message(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "PATCH") {
        const body = req.body;
        console.log(body);
        const message = body.message;
        const contactId = body.contactId;
        if (keapToken) {
            try {
                const response = await fetch(`https://api.infusionsoft.com/crm/rest/v1/contacts/${contactId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Keap-API-Key": keapToken,
                    },
                    body: JSON.stringify({
                        custom_fields: [
                            {
                                content: message,
                                id: 239,
                            },
                        ],
                    }),
                });
                if (response.status >= 400) {
                    res.status(401).json({ success: false, message: "Unauthorized" });
                    return;
                }
                const data = await response.json();
                await sendResponseToKeap(contactId, keapToken, "CONTACTUS").then((response) => {
                    response && res.status(200).json({ success: true, data });
                });
            } catch (err: unknown) {
                res.status(500).json({ success: false, err: err });
            }
        }
    } else {
        res.setHeader("Allow", "PATCH");
        res.status(405).end("Method Not Allowed");
    }
}
