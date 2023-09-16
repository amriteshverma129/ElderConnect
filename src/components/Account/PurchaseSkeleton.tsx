import React from "react";
import styles from "./Style/purchase.module.scss";
import Skeleton from "@mui/material/Skeleton";
export const PurchaseSkeleton = () => {
    const slicess = new Array(3).fill(0);
    return (
        <div className={styles["Purchase-membership-skeleton"]}>
            <div className={styles["purchase-card-holder-skeleton"]}>
                {slicess.map((index) => {
                    return (
                        <div className={styles["purchase-card-skeleton"]} key={index}>
                            <Skeleton variant="text" sx={{ fontSize: "40px" }} />
                            <Skeleton variant="text" sx={{ fontSize: "30px" }} />
                            <Skeleton variant="text" sx={{ fontSize: "30px" }} />
                            <Skeleton variant="text" sx={{ fontSize: "50px", marginTop: "5px", width: "300px" }} />
                            <Skeleton variant="text" sx={{ fontSize: "20px", width: "280px" }} />
                            <div className={styles["purchase-card-btn"]}>
                                <Skeleton variant="rounded" sx={{ height: "50px", borderRadius: "30px" }} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
