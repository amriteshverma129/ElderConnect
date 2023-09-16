import React from "react";
import styles from "./Style/eventList.module.scss";
import Skeleton from "@mui/material/Skeleton";
import { useMediaQuery } from "react-responsive";

export const EventList2Skeleton = () => {
    const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
    const isTablet = useMediaQuery({ query: `(max-width: 1024px` });
    let noOfCounts = 3;
    if (isTablet === true && isMobile === false) {
        noOfCounts = 2;
    } else if (isTablet === true && isMobile === true) {
        noOfCounts = 1;
    }
    const arr = new Array(noOfCounts).fill(0);
    return (
        <div className="layout-container-fluid layout-slider">
            <div style={{ position: "relative" }}>
                <Skeleton variant="text" sx={{ fontSize: "40px", width: "90%", marginBottom: "10px" }} />
                <div className={styles["event-card-holder-skeleton"]}>
                    {arr.map((index) => {
                        return (
                            <div className={styles["event-card-skeleton"]} key={index}>
                                <div className={styles["event-card-image-skeleton"]}>
                                    <Skeleton variant="rounded" sx={{ height: "100%", width: "100%" }} />
                                </div>
                                <div>
                                    <Skeleton variant="text" sx={{ fontSize: "60px" }} />
                                    <Skeleton variant="text" sx={{ fontSize: "30px" }} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className={styles["event-list-action-skeleton"]}>
                <div className={styles["event-list-slider-skeleton"]}>
                    <Skeleton variant="rounded" sx={{ height: "70px", width: "70px", borderRadius: "50px" }} />
                    <Skeleton variant="rounded" sx={{ height: "70px", width: "70px", borderRadius: "50px" }} />
                </div>
                <Skeleton variant="rounded" sx={{ height: "50px", width: "150px", borderRadius: "30px" }} />
            </div>
        </div>
    );
};
