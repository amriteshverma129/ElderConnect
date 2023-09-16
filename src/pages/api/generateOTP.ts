import { NextApiRequest, NextApiResponse } from "next";

export default async function generateOTP(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const body = req.body;
    const username = body.userName;
    const connection = body.connection;
    const clientId = process.env.AUTH0_CLIENT_ID;
    const clientSecret = process.env.AUTH0_CLIENT_SECRET;
    try {
      const response = await fetch(
        `https://dev-4ltmz52olaylamco.us.auth0.com/passwordless/start`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            connection === "email"
              ? {
                  send: "code",
                  email: username,
                  connection: "email",
                  client_id: clientId,
                  client_secret: clientSecret,
                }
              : {
                  send: "code",
                  phone_number: username,
                  connection: "sms",
                  client_id: clientId,
                  client_secret: clientSecret,
                }
          ),
        }
      );
      if (response.status === 429) {
        res
          .status(429)
          .json({ success: false, message: "Rate limit exceeded" });
        return;
      }
      const data = await response.json();
      if (response.status >= 400) {
        if (data?.error === "unauthorized_client") {
          res.status(401).json({ success: false, message: "Unauthorized" });
          return;
        } else {
          res
            .status(404)
            .json({ success: false, message: "Account not found" });
          return;
        }
      }
      res.status(200).json({ success: true, data });
    } catch (err: unknown) {
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
