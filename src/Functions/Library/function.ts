import moment from "moment";
import client from "../../apolloClient";
import { Dispatch, SetStateAction } from "react";
import { recordingType } from "../../components/Library/Type";
import {
    fetchAvgRatingPerRecodingQuery,
    fetchMeetingDetailQuery,
    fetchReviewOfUserOnEventQuery,
    getRecordingBasedOnMeetingIdAndStartTime,
    getRecordingListBasedOnCategoryQuery,
    getRecordingListBasedOnSearchAndCategoryQuery,
    getRecordingListQuery,
} from "../../components/Library/Queries";
import { UserProfile } from "../../components/Home/Type";

export const fetchAvgRating = async (
    recording: recordingType,
    setAvgRating: Dispatch<SetStateAction<null | number>>,
) => {
    const currentDate = recording.startTime && new Date(recording.startTime);
    const currentDateInUTC = currentDate && new Date(currentDate.getTime() + currentDate.getTimezoneOffset() * 60000);
    const hasuraRes = await client.query({
        query: fetchAvgRatingPerRecodingQuery,
        variables: {
            meetingId: recording.meetingId,
            startTime: moment(currentDateInUTC)
                .subtract(15 / 60, "hour")
                .format("YYYY-MM-DD HH:mm:ss"),
            endTime: moment(currentDateInUTC)
                .add(30 / 60, "hour")
                .format("YYYY-MM-DD HH:mm:ss"),
        },
    });
    const hasuraData = await hasuraRes.data;
    const Reviews_aggregate = await hasuraData.Reviews_aggregate;
    const aggregate = await Reviews_aggregate.aggregate;
    const avg = await aggregate.avg;
    setAvgRating(avg.rating);
};

export const fetchReviewOfUserOnEvent = async (
    setShowReview: Dispatch<SetStateAction<boolean>>,
    startTime: string | string[] | undefined,
    recordingId: string | string[] | undefined,
    user: UserProfile,
) => {
    setShowReview(true);
    const currentDate = startTime && typeof startTime === "string" && new Date(startTime);
    const currentDateInUTC = currentDate && new Date(currentDate.getTime() + currentDate.getTimezoneOffset() * 60000);
    if (currentDateInUTC) {
        const hasuraRes = await client.query({
            query: fetchReviewOfUserOnEventQuery,
            variables: {
                meetingId: recordingId,
                startTime: moment(currentDateInUTC)
                    .subtract(15 / 60, "hour")
                    .format("YYYY-MM-DD HH:mm:ss"),
                endTime: moment(currentDateInUTC)
                    .add(30 / 60, "hour")
                    .format("YYYY-MM-DD HH:mm:ss"),
                username: user.email ? user.email : user.phone_number,
            },
        });
        const hasuraData = await hasuraRes.data;
        const Reviews = await hasuraData.Reviews;
        Reviews.length && setShowReview(false);
    }
};

//Below Function is described to fetch details about the particular Recording
export const fetchRecordingDetail = async (
    setRecording: Dispatch<SetStateAction<recordingType>>,
    startTime: string | string[] | undefined,
    recordingId: string | string[] | undefined,
    user: UserProfile,
) => {
    const cacheKey = client.cache.identify({
        __typename: "Query",
        recordingId,
        startTime,
        username: user.email ? user.email : user.phone_number,
    });
    client.cache.evict({ id: cacheKey });
    client.cache.gc();

    const hasuraRecordingDetailRes = await client.query({
        query: getRecordingBasedOnMeetingIdAndStartTime,
        variables: {
            recordingId: recordingId,
            startTime: startTime,
            username: user.email ? user.email : user.phone_number,
        },
    });
    const hasuraRecordingDetailData = await hasuraRecordingDetailRes.data;
    const recordingDetail = await hasuraRecordingDetailData.Recordings;
    setRecording(recordingDetail[0]);
};

