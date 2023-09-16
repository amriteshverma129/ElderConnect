import { GetAllEventDetailPageQuery, GetAllPurchaseMembershipQuery } from "../../generated/graphql";
import { UserProfile } from "../Home/Type";

export type planSliceType = {
    variation?: {
        primary?: {
            tag?: string;
            title?: string;
            description?: string;
            price?: string;
            term?: string;
            link?: string;
            profit?: string;
            type?: string;
        };
    };
};
export type planNodeType = {
    node: {
        slices?: Array<planSliceType>;
    };
};

export type userType = {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    roles?: string;
    contactId?: number;
    buddy?: string;
    buddyIntakeForm?: string;
    birthDay?: string;
    aboutMe?: string;
    created_at?: string;
    profileImage?: string;
    notificationsOn?: boolean;
    connection?: string;
};

export interface ChangePasswordProps {
    fullWidth: boolean;
}

export interface PurchaseProps {
    slices?: Array<planSliceType> | [];
}

export interface AccountDetailPageProps {
    allPurchaseMemberships?: GetAllPurchaseMembershipQuery["allPurchaseMemberships"];
    allEventdetailpages?: GetAllEventDetailPageQuery["allEventdetailpages"];
}

export interface NotificationProps {
    data?: GetAllEventDetailPageQuery["allEventdetailpages"];
}

export type notificationType = {
    id: number;
    title: string;
    join_url: string;
    type: string;
    meetingId: string;
    startTime: string;
    endTime: string;
    created_at: string;
    status: boolean;
    duration: number;
    username: string;
};

export interface UserContextValue {
    user: UserProfile;
    userDetails: userType;
    trialExpirePopUp: boolean;
    countTodaysNotification: number;
    notifications: Array<notificationType> | [];
}

export interface UserProviderProps {
    children: React.ReactNode;
}
