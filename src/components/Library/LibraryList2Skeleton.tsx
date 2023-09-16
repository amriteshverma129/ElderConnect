import React from "react";
import Skeleton from "@mui/material/Skeleton";
import styles from "./Style/libraryList.module.scss";
import { useMediaQuery } from "react-responsive";

export const LibraryList2Skeleton = () => {
    const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
    const isTablet = useMediaQuery({ query: `(max-width: 1024px` });
    let noOfCounts = 6;
    if (isTablet === true && isMobile === false) {
        noOfCounts = 2;
    } else if (isTablet === true && isMobile === true) {
        noOfCounts = 1;
    }
    const videoSkeletonArr = new Array(noOfCounts).fill(0);
    return (
        <div className={styles["library-list-related-videos-skeleton"]}>
            {videoSkeletonArr.map((index) => {
                return (
                    <div className={styles["library-list-card-skeleton"]} key={index}>
                        {" "}
                        <div className={styles["library-list-image-skeleton"]}>
                            <Skeleton variant="rounded" sx={{ height: "100%", width: "100%" }} />
                        </div>
                        <div className={styles["library-list-content-skeleton"]}>
                            <Skeleton variant="text" sx={{ height: "40px", width: "100%" }} />
                            <Skeleton variant="text" sx={{ height: "25px", width: "100%" }} />
                            <Skeleton variant="text" sx={{ height: "35px", width: "100%" }} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
