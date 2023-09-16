import { gql } from "@apollo/client";

export const getRecordingListQuery = (str: string) => {
    return gql`
    query getAllRecordings($startTime: timestamptz, $search: String, $limit: Int, $offset: Int) @cached {
        Recordings(
            where: {
                startTime: { _lte: $startTime }
                prismicContent: { _or: ${str} }
                _or: [
                    { eventTopic: { _iregex: $search } }
                    { prismicContent: { _or: [{ category: { _iregex: $search } }, { tag: { _iregex: $search } }] } }
                ]
            }
            limit: $limit
            order_by: { startTime: desc }
            offset: $offset
        ) {
            downloadURL
            duration
            eventTopic
            meetingId
            startTime
            videoUid
            Likes_aggregate {
                aggregate {
                    count
                }
            }
        }
        Recordings_aggregate(
            where: {
                startTime: { _lte: $startTime }
                prismicContent: { _or: ${str} }
                _or: [
                    { eventTopic: { _iregex: $search } }
                    { prismicContent: { _or: [{ category: { _iregex: $search } }, { tag: { _iregex: $search } }] } }
                ]
            }
        ) {
            aggregate {
                count
            }
        }
    }
`;
};

export const getRecordingListBasedOnCategoryQuery = (str: string) => {
    return gql`
    query getAllRecordings($startTime: timestamptz, $limit: Int, $offset: Int, $category: String) @cached {
        Recordings(
            where: { startTime: { _lte: $startTime }, prismicContent: { _or: ${str}, category: { _iregex: $category } } }
            limit: $limit
            order_by: { startTime: desc }
            offset: $offset
        ) {
            downloadURL
            duration
            eventTopic
            meetingId
            startTime
            videoUid
            Likes_aggregate {
                aggregate {
                    count
                }
            }
        }
        Recordings_aggregate(
            where: { startTime: { _lte: $startTime }, prismicContent: { _or: ${str}, category: { _iregex: $category } } }
        ) {
            aggregate {
                count
            }
        }
    }
`;
};

export const getRecordingListBasedOnSearchAndCategoryQuery = (str: string) => {
    return gql`
    query getAllRecordings($startTime: timestamptz, $search: String, $limit: Int, $offset: Int, $category: String)
    @cached {
        Recordings(
            where: {
                startTime: { _lte: $startTime }
                prismicContent: { _or: ${str} }
                _or: [
                    { eventTopic: { _iregex: $search } }
                    {
                        prismicContent: {
                            _or: [
                                { category: { _iregex: $search } }
                                { tag: { _iregex: $search } }
                                { category: { _iregex: $category } }
                            ]
                        }
                    }
                ]
            }
            limit: $limit
            order_by: { startTime: desc }
            offset: $offset
        ) {
            downloadURL
            duration
            eventTopic
            meetingId
            startTime
            videoUid
            Likes_aggregate {
                aggregate {
                    count
                }
            }
        }
        Recordings_aggregate(
            where: {
                startTime: { _lte: $startTime }
                prismicContent: { _or: ${str} }
                _or: [
                    { eventTopic: { _iregex: $search } }
                    {
                        prismicContent: {
                            _or: [
                                { category: { _iregex: $search } }
                                { tag: { _iregex: $search } }
                                { category: { _iregex: $category } }
                            ]
                        }
                    }
                ]
            }
        ) {
            aggregate {
                count
            }
        }
    }
`;
};

export const getRecordingBasedOnMeetingIdAndStartTime = gql`
    query getRecordings($recordingId: bigint, $startTime: timestamptz, $username: String) {
        Recordings(where: { startTime: { _eq: $startTime }, meetingId: { _eq: $recordingId } }) {
            downloadURL
            duration
            eventTopic
            meetingId
            startTime
            videoUid
            Likes(
                where: {
                    meetingId: { _eq: $recordingId }
                    startTime: { _eq: $startTime }
                    username: { _eq: $username }
                }
            ) {
                username
            }
            Likes_aggregate {
                aggregate {
                    count
                }
            }
        }
    }
`;

export const deleteRecordingLike = gql`
    mutation deleteLikes($recordingId: bigint!, $startTime: timestamptz!, $username: String!) {
        delete_Likes_by_pk(username: $username, meetingId: $recordingId, startTime: $startTime) {
            username
        }
    }
`;

export const insertRecordingLike = gql`
    mutation insert_Likes_one($recordingId: bigint!, $startTime: timestamptz!, $username: String!) {
        insert_Likes_one(object: { username: $username, meetingId: $recordingId, startTime: $startTime }) {
            username
        }
    }
`;

export const insert_Recordings = gql`
    mutation insert_Recordings($recordingList: [Recordings_insert_input!]!) {
        insert_Recordings(objects: $recordingList) {
            affected_rows
        }
    }
`;

export const fetchAvgRatingPerRecodingQuery = gql`
    query getAvgRating($meetingId: bigint, $startTime: timestamptz, $endTime: timestamptz) {
        Reviews_aggregate(where: { meetingId: { _eq: $meetingId }, startTime: { _gt: $startTime, _lt: $endTime } }) {
            aggregate {
                avg {
                    rating
                }
            }
        }
    }
`;

export const fetchReviewOfUserOnEventQuery = gql`
    query getReviewOfUser($meetingId: bigint, $startTime: timestamptz, $endTime: timestamptz, $username: String) {
        Reviews(
            where: {
                meetingId: { _eq: $meetingId }
                startTime: { _gt: $startTime, _lt: $endTime }
                username: { _eq: $username }
            }
        ) {
            meetingId
            startTime
            user
            username
            rating
        }
    }
`;

export const fetchMeetingDetailQuery = gql`
    query getMeetingBasedOnMeetingIdAndStarttime($meetingId: bigint, $startTime: timestamptz, $endTime: timestamptz) {
        MeetingDetails(where: { meetingId: { _eq: $meetingId }, startTime: { _gt: $startTime, _lt: $endTime } }) {
            meetingId
            eventTopic
            startTime
        }
    }
`;
