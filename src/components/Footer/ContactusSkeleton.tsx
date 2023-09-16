import React from "react";
import styles from "./Style/contact.module.scss";
import Skeleton from "@mui/material/Skeleton";

export const ContactusSkeleton = () => {
    return (
        <div className="layout-container">
            <div className={styles["contact-heading-skeleton"]}>
                <Skeleton variant="text" sx={{ width: "100%" }} />
            </div>
            <div className={styles["contact-skeleton"]}>
                <div className={styles["contact-para-skeleton"]}>
                    <span>
                        <Skeleton variant="text" sx={{ width: "100%" }} />
                    </span>
                    <span>
                        <Skeleton variant="text" sx={{ width: "100%" }} />
                    </span>
                </div>
                <div className={styles["infusion-form-skeleton"]}>
                    <Skeleton variant="text" sx={{ width: "190px", height: "30px", marginBottom: "5px" }} />
                    <Skeleton variant="rectangular" sx={{ width: "100%", height: "350px", borderRadius: "10px" }} />
                    <div className={`${styles["infusion-submit-skeleton"]}`}>
                        <Skeleton variant="rounded" sx={{ width: "100%", height: "100%", borderRadius: "30px" }} />
                    </div>
                </div>
            </div>
        </div>
    );
};