export const fetchMeetingDetail = async (
    setMeetingDetail: Dispatch<SetStateAction<{ meetingId?: number; startTime?: string; eventTopic?: string }>>,
    startTime: string | string[] | undefined,
    recordingId: string | string[] | undefined,
) => {
    setMeetingDetail({});
    const currentDate = startTime && typeof startTime === "string" && new Date(startTime);
    const currentDateInUTC = currentDate && new Date(currentDate.getTime() + currentDate.getTimezoneOffset() * 60000);
    if (currentDateInUTC) {
        const hasuraMeetingDetailRes = await client.query({
            query: fetchMeetingDetailQuery,
            variables: {
                meetingId: recordingId,
                startTime: moment(currentDateInUTC)
                    .subtract(15 / 60, "hour")
                    .format("YYYY-MM-DD HH:mm:ss"),
                endTime: moment(currentDateInUTC)
                    .add(30 / 60, "hour")
                    .format("YYYY-MM-DD HH:mm:ss"),
            },
        });
        const hasuraMeetingDetailData = await hasuraMeetingDetailRes.data;
        const meetingDetails = await hasuraMeetingDetailData.MeetingDetails;
        meetingDetails && meetingDetails.length && setMeetingDetail(meetingDetails[0]);
    }
};

export const fetchRecordingDetails = async (
    setRecordingDetails: Dispatch<SetStateAction<recordingType[] | []>>,
    str: string,
    search: string,
    setTotalCount: Dispatch<SetStateAction<number>>,
    offset: number,
    limit: number,
    setLoader: Dispatch<SetStateAction<boolean>>,
) => {
    setLoader(true);
    setRecordingDetails([]);
    const currentDate = new Date();
    const currentDateInUTC = new Date(currentDate.getTime() + currentDate.getTimezoneOffset() * 60000);
    const hasuraRecordingDetailsRes = await client.query({
        query: getRecordingListQuery(str),
        variables: {
            startTime: moment(currentDateInUTC).format("YYYY-MM-DD HH:mm:ss"),
            search: search,
            limit: limit,
            offset: offset,
        },
    });
    const hasuraRecordingDetailsData = await hasuraRecordingDetailsRes.data;
    const recordingDetails = await hasuraRecordingDetailsData.Recordings;
    const recordingAggregate = await hasuraRecordingDetailsData.Recordings_aggregate;
    const aggregate = await recordingAggregate.aggregate;
    const count = await aggregate.count;
    setRecordingDetails(recordingDetails);
    setTotalCount(count);
    setLoader(false);
};

export const fetchRecordingDetailsBasedOnFilter = async (
    setRecordingDetails: Dispatch<SetStateAction<recordingType[] | []>>,
    str: string,
    search: string,
    setTotalCount: Dispatch<SetStateAction<number>>,
    offset: number,
    limit: number,
    setLoader: Dispatch<SetStateAction<boolean>>,
    category: string,
) => {
    try {
        setLoader(true);
        setRecordingDetails([]);

        const currentDate = new Date();
        const currentDateInUTC = new Date(currentDate.getTime() + currentDate.getTimezoneOffset() * 60000);

        const queryVariables: Record<string, string | number | Date | Array<string> | []> = {
            search,
            limit,
            offset,
            startTime: moment(currentDateInUTC).format("YYYY-MM-DD HH:mm:ss"),
        };

        if (category !== "") {
            queryVariables.category = category?.trim();
        }

        let query;
        if (category && search) {
            query = getRecordingListBasedOnSearchAndCategoryQuery(str);
        } else if (category) {
            query = getRecordingListBasedOnCategoryQuery(str);
        } else {
            query = getRecordingListQuery(str);
        }

        const hasuraRecordingDetailsRes = await client.query({
            query,
            variables: queryVariables,
        });

        const hasuraRecordingDetailsData = await hasuraRecordingDetailsRes.data;
        const recordingDetails = await hasuraRecordingDetailsData.Recordings;
        const recordingAggregate = await hasuraRecordingDetailsData.Recordings_aggregate;
        const aggregate = await recordingAggregate.aggregate;
        const count = await aggregate.count;

        setRecordingDetails(recordingDetails);
        setTotalCount(count);
    } catch (error) {
        // Handle error
    } finally {
        setLoader(false);
    }
};
