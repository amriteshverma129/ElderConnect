import { NextApiRequest, NextApiResponse } from "next";
// import { sendEmail } from "../../Functions/functions";
import { decryptCode } from "../../Functions/Reset/function";
import verificationCodeMail from "../../Functions/Email/verificationCodeMail";
import nodemailer from "nodemailer";
import mailgunTransport from "nodemailer-mailgun-transport";

export default async function sendVerificationCode(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const body = req.body;
        const encryptedCode = body.encryptedCode;
        const email = body.email;
        const verificationCode = decryptCode(encryptedCode);
        const text = verificationCodeMail(verificationCode);
        try {
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
                    to: email,
                    subject: "LOOP Village- Verification Code",
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
        } catch (error) {
            res.status(500).json({ status: 500, message: "Internal Server Error" });
            return;
        }
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
}
