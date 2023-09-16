import React from "react";
import styles from "./Style/eventDetail.module.scss";
import Skeleton from "@mui/material/Skeleton";

export const EventDetailSkeleton = () => {
    return (
        <div className="layout-container-fluid">
            <div className={styles["event-detail-skeleton"]}>
                <div className={styles["event-detail-content-skeleton"]}>
                    <Skeleton variant="text" sx={{ fontSize: "40px", width: "50%" }} />
                    <div className={styles["event-detail-time-skeleton"]}>
                        <Skeleton variant="text" sx={{ fontSize: "30px", width: "40%" }} />
                        <div className={styles["event-detail-tag-skeleton"]}>
                            <Skeleton variant="rounded" sx={{ height: "60px", borderRadius: "35px" }} />
                        </div>
                    </div>
                </div>
                <div className={styles["event-detail-image-about-holder-skeleton"]}>
                    <div className={styles["event-detail-image-holder-skeleton"]}>
                        <div className={styles["event-detail-image-skeleton"]}>
                            <Skeleton variant="rounded" sx={{ height: "100%", width: "100%" }} />
                        </div>
                    </div>
                    <div className={styles["event-detail-about-skeleton"]}>
                        <div>
                            <Skeleton variant="text" sx={{ fontSize: "40px", width: "250px" }} />
                            <Skeleton variant="text" sx={{ fontSize: "20px", width: "200px" }} />
                            <Skeleton variant="text" sx={{ fontSize: "30px", width: "340px" }} />
                            <div>
                                <Skeleton variant="text" sx={{ fontSize: "35px", width: "300px" }} />
                                <Skeleton variant="text" sx={{ fontSize: "35px", width: "300px" }} />
                                <Skeleton variant="text" sx={{ fontSize: "35px", width: "300px" }} />
                            </div>
                            <Skeleton variant="text" sx={{ fontSize: "20px", width: "100%" }} />
                            <Skeleton variant="text" sx={{ fontSize: "20px", width: "70%" }} />
                        </div>
                        <div className={styles["event-detail-btn-holder-skeleton"]}>
                            <div className={styles["event-detail-btn-skeleton"]}>
                                <Skeleton
                                    variant="rounded"
                                    sx={{ width: "100%", height: "50px", borderRadius: "30px" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
