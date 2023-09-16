import React from "react";
import styles from "./Style/reportYourConcern.module.scss";
import Skeleton from "@mui/material/Skeleton";

export const ReportYourConcernSkeleton = () => {
    return (
        <div className="layout-container-fluid">
            <div className={styles["reportYourConcern-skeleton"]}>
                <div className={styles["reportYourConcern-heading-skeleton"]}>
                    <Skeleton variant="text" sx={{ width: "100%" }} />
                </div>
                <div className={styles["reportYourConcern-para-skeleton"]}>
                    <Skeleton variant="text" sx={{ width: "100%" }} />
                </div>
                <div className={`${styles["infusion-form-skeleton"]}`}>
                    <div className={`${styles["infusion-submit-form-heading-skeleton"]}`}>
                        <Skeleton variant="text" sx={{ width: "100%", height: "100%", marginBottom: "5px" }} />
                    </div>
                    <Skeleton variant="rectangular" sx={{ width: "100%", height: "200px", borderRadius: "10px" }} />
                    <div className={`${styles["infusion-submit-button-skeleton"]}`}>
                        <Skeleton variant="rounded" sx={{ width: "100%", height: "100%", borderRadius: "30px" }} />
                    </div>
                </div>
            </div>
        </div>
    );
};
