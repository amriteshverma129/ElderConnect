import React from "react";
import styles from "./Style/founders.module.scss";
import Skeleton from "@mui/material/Skeleton";

export const FounderSkeleton = () => {
    const arr = new Array(3).fill(0);
    return (
        <div className="layout-container-fluid">
            <div className={styles["founders-skeleton"]}>
                <div className={styles["founders-heading-skeleton"]}>
                    <Skeleton variant="text" sx={{ width: "100%" }} />
                </div>
                <div className={styles["founders-list-skeleton"]}>
                    {arr.map((_, index) => {
                        return (
                            <div className={styles["founders-card-skeleton"]} key={index}>
                                <div className={styles["founders-card-image-skeleton"]}>
                                    <Skeleton
                                        variant="rounded"
                                        sx={{ width: "100%", height: "100%", borderRadius: "50%" }}
                                    />
                                </div>
                                <div className={styles["founders-card-name-skeleton"]}>
                                    <Skeleton variant="text" sx={{ width: "280px" }} />
                                </div>

                                <div className={styles["founders-card-designation-skeleton"]}>
                                    <Skeleton variant="text" sx={{ width: "300px" }} />
                                </div>
                                <Skeleton variant="text" sx={{ width: "100%" }} />
                                <Skeleton variant="text" sx={{ width: "100%" }} />
                                <Skeleton variant="text" sx={{ width: "70%" }} />
                            </div>
                        );
                    })}
                </div>
                <div className={styles["founders-help-skeleton"]}>
                    <Skeleton variant="rounded" sx={{ width: "100%", height: "100%" }} />
                </div>
            </div>
        </div>
    );
};
