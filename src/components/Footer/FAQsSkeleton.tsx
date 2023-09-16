import Skeleton from "@mui/material/Skeleton";
import styles from "./Style/faqs.module.scss";

export const FAQsSkeleton = () => {
    return (
        <div className="layout-container-fluid">
            <div className={styles["FAQs-skeleton"]}>
                <div className={styles["FAQs-heading-skeleton"]}>
                    <Skeleton variant="text" sx={{ width: "100%" }} />
                </div>
                <div className={styles["FAQs-tabs-skeleton"]}>
                    <Skeleton variant="rounded" sx={{ width: "100%", height: "100%", borderRadius: "40px" }} />
                    <Skeleton variant="rounded" sx={{ width: "100%", height: "100%", borderRadius: "40px" }} />
                </div>
                <div className={styles["FAQs-holders-skeleton"]}></div>
            </div>
        </div>
    );
};
