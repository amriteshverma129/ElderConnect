import fetch from "isomorphic-unfetch";
import { NextApiRequest, NextApiResponse } from "next";

const cloudAccessToken = process.env.CLOUDFLARE_TOKEN;

export default async function deleteImageFromCloudflare(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "DELETE") {
        try {
            const { imageId } = JSON.parse(req.body); // Assuming the request body contains the image ID you want to delete
            const response = await fetch(
                `https://api.cloudflare.com/client/v4/accounts/6f74327aa6029a4f32aac71fd1e8d71a/images/v1/${imageId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: "Bearer " + cloudAccessToken,
                    },
                },
            );

            if (response.status >= 400) {
                res.status(400).json({ success: false });
                return;
            }
            const data = await response.json();
            res.status(200).json({ data });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    } else {
        res.setHeader("Allow", "DELETE");
        res.status(405).end("Method Not Allowed");
    }
}
