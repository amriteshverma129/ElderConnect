import { GetAllBuddiesQuery, GetSingleBuddyQuery } from "../../generated/graphql";

export type imageType = {
    dimensions?: {
        width?: string;
        height?: string;
    };
    alt?: string;
    copyright?: string | null;
    url?: string;
};

export type buddyType = {
    name?: string;
    description?: string;
    image?: imageType;
};

export type nodeType = {
    image?: imageType;
    name?: string;
    email?: string;
    callAvailability?: string;
    about?: string;
    aWordFromBuddy?: string;
    favouriteColor?: string;
    familyBackground?: string;
    background?: string;
    likes?: string;
    dislikes?: string;
    hobbies?: string;
    use?: string;
    personality?: string;
};

export interface BuddyHomeCardProps {
    buddy: buddyType;
}

export interface BuddyDetailProps {
    data: GetSingleBuddyQuery;
}

export interface BuddyCardProps {
    email?: string;
    image?: imageType;
    title?: string;
    availability?: string;
    about?: string;
}
export interface ChooseBuddyCardProps {
    email?: string;
    image?: imageType;
    title?: string;
    availability?: string;
    about?: string;
    id?: string;
    arr: Array<boolean>;
    handleActiveArr: (index: number) => void;
    scrollToBottom: () => void;
    index: number;
}
export interface ChooseBuddyListProps {
    data: GetAllBuddiesQuery;
    email: string;
}

export interface BuddyListProps {
    data: GetAllBuddiesQuery;
}

export interface BuddyPageProps {
    data: GetAllBuddiesQuery;
}

export interface ChooseBuddyPageProps {
    data: GetAllBuddiesQuery;
}

export interface BuddyDetailPageProps {
    data: GetSingleBuddyQuery;
}
