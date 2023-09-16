import { NextApiRequest, NextApiResponse } from "next";
import { fetchAccessToken } from "../../Functions/functions";

export default async function validateUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const body = req.body;
    const username = body.userName;
    const password = body.password;
    const Client_Id = process.env.AUTH0_CLIENT_ID;
    const Client_Secret = process.env.AUTH0_CLIENT_SECRET;
    const validateUserUrl = process.env.VALIDATEUSER_URL;
    try {
      const authRes = await fetchAccessToken();
      if (authRes.status >= 400) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
      }
      const access_token = await authRes.access_token;
      if (access_token) {
        const response = await fetch(
          `https://dev-4ltmz52olaylamco.us.auth0.com/oauth/token`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
            },
            body: JSON.stringify({
              grant_type: validateUserUrl,
              realm: "Username-Password-Authentication",
              username: username,
              password: password,
              audience: "https://dev-4ltmz52olaylamco.us.auth0.com/api/v2/",
              scope: "openid profile",
              client_id: Client_Id,
              client_secret: Client_Secret,
            }),
          }
        );
        const data = await response.json();
        if (response.status === 401) {
          res.status(401).json({ success: false, message: "Unauthorized" });
          return;
        }
        if (response.status >= 400) {
          res
            .status(403)
            .json({ success: false, message: "Wrong email or password" });
          return;
        }
        // const data = await response.json();
        res.status(200).json({ success: true, data });
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
