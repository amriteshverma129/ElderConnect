import { NextApiRequest, NextApiResponse } from "next";
import client from "../../apolloClient";
import moment from "moment";
import { meetingType } from "../../components/Event/Type";
import { getMeetingListBasedOnDateQuery2 } from "../../components/Event/Queries";
import { insertMultipleNotificationQuery } from "../../components/Account/Queries";
import { verifySignature } from "@upstash/qstash/nextjs";
import { gql } from "@apollo/client";

const createNotificationArray = (
    meetingDetails: Array<meetingType>,
    userDetails: Array<{ email: string; phone: string; connection: string }>,
) => {
    const notifications = [];

    for (const meeting of meetingDetails) {
        const newArr = userDetails.map((user: { email: string; phone: string; connection: string }) => ({
            title: meeting.eventTopic,
            meetingId: meeting.meetingId,
            startTime: meeting.startTime,
            endTime: meeting.endTime,
            join_url: meeting.join_url,
            type: "reminder",
            duration: meeting.duration,
            username: user.connection === "email" ? user.email : user.phone,
        }));

        notifications.push(...newArr);
    }

    return notifications;
};

export async function setNotification(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        return res.status(405).end("Method Not Allowed");
    }

    try {
        const currentDate = new Date();
        const currentDateInUTC = new Date(currentDate.getTime() + currentDate.getTimezoneOffset() * 60000);

        // Fetch user list directly from the server
        const { data: userData } = await client.query({
            query: gql`
                query getAllUser {
                    userDetails {
                        email
                        phone
                        connection
                    }
                }
            `,
        });

        const userDetails = userData?.userDetails || [];

        // Fetch meeting list directly from the server
        const { data: meetingData } = await client.query({
            query: getMeetingListBasedOnDateQuery2,
            variables: {
                startTime: moment(currentDateInUTC).format("YYYY-MM-DD HH:mm:ss"),
                endTime: moment(currentDateInUTC).add(1, "hour").format("YYYY-MM-DD HH:mm:ss"),
            },
        });

        const meetingDetails = meetingData?.MeetingDetails || [];

        if (meetingDetails.length === 0) {
            return res.status(200).json({ success: true, message: "success" });
        }

        const notifications = createNotificationArray(meetingDetails, userDetails);

        const hasuraRes = await client.mutate({
            variables: {
                notificationList: notifications,
            },
            mutation: insertMultipleNotificationQuery,
        });

        if (hasuraRes.data) {
            return res.status(200).json({ success: true, message: "success" });
        } else {
            return res.status(400).json({ success: false, message: "something went wrong" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export default verifySignature(setNotification);

export const config = {
    api: {
        bodyParser: false,
    },
};
