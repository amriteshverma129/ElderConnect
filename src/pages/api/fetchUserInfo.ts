import { NextApiRequest, NextApiResponse } from "next";

export default async function fetchUserInfo(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const body = req.body;
    const access_token = body.access_token;
    try {
      const response = await fetch(
        `https://dev-4ltmz52olaylamco.us.auth0.com/userinfo`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      if (response.status >= 400) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
      }
      const data = await response.json();
      res.status(200).json({ success: true, user: data });
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
