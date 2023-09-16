import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import mailgunTransport from "nodemailer-mailgun-transport";

export default async function sendEmail(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const body = req.body;
        const recipient = body.recipient;
        const subject = body.subject;
        const text = body.text;
        const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;
        const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
        if (MAILGUN_DOMAIN !== undefined && MAILGUN_API_KEY !== undefined) {
            const auth = {
                auth: {
                    api_key: MAILGUN_API_KEY,
                    domain: MAILGUN_DOMAIN,
                },
            };
            const transporter = nodemailer.createTransport(mailgunTransport(auth));

            const data = {
                from: "Member Support member-support@theloopvillage.com",
                to: recipient,
                subject: subject,
                html: text,
            };
            try {
                await new Promise((resolve, reject) => {
                    transporter.sendMail(data, (err, info) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(info);
                        }
                    });
                });
                res.status(200).json({ message: "success" });
            } catch (error) {
                console.error(error);
                res.status(400).json({ message: "Error sending email" });
            }
        }
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
}
