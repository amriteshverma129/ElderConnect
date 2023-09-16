export type imageType = {
    dimensions?: {
        width?: string;
        height?: string;
    };
    alt?: string;
    copyright?: string | null;
    url?: string;
};
export type forumType = {
    title?: string;
    category?: string;
    image?: imageType;
};

export type postType = {
    postId?: number;
    communityId?: number;
    image?: string | null;
    description?: string | null;
    userName?: string;
    email?: string;
    videos?: string | null;
    created_at?: string;
};
export interface ReadMoreProp {
    detail: string;
}
export interface AllDummyDataType {
    dateOfBirth: string;
    community: number;
    follower: number;
    following: number;
    connection: number;
    specificUserFlower: number;
}

export interface MemberCardProps {
    memberDesginType: string;
}

export interface MembersProps {
    memberDesginType: string;
}

export interface CategoryProps {
    category?: string;
}
export interface CommunityCardProps {
    communityDesginType: string;
}

export interface CommunityCardsProps {
    communityDesginType: string;
}
export interface CommunityDetailProps {
    communityId?: string | string[];
}
export interface CommunityHomecardsProps {
    items: Array<forumType>;
}
export interface PostCardProps {
    postId?: number;
    communityId?: number;
    image?: string | null;
    description?: string | null;
    userName?: string;
    email?: string;
    videos?: string | null;
    created_at?: string;
}
export interface PostsProps {
    communityId?: string | string[];
}
