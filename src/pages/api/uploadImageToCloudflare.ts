import fetch from "isomorphic-unfetch";
import { NextApiRequest, NextApiResponse } from "next";

const cloudAccessToken = process.env.CLOUDFLARE_TOKEN;

export default async function uploadImageToCloudflare(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const { imageData, imageUrl } = JSON.parse(req.body);
            const slicedImageUrl = imageUrl.slice(imageUrl.indexOf(",") + 1);
            const contentType = "image/png, image/jpeg, image/webp, image/jpg";

            const newData: FormData = new FormData();
            const blob = new Blob([Buffer.from(slicedImageUrl, "base64")], { type: contentType });
            newData.append("file", blob, imageData.path);

            const response = await fetch(
                "https://api.cloudflare.com/client/v4/accounts/6f74327aa6029a4f32aac71fd1e8d71a/images/v1",
                {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + cloudAccessToken,
                    },
                    body: newData,
                },
            );
            if (response.status >= 400) {
                if (response.status === 415) {
                    res.status(415).json({
                        message: "Image format should be in .jpg, .jpeg, .png, .webp.",
                        success: false,
                    });
                    return;
                }
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
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
}
