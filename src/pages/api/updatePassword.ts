import { NextApiRequest, NextApiResponse } from "next";
import { fetchAccessToken } from "../../Functions/functions";

export default async function updatePassword(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PATCH") {
    const userId = req.body.userId;
    const newPassword = req.body.newPassword;
    try {
      const authRes = await fetchAccessToken();
      if (authRes.status >= 400) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
      }
      const access_token = await authRes.access_token;
      if (access_token) {
        const response = await fetch(
          `https://dev-4ltmz52olaylamco.us.auth0.com/api/v2/users/${userId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
            },
            body: JSON.stringify({
              password: newPassword,
            }),
          }
        );
        const json = await response.json();
        if (response.status === 400) {
          res
            .status(400)
            .json({
              success: false,
              message: "Password has previously been used",
            });
          return;
        }
        if (response.status >= 400) {
          res.status(401).json({ success: false, message: "Unauthorized" });
          return;
        }
        res.status(200).json({ success: true, json });
      }
    } catch (err: unknown) {
      res
        .status(500)
        .json({ success: false, message: "Internnal Server Error" });
    }
  } else {
    res.setHeader("Allow", "PATCH");
    res.status(405).end("Method Not Allowed");
  }
}
