import React from "react";
import styles from "./Style/cancellationProcess.module.scss";
import Skeleton from "@mui/material/Skeleton";

export const CancellationProcessSkeleton = () => {
    return (
        <div className="layout-container">
            <div className={styles["cancellationProcess-heading-skeleton"]}>
                <Skeleton variant="text" sx={{ width: "100%" }} />
            </div>
            <div className={styles["cancellationProcess-skeleton"]}>
                <div className={styles["cancellationProcess-para-skeleton"]}>
                    <span>
                        <Skeleton variant="text" sx={{ width: "100%" }} />
                    </span>
                    <span>
                        <Skeleton variant="text" sx={{ width: "100%" }} />
                    </span>
                </div>
                <div className={styles["infusion-form-skeleton"]}>
                    <div>
                        <Skeleton variant="text" sx={{ width: "100%" }} />
                        <Skeleton variant="text" sx={{ width: "100%" }} />
                    </div>
                    <Skeleton variant="text" sx={{ width: "100px", height: "35px" }} />
                    <Skeleton variant="rounded" sx={{ width: "100%", height: "50px", borderRadius: "30px" }} />
                    <Skeleton variant="rounded" sx={{ width: "100%", height: "350px", borderRadius: "10px" }} />
                    <div className={`${styles["infusion-submit-skeleton"]}`}>
                        <Skeleton variant="rounded" sx={{ width: "100%", height: "100%", borderRadius: "30px" }} />
                    </div>
                    <p>
                        <Skeleton variant="text" sx={{ width: "100%" }} />
                    </p>
                </div>
            </div>
        </div>
    );
};
