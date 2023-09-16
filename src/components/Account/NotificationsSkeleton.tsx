import React from "react";
import styles from "./Style/notifications.module.scss";
import Skeleton from "@mui/material/Skeleton";

export const NotificationsSkeleton = () => {
    const arr = Array(6).fill(0);
    return (
        <div className={styles["account-notifications-skeleton"]}>
            <div className={styles["account-notifications-buttons-skeleton"]}>
                <Skeleton variant="rounded" sx={{ height: "48px", width: "63px", borderRadius: "30px" }} />
                <Skeleton variant="rounded" sx={{ height: "48px", width: "146px", borderRadius: "30px" }} />
            </div>
            {arr.map((_, index) => {
                return (
                    <div className={styles["account-notifications-events-all-details-skeleton"]} key={index}>
                        <div>
                            <Skeleton
                                variant="rounded"
                                sx={{ height: "100px", width: "100px", borderRadius: "100%" }}
                            />
                        </div>
                        <div className={styles["account-notifications-message-skeleton"]}>
                            <Skeleton variant="text" sx={{ width: "100%", fontSize: "65px" }} />
                        </div>
                    </div>
                );
            })}
            <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
                <Skeleton variant="rounded" sx={{ height: "48px", width: "138px", borderRadius: "30px" }} />
            </div>
        </div>
    );
};
