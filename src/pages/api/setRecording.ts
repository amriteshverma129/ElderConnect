import { NextApiRequest, NextApiResponse } from "next";
import client from "../../apolloClient";
import { verifySignature } from "@upstash/qstash/nextjs";
import { zoomRecordingType } from "../../components/Library/Type";
import { insert_Recordings as insert_Recordings_Queries } from "../../components/Library/Queries";
import { fetchZoomAccessToken } from "../../Functions/functions";

interface ApiResponse {
    status: number;
    message: string;
}

let meetingIndex = 0;
let recordingIndex = 0;
const recordingList: Array<zoomRecordingType> = [];

const mutateRecordingToHasura = async () => {
    try {
        const hasuraRes = await client.mutate({
            variables: {
                recordingList: recordingList,
            },
            mutation: insert_Recordings_Queries,
        });
        const hasuraData = await hasuraRes.data;
        return await hasuraData.insert_Recordings;
    } catch (error) {
        throw new Error("something is wrong with hasura client");
    }
};

const uploadVideosToCloudflare = async (cloudAccessToken: string | undefined, item: zoomRecordingType, len: number) => {
    try {
        const download_url =
            item && item.recording_files && item.recording_files.length && item.recording_files[0].download_url;
        const cloudRes = await fetch(
            `https://api.cloudflare.com/client/v4/accounts/6f74327aa6029a4f32aac71fd1e8d71a/stream/copy`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + cloudAccessToken,
                },
                body: JSON.stringify({
                    url: download_url,
                    meta: { name: `${item.topic} ${item.id} ${item.start_time}` },
                }),
            },
        );
        console.log("Cloud Status", cloudRes.status);
        if (cloudRes.status >= 400) {
            meetingIndex = meetingIndex + 1;
            if (meetingIndex === len) {
                return mutateRecordingToHasura();
            }
            return "resolved";
        }
        const data = await cloudRes.json();
        if (data && data.success === true) {
            const obj = {
                duration: item.duration,
                eventTopic: item.topic,
                meetingId: item.id,
                startTime: item.start_time,
                downloadURL: download_url,
                videoUid: data.result.uid,
            };
            recordingList[recordingIndex++] = obj;
            meetingIndex = meetingIndex + 1;
            if (meetingIndex === len) {
                return mutateRecordingToHasura();
            }
            return "resolved";
        }
    } catch (error) {
        throw error;
    }
};

const upload = (
    data: { meetings: Array<zoomRecordingType> },
    cloudAccessToken: string | undefined,
): Promise<ApiResponse> => {
    let flag = true;
    return new Promise(function (resolve) {
        const interval = setInterval(() => {
            if (flag) {
                flag = false;
                console.log("meetingIndex", meetingIndex);
                const item = data.meetings[meetingIndex];
                const len = data.meetings.length;
                uploadVideosToCloudflare(cloudAccessToken, item, len)
                    .then((response) => {
                        if (response) {
                            flag = true;
                            if (len === meetingIndex) {
                                clearInterval(interval);
                                resolve({ status: 200, message: "success" });
                            }
                        }
                    })
                    .catch((error) => {
                        clearInterval(interval);
                        resolve({ status: 400, message: error.message });
                    });
            }
        }, 300);
    });
};

const fetchRecordingList = (
    accessToken: string | undefined,
    cloudAccessToken: string | undefined,
    email: string | string[] | undefined,
): Promise<ApiResponse> => {
    return new Promise(async (resolve) => {
        try {
            const recordingList = await fetch(`https://api.zoom.us/v2/users/${email}/recordings?page_size=300`, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            });
            if (recordingList.status >= 400) {
                resolve({ status: 401, message: "Unauthorized : access token has been expired" });
            }
            const data = await recordingList.json();
            if (data && data.meetings && data.meetings.length) {
                upload(data, cloudAccessToken).then((response) => {
                    if (response) {
                        resolve(response);
                    }
                });
            } else {
                resolve({ status: 200, message: "success" });
            }
        } catch (error) {
            resolve({ status: 500, message: "Internal Server Error" });
        }
    });
};

export async function setRecording(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const cloudAccessToken = process.env.CLOUDFLARE_TOKEN;
        const email = req.query.email;
        meetingIndex = 0;
        recordingIndex = 0;
        //zoommeetings@theloopvillage.com
        //sandras@theloopvillage.com
        const authRes = await fetchZoomAccessToken();
        if (authRes.status >= 400) {
            res.status(401).json({ success: false, message: "Unauthorized" });
            return;
        }
        const access_token = await authRes.access_token;
        if (access_token) {
            try {
                const response = await fetchRecordingList(access_token, cloudAccessToken, email);
                if (response.status >= 400) {
                    res.status(response.status).json(response);
                    return;
                }
                res.status(response.status).json(response);
            } catch (error) {
                res.status(500).json({ status: 500, message: "Internal Server Error" });
                return;
            }
        }
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
}

export default verifySignature(setRecording);

export const config = {
    api: {
        bodyParser: false,
    },
};
