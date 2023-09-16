import { NextApiRequest, NextApiResponse } from "next";

const keapToken = process.env.KEAP_TOKEN;

export default async function sendResponseToKeap(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const contactId = req.body.contactId;
        const callName = req.body.callName;
        try {
            if (keapToken) {
                const response = await fetch(
                    `https://api.infusionsoft.com/crm/rest/v1/campaigns/goals/uqq968/${callName}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "X-Keap-API-Key": keapToken,
                        },
                        body: JSON.stringify({
                            contact_id: Number(contactId),
                        }),
                    },
                );
                if (response.status >= 400) {
                    res.status(400).json({ success: false });
                    return;
                }
                res.status(200).json({ success: true });
                return;
            }
        } catch (err: unknown) {
            res.status(500).json({ success: false, message: "Internnal Server Error" });
        }
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
}
