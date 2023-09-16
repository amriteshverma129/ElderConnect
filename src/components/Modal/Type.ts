import { filterType } from "../Event/Type";
import { Dispatch, SetStateAction } from "react";

export interface FeedbackModalProps {
    children?: React.ReactNode;
    meetingId?: string | string[];
    startTime?: string | string[];
    eventTopic?: string | string[];
    open?: boolean;
}

export interface FilterModalProps {
    children: React.ReactNode;
    setFilterObj: Dispatch<SetStateAction<filterType>>;
    filterObj: filterType;
}

export interface NeedHelpModalProps {
    children?: React.ReactNode;
    open?: boolean;
}

export interface PostCreatorModalProps {
    children: React.ReactNode;
    communityId?: number;
}

export interface SendInviteModalProps {
    children: React.ReactNode;
    communityId?: string | string[];
}
export interface SharePostModalProps {
    children: React.ReactNode;
    communityId?: number;
}

export interface ThankyouModalProps {
    children?: React.ReactNode;
    open?: boolean;
}

export interface UpdateEmailModalProps {
    children?: React.ReactNode;
    open?: boolean;
    setPopUp: Dispatch<SetStateAction<boolean>>;
}

export interface ContactUsModalProps {
    children?: React.ReactNode;
    open?: boolean;
    setPopUp: Dispatch<SetStateAction<boolean>>;
}

export interface TermConditionModalProps {
    children?: React.ReactNode;
}

export interface ResetModalProps {
    children?: React.ReactNode;
}

export interface TrialPeriodModalProps {
    children?: React.ReactNode;
}
