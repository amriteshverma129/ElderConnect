import React from "react";
import Skeleton from "@mui/material/Skeleton";
import styles from "./detailSummary.module.scss";

export const DetailSummarySkeleton = () => {
    return (
        <div className={styles["detailSummary-skeleton"]}>
            <Skeleton variant="text" sx={{ width: "100%", fontSize: "50px" }} />
        </div>
    );
};
