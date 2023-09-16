import React from "react";
import styles from "./Style/profile.module.scss";
import Skeleton from "@mui/material/Skeleton";

const ProfileSkeleton = () => {
    return (
        <div className={styles["profile-card-holder-skeleton"]}>
            <div className={styles["profile-card-image-skeleton"]}>
                <div className={styles["profile-card-image"]}>
                    <Skeleton variant="rounded" sx={{ height: "160px", width: "160px", borderRadius: "100px" }} />
                </div>
                <Skeleton variant="text" sx={{ fontSize: "25px", width: "160px", marginTop: "10px" }} />
            </div>
            <div className={styles["profile-card-skeleton-form"]}>
                <Skeleton variant="rounded" sx={{ height: "60px", marginBottom: "40px", borderRadius: "40px" }} />
                <Skeleton variant="rounded" sx={{ height: "60px", marginBottom: "40px", borderRadius: "40px" }} />
                <Skeleton variant="rounded" sx={{ height: "60px", marginBottom: "40px", borderRadius: "40px" }} />
                <Skeleton variant="rounded" sx={{ height: "60px", marginBottom: "40px", borderRadius: "40px" }} />
                <Skeleton variant="rounded" sx={{ height: "60px", marginBottom: "40px", borderRadius: "40px" }} />
                <Skeleton variant="rounded" sx={{ height: "300px", marginBottom: "40px", borderRadius: "10px" }} />
                <div className={styles["profile-skeleton-submit-button"]}>
                    <Skeleton variant="rounded" sx={{ height: "50px", borderRadius: "40px" }} />
                </div>
                <div className={styles["profile-skeleton-deactive-btn-holder"]}>
                    <div className={styles["profile-skeleton-message"]}>
                        <Skeleton variant="text" sx={{ fontSize: "40px", marginBottom: "10px", width: "150px" }} />
                        <Skeleton variant="text" sx={{ fontSize: "30px", width: "300px", marginBottom: "20px" }} />
                    </div>
                    <div className={styles["profile-skeleton-deactivate-button"]}>
                        <Skeleton variant="rounded" sx={{ height: "50px", borderRadius: "40px" }} />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProfileSkeleton;
