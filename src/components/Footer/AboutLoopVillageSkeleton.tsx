import React from "react";
import styles from "./Style/aboutLoopVillage.module.scss";
import Skeleton from "@mui/material/Skeleton";

const HeroPanelSkeletons = ({ index, len }: { index: number; len: number }) => {
    return (
        <div className={styles["aboutLoopVillage-image-content-holder-skeleton"]} key={index}>
            <div
                className={styles["aboutLoopVillage-image-skeleton"]}
                style={index % 2 === 0 ? { order: 1 } : { order: 2 }}
            >
                <Skeleton variant="rounded" sx={{ width: "100%", height: "100%" }} />
            </div>
            <div
                className={`${styles["aboutLoopVillage-content-skeleton"]} ${styles["aboutLoopVillage-center-skeleton"]}`}
                style={index % 2 === 0 ? { order: 2 } : { order: 1 }}
            >
                <div className={styles["aboutLoopVillage-title-skeleton"]}>
                    <Skeleton variant="text" sx={{}} />
                </div>
                <div className={styles["aboutLoopVillage-para-skeleton"]}>
                    <Skeleton variant="text" sx={{}} />
                    <Skeleton variant="text" sx={{}} />
                    <Skeleton variant="text" sx={{}} />
                    <Skeleton variant="text" sx={{}} />
                    <Skeleton variant="text" sx={{}} />
                    <Skeleton variant="text" sx={{}} />
                    <Skeleton variant="text" sx={{}} />
                    <Skeleton variant="text" sx={{}} />
                </div>
                {index === len - 1 && (
                    <div className={styles["aboutLoopVillage-browse-events-skeleton"]}>
                        <Skeleton variant="rounded" sx={{ width: "100%", height: "50px", borderRadius: "30px" }} />
                    </div>
                )}
            </div>
        </div>
    );
};

const AboutLoopVillageSkeleton = () => {
    const arr = new Array(6).fill(0);
    return (
        <div className="layout-container-fluid">
            <div className={styles["aboutLoopVillage-heading-skeleton"]}>
                <Skeleton variant="text" sx={{ width: "100%" }} />
            </div>
            <div className={styles["aboutLoopVillage-skeleton"]}>
                {arr.map((_, index) => {
                    if (index === 2) {
                        return (
                            <div key={index}>
                                <div className={styles["aboutLoopVillage-thought-skeleton"]}>
                                    <Skeleton
                                        variant="rectangular"
                                        sx={{ width: "100%", height: "100%", borderRadius: "10px" }}
                                    />
                                </div>
                                <HeroPanelSkeletons index={index} len={6} />
                            </div>
                        );
                    } else {
                        return (
                            <div key={index}>
                                <HeroPanelSkeletons index={index} len={6} />
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
};
export default AboutLoopVillageSkeleton;
