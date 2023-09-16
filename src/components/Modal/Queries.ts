import { gql } from "@apollo/client";

export const CREATE_PRODUCT_MUTATION = gql`
    mutation CreateProduct(
        $image: String
        $communityId: Int
        $description: String
        $userName: String
        $email: String
        $videos: String
    ) {
        insert_Posts_one(
            object: {
                communityId: $communityId
                description: $description
                image: $image
                userName: $userName
                email: $email
                videos: $videos
            }
        ) {
            postId
        }
    }
`;

export const insertReviewToReviewsTableQueries = gql`
    mutation insert_Reviews_one(
        $meetingId: bigint
        $rating: Int
        $review: String
        $startTime: timestamptz
        $user: String
        $username: String
    ) {
        insert_Reviews_one(
            object: {
                meetingId: $meetingId
                rating: $rating
                review: $review
                startTime: $startTime
                user: $user
                username: $username
            }
        ) {
            meetingId
        }
    }
`;
