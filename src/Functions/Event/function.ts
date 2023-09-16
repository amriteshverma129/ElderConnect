import { Dispatch, SetStateAction } from "react";
import { filterType, meetingType, meetingType2, stringType } from "../../components/Event/Type";
import client from "../../apolloClient";
import {
    getMeetingBasedOnMeetingIdAndStarttime,
    getMeetingBasedOnMeetingIdAndStarttime2,
    getMeetingListBasedOnCategoryQuery,
    getMeetingListBasedOnDateAndCategoryQuery,
    getMeetingListBasedOnDateQuery,
    getMeetingListBasedOnSearchAndCategoryQuery,
    getMeetingListBasedOnSearchDateAndCategory,
    getMeetingListQuery,
} from "../../components/Event/Queries";
import moment from "moment";

//Below Function is described to fetch details about the particular event
export const fetchMeetingDetail = async (
    meetingId: stringType,
    startTime: stringType,
    setMeeting: Dispatch<SetStateAction<meetingType2>>,
) => {
    const hasuraMeetingDetailRes = await client.query({
        query: getMeetingBasedOnMeetingIdAndStarttime,
        variables: {
            meetingId: meetingId,
            startTime: startTime,
        },
    });
    const hasuraMeetingDetailData = await hasuraMeetingDetailRes.data;
    const meetingDetails = await hasuraMeetingDetailData.MeetingDetails;
    setMeeting(meetingDetails[0]);
};

export const fetchMeetingDetail2 = async (
    meetingId: stringType,
    setMeeting: Dispatch<SetStateAction<meetingType2>>,
) => {
    const currentDate = new Date();
    const currentDateInUTC = new Date(currentDate.getTime() + currentDate.getTimezoneOffset() * 60000);
    const hasuraMeetingDetailRes = await client.query({
        query: getMeetingBasedOnMeetingIdAndStarttime2,
        variables: {
            meetingId: meetingId,
            startTime: moment(currentDateInUTC).format("YYYY-MM-DD HH:mm:ss"),
        },
    });
    const hasuraMeetingDetailData = await hasuraMeetingDetailRes.data;
    const meetingDetails = await hasuraMeetingDetailData.MeetingDetails;
    setMeeting(meetingDetails[0]);
};

export const fetchMeetingDetails = async (
    setMeetingDetails: Dispatch<SetStateAction<meetingType[] | []>>,
    str: string,
    search: string,
    setTotalCount: Dispatch<SetStateAction<number>>,
    offset: number,
    limit: number,
    setLoader: Dispatch<SetStateAction<boolean>>,
) => {
    setLoader(true);
    setMeetingDetails([]);
    const currentDate = new Date();
    const currentDateInUTC = new Date(currentDate.getTime() + currentDate.getTimezoneOffset() * 60000);
    const hasuraMeetingDetailsRes = await client.query({
        query: getMeetingListQuery(str),
        variables: {
            startTime: moment(currentDateInUTC).format("YYYY-MM-DD HH:mm:ss"),
            search: search,
            limit: limit,
            offset: offset,
        },
    });
    const hasuraMeetingDetailsData = await hasuraMeetingDetailsRes.data;
    const meetingDetails = await hasuraMeetingDetailsData.MeetingDetails;
    const meetingAggregate = await hasuraMeetingDetailsData.MeetingDetails_aggregate;
    const aggregate = await meetingAggregate.aggregate;
    const count = await aggregate.count;
    setMeetingDetails(meetingDetails);
    setTotalCount(count);
    setLoader(false);
};

export const fetchMeetingDetailsBasedOnFilter = async (
    setMeetingDetails: Dispatch<SetStateAction<meetingType[] | []>>,
    str: string,
    search: string,
    setTotalCount: Dispatch<SetStateAction<number>>,
    offset: number,
    limit: number,
    setLoader: Dispatch<SetStateAction<boolean>>,
    filterObj: filterType,
) => {
    try {
        setLoader(true);
        setMeetingDetails([]);

        const currentDate = new Date();
        const currentDateInUTC = new Date(currentDate.getTime() + currentDate.getTimezoneOffset() * 60000);

        const queryVariables: Record<string, string | number | Date | Array<string> | []> = {
            search,
            limit,
            offset,
            startTime: moment(currentDateInUTC).format("YYYY-MM-DD HH:mm:ss"),
        };

        if (filterObj.eventStartTime && filterObj.eventEndTime) {
            const filterEventStartTime = new Date(filterObj.eventStartTime);
            const filterEventEndTime = new Date(filterObj.eventEndTime);
            const filterEventStartTimeInUTC = new Date(
                filterEventStartTime.getTime() + filterEventStartTime.getTimezoneOffset() * 60000,
            );
            const filterEventEndTimeInUTC = new Date(
                filterEventEndTime.getTime() + filterEventEndTime.getTimezoneOffset() * 60000,
            );
            queryVariables.startTime = moment(filterEventStartTimeInUTC).format("YYYY-MM-DD HH:mm:ss");
            queryVariables.endTime = moment(filterEventEndTimeInUTC).format("YYYY-MM-DD HH:mm:ss");
        }

        if (filterObj.categories.length) {
            queryVariables.category = filterObj.categories;
        }

        let query;
        if (filterObj.eventStartTime && filterObj.eventEndTime && filterObj.categories.length && search) {
            query = getMeetingListBasedOnSearchDateAndCategory(str);
        } else if (filterObj.eventStartTime && filterObj.eventEndTime && filterObj.categories.length) {
            query = getMeetingListBasedOnDateAndCategoryQuery(str);
        } else if (filterObj.eventStartTime && filterObj.eventEndTime && search) {
            query = getMeetingListBasedOnDateQuery(str);
        } else if (filterObj.categories.length && search) {
            query = getMeetingListBasedOnSearchAndCategoryQuery(str);
        } else if (filterObj.categories.length) {
            query = getMeetingListBasedOnCategoryQuery(str);
        } else if (filterObj.eventStartTime && filterObj.eventEndTime) {
            query = getMeetingListBasedOnDateQuery(str);
        } else {
            query = getMeetingListQuery(str);
        }

        const hasuraMeetingDetailsRes = await client.query({
            query,
            variables: queryVariables,
        });

        const hasuraMeetingDetailsData = hasuraMeetingDetailsRes.data;
        const meetingDetails = hasuraMeetingDetailsData.MeetingDetails;
        const meetingAggregate = hasuraMeetingDetailsData.MeetingDetails_aggregate;
        const aggregate = meetingAggregate.aggregate;
        const count = aggregate.count;

        setMeetingDetails(meetingDetails);
        setTotalCount(count);
    } catch (error) {
        // Handle error
    } finally {
        setLoader(false);
    }
};
