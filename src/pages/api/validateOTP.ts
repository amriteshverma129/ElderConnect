import { NextApiRequest, NextApiResponse } from "next";

export default async function validateOTP(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const body = req.body;
    const username = body.userName;
    const connection = body.connection;
    const otp = body.otp;
    const clientId = process.env.AUTH0_CLIENT_ID;
    const clientSecret = process.env.AUTH0_CLIENT_SECRET;
    const validateOTPUrl = process.env.VALIDATEOTP_URL;
    try {
      const response = await fetch(
        `https://dev-4ltmz52olaylamco.us.auth0.com/oauth/token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            connection === "email"
              ? {
                  grant_type: validateOTPUrl,
                  username: username,
                  otp: otp,
                  realm: "email",
                  client_id: clientId,
                  client_secret: clientSecret,
                }
              : {
                  grant_type: validateOTPUrl,
                  username: username,
                  otp: otp,
                  realm: "sms",
                  client_id: clientId,
                  client_secret: clientSecret,
                }
          ),
        }
      );
      const data = await response.json();
      if (response.status >= 400) {
        if (data.error_description === "Wrong email or verification code.")
          res
            .status(403)
            .json({
              success: false,
              message: "Verification code is not valid",
            });
        else if (
          data.error_description ===
          "The verification code has expired. Please try to login again."
        ) {
          res
            .status(403)
            .json({
              success: false,
              message: "Verification code has expired.",
            });
        } else {
          res
            .status(403)
            .json({
              success: false,
              message: "Verification code is not valid",
            });
        }
        return;
      }
      res.status(200).json({ success: true, data });
      return;
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
