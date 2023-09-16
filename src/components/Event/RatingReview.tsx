import React from "react";
import Rating from "../Rating/Rating";
import styles from "./Style/ratingReview.module.scss";
import { RatingReviewProps } from "./Type";

function RatingReview({ value, ratingValue, noOfReview, color }: RatingReviewProps) {
    return (
        <div
            className={styles["rating-Review"]}
            style={{ display: "flex", flexDirection: "row", height: "30px", alignItems: "center" }}
        >
            {value !== undefined && <Rating color={{ filled: color }} fontSize={30} rating={value} />}
            <span className={styles["rating-Review-value"]}>
                {ratingValue}
                <span className={styles["rating-Review-dot"]}></span>
                {noOfReview} {noOfReview === 0 || noOfReview === 1 ? "Rating" : "Ratings"}
            </span>
        </div>
    );
}

export default RatingReview;
