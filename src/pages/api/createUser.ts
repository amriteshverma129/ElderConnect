import { NextApiRequest, NextApiResponse } from "next";
import { fetchAccessToken } from "../../Functions/functions";

export default async function createUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const body = req.body;
    console.log(body);
    const username = body.userName;
    const password = body.password;
    const name = body.name;
    try {
      const authRes = await fetchAccessToken();
      if (authRes.status >= 400) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
      }
      const access_token = await authRes.access_token;
      if (access_token) {
        const response = await fetch(
          `https://dev-4ltmz52olaylamco.us.auth0.com/api/v2/users`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
            },
            body: JSON.stringify({
              email: username,
              password: password,
              name: name,
              connection: `Username-Password-Authentication`,
            }),
          }
        );
        if (response.status === 401) {
          res.status(401).json({ success: false, message: "Unauthorized" });
          return;
        }
        if (response.status === 409) {
          res
            .status(409)
            .json({ success: false, message: "Email address already exist" });
          return;
        }
        if (response.status >= 400) {
          res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
          return;
        }
        const data = await response.json();
        res.status(200).json({ success: true, data });
        return;
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
