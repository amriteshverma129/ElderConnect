import React from "react";
import styles from "./Style/settings.module.scss";
import Skeleton from "@mui/material/Skeleton";

export const SettingsSkeleton = () => {
    return (
        <div className={styles["settings-skeleton"]}>
            <div className={styles["settings-card-skeleton"]}>
                <div className={styles["settings-card-text-skeleton"]}>
                    <Skeleton variant="text" sx={{ width: "80%", fontSize: "48px" }} />
                    <Skeleton variant="text" sx={{ width: "100%", fontSize: "30px" }} />
                </div>
                <div className={styles["settings-toggle-switch-skeleton"]}>
                    <Skeleton variant="rounded" sx={{ height: "35px", width: "70px", borderRadius: "30px" }} />
                </div>
            </div>
        </div>
    );
};
