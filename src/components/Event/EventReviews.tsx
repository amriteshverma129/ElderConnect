import React from "react";
// import moment from "moment";
import styles from "./Style/eventReviews.module.scss";
import Rating from "../Rating/Rating";
// import { Grid, Avatar } from "@mui/material";
import { EventReviewsProps } from "./Type";
// import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";

//Event Reviews component will render all the reviews on particular Event .
const EventReviews = ({ meeting }: EventReviewsProps) => {
    const isMobile = useMediaQuery({ query: `(max-width: 576px)` });
    // const displayedCards = 6;
    // const router = useRouter();

    return (
        <div>
            <div className={styles["event-review-holder"]}>
                {meeting?.Reviews_aggregate?.aggregate?.avg?.rating !== null && (
                    <div>
                        <div className={styles["event-review-rating"]}>
                            {meeting?.Reviews_aggregate?.aggregate?.avg?.rating !== undefined &&
                                meeting?.Reviews_aggregate?.aggregate?.avg?.rating.toFixed(1)}{" "}
                        </div>
                        <div className={styles["event-review-count-star-holder"]}>
                            {meeting?.Reviews_aggregate?.aggregate?.avg?.rating && (
                                <Rating
                                    color={{ filled: "black" }}
                                    fontSize={isMobile ? 32 : 50}
                                    rating={
                                        meeting?.Reviews_aggregate?.aggregate?.avg?.rating === null
                                            ? 0
                                            : meeting?.Reviews_aggregate?.aggregate?.avg?.rating
                                    }
                                />
                            )}
                            <span className={styles["event-review-count"]}>
                                {meeting?.Reviews_aggregate?.aggregate?.count}{" "}
                                {meeting?.Reviews_aggregate?.aggregate?.count === 0 ||
                                meeting?.Reviews_aggregate?.aggregate?.count === 1
                                    ? "Rating"
                                    : "Ratings"}
                            </span>
                        </div>
                    </div>
                )}
                {/* ) : (
                    <Grid
                        sx={{
                            height: "80%",
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                        }}
                    >
                        <h6 className={styles["event-no-review"]}>No Review</h6>
                    </Grid>
                )} */}
                {/* <div className={styles["event-reviews"]}>
                    {meeting &&
                        meeting?.Reviews &&
                        meeting?.Reviews.slice(0, displayedCards)?.map(
                            (
                                review: { created_at?: Date; rating?: number; review?: string; user?: string },
                                index: number,
                            ) => {
                                return (
                                    <div className={styles["event-review"]} key={index}>
                                        <div className={styles["event-review-avatar-holder"]}>
                                            <Avatar sx={{ height: "72px", width: "72px" }}>
                                                {review.user?.charAt(0).toUpperCase()}
                                            </Avatar>
                                            <div style={{ marginLeft: "24px" }}>
                                                <span className={styles["event-review-name"]}>{review.user}</span>
                                                <br />
                                                <span className={styles["event-review-time"]}>
                                                    {moment(review.created_at).format("MMM YYYY")}
                                                </span>
                                            </div>
                                            <span className={styles["event-review-rating1"]}>
                                                {review.rating !== undefined && (
                                                    <Rating
                                                        color={{ filled: "#d92d3e" }}
                                                        fontSize={23}
                                                        rating={review.rating}
                                                    />
                                                )}
                                            </span>
                                        </div>
                                        <p className={styles["event-review-para"]}>{review.review}</p>
                                        <div className={styles["event-review-rating2"]}>
                                            {review.rating !== undefined && (
                                                <Rating
                                                    color={{ filled: "#d92d3e" }}
                                                    fontSize={23}
                                                    rating={review.rating}
                                                />
                                            )}
                                        </div>
                                    </div>
                                );
                            },
                        )}
                </div> */}
            </div>
            {/* <div>
                {meeting && meeting?.Reviews && meeting?.Reviews.length > displayedCards ? (
                    <button
                        className={styles["event-loadMore-button"]}
                        onClick={() =>
                            router.push({
                                pathname: `/UI/Events/Review`,
                                query: {
                                    meetingId: meeting?.meetingId,
                                    startTime: meeting?.startTime,
                                },
                            })
                        }
                    >
                        Show More
                    </button>
                ) : (
                    ""
                )}
            </div> */}
        </div>
    );
};
export default EventReviews;
