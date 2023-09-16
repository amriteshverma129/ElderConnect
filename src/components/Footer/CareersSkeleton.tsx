import React from "react";
import styles from "./Style/career.module.scss";
import Skeleton from "@mui/material/Skeleton";

export const CareersSkeleton = () => {
    const arr = new Array(2).fill(0);
    const arrList = new Array(2).fill(0);

    return (
        <div className="layout-container-fluid">
            <div className={styles["career-skeleton"]}>
                <div className={styles["career-header-title-skeleton"]}>
                    <Skeleton variant="text" sx={{ width: "100%" }} />
                </div>
                {arr.map((_, index) => {
                    if (index === 0) {
                        return (
                            <div className={styles["career-heroPanel1-skeleton"]} key={index}>
                                <div className={styles["career-heroPanel1-heading-skeleton"]}>
                                    <Skeleton variant="text" />
                                    <Skeleton variant="text" />
                                </div>
                                <div className={styles["career-heroPanel1-para-skeleton"]}>
                                    <Skeleton variant="text" />
                                    <Skeleton variant="text" />
                                    <Skeleton variant="text" />
                                    <Skeleton
                                        variant="text"
                                        sx={{ width: "60%", marginLeft: "auto", marginRight: "auto" }}
                                    />
                                </div>
                                <div className={styles["career-heroPanel1-image-skeleton"]}>
                                    <Skeleton variant="rounded" sx={{ width: "100%", height: "100%" }} />
                                </div>
                            </div>
                        );
                    } else {
                        return (
                            <div className={styles["career-heroPanel2-skeleton"]} key={index}>
                                <div className={styles["career-heroPanel2-content1-skeleton"]}>
                                    <div className={styles["career-heroPanel2-heading-skeleton"]}>
                                        <Skeleton variant="text" />
                                    </div>
                                    <div className={styles["career-heroPanel2-para-skeleton"]}>
                                        <Skeleton variant="text" />
                                        <Skeleton variant="text" />
                                        <Skeleton variant="text" />
                                        <Skeleton variant="text" />
                                    </div>
                                    <div className={styles["career-heroPanel2-image-skeleton"]}>
                                        <Skeleton variant="rounded" sx={{ width: "100%", height: "100%" }} />
                                    </div>
                                </div>
                                <div className={styles["career-heroPanel2-content2-skeleton"]}>
                                    {arrList?.map((_, index) => {
                                        return (
                                            <div key={index}>
                                                <div className={styles["career-heroPanel2-title-skeleton"]}>
                                                    <Skeleton variant="text" />
                                                </div>
                                                <ul>
                                                    <p className={styles["career-heroPanel2-list-skeleton"]}>
                                                        <Skeleton variant="text" />
                                                        <Skeleton variant="text" />
                                                        <Skeleton variant="text" />
                                                        <Skeleton variant="text" />
                                                    </p>
                                                </ul>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
};
