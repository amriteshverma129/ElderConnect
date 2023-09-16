import { NextApiRequest, NextApiResponse } from "next";

const keapToken = process.env.KEAP_TOKEN;

export default async function updateProfile(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "PATCH") {
        const body = req.body;
        const aboutMe = body.aboutMe;
        const contactId = body.contactId;
        const birthDay = body.birthDay;
        const phone = body.phone;
        const email = body.email;
        if (keapToken) {
            try {
                const response = await fetch(`https://api.infusionsoft.com/crm/rest/v1/contacts/${contactId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Keap-API-Key": keapToken,
                    },
                    body: JSON.stringify({
                        birthday: birthDay,
                        custom_fields: [
                            {
                                content: aboutMe,
                                id: 229,
                            },
                        ],
                        email_addresses: [
                            {
                                email: email,
                                field: "EMAIL1",
                            },
                        ],
                        phone_numbers: [
                            {
                                number: phone,
                                field: "PHONE1",
                            },
                        ],
                    }),
                });
                if (response.status >= 400) {
                    res.status(401).json({ success: false, message: "Unauthorized" });
                    return;
                }
                const data = await response.json();
                response && res.status(200).json({ success: true, data });
            } catch (err: unknown) {
                res.status(500).json({ success: false, err: err });
            }
        }
    } else {
        res.setHeader("Allow", "PATCH");
        res.status(405).end("Method Not Allowed");
    }
}
