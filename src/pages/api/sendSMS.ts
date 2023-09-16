import { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export default async function sendSMS(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { to, body } = req.body;

        try {
            const message = await client.messages.create({
                to,
                from: "+13238256557",
                body,
            });

            res.status(200).json(message);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error sending SMS" });
        }
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
}
