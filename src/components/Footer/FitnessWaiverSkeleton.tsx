import React from "react";
import styles from "./Style/fitnessWaiver.module.scss";
import Skeleton from "@mui/material/Skeleton";

const RenderSkeletons = (count: number, width?: string) => {
    return Array(count)
        .fill(null)
        .map((_, i) => <Skeleton variant="text" sx={width ? { width } : undefined} key={i} />);
};

export const FitnessWaiverSkeleton = () => {
    return (
        <div className="layout-container-fluid">
            <div className={styles["fitnessWaiver-skeleton"]}>
                <div className={styles["fitnessWaiver-heading-skeleton"]}>
                    <Skeleton variant="text" sx={{ width: "50%" }} />
                </div>
                <div className={styles["fitnessWaiver-para-skeleton"]}>
                    {RenderSkeletons(5)}
                    {RenderSkeletons(1, "90%")}
                    <br />
                    <br />
                    <ol>
                        {RenderSkeletons(6)}

                        <br />

                        {RenderSkeletons(2)}
                        {RenderSkeletons(1, "50%")}

                        <br />

                        {RenderSkeletons(1)}
                        {RenderSkeletons(1, "80%")}

                        <br />

                        {RenderSkeletons(4)}
                        {RenderSkeletons(1, "50%")}

                        <br />

                        {RenderSkeletons(1, "90%")}
                    </ol>
                </div>
            </div>
        </div>
    );
};
