import React from "react";
import Skeleton from "@mui/material/Skeleton";
import styles from "./Style/libraryDetail.module.scss";
import { LibraryList2Skeleton } from "./LibraryList2Skeleton";

export const LibrarydetailSkeleton = () => {
    return (
        <div className="layout-container-fluid">
            <div className={styles["library-detail-holder-skeleton"]}>
                <div className={styles["library-detail-skeleton"]}>
                    <div className={styles["library-detail-content-skeleton"]}>
                        <Skeleton variant="text" sx={{ fontSize: "30px", width: "300px" }} />
                    </div>
                    <div className={styles["library-detail-video-wrapper-skeleton"]}>
                        <Skeleton variant="rounded" sx={{ height: "100%", width: "100%" }} />
                    </div>
                    <div className={styles["library-detail-content-skeleton"]}>
                        <div className={styles["library-detail-title-like-skeleton"]}>
                            <Skeleton variant="text" sx={{ fontSize: "45px", marginTop: "0px", width: "60%" }} />
                            <div className={styles["library-detail-like-skeleton"]}>
                                <Skeleton
                                    variant="rounded"
                                    sx={{ height: "40px", width: "80px", borderRadius: "20px" }}
                                />
                            </div>
                        </div>
                        <Skeleton variant="text" sx={{ height: "30px", width: "300px" }} />
                        <p className={styles["library-detail-para-skeleton"]}>
                            <Skeleton variant="text" sx={{ height: "30px", width: "100%" }} />
                            <Skeleton variant="text" sx={{ height: "30px", width: "100%" }} />
                            <Skeleton variant="text" sx={{ height: "30px", width: "60%" }} />
                        </p>
                        <div className={styles["library-detail-para2-skeleton"]}>
                            <Skeleton variant="text" sx={{ height: "30px", width: "40%" }} />
                        </div>
                    </div>
                </div>
                <div className={styles["library-detail-related-videos-skeleton"]}>
                    <Skeleton
                        variant="text"
                        sx={{ fontSize: "45px", marginTop: "16px", marginBottom: "14px", width: "50%" }}
                    />
                    <LibraryList2Skeleton />
                </div>
            </div>
        </div>
    );
};
