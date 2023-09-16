export interface UserProfile {
    email?: string | null;
    email_verified?: boolean | null;
    name?: string | null;
    nickname?: string | null;
    picture?: string | null;
    sub?: string | null;
    updated_at?: string | null;
    org_id?: string | null;
    phone_number?: string | null;
    user_id?: string | null;
    last_ip?: string | null;
}

export type ErrorType = {
    firstNameErrorMessage?: string;
    lastNameErrorMessage?: string;
    emailErrorMessage?: string;
    phoneErrorMessage?: string;
    otpErrorMessage?: string;
    passwordErrorMessage?: string;
    nameErrorMessage?: string;
    cardNoErrorMessage?: string;
    expiryMonthErrorMessage?: string;
    expiryYearErrorMessage?: string;
    cardTypeErrorMessage?: string;
    partnerErrorMessage?: string;
    nameOfBusinessErrorMessage?: string;
};

export type videoType = {
    title?: string;
    image?: imageType;
};
export type buddyType = {
    name?: string;
    description?: string;
    image?: {
        dimensions?: {
            width?: string;
            height?: string;
        };
        alt?: string;
        copyright?: string | null;
        url?: string;
    };
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

export type forumType = {
    title?: string;
    category?: string;
    image?: imageType;
};
