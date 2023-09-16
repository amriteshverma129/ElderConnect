import React from "react";
import styles from "./Style/libraryCard.module.scss";
import Skeleton from "@mui/material/Skeleton";

interface Props {
    menuIcon?: string;
}

const LibrarySkeleton = ({ menuIcon }: Props) => {
    const arr = new Array(9).fill(0);

    return (
        <div
            className={
                menuIcon === "GridMenu"
                    ? styles["library-card-holder-skeleton"]
                    : styles["library-card-holder-list-skeleton"]
            }
        >
            {arr.map((_item, index) => {
                return (
                    <div key={index} className={styles["library-card-skeleton"]}>
                        <div className={styles["library-card-image-skeleton"]}>
                            <Skeleton variant="rounded" sx={{ height: "100%", width: "100%" }} />
                        </div>
                        <div className={styles["library-card-content-skeleton"]}>
                            <Skeleton variant="text" sx={{ fontSize: "60px" }} />
                            <Skeleton variant="text" sx={{ fontSize: "30px" }} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
export default LibrarySkeleton;
