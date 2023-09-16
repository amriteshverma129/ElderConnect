import { nodeType } from "../Event/Type";

export type imageType = {
    dimensions?: {
        width?: string;
        height?: string;
    };
    alt?: string;
    copyright?: string | null;
    url?: string;
};

export type videoType = {
    title?: string;
    image?: imageType;
};

export type zoomRecordingType = {
    duration?: number;
    topic?: string;
    id?: number;
    start_time?: string;
    uuid?: string;
    videoUid?: string;
    recording_files?: Array<{
        download_url: string;
    }>;
};

export type recordingType = {
    downloadURL?: string;
    duration?: number;
    eventTopic?: string;
    meetingId?: number;
    startTime?: string;
    videoUid?: string;
    image?: imageType;
    passcode?: string;
    host?: string;
    category?: string;
    description?: string;
    link?: string;
    Likes?: Array<{
        username?: string;
    }>;
    Likes_aggregate?: {
        aggregate?: {
            count?: number;
        };
    };
};

export interface LibraryCardProps {
    recording: recordingType;
    index?: number;
    menuIcon?: string;
    prismicMapList: Map<number, nodeType>;
}

export interface LibraryCardsProps {
    recordings: Array<recordingType> | [];
    menuIcon?: string;
    prismicMapList: Map<number, nodeType>;
}

export interface LibraryHomeCardsProps {
    items: Array<videoType>;
}
export interface LibraryListProps {
    search: string;
    data: string;
    category: string;
    menuIcon: string;
}

export interface LibraryList2Props {
    category?: string;
}

export interface LibraryDetailProps {
    recordingId?: string | string[];
    startTime?: string | string[];
}

export interface LibraryPageProps {
    map: string;
}
