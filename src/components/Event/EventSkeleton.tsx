import React from "react";
import styles from "./Style/eventCard.module.scss";
import Skeleton from "@mui/material/Skeleton";

const EventSkeleton = () => {
    const arr = new Array(5).fill(0);

    return (
        <div className={styles["event-card-holder-skeleton"]}>
            {arr.map((_item, index) => {
                return (
                    <div key={index} className={styles["event-card-skeleton"]}>
                        <div className={styles["event-card-image-skeleton"]}>
                            <Skeleton variant="rounded" sx={{ height: "100%", width: "100%" }} />
                        </div>
                        <div className={styles["event-card-content-skeleton"]}>
                            <Skeleton variant="text" sx={{ fontSize: "60px" }} />
                            <Skeleton variant="text" sx={{ fontSize: "35px" }} />
                            <Skeleton variant="text" sx={{ fontSize: "30px" }} />
                            <Skeleton variant="text" sx={{ fontSize: "30px" }} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
export default EventSkeleton;
