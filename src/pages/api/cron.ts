import { NextApiRequest, NextApiResponse } from "next";
import client from "../../apolloClient";
import { verifySignature } from "@upstash/qstash/nextjs";
import { insertMeetingDetails } from "../../components/Event/Queries";
import { zoomMeetingType } from "../../components/Event/Type";
import { fetchZoomAccessToken } from "../../Functions/functions";
import moment from "moment";

interface ApiResponse {
    status: number;
    message: string;
}

let page_number = 1;

const mutateMeetingList = async (data: { meetings: Array<zoomMeetingType> }) => {
    try {
        const meetingsList = data.meetings.map((item: zoomMeetingType) => {
            return {
                duration: item.duration,
                eventTopic: item.topic,
                meetingId: item.id,
                startTime: item.start_time,
                endTime: item.duration && moment(item.start_time).add(item.duration / 60, "hour"),
                uuid: item.uuid,
                join_url: item.join_url,
            };
        });
        const hasuraRes = await client.mutate({
            variables: {
                meetingsList: meetingsList,
            },
            mutation: insertMeetingDetails,
        });
        const hasuraData = await hasuraRes.data;
        return await hasuraData.insert_MeetingDetails;
    } catch (error) {
        throw new Error("Something is wrong with hasura client");
    }
};
const fetchMeetingListPerPage = async (accessToken: string | undefined, email: string | undefined | string[]) => {
    try {
        const meetingList = await fetch(
            `https://api.zoom.us/v2/users/${email}/meetings?type=upcoming_meetings&page_number=${page_number}&page_size=300`,
            {
                method: "GET",
                headers: {
                    Authorization: "Bearer" + accessToken,
                },
            },
        );
        if (meetingList.status >= 400) {
            throw new Error("access token has been expired");
        }
        const data = await meetingList.json();
        if (data && data.meetings && data.meetings.length) {
            return mutateMeetingList(data)
                .then((response) => {
                    if (response) {
                        page_number = page_number + 1;
                        if (page_number === data.page_count + 1) {
                            return "resolved";
                        }
                        return "scanned";
                    }
                })
                .catch((error) => {
                    throw error;
                });
        } else {
            return "resolved";
        }
    } catch (error) {
        throw error;
    }
};

const fetchMeetingListFromZoom = (
    accessToken: string | undefined,
    email: string | undefined | string[],
): Promise<ApiResponse> => {
    let flag = true;
    return new Promise(function (resolve) {
        const interval = setInterval(async () => {
            if (flag) {
                console.log(page_number);
                flag = false;
                fetchMeetingListPerPage(accessToken, email)
                    .then((response) => {
                        if (response === "scanned") {
                            flag = true;
                        } else {
                            clearInterval(interval);
                            resolve({ status: 200, message: "success" });
                        }
                    })
                    .catch((error) => {
                        resolve({ status: 400, message: error.message });
                    });
            }
        }, 200);
    });
};

export async function cron(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const email = req.query.email;
        page_number = 1;
        const authRes = await fetchZoomAccessToken();
        if (authRes.status >= 400) {
            res.status(401).json({ success: false, message: "Unauthorized" });
            return;
        }
        const access_token = await authRes.access_token;
        if (access_token) {
            try {
                const response = await fetchMeetingListFromZoom(access_token, email);
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

export default verifySignature(cron);

export const config = {
    api: {
        bodyParser: false,
    },
};
