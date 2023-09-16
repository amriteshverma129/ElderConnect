import { gql } from "@apollo/client";

export const getUserDetailUsingEmailQuery = gql`
    subscription getUserDetails($email: String!) {
        userDetails(where: { email: { _eq: $email } }) {
            firstName
            lastName
            email
            phone
            roles
            buddy
            buddyIntakeForm
            aboutMe
            contactId
            birthDay
            created_at
            profileImage
            notificationsOn
            connection
        }
    }
`;

export const getUserDetailUsingPhoneQuery = gql`
    subscription getUserDetails($phone: String!) {
        userDetails(where: { phone: { _eq: $phone } }) {
            firstName
            lastName
            email
            phone
            roles
            buddy
            buddyIntakeForm
            aboutMe
            contactId
            birthDay
            created_at
            profileImage
            notificationsOn
            connection
        }
    }
`;

export const getUserDetailUsingEmailQuery2 = gql`
    query getUserDetails($email: String!) {
        userDetails(where: { email: { _eq: $email } }) {
            firstName
            lastName
            email
            phone
            roles
            buddy
            buddyIntakeForm
            aboutMe
            contactId
            birthDay
            created_at
            profileImage
            notificationsOn
        }
    }
`;

export const getUserDetailUsingPhoneQuery2 = gql`
    query getUserDetails($phone: String!) {
        userDetails(where: { phone: { _eq: $phone } }) {
            firstName
            lastName
            email
            phone
            roles
            buddy
            buddyIntakeForm
            aboutMe
            contactId
            birthDay
            created_at
            profileImage
            notificationsOn
        }
    }
`;

export const updateUserDetailQuery = gql`
    mutation update_userDetails_by_pk(
        $contactId: Int!
        $birthDay: String
        $aboutMe: String
        $email: String
        $phone: String
    ) {
        update_userDetails_by_pk(
            pk_columns: { contactId: $contactId }
            _set: { birthDay: $birthDay, aboutMe: $aboutMe, email: $email, phone: $phone }
        ) {
            contactId
        }
    }
`;

export const getUserDetailCountUsingEmailQuery = gql`
    query getCount($email: String!) {
        userDetails_aggregate(where: { email: { _eq: $email } }) {
            aggregate {
                count
            }
        }
    }
`;

export const getNotifcationsListQuery = (str: string) => {
    return gql`
        query getAllNotifications($limit: Int, $offset: Int , $username: String) {
            Notifications(
                where: {
                    prismicContent: { _or: ${str} }
                    type: { _iregex: "reminder" }
                    username: { _eq: $username }
                }
                limit: $limit
                order_by: { created_at: desc }
                offset: $offset
            ) {
                id
                title
                startTime
                endTime
                type
                meetingId
                username
                status
                created_at
                join_url
                duration
            }
            Notifications_aggregate(
                where: {
                    prismicContent: { _or: ${str} }
                    type: { _iregex: "reminder" }
                    username: { _eq: $username }
                }
            ) {
                aggregate {
                    count
                }
            }
        }
    `;
};

export const getNotifcationsListBasedOnFilterQuery = (str: string) => gql`
    query getAllNotifications($limit: Int, $offset: Int , $username: String) {
        Notifications(
            where: {
                prismicContent: { _or: ${str} }
                status: { _eq: true }
                type: { _iregex: "reminder" }
                username: { _eq: $username }
            }
            limit: $limit
            order_by: { created_at: desc }
            offset: $offset
        ) {
            id
            title
            startTime
            endTime
            type
            meetingId
            username
            status
            created_at
            join_url
            duration
        }
        Notifications_aggregate(
            where: {
                prismicContent: { _or: ${str} }
                status: { _eq: true }
                type: { _iregex: "reminder" }
                username: { _eq: $username }
            }
        ) {
            aggregate {
                count
            }
        }
    }
`;

export const getLatestNotificationQuery = (str: string) => gql`
subscription getAllNotifications($limit: Int, $offset: Int , $username: String, $startTime: timestamptz, $endTime: timestamptz) {
    Notifications(
        where: {
            _and: [{ endTime: { _gte: $startTime } }, { startTime: { _lte: $endTime } }]
            prismicContent: { _or: ${str} }
            status: { _eq: true }
            type: { _iregex: "reminder" }
            username: { _eq: $username }
        }
        limit: $limit
        order_by: { created_at: desc }
        offset: $offset
    ) {
        id
        title
        startTime
        endTime
        type
        meetingId
        username
        status
        created_at
        join_url
        duration
    }
}
`;

export const getTotalUnreadNotificationsCountQuery = (str: string) => gql`
subscription getAllNotifications($username: String) {
    Notifications_aggregate(
        where: {
            prismicContent: { _or: ${str} }
            status: { _eq: true }
            type: { _iregex: "reminder" }
            username: { _eq: $username }
        }
    ) {
        aggregate {
            count
        }
    }
}
`;

export const updateNotificationStatusQuery = gql`
    mutation updateNotification($meetingId: bigint, $startTime: timestamptz, $username: String) {
        update_Notifications(
            where: { meetingId: { _eq: $meetingId }, startTime: { _eq: $startTime }, username: { _eq: $username } }
            _set: { status: false }
        ) {
            affected_rows
        }
    }
`;

export const updateUserNotificationStatusQuery = gql`
    mutation updateUserNotificationStatus($notificationsOn: Boolean, $contactId: Int!) {
        update_userDetails_by_pk(_set: { notificationsOn: $notificationsOn }, pk_columns: { contactId: $contactId }) {
            contactId
            notificationsOn
        }
    }
`;

export const insertMultipleNotificationQuery = gql`
    mutation insert_Notifications($notificationList: [Notifications_insert_input!]!) {
        insert_Notifications(
            objects: $notificationList
            on_conflict: {
                constraint: Notifications_username_meetingId_startTime_key
                update_columns: [title, type, join_url, duration, username, endTime]
            }
        ) {
            affected_rows
        }
    }
`;
