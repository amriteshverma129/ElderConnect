import { gql } from "@apollo/client";

export const getMeetingListQuery = (str: string) => {
    return gql`
    query getMeetingList($startTime: timestamptz, $search: String, $offset: Int, $limit: Int) @cached {
        MeetingDetails(
            where: {
                endTime: { _gte: $startTime }
                prismicContent: { _or: ${str} }
                _or: [
                    { eventTopic: { _iregex: $search } }
                    { prismicContent: { _or: [{ category: { _iregex: $search } }, { tag: { _iregex: $search } }] } }
                ]
            }
            limit: $limit
            order_by: { startTime: asc }
            offset: $offset
        ) {
            id
            meetingId
            duration
            eventTopic
            startTime
            endTime
            uuid
            join_url
            Reviews_aggregate {
                aggregate {
                    avg {
                        rating
                    }
                    count
                }
            }
        }
        MeetingDetails_aggregate(
            where: {
                endTime: { _gte: $startTime }
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

export const getMeetingListBasedOnDateQuery = (str: string) => {
    return gql`
    query getMeetingList($startTime: timestamptz, $endTime: timestamptz, $search: String, $offset: Int, $limit: Int)
    @cached {
        MeetingDetails(
            where: {
                _and: [{ startTime: { _gte: $startTime } }, { startTime: { _lt: $endTime } }]
                prismicContent: { _or: ${str} }
                _or: [
                    { eventTopic: { _iregex: $search } }
                    { prismicContent: { _or: [{ category: { _iregex: $search } }, { tag: { _iregex: $search } }] } }
                ]
            }
            limit: $limit
            order_by: { startTime: asc }
            offset: $offset
        ) {
            id
            meetingId
            duration
            eventTopic
            startTime
            endTime
            uuid
            join_url
            Reviews_aggregate {
                aggregate {
                    avg {
                        rating
                    }
                    count
                }
            }
        }
        MeetingDetails_aggregate(
            where: {
                _and: [{ startTime: { _gte: $startTime } }, { startTime: { _lt: $endTime } }]
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

export const getMeetingListBasedOnCategoryQuery = (str: string) => {
    return gql`
        query getMeetingList($startTime: timestamptz, $category: [String!], $offset: Int, $limit: Int) @cached {
            MeetingDetails(
                where: {
                    endTime: { _gte: $startTime }
                    prismicContent: { _or: ${str}, categoryArr: { _contained_in: $category } }
                }
                limit: $limit
                order_by: { startTime: asc }
                offset: $offset
            ) {
                id
                meetingId
                duration
                eventTopic
                startTime
                endTime
                uuid
                join_url
                Reviews_aggregate {
                    aggregate {
                        avg {
                            rating
                        }
                        count
                    }
                }
            }
            MeetingDetails_aggregate(
                where: {
                    endTime: { _gte: $startTime }
                    prismicContent: { _or: ${str}, categoryArr: { _contained_in: $category } }
                }
            ) {
                aggregate {
                    count
                }
            }
        }
    `;
};

export const getMeetingListBasedOnDateAndCategoryQuery = (str: string) => {
    return gql`
    query getMeetingList(
        $startTime: timestamptz
        $endTime: timestamptz
        $category: [String!]
        $offset: Int
        $limit: Int
    ) @cached {
        MeetingDetails(
            where: {
                _and: [{ startTime: { _gte: $startTime } }, { startTime: { _lt: $endTime } }]
                prismicContent: { _or: ${str}, categoryArr: { _contained_in: $category } }
            }
            limit: $limit
            order_by: { startTime: asc }
            offset: $offset
        ) {
            id
            meetingId
            duration
            eventTopic
            startTime
            endTime
            uuid
            join_url
            Reviews_aggregate {
                aggregate {
                    avg {
                        rating
                    }
                    count
                }
            }
        }
        MeetingDetails_aggregate(
            where: {
                _and: [{ startTime: { _gte: $startTime } }, { startTime: { _lt: $endTime } }]
                prismicContent: { _or: ${str}, categoryArr: { _contained_in: $category } }
            }
        ) {
            aggregate {
                count
            }
        }
    }
`;
};

export const getMeetingListBasedOnSearchAndCategoryQuery = (str: string) => {
    return gql`
    query getMeetingList($startTime: timestamptz, $category: [String!], $search: String, $offset: Int, $limit: Int)
    @cached {
        MeetingDetails(
            where: {
                endTime: { _gte: $startTime }
                prismicContent: { _or: ${str} }
                _or: [
                    { eventTopic: { _iregex: $search } }
                    {
                        prismicContent: {
                            _or: [
                                { category: { _iregex: $search } }
                                { tag: { _iregex: $search } }
                                { categoryArr: { _contained_in: $category } }
                            ]
                        }
                    }
                ]
            }
            limit: $limit
            order_by: { startTime: asc }
            offset: $offset
        ) {
            id
            meetingId
            duration
            eventTopic
            startTime
            endTime
            uuid
            join_url
            Reviews_aggregate {
                aggregate {
                    avg {
                        rating
                    }
                    count
                }
            }
        }
        MeetingDetails_aggregate(
            where: {
                endTime: { _gte: $startTime }
                prismicContent: { _or: ${str} }
                _or: [
                    { eventTopic: { _iregex: $search } }
                    {
                        prismicContent: {
                            _or: [
                                { category: { _iregex: $search } }
                                { tag: { _iregex: $search } }
                                { categoryArr: { _contained_in: $category } }
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

export const getMeetingListBasedOnSearchDateAndCategory = (str: string) => {
    return gql`
    query getMeetingList(
        $startTime: timestamptz
        $endTime: timestamptz
        $category: [String!]
        $search: String
        $offset: Int
        $limit: Int
    ) @cached {
        MeetingDetails(
            where: {
                _and: [{ startTime: { _gte: $startTime } }, { startTime: { _lt: $endTime } }]
                prismicContent: { _or: ${str} }
                _or: [
                    { eventTopic: { _iregex: $search } }
                    {
                        prismicContent: {
                            _or: [
                                { category: { _iregex: $search } }
                                { tag: { _iregex: $search } }
                                { categoryArr: { _contained_in: $category } }
                            ]
                        }
                    }
                ]
            }
            limit: $limit
            order_by: { startTime: asc }
            offset: $offset
        ) {
            id
            meetingId
            duration
            eventTopic
            startTime
            endTime
            uuid
            join_url
            Reviews_aggregate {
                aggregate {
                    avg {
                        rating
                    }
                    count
                }
            }
        }
        MeetingDetails_aggregate(
            where: {
                _and: [{ startTime: { _gte: $startTime } }, { startTime: { _lt: $endTime } }]
                prismicContent: { _or: ${str} }
                _or: [
                    { eventTopic: { _iregex: $search } }
                    {
                        prismicContent: {
                            _or: [
                                { category: { _iregex: $search } }
                                { tag: { _iregex: $search } }
                                { categoryArr: { _contained_in: $category } }
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

export const getMeetingListBasedOnDateQuery2 = gql`
    query getMeetingList($startTime: timestamptz, $endTime: timestamptz) {
        MeetingDetails(
            where: { _and: [{ startTime: { _gte: $startTime } }, { startTime: { _lt: $endTime } }] }
            order_by: { startTime: asc }
        ) {
            id
            meetingId
            duration
            eventTopic
            startTime
            endTime
            join_url
        }
    }
`;

export const getMeetingBasedOnMeetingIdAndStarttime = gql`
    query getMeetingBasedOnMeetingIdAndStarttime($meetingId: bigint, $startTime: timestamptz) {
        MeetingDetails(where: { meetingId: { _eq: $meetingId }, startTime: { _eq: $startTime } }) {
            id
            meetingId
            duration
            eventTopic
            startTime
            endTime
            uuid
            join_url
            Reviews(order_by: { created_at: desc }) {
                rating
                review
                user
                created_at
            }
            Reviews_aggregate {
                aggregate {
                    avg {
                        rating
                    }
                    count
                }
            }
        }
    }
`;

export const getMeetingBasedOnMeetingIdAndStarttime2 = gql`
    query getMeetingBasedOnMeetingIdAndStarttime($meetingId: bigint, $startTime: timestamptz) {
        MeetingDetails(
            where: { meetingId: { _eq: $meetingId }, endTime: { _gte: $startTime } }
            order_by: { startTime: asc }
            limit: 1
        ) {
            id
            meetingId
            duration
            eventTopic
            startTime
            endTime
            uuid
            join_url
            Reviews(order_by: { created_at: desc }) {
                rating
                review
                user
                created_at
            }
            Reviews_aggregate {
                aggregate {
                    avg {
                        rating
                    }
                    count
                }
            }
        }
    }
`;

export const getReviewsBasedOnMeetingIdandStartTimeQuery = gql`
    query getReviewsBasedOnMeetingId($meetingId: bigint, $startTime: timestamptz, $offset: Int, $limit: Int) {
        Reviews(
            where: { meetingId: { _eq: $meetingId }, startTime: { _eq: $startTime } }
            order_by: { created_at: desc }
            limit: $limit
            offset: $offset
        ) {
            rating
            review
            user
            created_at
        }
        Reviews_aggregate(where: { meetingId: { _eq: $meetingId } }) {
            aggregate {
                avg {
                    rating
                }
                count
            }
        }
    }
`;

export const insertMeetingDetails = gql`
    mutation insert_MeetingDetails($meetingsList: [MeetingDetails_insert_input!]!) {
        insert_MeetingDetails(
            objects: $meetingsList
            on_conflict: {
                constraint: MeetingDetails_meetingId_startTime_key
                update_columns: [eventTopic, duration, meetingId, startTime, uuid, join_url, endTime]
            }
        ) {
            affected_rows
        }
    }
`;

export const getAllWordPressPagesQuery = gql`
    query getAllWordPressPages {
        pages {
            nodes {
                pageId
                title
                content
                featuredImage {
                    node {
                        id
                        sourceUrl
                    }
                }
            }
        }
    }
`;

export const insert_userAnalytics_one_Query = gql`
    mutation insert_userAnalytics_one(
        $username: String
        $meetingId: bigint
        $join_url: String
        $startTime: timestamptz
        $eventTopic: String
        $userAuthId: String
        $contactId: Int
        $roles: String
        $firstName: String
        $lastName: String
        $connection: String
        $city: String
        $state: String
        $country: String
    ) {
        insert_userAnalytics_one(
            object: {
                eventTopic: $eventTopic
                join_url: $join_url
                meetingId: $meetingId
                startTime: $startTime
                username: $username
                userAuthId: $userAuthId
                contactId: $contactId
                roles: $roles
                firstName: $firstName
                lastName: $lastName
                connection: $connection
                city: $city
                state: $state
                country: $country
            }
            on_conflict: {
                constraint: userAnalytics_username_meetingId_startTime_key
                update_columns: [eventTopic, joinTime, firstName, lastName, connection, city, state, country]
            }
        ) {
            meetingId
        }
    }
`;
