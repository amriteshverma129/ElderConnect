export type stringType = string | string[] | undefined;
export type reviewType = {
    rating?: number;
    review?: string;
    user?: string;
    created_at?: string;
};

export type imageType = {
    dimensions?: {
        width?: string;
        height?: string;
    };
    alt?: string;
    copyright?: string | null;
    url?: string;
};
export type meetingType = {
    __typename: string;
    category: string;
    description: string;
    descriptions?: Array<{ paragraph?: string; date?: Date }>;
    link: string;
    duration: number;
    eventTopic: string;
    host: string;
    id: number;
    meetingId: number;
    passcode: string;
    startTime: string;
    endTime: string;
    uuid: string;
    join_url?: string;
    image: imageType;
    Reviews_aggregate?: {
        aggregate?: {
            count?: number;
            avg?: {
                rating?: number;
            };
        };
    };
};
export type meetingType2 = {
    __typename?: string;
    description?: string;
    descriptions?: Array<{ paragraph?: string; date?: Date }>;
    link?: string;
    duration?: number;
    eventTopic?: string;
    id?: number;
    meetingId?: number;
    startTime?: string;
    endTime?: string;
    uuid?: string;
    join_url?: string;
    Reviews?: Array<{ created_at?: Date; rating?: number; review?: string; user?: string }>;
    Reviews_aggregate?: {
        aggregate?: {
            count?: number;
            avg?: {
                rating?: number;
            };
        };
    };
};

export type zoomMeetingType = {
    agenda?: string;
    duration?: number;
    topic?: string;
    id?: number;
    meetingId?: number;
    start_time?: string;
    uuid?: string;
    join_url?: string;
};

export type nodeType = {
    image?: imageType;
    meetingId?: number;
    category?: string;
    host?: string;
    passcode?: string;
    description?: string;
    link?: string;
    roles2?: Array<{ plan?: string }>;
    descriptions?: Array<{ paragraph?: string; date?: Date }>;
};
export type filterType = {
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    eventStartTime: string;
    eventEndTime: string;
    rating: number | null;
    categories: Array<string> | [];
};

export type dashboardContentType = {
    pageId?: number;
    title?: string;
    content?: string;
    featuredImage?: {
        node?: {
            sourceUrl?: string;
        };
    };
};

export interface EventCardProps {
    item: meetingType;
    prismicMapList: Map<number, nodeType>;
}
export interface EventCard2Props {
    items: Array<meetingType> | [];
    prismicMapList: Map<number, nodeType>;
}
export interface EventCardHolderProps {
    items: Array<meetingType> | [];
    prismicMapList: Map<number, nodeType>;
}

export interface EventDetailProps {
    meetingId: stringType;
    startTime?: stringType;
}
export interface EventListProps {
    data: string;
    search: string;
    filterObj: filterType;
}
export interface EventList2Props {
    category?: string;
}

export interface EventReviewsProps {
    meeting: meetingType2;
}

export interface EventPageProps {
    map: string;
    cmsWordPages:
        | Array<{
              pageId?: number;
              title?: string;
              content?: string;
              featuredImage?: {
                  node?: {
                      sourceUrl?: string;
                  };
              };
          }>
        | [];
}

export interface ZoomPageProps {
    ZOOM_SDK_KEY?: string;
    ZOOM_SDK_SECRET?: string;
}

export interface ZoomProps {
    setLoader: (loader: boolean) => unknown;
    meetingId: string | string[];
    startTime: string | string[];
    passcode: string | string[];
    eventTopic: string | string[];
    name: stringType | null;
    email: stringType | null;
}

export interface JoinEventButtonProps {
    startTime: string;
    duration: number;
    meetingId: number;
    passcode: string;
    eventTopic: string;
    join_url?: string;
}

export interface RatingReviewProps {
    value?: number;
    ratingValue?: string;
    noOfReview?: number;
    color: string;
}
