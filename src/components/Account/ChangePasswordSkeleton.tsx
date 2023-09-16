import React from "react";
import styles from "./Style/changePassword.module.scss";
import Skeleton from "@mui/material/Skeleton";

const ChangePasswordSkeleton = () => {
    return (
        <div className={styles["changePassword-skeleton"]}>
            <div className={styles["changePassword-content-skeleton"]}>
                <Skeleton variant="rounded" sx={{ height: "60px", marginBottom: "40px", borderRadius: "40px" }} />
                <Skeleton variant="rounded" sx={{ height: "60px", marginBottom: "40px", borderRadius: "40px" }} />
                <Skeleton variant="rounded" sx={{ height: "60px", marginBottom: "40px", borderRadius: "40px" }} />
                <div className={styles["changepassword-button"]}>
                    <Skeleton variant="rounded" sx={{ height: "50px", borderRadius: "40px" }} />
                </div>
            </div>
        </div>
    );
};
export default ChangePasswordSkeleton;
