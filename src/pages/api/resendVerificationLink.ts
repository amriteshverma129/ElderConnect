import { NextApiRequest, NextApiResponse } from "next";
import { fetchAccessToken } from "../../Functions/functions";

export default async function resendVerificationLink(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const body = req.body;
    const user_id = body.userId;
    try {
      const authRes = await fetchAccessToken();
      if (authRes.status >= 400) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
      }
      const access_token = await authRes.access_token;
      if (access_token) {
        const response = await fetch(
          `https://dev-4ltmz52olaylamco.us.auth0.com/api/v2/jobs/verification-email`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
            },
            body: JSON.stringify({
              user_id: user_id,
            }),
          }
        );
        const data = await response.json();
        if (response.status === 401) {
          res.status(401).json({ success: false, message: "Unauthorized" });
          return;
        }
        if (response.status === 400) {
          res
            .status(400)
            .json({ success: false, message: "User does not exist" });
          return;
        }
        if (response.status > 400) {
          res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
          return;
        }
        res.status(200).json({ success: true, user: data });
      }
    } catch (err: unknown) {
      res
        .status(500)
        .json({ success: false, message: "Internnal Server Error" });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
